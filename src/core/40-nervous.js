/* =============================================================================
   NERVOUS SYSTEM — central axis plus the peripheral nerves that a front view
   can actually show. Eyes ride here: they are the sensory end-organs of the CNS.
   ========================================================================== */
(function () {
  var S = 'nervous';
  var sides = [[-1, 'right', 'dexter'], [1, 'left', 'sinister']];

  part({
    id: 'cerebellum', name: 'Cerebellum', latin: 'Cerebellum', sys: S, region: 'Head & neck', group: 'Brain',
    shapes: [
      sh(ell(200, 94, 23, 11), 'brain', { op: 0.95 }),
      sh('M184,90Q200,101 216,90', 'line', { sw: 0.85 }),
      sh('M188,97Q200,106 212,97', 'line', { sw: 0.85 })
    ]
  });
  part({
    id: 'cerebrum', name: 'Cerebrum', latin: 'Cerebrum', sys: S, region: 'Head & neck', group: 'Brain',
    shapes: [
      sh('M200,28C220,28 233,42 232,62C231,79 220,88 200,89C180,88 169,79 168,62C167,42 180,28 200,28Z', 'brain', { op: 0.86 }),
      sh('M200,30L200,88', 'line', { sw: 1 }),
      sh('M180,46Q190,41 200,46Q210,41 220,48', 'line', { sw: 0.85 }),
      sh('M175,62Q186,57 197,62', 'line', { sw: 0.85 }),
      sh('M203,62Q214,57 225,62', 'line', { sw: 0.85 }),
      sh('M183,76Q191,71 200,76Q209,71 217,78', 'line', { sw: 0.85 })
    ]
  });
  part({
    id: 'brainstem', name: 'Brainstem (midbrain, pons, medulla)', latin: 'Truncus encephali', sys: S, region: 'Head & neck', group: 'Brain',
    shapes: [
      sh(tube([[200, 74], [201, 100], [200, 122], [200, 134]], [13, 15, 12, 10]), 'brain'),
      sh(ell(200, 98, 15, 9), 'brain')
    ]
  });
  part({
    id: 'spinal-cord', name: 'Spinal cord & cauda equina', latin: 'Medulla spinalis', sys: S, region: 'Back & spine', group: 'Central axis',
    shapes: [
      sh(tube([[200, 126], [200, 200], [200, 290], [200, 360], [200, 392]], [9, 8, 7.5, 6.5, 6]), 'nerve'),
      sh(tube([[200, 384], [194, 412], [192, 424]], [4, 3, 2.4]), 'nerve'),
      sh(tube([[200, 384], [199, 412], [198, 426]], [4, 3, 2.4]), 'nerve'),
      sh(tube([[200, 384], [206, 412], [209, 424]], [4, 3, 2.4]), 'nerve')
    ]
  });
  part({
    id: 'intercostal-nerves', name: 'Intercostal nerves', latin: 'Nervi intercostales', sys: S, region: 'Thorax', group: 'Trunk nerves',
    shapes: (function () {
      var out = [];
      for (var i = 0; i < 10; i++) {
        var y = 198 + i * 10.4, w = i < 3 ? 3 : 2.6;
        out.push(sh(tube([[202, y], [CX - 44, y + 14], [CX - 58, y + 22]], [w, w * 0.85, w * 0.7]), 'nerve'));
        out.push(sh(tube([[202, y], [CX + 44, y + 14], [CX + 58, y + 22]], [w, w * 0.85, w * 0.7]), 'nerve'));
      }
      return out;
    })()
  });

  sides.forEach(function (sd) {
    var s = sd[0], side = sd[1], lat = sd[2], cap = side[0].toUpperCase() + side.slice(1);
    var L = function (n) { return cap + ' ' + n; };
    part({
      id: 'vagus-' + side, name: L('vagus nerve'), latin: 'Nervus vagus ' + lat, sys: S, region: 'Head & neck', group: 'Cranial nerves',
      shapes: [
        sh(tubeS(s, [[12, 140, 4], [14, 180, 4], [15, 230, 3.6], [13, 300, 3.2], [9, 350, 3]]), 'nerve')
      ]
    });
    part({
      id: 'optic-nerve-' + side, name: L('optic nerve'), latin: 'Nervus opticus ' + lat, sys: S, region: 'Head & neck', group: 'Cranial nerves',
      shapes: [sh(tubeS(s, [[18, 116, 4], [4, 128, 3.6]]), 'nerve')]
    });
    part({
      id: 'eye-' + side, name: L('eye'), latin: 'Oculus ' + lat, sys: S, region: 'Head & neck', group: 'Sense organs',
      shapes: [
        sh(ellS(s, 20, 116, 9, 9), 'eye'),
        sh(ellS(s, 20, 116, 4, 4), 'void')
      ]
    });
    part({
      id: 'brachial-plexus-' + side, name: L('brachial plexus'), latin: 'Plexus brachialis ' + lat, sys: S, region: 'Upper limb', group: 'Plexus',
      shapes: [
        sh(tubeS(s, [[12, 156, 5], [30, 166, 7], [52, 176, 7], [70, 184, 5]]), 'nerve'),
        sh(tubeS(s, [[34, 168, 3], [54, 186, 3], [70, 196, 2.6]]), 'nerve'),
        sh(tubeS(s, [[30, 172, 3], [48, 196, 3], [64, 210, 2.6]]), 'nerve')
      ]
    });
    part({
      id: 'median-nerve-' + side, name: L('median nerve'), latin: 'Nervus medianus ' + lat, sys: S, region: 'Upper limb', group: 'Arm nerves',
      shapes: [sh(tubeS(s, [[82, 200, 3.6], [86, 250, 3.4], [91, 310, 3.2], [95, 400, 3], [97, 470, 2.8]]), 'nerve')]
    });
    part({
      id: 'ulnar-nerve-' + side, name: L('ulnar nerve'), latin: 'Nervus ulnaris ' + lat, sys: S, region: 'Upper limb', group: 'Arm nerves',
      shapes: [sh(tubeS(s, [[88, 206, 3.2], [90, 270, 3], [91, 340, 3], [92, 410, 2.8], [93, 470, 2.6]]), 'nerve')]
    });
    part({
      id: 'radial-nerve-' + side, name: L('radial nerve'), latin: 'Nervus radialis ' + lat, sys: S, region: 'Upper limb', group: 'Arm nerves',
      shapes: [sh(tubeS(s, [[95, 204, 3.4], [100, 270, 3.2], [103, 340, 3], [105, 408, 2.8], [106, 464, 2.6]]), 'nerve')]
    });
    part({
      id: 'femoral-nerve-' + side, name: L('femoral nerve'), latin: 'Nervus femoralis ' + lat, sys: S, region: 'Lower limb', group: 'Leg nerves',
      shapes: [sh(tubeS(s, [[14, 438, 4], [22, 500, 3.6], [28, 572, 3.2], [30, 624, 3]]), 'nerve')]
    });
    part({
      id: 'sciatic-nerve-' + side, name: L('sciatic nerve'), latin: 'Nervus ischiadicus ' + lat, sys: S, region: 'Lower limb', group: 'Leg nerves',
      shapes: [
        sh(tubeS(s, [[18, 448, 6], [28, 500, 5.4], [38, 566, 5], [41, 630, 4.4], [38, 660, 4]]), 'nerve'),
        sh(tubeS(s, [[40, 620, 3], [48, 650, 2.6]]), 'nerve')
      ]
    });
    part({
      id: 'tibial-nerve-' + side, name: L('tibial nerve'), latin: 'Nervus tibialis ' + lat, sys: S, region: 'Lower limb', group: 'Leg nerves',
      shapes: [sh(tubeS(s, [[36, 668, 3.6], [33, 736, 3.2], [30, 812, 2.8], [28, 856, 2.6]]), 'nerve')]
    });
    part({
      id: 'peroneal-nerve-' + side, name: L('common peroneal nerve'), latin: 'Nervus peroneus communis ' + lat, sys: S, region: 'Lower limb', group: 'Leg nerves',
      shapes: [sh(tubeS(s, [[46, 666, 3.2], [47, 716, 2.8], [45, 796, 2.6], [43, 848, 2.4]]), 'nerve')]
    });
  });
})();
