// quick CDP probe: load index.html, report uncaught exceptions + a state snapshot
const { spawn } = require('child_process');
const fs = require('fs'), os = require('os'), path = require('path');

const CHROME = 'C:/Program Files/Google/Chrome/Application/chrome.exe';
const url = process.argv[2] || 'file:///C:/Users/homee/projects/human-atlas/index.html';
const port = 9333 + (Math.floor(Math.random() * 400));
const prof = path.join(os.tmpdir(), 'cr-probe-' + Date.now());
const child = spawn(CHROME, ['--headless=new', '--disable-gpu', '--no-first-run', '--no-default-browser-check',
  '--user-data-dir=' + prof, '--remote-debugging-port=' + port, url], { stdio: 'ignore' });
const sleep = ms => new Promise(r => setTimeout(r, ms));

(async () => {
  let target = null;
  for (let i = 0; i < 60; i++) {
    try {
      const list = await (await fetch(`http://127.0.0.1:${port}/json/list`)).json();
      target = list.find(t => t.type === 'page' && t.url.indexOf('http') !== 0);
      if (target) break;
    } catch (_) {}
    await sleep(300);
  }
  if (!target) { console.log('NO TARGET'); child.kill(); process.exit(1); }
  const ws = new WebSocket(target.webSocketDebuggerUrl);
  let id = 0; const pend = new Map(); const events = [];
  const send = (method, params = {}) => new Promise((res, rej) => {
    const mid = ++id; pend.set(mid, { res, rej });
    ws.send(JSON.stringify({ id: mid, method, params }));
  });
  ws.onmessage = ev => {
    const m = JSON.parse(ev.data);
    if (m.id && pend.has(m.id)) { pend.get(m.id).res(m.result); pend.delete(m.id); }
    else if (m.method === 'Runtime.exceptionThrown') {
      const d = m.params.exceptionDetails;
      events.push('EXCEPTION: ' + (d.exception && d.exception.description ? d.exception.description : d.text) +
        ' @' + (d.url || '') + ':' + d.lineNumber);
    } else if (m.method === 'Runtime.consoleAPICalled') {
      events.push('console.' + m.params.type + ': ' + m.params.args.map(a => a.value !== undefined ? a.value : a.description).join(' '));
    } else if (m.method === 'Log.entryAdded') {
      events.push('log.' + m.params.entry.level + ': ' + m.params.entry.text + ' @' + (m.params.entry.url || ''));
    }
  };
  await new Promise(r => { ws.onopen = r; });
  await send('Runtime.enable'); await send('Log.enable'); await send('Page.enable');
  await sleep(2500);
  const r = await send('Runtime.evaluate', {
    returnByValue: true, expression: `JSON.stringify({
      title: document.title,
      ready: !!(window.__ATLAS__ && window.__ATLAS__.ready),
      parts: (window.__ATLAS__ ? window.__ATLAS__.data.all().length : -1),
      sysRows: document.querySelectorAll('.sys-row').length,
      rendered: document.querySelectorAll('.part').length,
      worldChildren: (document.getElementById('world') || {}).childElementCount,
      svgLen: document.getElementById('world') ? document.getElementById('world').innerHTML.length : -1
    })`
  });
  console.log(r.result.value);
  events.slice(0, 14).forEach(e => console.log(e));
  ws.close(); child.kill();
  await sleep(300);
  setTimeout(() => process.exit(0), 100);
})();
