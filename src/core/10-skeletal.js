/* =============================================================================
   SKELETAL SYSTEM — 47 structures, generated parametrically.
   Laterality convention: side +1 = patient's LEFT (screen right).
   Bones are deliberately chunky and joints overlap: an atlas skeleton that
   reads as disconnected sticks is worse than one that is anatomically coarse.
   ========================================================================== */
(function () {
  var S = 'skeletal';
  var sides = [[-1, 'right', 'dexter'], [1, 'left', 'sinister']];

  function vert(y, bw, bh, tpw, tph, spin) {
    var out = [sh(ell(CX, y + bh / 2, bw / 2, bh / 2), 'bone')];
    if (spin) out.push(sh(ell(CX, y + bh * 0.8, 2.9, bh * 0.3), 'bone'));
    return out;
  }
  /* one rib: sweeps from the spine out, around the chest and forward, ending at
     the sternum (true ribs) or free in the costal arch (false / floating) */
  function ribShapes(side, y0, frontDX, frontY, bulgeDX, w, cart) {
    var pts = [spa(side, 12, y0), spa(side, bulgeDX * 0.45, y0 + 1), spa(side, bulgeDX * 0.86, y0 + 7),
      spa(side, bulgeDX, y0 + 16), spa(side, bulgeDX - 8, y0 + 26), spa(side, frontDX + 18, frontY - 9), spa(side, frontDX + 13, frontY - 4)];
    var out = [sh(tube(pts, [w, w * 1.1, w * 1.05, w, w * 0.95, w * 0.9, w * 0.85]), 'bone')];
    if (cart) out.push(sh(tube([spa(side, frontDX + 18, frontY - 8), spa(side, frontDX, frontY)], [w * 0.86, w * 0.74]), 'cartilage'));
    return out;
  }
  function ribPart(id, name, latin, side, sideName, range, kind) {
    var shapes = [];
    range.forEach(function (i) {
      if (kind === 'true') shapes = shapes.concat(ribShapes(side, 190 + i * 7.8, 13, 198 + i * 11.6, 68 + (i >= 3 ? 4 : 0), i < 2 ? 5.8 : (i < 5 ? 5.4 : 4.8), true));
      else if (kind === 'false') shapes = shapes.concat(ribShapes(side, 245 + i * 7.6, 26 + i * 2.5, 254 + i * 9, 72, 5 - i * 0.2, true));
      else shapes = shapes.concat(ribShapes(side, 268 + i * 7, 46 - i * 4, 288 + i * 8, 66 - i * 4, 4.2 - i * 0.2, false));
    });
    part({ id: id, name: name, latin: latin, sys: S, region: 'Thorax', group: 'Rib cage (' + sideName + ')', shapes: shapes });
  }

  /* ------------------------------------------------------------- skull ---- */
  part({
    id: 'cranium', name: 'Cranium', latin: 'Neurocranium', sys: S, region: 'Head & neck', group: 'Skull',
    shapes: [
      sh('M200,20C224,20 244,40 244,70C244,94 232,106 216,110L184,110C168,106 156,94 156,70C156,40 176,20 200,20Z', 'bone'),
      sh('M200,22C197,52 198,82 200,108', 'line'),
      sh('M163,60C182,50 218,50 237,60', 'line'),
      sh('M176,92C186,96 214,96 224,92', 'line')
    ]
  });
  part({
    id: 'facial-bones', name: 'Facial bones', latin: 'Ossa faciei', sys: S, region: 'Head & neck', group: 'Skull',
    shapes: [
      sh('M171,102C173,94 187,90 200,90C213,90 227,94 229,102C231,116 226,130 212,136L188,136C174,130 169,116 171,102Z', 'bone'),
      sh(ell(183, 112, 13, 10), 'cavity'), sh(ell(217, 112, 13, 10), 'cavity'),
      sh(poly([[200, 120], [195, 134], [205, 134]]), 'cavity'),
      sh('M200,104L200,120', 'line'),
      sh('M171,102C167,110 169,118 175,124', 'line'),
      sh('M229,102C233,110 231,118 225,124', 'line'),
      sh(rrect(185, 135, 4.4, 5.6, 1.5), 'cartilage'), sh(rrect(190.6, 135, 4.4, 5.6, 1.5), 'cartilage'),
      sh(rrect(196.2, 135, 4.4, 5.6, 1.5), 'cartilage'), sh(rrect(201.8, 135, 4.4, 5.6, 1.5), 'cartilage'),
      sh(rrect(207.4, 135, 4.4, 5.6, 1.5), 'cartilage')
    ]
  });
  part({
    id: 'mandible', name: 'Mandible', latin: 'Mandibula', sys: S, region: 'Head & neck', group: 'Skull',
    shapes: [
      sh('M172,98L179,124C181,138 190,145 200,145C210,145 219,138 221,124L228,98L219,96L213,122C211,132 206,136 200,136C194,136 189,132 187,122L181,96Z', 'bone'),
      sh('M182,96L184,122', 'line'), sh('M218,96L216,122', 'line'),
      sh(rrect(188, 139, 4.2, 5.6, 1.5), 'cartilage'), sh(rrect(193.4, 139, 4.2, 5.6, 1.5), 'cartilage'),
      sh(rrect(198.8, 139, 4.2, 5.6, 1.5), 'cartilage'), sh(rrect(204.2, 139, 4.2, 5.6, 1.5), 'cartilage')
    ]
  });
  part({
    id: 'hyoid', name: 'Hyoid bone', latin: 'Os hyoideum', sys: S, region: 'Head & neck', group: 'Skull',
    shapes: [
      sh(tube([[179, 152], [187, 159], [200, 161], [213, 159], [221, 152]], [3.8, 4.4, 4.4, 4.4, 3.8]), 'bone')
    ]
  });

  /* ------------------------------------------------------------- spine ---- */
  var cerv = [], thor = [], lumb = [], y;
  for (y = 0; y < 7; y++) cerv = cerv.concat(vert(126 + y * 7.4, 21, 6, 5.4, 3.4, true));
  for (y = 0; y < 12; y++) thor = thor.concat(vert(180 + y * 9.6, 23, 8, 7.5, 4.4, true));
  for (y = 0; y < 5; y++) lumb = lumb.concat(vert(300 + y * 14, 29, 12.5, 10, 6.5, true));
  part({
    id: 'cervical-spine', name: 'Cervical spine (C1–C7)', latin: 'Vertebrae cervicales', sys: S, region: 'Back & spine', group: 'Spine',
    shapes: cerv.concat([sh(tube([[200, 127], [200, 176]], 9), 'bone', { op: 0.45 })])
  });
  part({ id: 'thoracic-spine', name: 'Thoracic spine (T1–T12)', latin: 'Vertebrae thoracicae', sys: S, region: 'Back & spine', group: 'Spine', shapes: thor });
  part({ id: 'lumbar-spine', name: 'Lumbar spine (L1–L5)', latin: 'Vertebrae lumbales', sys: S, region: 'Back & spine', group: 'Spine', shapes: lumb });
  part({
    id: 'sacrum', name: 'Sacrum', latin: 'Os sacrum', sys: S, region: 'Pelvis & hip', group: 'Spine',
    shapes: [
      sh(poly([[178, 370], [222, 370], [224, 396], [216, 414], [200, 428], [184, 414], [176, 396]]), 'bone'),
      sh('M181,382L219,382', 'line'), sh('M183,392L217,392', 'line'),
      sh('M186,402L214,402', 'line'), sh('M190,412L210,412', 'line')
    ]
  });
  part({
    id: 'coccyx', name: 'Coccyx', latin: 'Os coccygis', sys: S, region: 'Pelvis & hip', group: 'Spine',
    shapes: [sh('M200,428C206,437 204,446 200,452C196,446 194,437 200,428Z', 'bone')]
  });

  /* ----------------------------------------------- shoulder girdle ------- */
  sides.forEach(function (sd) {
    var s = sd[0];
    part({
      id: 'scapula-' + sd[1], name: sd[1][0].toUpperCase() + sd[1].slice(1) + ' scapula', latin: 'Scapula ' + sd[2],
      sys: S, region: 'Upper limb', group: 'Shoulder girdle',
      shapes: [
        sh(smoothS(s, [[30, 186], [52, 179], [74, 190], [84, 212], [78, 240], [58, 250], [38, 238]]) + 'Z', 'bone', { op: 0.82 }),
        sh(smoothS(s, [[34, 196], [60, 206], [78, 214]]), 'line'),
        sh(ellS(s, 80, 186, 10, 9), 'bone')
      ]
    });
  });
  sides.forEach(function (sd) {
    ribPart('ribs-true-' + sd[1], sd[1][0].toUpperCase() + sd[1].slice(1) + ' ribs 1–7', 'Costae verae ' + sd[2], sd[0], sd[1], [0, 1, 2, 3, 4, 5, 6], 'true');
  });
  sides.forEach(function (sd) {
    ribPart('ribs-false-' + sd[1], sd[1][0].toUpperCase() + sd[1].slice(1) + ' ribs 8–10', 'Costae spuriae ' + sd[2], sd[0], sd[1], [0, 1, 2], 'false');
  });
  sides.forEach(function (sd) {
    ribPart('ribs-floating-' + sd[1], sd[1][0].toUpperCase() + sd[1].slice(1) + ' ribs 11–12', 'Costae fluctuantes ' + sd[2], sd[0], sd[1], [0, 1], 'float');
  });
  part({
    id: 'sternum', name: 'Sternum', latin: 'Sternum', sys: S, region: 'Thorax', group: 'Rib cage',
    shapes: [
      sh(rrect(CX - 13, 188, 26, 26, 5), 'bone'),
      sh(rrect(CX - 8.5, 214, 17, 64, 3.5), 'bone'),
      sh(poly([[CX - 6, 278], [CX + 6, 278], [CX, 292]]), 'cartilage'),
      sh('M' + [CX - 13, 194] + 'L' + [CX - 8.5, 199], 'line'),
      sh('M' + [CX + 13, 194] + 'L' + [CX + 8.5, 199], 'line'),
      sh('M' + [CX - 7.5, 228] + 'L' + [CX + 7.5, 228], 'line'),
      sh('M' + [CX - 7.5, 242] + 'L' + [CX + 7.5, 242], 'line'),
      sh('M' + [CX - 7.5, 256] + 'L' + [CX + 7.5, 256], 'line')
    ]
  });
  sides.forEach(function (sd) {
    part({
      id: 'clavicle-' + sd[1], name: sd[1][0].toUpperCase() + sd[1].slice(1) + ' clavicle', latin: 'Clavicula ' + sd[2],
      sys: S, region: 'Upper limb', group: 'Shoulder girdle',
      shapes: [sh(tubeS(sd[0], [[9, 195, 6.4], [34, 188, 6.8], [60, 184, 6.2], [80, 187, 5.6]]), 'bone')]
    });
  });

  /* ---------------------------------------------------- upper limbs ------ */
  sides.forEach(function (sd) {
    var s = sd[0], side = sd[1], lat = sd[2], cap = side[0].toUpperCase() + side.slice(1);
    part({
      id: 'humerus-' + side, name: cap + ' humerus', latin: 'Humerus ' + lat, sys: S, region: 'Upper limb', group: 'Arm',
      shapes: [
        sh(ellS(s, 80, 184, 15, 15), 'bone'),
        sh(tubeS(s, [[80, 186, 18], [84, 240, 15], [88, 300, 14], [91, 336, 17]]), 'bone'),
        sh(ellS(s, 91, 344, 16, 11), 'bone')
      ]
    });
    part({
      id: 'radius-' + side, name: cap + ' radius', latin: 'Radius ' + lat, sys: S, region: 'Upper limb', group: 'Forearm',
      shapes: [
        sh(ellS(s, 93, 352, 9, 9), 'bone'),
        sh(tubeS(s, [[93, 353, 11], [97, 412, 9], [99, 470, 10]]), 'bone')
      ]
    });
    part({
      id: 'ulna-' + side, name: cap + ' ulna', latin: 'Ulna ' + lat, sys: S, region: 'Upper limb', group: 'Forearm',
      shapes: [
        sh(tubeS(s, [[85, 350, 12], [86, 412, 10], [88, 470, 8]]), 'bone'),
        sh(ellS(s, 85, 349, 8, 7), 'bone')
      ]
    });
    part({
      id: 'carpals-' + side, name: cap + ' carpal bones', latin: 'Ossa carpi ' + lat, sys: S, region: 'Upper limb', group: 'Hand',
      shapes: [
        sh(ellS(s, 94, 486, 12, 8), 'bone'),
        sh(ellS(s, 90, 480, 5.5, 5), 'bone'), sh(ellS(s, 100, 480, 5.5, 5), 'bone'),
        sh(ellS(s, 91, 492, 5.5, 5), 'bone'), sh(ellS(s, 100, 492, 5.5, 5), 'bone')
      ]
    });
    var mets = [], phals = [];
    var fingerX = [104, 99.5, 95, 90.5], fingerTipY = [566, 572, 562, 550];
    for (var f = 0; f < 4; f++) {
      mets.push(sh(tubeS(s, [[95, 494, 6], [fingerX[f], 512, 5.8], [fingerX[f], 521, 5.4]]), 'bone'));
      phals.push(sh(tubeS(s, [[fingerX[f], 521, 5.4], [fingerX[f] + 0.6, 544, 4.7]]), 'bone'));
      phals.push(sh(tubeS(s, [[fingerX[f] + 0.6, 544, 4.6], [fingerX[f] + 1, fingerTipY[f] - 10, 3.9]]), 'bone'));
      phals.push(sh(tubeS(s, [[fingerX[f] + 1, fingerTipY[f] - 10, 3.8], [fingerX[f] + 1.4, fingerTipY[f], 2.8]]), 'bone'));
    }
    mets.push(sh(tubeS(s, [[97, 494, 6], [108, 504, 5.6]]), 'bone'));
    phals.push(sh(tubeS(s, [[108, 504, 5.6], [115, 514, 5]]), 'bone'));
    phals.push(sh(tubeS(s, [[115, 514, 5], [118, 524, 4]]), 'bone'));
    part({
      id: 'metacarpals-' + side, name: cap + ' metacarpals', latin: 'Ossa metacarpi ' + lat, sys: S, region: 'Upper limb', group: 'Hand',
      shapes: mets
    });
    part({
      id: 'finger-bones-' + side, name: cap + ' finger bones', latin: 'Phalanges manus ' + lat, sys: S, region: 'Upper limb', group: 'Hand',
      shapes: phals
    });
  });

  /* ------------------------------------------------------------ pelvis --- */
  (function () {
    var shapes = [];
    sides.forEach(function (sd) {
      var s = sd[0];
      shapes.push(sh(smoothS(s, [[14, 392], [40, 386], [62, 391], [78, 405], [80, 428], [70, 448],
        [54, 456], [42, 448], [46, 430], [36, 414], [22, 400]]) + 'Z', 'bone'));
      shapes.push(sh(ellS(s, 38, 460, 14, 14), 'cavity'));
      shapes.push(sh(tubeS(s, [[40, 462, 11], [36, 478, 9], [30, 488, 9]]), 'bone'));
      shapes.push(sh(ellS(s, 27, 474, 9, 8), 'cavity'));
      shapes.push(sh(tubeS(s, [[36, 466, 9], [24, 484, 8], [10, 489, 8]]), 'bone'));
      shapes.push(sh(rrect(s > 0 ? CX : CX - 9, 484, 9, 11, 3), 'bone'));
      shapes.push(sh(smoothS(s, [[24, 396], [54, 397], [76, 410]]), 'line'));
    });
    part({ id: 'pelvis', name: 'Pelvis (os coxae)', latin: 'Os coxae / Pelvis', sys: S, region: 'Pelvis & hip', group: 'Pelvis', shapes: shapes });
  })();

  /* ------------------------------------------------------ lower limbs ---- */
  sides.forEach(function (sd) {
    var s = sd[0], side = sd[1], lat = sd[2], cap = side[0].toUpperCase() + side.slice(1);
    part({
      id: 'femur-' + side, name: cap + ' femur', latin: 'Femur ' + lat, sys: S, region: 'Lower limb', group: 'Thigh',
      shapes: [
        sh(ellS(s, 38, 460, 14, 14), 'bone'),
        sh(tubeS(s, [[38, 462, 15], [42, 500, 15], [43, 560, 14], [40, 620, 16], [37, 652, 18]]), 'bone'),
        sh(ellS(s, 36, 660, 18, 12), 'bone')
      ]
    });
    part({
      id: 'patella-' + side, name: cap + ' patella', latin: 'Patella ' + lat, sys: S, region: 'Lower limb', group: 'Knee',
      shapes: [sh(ellS(s, 37, 672, 8, 10), 'bone')]
    });
    part({
      id: 'tibia-' + side, name: cap + ' tibia', latin: 'Tibia ' + lat, sys: S, region: 'Lower limb', group: 'Lower leg',
      shapes: [
        sh(tubeS(s, [[34, 668, 19], [32, 760, 15], [30, 850, 12]]), 'bone'),
        sh(ellS(s, 27, 860, 9, 9), 'bone')
      ]
    });
    part({
      id: 'fibula-' + side, name: cap + ' fibula', latin: 'Fibula ' + lat, sys: S, region: 'Lower limb', group: 'Lower leg',
      shapes: [
        sh(tubeS(s, [[49, 682, 7], [47, 780, 6], [44, 852, 7]]), 'bone'),
        sh(ellS(s, 44, 858, 8, 9), 'bone')
      ]
    });
    part({
      id: 'tarsals-' + side, name: cap + ' tarsal bones', latin: 'Ossa tarsi ' + lat, sys: S, region: 'Lower limb', group: 'Foot',
      shapes: [
        sh(ellS(s, 34, 872, 17, 12), 'bone'),
        sh(ellS(s, 25, 888, 11, 9), 'bone'),
        sh(ellS(s, 46, 888, 11, 9), 'bone')
      ]
    });
    var mt = [], pt = [], midx = [21, 27, 33, 39, 45], tipY = [922, 918, 914, 909, 903];
    for (var t = 0; t < 5; t++) {
      mt.push(sh(tubeS(s, [[midx[t] - 1, 892, t === 0 ? 6.4 : 5.2], [midx[t], 906, t === 0 ? 6 : 4.8]]), 'bone'));
      pt.push(sh(tubeS(s, [[midx[t], 906, t === 0 ? 5.8 : 4.6], [midx[t] + (5 - t) * 0.4, tipY[t] - 6, t === 0 ? 5.4 : 3.8]]), 'bone'));
      pt.push(sh(tubeS(s, [[midx[t] + (5 - t) * 0.4, tipY[t] - 6, t === 0 ? 5.2 : 3.6], [midx[t] + (5 - t) * 0.6, tipY[t], t === 0 ? 3.6 : 2.6]]), 'bone'));
    }
    part({ id: 'metatarsals-' + side, name: cap + ' metatarsals', latin: 'Ossa metatarsi ' + lat, sys: S, region: 'Lower limb', group: 'Foot', shapes: mt });
    part({ id: 'toe-bones-' + side, name: cap + ' toe bones', latin: 'Phalanges pedis ' + lat, sys: S, region: 'Lower limb', group: 'Foot', shapes: pt });
  });
})();
