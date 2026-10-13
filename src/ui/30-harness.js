/* =============================================================================
   UI — boot, query-string harness modes (?selftest / ?autoplay / ?metrics /
   ?pick / ?sys / ?explode / ?xray) and the window.__ATLAS__ test hook.
   ========================================================================== */
function boot() {
  svg = $('atlas'); stage = $('stage');
  svg.setAttribute('viewBox', '0 0 ' + Atlas.VIEW.w + ' ' + Atlas.VIEW.h);
  svg.innerHTML = '<g id="world"></g>';
  world = $('world');
  applyView();
  paintAll();
  wireControls();
  applyQuery();
  if (typeof window !== 'undefined') window.__ATLAS__.ready = true;
}

function applyQuery() {
  var q = window.location.search.replace(/^\?/, '');
  if (!q) return;
  var params = {};
  q.split('&').forEach(function (kv) {
    var i = kv.indexOf('=');
    if (i < 0) params[decodeURIComponent(kv)] = '1';
    else params[decodeURIComponent(kv.slice(0, i))] = decodeURIComponent(kv.slice(i + 1));
  });
  if (params.sys) {
    var want = params.sys.split(',');
    Atlas.SYSTEMS.forEach(function (s) { st.on[s.id] = want.indexOf(s.id) > -1; });
    paintAll();
  }
  if (params.xray) { st.xray = true; syncToggles(); renderSvg(); }
  if (params.skin === '0') { st.skin = false; syncToggles(); renderSvg(); }
  if (params.explode) { st.off = Atlas.explodeOffsets(34); st.exploded = true; renderSvg(); renderHud(); }
  if (params.pick) { st.on[Atlas.get(params.pick).sys] = true; renderSvg(); selectPart(params.pick, { focus: !!params.focus }); }
  if (params.zoom) zoomAt(+params.zoom, { x: Atlas.VIEW.w / 2, y: Atlas.VIEW.h / 2 });
  if (params.selftest) selftest();
  if (params.metrics) metrics();
  if (params.autoplay) autoplay();
}

