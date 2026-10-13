/* =============================================================================
   UI — rendering. Every view is a pure function of state + Atlas data; the DOM
   is only ever set from those strings.
   ========================================================================== */
var st = Atlas.defaultState();
var $ = function (id) { return document.getElementById(id); };
var svg, world, labels, stage;

var SYS_BY_ID = {};
Atlas.SYSTEMS.forEach(function (s) { SYS_BY_ID[s.id] = s; });
function sysName(id) { return SYS_BY_ID[id] ? SYS_BY_ID[id].name : id; }
function sysColor(id) { return Atlas.colorOf(id); }
function sysHl(id) { return Atlas.hlOf(id); }

function renderSvg() {
  world.innerHTML = Atlas.svgBody(st) + '<g id="labels" pointer-events="none"></g>';
  labels = document.getElementById('labels');
  renderLabels();
}
function renderLabels() {
  if (!labels) return;
  var out = '', id = st.hl || st.sel;
  if (st.labels && id) {
    var p = Atlas.get(id), b = Atlas.bbox(p);
    if (b) {
      var right = b.cx < Atlas.CX;
      var lx = right ? Math.max(4, b.x - 108) : Math.min(Atlas.VIEW.w - 108, b.x + b.w + 10);
      var ly = b.y + Math.min(16, b.h / 2);
      out += '<path class="leader" d="M' + (right ? b.x - 4 : b.x + b.w + 4) + ',' + (b.cy) +
        'L' + (right ? lx + 100 : lx) + ',' + ly + '"/>';
      out += '<text class="lbl" x="' + (lx + (right ? 99 : 1)) + '" y="' + (ly - 3) + '" text-anchor="' + (right ? 'end' : 'start') + '">' +
        esc(p.name) + '</text>';
      out += '<text class="lbl-sub" x="' + (lx + (right ? 99 : 1)) + '" y="' + (ly + 8) + '" text-anchor="' + (right ? 'end' : 'start') + '">' +
        esc(sysName(p.sys)) + ' · ' + esc(p.region) + '</text>';
    }
  }
  labels.innerHTML = out;
}
function esc(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); }

/* --------------------------------------------------------------- sidebar --- */
function renderSidebar() {
  var h = '', tot = 0;
  Atlas.SYSTEMS.forEach(function (s) {
    var n = Atlas.partsOf(s.id).length; tot += n;
    var off = !st.on[s.id];
    h += '<div class="sys-row' + (off ? ' off' : '') + '" data-sys="' + s.id + '">' +
      '<div class="sys-top" data-toggle="' + s.id + '">' +
      '<span class="sys-dot" style="background:' + s.color + ';color:' + s.color + '"></span>' +
      '<span class="sys-name">' + esc(s.name) + '</span>' +
      '<span class="sys-eye">' + (off ? '&#9675;' : '&#9679;') + '</span>' +
      '<span class="sys-count">' + n + '</span>' +
      '</div>' +
      '<p class="sys-desc">' + esc(s.desc) + '</p>' +
      '<div class="sys-slider"><label>op</label><input type="range" min="0.08" max="1" step="0.01" value="' +
      st.opacity[s.id] + '" data-op="' + s.id + '"></div>' +
      '</div>';
  });
  $('sysList').innerHTML = h;
  $('totTag').textContent = tot + ' structures';
}
function renderRegions() {
  $('regionList').innerHTML = Atlas.REGIONS.map(function (r) {
    var n = Atlas.all().filter(function (p) { return p.region === r && st.on[p.sys]; }).length;
    return '<button class="region-chip" data-region="' + esc(r) + '">' + esc(r) + ' ' + n + '</button>';
  }).join('');
}
function renderLegend() {
  $('legend').innerHTML = Atlas.SYSTEMS.filter(function (s) { return st.on[s.id] && (!st.iso || st.iso === s.id); })
    .map(function (s) { return '<span><i style="background:' + s.color + '"></i>' + esc(s.short) + '</span>'; }).join('');
}
function renderHud() {
  var vis = Atlas.all().filter(function (p) { return st.on[p.sys] && (!st.iso || st.iso === p.sys); }).length;
  var moved = Object.keys(st.off).length;
  $('hud').innerHTML = '<span><b>' + vis + '</b> structures shown</span>' +
    '<span><b>' + moved + '</b> detached</span>' +
    '<span>' + (st.quiz.active ? 'quiz running' : 'drag a part · click for detail') + '</span>';
}
function renderResults(list, note) {
  var r = $('results');
  if (!list) { r.innerHTML = ''; return; }
  if (!list.length) { r.innerHTML = '<div class="res-none">' + esc(note || 'nothing matched') + '</div>'; return; }
  r.innerHTML = list.map(function (p) {
    return '<div class="res" data-id="' + p.id + '"><span class="rd" style="background:' + sysColor(p.sys) + '"></span>' +
      '<span style="flex:1">' + esc(p.name) + '</span><span class="rs">' + esc(p.region) + '</span></div>';
  }).join('');
}

