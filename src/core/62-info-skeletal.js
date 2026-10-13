/* =============================================================================
   RECORDS — skeletal system. Function, key facts, measured figures and the
   structures each one works with. Runs inside the core closure.
   ========================================================================== */
(function () {
  one('cranium', {
    aka: 'Skull vault', fn: 'The neurocranium is the bony box around the brain: eight flat bones locked together by serrated sutures, with the frontal bone at the forehead, the parietals over the crown and the occipital at the back of the head. It also suspends the meninges, the venous sinuses and the pituitary gland.',
    facts: [
      'Eight flat bones fuse along serrated sutures that only knit solid in the mid-twenties.',
      'The inner surface is moulded to the brain, with fossae matching each lobe.',
      'Its base carries 12 holes and canals for the cranial nerves and vessels.'
    ],
    stats: [['Bone thickness', '5–10 mm'], ['Cranial volume', '~1,400 mL'], ['Sutures', '~10 major']],
    conn: ['cerebrum', 'facial-bones', 'mandible']
  });
  one('facial-bones', {
    aka: 'Viscerocranium', fn: 'The fourteen facial bones build the eye sockets, the nasal cavity and the upper jaw. The maxillae carry the upper teeth and house the largest sinus; the zygomatic bones make the cheekbones that take a punch first.',
    facts: [
      'Each orbit is assembled from seven bones — no single bone forms the socket.',
      'The maxillae hold the maxillary sinuses and the upper tooth roots, which is why a sinus infection feels like toothache.',
      'Facial sutures are already fused in adults, so the face is far stiffer than the vault.'
    ],
    stats: [['Bones', '13 plus mandible'], ['Orbit depth', '~4 cm'], ['Maxillary sinus', '~15 mL']],
    conn: ['cranium', 'mandible', 'eye-left']
  });
  one('mandible', {
    aka: 'Lower jaw', fn: 'The only freely movable bone of the skull. It hinges in front of each ear and carries the lower teeth, driven by the masseter, temporalis and pterygoids — the strongest force-per-size muscles in the body.',
    facts: [
      'It begins as two halves joined at the chin and fuses within the first year.',
      'The temporomandibular joint both hinges and slides, letting the jaw open about 5 cm.',
      'It is the last bone of the skull to finish growing, which is why the face lengthens in the teens.'
    ],
    stats: [['Bite force, molars', '~700–900 N'], ['Opening range', '40–50 mm'], ['Teeth', '16 lower']],
    conn: ['cranium', 'facial-bones', 'masseter-left']
  });
  one('hyoid', {
    aka: 'Tongue bone', fn: 'A small U-shaped bone that floats in the front of the neck at the base of the tongue. It is the only bone in the body that articulates with nothing else: it hangs from muscle and ligament, anchoring the tongue and larynx so that swallowing and speech are possible.',
    facts: [
      'No joint — it is suspended entirely by muscles and ligaments.',
      'It is pulled upward with the larynx during swallowing, closing the airway.',
      'A fractured hyoid in a body is a classic forensic marker of manual strangulation.'
    ],
    stats: [['Length', '3–4 cm'], ['Articulations', 'none'], ['Attachments', '9 muscles']],
    conn: ['mandible', 'cervical-spine', 'trachea']
  });
  one('cervical-spine', {
    aka: 'Neck spine', fn: 'Seven vertebrae hold the head and let it turn. The first (atlas) is a ring that carries the skull and nods; the second (axis) has a peg that the atlas spins around, giving half of all neck rotation. Their bodies are small and light because they carry the least weight of the whole column.',
    facts: [
      'The atlas is named after the titan who carried the heavens on his shoulders.',
      'The atlas–axis joint alone supplies roughly 45° of rotation each way.',
      'Each transverse process has a hole that threads the vertebral artery to the brain.'
    ],
    stats: [['Vertebrae', '7 (C1–C7)'], ['Total rotation', '80–90°'], ['Load carried', 'least of the spine']],
    conn: ['cranium', 'thoracic-spine', 'carotid-left']
  });
  one('thoracic-spine', {
    aka: 'Mid-back spine', fn: 'Twelve vertebrae, each providing a facet for a pair of ribs. They form the only part of the spine that grips the rib cage, and their overlapping spinous processes make this the stiffest region of the back — which is why it protects the heart and lungs so well.',
    facts: [
      'The only spinal region with joints for ribs, so it moves with every breath.',
      'Its backward curve (kyphosis) is the one present in a newborn.',
      'Rotation is freest in the mid-thoracic spine, bending is freest at the ends.'
    ],
    stats: [['Vertebrae', '12 (T1–T12)'], ['Rib pairs attached', '12'], ['Curve', 'kyphotic']],
    conn: ['cervical-spine', 'lumbar-spine', 'ribs-true-left', 'spinal-cord']
  });
  one('lumbar-spine', {
    aka: 'Lower back', fn: 'Five heavy vertebrae carry all the weight above the pelvis. Their bodies are the largest in the spine and their joints permit bending but almost no twisting, so lifting a load while turning is how lumbar discs and facets are most often damaged.',
    facts: [
      'The L5–S1 level takes the highest shear load and is where most disc herniations occur.',
      'The lumbar curve appears after a child starts walking and standing.',
      'Standing compresses the discs so much that body height falls 1–2 cm over a day.'
    ],
    stats: [['Vertebrae', '5 (L1–L5)'], ['Load at L5/S1', '~2–3× body weight standing'], ['Range, flexion', '~60°']],
    conn: ['thoracic-spine', 'sacrum', 'erector-left', 'sciatic-nerve-left']
  });
  one('sacrum', {
    aka: 'Holy bone', fn: 'Five vertebrae fused into one triangular bone wedged between the two iliac wings. It is the keystone of the pelvis: the spine rests on it and the pelvis transfers the load of the upper body into both legs.',
    facts: [
      'Five separate vertebrae fuse between roughly 16 and 30 years of age.',
      'Its four pairs of holes carry the sacral nerves out to the legs and pelvic organs.',
      'It joins the ilium at the sacroiliac joints, which allow only a few millimetres of movement.'
    ],
    stats: [['Vertebrae fused', '5'], ['Nerve passages', '8 (4 pairs)'], ['Angle of tilt', '~40°']],
    conn: ['lumbar-spine', 'pelvis', 'coccyx']
  });
  one('coccyx', {
    aka: 'Tailbone', fn: 'Three to five shrunken vertebrae forming the human tail remnant. It is the attachment for the pelvic floor muscles and part of the gluteus maximus, and it helps support the body when sitting down.',
    facts: [
      'Falls onto a hard seat are the commonest cause of coccyx pain.',
      'In a tailed mammal these vertebrae would carry the tail musculature.',
      'It is the last part of the vertebral column to ossify.'
    ],
    stats: [['Vertebrae', '3–5 fused'], ['Length', '~3 cm'], ['Joint', 'sacrococcygeal']],
    conn: ['sacrum', 'pelvis', 'gluteus-left']
  });
  pair('scapula', {
    aka: 'Shoulder blade', fn: 'A flat triangular bone that glides over the ribs at the back of the shoulder. It binds the arm to the trunk: the humerus sits in its shallow socket and the clavicle meets its acromion, and its muscular sling rotates the socket upward when you raise an arm.',
    facts: [
      'It is the bone that makes shoulder elevation possible — the socket lifts as the arm goes up.',
      'Its glenoid socket is shallow, so the shoulder trades stability for the widest range of motion in the body.',
      'It has 17 muscle attachments but no bony joint with the spine.'
    ],
    stats: [['Angle of rotation', '~60°'], ['Muscle attachments', '17'], ['Bone type', 'flat, no marrow cavity']],
    conn: ['clavicle-left', 'humerus-left', 'trapezius-left']
  });
  pair('ribs-true', {
    aka: 'Ribs 1–7', fn: 'The upper seven rib pairs, each running from its vertebra around the chest to reach the sternum through its own costal cartilage. They form the rigid front of the thorax, guarding the heart, great vessels and upper lungs.',
    facts: [
      'True ribs each attach directly to the sternum with a bar of cartilage.',
      'The first rib is the shortest, deepest and hardest to feel; the seventh flares into the costal margin.',
      'The ribs move 1–2 cm with quiet breathing and much further when the accessory muscles join in.'
    ],
    stats: [['Ribs per side', '7'], ['Length, longest', '~30 cm'], ['Chest rise', '1–2 cm per breath']],
    conn: ['sternum', 'ribs-false-left', 'lung-left', 'heart']
  });
  pair('ribs-false', {
    aka: 'Ribs 8–10', fn: 'Three pairs of ribs that never reach the sternum. Their cartilages merge into the costal arch below, which is the springy rim you can feel with your fingers under the lower ribs — and the reason a rib cage can expand instead of being one rigid box.',
    facts: [
      'They join each other and the cartilage of rib 7 rather than the sternum.',
      'The costal arch is the boundary between the chest and the abdomen.',
      'These ribs are the ones injured when a liver or kidney injury is suspected after a blow.'
    ],
    stats: [['Ribs per side', '3'], ['Arch angle', '~70–90°'], ['Cartilage', 'shared']],
    conn: ['ribs-true-left', 'ribs-floating-left', 'sternum', 'diaphragm']
  });
  pair('ribs-floating', {
    aka: 'Ribs 11–12', fn: 'Two short ribs per side that end in muscle, attached only to their vertebrae. Because nothing anchors the front end, these ribs are the ones a surgeon can reach through without cutting cartilage.',
    facts: [
      'They float freely, attached only to the spine, and their tips can be felt in the flank.',
      'Their flexibility allows the flank to expand, which is why they matter for deep breathing.',
      'They are notoriously easy to confuse with abdominal pain or a kidney problem.'
    ],
    stats: [['Ribs per side', '2'], ['Distinctive feature', 'no anterior attachment'], ['Cartilage', 'none']],
    conn: ['ribs-false-left', 'thoracic-spine', 'kidney-left']
  });
  one('sternum', {
    aka: 'Breastbone', fn: 'The flat bone running down the front of the chest: a wider manubrium at the top, a long body, and a small xiphoid tip. It closes the front of the rib cage and carries the sternum pads and the origin of the diaphragm.',
    facts: [
      'Ribs 1–7 dock here through cartilage, making the front chest slightly flexible.',
      'A mid-line sting of pain here should be taken seriously: the sternum guards the heart.',
      'Marrow in the sternum is a standard site for a bone-marrow sample.'
    ],
    stats: [['Length', '15–20 cm'], ['Segments', '3'], ['Cartilage joints', '14']],
    conn: ['ribs-true-left', 'clavicle-left', 'heart', 'thymus']
  });
  pair('clavicle', {
    aka: 'Collar bone', fn: 'The only long bone that lies across the body. It props the shoulder away from the chest so the arm can swing freely, and it channels shocks from the hand sideways into the spine instead of into the neck.',
    facts: [
      'It is the most commonly fractured bone — the mid-shaft gives way in falls onto the shoulder.',
      'It is the first bone in the embryo to begin ossifying, at about five weeks.',
      'All of the arm is suspended from it, so it is the last bony strut before the limb hangs free.'
    ],
    stats: [['Length', '~15 cm'], ['Ossification starts', '~5th week'], ['Fracture share', 'most common long bone']],
    conn: ['scapula-left', 'sternum', 'humerus-left', 'subclavian-left']
  });
  pair('humerus', {
    aka: 'Arm bone', fn: 'The single bone of the upper arm. Its ball fits the shoulder socket so the limb can swing in every direction, and its lower end with the ulna forms the hinge that flexes and extends the elbow.',
    facts: [
      'The radial nerve runs in a groove around its shaft — that is why a mid-shaft fracture can cause a dropped wrist.',
      'Its articular head is almost hemispherical, which is what buys the shoulder its huge range.',
      'The elbow is a stable hinge held together mostly by ligaments, not by bone shape.'
    ],
    stats: [['Length', '~33 cm'], ['Bones in the segment', '1'], ['Elbow range', '0–150°']],
    conn: ['scapula-left', 'radius-left', 'ulna-left', 'brachial-left']
  });
  pair('radius', {
    aka: 'Thumb-side forearm bone', fn: 'The forearm bone on the thumb side. Unlike the ulna it turns: the radius swivels over the ulna to flip the palm up and down, which is what gives the human forearm its wrist rotation of about 180°.',
    facts: [
      'It carries the hand at the wrist joint, so falling on an outstretched hand breaks the radius most often.',
      'Its rotation against the ulna is what turns a doorknob or a screwdriver.',
      'Its lower end is the widest part of the wrist surface.'
    ],
    stats: [['Length', '~26 cm'], ['Rotation, pronation–supination', '~180°'], ['Wrist share of load', '~80%']],
    conn: ['ulna-left', 'humerus-left', 'carpals-left', 'radial-left']
  });
  pair('ulna', {
    aka: 'Little-finger-side forearm bone', fn: 'The forearm bone on the little-finger side and the one that forms the elbow joint proper. It acts as the stable axis that the radius spins around, so the forearm can rotate without the elbow moving.',
    facts: [
      'The olecranon at its top is the point of the elbow that you bang on a table.',
      'It stays nearly still during pronation while the radius crosses over it.',
      'Its lower end is separated from the wrist bones by a disc, so it carries little load.'
    ],
    stats: [['Length', '~28 cm'], ['Joint', 'hinge at the elbow'], ['Load at wrist', '~20%']],
    conn: ['radius-left', 'humerus-left', 'carpals-left', 'ulnar-left']
  });
  pair('carpals', {
    aka: 'Wrist bones', fn: 'Eight small bones arranged in two rows between the forearm and the hand. They form a flexible arch that lets the wrist bend in two directions and glide, and they move in a coordinated chain so the hand can angle without pinching.',
    facts: [
      'The scaphoid is the most commonly fractured carpal, and a break there can starve the bone of blood.',
      'The carpal tunnel between them carries the median nerve and nine tendons.',
      'Two rows of four: proximal (scaphoid, lunate, triquetrum, pisiform) and distal.'
    ],
    stats: [['Bones', '8 per wrist'], ['Tunnel contents', '1 nerve, 9 tendons'], ['Most fractured', 'scaphoid']],
    conn: ['radius-left', 'ulna-left', 'metacarpals-left', 'median-nerve-left']
  });
  pair('metacarpals', {
    aka: 'Palm bones', fn: 'Five long bones making up the palm and the knuckles. They fan out to give the hand its width, and the fifth one pivots so the little finger can be brought towards the thumb and the palm folded into a shovel.',
    facts: [
      'The fifth metacarpal has the most movement, producing the cupped hand.',
      'A punch to a hard surface classically fractures the fifth metacarpal neck — a boxer’s fracture.',
      'Their heads are the knuckles you can see when you clench a fist.'
    ],
    stats: [['Bones', '5 per hand'], ['Longest', '2nd metacarpal'], ['Hand length', '~19 cm']],
    conn: ['carpals-left', 'finger-bones-left', 'forearm-flexors-left']
  });
  pair('finger-bones', {
    aka: 'Phalanges of the hand', fn: 'Fourteen slim bones per hand forming the thumb and four fingers. Three bones each in the fingers and two in the thumb give the hand 27 degrees of freedom of bone movement, more than any other part of the body.',
    facts: [
      'The thumb has only two phalanges, which is why it can oppose rather than just curl.',
      'The distal phalanges carry the nail beds and the pads of fingerprints.',
      'The middle phalanx of a finger is the shortest of the three.'
    ],
    stats: [['Bones per hand', '14'], ['Thumb phalanges', '2'], ['Joints per hand', '14 finger joints']],
    conn: ['metacarpals-left', 'carpals-left', 'median-nerve-left']
  });
  one('pelvis', {
    aka: 'Hip bone, os coxae', fn: 'The ring of bone between the spine and the legs. Each side is a fusion of ilium, ischium and pubis, and the two halves meet at the front. It transfers the weight of the upper body into the legs, cradles the bladder and bowel, and in a woman is built to open for birth.',
    facts: [
      'The acetabulum — the hip socket — is deep, which is exactly why the hip is more stable than the shoulder.',
      'The female pelvis is wider, with a sub-pubic angle near 90° against about 70° in the male.',
      'Its bone surfaces thicken in response to load, which is why walking strengthens the hip.',
      'The two halves fuse into single bones between the ages of 15 and 25.'
    ],
    stats: [['Bones fused per side', '3'], ['Symphysis movement', '1–2 mm'], ['Load at hip', '~3× body weight walking']],
    conn: ['sacrum', 'femur-left', 'bladder', 'gluteus-left']
  });
  pair('femur', {
    aka: 'Thigh bone', fn: 'The longest, heaviest and strongest bone in the body, carrying up to several times body weight with every step. Its head sits in the deep hip socket; its angled neck is the classic break of old age.',
    facts: [
      'It makes up about a quarter of a person’s height.',
      'Its lower shaft is the strongest part of the bone: it takes more force to break than concrete.',
      'A femoral neck fracture cuts off the blood supply to the head, so the bone often dies.'
    ],
    stats: [['Length', '~26% of height'], ['Load walking', '~3× body weight'], ['Neck angle', '~125°']],
    conn: ['pelvis', 'tibia-left', 'patella-left', 'quadriceps-left', 'femoral-artery-left']
  });
  pair('patella', {
    aka: 'Kneecap', fn: 'The largest sesamoid bone, embedded in the quadriceps tendon rather than joined to another bone. It acts as a pulley: it holds the tendon away from the knee so the quadriceps gains a longer lever arm when straightening the knee.',
    facts: [
      'Embedding in tendon means it can be removed surgically — the knee still works, just more weakly.',
      'It increases the effective power of the quadriceps by roughly 30%.',
      'It is the only bone in the body that sits entirely within a tendon.'
    ],
    stats: [['Size', '5 × 5 × 1 cm'], ['Power gain', '~30%'], ['Type', 'sesamoid']],
    conn: ['quadriceps-left', 'femur-left', 'tibia-left']
  });
  pair('tibia', {
    aka: 'Shin bone', fn: 'The weight-bearing bone of the lower leg and the second longest in the body. It carries the whole load of the leg and forms the hinge of the knee, and its front edge is the shin surface you can trace with a finger.',
    facts: [
      'The tibia, not the fibula, takes the weight of the leg.',
      'Its shaft is triangular in section, which gives strength for a modest amount of bone.',
      'An open tibial fracture is rare but dangerous, because skin lies directly over the bone.'
    ],
    stats: [['Length', '~22% of height'], ['Load share', '~100% of leg load'], ['Knee range', '0–140°']],
    conn: ['femur-left', 'fibula-left', 'tarsals-left', 'tibial-artery-left']
  });
  pair('fibula', {
    aka: 'Calf bone', fn: 'The slender bone on the outside of the lower leg. It bears almost no weight, but it is not redundant: it stabilises the ankle, gives twenty muscles a place to attach, and lets the shin rotate.',
    facts: [
      'It carries under 10% of the leg load but stabilises the ankle joint.',
      'Its lower end forms the lateral malleolus, the knob on the outside of your ankle.',
      'It can be removed for grafting without disabling the leg.'
    ],
    stats: [['Load share', 'under 10%'], ['Length', '~40 cm'], ['Role', 'stabiliser + lever']],
    conn: ['tibia-left', 'tarsals-left', 'peroneal-nerve-left']
  });
  pair('tarsals', {
    aka: 'Ankle and heel bones', fn: 'Seven bones forming the ankle and the back of the foot. The talus wears the leg’s weight and passes it to the heel and the arch; the calcaneus is the heel that lands first and acts as a spring.',
    facts: [
      'The talus is the only bone with no muscle attached — it is a pure load transmitter.',
      'The calcaneus takes the whole impact of a jump, several times body weight.',
      'Its shape creates the transverse arch that distributes body weight across the foot.'
    ],
    stats: [['Bones per foot', '7'], ['Impact at heel strike', '~2–3× body weight'], ['Foot arches', '2 main, 3 minor']],
    conn: ['tibia-left', 'fibula-left', 'metatarsals-left']
  });
  pair('metatarsals', {
    aka: 'Mid-foot bones', fn: 'Five long bones running from the tarsals to the toes. They spread the load of every step into a fan along the foot, bending slightly to store and return energy as you walk.',
    facts: [
      'The second and third metatarsals are the commonest stress-fracture sites in runners.',
      'Their fan shape is what makes the foot work as a spring rather than a paddle.',
      'The first metatarsal carries twice the load of any other bone in the foot.'
    ],
    stats: [['Bones per foot', '5'], ['Load, first metatarsal', '~2× the others'], ['Stress fracture site', '2nd/3rd']],
    conn: ['tarsals-left', 'toe-bones-left', 'gastrocnemius-left']
  });
  pair('toe-bones', {
    aka: 'Phalanges of the foot', fn: 'Fourteen short bones forming the toes. The big toe carries two and the rest three, giving the foot the push-off lever it needs to finish every step.',
    facts: [
      'The hallux has only two bones, like the thumb.',
      'The toes supply the final push that lifts the body off the ground.',
      'Toe bones are short and thick because they take shear rather than bending.'
    ],
    stats: [['Bones per foot', '14'], ['Big toe bones', '2'], ['Push-off share', '~40% of step propulsion']],
    conn: ['metatarsals-left', 'tarsals-left', 'tibialis-left']
  });
})();