/* ------------------------------------------------------------- selftest --- */
function selftest() {
  var out = [], fails = [], pass = 0;
  function ok(name, cond, detail) {
    if (cond) { pass++; return; }
    fails.push(name + (detail ? ' — ' + detail : ''));
  }
  var all = Atlas.all(), sys = Atlas.SYSTEMS.map(function (s) { return s.id; });

  ok('markers', typeof Atlas.svgBody === 'function');
  ok('five systems', Atlas.SYSTEMS.length === 5);
  ok('render order covers systems', Atlas.RENDER_ORDER.length === 5 &&
    sys.every(function (s) { return Atlas.RENDER_ORDER.indexOf(s) > -1; }));
  ok('part count >= 150', all.length >= 150, 'got ' + all.length);
  sys.forEach(function (s) {
    ok('system ' + s + ' has parts', Atlas.partsOf(s).length >= 15, s + ' = ' + Atlas.partsOf(s).length);
  });
  /* data integrity */
  var bad = Atlas.validate();
  ok('validate() clean', bad.length === 0, bad.slice(0, 6).join(' | '));
  /* every id unique, every INFO present */
  ok('info for every part', all.every(function (p) { return !!Atlas.infoOf(p.id); }));
  ok('no orphan info', Atlas.stats().withInfo === all.length, Atlas.stats().withInfo + ' vs ' + all.length);
  /* geometry sanity */
  var nan = all.filter(function (p) { return p.shapes.some(function (s) { return /NaN|undefined|null/.test(s.d); }); });
  ok('no bad numbers in paths', nan.length === 0, nan.map(function (p) { return p.id; }).slice(0, 4).join(','));
  var tiny = all.filter(function (p) { var b = Atlas.bbox(p); return !b || b.w === 0 || b.h === 0; });
  ok('every part has real extent', tiny.length === 0, tiny.map(function (p) { return p.id; }).slice(0, 4).join(','));
  var inbounds = all.filter(function (p) {
    var b = Atlas.bbox(p);
    return b && (b.x < -30 || b.y < -10 || b.x + b.w > Atlas.VIEW.w + 30 || b.y + b.h > Atlas.VIEW.h + 10);
  });
  ok('all parts inside viewBox', inbounds.length === 0, inbounds.map(function (p) { return p.id; }).slice(0, 5).join(','));
  /* laterality: patient's left must sit on screen right */
  var pairs = [['humerus', 'femur'], ['lung'], ['kidney'], ['scapula']];
  pairs.forEach(function (grp) {
    grp.forEach(function (base) {
      var l = Atlas.get(base + '-left'), r = Atlas.get(base + '-right');
      if (!l || !r) { ok('laterality pair ' + base, false, 'missing'); return; }
      var lb = Atlas.bbox(l), rb = Atlas.bbox(r);
      ok('laterality ' + base + ' L right of R', lb.cx > rb.cx, lb.cx + ' vs ' + rb.cx);
      ok('laterality ' + base + ' mirrored', Math.abs((lb.cx + rb.cx) / 2 - Atlas.CX) < 4, (lb.cx + rb.cx) / 2 + ' vs mid ' + Atlas.CX);
    });
  });
  /* state driving */
  var s1 = Atlas.defaultState();
  var body1 = Atlas.svgBody(s1);
  ok('svgBody includes skin', body1.indexOf('r-skin') > -1);
  ok('svgBody has every enabled part', all.every(function (p) { return body1.indexOf('data-id="' + p.id + '"') > -1; }));
  var s2 = Atlas.clone(s1); s2.on.organs = false;
  var body2 = Atlas.svgBody(s2);
  var organs = Atlas.partsOf('organs');
  ok('disabled system leaves the DOM', organs.every(function (p) { return body2.indexOf('data-id="' + p.id + '"') === -1; }));
  ok('other systems survive', body2.indexOf('data-id="heart"') > -1 && body2.indexOf('data-id="femur-left"') > -1);
  var s3 = Atlas.clone(s1); s3.off['heart'] = [40, -30];
  ok('offset lands in the transform', /data-id="heart"[^>]*transform="translate\(40,-30\)"/.test(Atlas.svgBody(s3)));
  var s4 = Atlas.clone(s1); s4.iso = 'skeletal';
  var body4 = Atlas.svgBody(s4);
  ok('iso hides other systems', body4.indexOf('data-id="heart"') === -1 && body4.indexOf('data-id="cranium"') > -1);
  var s5 = Atlas.clone(s1); s5.sel = 'liver'; s5.hl = 'liver';
  ok('selection reaches the markup', /class="part sel hl"[^>]*data-id="liver"/.test(Atlas.svgBody(s5)));
  /* hit targets: every painted shape has an invisible twin */
  var sample = Atlas.get('aorta');
  var bodyA = Atlas.svgBody(s1);
  ok('hit targets emitted', (bodyA.match(/class="r-hit hit"/g) || []).length ===
    all.filter(function (p) { return s1.on[p.sys]; }).reduce(function (a, p) { return a + p.shapes.length; }, 0));
  /* explode */
  var off = Atlas.explodeOffsets(26);
  ok('explode covers every part', Object.keys(off).length === all.length);
  ok('explode pushes away from the midline', Atlas.get('humerus-left') && off['humerus-left'][0] > 0 && off['humerus-right'][0] < 0,
    off['humerus-left'].join(',') + ' / ' + off['humerus-right'].join(','));
  /* search */
  ok('search femur first', (Atlas.search('femur')[0] || {}).id === 'femur-left' || (Atlas.search('femur')[0] || {}).id === 'femur-right');
  ok('search latin', Atlas.search('hepar').some(function (p) { return p.id === 'liver'; }));
  ok('search empty -> none', Atlas.search('   ').length === 0);
  ok('search miss -> none', Atlas.search('zzzzz').length === 0);
  /* quiz */
  var sq = Atlas.defaultState();
  var seen = {}, dup = false;
  for (var i = 0; i < 24; i++) {
    var t = Atlas.quizTarget(sq);
    if (!t) { dup = true; break; }
    if (seen[t] && Object.keys(seen).length < 22) dup = true;
    seen[t] = 1; sq.quiz.asked = i + 1; sq.quiz.recent = sq.quiz.recent.concat([t]).slice(-3);
  }
  ok('quiz target always resolvable', !dup && Object.keys(seen).length >= 8, Object.keys(seen).length + ' distinct');
  var sq2 = Atlas.defaultState();
  Atlas.SYSTEMS.forEach(function (s) { sq2.on[s.id] = (s.id === 'nervous'); });
  var t2 = Atlas.quizTarget(sq2);
  ok('quiz stays inside enabled systems', !!t2 && Atlas.get(t2).sys === 'nervous', t2);
  /* organ placement: heart left of midline, liver right of it */
  ok('heart sits in the left chest', Atlas.bbox(Atlas.get('heart')).cx > Atlas.CX,
    Atlas.bbox(Atlas.get('heart')).cx + ' vs ' + Atlas.CX);
  ok('liver sits in the right upper abdomen', Atlas.bbox(Atlas.get('liver')).cx < Atlas.CX,
    Atlas.bbox(Atlas.get('liver')).cx);
  /* determinism */
  ok('geometry deterministic', Atlas.svgBody(Atlas.defaultState()) === body1);
  ok('export matches the rendered markup', buildSvgExport().indexOf(Atlas.svgBody(exportState())) > -1);

  var title = 'SELFTEST ' + (fails.length ? 'FAIL' : 'PASS') + ' (' + pass + ' checks)';
  document.title = title;
  out.push(title);
  if (fails.length) out.push(fails.join('\n'));
  var pre = document.createElement('pre');
  pre.id = 'selftestOut'; pre.textContent = out.join('\n');
  pre.style.cssText = 'position:fixed;left:0;bottom:0;z-index:99;background:#000;color:#0f0;font:11px monospace;max-height:40vh;overflow:auto';
  document.body.appendChild(pre);
  return { pass: pass, fails: fails };
}

