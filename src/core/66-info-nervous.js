/* =============================================================================
   RECORDS — nervous system. Brain, cord and the peripheral nerves a front
   view can show. Runs inside the core closure.
   ========================================================================== */
(function () {
  one('cerebellum', {
    aka: 'Little brain', fn: 'The cerebellum sits at the back of the skull beneath the cerebrum, its surface pleated into fine parallel ridges. It smooths and corrects movement, holds balance and posture, and compares the intended motion with the actual one many times a second.',
    facts: [
      'It takes up only about 10% of brain volume yet holds over half of the brain’s neurons.',
      'Its Purkinje cells are among the largest and most branched cells in the nervous system.',
      'Damage here disturbs coordination and balance without causing paralysis or loss of feeling.'
    ],
    stats: [['Share of brain volume', '~10%'], ['Share of brain neurons', 'over 50%'], ['Granule cells', '~50 billion']],
    conn: ['cerebrum', 'brainstem', 'spinal-cord']
  });
  one('cerebrum', {
    aka: 'Forebrain, two hemispheres', fn: 'The cerebrum is the two-hemisphere mass capping the brain, the halves joined across the middle by a thick bridge of fibres. Its folded outer layer is the cerebral cortex, the seat of conscious sensation, voluntary movement, language, memory and reasoning.',
    facts: [
      'It is split into left and right hemispheres and four lobes each: frontal, parietal, temporal and occipital.',
      'The folded cortex packs roughly 2,500 cm² of surface into the skull, a third of it exposed and two thirds hidden in the grooves.',
      'Its grey matter is only 2–4 mm thick, yet the brain takes about 20% of the body’s oxygen and glucose.'
    ],
    stats: [['Hemispheres', '2'], ['Cortical thickness', '2–4 mm'], ['Neurons in the brain', '~86 billion']],
    conn: ['cerebellum', 'brainstem', 'cranium']
  });
  one('brainstem', {
    aka: 'Midbrain, pons and medulla', fn: 'The brainstem is the stalk that joins the brain to the spinal cord, built from the midbrain, the pons and the medulla oblongata. It carries every signal passing between brain and body and runs the automatic functions that keep a person alive.',
    facts: [
      'It sets the rhythm of breathing and controls heart rate and blood pressure without conscious input.',
      'All twelve pairs of cranial nerves except the first two arise from or end in the brainstem.',
      'Damage here is the most dangerous of brain injuries because the vital centres sit within it.'
    ],
    stats: [['Parts', '3 (midbrain, pons, medulla)'], ['Cranial nerves attached', '10 of 12'], ['Length', '~7 cm']],
    conn: ['cerebrum', 'cerebellum', 'spinal-cord']
  });
  one('spinal-cord', {
    aka: 'Medulla spinalis', fn: 'The spinal cord runs from the base of the skull down a bony tunnel in the spine, carrying voluntary commands out to the body and sensation back in. It tapers to a point called the conus medullaris around the first or second lumbar vertebra.',
    facts: [
      'It gives off 31 pairs of spinal nerves, one pair for each segment along its length.',
      'Below its tapered end, nerve roots continue downward as the cauda equina, the horse’s tail.',
      'Ascending tracts carry sensation upward and descending tracts carry motor commands downward.'
    ],
    stats: [['Spinal nerve pairs', '31'], ['Length', '~45 cm'], ['Lower end', 'L1–L2 conus medullaris']],
    conn: ['brainstem', 'cervical-spine', 'lumbar-spine']
  });
  one('intercostal-nerves', {
    aka: 'Rib nerves', fn: 'The intercostal nerves are the front branches of the first eleven thoracic spinal nerves. Each runs under one rib around the chest wall, supplying the muscles between the ribs, the skin of that band and part of the abdominal wall.',
    facts: [
      'They run from T1 to T11, and each one supplies its own band of skin, called a dermatome, around the trunk.',
      'They drive the intercostal muscles that lift the ribs and pull the chest open during quiet breathing.',
      'The lowest of them continue forward into the abdominal wall and supply muscles there.'
    ],
    stats: [['Spinal segments', 'T1–T11'], ['Pairs', '11'], ['Dermatomes', '1 per nerve']],
    conn: ['thoracic-spine', 'spinal-cord', 'rectus-abdominis']
  });
  pair('vagus', {
    aka: 'Cranial nerve X', fn: 'The vagus is the tenth cranial nerve and the longest of them all, wandering from the brainstem down the neck into the chest and abdomen. It carries the main parasympathetic signals that slow the heart, narrow the airways and set digestion going.',
    facts: [
      'It is cranial nerve X, the longest cranial nerve, reaching from the brainstem as far as the colon.',
      'Its fibres slow the heart, feed the lungs and start the gut moving and secreting.',
      'About 80% of its fibres are sensory, carrying information from the organs back to the brain.'
    ],
    stats: [['Cranial nerve number', 'X (10th)'], ['Sensory fibres', '~80%'], ['Longest of cranial nerves', '1 of 12']],
    conn: ['brainstem', 'heart', 'stomach']
  });
  pair('optic-nerve', {
    aka: 'Cranial nerve II', fn: 'The optic nerve is the second cranial nerve, and it is not a nerve in the ordinary sense: it is a tract of brain tissue carrying the retina’s output back to the brain. Each one leaves the eye at the blind spot and runs to the optic chiasm.',
    facts: [
      'It carries about 1.2 million nerve fibres from each eye, one for every retinal ganglion cell.',
      'Because it is brain tissue, it is wrapped in the same meninges as the brain itself.',
      'At the optic chiasm about half of its fibres cross over to the other side of the brain.'
    ],
    stats: [['Cranial nerve number', 'II (2)'], ['Fibres per nerve', '~1.2 million'], ['Crossing at the chiasm', '~50%']],
    conn: ['eye-left', 'cerebrum', 'carotid-left']
  });
  pair('eye', {
    aka: 'Sense organ of sight', fn: 'The eye is the sensory end-organ of the optic nerve, a fluid-filled sphere that focuses light onto a sheet of photoreceptors. The cornea and the lens bend incoming light, and the retina turns it into nerve signals.',
    facts: [
      'Each retina holds about 120 million rods for dim light and about 6 million cones for colour.',
      'The cones are crowded into the fovea, a small pit that gives the sharpest central vision.',
      'The two eyes overlap to give a binocular field of roughly 200 degrees with depth perception.'
    ],
    stats: [['Rods per eye', '~120 million'], ['Cones per eye', '~6 million'], ['Binocular field', '~200°']],
    conn: ['optic-nerve-left', 'cerebrum', 'cranium']
  });
  pair('brachial-plexus', {
    aka: 'Nerve web of the arm', fn: 'The brachial plexus is the web of nerves formed by the lower four cervical and the first thoracic roots, C5 to T1. It rearranges those roots into the nerves that run the whole arm, from the shoulder to the fingertips.',
    facts: [
      'Its roots run from C5 to T1 and are rebuilt into trunks, divisions, cords and finally branches.',
      'Injury to the upper roots gives Erb’s palsy, leaving the arm hanging with the hand turned inward.',
      'Injury to the lowest root, T1, gives Klumpke’s palsy and a paralysed hand.'
    ],
    stats: [['Roots', 'C5–T1'], ['Spinal segments', '5'], ['Terminal branches', '5 major']],
    conn: ['cervical-spine', 'clavicle-left', 'humerus-left']
  });
  pair('median-nerve', {
    aka: 'Wrist nerve', fn: 'The median nerve is one of the main nerves of the forearm and hand, formed from the C5 to T1 roots of the brachial plexus. It bends the wrist, drives most of the thumb muscles and gives feeling to the palm side of the hand.',
    facts: [
      'It passes through the carpal tunnel at the wrist, where squeezing it numbs the thumb, index, middle and half of the ring finger.',
      'It supplies the muscles that move the thumb, so injury flattens the fleshy mound at the thumb base.',
      'Its sensory territory stops short of the little finger, which is served by the ulnar nerve.'
    ],
    stats: [['Roots', 'C5–T1'], ['Digits numbed in carpal tunnel', '3½ of 5'], ['Conduction speed', '~50 m/s']],
    conn: ['forearm-flexors-left', 'carpals-left', 'brachial-plexus-left']
  });
  pair('ulnar-nerve', {
    aka: 'Funny-bone nerve', fn: 'The ulnar nerve runs down the inner side of the arm and passes behind the bony knob at the inside of the elbow, the medial epicondyle. It supplies most of the small muscles of the hand and the feeling of the little finger.',
    facts: [
      'It passes behind the medial epicondyle, the spot known as the funny bone, where it has almost no protection.',
      'It drives most of the intrinsic hand muscles, so damage produces a claw hand with the ring and little fingers bent.',
      'It supplies feeling to the little finger and half of the ring finger.'
    ],
    stats: [['Roots', 'C8–T1'], ['Intrinsic hand muscles', 'over 15'], ['Sensory digits', '1½ of 5']],
    conn: ['ulna-left', 'humerus-left', 'carpals-left']
  });
  pair('radial-nerve', {
    aka: 'Spiral nerve', fn: 'The radial nerve is the largest branch of the brachial plexus and spirals around the shaft of the humerus in a groove named after it. It straightens the wrist and fingers and supplies the skin over the back of the arm and hand.',
    facts: [
      'It winds around the humerus in the spiral groove, so a mid-shaft fracture can trap or tear it.',
      'It extends the wrist and fingers, and injury leaves a wrist drop with the hand flopping down.',
      'It is a branch of the posterior cord of the brachial plexus, carrying C5 to T1 fibres.'
    ],
    stats: [['Roots', 'C5–T1'], ['Muscles supplied', '~13'], ['Spiral groove length', '~5 cm']],
    conn: ['humerus-left', 'triceps-left', 'brachial-plexus-left']
  });
  pair('femoral-nerve', {
    aka: 'Thigh nerve', fn: 'The femoral nerve forms inside the abdomen from the L2 to L4 roots and passes under the groin ligament into the front of the thigh. It flexes the hip and straightens the knee and carries sensation from the front of the thigh and the inner leg.',
    facts: [
      'It comes from the L2 to L4 roots and is the main nerve of the front of the thigh.',
      'It straightens the knee by driving the quadriceps, so injury makes the knee buckle when weight is put on it.',
      'A femoral nerve block is widely used to numb the leg for knee surgery.'
    ],
    stats: [['Roots', 'L2–L4'], ['Quadriceps heads driven', '4'], ['Largest branch', '1 (saphenous)']],
    conn: ['lumbar-spine', 'quadriceps-left', 'femur-left']
  });
  pair('sciatic-nerve', {
    aka: 'Largest nerve in the body', fn: 'The sciatic nerve is the largest and thickest nerve in the body, formed from the L4 to S3 roots. It leaves the pelvis through the buttock and runs down the back of the thigh before splitting into the tibial and common peroneal nerves.',
    facts: [
      'It is about 2 cm wide at its thickest and runs from the buttock to just above the knee.',
      'It splits into the tibial and common peroneal nerves, which then continue down the leg.',
      'A slipped disc at L4/L5 or L5/S1 presses on its roots and produces the pain called sciatica.'
    ],
    stats: [['Roots', 'L4–S3'], ['Width', '~2 cm'], ['Terminal branches', '2']],
    conn: ['pelvis', 'sacrum', 'femur-left']
  });
  pair('tibial-nerve', {
    aka: 'Calf and sole nerve', fn: 'The tibial nerve is the larger of the two branches of the sciatic nerve and continues straight down the back of the leg. It drives the calf and the small muscles of the sole and supplies feeling to the heel and the sole of the foot.',
    facts: [
      'It is the larger terminal branch of the sciatic nerve and runs down the back of the calf.',
      'It supplies the calf muscles that point the foot, so it powers the push-off step of walking.',
      'It passes behind the inner ankle through the tarsal tunnel, where compression causes sole pain.'
    ],
    stats: [['Roots', 'L4–S3'], ['Plantar branches', '2'], ['Calf muscles supplied', '~6']],
    conn: ['sciatic-nerve-left', 'tibia-left', 'gastrocnemius-left']
  });
  pair('peroneal-nerve', {
    aka: 'Common peroneal nerve', fn: 'The common peroneal nerve is the smaller branch of the sciatic nerve and runs down the outer side of the knee. It wraps around the neck of the fibula just under the skin before dividing to lift the foot and toes.',
    facts: [
      'It wraps around the fibular neck, where it lies right under the skin and is easily injured by a fracture there.',
      'It lifts the foot and toes, so its injury causes foot drop and a slapping walk.',
      'It supplies feeling to the outer side of the lower leg and the top of the foot.'
    ],
    stats: [['Roots', 'L4–S2'], ['Divisions', '2'], ['Fibular neck wrap', '~3 cm']],
    conn: ['fibula-left', 'sciatic-nerve-left', 'tibialis-left']
  });
})();
