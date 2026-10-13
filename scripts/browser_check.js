#!/usr/bin/env node
/* Tier 2 gate — drives the shipped index.html in real Chrome over CDP.
   No dependencies: Node's global fetch + WebSocket only.
   Usage: node scripts/browser_check.js [--url=file:///…/index.html] */
const { spawn } = require('child_process');
const fs = require('fs');
const os = require('os');
const path = require('path');

const argUrl = (process.argv.find(a => a.startsWith('--url=')) || '').slice(6);
const URL = argUrl || 'file:///C:/Users/homee/projects/human-atlas/index.html';
const CHROME = 'C:/Program Files/Google/Chrome/Application/chrome.exe';
const PORT = 9500 + Math.floor(Math.random() * 400);
const PROFILE = path.join(os.tmpdir(), 'atlas-gate-' + Date.now());
const sleep = ms => new Promise(r => setTimeout(r, ms));

let pass = 0; const fails = [];
function ok(name, cond, detail) {
  if (cond) { pass++; return; }
  fails.push(name + (detail !== undefined ? '  [' + detail + ']' : ''));
}
function eq(name, got, want) { ok(name, got === want, 'got ' + JSON.stringify(got) + ', want ' + JSON.stringify(want)); }

(async () => {
  const chrome = spawn(CHROME, ['--headless=new', '--disable-gpu', '--no-first-run', '--no-default-browser-check',
    '--user-data-dir=' + PROFILE, '--hide-scrollbars', '--remote-debugging-port=' + PORT, 'about:blank'], { stdio: 'ignore' });

  let target = null;
  for (let i = 0; i < 80 && !target; i++) {
    try {
      const list = await (await fetch('http://127.0.0.1:' + PORT + '/json/list')).json();
      target = list.find(t => t.type === 'page');
    } catch (_) { }
    if (!target) await sleep(250);
  }
  if (!target) { console.log('BROWSER GATE FAIL: no devtools target'); chrome.kill(); process.exit(1); }

  const ws = new WebSocket(target.webSocketDebuggerUrl);
  let id = 0; const pending = new Map(); const errors = [];
  const send = (method, params = {}) => new Promise((res, rej) => {
    const mid = ++id; pending.set(mid, { res, rej });
    ws.send(JSON.stringify({ id: mid, method, params }));
  });
  ws.onmessage = ev => {
    const msg = JSON.parse(ev.data);
    if (msg.id && pending.has(msg.id)) { pending.get(msg.id).res(msg.result); pending.delete(msg.id); return; }
    if (msg.method === 'Runtime.exceptionThrown') {
      const d = msg.params.exceptionDetails;
      errors.push('EXCEPTION ' + (d.exception && d.exception.description ? d.exception.description.split('\n')[0] : d.text) +
        ' @line ' + d.lineNumber);
    } else if (msg.method === 'Log.entryAdded' && msg.params.entry.level === 'error') {
      errors.push('CONSOLE ' + msg.params.entry.text.slice(0, 160));
    }
  };
  await new Promise(r => { ws.onopen = r; });
  await send('Runtime.enable'); await send('Log.enable'); await send('Page.enable');

  /* attach listeners BEFORE navigating so no early error is missed */
  await send('Page.navigate', { url: URL });
  let ready = false;
  for (let i = 0; i < 60 && !ready; i++) {
    await sleep(200);
    const r = await send('Runtime.evaluate', { expression: '!!(window.__ATLAS__ && window.__ATLAS__.ready)', returnByValue: true });
    ready = r.result && r.result.value === true;
  }
  ok('app reports ready', ready);

  const ev = async (expr) => {
    const r = await send('Runtime.evaluate', { expression: expr, returnByValue: true, awaitPromise: true });
    if (r.exceptionDetails) throw new Error(expr + ' -> ' + r.exceptionDetails.text);
    return r.result.value;
  };
  const json = async (expr) => JSON.parse(await ev('JSON.stringify(' + expr + ')'));

  /* ---- what actually rendered ---- */
  const dom = await json('__ATLAS__.dom()');
  const total = await ev('__ATLAS__.data.all().length');
  eq('every structure is in the DOM', dom.rendered, total);
  eq('five system rows', dom.sysRows, 5);
  eq('legend lists enabled systems', dom.legend, 5);
  ok('hud reports the structure count', /structures shown/.test(dom.hud), dom.hud);
  ok('nothing is selected at boot', dom.selected === 0);

  /* ---- selection through the real UI path: click, then walk the stack ---- */
  const stack = await ev(`(() => {
    const g = document.querySelector('.part[data-id="liver"]');
    const r = g.getBoundingClientRect();
    const x = r.left + r.width / 2, y = r.top + r.height / 2;
    const order = [];
    for (let i = 0; i < 16; i++) {
      const t = document.elementFromPoint(x, y) || document.getElementById('atlas');
      t.dispatchEvent(new PointerEvent('pointerdown', {bubbles:true, clientX:x, clientY:y, button:0, pointerType:'mouse'}));
      window.dispatchEvent(new PointerEvent('pointerup', {bubbles:true, clientX:x, clientY:y, button:0, pointerType:'mouse'}));
      if (order.indexOf(__ATLAS__.state.sel) === -1) order.push(__ATLAS__.state.sel);
      if (__ATLAS__.state.sel === 'liver') break;
    }
    return { order: order, reachedLiver: __ATLAS__.state.sel === 'liver', distinct: order.length,
             toast: document.getElementById('toast').classList.contains('on'),
             toastText: document.getElementById('toast').textContent };
  })()`);
  ok('a click selects the topmost structure', stack.order.length > 0 && !!stack.order[0], JSON.stringify(stack));
  ok('several structures share one point', stack.distinct >= 3, JSON.stringify(stack.order));
  ok('clicking again walks the stack down to the liver', stack.reachedLiver, JSON.stringify(stack.order));
  ok('the app reports how many structures are stacked', stack.toast && /structures at that point/.test(stack.toastText),
    stack.toastText);
  const d1 = await json('__ATLAS__.dom()');
  eq('detail panel names the selection', d1.detailName, 'Liver');
  ok('detail panel lists facts', d1.facts >= 3, String(d1.facts));
  eq('exactly one structure is highlighted', d1.selected, 1);
  ok('detail body is visible', await ev(`!document.getElementById('dBody').classList.contains('hidden')`));
  ok('empty state hides once something is selected',
    await ev(`document.getElementById('dEmpty').classList.contains('hidden')`));

  /* ---- drag: a real pointer gesture, not a state poke ---- */
  const drag = await ev(`(() => {
    const g = document.querySelector('.part[data-id="cranium"]');
    const r = g.getBoundingClientRect();
    let p = null;
    for (let fy = 0.05; fy <= 0.95 && !p; fy += 0.1)
      for (let fx = 0.05; fx <= 0.95 && !p; fx += 0.1) {
        const x = r.left + r.width * fx, y = r.top + r.height * fy;
        const t = document.elementFromPoint(x, y);
        if (t && t.closest && t.closest('.part') === g) p = { x: x, y: y };
      }
    if (!p) return { hit: false };
    const before = g.getAttribute('transform');
    document.elementFromPoint(p.x, p.y).dispatchEvent(new PointerEvent('pointerdown', {bubbles:true, clientX:p.x, clientY:p.y, button:0, pointerType:'mouse'}));
    window.dispatchEvent(new PointerEvent('pointermove', {bubbles:true, clientX:p.x + 70, clientY:p.y - 90, button:0, pointerType:'mouse'}));
    window.dispatchEvent(new PointerEvent('pointerup', {bubbles:true, clientX:p.x + 70, clientY:p.y - 90, button:0, pointerType:'mouse'}));
    return { hit: true, before: before, after: g.getAttribute('transform'), stored: __ATLAS__.state.off['cranium'] || null,
             sel: __ATLAS__.state.sel };
  })()`);
  ok('dragging moves the structure', drag.hit && drag.after !== drag.before, JSON.stringify(drag));
  ok('drag is stored in state, not just painted', !!drag.stored, JSON.stringify(drag));
  ok('drag moved it right and up as dragged',
    !!drag.stored && drag.stored[0] > 20 && drag.stored[1] < -20, JSON.stringify(drag.stored));
  ok('a drag does not change the selection', drag.sel === 'liver', JSON.stringify(drag.sel));
  ok('a re-render keeps the drag', await ev(`(() => {
    const t = document.querySelector('.part[data-id="cranium"]').getAttribute('transform');
    __ATLAS__.toggleSystem('nervous'); __ATLAS__.toggleSystem('nervous');
    return document.querySelector('.part[data-id="cranium"]').getAttribute('transform') === t;
  })()`));
  ok('reset clears every drag', await ev(`(() => { __ATLAS__.resetParts(); return Object.keys(__ATLAS__.state.off).length === 0; })()`));

  /* ---- toggles ---- */
  ok('hiding a system removes it from the canvas', await ev(`(() => {
    __ATLAS__.toggleSystem('skeletal');
    const n = document.querySelectorAll('.sys-skeletal .part').length;
    __ATLAS__.toggleSystem('skeletal');
    return n === 0 && document.querySelectorAll('.sys-skeletal .part').length > 0;
  })()`));
  ok('isolate shows a single system', await ev(`(() => {
    __ATLAS__.soloSystem('organs');
    const only = [...document.querySelectorAll('.layer[data-sys]')].length;
    __ATLAS__.soloSystem('organs');
    return only === 1;
  })()`));
  ok('opacity slider drives the layer', await ev(`(() => {
    __ATLAS__.setOpacity('muscular', 0.2);
    const v = document.querySelector('.sys-muscular').getAttribute('opacity');
    __ATLAS__.setOpacity('muscular', 0.5);
    return v === '0.2';
  })()`));
  ok('x-ray button toggles the state', await ev(`(() => {
    document.getElementById('btnXray').click();
    const on = __ATLAS__.state.xray;
    document.getElementById('btnXray').click();
    return on === true && __ATLAS__.state.xray === false;
  })()`));

  /* ---- search through the real input ---- */
  ok('search input drives the result list', await ev(`(() => {
    const i = document.getElementById('search');
    i.value = 'sciatic'; i.dispatchEvent(new Event('input', {bubbles:true}));
    const rows = document.querySelectorAll('#results .res').length;
    i.value = 'zzz'; i.dispatchEvent(new Event('input', {bubbles:true}));
    const none = document.querySelectorAll('#results .res').length === 0 &&
                 !!document.querySelector('#results .res-none');
    i.value = ''; i.dispatchEvent(new Event('input', {bubbles:true}));
    return rows > 0 && none;
  })()`));

  /* ---- explode ---- */
  ok('explode detaches every structure and reset restores it', await ev(`(() => {
    document.getElementById('btnExplode').click();
    const n = Object.keys(__ATLAS__.state.off).length;
    document.getElementById('btnReset').click();
    return n === __ATLAS__.data.all().length && Object.keys(__ATLAS__.state.off).length === 0;
  })()`));

  /* ---- quiz: five rounds, driven through the app's own timing and click path ---- */
  const quiz = await ev(`(async () => {
    document.getElementById('btnQuiz').click();
    const rounds = [];
    for (let i = 0; i < 5; i++) {
      const t = __ATLAS__.quiz.state().target;
      const wrong = (i === 1);
      const wrongPick = __ATLAS__.data.all().filter(p => p.id !== t && __ATLAS__.state.on[p.sys])[6].id;
      const pick = wrong ? wrongPick : t;
      const g = document.querySelector('.part[data-id="' + pick + '"]');
      g.dispatchEvent(new PointerEvent('pointerdown', {bubbles:true, clientX:2, clientY:2, button:0, pointerType:'mouse'}));
      window.dispatchEvent(new PointerEvent('pointerup', {bubbles:true, clientX:2, clientY:2, button:0, pointerType:'mouse'}));
      rounds.push({ target: t, pick: pick, scored: __ATLAS__.quiz.state().score });
      await new Promise(r => setTimeout(r, 1600));
    }
    const s = __ATLAS__.quiz.state();
    const prompt = document.getElementById('qPrompt').textContent;
    document.getElementById('btnQuiz').click();
    return { rounds: rounds, score: s.score, asked: s.asked, prompt: prompt,
             hidden: document.getElementById('quizbar').classList.contains('hidden'),
             cleared: __ATLAS__.state.sel === null };
  })()`);
  ok('quiz ran five rounds through the click path', quiz.asked === 5, JSON.stringify(quiz.asked));
  ok('quiz scored the four correct answers', quiz.score === 4, JSON.stringify(quiz.rounds));
  ok('quiz prompt names a structure', /Click the .+/.test(quiz.prompt), quiz.prompt);
  ok('quiz bar hides on exit', quiz.hidden === true);
  ok('exiting the quiz clears the selection', quiz.cleared === true);

  /* ---- keyboard + zoom ---- */
  ok('keyboard zoom changes the view', await ev(`(() => {
    const before = __ATLAS__.view().k;
    window.dispatchEvent(new KeyboardEvent('keydown', {key: '+'}));
    const after = __ATLAS__.view().k;
    window.dispatchEvent(new KeyboardEvent('keydown', {key: '0'}));
    return after > before && __ATLAS__.view().k === 1;
  })()`));
  ok('escape clears the selection', await ev(`(() => {
    __ATLAS__.selectPart('heart');
    window.dispatchEvent(new KeyboardEvent('keydown', {key: 'Escape'}));
    return __ATLAS__.state.sel === null;
  })()`));

  /* ---- export is the same geometry the canvas shows ---- */
  const exp = await json(`(() => {
    const svg = __ATLAS__.exportSvg();
    return { sameBody: svg.indexOf(__ATLAS__.svgBody(__ATLAS__.exportState())) > -1,
             parts: (svg.match(/data-id=/g) || []).length,
             valid: /^<\\?xml/.test(svg) && /<svg /.test(svg) && /<\\/svg>$/.test(svg.trim()) };
  })()`);
  ok('export reuses the rendered markup', exp.sameBody);
  ok('export carries every structure', exp.parts === total, exp.parts + ' vs ' + total);
  ok('export is well-formed svg', exp.valid);

  /* ---- responsive: no overflow at three widths ---- */
  for (const [w, h] of [[1500, 950], [1024, 800], [390, 780]]) {
    await send('Emulation.setDeviceMetricsOverride', { width: w, height: h, deviceScaleFactor: 1, mobile: w < 500 });
    await sleep(260);
    const r = await json(`({ sw: document.documentElement.scrollWidth, iw: window.innerWidth,
      svgW: Math.round(document.getElementById('atlas').getBoundingClientRect().width),
      svgH: Math.round(document.getElementById('atlas').getBoundingClientRect().height) })`);
    ok('no horizontal overflow at ' + w, r.sw - r.iw <= 2, JSON.stringify(r));
    ok('canvas fills its pane at ' + w, r.svgW > 80 && r.svgH > 80, JSON.stringify(r));
  }
  await send('Emulation.clearDeviceMetricsOverride');

  /* ---- screenshots of the states a reader passes through ---- */
  await send('Emulation.setDeviceMetricsOverride', { width: 1500, height: 1000, deviceScaleFactor: 1, mobile: false });
  await ev(`__ATLAS__.resetParts(); __ATLAS__.selectPart('lung-left', {focus:false}); __ATLAS__.setSystems(['skeletal','organs','circulatory'])`);
  await sleep(400);
  let shot = await send('Page.captureScreenshot', { format: 'png' });
  const shotsDir = path.join(__dirname, '..', 'shots');
  fs.mkdirSync(shotsDir, { recursive: true });
  fs.writeFileSync(path.join(shotsDir, 'selftest-organs.png'), Buffer.from(shot.data, 'base64'));
  await ev(`__ATLAS__.setSystems(['skeletal','muscular','circulatory','nervous','organs']); __ATLAS__.explode()`);
  await sleep(400);
  shot = await send('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync(path.join(shotsDir, 'selftest-exploded.png'), Buffer.from(shot.data, 'base64'));
  await ev(`__ATLAS__.resetParts(); __ATLAS__.setSystems(['nervous'])`);
  await sleep(300);
  shot = await send('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync(path.join(shotsDir, 'selftest-nervous.png'), Buffer.from(shot.data, 'base64'));

  /* ---- no uncaught errors anywhere in the session ---- */
  eq('no uncaught exceptions or console errors', errors.length, 0, errors.slice(0, 4).join(' | '));

  const totalChecks = pass + fails.length;
  console.log('browser_check.js — ' + pass + '/' + totalChecks + ' assertions passed');
  if (fails.length) {
    console.log('\nFAILURES (' + fails.length + '):');
    fails.forEach(f => console.log('  ✗ ' + f));
  } else {
    console.log('screenshots: shots/selftest-{organs,exploded,nervous}.png');
  }
  try { ws.close(); } catch (_) { }
  chrome.kill();
  await sleep(200);
  try { fs.rmSync(PROFILE, { recursive: true, force: true }); } catch (_) { }
  process.exit(fails.length ? 1 : 0);
})().catch(e => { console.error('GATE ERROR', e); process.exit(2); });
