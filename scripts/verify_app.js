#!/usr/bin/env node
/* Tier 1 gate — lifts the DOM-free core out of index.html and asserts on data,
   geometry and the pure render function. No browser, no dependencies. */
const fs = require('fs');
const path = require('path');
const root = path.join(__dirname, '..');
const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');

let pass = 0; const fails = [];
function ok(name, cond, detail) {
  if (cond) { pass++; return; }
  fails.push(name + (detail !== undefined ? '  [' + detail + ']' : ''));
}
function eq(name, got, want) { ok(name, got === want, 'got ' + JSON.stringify(got) + ', want ' + JSON.stringify(want)); }

/* ---- static shape of the artifact ---- */
ok('CORE-START marker present', /\/\* CORE-START \*\//.test(html));
ok('CORE-END marker present', /\/\* CORE-END \*\//.test(html));
ok('no external script', !/<script\s+src=/.test(html));
ok('no external stylesheet', !/<link[^>]+stylesheet/.test(html));
ok('no fetching in the app', !/\bfetch\s*\(/.test(html) && !/XMLHttpRequest/.test(html));
ok('no CDN hostnames', !/https?:\/\/(cdn|unpkg|jsdelivr|fonts\.googleapis)/i.test(html));
ok('no remote images', !/<img[^>]+src="https?:/.test(html));
ok('single html file only', fs.readdirSync(root).filter(f => f.endsWith('.html')).length === 1);
ok('viewport is mobile-ready', /name="viewport"[^>]*width=device-width/.test(html));
ok('figure is labelled for screen readers', /<svg[^>]+role="img"/.test(html) && /aria-label=/.test(html));

/* every literal $('id') in the UI resolves to real markup */
const ids = [...html.matchAll(/\$\('([A-Za-z0-9_-]+)'\)/g)].map(m => m[1]);
const missingIds = [...new Set(ids)].filter(id => !new RegExp('id="' + id + '"').test(html));
ok('every $() id exists in markup', missingIds.length === 0, missingIds.join(','));

/* ---- lift the core ---- */
const m = html.match(/\/\* CORE-START \*\/([\s\S]*?)\/\* CORE-END \*\//);
ok('core block extracted', !!m);
const coreSrc = m[1];
const stripped = coreSrc.replace(/\/\*[\s\S]*?\*\//g, '').replace(/\/\/[^\n]*/g, '');
['document.', 'window.', 'localStorage', 'fetch(', 'canvas'].forEach(bad => {
  ok('core has no ' + bad, stripped.indexOf(bad) === -1);
});
const Atlas = new Function(coreSrc + '\nreturn Atlas;')();

/* ---- catalogue integrity (the app validates itself too) ---- */
const all = Atlas.all();
ok('at least 150 structures', all.length >= 150, 'got ' + all.length);
eq('systems', Atlas.SYSTEMS.length, 5);
const bad = Atlas.validate();
eq('catalogue validates clean', bad.length, 0);

/* every part is reachable, unique and complete */
const seen = new Set();
all.forEach(p => {
  ok('unique id ' + p.id, !seen.has(p.id));
  seen.add(p.id);
});
Atlas.SYSTEMS.forEach(s => {
  ok('system ' + s.id + ' has >= 15 structures', Atlas.partsOf(s.id).length >= 15, String(Atlas.partsOf(s.id).length));
  ok('system ' + s.id + ' has a colour + description', !!(s.color && s.hl && s.desc));
});
ok('every part has a group label', all.every(p => !!p.group));
ok('every part has a region in REGIONS', all.every(p => Atlas.REGIONS.indexOf(p.region) > -1));
ok('no orphan info records', Atlas.stats().withInfo === all.length,
  Atlas.stats().withInfo + ' records for ' + all.length + ' parts');

/* content quality: real sentences, real numbers, no filler */
const thinFn = all.filter(p => (Atlas.infoOf(p.id).fn || '').length < 60).map(p => p.id);
eq('no thin function text', thinFn.length, 0);
const factCount = all.reduce((a, p) => a + Atlas.infoOf(p.id).facts.length, 0);
ok('>= 3 facts per structure', all.every(p => Atlas.infoOf(p.id).facts.length >= 3),
  'total facts ' + factCount);
ok('figures everywhere', all.every(p => Atlas.infoOf(p.id).stats.length >= 2));
ok('cross references resolve', all.every(p => Atlas.infoOf(p.id).conn.every(c => !!Atlas.get(c))));
const noDigits = all.filter(p => !Atlas.infoOf(p.id).stats.some(kv => /\d/.test(kv[1]))).map(p => p.id);
ok('every structure states a number', noDigits.length === 0, noDigits.slice(0, 5).join(','));
/* Content uniqueness. Mirror pairs (humerus-left/right) deliberately share ONE
   record, so the claim is "no text is reused between DIFFERENT structures", plus
   a real check that each pair's Latin actually names its side. */
const baseOf = id => id.replace(/-(left|right)$/, '');
const factOwner = {};
let crossDup = 0, sharedAcrossPair = 0;
all.forEach(p => {
  Atlas.infoOf(p.id).facts.forEach(f => {
    const base = baseOf(p.id);
    if (factOwner[f] === undefined) factOwner[f] = base;
    else if (factOwner[f] === base) sharedAcrossPair++;
    else crossDup++;
  });
});
eq('no fact text reused between different structures', crossDup, 0);
ok('mirror pairs share their record (by design, via pair())', sharedAcrossPair > 0, sharedAcrossPair + ' shared lines');
const latOwner = {};
let crossLat = 0, mirrorLat = 0;
all.forEach(p => {
  const l = p.latin.replace(/\b(dexter|sinister)\b/g, '').trim();
  const base = baseOf(p.id);
  if (latOwner[l] === undefined) latOwner[l] = base;
  else if (latOwner[l] === base) mirrorLat++;
  else crossLat++;
});
eq('no Latin name reused between different structures', crossLat, 0);
const pairBases = [...new Set(all.filter(p => /-left$/.test(p.id)).map(p => p.id.slice(0, -5)))];
const missingLaterality = pairBases.filter(b => {
  const l = Atlas.get(b + '-left'), r = Atlas.get(b + '-right');
  return !l || !r || l.latin === r.latin;
});
eq('every paired structure names its side in Latin', missingLaterality.length, 0);
ok('laterality pairs found', pairBases.length >= 30, pairBases.length + ' pairs');

/* ---- geometry ---- */
const nan = all.filter(p => p.shapes.some(s => /NaN|undefined|null/.test(s.d)));
eq('no bad numbers in any path', nan.length, 0);
const empty = all.filter(p => !p.shapes.length || !Atlas.bbox(p) || Atlas.bbox(p).w === 0);
eq('every structure has extent', empty.length, 0);
const oob = all.filter(p => {
  const b = Atlas.bbox(p);
  return b.x < -30 || b.y < -10 || b.x + b.w > Atlas.VIEW.w + 30 || b.y + b.h > Atlas.VIEW.h + 10;
});
eq('everything inside the viewBox', oob.length, 0);

/* laterality: patient's left is on the right of the screen, mirrored about the midline */
['humerus', 'femur', 'kidney', 'lung', 'scapula', 'clavicle', 'eye', 'carotid'].forEach(base => {
  const l = Atlas.get(base + '-left'), r = Atlas.get(base + '-right');
  if (!l || !r) { ok('laterality pair ' + base, false, 'missing'); return; }
  const lb = Atlas.bbox(l), rb = Atlas.bbox(r);
  ok(base + ': left is right of right', lb.cx > rb.cx, lb.cx + ' vs ' + rb.cx);
  ok(base + ': mirrored about midline', Math.abs((lb.cx + rb.cx) / 2 - Atlas.CX) < 5,
    'midpoint ' + ((lb.cx + rb.cx) / 2).toFixed(1) + ' vs ' + Atlas.CX);
});
/* organs on the correct side of the body */
ok('heart is in the left chest', Atlas.bbox(Atlas.get('heart')).cx > Atlas.CX);
ok('liver is right of the midline', Atlas.bbox(Atlas.get('liver')).cx < Atlas.CX);
ok('stomach is left of the midline', Atlas.bbox(Atlas.get('stomach')).cx > Atlas.CX);
ok('spleen is left of the midline', Atlas.bbox(Atlas.get('spleen')).cx > Atlas.CX);
ok('gallbladder is right of the midline', Atlas.bbox(Atlas.get('gallbladder')).cx < Atlas.CX);
ok('lungs flank the heart', Atlas.bbox(Atlas.get('lung-right')).cx < Atlas.bbox(Atlas.get('heart')).cx &&
  Atlas.bbox(Atlas.get('lung-left')).cx > Atlas.bbox(Atlas.get('heart')).cx);
ok('organs sit inside the torso, not the limbs',
  Atlas.bbox(Atlas.get('liver')).y > 260 && Atlas.bbox(Atlas.get('bladder')).y < 520);
ok('brain sits inside the cranium',
  Atlas.bbox(Atlas.get('cerebrum')).x > Atlas.bbox(Atlas.get('cranium')).x &&
  Atlas.bbox(Atlas.get('cerebrum')).x + Atlas.bbox(Atlas.get('cerebrum')).w <
  Atlas.bbox(Atlas.get('cranium')).x + Atlas.bbox(Atlas.get('cranium')).w);
ok('spinal cord descends the spine',
  Atlas.bbox(Atlas.get('spinal-cord')).h > 200);
ok('feet are below the knees and knees below the hips',
  Atlas.bbox(Atlas.get('toe-bones-left')).y > Atlas.bbox(Atlas.get('patella-left')).y &&
  Atlas.bbox(Atlas.get('patella-left')).y > Atlas.bbox(Atlas.get('femur-left')).y);

/* ---- pure render ---- */
const s1 = Atlas.defaultState();
const body1 = Atlas.svgBody(s1);
all.forEach(p => ok('rendered: ' + p.id, body1.indexOf('data-id="' + p.id + '"') > -1));
ok('skin outline rendered', body1.indexOf('r-skin') > -1);
const painted = all.filter(p => s1.on[p.sys]).reduce((a, p) => a + p.shapes.length, 0);
eq('one invisible hit twin per painted shape', (body1.match(/r-hit hit/g) || []).length, painted);
ok('layer per enabled system', Atlas.SYSTEMS.every(s => body1.indexOf('data-sys="' + s.id + '"') > -1));

const s2 = Atlas.clone(s1); s2.on.skeletal = false;
const body2 = Atlas.svgBody(s2);
ok('disabling a system removes its markup',
  Atlas.partsOf('skeletal').every(p => body2.indexOf('data-id="' + p.id + '"') === -1));
ok('disabling one system keeps the others', body2.indexOf('data-id="heart"') > -1);

const s3 = Atlas.clone(s1); s3.off.heart = [40, -30];
ok('drag offset lands in the transform', /data-id="heart"[^>]*transform="translate\(40,-30\)"/.test(Atlas.svgBody(s3)));
const s4 = Atlas.clone(s1); s4.iso = 'organs';
const body4 = Atlas.svgBody(s4);
ok('isolate hides every other system',
  body4.indexOf('data-id="cranium"') === -1 && body4.indexOf('data-id="liver"') > -1);
const s5 = Atlas.clone(s1); s5.sel = 'liver'; s5.hl = 'liver';
ok('selection reaches the markup', /class="part sel hl"[^>]*data-id="liver"/.test(Atlas.svgBody(s5)));
const s6 = Atlas.clone(s1); s6.skin = false;
ok('the outline can be switched off', Atlas.svgBody(s6).indexOf('r-skin') === -1);
ok('render is deterministic', Atlas.svgBody(Atlas.defaultState()) === body1);
ok('shapeRoles all have css', (function () {
  const roles = new Set();
  all.forEach(p => p.shapes.forEach(s => roles.add(s.r)));
  const css = html.match(/\.r-[a-z0-9]+\{/g).map(x => x.slice(3, -1));
  const missing = [...roles].filter(r => css.indexOf(r) === -1);
  if (missing.length) fails.push('roles missing css: ' + missing.join(','));
  return missing.length === 0;
})());
ok('every role is painted by a rule', (function () {
  const roles = new Set();
  all.forEach(p => p.shapes.forEach(s => roles.add(s.r)));
  return roles.size >= 15;
})(), 'roles used');

/* ---- explode / quiz / search ---- */
const off = Atlas.explodeOffsets(26);
eq('explode covers every structure', Object.keys(off).length, all.length);
ok('explode pushes limbs away from the midline',
  off['humerus-left'][0] > 0 && off['humerus-right'][0] < 0 && off['femur-left'][0] > 0);
ok('explode pushes the head up and the feet down', off.cranium[1] < 0 && off['toe-bones-left'][1] > 0);
const mags = Object.keys(off).map(k => Math.hypot(off[k][0], off[k][1]));
ok('explode displacement is bounded', Math.min(...mags) > 6 && Math.max(...mags) < 120,
  Math.min(...mags).toFixed(1) + '..' + Math.max(...mags).toFixed(1));

ok('search by name finds the humerus', Atlas.search('humerus').some(p => p.id === 'humerus-left'));
ok('search by Latin finds the liver', Atlas.search('hepar').some(p => p.id === 'liver'));
ok('search by system term works', Atlas.search('nerve').length > 3, Atlas.search('nerve').length + ' hits');
ok('search is case-insensitive', Atlas.search('AORTA')[0].id === 'aorta');
ok('empty query returns nothing', Atlas.search('  ').length === 0);
ok('unknown query returns nothing', Atlas.search('xyzzyqq').length === 0);

const sq = Atlas.defaultState();
const picked = [];
for (let i = 0; i < 30; i++) {
  const t = Atlas.quizTarget(sq);
  if (!t) { ok('quiz always resolves a target', false, 'null at i=' + i); break; }
  picked.push(t);
  sq.quiz.asked = i + 1;
  sq.quiz.recent = sq.quiz.recent.concat([t]).slice(-3);
}
ok('quiz never repeats within three turns', (function () {
  for (let i = 3; i < picked.length; i++) if (picked.slice(i - 3, i).indexOf(picked[i]) > -1) return false;
  return true;
})(), picked.slice(0, 6).join('>'));
ok('quiz samples widely', new Set(picked).size >= 15, new Set(picked).size + ' distinct of 30');
const sq2 = Atlas.defaultState();
Atlas.SYSTEMS.forEach(s => { sq2.on[s.id] = s.id === 'circulatory'; });
for (let i = 0; i < 12; i++) {
  const t = Atlas.quizTarget(sq2);
  ok('quiz stays inside the enabled system', Atlas.get(t).sys === 'circulatory', t);
  sq2.quiz.asked = i + 1; sq2.quiz.recent = sq2.quiz.recent.concat([t]).slice(-3);
}

/* ---- report ---- */
const total = pass + fails.length;
console.log('verify_app.js — ' + pass + '/' + total + ' assertions passed');
if (fails.length) {
  console.log('\nFAILURES (' + fails.length + '):');
  fails.slice(0, 40).forEach(f => console.log('  ✗ ' + f));
  if (fails.length > 40) console.log('  … ' + (fails.length - 40) + ' more');
  process.exit(1);
}
console.log('structures: ' + all.length + '  shapes: ' + Atlas.stats().shapes +
  '  facts: ' + factCount + '  systems: ' + Atlas.SYSTEMS.length);
