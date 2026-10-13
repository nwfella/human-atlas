/* =============================================================================
   UI — interaction: drag a structure out of the body, pan/zoom the figure,
   select for detail, quiz mode, exports and keyboard shortcuts.
   ========================================================================== */
var view = { tx: 0, ty: 0, k: 1 };
var drag = null;

function applyView() {
  world.setAttribute('transform', 'translate(' + view.tx + ',' + view.ty + ') scale(' + view.k + ')');
}
function toViewBox(e) {
  var m = svg.getScreenCTM(); if (!m) return { x: 0, y: 0 };
  var p = new DOMPoint(e.clientX, e.clientY).matrixTransform(m.inverse());
  return p;
}
function toWorld(e) {
  var u = toViewBox(e);
  return { x: (u.x - view.tx) / view.k, y: (u.y - view.ty) / view.k };
}
function fitView() { view = { tx: 0, ty: 0, k: 1 }; applyView(); }
function zoomAt(f, u) {
  var k1 = Math.max(0.55, Math.min(9, view.k * f));
  view.tx = u.x - (u.x - view.tx) * (k1 / view.k);
  view.ty = u.y - (u.y - view.ty) * (k1 / view.k);
  view.k = k1; applyView();
}

/* ------------------------------------------------------------ selection --- */
function selectPart(id, opts) {
  st.sel = id; st.hits++;
  document.querySelectorAll('.part.sel').forEach(function (g) { g.classList.remove('sel'); });
  var g = document.querySelector('.part[data-id="' + id + '"]');
  if (g) g.classList.add('sel');
  renderLabels(); renderDetail();
  if (opts && opts.focus) focusPart(id);
  if (st.quiz.active) quizAnswer(id);
}
function clearSelection() {
  st.sel = null;
  document.querySelectorAll('.part.sel').forEach(function (g) { g.classList.remove('sel'); });
  renderLabels(); renderDetail();
}
/* Structures are stacked: a click reaches the topmost one, and clicking again in
   the same place walks down the stack, so nothing is unreachable because a
   muscle or the rib cage happens to lie over it. */
var stackPick = { x: -999, y: -999, i: 0, n: 0 };
function partsAtPoint(x, y) {
  var els = document.elementsFromPoint(x, y), out = [];
  for (var i = 0; i < els.length; i++) {
    var g = els[i].closest ? els[i].closest('.part') : null;
    if (g && out.indexOf(g.dataset.id) === -1) out.push(g.dataset.id);
  }
  return out;
}
function pickAtPoint(x, y, fallbackId) {
  var ids = partsAtPoint(x, y);
  if (!ids.length) ids = [fallbackId];
  var same = Math.abs(x - stackPick.x) < 12 && Math.abs(y - stackPick.y) < 12;
  stackPick.i = (ids.length > 1 && same) ? (stackPick.i + 1) % ids.length : 0;
  stackPick.x = x; stackPick.y = y; stackPick.n = ids.length;
  var id = ids[stackPick.i];
  selectPart(id);
  if (ids.length > 1) toast(ids.length + ' structures at that point — click again for the next one');
  return id;
}
function focusPart(id) {
  var p = Atlas.get(id); if (!p) return;
  var b = Atlas.bbox(p), off = st.off[id] || [0, 0];
  if (!b) return;
  var k = Math.max(1, Math.min(3.4, 620 / Math.max(b.w + 60, b.h + 60)));
  view.k = k;
  view.tx = Atlas.VIEW.w / 2 - (b.cx + off[0]) * k;
  view.ty = Atlas.VIEW.h / 2 - (b.cy + off[1]) * k;
  applyView();
  var g = document.querySelector('.part[data-id="' + id + '"]');
  if (g) { g.classList.add('ok'); setTimeout(function () { g.classList.remove('ok'); }, 900); }
}

