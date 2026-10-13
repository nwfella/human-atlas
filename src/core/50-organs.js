/* =============================================================================
   ORGANS — thoracic and abdominal viscera. Deepest layer: the skeleton paints
   over them, so the rib cage reads in front of the lungs and liver.
   ========================================================================== */
(function () {
  var S = 'organs';
  var sides = [[-1, 'right', 'dexter'], [1, 'left', 'sinister']];

  /* ---- chest ---- */
  part({
    id: 'lung-right', name: 'Right lung', latin: 'Pulmo dexter', sys: S, region: 'Thorax', group: 'Lungs',
    shapes: [
      sh('M188,200C176,196 154,204 146,224C138,246 138,274 143,298C154,304 172,304 181,298C187,288 189,260 189,236C189,216 190,204 188,200Z', 'lung'),
      sh('M170,232C164,254 164,278 170,294', 'line', { sw: 0.9 })
    ]
  });
  part({
    id: 'lung-left', name: 'Left lung', latin: 'Pulmo sinister', sys: S, region: 'Thorax', group: 'Lungs',
    shapes: [
      sh('M212,200C224,196 246,204 254,224C262,246 262,272 257,298C246,304 228,304 219,298C214,288 214,272 218,258C222,246 218,238 212,230C208,222 208,208 212,200Z', 'lung'),
      sh('M230,232C236,254 236,278 230,294', 'line', { sw: 0.9 }),
      sh('M218,258C224,252 232,250 240,252', 'line', { sw: 0.9 })
    ]
  });
  part({
    id: 'trachea', name: 'Trachea', latin: 'Trachea', sys: S, region: 'Head & neck', group: 'Airways',
    shapes: [
      sh(tube([[200, 146], [200, 172], [200, 198]], [13, 12, 12]), 'tra'),
      sh('M194,152L206,152', 'line', { sw: 0.8 }), sh('M194,160L206,160', 'line', { sw: 0.8 }),
      sh('M194,168L206,168', 'line', { sw: 0.8 }), sh('M194,176L206,176', 'line', { sw: 0.8 }),
      sh('M194,184L206,184', 'line', { sw: 0.8 }), sh('M194,192L206,192', 'line', { sw: 0.8 })
    ]
  });
  part({
    id: 'bronchi', name: 'Main bronchi', latin: 'Bronchi principales', sys: S, region: 'Thorax', group: 'Airways',
    shapes: [
      sh(tube([[200, 196], [190, 210], [178, 222]], [9, 8, 7]), 'tra'),
      sh(tube([[200, 196], [212, 208], [224, 218]], [9, 8, 7]), 'tra')
    ]
  });
  part({
    id: 'thymus', name: 'Thymus', latin: 'Thymus', sys: S, region: 'Thorax', group: 'Immune',
    shapes: [
      sh(tube([[194, 196], [193, 214]], [12, 9]), 'gland'),
      sh(tube([[207, 196], [208, 214]], [11, 8]), 'gland')
    ]
  });

  /* ---- abdomen: patient's right side (screen left) is the liver ---- */
  part({
    id: 'liver', name: 'Liver', latin: 'Hepar', sys: S, region: 'Abdomen', group: 'Digestive',
    shapes: [
      sh('M143,308C150,299 176,294 198,297C212,299 219,307 217,320C215,338 205,352 189,356C170,361 148,354 142,344C136,332 137,317 143,308Z', 'liver'),
      sh('M160,318C168,312 182,310 196,312', 'line', { sw: 0.9 }),
      sh('M186,300C186,318 184,338 180,353', 'line', { sw: 0.9 })
    ]
  });
  part({
    id: 'gallbladder', name: 'Gallbladder', latin: 'Vesica biliaris', sys: S, region: 'Abdomen', group: 'Digestive',
    shapes: [
      sh(ell(167, 352, 8, 13, 18), 'gall'),
      sh(ell(166, 346, 4, 4), 'gall')
    ]
  });
  part({
    id: 'pancreas', name: 'Pancreas', latin: 'Pancreas', sys: S, region: 'Abdomen', group: 'Digestive',
    shapes: [
      sh(tube([[171, 348], [192, 342], [214, 336], [238, 334]], [8, 10, 9, 6]), 'panc'),
      sh('M190,340L196,350', 'line', { sw: 0.8 })
    ]
  });
  part({
    id: 'stomach', name: 'Stomach', latin: 'Gaster / Ventriculus', sys: S, region: 'Abdomen', group: 'Digestive',
    shapes: [
      sh('M205,300C220,295 236,304 237,320C238,340 226,355 211,358C201,360 195,352 200,345C209,334 216,324 214,314C212,307 208,303 205,303Z', 'stomach'),
      sh('M212,306C206,314 204,326 208,338', 'line', { sw: 0.9 }),
      sh('M236,318C242,320 246,326 246,334', 'line', { sw: 0.9 })
    ]
  });
  part({
    id: 'spleen', name: 'Spleen', latin: 'Splen / Lien', sys: S, region: 'Abdomen', group: 'Immune',
    shapes: [sh(ell(250, 324, 14, 18, -14), 'spleen')]
  });

  /* ---- urinary ---- */
  sides.forEach(function (sd) {
    var s = sd[0], side = sd[1], lat = sd[2], cap = side[0].toUpperCase() + side.slice(1);
    part({
      id: 'kidney-' + side, name: cap + ' kidney', latin: 'Ren ' + lat, sys: S, region: 'Abdomen', group: 'Urinary',
      shapes: [
        sh(ellS(s, 31, 372, 16, 21), 'kidney'),
        sh(ellS(s, 21, 372, 6, 9), 'cavity')
      ]
    });
    part({
      id: 'adrenal-' + side, name: cap + ' adrenal gland', latin: 'Glandula suprarenalis ' + lat, sys: S, region: 'Abdomen', group: 'Endocrine',
      shapes: [sh(poly([spa(s, 20, 350), spa(s, 42, 344), spa(s, 38, 362)]), 'adre')]
    });
    part({
      id: 'ureter-' + side, name: cap + ' ureter', latin: 'Ureter ' + lat, sys: S, region: 'Abdomen', group: 'Urinary',
      shapes: [sh(tubeS(s, [[26, 392, 4.5], [20, 432, 4], [14, 466, 3.6]]), 'gland')]
    });
  });
  part({
    id: 'bladder', name: 'Urinary bladder', latin: 'Vesica urinaria', sys: S, region: 'Pelvis & hip', group: 'Urinary',
    shapes: [
      sh(ell(200, 480, 25, 20), 'bladder'),
      sh(tube([[200, 460], [200, 470]], [5, 5]), 'gland')
    ]
  });

  /* ---- gut: small bowel first, colon frame over it ---- */
  part({
    id: 'small-intestine', name: 'Small intestine', latin: 'Intestinum tenue', sys: S, region: 'Abdomen', group: 'Digestive',
    shapes: [
      sh(tube([[176, 384], [222, 392], [174, 402], [222, 412], [176, 422], [220, 432], [178, 442], [216, 452], [188, 460]],
        [15, 15, 15, 15, 15, 15, 15, 15, 14]), 'gut')
    ]
  });
  part({
    id: 'large-intestine', name: 'Large intestine', latin: 'Intestinum crassum', sys: S, region: 'Abdomen', group: 'Digestive',
    shapes: [
      sh(tube([[152, 472], [146, 430], [145, 386], [150, 358], [172, 344], [206, 342], [236, 348], [248, 376], [250, 424], [248, 460], [238, 478], [222, 486]],
        [18, 18, 18, 18, 17, 17, 17, 17, 17, 17, 16, 14]), 'colon'),
      sh('M152,376L250,376', 'line', { sw: 0.8 }),
      sh('M152,400L250,400', 'line', { sw: 0.8 })
    ]
  });
  part({
    id: 'appendix', name: 'Appendix', latin: 'Appendix vermiformis', sys: S, region: 'Abdomen', group: 'Digestive',
    shapes: [sh(tube([[145, 470], [138, 484], [133, 496]], [6, 5, 4]), 'gut')]
  });
})();