/* ---------------------------------------------------------------- detail --- */
function renderDetail() {
  var empty = $('dEmpty'), body = $('dBody');
  if (!st.sel) {
    empty.classList.remove('hidden'); body.classList.add('hidden');
    $('dPaneTitle').textContent = 'Structure'; $('dIdx').textContent = '';
    return;
  }
  var p = Atlas.get(st.sel), inf = Atlas.infoOf(st.sel) || {};
  var hl = sysHl(p.sys);
  var idx = Atlas.all().filter(function (q) { return st.on[q.sys]; }).map(function (q) { return q.id; }).indexOf(p.id) + 1;
  var bb = Atlas.bbox(p) || { w: 0, h: 0 };
  var h = '<div class="d-head" style="--hl:' + hl + '">' +
    '<div class="d-sys">' + esc(sysName(p.sys)) + ' &middot; ' + esc(p.group) + '</div>' +
    '<h2 class="d-name">' + esc(p.name) + '</h2>' +
    '<div class="d-latin">' + esc(p.latin) + '</div>' +
    '<div class="d-tags">' +
    '<span class="d-tag hl">' + esc(p.region) + '</span>' +
    (inf.aka ? '<span class="d-tag">' + esc(inf.aka) + '</span>' : '') +
    '<span class="d-tag">extent ' + Math.round(bb.w) + ' &times; ' + Math.round(bb.h) + '</span>' +
    '</div>' +
    '<div class="d-actions">' +
    '<button data-act="locate">Locate</button>' +
    '<button data-act="solo">Only ' + esc(sysName(p.sys)) + '</button>' +
    '<button data-act="reset">Reset position</button>' +
    '</div></div>';

  h += '<div class="d-sec" style="--hl:' + hl + '"><h4>Function</h4><p>' + esc(inf.fn || '') + '</p></div>';
  if (inf.facts) h += '<div class="d-sec" style="--hl:' + hl + '"><h4>Key facts</h4><ul class="d-facts">' +
    inf.facts.map(function (f) { return '<li>' + esc(f) + '</li>'; }).join('') + '</ul></div>';
  if (inf.stats) h += '<div class="d-sec" style="--hl:' + hl + '"><h4>Figures</h4><div class="d-stats">' +
    inf.stats.map(function (kv) { return '<div class="d-stat"><div class="k">' + esc(kv[0]) + '</div><div class="v">' + esc(kv[1]) + '</div></div>'; }).join('') +
    '</div></div>';
  if (inf.conn && inf.conn.length) h += '<div class="d-sec" style="--hl:' + hl + '"><h4>Works with</h4><div class="d-conn">' +
    inf.conn.filter(function (id) { return Atlas.get(id); }).map(function (id) {
      return '<button data-goto="' + id + '">' + esc(Atlas.get(id).name) + '</button>';
    }).join('') + '</div></div>';
  h += '<div class="d-sec"><h4>Position</h4><div class="d-stats">' +
    '<div class="d-stat"><div class="k">Offsets</div><div class="v">' +
    (st.off[p.id] ? st.off[p.id].join(', ') : '0, 0') + '</div></div>' +
    '<div class="d-stat"><div class="k">Shapes</div><div class="v">' + p.shapes.length + '</div></div>' +
    '</div></div>';

  body.innerHTML = h;
  body.classList.remove('hidden'); empty.classList.add('hidden');
  $('dPaneTitle').textContent = 'Structure'; $('dIdx').textContent = '#' + idx + ' of ' + Atlas.all().filter(function (q) { return st.on[q.sys]; }).length;
  if (window.innerWidth <= 1240) $('detail').classList.add('open');
}

/* ------------------------------------------------------------------ misc --- */
var toastT = null;
function toast(msg) {
  var t = $('toast'); t.textContent = msg; t.classList.add('on');
  clearTimeout(toastT); toastT = setTimeout(function () { t.classList.remove('on'); }, 2200);
}
function paintAll() {
  renderSvg(); renderSidebar(); renderRegions(); renderLegend(); renderHud();
  syncToggles();
}
function syncToggles() {
  document.querySelectorAll('.sys-row').forEach(function (row) {
    var sys = row.dataset.sys, off = !st.on[sys] || (st.iso && st.iso !== sys);
    row.classList.toggle('off', off);
    var eye = row.querySelector('.sys-eye'); if (eye) eye.innerHTML = off ? '&#9675;' : '&#9679;';
    row.style.opacity = (st.iso && st.iso !== sys) ? .35 : 1;
  });
  $('btnXray').classList.toggle('on', st.xray);
  $('btnSkin').classList.toggle('on', st.skin);
  if (st.xray) world.classList.add('xray'); else world.classList.remove('xray');
}