/* ----------------------------------------------------------------- drag --- */
function setPartOffset(id, dx, dy) {
  st.off[id] = [Math.round(dx * 10) / 10, Math.round(dy * 10) / 10];
  var g = document.querySelector('.part[data-id="' + id + '"]');
  if (g) {
    g.setAttribute('transform', 'translate(' + st.off[id][0] + ',' + st.off[id][1] + ')');
    g.classList.toggle('moved', !!(st.off[id][0] || st.off[id][1]));
  }
  renderLabels(); renderHud();
}
function onDown(e) {
  if (e.button !== 0 && e.pointerType === 'mouse') return;
  var g = e.target.closest ? e.target.closest('.part') : null;
  if (g) {
    var id = g.dataset.id, w = toWorld(e), off = st.off[id] || [0, 0];
    drag = { kind: 'part', id: id, g: g, start: w, off: off, moved: 0 };
    g.classList.add('dragging');
    atlas.classList.add('dragging');
    e.preventDefault();
  } else {
    drag = { kind: 'pan', start: toViewBox(e), tx: view.tx, ty: view.ty, moved: 0 };
    atlas.classList.add('grabbing');
  }
  hideTip();
}
function onMove(e) {
  if (!drag) {
    var g = e.target.closest ? e.target.closest('.part') : null;
    if (g && g.dataset.id !== st.hl) { st.hl = g.dataset.id; highlight(g.dataset.id); showTip(e, g.dataset.id); }
    else if (!g && st.hl) { st.hl = null; highlight(null); hideTip(); }
    else if (g) showTip(e, g.dataset.id);
    return;
  }
  if (drag.kind === 'part') {
    var w = toWorld(e);
    var dx = w.x - drag.start.x, dy = w.y - drag.start.y;
    drag.moved = Math.max(drag.moved, Math.abs(dx) + Math.abs(dy));
    setPartOffset(drag.id, drag.off[0] + dx, drag.off[1] + dy);
  } else {
    var u = toViewBox(e);
    var ddx = u.x - drag.start.x, ddy = u.y - drag.start.y;
    drag.moved = Math.max(drag.moved, Math.abs(ddx) + Math.abs(ddy));
    view.tx = drag.tx + ddx; view.ty = drag.ty + ddy; applyView();
  }
  hideTip();
}
function onUp(e) {
  if (!drag) return;
  if (drag.kind === 'part') {
    drag.g.classList.remove('dragging');
    atlas.classList.remove('dragging');
    if (drag.moved < 3.5) {
      if (e.shiftKey) soloSystem(Atlas.get(drag.id).sys);
      else pickAtPoint(e.clientX, e.clientY, drag.id);
    }
  } else {
    atlas.classList.remove('grabbing');
  }
  drag = null;
}
function highlight(id) {
  document.querySelectorAll('.part.hl').forEach(function (g) { g.classList.remove('hl'); });
  if (id) {
    var g = document.querySelector('.part[data-id="' + id + '"]');
    if (g) g.classList.add('hl');
  }
  renderLabels();
}
function showTip(e, id) {
  var p = Atlas.get(id); if (!p) return;
  var t = $('tooltip'), r = stage.getBoundingClientRect();
  t.innerHTML = '<span class="tt-sys">' + esc(sysName(p.sys)) + '</span>' + esc(p.name);
  t.classList.add('on');
  var x = e.clientX - r.left + 16, y = e.clientY - r.top + 6;
  var tw = t.offsetWidth;
  if (x + tw > r.width - 8) x = e.clientX - r.left - tw - 14;
  t.style.left = x + 'px'; t.style.top = y + 'px';
}
function hideTip() { $('tooltip').classList.remove('on'); }

