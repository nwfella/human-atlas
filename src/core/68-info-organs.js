/* =============================================================================
   RECORDS — organs. Thoracic and abdominal viscera.
   ========================================================================== */
(function () {
  one('lung-right', {
    aka: 'Right lung', fn: 'The larger lung, with three lobes and a straighter airway into it. It breathes for roughly 55% of gas exchange, and because the heart leans left it has more room than its partner.',
    facts: [
      'Three lobes: upper, middle and lower — the middle lobe is the only one with a horizontal fissure.',
      'The right main bronchus is wider and steeper, so inhaled objects travel there most often.',
      'It contains about 300 million alveoli with a surface area near 70 m².'
    ],
    stats: [['Lobes', '3'], ['Share of gas exchange', '~55%'], ['Alveolar surface', '~70 m²']],
    conn: ['lung-left', 'bronchi', 'ribs-true-right', 'pulmonary-trunk']
  });
  one('lung-left', {
    aka: 'Left lung', fn: 'The smaller lung: two lobes and a concave notch carved out of its front edge to leave room for the heart. That notch is why the left lung holds slightly less air than the right.',
    facts: [
      'Two lobes only, because the heart takes the space where the third would be.',
      'The cardiac notch is a permanent impression of the heart against the lung.',
      'Lung capacity is driven by leaning and expansion to their full size.'
    ],
    stats: [['Lobes', '2'], ['Share of gas exchange', '~45%'], ['Tidal volume contribution', '~500 mL per breath']],
    conn: ['lung-right', 'heart', 'ribs-true-left', 'pulmonary-trunk']
  });
  one('trachea', {
    aka: 'Windpipe', fn: 'A cartilage-reinforced tube running from the larynx to the bronchi. Its 16–20 C-shaped rings hold the airway open so air can pass whether you inhale or exhale, and the soft back wall lets the oesophagus bulge as food goes down.',
    facts: [
      'The C-shaped rings are cartilage: they keep the tube from collapsing.',
      'The lining sweeps mucus upward at about 1 cm per minute, carrying trapped particles out.',
      'It is roughly the width of a finger and splits at about the level of the fourth thoracic vertebra.'
    ],
    stats: [['Length', '10–12 cm'], ['Cartilage rings', '16–20'], ['Diameter', '~2 cm']],
    conn: ['bronchi', 'lung-right', 'hyoid', 'thymus']
  });
  one('bronchi', {
    aka: 'Airway branches', fn: 'The two main tubes into the lungs, produced where the trachea forks. Each one divides again and again — 23 generations of branching — until the passages end in the alveoli where gas exchange happens.',
    facts: [
      'The right bronchus is wider and steeper because the right lung is bigger.',
      'They branch about 23 times before reaching the alveoli.',
      'Their smooth muscle can constrict violently in an asthma attack.'
    ],
    stats: [['Main branches', '2'], ['Branch generations', '~23'], ['Right vs left angle', 'steeper, wider']],
    conn: ['trachea', 'lung-right', 'lung-left']
  });
  one('thymus', {
    aka: 'Immune school', fn: 'A two-lobed gland behind the sternum where T-lymphocytes learn to recognise the body’s own tissue. Busiest before puberty, it then shrinks and is largely replaced by fat — the reason immune memory is set early.',
    facts: [
      'It is largest in childhood and shrinks progressively from puberty.',
      'It is where T-cells are tested and the self-attacking ones are destroyed.',
      'It is one of the few organs that is deliberately programmed to shrink.'
    ],
    stats: [['Peak size', '20–30 g in childhood'], ['Adult size', 'under 10 g'], ['T-cell training', 'millions per day']],
    conn: ['sternum', 'heart', 'trachea']
  });
  one('liver', {
    aka: 'Hepar', fn: 'The largest internal organ and the body’s chemical factory. It filters everything absorbed from the gut through the portal vein, stores and releases glucose, builds plasma proteins and clotting factors, and makes bile to digest fat.',
    facts: [
      'It performs over 500 known functions and receives about 1.4 litres of blood a minute.',
      'It is the only human organ that can regrow: up to 70% can be removed and will return.',
      'The right lobe is six times the size of the left, which is why the liver sits mostly on the right.'
    ],
    stats: [['Mass', '1.4–1.6 kg'], ['Blood flow', '~1.4 L/min'], ['Regeneration', 'up to 70% removed']],
    conn: ['gallbladder', 'portal-vein', 'stomach', 'small-intestine', 'ribs-true-right']
  });
  one('gallbladder', {
    aka: 'Bile sac', fn: 'A small pear-shaped sac tucked under the liver. It stores bile, concentrates it up to ten times, and squeezes it into the duodenum when fatty food arrives.',
    facts: [
      'A typical adult makes about 800 mL of bile a day, but stores only 30–50 mL.',
      'Stones form here more often in women, in people over forty and in the overweight.',
      'It is an organ that can be removed entirely without changing digestion much.'
    ],
    stats: [['Capacity', '30–50 mL'], ['Concentration', 'up to 10×'], ['Daily bile', '~800 mL']],
    conn: ['liver', 'pancreas', 'small-intestine']
  });
  one('pancreas', {
    aka: 'Digestive and sugar gland', fn: 'A long gland lying behind the stomach that works as two organs at once: the exocrine part makes digestive enzymes for fat, protein and starch, while the endocrine islets release insulin and glucagon to hold blood sugar steady.',
    facts: [
      'It produces around 1.5 litres of enzyme-rich juice each day.',
      'The islets make up only about 2% of its mass but control all of glucose metabolism.',
      'Its enzymes are released inactive, so the gland does not digest itself.'
    ],
    stats: [['Length', '15–20 cm'], ['Digestive juice', '~1.5 L/day'], ['Islet cells', '~1 million']],
    conn: ['stomach', 'small-intestine', 'liver', 'gallbladder']
  });
  one('stomach', {
    aka: 'Gaster', fn: 'A muscular bag that stores a meal, churns it and starts protein digestion. Its lining makes hydrochloric acid at pH 1–2 — strong enough to dissolve metal — while a thick mucus layer keeps the acid away from the wall.',
    facts: [
      'It holds 1–1.5 litres after a large meal but only about 50 mL when empty.',
      'Acid is strong enough to dissolve a razor blade; mucus and rapid cell turnover save the lining.',
      'Food leaves at roughly 3 kcal per minute, which is why a fatty meal keeps you full.'
    ],
    stats: [['Empty volume', '~50 mL'], ['Full volume', '1–1.5 L'], ['Acid pH', '1–3']],
    conn: ['liver', 'pancreas', 'small-intestine', 'spleen']
  });
  one('spleen', {
    aka: 'Blood filter', fn: 'A fist-sized organ behind the stomach that filters blood, removes worn-out red cells and mounts immune responses against blood-borne infection. It is the body’s largest lymph organ.',
    facts: [
      'It holds about 200 mL of blood it can squeeze back into circulation if needed.',
      'It removes and recycles about 2 million worn-out red cells every second.',
      'Removing it leaves a person vulnerable to encapsulated bacteria, so vaccination follows.'
    ],
    stats: [['Mass', '150–200 g'], ['Blood stored', '~200 mL'], ['RBC recycled', '~2 million/s']],
    conn: ['stomach', 'pancreas', 'liver', 'ribs-false-left']
  });
  pair('kidney', {
    aka: 'Ren', fn: 'The organ that filters blood into urine. Each kidney contains about a million nephrons, and between them they clean all five litres of blood roughly forty times a day while regulating salt, water, acid and blood pressure.',
    facts: [
      'Together they filter about 180 litres of fluid a day and return almost all of it.',
      'One kidney is enough to live normally, which is why living donation works.',
      'They also release renin, erythropoietin and vitamin D, so they are endocrine organs too.'
    ],
    stats: [['Nephrons', '~1 million each'], ['Filtration', '~180 L/day'], ['Blood flow', '~20% of cardiac output']],
    conn: ['ureter-left', 'bladder', 'adrenal-left', 'renal-artery-left']
  });
  pair('adrenal', {
    aka: 'Suprarenal gland', fn: 'A gland sitting like a cap on each kidney. The outer cortex makes cortisol, aldosterone and androgens; the inner medulla makes adrenaline and noradrenaline — the hormones of the stress response.',
    facts: [
      'Its medulla is functionally part of the nervous system, firing in under a second.',
      'Cortisol from here is what wakes you up and manages long-term stress.',
      'Aldosterone from here is the main control on how much salt and water the body keeps.'
    ],
    stats: [['Mass', '4–5 g each'], ['Cortex layers', '3'], ['Adrenaline release', 'seconds']],
    conn: ['kidney-left', 'vena-cava-inferior', 'aorta']
  });
  pair('ureter', {
    aka: 'Urine tube', fn: 'A muscular tube carrying urine from the kidney to the bladder. It does not rely on gravity: its walls squeeze in rhythmic waves, so urine reaches the bladder even when you are upside down.',
    facts: [
      'Peristaltic waves push urine along, roughly once every 10–60 seconds.',
      'Narrow points along it are where kidney stones get stuck and cause the worst pain.',
      'It is about 25 cm long and the width of a thin pencil.'
    ],
    stats: [['Length', '25–30 cm'], ['Diameter', '3–4 mm'], ['Flow', 'wavelike, not gravity']],
    conn: ['kidney-left', 'bladder']
  });
  one('bladder', {
    aka: 'Urinary reservoir', fn: 'A muscular balloon that stores urine until it is convenient to empty. Its wall is smooth muscle that stays relaxed while filling and then contracts in one coordinated squeeze.',
    facts: [
      'Its wall muscle is the detrusor, which must relax for urine to be stored and contract to void.',
      'The first urge to urinate comes at about 150–250 mL, well before discomfort near 500 mL.',
      'It sits behind the pubic bone, which is why it can hold a great deal without being felt.'
    ],
    stats: [['Capacity', '400–600 mL'], ['First urge', '150–250 mL'], ['Normal void', '200–400 mL']],
    conn: ['ureter-left', 'pelvis', 'kidney-left']
  });
  one('small-intestine', {
    aka: 'Intestinum tenue', fn: 'Six metres of coiled tube where almost all digestion and absorption happens. Its lining is folded into villi, and each villus cell has microvilli, so a modest tube offers a surface area the size of a tennis court.',
    facts: [
      'It absorbs about 90% of the nutrients from food.',
      'Its surface area is roughly 30 m² — the size of a studio flat.',
      'Its lining is renewed every three to five days, one of the fastest turnovers in the body.'
    ],
    stats: [['Length', '~6 m'], ['Surface area', '~30 m²'], ['Transit time', '2–6 hours']],
    conn: ['large-intestine', 'stomach', 'pancreas', 'liver', 'portal-vein']
  });
  one('large-intestine', {
    aka: 'Colon', fn: 'The last metre and a half of the gut, framing the small intestine. It reclaims water and salts, hosts trillions of gut bacteria, and compresses waste into stool — turning a litre and a half of fluid daily into a fraction of that.',
    facts: [
      'It absorbs about 1.3 litres of the 1.5 litres it receives each day.',
      'The appendix hangs off its very first part, the caecum.',
      'Its resident microbiome weighs roughly 1–2 kg and ferments fibre into short-chain fatty acids.'
    ],
    stats: [['Length', '~1.5 m'], ['Water reclaimed', '~1.3 L/day'], ['Transit time', '12–48 hours']],
    conn: ['small-intestine', 'appendix', 'bladder']
  });
  one('appendix', {
    aka: 'Appendix vermiformis', fn: 'A blind tube hanging off the caecum at the start of the colon. Long thought vestigial, it turns out to hold a reservoir of gut bacteria that can repopulate the bowel after a severe illness.',
    facts: [
      'It holds a biofilm reserve of gut flora that helps recovery after diarrhoeal illness.',
      'It has its own blood supply, so it must be removed when it becomes blocked and infected.',
      'It is 2–20 cm long — the reason appendicitis symptoms vary so much.'
    ],
    stats: [['Length', '2–20 cm'], ['Diameter', '~6 mm'], ['Lifetime risk of appendicitis', '~7%']],
    conn: ['large-intestine', 'small-intestine']
  });
})();
