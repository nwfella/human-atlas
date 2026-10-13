/* RECORDS — circulatory system. */
(function () {
  one('heart', {
    aka: 'Cardiac pump',
    fn: 'A four-chambered muscular pump. The right atrium and ventricle take deoxygenated blood back from the body and send it to the lungs; the left atrium and ventricle take oxygenated blood from the lungs and drive it into the aorta. Contraction starts at the sinoatrial node in the wall of the right atrium, so the chambers beat in sequence.',
    facts: [
      'The heart has its own blood supply: the right and left coronary arteries branch from the very first part of the aorta.',
      'An adult heart weighs 250–350 g and beats about 100,000 times a day.',
      'Cardiac output climbs from about 5 L/min at rest to more than 20 L/min in hard exercise.'
    ],
    stats: [['Mass', '250–350 g'], ['Output at rest', '~5 L/min'], ['Rate at rest', '60–100 beats/min']],
    conn: ['aorta', 'pulmonary-trunk', 'vena-cava-superior']
  });
  one('aorta', {
    aka: 'Great artery',
    fn: 'The largest artery in the body. It leaves the left ventricle as the ascending aorta, arches over the heart and descends through the thorax and abdomen, ending where it splits into the two common iliac arteries. Its elastic wall stretches with every heartbeat and recoils between beats, keeping blood moving until the next pulse arrives.',
    facts: [
      'It leaves the heart about 2.5–3.5 cm across and narrows to roughly 2 cm by the abdomen.',
      'Elastic recoil in its wall smooths the pulse into steadier flow, an effect called the Windkessel effect.',
      'The pressure wave runs its whole length in about a tenth of a second, at roughly 4 m/s in a young adult.'
    ],
    stats: [['Ascending diameter', '2.5–3.5 cm'], ['Peak pressure', '~120 mmHg'], ['Bifurcation level', 'L4 vertebra']],
    conn: ['heart', 'iliac-left', 'vena-cava-inferior']
  });
  one('pulmonary-trunk', {
    aka: 'Lung artery',
    fn: 'The great vessel that carries blood from the right ventricle to the lungs, and the only artery in the body that carries deoxygenated blood. It runs upward for about 5 cm and then divides into the left and right pulmonary arteries, one for each lung.',
    facts: [
      'It splits in front of the fourth thoracic vertebra into the left and right pulmonary arteries.',
      'Its wall is thinner than the aortic wall because it works against about a fifth of the pressure.',
      'The pulmonary valve at its base shuts when the right ventricle relaxes, preventing backflow.'
    ],
    stats: [['Length', '~5 cm'], ['Diameter', '~3 cm'], ['Systolic pressure', '~25 mmHg']],
    conn: ['heart', 'lung-left', 'lung-right']
  });
  one('vena-cava-superior', {
    aka: 'Upper great vein',
    fn: 'The large vein that returns deoxygenated blood from the head, neck, both arms and the upper chest to the right atrium. It is formed behind the first rib where the two brachiocephalic veins join, and it empties into the top of the right atrium with no valve in the way.',
    facts: [
      'It is about 7 cm long and gathers blood from the head, the neck, both arms and the upper chest.',
      'The azygos vein joins its lower end, adding blood from the chest wall and the tissues of the back.',
      'Having no valve, it carries blood purely on the pressure difference between the chest and the right atrium.'
    ],
    stats: [['Length', '~7 cm'], ['Diameter', '~2 cm'], ['Upper-body return', '~1/3 of venous flow']],
    conn: ['heart', 'subclavian-left', 'jugular-left']
  });
  one('vena-cava-inferior', {
    aka: 'Lower great vein',
    fn: 'The largest vein in the body. It is created by the joining of the two common iliac veins at about the fifth lumbar vertebra, climbs the abdomen on the right of the aorta, pierces the diaphragm and empties into the right atrium. Everything below the diaphragm drains through it.',
    facts: [
      'It is formed at about L5 by the union of the two common iliac veins.',
      'The right gonadal vein empties straight into it, while the left one drains into the left renal vein.',
      'It pierces the central tendon of the diaphragm at T8 and enters the right atrium just above the liver.'
    ],
    stats: [['Diameter', '~2.5 cm'], ['Length', '~25 cm'], ['Pressure in the chest', '2–6 mmHg']],
    conn: ['vena-cava-superior', 'liver', 'iliac-left']
  });
  one('portal-vein', {
    aka: 'Liver vein',
    fn: 'The vein that carries nutrient-rich blood from the gut, spleen and pancreas to the liver, so the liver sees everything absorbed from a meal before it reaches the rest of the body. Roughly 1.1 L/min flows through it, and it supplies about three quarters of the blood the liver receives.',
    facts: [
      'About 75% of the blood reaching the liver arrives through the portal vein, the rest by the hepatic artery.',
      'It is formed behind the neck of the pancreas by the union of the splenic and superior mesenteric veins.',
      'It has no valves, so scarring in the liver raises pressure here and can push blood into veins in the gullet.'
    ],
    stats: [['Blood flow', '~1.1 L/min'], ['Length', '~8 cm'], ['Pressure', '5–10 mmHg']],
    conn: ['liver', 'small-intestine', 'spleen']
  });

  pair('carotid', {
    aka: 'Neck artery',
    fn: 'The common carotid artery is the main supply to the head and brain. It climbs the neck beside the jugular vein and divides at the upper border of the thyroid cartilage into the internal carotid, which feeds the brain and the eye, and the external carotid, which feeds the face, scalp and neck.',
    facts: [
      'The internal carotid artery gives off no branches at all while it passes through the neck.',
      'Stretch receptors in the carotid sinus at the bifurcation report blood pressure to the brainstem.',
      'Pressing hard on the sinus can slow the heart and drop blood pressure enough to cause a faint.'
    ],
    stats: [['Diameter', '6–8 mm'], ['Bifurcation level', 'C4 vertebra'], ['Brain flow share', '~15% of output']],
    conn: ['aorta', 'cervical-spine', 'brainstem']
  });
  pair('jugular', {
    aka: 'Neck vein',
    fn: 'The internal jugular vein is the largest vein in the neck. It leaves the skull through the jugular foramen, runs down beside the common carotid artery carrying blood from the brain, face and neck, and joins the subclavian vein to form the brachiocephalic vein.',
    facts: [
      'It drains almost all the venous blood leaving the brain, which makes it the widest vein in the neck.',
      'It is the usual route for a central venous line because it is wide, straight and easy to reach.',
      'Its bulge above the collarbone is the jugular venous pressure, which rises visibly when the heart fails.'
    ],
    stats: [['Diameter', '~1.5 cm'], ['Central venous pressure', '2–6 mmHg'], ['Brain drainage share', '~70%']],
    conn: ['subclavian-left', 'vena-cava-superior', 'cerebrum']
  });
  pair('subclavian', {
    aka: 'Under-clavicle vessels',
    fn: 'A paired artery and vein that pass under the clavicle and over the first rib, carrying blood out to the arm and back again. The vein lies in front of the artery and the nerves of the brachial plexus run behind, so all three are packed into a narrow gateway at the top of the chest.',
    facts: [
      'The artery becomes the axillary artery as soon as it crosses the outer edge of the first rib.',
      'The arm nerves run between the artery and the scalene muscles, so injuries here damage both.',
      'The vein is a common site for central lines and pacemaker leads because it is wide and constant.'
    ],
    stats: [['Artery diameter', '6–10 mm'], ['Vein diameter', '~1.2 cm'], ['Pressure at rest', '~120/80 mmHg']],
    conn: ['clavicle-left', 'humerus-left', 'vena-cava-superior']
  });
  pair('brachial', {
    aka: 'Arm artery',
    fn: 'The main artery of the upper arm. It runs from the armpit down the inner side of the biceps to the crease of the elbow, giving off branches to the arm muscles, and ends about a centimetre below the elbow where it splits into the radial and ulnar arteries.',
    facts: [
      'It lies over the shaft of the humerus with the median nerve beside it, so a mid-arm fracture is dangerous.',
      'A blood pressure cuff measures the pressure inside this artery by squeezing it shut and letting it open again.',
      'It is the second choice for arterial blood gas sampling when the radial artery cannot be used.'
    ],
    stats: [['Diameter', '4–5 mm'], ['Systolic pressure', '~120 mmHg'], ['Split point', '1 cm below the elbow crease']],
    conn: ['humerus-left', 'radial-left', 'ulnar-left']
  });
  pair('radial', {
    aka: 'Wrist pulse artery',
    fn: 'The radial artery runs down the thumb side of the forearm and wraps around the wrist into the palm, where it joins the ulnar artery in the palmar arches. Its pulse is the one taken at the wrist, and it is the standard artery for blood gas sampling and for monitoring lines in intensive care.',
    facts: [
      'The pulse is felt between the tendon of the flexor carpi radialis and the outer edge of the radius.',
      'An Allen test checks that the ulnar artery can carry the whole hand before the radial is used for a line.',
      'It is cannulated more often than any other artery and is the usual site for an arterial pressure line.'
    ],
    stats: [['Diameter', '2–3 mm'], ['Pulse rate', '60–100 beats/min'], ['Depth below skin', '~5 mm']],
    conn: ['radius-left', 'ulnar-left', 'metacarpals-left']
  });
  pair('ulnar', {
    aka: 'Inner forearm artery',
    fn: 'The ulnar artery runs down the little-finger side of the forearm with the ulnar nerve and passes into the palm beside the pisiform bone. It is usually the larger of the two forearm arteries and carries most of the blood to the hand, joining the radial artery in two arches in the palm.',
    facts: [
      'It is usually bigger than the radial artery and, with it, forms the superficial and deep palmar arches.',
      'In the lower forearm it is covered only by skin and fascia, so it counts as the surface artery there.',
      'Its companion nerve passes behind the inner bump of the elbow, which is why a knock there tingles in the little finger.'
    ],
    stats: [['Diameter', '2–4 mm'], ['Palmar arches formed', '2 with the radial'], ['Nerve companion', 'ulnar nerve, C8–T1']],
    conn: ['radius-left', 'radial-left', 'carpals-left']
  });
  pair('cephalic', {
    aka: 'Outer arm vein',
    fn: 'A long superficial vein of the arm. It starts at the thumb side of the wrist, climbs the outer border of the forearm and upper arm, and drains into the axillary vein after passing through the groove between the deltoid and pectoralis major muscles.',
    facts: [
      'It sits close to the surface, which makes it one of the easiest veins for an intravenous cannula.',
      'At the elbow it connects to the basilic vein through the median cubital vein across the crease.',
      'Its upper part runs in the deltopectoral groove, which surgeons follow to find the axillary vein.'
    ],
    stats: [['Diameter', '3–6 mm'], ['Typical cannula', '18–20 G'], ['Venous pressure', '5–15 mmHg']],
    conn: ['radius-left', 'humerus-left', 'subclavian-left']
  });
  pair('renal-artery', {
    aka: 'Kidney artery',
    fn: 'The renal arteries branch from the aorta at about the level of the second lumbar vertebra and carry blood to the kidneys. Although the kidneys are small organs, they take about a fifth of the cardiac output, roughly 1.2 L/min, because they filter the whole blood volume many times a day.',
    facts: [
      'The kidneys receive about 20% of cardiac output, close to 1.2 L/min at rest.',
      'Each renal artery divides into segmental branches inside the kidney, so one segment can be removed without losing the rest.',
      'An extra renal artery is present in about a quarter of people and is a hazard in kidney surgery.'
    ],
    stats: [['Flow per kidney', '~600 mL/min'], ['Share of output', '~20%'], ['Take-off level', 'L2 vertebra']],
    conn: ['aorta', 'kidney-left', 'kidney-right']
  });
  pair('iliac', {
    aka: 'Pelvic artery',
    fn: 'The two common iliac arteries are the branches into which the aorta splits at the level of the fourth lumbar vertebra. Each runs down and outward for about 5 cm, then divides again into the internal iliac artery for the pelvic organs and the external iliac artery for the leg.',
    facts: [
      'The aortic split lies in front of the fourth lumbar vertebra, at roughly the level of the navel.',
      'The external iliac artery becomes the femoral artery as it passes under the inguinal ligament.',
      'The internal iliac artery supplies the bladder, the rectum, the reproductive organs and the buttock muscles.'
    ],
    stats: [['Length of each', '~5 cm'], ['Bifurcation level', 'L4 vertebra'], ['Diameter at origin', '~1 cm']],
    conn: ['aorta', 'lumbar-spine', 'pelvis']
  });
  pair('femoral-artery', {
    aka: 'Groin artery',
    fn: 'The main artery of the leg. It begins where the external iliac artery passes under the inguinal ligament, runs down the front of the thigh beside the femoral vein, and continues behind the knee as the popliteal artery. Its pulse is easily felt in the groin.',
    facts: [
      'The groin pulse is felt midway between the pubic bone and the front point of the hip bone.',
      'Heart catheterisation is often done through it, and it is used for arterial lines and emergency access.',
      'Because it lies in a tight sheath with the vein, bleeding from a high thigh wound is hard to stop by pressure alone.'
    ],
    stats: [['Diameter in groin', '~8 mm'], ['Catheter sheath size', '4–8 Fr'], ['Popliteal pressure', '~10 mmHg lower than the arm']],
    conn: ['pelvis', 'femoral-vein-left', 'femur-left']
  });
  pair('femoral-vein', {
    aka: 'Thigh vein',
    fn: 'The great vein of the leg. It runs beside the femoral artery down the thigh, collecting blood from the whole limb, and becomes the external iliac vein above the inguinal ligament. It is the vessel in which deep vein thrombosis most often forms after surgery or a long spell of immobility.',
    facts: [
      'It lies in the same sheath as the femoral artery, which makes it a reliable target for central lines.',
      'A clot in the thigh veins can break loose and travel to the lungs as a pulmonary embolism.',
      'Blood is pushed back up by the calf muscle pump, so stillness is what allows clots to form.'
    ],
    stats: [['Diameter in groin', '~1.2 cm'], ['Line sheath size', '6–8 Fr'], ['Venous pressure', '5–15 mmHg']],
    conn: ['femoral-artery-left', 'saphenous-left', 'pelvis']
  });
  pair('saphenous', {
    aka: 'Long leg vein',
    fn: 'The great saphenous vein is the longest vein in the body. It starts on the inner side of the foot and runs the whole length of the inner leg and thigh to join the femoral vein in the groin, and it is the vessel harvested to bypass blocked coronary arteries.',
    facts: [
      'It runs up the inner side of the leg with the saphenous nerve crossing beside it.',
      'Surgeons harvest it for coronary artery bypass grafts, often through small spaced incisions.',
      'When its valves fail it becomes a varicose vein, and it can be stripped or sealed with laser or foam.'
    ],
    stats: [['Length', '~60 cm'], ['Diameter at the ankle', '4–5 mm'], ['Valves', '10–20 pairs']],
    conn: ['femoral-vein-left', 'tibia-left', 'metatarsals-left']
  });
  pair('tibial-artery', {
    aka: 'Below-knee arteries',
    fn: 'Behind the knee the popliteal artery divides into the anterior and posterior tibial arteries, which run down the front and the back of the leg into the foot. The posterior tibial artery passes behind the inner ankle bone, where its pulse can be felt, and both are checked with a Doppler when the circulation of a leg is in doubt.',
    facts: [
      'The posterior tibial pulse is felt just behind the inner ankle bone, the medial malleolus.',
      'The anterior tibial artery crosses the ankle to become the dorsalis pedis artery on the top of the foot.',
      'Narrowed tibial arteries cause pain in the calf on walking and are the usual finding in leg artery disease.'
    ],
    stats: [['Diameter', '2–3 mm'], ['Ankle-brachial index', '0.9–1.3 normal'], ['Doppler probe', '8 MHz']],
    conn: ['femoral-artery-left', 'tibia-left', 'metatarsals-left']
  });
})();