function metrics() {
  var d = document.documentElement;
  var r = svg.getBoundingClientRect();
  document.title = 'METRICS::' + JSON.stringify({
    iw: window.innerWidth, sw: d.scrollWidth, overflow: d.scrollWidth - window.innerWidth,
    svgW: Math.round(r.width), svgH: Math.round(r.height), parts: Atlas.all().length,
    rendered: (svg.querySelectorAll('.part').length)
  });
}

/* -------------------------------------------------------------- autoplay --- */
function autoplay() {
  var log = [];
  function n(sel) { return sel ? sel.length : 0; }
  log.push('rendered=' + n(svg.querySelectorAll('.part')));
  toggleSystem('muscular');
  log.push('muscularOff=' + (svg.querySelectorAll('.sys-muscular .part').length === 0));
  toggleSystem('muscular');
  selectPart('heart');
  log.push('sel=' + (document.querySelectorAll('.part.sel').length) + '/' + (st.sel || '-'));
  log.push('detail=' + (($('dBody').textContent || '').indexOf('Heart') > -1));
  log.push('facts=' + n($('dBody').querySelectorAll('.d-facts li')));
  var before = st.off['liver'] || [0, 0];
  setPartOffset('liver', before[0] + 30, before[1] - 12);
  var moved = document.querySelector('.part[data-id="liver"]').getAttribute('transform');
  log.push('dragged=' + moved);
  /* re-render must preserve the drag */
  toggleSystem('nervous'); toggleSystem('nervous');
  log.push('dragSurvived=' + (document.querySelector('.part[data-id="liver"]').getAttribute('transform') === moved));
  delete st.off['liver'];
  explode(); log.push('exploded=' + Object.keys(st.off).length);
  resetParts(); log.push('reset=' + Object.keys(st.off).length);
  var q = Atlas.search('ulna'); log.push('search=' + q.length);
  startQuiz();
  var hits = 0;
  for (var i = 0; i < 5; i++) {
    var target = st.quiz.target;
    if (i === 2) { /* one deliberate wrong answer */ }
    var pick = (i === 2) ? Atlas.all().filter(function (p) { return p.id !== target && st.on[p.sys]; })[12].id : target;
    quizAnswer(pick);
    if (pick === target) hits++;
    if (st.quiz.active) askNext();
  }
  log.push('quiz=' + st.quiz.score + '/' + st.quiz.asked + ' hits=' + hits);
  stopQuiz();
  soloSystem('skeletal'); log.push('iso=' + st.iso);
  soloSystem('skeletal'); log.push('isoOff=' + (st.iso === null));
  focusPart('sacrum'); log.push('zoom=' + view.k.toFixed(2));
  fitView(); log.push('fit=' + (view.k === 1));
  log.push('exportBytes=' + buildSvgExport().length);
  log.push('partsInExport=' + (buildSvgExport().match(/data-id=/g) || []).length);
  document.title = 'AUTOPLAY ' + log.join(' | ');
}

/* ----------------------------------------------------------------- hook --- */
window.__ATLAS__ = {
  ready: false,
  data: Atlas,
  get state() { return st; },
  dom: function () {
    return {
      rendered: svg.querySelectorAll('.part').length,
      selected: document.querySelectorAll('.part.sel').length,
      detailName: ($('dBody').querySelector('.d-name') || {}).textContent || '',
      facts: $('dBody').querySelectorAll('.d-facts li').length,
      sysRows: $('sysList').querySelectorAll('.sys-row').length,
      legend: $('legend').children.length,
      hud: $('hud').textContent,
      title: document.title,
      tooltip: $('tooltip').classList.contains('on'),
      transformOf: function (id) {
        var g = document.querySelector('.part[data-id="' + id + '"]');
        return g ? g.getAttribute('transform') : null;
      }
    };
  },
  selectPart: selectPart, clearSelection: clearSelection, setSystems: function (list) {
    Atlas.SYSTEMS.forEach(function (s) { st.on[s.id] = list.indexOf(s.id) > -1; });
    paintAll();
  },
  toggleSystem: toggleSystem, soloSystem: soloSystem, setOpacity: function (sys, v) {
    st.opacity[sys] = v; var l = document.querySelector('.sys-' + sys); if (l) l.setAttribute('opacity', v);
  },
  drag: setPartOffset, explode: explode, resetParts: resetParts, focusPart: focusPart,
  search: Atlas.search, svgBody: Atlas.svgBody, exportSvg: buildSvgExport, exportState: exportState,
  quiz: { start: startQuiz, stop: stopQuiz, answer: quizAnswer, state: function () { return st.quiz; } },
  selftest: selftest, autoplay: autoplay, metrics: metrics, view: function () { return view; },
  setView: function (tx, ty, k) { view = { tx: tx, ty: ty, k: k }; applyView(); }
};

if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
else boot();
