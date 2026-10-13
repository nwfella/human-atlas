/* =============================================================================
   HUMAN ATLAS — pure core. No document, no window, no fetch, no canvas.
   scripts/verify_app.js lifts this block out and runs it in Node.
   Anatomy is generated parametrically so every structure is a real path,
   labelled with its own record: name, Latin, system, region, function, facts.
   ========================================================================== */
var Atlas = (function () {
  'use strict';

  /* ---------------------------------------------------------------- geometry */
  var VIEW = { w: 400, h: 1000 };
  var CX = 200;                        // body midline

  function n1(v) { return Math.round(v * 10) / 10; }
  function f2(v) { return '' + n1(v); }
  function p2(p) { return f2(p[0]) + ',' + f2(p[1]); }
  function P(x, y) { return [n1(x), n1(y)]; }

  /* quadratic midpoint smoothing through a point list -> smooth polyline */
  function smooth(pts) {
    if (!pts || pts.length < 2) return '';
    var d = 'M' + p2(pts[0]);
    for (var i = 1; i < pts.length - 1; i++) {
      var mx = (pts[i][0] + pts[i + 1][0]) / 2, my = (pts[i][1] + pts[i + 1][1]) / 2;
      d += 'Q' + p2(pts[i]) + ' ' + f2(mx) + ',' + f2(my);
    }
    return d + 'L' + p2(pts[pts.length - 1]);
  }

  /* closed, tapered tube along a polyline: bones, muscle bellies, vessels, nerves */
  function tube(pts, widths) {
    if (typeof widths === 'number') { var w0 = widths; widths = pts.map(function () { return w0; }); }
    var L = [], R = [], i;
    for (i = 0; i < pts.length; i++) {
      var p = pts[i], w = (widths[i] === undefined ? widths[widths.length - 1] : widths[i]) / 2;
      var a = pts[Math.max(0, i - 1)], b = pts[Math.min(pts.length - 1, i + 1)];
      var dx = b[0] - a[0], dy = b[1] - a[1], len = Math.sqrt(dx * dx + dy * dy) || 1;
      var nx = -dy / len, ny = dx / len;
      L.push([p[0] + nx * w, p[1] + ny * w]);
      R.push([p[0] - nx * w, p[1] - ny * w]);
    }
    var d = smooth(L) + 'L' + p2(R[R.length - 1]);
    if (R.length > 2) d += smooth(R.slice(0, -1).reverse()).replace(/^M/, 'L') + 'L' + p2(L[0]);
    else d += 'L' + p2(L[0]);
    return d + 'Z';
  }

  /* ellipse as a cubic path (rot in degrees) */
  function ell(cx, cy, rx, ry, rot) {
    var k = 0.5523, a = (rot || 0) * Math.PI / 180, ca = Math.cos(a), sa = Math.sin(a);
    function T(x, y) { return f2(cx + x * ca - y * sa) + ',' + f2(cy + x * sa + y * ca); }
    return 'M' + T(rx, 0) +
      'C' + T(rx, k * ry) + ' ' + T(k * rx, ry) + ' ' + T(0, ry) +
      'C' + T(-k * rx, ry) + ' ' + T(-rx, k * ry) + ' ' + T(-rx, 0) +
      'C' + T(-rx, -k * ry) + ' ' + T(-k * rx, -ry) + ' ' + T(0, -ry) +
      'C' + T(k * rx, -ry) + ' ' + T(rx, -k * ry) + ' ' + T(rx, 0) + 'Z';
  }

  function rrect(x, y, w, h, r) {
    r = Math.min(r, w / 2, h / 2);
    return 'M' + p2([x + r, y]) + 'L' + p2([x + w - r, y]) + 'Q' + p2([x + w, y]) + ' ' + p2([x + w, y + r]) +
      'L' + p2([x + w, y + h - r]) + 'Q' + p2([x + w, y + h]) + ' ' + p2([x + w - r, y + h]) +
      'L' + p2([x + r, y + h]) + 'Q' + p2([x, y + h]) + ' ' + p2([x, y + h - r]) +
      'L' + p2([x, y + r]) + 'Q' + p2([x, y]) + ' ' + p2([x + r, y]) + 'Z';
  }

  function poly(pts, open) {
    var d = 'M' + p2(pts[0]);
    for (var i = 1; i < pts.length; i++) d += 'L' + p2(pts[i]);
    return open ? d : d + 'Z';
  }

  /* sided helpers: side = +1 -> patient's LEFT (screen right), -1 -> patient's RIGHT */
  function spa(s, dx, y) { return P(CX + s * dx, y); }
  function tubeS(s, spec) {
    return tube(spec.map(function (q) { return spa(s, q[0], q[1]); }), spec.map(function (q) { return q[2]; }));
  }
  function smoothS(s, spec) { return smooth(spec.map(function (q) { return spa(s, q[0], q[1]); })); }
  function ellS(s, dx, y, rx, ry, rot) { return ell(CX + s * dx, y, rx, ry, rot); }
  function rrectS(s, dx, y, w, h, r) { return rrect(CX + s * dx - w / 2, y, w, h, r); }

  function sh(d, r, extra) {
    var o = { d: d, r: r };
    if (extra) for (var k in extra) o[k] = extra[k];
    return o;
  }

  /* --------------------------------------------------------------- catalogue */
  var SYSTEMS = [
    { id: 'skeletal', name: 'Skeletal', short: 'Bones', color: '#e6e1d2', hl: '#ffd76a',
      desc: '206 bones: the framework that supports the body, shields the organs and levers every movement.' },
    { id: 'muscular', name: 'Muscular', short: 'Muscles', color: '#a8413a', hl: '#ff8f6a',
      desc: 'Over 600 muscles pull on bone to move, hold posture and generate most of the body heat.' },
    { id: 'circulatory', name: 'Circulatory', short: 'Vessels', color: '#3b6fae', hl: '#5eb2ff',
      desc: 'Heart, arteries and veins: ~100,000 km of vessels moving five litres of blood every minute.' },
    { id: 'nervous', name: 'Nervous', short: 'Nerves', color: '#e2c163', hl: '#ffe066',
      desc: 'Brain, spinal cord and nerves: 86 billion neurons of electrical control and sensation.' },
    { id: 'organs', name: 'Organs', short: 'Organs', color: '#bf7a84', hl: '#7ef0c0',
      desc: 'Thoracic and abdominal viscera: oxygen, digestion, filtration, detoxification, reproduction.' }
  ];
  /* paint order: viscera deepest, then the skeleton over them, vessels and
     nerves next, superficial muscle last */
  var RENDER_ORDER = ['organs', 'skeletal', 'circulatory', 'nervous', 'muscular'];
  var REGIONS = ['Head & neck', 'Thorax', 'Back & spine', 'Abdomen', 'Pelvis & hip', 'Upper limb', 'Lower limb'];

  var PARTS = [];
  var INFO = {};
  function part(o) { PARTS.push(o); return o; }
  function setInfo(map) { for (var k in map) INFO[k] = map[k]; }
  /* record helpers used by the info fragments */
  function one(id, r) { var m = {}; m[id] = r; setInfo(m); }
  function pair(base, r) { one(base + '-left', r); one(base + '-right', r); }
  function sysDef(id) { for (var i = 0; i < SYSTEMS.length; i++) if (SYSTEMS[i].id === id) return SYSTEMS[i]; return null; }
  function colorOf(id) { var s = sysDef(id); return s ? s.color : '#8fa'; }
  function hlOf(id) { var s = sysDef(id); return s ? s.hl : '#fff'; }

  /* -------------------------------------------------------------- svg output */
  function shapeSvg(s) {
    var a = 'd="' + s.d + '" class="r-' + s.r + '"';
    if (s.sw) a += ' stroke-width="' + s.sw + '"';
    if (s.dash) a += ' stroke-dasharray="' + s.dash + '"';
    if (s.op != null) a += ' opacity="' + s.op + '"';
    return '<path ' + a + '/>';
  }
  /* each shape ships twice: the painted path, plus a fat invisible hit path so
     a 3px-wide nerve is still an easy click target */
  function body(p, st) {
    var out = [], j;
    for (j = 0; j < p.shapes.length; j++) out.push(shapeSvg(p.shapes[j]));
    for (j = 0; j < p.shapes.length; j++) out.push('<path class="r-hit hit" d="' + p.shapes[j].d + '"/>');
    return out.join('');
  }

  function skinSvg() {
    /* right-hand half of the body outline, offset from the midline (dx, y) */
    var R = [
      [0, 15], [18, 20], [34, 44], [38, 72], [30, 100], [17, 118],
      [23, 130], [25, 152], [38, 164], [54, 171], [70, 179], [82, 188],
      [90, 215], [97, 255], [101, 300], [104, 345], [106, 395], [107, 440], [107, 486],
      [111, 505], [116, 540], [114, 566], [106, 578],
      [96, 560], [92, 520], [88, 486],
      [84, 440], [78, 395], [72, 350], [66, 310], [60, 300], [54, 296],
      [52, 318], [48, 356], [43, 382], [49, 404], [59, 438], [62, 462],
      [65, 510], [66, 570], [61, 620], [55, 662], [58, 700], [56, 765], [48, 820], [45, 858],
      [50, 890], [52, 918], [24, 926], [19, 892], [20, 866],
      [16, 800], [13, 720], [11, 662], [10, 600], [9, 545], [12, 500]
    ];
    var pts = R.map(function (q) { return [CX + q[0], q[1]]; });
    var mir = pts.slice(0, -1).map(function (q) { return [2 * CX - q[0], q[1]]; }).reverse();
    return sh(smooth(pts.concat(mir)) + 'Z', 'skin');
  }

  function svgBody(st) {
    var out = [], i, k;
    if (st.skin) out.push('<g class="layer skin-layer" opacity="1">' + shapeSvg(skinSvg()) + '</g>');
    for (k = 0; k < RENDER_ORDER.length; k++) {
      var sys = RENDER_ORDER[k];
      if (!st.on[sys] || (st.iso && st.iso !== sys)) continue;
      var op = (st.iso && st.iso !== sys) ? 0 : st.opacity[sys];
      out.push('<g class="layer sys-' + sys + '" data-sys="' + sys + '" opacity="' + op + '" style="--hl:' + hlOf(sys) + '">');
      for (i = 0; i < PARTS.length; i++) {
        var p = PARTS[i];
        if (p.sys !== sys) continue;
        var off = st.off[p.id] || [0, 0];
        var cls = 'part' + (st.sel === p.id ? ' sel' : '') + (st.hl === p.id ? ' hl' : '') +
          (off[0] || off[1] ? ' moved' : '') + (st.xray && p.sys === 'skeletal' ? ' xray' : '');
        out.push('<g class="' + cls + '" data-id="' + p.id + '" data-name="' + String(p.name).replace(/"/g, '&quot;') +
          '" transform="translate(' + off[0] + ',' + off[1] + ')" style="--hl:' + hlOf(sys) + '">' + body(p, st) + '</g>');
      }
      out.push('</g>');
    }
    return out.join('');
  }

  /* ------------------------------------------------------------------ lookups */
  function all() { return PARTS; }
  function get(id) { for (var i = 0; i < PARTS.length; i++) if (PARTS[i].id === id) return PARTS[i]; return null; }
  function infoOf(id) { return INFO[id] || null; }
  function partsOf(sys) { return PARTS.filter(function (p) { return p.sys === sys; }); }
  function systemsOf() { return SYSTEMS.slice(); }

  function search(q) {
    q = String(q || '').trim().toLowerCase();
    if (!q) return [];
    var hits = [];
    for (var i = 0; i < PARTS.length; i++) {
      var p = PARTS[i], inf = INFO[p.id] || {};
      var hay = (p.name + ' ' + (p.latin || '') + ' ' + (p.region || '') + ' ' + p.sys + ' ' +
        (inf.aka || '') + ' ' + (inf.fn || '')).toLowerCase();
      var name = p.name.toLowerCase(), score = -1;
      if (name.indexOf(q) === 0) score = 0;
      else if (name.indexOf(q) > 0 || name.indexOf(' ' + q) > -1) score = 1;
      else if (hay.indexOf(q) > -1) score = 2;
      if (score > -1) hits.push({ p: p, s: score });
    }
    hits.sort(function (a, b) {
      return a.s - b.s || a.p.name.length - b.p.name.length || (a.p.name < b.p.name ? -1 : 1);
    });
    return hits.slice(0, 24).map(function (h) { return h.p; });
  }

  /* bounding box from path data (all commands are absolute, coords in pairs) */
  function bbox(p) {
    var minx = 1e9, miny = 1e9, maxx = -1e9, maxy = -1e9, any = false;
    for (var i = 0; i < p.shapes.length; i++) {
      var nums = p.shapes[i].d.match(/-?\d+(\.\d+)?/g) || [];
      for (var j = 0; j + 1 < nums.length; j += 2) {
        var x = +nums[j], y = +nums[j + 1];
        if (x < minx) minx = x; if (x > maxx) maxx = x;
        if (y < miny) miny = y; if (y > maxy) maxy = y;
        any = true;
      }
    }
    return any ? { x: minx, y: miny, w: maxx - minx, h: maxy - miny, cx: (minx + maxx) / 2, cy: (miny + maxy) / 2 } : null;
  }

  /* ------------------------------------------------------------------- state */
  function defaultState() {
    var on = {}, op = {};
    SYSTEMS.forEach(function (s) { on[s.id] = true; op[s.id] = s.id === 'muscular' ? 0.5 : (s.id === 'circulatory' ? 0.9 : 1); });
    return {
      on: on, opacity: op, skin: true, xray: false,
      sel: null, hl: null, off: {}, exploded: false, iso: null,
      labels: true, hits: 0,
      quiz: { active: false, score: 0, asked: 0, streak: 0, best: 0, target: null, recent: [], state: '' }
    };
  }
  function clone(x) { return JSON.parse(JSON.stringify(x)); }

  /* Explode = unfold, not blow apart. Each structure moves radially away from
     the body centre by an amount scaled to its system, so viscera stay near the
     midline while the skeleton and muscle shells step outward and the figure
     stays readable. */
  function explodeOffsets(amount) {
    var c = { x: CX, y: 470 }, off = {};
    var factor = { skeletal: 1.0, muscular: 1.25, circulatory: 0.7, nervous: 0.6, organs: 0.42 };
    PARTS.forEach(function (p) {
      var b = bbox(p); if (!b) return;
      var dx = b.cx - c.x, dy = b.cy - c.y, L = Math.sqrt(dx * dx + dy * dy) || 1;
      var k = amount * (factor[p.sys] || 1) * (0.84 + 0.32 * ((p.id.length % 7) / 7));
      off[p.id] = [n1(dx / L * k), n1(dy / L * k)];
    });
    return off;
  }

  function quizTarget(st) {
    var pool = PARTS.filter(function (p) {
      return st.on[p.sys] && st.quiz.recent.indexOf(p.id) === -1 && (INFO[p.id] || p.sys !== 'muscular');
    });
    if (!pool.length) pool = PARTS.filter(function (p) { return st.on[p.sys]; });
    if (!pool.length) return null;
    var seed = (st.quiz.asked * 2654435761 + st.quiz.score * 40503 + st.hits * 97) % pool.length;
    return pool[seed].id;
  }

  function stats() {
    var per = {}, shapes = 0;
    SYSTEMS.forEach(function (s) { per[s.id] = 0; });
    PARTS.forEach(function (p) { per[p.sys] = (per[p.sys] || 0) + 1; shapes += p.shapes.length * 2; });
    return { total: PARTS.length, per: per, shapes: shapes, withInfo: Object.keys(INFO).length };
  }

  function validate() {
    var bad = [], ids = {}, i;
    for (i = 0; i < PARTS.length; i++) {
      var p = PARTS[i];
      if (ids[p.id]) bad.push('duplicate id: ' + p.id); else ids[p.id] = 1;
      if (!p.name) bad.push(p.id + ': no name');
      if (!p.latin) bad.push(p.id + ': no Latin name');
      if (!p.region || REGIONS.indexOf(p.region) === -1) bad.push(p.id + ': bad region "' + p.region + '"');
      if (!sysDef(p.sys)) bad.push(p.id + ': unknown system ' + p.sys);
      if (!p.shapes || !p.shapes.length) bad.push(p.id + ': no shapes');
      (p.shapes || []).forEach(function (s, n) {
        if (!/^M/.test(s.d)) bad.push(p.id + '[' + n + ']: path does not start with M');
        if (/NaN|undefined|Infinity/.test(s.d)) bad.push(p.id + '[' + n + ']: bad numeric in path');
        if (!/^[r]?-?[a-z]/.test(s.r) || !s.r) bad.push(p.id + '[' + n + ']: no role');
      });
      var inf = INFO[p.id];
      if (!inf) bad.push(p.id + ': missing INFO record');
      else {
        if (!inf.fn || inf.fn.length < 60) bad.push(p.id + ': function text too thin');
        if (!inf.facts || inf.facts.length < 3) bad.push(p.id + ': needs >= 3 facts');
        (inf.facts || []).forEach(function (f, n) {
          if (String(f).length < 25) bad.push(p.id + ': fact ' + n + ' too thin');
          if (/(lorem|placeholder|TODO|TBD)/i.test(f)) bad.push(p.id + ': placeholder fact ' + n);
        });
        if (!inf.stats || inf.stats.length < 2) bad.push(p.id + ': needs >= 2 figures');
        (inf.stats || []).forEach(function (kv, n) {
          if (!kv || kv.length !== 2 || !kv[0] || !kv[1]) bad.push(p.id + ': bad figure ' + n);
        });
        if (!inf.conn || inf.conn.length < 2) bad.push(p.id + ': needs >= 2 related structures');
        (inf.conn || []).forEach(function (cid) {
          if (!get(cid)) bad.push(p.id + ': related structure "' + cid + '" does not exist');
        });
      }
      if (!p.group) bad.push(p.id + ': no group');
    }
    for (var k in INFO) if (!ids[k]) bad.push('orphan INFO record: ' + k);
    SYSTEMS.forEach(function (s) {
      if (!partsOf(s.id).length) bad.push('system with no parts: ' + s.id);
    });
    return bad;
  }

  var API = {
    VERSION: '1.0.0', VIEW: VIEW, CX: CX, SYSTEMS: SYSTEMS, RENDER_ORDER: RENDER_ORDER, REGIONS: REGIONS,
    all: all, get: get, infoOf: infoOf, partsOf: partsOf, systemsOf: systemsOf, search: search,
    bbox: bbox, svgBody: svgBody, skinSvg: skinSvg, shapeSvg: shapeSvg,
    defaultState: defaultState, clone: clone, explodeOffsets: explodeOffsets, quizTarget: quizTarget,
    stats: stats, validate: validate, colorOf: colorOf, hlOf: hlOf,
    /* primitives re-exported for tests */
    geom: { smooth: smooth, tube: tube, ell: ell, rrect: rrect, poly: poly, tubeS: tubeS, ellS: ellS, smoothS: smoothS, rrectS: rrectS, spa: spa, sh: sh }
  };