/* ----------------------------------------------------------------- solo --- */
function soloSystem(sys) {
  if (st.iso === sys) { st.iso = null; toast('Showing all systems again'); }
  else { st.iso = sys; toast('Only ' + sysName(sys) + ' — shift-click any part or press Esc to restore'); }
  syncToggles(); renderSvg(); renderLegend(); renderHud();
}
function toggleSystem(sys) {
  if (st.iso) st.iso = null;
  st.on[sys] = !st.on[sys];
  syncToggles(); renderSvg(); renderSidebar(); renderRegions(); renderLegend(); renderHud();
}

/* ----------------------------------------------------------------- quiz --- */
function startQuiz() {
  st.quiz = { active: true, score: 0, asked: 0, streak: 0, best: 0, target: null, recent: [], state: '' };
  $('quizbar').classList.remove('hidden');
  $('btnQuiz').textContent = 'Exit quiz';
  $('btnQuiz').classList.add('on');
  askNext();
}
function stopQuiz(msg) {
  st.quiz.active = false;
  $('quizbar').classList.add('hidden');
  $('btnQuiz').textContent = 'Quiz mode';
  $('btnQuiz').classList.remove('on');
  if (msg) toast(msg);
  renderHud();
}
function askNext() {
  var id = Atlas.quizTarget(st);
  if (!id) { stopQuiz('No structures visible to quiz on — turn a system back on.'); return; }
  st.quiz.target = id; st.quiz.state = 'asking';
  st.quiz.recent = (st.quiz.recent || []).concat([id]).slice(-3);
  var p = Atlas.get(id);
  $('qPrompt').innerHTML = 'Click the <b>' + esc(p.name) + '</b>';
  $('qScore').textContent = st.quiz.score + ' / ' + st.quiz.asked + (st.quiz.streak > 1 ? '  ·  streak ' + st.quiz.streak : '');
  $('qFeed').textContent = '';
  $('qFeed').className = 'q-feed';
  clearSelection();
}
function quizAnswer(id) {
  if (!st.quiz.active) return;
  st.quiz.asked++;
  var g = document.querySelector('.part[data-id="' + id + '"]');
  if (id === st.quiz.target) {
    st.quiz.score++; st.quiz.streak++;
    st.quiz.best = Math.max(st.quiz.best, st.quiz.streak);
    if (g) { g.classList.add('ok'); setTimeout(function () { g.classList.remove('ok'); }, 800); }
    $('qFeed').textContent = 'correct'; $('qFeed').className = 'q-feed ok';
    setTimeout(function () { if (st.quiz.active) askNext(); }, 620);
  } else {
    st.quiz.streak = 0;
    if (g) { g.classList.add('bad'); setTimeout(function () { g.classList.remove('bad'); }, 800); }
    var t = document.querySelector('.part[data-id="' + st.quiz.target + '"]');
    if (t) { t.classList.add('missed'); setTimeout(function () { t.classList.remove('missed'); }, 1500); }
    $('qFeed').textContent = 'it was here'; $('qFeed').className = 'q-feed bad';
    setTimeout(function () { if (st.quiz.active) askNext(); }, 1400);
  }
  $('qScore').textContent = st.quiz.score + ' / ' + st.quiz.asked + (st.quiz.streak > 1 ? '  ·  streak ' + st.quiz.streak : '');
  renderHud();
}

