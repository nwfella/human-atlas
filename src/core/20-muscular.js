/* =============================================================================
   MUSCULAR SYSTEM — 39 structures. Superficial group paints last, so deep
   strands are declared before the muscles that cover them.
   ========================================================================== */
(function () {
  var S = 'muscular';
  var sides = [[-1, 'right', 'dexter'], [1, 'left', 'sinister']];

  sides.forEach(function (sd) {
    var s = sd[0], side = sd[1], lat = sd[2], cap = side[0].toUpperCase() + side.slice(1);
    var L = function (n) { return cap + ' ' + n; };

    /* ---- deep / posterior strands first ---- */
    part({
      id: 'triceps-' + side, name: L('triceps brachii'), latin: 'Musculus triceps brachii ' + lat, sys: S, region: 'Upper limb', group: 'Arm',
      shapes: [
        sh(tubeS(s, [[86, 200, 26], [92, 250, 30], [98, 300, 24], [102, 338, 15]]), 'muscle2'),
        sh(tubeS(s, [[90, 202, 8], [96, 250, 8], [100, 300, 7]]), 'tendon')
      ]
    });
    part({
      id: 'forearm-extensors-' + side, name: L('forearm extensors'), latin: 'Extensores antebrachii ' + lat, sys: S, region: 'Upper limb', group: 'Forearm',
      shapes: [sh(tubeS(s, [[96, 352, 22], [103, 400, 18], [107, 462, 13]]), 'muscle2')]
    });
    part({
      id: 'hamstrings-' + side, name: L('hamstrings'), latin: 'Musculi ischiocrurales ' + lat, sys: S, region: 'Lower limb', group: 'Thigh',
      shapes: [sh(tubeS(s, [[52, 486, 30], [58, 540, 28], [54, 600, 22], [49, 644, 16]]), 'muscle2')]
    });
    part({
      id: 'erector-' + side, name: L('erector spinae'), latin: 'Musculus erector spinae ' + lat, sys: S, region: 'Back & spine', group: 'Back',
      shapes: [sh(tubeS(s, [[12, 250, 13], [14, 300, 14], [13, 360, 12], [11, 412, 9]]), 'muscle2')]
    });

    /* ---- superficial layer ---- */
    part({
      id: 'trapezius-' + side, name: L('trapezius'), latin: 'Musculus trapezius ' + lat, sys: S, region: 'Back & spine', group: 'Shoulder',
      shapes: [sh(smoothS(s, [[12, 144], [34, 156], [60, 172], [78, 184], [66, 200], [46, 204], [26, 196], [14, 172]]) + 'Z', 'muscle', { op: 0.94 })]
    });
    part({
      id: 'deltoid-' + side, name: L('deltoid'), latin: 'Musculus deltoideus ' + lat, sys: S, region: 'Upper limb', group: 'Shoulder',
      shapes: [
        sh(smoothS(s, [[62, 180], [80, 175], [96, 186], [101, 208], [92, 224], [74, 222], [62, 206]]) + 'Z', 'muscle'),
        sh('M' + (CX + s * 64) + ',186Q' + (CX + s * 80) + ',176 ' + (CX + s * 96) + ',188', 'tendon')
      ]
    });
    part({
      id: 'pectoralis-' + side, name: L('pectoralis major'), latin: 'Musculus pectoralis major ' + lat, sys: S, region: 'Thorax', group: 'Chest',
      shapes: [
        sh(smoothS(s, [[8, 200], [30, 195], [54, 196], [74, 202], [70, 224], [52, 240], [26, 238], [8, 224]]) + 'Z', 'muscle'),
        sh(smoothS(s, [[8, 202], [40, 200], [68, 204]]), 'tendon')
      ]
    });
    part({
      id: 'biceps-' + side, name: L('biceps brachii'), latin: 'Musculus biceps brachii ' + lat, sys: S, region: 'Upper limb', group: 'Arm',
      shapes: [
        sh(tubeS(s, [[80, 200, 22], [84, 250, 25], [90, 300, 20], [95, 340, 13]]), 'muscle'),
        sh(tubeS(s, [[82, 202, 7], [86, 250, 7], [92, 300, 6]]), 'tendon'),
        sh(tubeS(s, [[94, 330, 6], [96, 344, 5]]), 'tendon')
      ]
    });
    part({
      id: 'forearm-flexors-' + side, name: L('forearm flexors'), latin: 'Flexores antebrachii ' + lat, sys: S, region: 'Upper limb', group: 'Forearm',
      shapes: [sh(tubeS(s, [[90, 352, 20], [96, 400, 17], [101, 462, 12]]), 'muscle')]
    });
    part({
      id: 'latissimus-' + side, name: L('latissimus dorsi'), latin: 'Musculus latissimus dorsi ' + lat, sys: S, region: 'Back & spine', group: 'Back',
      shapes: [sh(smoothS(s, [[26, 242], [46, 250], [60, 272], [58, 306], [48, 342], [34, 346], [30, 318], [26, 280]]) + 'Z', 'muscle', { op: 0.95 })]
    });
    part({
      id: 'serratus-' + side, name: L('serratus anterior'), latin: 'Musculus serratus anterior ' + lat, sys: S, region: 'Thorax', group: 'Chest',
      shapes: [
        sh(tubeS(s, [[38, 244, 9], [62, 248, 7]]), 'muscle2'),
        sh(tubeS(s, [[36, 256, 9], [62, 262, 7]]), 'muscle2'),
        sh(tubeS(s, [[35, 268, 9], [60, 276, 7]]), 'muscle2'),
        sh(tubeS(s, [[34, 280, 9], [58, 290, 7]]), 'muscle2')
      ]
    });
    part({
      id: 'oblique-' + side, name: L('external oblique'), latin: 'Musculus obliquus externus abdominis ' + lat, sys: S, region: 'Abdomen', group: 'Abdominal wall',
      shapes: [
        sh(smoothS(s, [[52, 306], [66, 330], [63, 372], [50, 404], [38, 396], [42, 350]]) + 'Z', 'muscle'),
        sh(smoothS(s, [[44, 336], [58, 350], [60, 372]]), 'tendon')
      ]
    });
    part({
      id: 'gluteus-' + side, name: L('gluteus maximus'), latin: 'Musculus gluteus maximus ' + lat, sys: S, region: 'Pelvis & hip', group: 'Hip',
      shapes: [sh(smoothS(s, [[14, 430], [40, 422], [64, 428], [72, 452], [64, 480], [40, 490], [20, 484], [12, 460]]) + 'Z', 'muscle')]
    });
    part({
      id: 'quadriceps-' + side, name: L('quadriceps femoris'), latin: 'Musculus quadriceps femoris ' + lat, sys: S, region: 'Lower limb', group: 'Thigh',
      shapes: [
        sh(tubeS(s, [[32, 486, 46], [38, 540, 44], [36, 600, 34], [34, 644, 24]]), 'muscle'),
        sh(tubeS(s, [[34, 636, 12], [36, 662, 9]]), 'tendon')
      ]
    });
    part({
      id: 'gastrocnemius-' + side, name: L('gastrocnemius'), latin: 'Musculus gastrocnemius ' + lat, sys: S, region: 'Lower limb', group: 'Calf',
      shapes: [
        sh(tubeS(s, [[36, 672, 30], [40, 706, 36], [34, 762, 22], [32, 794, 12]]), 'muscle'),
        sh(tubeS(s, [[33, 790, 9], [33, 852, 7]]), 'tendon')
      ]
    });
    part({
      id: 'tibialis-' + side, name: L('tibialis anterior'), latin: 'Musculus tibialis anterior ' + lat, sys: S, region: 'Lower limb', group: 'Lower leg',
      shapes: [sh(tubeS(s, [[47, 676, 13], [45, 750, 11], [43, 838, 7]]), 'muscle')]
    });
    part({
      id: 'scm-' + side, name: L('sternocleidomastoid'), latin: 'Musculus sternocleidomastoideus ' + lat, sys: S, region: 'Head & neck', group: 'Neck',
      shapes: [sh(tubeS(s, [[10, 141, 8], [18, 158, 7.5], [26, 176, 6]]), 'muscle')]
    });
    part({
      id: 'masseter-' + side, name: L('masseter'), latin: 'Musculus masseter ' + lat, sys: S, region: 'Head & neck', group: 'Head',
      shapes: [sh(tubeS(s, [[30, 106, 15], [36, 130, 11]]), 'muscle')]
    });
    part({
      id: 'temporalis-' + side, name: L('temporalis'), latin: 'Musculus temporalis ' + lat, sys: S, region: 'Head & neck', group: 'Head',
      shapes: [sh(tubeS(s, [[30, 74, 17], [42, 98, 10]]), 'muscle', { op: 0.9 })]
    });
  });

  part({
    id: 'rectus-abdominis', name: 'Rectus abdominis', latin: 'Musculus rectus abdominis', sys: S, region: 'Abdomen', group: 'Abdominal wall',
    shapes: [
      sh(rrect(CX - 27, 302, 24, 138, 8), 'muscle'),
      sh(rrect(CX + 3, 302, 24, 138, 8), 'muscle'),
      sh('M' + [CX - 27, 336] + 'L' + [CX + 27, 336], 'tendon'),
      sh('M' + [CX - 27, 370] + 'L' + [CX + 27, 370], 'tendon'),
      sh('M' + [CX - 27, 404] + 'L' + [CX + 27, 404], 'tendon'),
      sh('M' + [CX - 1, 302] + 'L' + [CX - 1, 440], 'tendon'),
      sh('M' + [CX - 29, 440] + 'L' + [CX + 29, 440], 'tendon')
    ]
  });
  part({
    id: 'transversus-abdominis', name: 'Transversus abdominis', latin: 'Musculus transversus abdominis', sys: S, region: 'Abdomen', group: 'Abdominal wall',
    shapes: [
      sh(tube([[176, 320], [168, 360], [170, 404]], [10, 12, 10]), 'muscle2', { op: 0.55 }),
      sh(tube([[224, 320], [232, 360], [230, 404]], [10, 12, 10]), 'muscle2', { op: 0.55 })
    ]
  });
  part({
    id: 'diaphragm', name: 'Diaphragm', latin: 'Diaphragma', sys: S, region: 'Thorax', group: 'Breathing',
    shapes: [
      sh(tube([[138, 304], [166, 274], [200, 266], [234, 274], [262, 304]], [13, 11, 10, 11, 13]), 'muscle'),
      sh(tube([[186, 300], [200, 292], [214, 300]], [5, 5, 5]), 'tendon')
    ]
  });
})();
