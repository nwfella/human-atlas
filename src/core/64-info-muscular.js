/* =============================================================================
   RECORDS — muscular system. Function, key facts, measured figures and the
   structures each one works with. Runs inside the core closure.
   ========================================================================== */
(function () {
  pair('triceps', {
    aka: 'Three-headed arm muscle',
    fn: 'The triceps brachii is the large muscle on the back of the upper arm. Its three heads — long, lateral and medial — converge on one tendon that wraps the elbow and hooks the olecranon of the ulna, straightening the arm.',
    facts: [
      'The long head crosses the shoulder joint, so it can pull the arm back as well as extend the elbow.',
      'The medial head keeps working at low loads, giving a slow steady push where the other heads give a burst.',
      'The long head’s tendon runs through the shoulder joint capsule and is a frequent source of deep shoulder pain.'
    ],
    stats: [['Heads', '3'], ['Elbow extension force', '~1,000 N'], ['Upper-arm mass share', '~60%']],
    conn: ['humerus-left', 'ulna-left', 'scapula-left']
  });
  pair('forearm-extensors', {
    aka: 'Wrist and finger extensors',
    fn: 'A group of about a dozen muscles on the outer top of the forearm that straighten the wrist and open the fingers. Most share a tendon anchored to the lateral epicondyle of the humerus, which is why overuse there causes tennis elbow.',
    facts: [
      'The extensor digitorum sends four separate tendons across the back of the hand to the fingers.',
      'Their common origin at the lateral epicondyle is the tender spot of tennis elbow.',
      'Wrist extensors steady the wrist so the finger flexors can produce a strong grip without the wrist collapsing.'
    ],
    stats: [['Muscles in group', '11–12'], ['Wrist extension range', '~70°'], ['Force loss if paralysed', 'up to 50%']],
    conn: ['humerus-left', 'radius-left', 'metacarpals-left']
  });
  pair('hamstrings', {
    aka: 'Ischiocrural muscles',
    fn: 'Three muscles at the back of the thigh — biceps femoris, semitendinosus and semimembranosus — that bend the knee and drive the leg backwards when you walk, run or jump. They cross both the hip and the knee, so they act on two joints at once.',
    facts: [
      'Their two-joint span means a sprint loads them hardest just as the leg reaches forward for the next stride.',
      'The sciatic nerve runs down the back of the thigh between the hamstrings before splitting into its branches.',
      'Most strains tear at the muscle–tendon junction near the ischial tuberosity, the bone you sit on.'
    ],
    stats: [['Muscles', '3'], ['Knee flexion range', '~140°'], ['Force in a sprint', '~3,000 N']],
    conn: ['pelvis', 'femur-left', 'sciatic-nerve-left']
  });
  pair('erector', {
    aka: 'Erector spinae',
    fn: 'The erector spinae is a bundle of muscle columns running up the back on either side of the spine, from the sacrum to the base of the skull. It straightens the back and holds the trunk upright all day against gravity, so it tires more from stillness than from lifting.',
    facts: [
      'Each cross-section carries three columns stacked side by side: spinalis, longissimus and iliocostalis.',
      'It is the chief antigravity muscle of the trunk, never fully silent while you sit or stand.',
      'Its fibres fatigue within a few minutes of unsupported bending, which is what makes poor lifting posture risky.'
    ],
    stats: [['Columns', '3'], ['Mass, each side', '~500–700 g'], ['Tendon common origin', '~5 cm']],
    conn: ['sacrum', 'lumbar-spine', 'pelvis']
  });
  pair('trapezius', {
    aka: 'Shoulder shrug muscle',
    fn: 'A large diamond-shaped sheet across the back of the neck and shoulders, running from the skull and spine out to the shoulder blade and collar bone. Its upper part shrugs the shoulders, the middle squeezes the blades together and the lower part steadies the arm in its socket.',
    facts: [
      'Its lower fibres rotate the shoulder blade upward, the movement that lets you raise an arm above your head.',
      'It fires in a reflex spasm after a rear-end car crash, producing the classic whiplash stiff neck.',
      'It shares its name with a shape in geometry because its two triangles meet over the spine.'
    ],
    stats: [['Parts', '3'], ['Shoulder elevation', '~60°'], ['Common trigger-point sites', '4 pairs']],
    conn: ['cranium', 'scapula-left', 'clavicle-left']
  });
  pair('deltoid', {
    aka: 'Shoulder cap',
    fn: 'The triangular cap over the shoulder joint, with front, middle and rear heads. It is the main muscle that lifts the arm sideways away from the body, and each head also steers the arm in its own direction — forward, out or back.',
    facts: [
      'Only the middle head truly abducts the arm; the front head flexes it and the rear head extends it.',
      'The deltoid cannot start abduction until the rotator cuff has stabilised the joint and carried the first degrees.',
      'It is the muscle stretched around the upper arm for routine intramuscular injections in adults.'
    ],
    stats: [['Heads', '3'], ['Abduction range', '~180°'], ['Suitable injection depth', '25–40 mm']],
    conn: ['scapula-left', 'clavicle-left', 'humerus-left']
  });
  pair('pectoralis', {
    aka: 'Pectoralis major',
    fn: 'The broad fan across the chest that pulls the arm forward, inward and across the body. It anchors to the collar bone, the sternum and the costal cartilages, and its tendon spirals onto the humerus as it inserts.',
    facts: [
      'The lower, sternal head twists behind the upper head at the insertion, so the tendon spirals onto the bone.',
      'It both pulls the arm inward and rotates it inward, which is what makes it the power muscle of a bench press.',
      'Pectoralis major and pectoralis minor are separate muscles; the minor lies underneath and lifts the ribs in a deep breath.'
    ],
    stats: [['Heads', '2'], ['Horizontal adduction', 'up to 45°'], ['Cross-sectional area', '~30 cm²']],
    conn: ['sternum', 'clavicle-left', 'humerus-left']
  });
  pair('biceps', {
    aka: 'Two-headed arm muscle',
    fn: 'The two-headed muscle on the front of the upper arm. Its long head rises from the shoulder socket and its short head from the shoulder blade, and both merge into one belly that bends the elbow and turns the palm upward.',
    facts: [
      'It is the strongest supinator of the forearm, turning a key or a screwdriver palm-up.',
      'Its long head’s tendon runs inside the shoulder joint capsule and is a common source of shoulder pain.',
      'Although it bulges when you curl a weight, the brachialis underneath does most of the bending work.'
    ],
    stats: [['Heads', '2'], ['Elbow flexion force', '~150 N'], ['Share of supination', 'over 50%']],
    conn: ['scapula-left', 'humerus-left', 'radius-left']
  });
  pair('forearm-flexors', {
    aka: 'Wrist and finger flexors',
    fn: 'The flexor group on the inner forearm that closes the hand and bends the wrist. It is anchored by a common tendon at the medial epicondyle and feeds long tendons through a fibrous band at the wrist into the fingers, where the real strength of a grip is generated.',
    facts: [
      'The two long flexors of the fingers thread eight tendons through the wrist, with a ninth for the thumb.',
      'Grip strength is used as a quick bedside gauge of overall muscle strength and of general health risk.',
      'Medial epicondylitis, golfer’s elbow, is the flexor group failing at its common anchor.'
    ],
    stats: [['Muscles', '~6'], ['Grip force, adult men', '~400–500 N'], ['Tendons crossing the wrist', '9']],
    conn: ['humerus-left', 'ulna-left', 'carpals-left']
  });
  pair('latissimus', {
    aka: 'Broadest back muscle',
    fn: 'The widest muscle of the back, sweeping from the spine, the pelvis and the lower ribs up into a flat tendon on the front of the arm. Its pull brings the arm down and back toward the hip — the swimmer’s pull-down, the climbing haul and the drive of a rowing stroke.',
    facts: [
      'Its broad fan forms the back wall of the armpit, which you can feel with a raised arm.',
      'It is among the largest muscles of the body by surface area and the main engine of a powerful pull-down.',
      'Some people have a small extra slip, the axillary arch, that can pinch nerves and vessels under the arm.'
    ],
    stats: [['Width of origin', '~40 cm'], ['Mass, each side', '~350 g'], ['Tendon length', '~10 cm']],
    conn: ['lumbar-spine', 'pelvis', 'humerus-left']
  });
  pair('serratus', {
    aka: 'Serratus anterior',
    fn: 'A fan of finger-like muscle slips wrapping the side of the rib cage from the first eight ribs back to the inner edge of the shoulder blade. It pulls the blade forward around the chest, the movement that lets you push, punch and reach ahead.',
    facts: [
      'Its nerve, the long thoracic, lies on the surface of the muscle, so a blow or surgery can paralyse it.',
      'When the serratus fails, the shoulder blade lifts off the ribs and juts out, a winged scapula.',
      'Its lowest slips interlock with the external oblique, stitching the chest wall to the abdominal wall.'
    ],
    stats: [['Slips', '8–10'], ['Humeral elevation', 'up to 180°'], ['Nerve roots', 'C5–C7']],
    conn: ['ribs-true-left', 'scapula-left', 'humerus-left']
  });
  pair('oblique', {
    aka: 'External oblique',
    fn: 'The largest muscle of the abdominal wall, running diagonally from the lower ribs down and forward to the pelvis like hands in pockets. It curls the trunk forward, bends it sideways and rotates it to the opposite side, so it twists a throw or a golf swing.',
    facts: [
      'Its lowest fibres fold back on themselves to form the inguinal ligament, the groin crease the femoral vessels pass under.',
      'The left external oblique rotates the trunk to the right, the basis of every twisting throw.',
      'A plane of loose tissue separates it from the deeper internal oblique, a route surgeons follow in hernia repair.'
    ],
    stats: [['Fibre run', '10th rib to pelvis'], ['Trunk rotation', '~45°'], ['Inguinal ligament', '~12 cm']],
    conn: ['ribs-false-left', 'pelvis', 'rectus-abdominis']
  });
  pair('gluteus', {
    aka: 'Gluteus maximus',
    fn: 'The large muscle of the buttock and the bulkiest muscle in the human body. It drives the hip backward to climb, sprint and rise from a squat, and it is nearly quiet when you walk on flat ground — its real work happens on stairs, hills and sprints.',
    facts: [
      'It is the single most powerful extensor of the hip and the largest muscle by mass in the body.',
      'Human gluteus maximus is far larger than that of other primates, a change linked to upright running.',
      'Its lower edge sits just above the sciatic nerve, which is why deep injections there are placed carefully.'
    ],
    stats: [['Mass, each side', '~800 g'], ['Hip extension', '~10–20°'], ['Of total body mass', '~3%']],
    conn: ['pelvis', 'sacrum', 'femur-left']
  });
  pair('quadriceps', {
    aka: 'Quadriceps femoris',
    fn: 'Four muscles on the front of the thigh — rectus femoris, vastus lateralis, vastus medialis and vastus intermedius — that share one tendon and straighten the knee. Three heads rise from the femur alone and only the rectus femoris crosses the hip, so it alone also lifts the thigh.',
    facts: [
      'All four heads merge into the patellar tendon and pull the kneecap as a single unit.',
      'The vastus medialis helps keep the kneecap tracking straight, and its weakness is a common cause of kneecap pain.',
      'Measured through a knee machine, the quadriceps is the strongest muscle group in the body.'
    ],
    stats: [['Heads', '4'], ['Knee extension force', 'over 500 N'], ['Of thigh volume', '~70%']],
    conn: ['femur-left', 'patella-left', 'tibia-left']
  });
  pair('gastrocnemius', {
    aka: 'Calf muscle',
    fn: 'The two-headed calf muscle that forms the bulge at the back of the shin. It rises above the knee and joins the soleus to form the Achilles tendon, pushing the foot down so you can stand on tiptoe, run and jump.',
    facts: [
      'It works with the soleus beneath it, and the two together are called the triceps surae.',
      'Because it crosses the knee, bending the knee slackens it and cuts its power to push off.',
      'Its tendon is the strongest in the body and stretches slightly with every step, storing energy like a spring.'
    ],
    stats: [['Heads', '2'], ['Achilles tendon length', '~15 cm'], ['Tendon force in running', '~3,000 N']],
    conn: ['femur-left', 'tibia-left', 'tarsals-left']
  });
  pair('tibialis', {
    aka: 'Tibialis anterior',
    fn: 'The muscle on the front of the shin, alongside the shin bone, that lifts the foot toward the shin and turns the sole inward. It clears the toes from the ground during walking and lowers the foot under control as the heel lands.',
    facts: [
      'It is the muscle that fails in foot drop, when the deep peroneal nerve is injured near the knee or shin.',
      'Its tendon crosses the front of the ankle under fibrous bands and is a frequent site of shin splints.',
      'Its action of lifting the toes is dorsiflexion, the exact opposite of the calf’s push-off.'
    ],
    stats: [['Dorsiflexion range', '~20°'], ['Ankle inversion', '~30°'], ['Nerve roots', 'L4–L5']],
    conn: ['tibia-left', 'tarsals-left', 'metatarsals-left']
  });
  pair('scm', {
    aka: 'Sternocleidomastoid',
    fn: 'The thick diagonal band running from the breastbone and collar bone up behind the ear. One side turns the head to the opposite side and tilts it toward the shoulder, while both together bend the neck forward and lift the chest in a hard breath.',
    facts: [
      'It divides the neck into the front and back triangles that surgeons use to find the great vessels.',
      'In a newborn, a tight sternocleidomastoid pulls the head to one side, the posture called torticollis.',
      'It is a neck accessory muscle of breathing, so it stands out in anyone struggling for air.'
    ],
    stats: [['Heads', '2'], ['Neck rotation each way', '~45°'], ['Innervated from', 'C2–C3']],
    conn: ['sternum', 'clavicle-left', 'cranium']
  });
  pair('masseter', {
    aka: 'Jaw-closing muscle',
    fn: 'The square muscle you can feel bulging at the angle of the jaw when you clench your teeth. It is one of the strongest muscles for its size in the body, hauling the lower jaw up against the upper teeth.',
    facts: [
      'Two heads, superficial and deep, both run from the cheekbone down to the angle of the jaw.',
      'Its own branch of the trigeminal nerve supplies it alone, and its reflex is the one tapped when testing that nerve.',
      'Injecting it with botulinum toxin is a standard treatment for grinding the teeth at night.'
    ],
    stats: [['Bite force, molars', '~500 N'], ['Mass, each side', '~20 g'], ['Thickness', '~2 cm']],
    conn: ['mandible', 'cranium', 'temporalis-left']
  });
  pair('temporalis', {
    aka: 'Temple muscle',
    fn: 'A fan-shaped muscle filling the hollow of the temple, running under the cheekbone arch to the front of the jaw hinge. It closes the jaw and pulls it back, and its position makes it one of the muscles behind a temple headache.',
    facts: [
      'Its tendon passes deep to the cheekbone arch, having once run through that arch in our reptile ancestors.',
      'Its fibres fan over the whole temple, so it can shorten far more than its short tendon suggests.',
      'It is a common source of temporal headache, and tender spots in it refer pain across the side of the head.'
    ],
    stats: [['Fibre groups', '3'], ['Share of bite force', '~30%'], ['Attachment width', '~8 cm']],
    conn: ['mandible', 'cranium', 'masseter-left']
  });
  one('rectus-abdominis', {
    aka: 'The six-pack',
    fn: 'The paired strap of muscle running up the front of the belly from the pubis to the breastbone. It curls the trunk forward, and the crossing bands of tendon that cut it into blocks are what create the six-pack look.',
    facts: [
      'Its two halves are separated all the way up by the linea alba, so the left and right sides never meet.',
      'The horizontal bands are fixed tendon, not gaps, so the number of blocks is set by anatomy, not by training.',
      'It sits in a fibrous sleeve shared with the obliques, and that sleeve is what actually stops the belly bulging.'
    ],
    stats: [['Blocks per side', '3–4'], ['Trunk curl', '~40°'], ['Sheath layers', '2']],
    conn: ['sternum', 'pelvis', 'transversus-abdominis']
  });
  one('transversus-abdominis', {
    aka: 'The core corset',
    fn: 'The deepest muscle of the abdominal wall, wrapping the belly horizontally from the lower back to the midline like a corset. It barely bends the trunk; instead it tightens the wall and raises the pressure inside the abdomen to steady the spine before a limb moves.',
    facts: [
      'It fires before the arm or leg moves in a healthy posture, bracing the spine in anticipation.',
      'Its fibres squeeze the waist inward, the action shared by a cough, a lift and a weightlifting belt.',
      'It is the muscle that drives the last of the breath out with force, and the one that fails in a hernia.'
    ],
    stats: [['Fibres anchored to', 'lower 6 ribs'], ['Cough pressure rise', '~100 mmHg'], ['Thickness', '~3 mm']],
    conn: ['pelvis', 'rectus-abdominis', 'lumbar-spine']
  });
  one('diaphragm', {
    aka: 'Primary breathing muscle',
    fn: 'A dome of muscle and tendon that separates the chest from the abdomen. It is the primary muscle of breathing: when it flattens, the chest cavity widens and air is drawn in, and it works automatically about a dozen times a minute at rest.',
    facts: [
      'Its nerve is the phrenic nerve from C3, C4 and C5, the root levels that keep the diaphragm alive.',
      'Its three main openings carry the aorta, the vena cava and the gullet between chest and abdomen.',
      'A hiccup is a sudden involuntary diaphragm contraction cut off by the flap that shuts the airway.'
    ],
    stats: [['Breaths at rest', '12–16 per minute'], ['Dome excursion, quiet breathing', '~1.5 cm'], ['Nerve roots', 'C3–C5']],
    conn: ['ribs-true-left', 'lumbar-spine', 'vena-cava-inferior']
  });
})();