/* --------------------------------------------------------------- exports --- */
function exportState() {
  var s = Atlas.clone(st);
  s.off = {}; s.sel = null; s.hl = null; s.labels = false; s.iso = st.iso || null;
  return s;
}
function buildSvgExport() {
  var v = Atlas.VIEW;
  return '<?xml version="1.0" encoding="UTF-8"?>\n' +
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ' + v.w + ' ' + v.h + '" width="' + v.w * 2 + '" height="' + v.h * 2 + '">' +
    '<title>Human Atlas</title>' +
    '<style>' + exportCss() + '</style>' +
    '<rect width="' + v.w + '" height="' + v.h + '" fill="#06090e"/>' +
    Atlas.svgBody(exportState()) +
    '<text x="' + (v.w / 2) + '" y="' + (v.h - 14) + '" fill="#64809b" font-family="monospace" font-size="13" text-anchor="middle">' +
    'HUMAN ATLAS — ' + Atlas.SYSTEMS.filter(function (s) { return exportState().on[s.id]; }).length + ' systems · ' +
    Atlas.all().filter(function (p) { return exportState().on[p.sys]; }).length + ' structures</text>' +
    '</svg>';
}
function exportCss() {
  var css = {
    bone: ['#e6e1d2', '#948a75'], cartilage: ['#cfe6ef', '#8ba6b6'], cavity: ['#070c12', '#948a75'],
    line: ['none', '#948a75'], skin: ['rgba(96,140,180,.07)', 'rgba(126,186,232,.34)'],
    muscle: ['#a8413a', '#6b241e'], muscle2: ['#8c3a34', '#5e211c'], tendon: ['#d3c6af', '#9d8d74'],
    artery: ['#c8443c', '#8a241f'], vein: ['#3b6fae', '#224a7a'], nerve: ['#e2c163', '#89722a'],
    brain: ['#d9a441', '#8d6a1f'], liver: ['#7d3a2c', '#4e2219'], lung: ['#bf7a84', '#7d434c'],
    heart: ['#a8322c', '#6d1c17'], kidney: ['#8b4a3a', '#57291e'], gut: ['#c99a6a', '#8a6440'],
    colon: ['#b3805a', '#7a5436'], stomach: ['#b5705e', '#7a4437'], spleen: ['#6e3a58', '#431f36'],
    panc: ['#cbb178', '#8a7444'], bladder: ['#c6ad6a', '#87703a'], gland: ['#a8695c', '#6b3c31'],
    eye: ['#8fc4e4', '#4c7f9c'], tra: ['#cfe2ec', '#8fa9b8'], adre: ['#c9a04a', '#8a6a24'],
    gall: ['#4e7a3e', '#2f4a24'], void: ['#0a0f16', 'none']
  };
  return Object.keys(css).map(function (k) {
    return '.r-' + k + '{fill:' + css[k][0] + ';stroke:' + css[k][1] + ';stroke-width:' + (k === 'bone' ? 1 : 0.8) + '}';
  }).join('');
}
function download(name, text, mime) {
  var blob = new Blob([text], { type: mime || 'image/svg+xml' });
  var a = document.createElement('a');
  a.href = URL.createObjectURL(blob); a.download = name;
  document.body.appendChild(a); a.click();
  setTimeout(function () { URL.revokeObjectURL(a.href); a.remove(); }, 1500);
}

/* ------------------------------------------------------------- controls --- */
function explode() {
  if (st.exploded) { st.off = {}; st.exploded = false; toast('Parts back in place'); }
  else { st.off = Atlas.explodeOffsets(50); st.exploded = true; toast('Exploded — drag any piece further, or Reset'); }
  renderSvg(); renderHud();
}
function resetParts() { st.off = {}; st.exploded = false; renderSvg(); renderHud(); toast('All structures reset'); }
function toggleXray() { st.xray = !st.xray; syncToggles(); renderSvg(); }
function toggleSkin() { st.skin = !st.skin; syncToggles(); renderSvg(); }

