#!/usr/bin/env node
/* Concatenates src/ fragments into the shipped single-file index.html.
   The artifact is standalone: no build step is needed to RUN it, this only
   assembles it from reviewable pieces. */
const fs = require('fs');
const path = require('path');
const root = path.join(__dirname, '..');

const CORE = ['00-base.js', '10-skeletal.js', '20-muscular.js', '30-circulatory.js', '40-nervous.js', '50-organs.js',
  '62-info-skeletal.js', '64-info-muscular.js', '65-info-circulatory.js', '66-info-nervous.js', '68-info-organs.js', '99-api.js'];
const UI = ['10-view.js', '20-interact.js', '30-harness.js'];

function read(rel) {
  const p = path.join(root, rel);
  if (!fs.existsSync(p)) throw new Error('missing fragment: ' + rel);
  return fs.readFileSync(p, 'utf8');
}

let out = read('src/head.html');
out += CORE.map(f => read('src/core/' + f)).join('\n');
out += read('src/mid.html');
out += UI.map(f => read('src/ui/' + f)).join('\n');
out += read('src/tail.html');

const problems = [];
const count = (s, needle) => s.split(needle).length - 1;
if (count(out, '/* CORE-START */') !== 1) problems.push('CORE-START marker count != 1');
if (count(out, '/* CORE-END */') !== 1) problems.push('CORE-END marker count != 1');
if (!/window\.__ATLAS__/.test(out)) problems.push('test hook window.__ATLAS__ missing');
if (/__FRAGMENT__/.test(out)) problems.push('unresolved fragment placeholder');
if (/<script src=/.test(out)) problems.push('external script tag found (must be zero-dependency)');
if (problems.length) {
  console.error('BUILD FAIL\n - ' + problems.join('\n - '));
  process.exit(1);
}
const dest = path.join(root, 'index.html');
fs.writeFileSync(dest, out);
console.log('built index.html  ' + out.length + ' bytes  ' + out.split('\n').length + ' lines');
