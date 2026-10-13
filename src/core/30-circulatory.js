/* =============================================================================
   CIRCULATORY SYSTEM — heart, arteries (red) and veins (blue).
   ========================================================================== */
(function () {
  var S = 'circulatory';
  var sides = [[-1, 'right', 'dexter'], [1, 'left', 'sinister']];

  part({
    id: 'heart', name: 'Heart', latin: 'Cor', sys: S, region: 'Thorax', group: 'Central pump',
    shapes: [
      sh('M194,232C202,220 218,216 230,228C244,242 250,264 242,280C236,292 222,298 214,290C206,280 196,264 194,248Z', 'heart'),
      sh('M196,240C212,248 226,258 236,270', 'line', { sw: 1 }),
      sh('M200,232C214,238 226,246 234,256', 'line', { sw: 0.9 }),
      sh(ell(228, 226, 9, 7, -20), 'heart')
    ]
  });
  part({
    id: 'aorta', name: 'Aorta', latin: 'Aorta', sys: S, region: 'Thorax', group: 'Great vessels',
    shapes: [
      sh(tube([[226, 232], [230, 216], [226, 202], [214, 194], [204, 200], [202, 220], [202, 260], [203, 320], [203, 400], [203, 430]], [10, 10, 9, 9, 9, 8, 7.5, 7, 6.5, 6]), 'artery')
    ]
  });
  part({
    id: 'pulmonary-trunk', name: 'Pulmonary trunk & arteries', latin: 'Truncus pulmonalis', sys: S, region: 'Thorax', group: 'Great vessels',
    shapes: [
      sh(tube([[210, 228], [204, 214], [198, 202]], [9, 8.5, 8]), 'artery'),
      sh(tube([[198, 202], [186, 194], [166, 198]], [7, 6.5, 5.5]), 'artery'),
      sh(tube([[198, 202], [212, 194], [232, 198]], [7, 6.5, 5.5]), 'artery')
    ]
  });
  part({
    id: 'vena-cava-superior', name: 'Superior vena cava', latin: 'Vena cava superior', sys: S, region: 'Thorax', group: 'Great vessels',
    shapes: [sh(tube([[194, 192], [197, 210], [199, 226]], [8, 8, 8]), 'vein')]
  });
  part({
    id: 'vena-cava-inferior', name: 'Inferior vena cava', latin: 'Vena cava inferior', sys: S, region: 'Abdomen', group: 'Great vessels',
    shapes: [sh(tube([[185, 432], [187, 380], [189, 320], [194, 272], [197, 250]], [9, 9, 8.5, 8, 7]), 'vein')]
  });
  part({
    id: 'portal-vein', name: 'Hepatic portal vein', latin: 'Vena portae hepatis', sys: S, region: 'Abdomen', group: 'Abdominal vessels',
    shapes: [sh(tube([[196, 382], [190, 364], [182, 348], [172, 338]], [6.5, 6.5, 6, 5.5]), 'vein')]
  });

  sides.forEach(function (sd) {
    var s = sd[0], side = sd[1], lat = sd[2], cap = side[0].toUpperCase() + side.slice(1);
    var L = function (n) { return cap + ' ' + n; };
    part({
      id: 'carotid-' + side, name: L('common carotid artery'), latin: 'Arteria carotis communis ' + lat, sys: S, region: 'Head & neck', group: 'Head & neck vessels',
      shapes: [sh(tubeS(s, [[7, 138, 7], [9, 168, 6.5], [11, 196, 6]]), 'artery')]
    });
    part({
      id: 'jugular-' + side, name: L('internal jugular vein'), latin: 'Vena jugularis interna ' + lat, sys: S, region: 'Head & neck', group: 'Head & neck vessels',
      shapes: [sh(tubeS(s, [[16, 136, 7], [18, 166, 6.5], [19, 196, 6]]), 'vein')]
    });
    part({
      id: 'subclavian-' + side, name: L('subclavian vessels'), latin: 'Arteria et vena subclavia ' + lat, sys: S, region: 'Upper limb', group: 'Arm vessels',
      shapes: [
        sh(tubeS(s, [[10, 197, 8], [40, 194, 7.5], [66, 191, 6.5]]), 'artery'),
        sh(tubeS(s, [[10, 204, 7], [40, 202, 7], [66, 199, 6]]), 'vein')
      ]
    });
    part({
      id: 'brachial-' + side, name: L('brachial artery'), latin: 'Arteria brachialis ' + lat, sys: S, region: 'Upper limb', group: 'Arm vessels',
      shapes: [sh(tubeS(s, [[80, 206, 7], [86, 250, 6.5], [90, 300, 6], [94, 344, 5.5]]), 'artery')]
    });
    part({
      id: 'radial-' + side, name: L('radial artery'), latin: 'Arteria radialis ' + lat, sys: S, region: 'Upper limb', group: 'Forearm vessels',
      shapes: [sh(tubeS(s, [[98, 356, 5.5], [102, 410, 5], [104, 468, 4.5]]), 'artery')]
    });
    part({
      id: 'ulnar-' + side, name: L('ulnar artery'), latin: 'Arteria ulnaris ' + lat, sys: S, region: 'Upper limb', group: 'Forearm vessels',
      shapes: [sh(tubeS(s, [[91, 356, 5.5], [91, 412, 5], [93, 468, 4.5]]), 'artery')]
    });
    part({
      id: 'cephalic-' + side, name: L('cephalic vein'), latin: 'Vena cephalica ' + lat, sys: S, region: 'Upper limb', group: 'Forearm vessels',
      shapes: [sh(tubeS(s, [[104, 360, 5], [110, 420, 4.5], [112, 468, 4]]), 'vein')]
    });
    part({
      id: 'renal-artery-' + side, name: L('renal artery'), latin: 'Arteria renalis ' + lat, sys: S, region: 'Abdomen', group: 'Abdominal vessels',
      shapes: [sh(tubeS(s, [[5, 334, 5.5], [28, 340, 4.5]]), 'artery')]
    });
    part({
      id: 'iliac-' + side, name: L('common iliac artery'), latin: 'Arteria iliaca communis ' + lat, sys: S, region: 'Pelvis & hip', group: 'Pelvic vessels',
      shapes: [sh(tubeS(s, [[3, 432, 8], [18, 448, 7.5], [27, 462, 6.5]]), 'artery')]
    });
    part({
      id: 'femoral-artery-' + side, name: L('femoral artery'), latin: 'Arteria femoralis ' + lat, sys: S, region: 'Lower limb', group: 'Leg vessels',
      shapes: [sh(tubeS(s, [[29, 470, 7], [33, 520, 6], [34, 600, 5.5], [34, 646, 5]]), 'artery')]
    });
    part({
      id: 'femoral-vein-' + side, name: L('femoral vein'), latin: 'Vena femoralis ' + lat, sys: S, region: 'Lower limb', group: 'Leg vessels',
      shapes: [sh(tubeS(s, [[23, 470, 7.5], [25, 520, 6.5], [26, 600, 6], [28, 646, 5.5]]), 'vein')]
    });
    part({
      id: 'saphenous-' + side, name: L('great saphenous vein'), latin: 'Vena saphena magna ' + lat, sys: S, region: 'Lower limb', group: 'Leg vessels',
      shapes: [sh(tubeS(s, [[19, 478, 5.5], [17, 560, 5.5], [20, 660, 5], [24, 762, 4.5], [27, 850, 4]]), 'vein')]
    });
    part({
      id: 'tibial-artery-' + side, name: L('tibial arteries (below knee)'), latin: 'Arteriae tibiales ' + lat, sys: S, region: 'Lower limb', group: 'Leg vessels',
      shapes: [sh(tubeS(s, [[33, 652, 5], [31, 710, 4.5], [29, 790, 4], [28, 852, 3.5]]), 'artery')]
    });
  });
})();