function wireControls() {
  $('btnExplode').onclick = explode;
  $('btnReset').onclick = resetParts;
  $('btnXray').onclick = toggleXray;
  $('btnSkin').onclick = toggleSkin;
  $('btnQuiz').onclick = function () { if (st.quiz.active) stopQuiz('Quiz ended — ' + st.quiz.score + '/' + st.quiz.asked); else startQuiz(); };
  $('qStop').onclick = function () { stopQuiz('Quiz ended — ' + st.quiz.score + '/' + st.quiz.asked + (st.quiz.best > 1 ? ' · best streak ' + st.quiz.best : '')); };
  $('qSkip').onclick = function () { if (st.quiz.active) askNext(); };
  $('zIn').onclick = function () { zoomAt(1.28, { x: Atlas.VIEW.w / 2, y: Atlas.VIEW.h / 2 }); };
  $('zOut').onclick = function () { zoomAt(1 / 1.28, { x: Atlas.VIEW.w / 2, y: Atlas.VIEW.h / 2 }); };
  $('zFit').onclick = fitView;
  $('btnSide').onclick = function () { $('sidebar').classList.toggle('open'); };
  $('btnInfo').onclick = function () { $('detail').classList.toggle('open'); };

  $('sysList').addEventListener('click', function (e) {
    var tg = e.target.closest('[data-toggle]');
    if (tg) { toggleSystem(tg.dataset.toggle); return; }
    var row = e.target.closest('.sys-row');
    if (row) soloSystem(row.dataset.sys);
  });
  $('sysList').addEventListener('input', function (e) {
    var op = e.target.closest('[data-op]');
    if (!op) return;
    st.opacity[op.dataset.op] = +op.value;
    var layer = document.querySelector('.sys-' + op.dataset.op);
    if (layer) layer.setAttribute('opacity', op.value);
  });
  $('regionList').addEventListener('click', function (e) {
    var b = e.target.closest('[data-region]'); if (!b) return;
    var r = b.dataset.region;
    renderResults(Atlas.all().filter(function (p) { return p.region === r && st.on[p.sys]; }), 'no structures in ' + r);
    toast(r + ' — ' + Atlas.all().filter(function (p) { return p.region === r && st.on[p.sys]; }).length + ' structures');
  });
  $('results').addEventListener('click', function (e) {
    var r = e.target.closest('[data-id]'); if (!r) return;
    selectPart(r.dataset.id, { focus: true });
    if (window.innerWidth <= 760) $('sidebar').classList.remove('open');
  });
  var si = $('search');
  si.addEventListener('input', function () {
    var q = si.value.trim();
    if (!q) { renderResults(null); return; }
    var hits = Atlas.search(q);
    renderResults(hits, 'no structure matches "' + q + '"');
  });
  si.addEventListener('keydown', function (e) {
    if (e.key === 'Enter') {
      var first = $('results').querySelector('[data-id]');
      if (first) selectPart(first.dataset.id, { focus: true });
    }
  });
  $('dBody').addEventListener('click', function (e) {
    var a = e.target.closest('[data-act]');
    if (a) {
      var id = st.sel;
      if (a.dataset.act === 'locate') focusPart(id);
      else if (a.dataset.act === 'solo') soloSystem(Atlas.get(id).sys);
      else if (a.dataset.act === 'reset') { delete st.off[id]; renderSvg(); renderDetail(); renderHud(); }
      return;
    }
    var g = e.target.closest('[data-goto]');
    if (g) selectPart(g.dataset.goto, { focus: true });
  });

  atlas.addEventListener('pointerdown', onDown);
  window.addEventListener('pointermove', onMove);
  window.addEventListener('pointerup', onUp);
  window.addEventListener('pointercancel', onUp);
  stage.addEventListener('wheel', function (e) {
    e.preventDefault();
    zoomAt(Math.exp(-e.deltaY * 0.0016), toViewBox(e));
  }, { passive: false });
  window.addEventListener('keydown', function (e) {
    if (e.target.tagName === 'INPUT') return;
    if (e.key === 'Escape') { if (st.iso) soloSystem(st.iso); clearSelection(); }
    else if (e.key === 'e') explode();
    else if (e.key === 'r') resetParts();
    else if (e.key === 'x') toggleXray();
    else if (e.key === '0') fitView();
    else if (e.key === '+') zoomAt(1.25, { x: Atlas.VIEW.w / 2, y: Atlas.VIEW.h / 2 });
    else if (e.key === '-') zoomAt(1 / 1.25, { x: Atlas.VIEW.w / 2, y: Atlas.VIEW.h / 2 });
  });
}
