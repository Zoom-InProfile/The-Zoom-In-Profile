const questions = [

  // -------------------------
  // SOMATIC
  // -------------------------
  {
    id: "somatic_1",
    category: "somatic",
    type: "scenario",
    question: "You’re dealing with ongoing physical discomfort. On a demanding day, you notice:",
    answers: [
      { text: "You acknowledge the discomfort, adjust your expectations, and move through the day without it taking over", score: 0 },
      { text: "You feel the strain and are less patient or present, but you stay engaged", score: 1 },
      { text: "The discomfort starts to shape your mood, attention, and interactions throughout the day", score: 2 },
      { text: "The discomfort takes over, and you withdraw or feel defeated by it", score: 3 }
    ]
  },
  {
    id: "somatic_2",
    category: "somatic",
    type: "scenario",
    question: "You notice an unfamiliar physical sensation that goes away pretty quickly. You notice:",
    answers: [
      { text: "You register it and move on", score: 0 },
      { text: "You feel concerned but once it's gone you forget about it", score: 1 },
      { text: "It stays in the background of your awareness and is hard to set aside", score: 2 },
      { text: "Your attention keeps returning to it and it becomes difficult to focus on anything else", score: 3 }
    ]
  },
  {
    id: "somatic_3",
    category: "somatic",
    type: "vulnerability",
    question: "When my body feels off, it quickly takes over my attention.",
    answers: [
      { text: "Never or rarely", score: 0 },
      { text: "Sometimes", score: 1 },
      { text: "Often", score: 2 },
      { text: "Almost always", score: 3 }
    ]
  },
  {
    id: "somatic_4",
    category: "somatic",
    type: "resilience",
    question: "I have a fundamental confidence in my body's ability to take care of itself.",
    answers: [
      { text: "Almost always", score: 0 },
      { text: "Often", score: 1 },
      { text: "Sometimes", score: 2 },
      { text: "Never or rarely", score: 3 }
    ]
  },
  {
    id: "somatic_5",
    category: "somatic",
    type: "resilience",
    question: "I treat physical discomfort as information rather than a problem.",
    answers: [
      { text: "Almost always", score: 0 },
      { text: "Often", score: 1 },
      { text: "Sometimes", score: 2 },
      { text: "Never or rarely", score: 3 }
    ]
  },

  // -------------------------
// APPRAISAL
// -------------------------
{
  id: "appraisal_1",
  category: "appraisal",
  type: "scenario",
  question: "You made a mistake that mattered to you. You notice:",
  answers: [
    { text: "You note what to do differently and move on", score: 0 },
    { text: "You react and then offer yourself reassurance and move on", score: 1 },
    { text: "Your inner critic is loud and you keep replaying what happened into the night", score: 2 },
    { text: "Your inner critic takes over — you turn against yourself and shut down", score: 3 }
  ]
},
{
  id: "appraisal_2",
  category: "appraisal",
  type: "scenario",
  question: "You look back at a significant choice you regret. You notice:",
  answers: [
    { text: "You notice the thought, remind yourself you did your best, and move on", score: 0 },
    { text: "You wish it hadn't happened, but feel compassion for yourself and move through it", score: 1 },
    { text: "You get pulled into regret and your inner critic starts judging you", score: 2 },
    { text: "It feels heavier than regret — closer to self-loathing", score: 3 }
  ]
},
{
  id: "appraisal_3",
  category: "appraisal",
  type: "vulnerability",
  question: "When something goes wrong, my inner critic is quick to blame me rather than the situation.",
  answers: [
    { text: "Never or rarely", score: 0 },
    { text: "Sometimes", score: 1 },
    { text: "Often", score: 2 },
    { text: "Almost always", score: 3 }
  ]
},
{
  id: "appraisal_4",
  category: "appraisal",
  type: "vulnerability",
  question: "I carry mistakes with me longer than I'd like.",
  answers: [
    { text: "Never or rarely", score: 0 },
    { text: "Sometimes", score: 1 },
    { text: "Often", score: 2 },
    { text: "Almost always", score: 3 }
  ]
},
{
  id: "appraisal_5",
  category: "appraisal",
  type: "resilience",
  question: "Even when I mess up, I stay on my own side.",
  answers: [
    { text: "Almost always", score: 0 },
    { text: "Often", score: 1 },
    { text: "Sometimes", score: 2 },
    { text: "Never or rarely", score: 3 }
  ]
},

  // -------------------------
// PERCEPTION
// -------------------------
{
  id: "perception_1",
  category: "perception",
  type: "scenario",
  question: "You have an important presentation or conversation with someone you want to impress. You notice:",
  answers: [
    { text: "You prepare and trust yourself to do well", score: 0 },
    { text: "You prepare and feel some nerves, but know you'll do fine once you get started", score: 1 },
    { text: "You worry about how you'll come across and rehearse to get it just right", score: 2 },
    { text: "You become highly focused on how you'll be perceived — and are afraid you may freeze", score: 3 }
  ]
},
{
  id: "perception_2",
  category: "perception",
  type: "scenario",
  question: "Someone whose opinion matters gives you critical feedback that doesn't feel fair. You notice:",
  answers: [
    { text: "You take what's useful, set aside the rest, and move on", score: 0 },
    { text: "You feel stung, but find perspective pretty quickly", score: 1 },
    { text: "You have trouble shaking it and keep wondering if it changed how they see you", score: 2 },
    { text: "You feel it land as confirmation of what you fear they already think", score: 3 }
  ]
},
{
  id: "perception_3",
  category: "perception",
  type: "vulnerability",
  question: "I replay conversations, wondering how I came across.",
  answers: [
    { text: "Never or rarely", score: 0 },
    { text: "Sometimes", score: 1 },
    { text: "Often", score: 2 },
    { text: "Almost always", score: 3 }
  ]
},
{
  id: "perception_4",
  category: "perception",
  type: "resilience",
  question: "I have no problem stating my own opinions when I'm unsure how others will respond.",
  answers: [
    { text: "Almost always", score: 0 },
    { text: "Often", score: 1 },
    { text: "Sometimes", score: 2 },
    { text: "Never or rarely", score: 3 }
  ]
},
{
  id: "perception_5",
  category: "perception",
  type: "resilience",
  question: "I move through social interactions without tracking how I'm being received.",
  answers: [
    { text: "Almost always", score: 0 },
    { text: "Often", score: 1 },
    { text: "Sometimes", score: 2 },
    { text: "Never or rarely", score: 3 }
  ]
},
  // -------------------------
// CONNECTION
// -------------------------
{
  id: "connection_1",
  category: "connection",
  type: "scenario",
  question: "You feel some distance from a loved one — nothing dramatic, just off. You notice:",
  answers: [
    { text: "You notice the distance and feel loved and connected", score: 0 },
    { text: "You feel the distance and a subtle uneasiness", score: 1 },
    { text: "You start to question their love for you", score: 2 },
    { text: "You feel unloved and find yourself pulling away or seeking reassurance", score: 3 }
  ]
},
{
  id: "connection_2",
  category: "connection",
  type: "scenario",
  question: "Someone close to you consistently dismisses your needs or input. Over time you notice:",
  answers: [
    { text: "You see the pattern clearly, speak up, and trust your needs matter in the relationship", score: 0 },
    { text: "You feel frustrated and sometimes resentful, but still believe your needs matter", score: 1 },
    { text: "You start to feel less seen and speak up less", score: 2 },
    { text: "You feel unseen and alone in the relationship", score: 3 }
  ]
},
{
  id: "connection_3",
  category: "connection",
  type: "vulnerability",
  question: "When I don't feel loved in an important relationship, I feel anxious and fragile.",
  answers: [
    { text: "Never or rarely", score: 0 },
    { text: "Sometimes", score: 1 },
    { text: "Often", score: 2 },
    { text: "Almost always", score: 3 }
  ]
},
{
  id: "connection_4",
  category: "connection",
  type: "vulnerability",
  question: "When I am having conflict with someone close to me, I find myself either pushing to resolve it quickly or pulling away entirely.",
  answers: [
    { text: "Never or rarely", score: 0 },
    { text: "Sometimes", score: 1 },
    { text: "Often", score: 2 },
    { text: "Almost always", score: 3 }
  ]
},
{
  id: "connection_5",
  category: "connection",
  type: "resilience",
  question: "When a relationship feels tense or difficult, I don't think to question how loved I am.",
  answers: [
    { text: "Almost always", score: 0 },
    { text: "Often", score: 1 },
    { text: "Sometimes", score: 2 },
    { text: "Never or rarely", score: 3 }
  ]
},
// -------------------------
// INFLUENCE
// -------------------------
{
  id: "influence_1",
  category: "influence",
  type: "scenario",
  question: "Someone you love is making a choice you believe won't go well, and they aren't listening. You notice:",
  answers: [
    { text: "You share your perspective and can accept that the choice is theirs", score: 0 },
    { text: "You feel concerned and want them to see it, but you can let it go", score: 1 },
    { text: "You feel a strong pull to make them understand, and it's hard to step back", score: 2 },
    { text: "You feel responsible for what happens and can't let it go, even when it's not working", score: 3 }
  ]
},
{
  id: "influence_2",
  category: "influence",
  type: "scenario",
  question: "You can clearly see how a situation you care about could go better, but the decision isn't yours to make. You notice:",
  answers: [
    { text: "You feel at peace after sharing your perspective", score: 0 },
    { text: "You feel some frustration, but you can let it go", score: 1 },
    { text: "You keep thinking about it and find it hard to step back", score: 2 },
    { text: "You feel responsible for how it turns out and keep trying to influence it, even when it's not working", score: 3 }
  ]
},
{
  id: "influence_3",
  category: "influence",
  type: "vulnerability",
  question: "I find it very difficult to step back when someone I feel responsible for is making choices I believe won't go well.",
  answers: [
    { text: "Never or rarely", score: 0 },
    { text: "Sometimes", score: 1 },
    { text: "Often", score: 2 },
    { text: "Almost always", score: 3 }
  ]
},
{
  id: "influence_4",
  category: "influence",
  type: "vulnerability",
  question: "I feel personally responsible for the well-being of the people I love.",
  answers: [
    { text: "Never or rarely", score: 0 },
    { text: "Sometimes", score: 1 },
    { text: "Often", score: 2 },
    { text: "Almost always", score: 3 }
  ]
},
{
  id: "influence_5",
  category: "influence",
  type: "resilience",
  question: "When someone I love has a choice to make, I share my perspective and accept that the choice is theirs.",
  answers: [
    { text: "Almost always", score: 0 },
    { text: "Often", score: 1 },
    { text: "Sometimes", score: 2 },
    { text: "Never or rarely", score: 3 }
  ]
},
// -------------------------
// BALANCE
// -------------------------
{
  id: "balance_1",
  category: "balance",
  type: "scenario",
  question: "You’re in a stretch where the demands on you don’t let up. You notice:",
  answers: [
    { text: "You feel calm and able to stay focused on what matters", score: 0 },
    { text: "You feel pressure building, but can still stay on top of things", score: 1 },
    { text: "You feel stretched and scattered, like it’s getting harder to keep up", score: 2 },
    { text: "You feel overwhelmed and like everything is starting to fall apart", score: 3 }
  ]
},
{
  id: "balance_2",
  category: "balance",
  type: "scenario",
  question: "Your plate feels completely full and someone asks you to take on something more, you notice:",
  answers: [
    { text: "You assess it and either take it on or say no without much strain", score: 0 },
    { text: "You feel the pressure, but are able to think it through before responding", score: 1 },
    { text: "You feel on the edge of overwhelm and aren’t sure you can handle much more", score: 2 },
    { text: "You feel completely overwhelmed and like you can’t function", score: 3 }
  ]
},
{
  id: "balance_3",
  category: "balance",
  type: "vulnerability",
  question: "Even on lighter days, I tend to feel like I have little left to give.",
  answers: [
    { text: "Never or rarely", score: 0 },
    { text: "Sometimes", score: 1 },
    { text: "Often", score: 2 },
    { text: "Almost always", score: 3 }
  ]
},
{
  id: "balance_4",
  category: "balance",
  type: "vulnerability",
  question: "When it feels like too much, I put things off or avoid what needs to get done.",
  answers: [
    { text: "Never or rarely", score: 0 },
    { text: "Sometimes", score: 1 },
    { text: "Often", score: 2 },
    { text: "Almost always", score: 3 }
  ]
},
{
  id: "balance_5",
  category: "balance",
  type: "resilience",
  question: "I handle a full load without getting overwhelmed.",
  answers: [
    { text: "Almost always", score: 0 },
    { text: "Often", score: 1 },
    { text: "Sometimes", score: 2 },
    { text: "Never or rarely", score: 3 }
  ]
},
// ---------------------------
  // COMFORT
  // ---------------------------
  {
    id: "comfort_1",
    category: "comfort",
    type: "scenario",
    question: "You experience a major change you didn't see coming. You notice:",
    answers: [
      { text: "You find your footing quickly and stay open to the possibilities ahead", score: 0 },
      { text: "You feel unsettled and disoriented, but you adjust and begin to open up to what's next", score: 1 },
      { text: "You feel stuck in what you lost, and it's hard to move forward or imagine anything new", score: 2 },
      { text: "You feel like you lost yourself and can't find who you are in this new version of your life", score: 3 }
    ]
  },
  {
    id: "comfort_2",
    category: "comfort",
    type: "scenario",
    question: "You decided to make a big change, and it's been harder than you anticipated. You notice:",
    answers: [
      { text: "You adjust to the disruption and find your footing without losing confidence in your decision", score: 0 },
      { text: "You feel unsettled by the challenges, but you trust your decision and stay open", score: 1 },
      { text: "The challenges pile up and you start to question whether you made the right choice", score: 2 },
      { text: "You feel like you made a mistake and can't stop measuring everything against how it was before", score: 3 }
    ]
  },
  {
    id: "comfort_3",
    category: "comfort",
    type: "vulnerability",
    question: "I dread upcoming changes even when I know they might be good for me.",
    answers: [
      { text: "Never or rarely", score: 0 },
      { text: "Sometimes", score: 1 },
      { text: "Often", score: 2 },
      { text: "Almost always", score: 3 }
    ]
  },
  {
    id: "comfort_4",
    category: "comfort",
    type: "resilience",
    question: "When things change, I stay open to what's ahead rather than dwelling on what I lost.",
    answers: [
      { text: "Almost always", score: 0 },
      { text: "Often", score: 1 },
      { text: "Sometimes", score: 2 },
      { text: "Never or rarely", score: 3 }
    ]
  },
  {
    id: "comfort_5",
    category: "comfort",
    type: "resilience",
    question: "I enjoy trying new things even when I'm not good at them yet.",
    answers: [
      { text: "Almost always", score: 0 },
      { text: "Often", score: 1 },
      { text: "Sometimes", score: 2 },
      { text: "Never or rarely", score: 3 }
    ]
  },

  // ---------------------------
  // ATTUNEMENT
  // ---------------------------
  {
    id: "attunement_1",
    category: "attunement",
    type: "scenario",
    question: "The news has been upsetting and relentless for weeks. You notice:",
    answers: [
      { text: "You stay informed without over-consuming and don't get pulled under by it", score: 0 },
      { text: "You feel a low hum of collective sadness in the background, but it doesn't follow you into your day", score: 1 },
      { text: "You feel angry and helpless, and it starts to affect your mood and your ability to focus", score: 2 },
      { text: "You cycle between numbing out and being overwhelmed, and it starts to affect your relationships and your ability to function", score: 3 }
    ]
  },
  {
    id: "attunement_2",
    category: "attunement",
    type: "scenario",
    question: "You witness something that deeply violates your sense of what is right, in an institution, a community, or the world. You notice:",
    answers: [
      { text: "You feel genuinely upset without taking the pain on as your own", score: 0 },
      { text: "You feel disturbed and sit with it for a while, but find your way back to yourself without too much difficulty", score: 1 },
      { text: "A weight settles in and stays, making it harder to be fully present in your own life", score: 2 },
      { text: "You lose trust in people or institutions, and it becomes hard to feel grounded or safe in your own life", score: 3 }
    ]
  },
  {
    id: "attunement_3",
    category: "attunement",
    type: "vulnerability",
    question: "I tend to suffer when terrible things happen in the world, as if they are happening to me.",
    answers: [
      { text: "Never or rarely", score: 0 },
      { text: "Sometimes", score: 1 },
      { text: "Often", score: 2 },
      { text: "Almost always", score: 3 }
    ]
  },
  {
    id: "attunement_4",
    category: "attunement",
    type: "resilience",
    question: "I tend to stay focused on my purpose and hopefulness despite the suffering or injustices in the world.",
    answers: [
      { text: "Almost always", score: 0 },
      { text: "Often", score: 1 },
      { text: "Sometimes", score: 2 },
      { text: "Never or rarely", score: 3 }
    ]
  },
  {
    id: "attunement_5",
    category: "attunement",
    type: "resilience",
    question: "I allow myself moments of hope or beauty without guilt when the world feels heavy.",
    answers: [
      { text: "Almost always", score: 0 },
      { text: "Often", score: 1 },
      { text: "Sometimes", score: 2 },
      { text: "Never or rarely", score: 3 }
    ]
  },

  // ---------------------------
  // CERTAINTY
  // ---------------------------
  {
    id: "certainty_1",
    category: "certainty",
    type: "scenario",
    question: "You're waiting for important news that could take days or weeks. You notice:",
    answers: [
      { text: "You know the uncertainty is temporary and stay focused on what you can do today", score: 0 },
      { text: "You feel tension and check for updates more than usual, but it doesn't affect your sleep or your day", score: 1 },
      { text: "Your mind rehearses worst-case outcomes, as if preparing now will soften the blow later", score: 2 },
      { text: "A fear you can't reason your way out of settles in and stays, making it hard to feel okay until you know", score: 3 }
    ]
  },
  {
    id: "certainty_2",
    category: "certainty",
    type: "scenario",
    question: "You're dealing with a situation that may not have a clear resolution for a long time, possibly ever. You notice:",
    answers: [
      { text: "You accept that some things stay unresolved and it doesn't occupy much of your thinking", score: 0 },
      { text: "You think about it more than you'd like, but you can set it aside and function normally most of the time", score: 1 },
      { text: "It sits in the background of most days, pulling at your attention and making it hard to feel fully settled", score: 2 },
      { text: "The open-endedness feels unbearable, and your mind keeps returning to it with fear or dread no matter what you do", score: 3 }
    ]
  },
  {
    id: "certainty_3",
    category: "certainty",
    type: "vulnerability",
    question: "I tend to catastrophize when something important is uncertain.",
    answers: [
      { text: "Never or rarely", score: 0 },
      { text: "Sometimes", score: 1 },
      { text: "Often", score: 2 },
      { text: "Almost always", score: 3 }
    ]
  },
  {
    id: "certainty_4",
    category: "certainty",
    type: "vulnerability",
    question: "When something important is uncertain or at stake, I find myself searching for information about what could go wrong.",
    answers: [
      { text: "Never or rarely", score: 0 },
      { text: "Sometimes", score: 1 },
      { text: "Often", score: 2 },
      { text: "Almost always", score: 3 }
    ]
  },
  {
    id: "certainty_5",
    category: "certainty",
    type: "resilience",
    question: "My mind typically goes to what I want to happen rather than what I don't.",
    answers: [
      { text: "Almost always", score: 0 },
      { text: "Often", score: 1 },
      { text: "Sometimes", score: 2 },
      { text: "Never or rarely", score: 3 }
    ]
  }
];


