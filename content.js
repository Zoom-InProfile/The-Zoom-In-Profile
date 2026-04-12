const questions = [

  // -------------------------
  // SOMATIC
  // -------------------------
  {
    id: "somatic_1",
    category: "somatic",
    type: "scenario",
    question: "You’re dealing with ongoing physical discomfort that isn’t going away. On a demanding day, you notice:",
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
    question: "Under stress, your body starts signaling tension or fatigue. You notice:",
    answers: [
      { text: "You recognize the signals early and respond in ways that help regulate your system", score: 0 },
      { text: "You feel the tension but continue functioning and address it when you can", score: 1 },
      { text: "The physical symptoms amplify the stress and it becomes harder to settle your system", score: 2 },
      { text: "Your body feels like it’s working against you, and everything becomes harder to manage", score: 3 }
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
    question: "Even when I feel physical discomfort, I can still access my usual perspective.",
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
  // SELF-JUDGMENT
  // -------------------------
  {
    id: "self_1",
    category: "self",
    type: "scenario",
    question: "You made a visible mistake in front of people whose opinion matters. You notice:",
    answers: [
      { text: "You note what to do differently and move on", score: 0 },
      { text: "You feel embarrassed but can talk yourself down within a few hours", score: 1 },
      { text: "Your inner critic is loud and you keep replaying what happened into the night", score: 2 },
      { text: "Your inner critic takes over — you turn against yourself and shut down", score: 3 }
    ]
  },
  {
    id: "self_2",
    category: "self",
    type: "scenario",
    question: "You look back at a significant choice you regret. You notice:",
    answers: [
      { text: "You notice the thought, remind yourself you did your best, and move on", score: 0 },
      { text: "You wish it hadn’t happened, but feel compassion for yourself and move through it", score: 1 },
      { text: "You get pulled into regret and your inner critic starts judging you", score: 2 },
      { text: "It feels heavier than regret — closer to self-loathing", score: 3 }
    ]
  },
  {
    id: "self_3",
    category: "self",
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
    id: "self_4",
    category: "self",
    type: "vulnerability",
    question: "I carry mistakes with me longer than I’d like.",
    answers: [
      { text: "Never or rarely", score: 0 },
      { text: "Sometimes", score: 1 },
      { text: "Often", score: 2 },
      { text: "Almost always", score: 3 }
    ]
  },
  {
    id: "self_5",
    category: "self",
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
  // APPROVAL
  // -------------------------
  {
    id: "approval_1",
    category: "approval",
    type: "scenario",
    question: "You have an important presentation or conversation with someone you want to impress. You notice:",
    answers: [
      { text: "You feel some nerves, but prepare and trust yourself — the anxiety becomes energy", score: 0 },
      { text: "You feel real anxiety, but usually find your footing once you begin", score: 1 },
      { text: "You find yourself thinking a lot about how you’ll come across and trying to get it just right", score: 2 },
      { text: "You become highly focused on how you’re being perceived — adjusting, rehearsing, or shaping yourself to land well", score: 3 }
    ]
  },
  {
    id: "approval_2",
    category: "approval",
    type: "scenario",
    question: "Someone whose opinion matters gives you critical feedback that doesn’t feel entirely fair. You notice:",
    answers: [
      { text: "You take what’s useful, set aside the rest, and move on", score: 0 },
      { text: "You feel stung, but find perspective within a day or so", score: 1 },
      { text: "You have trouble shaking it and keep wondering if it changed how they see you", score: 2 },
      { text: "You feel it land as confirmation of what you fear they already think", score: 3 }
    ]
  },
  {
    id: "approval_3",
    category: "approval",
    type: "scenario",
    question: "Someone close to you strongly disagrees with your choices and makes it clear they don’t approve. You notice:",
    answers: [
      { text: "You stay grounded in your position, even if they don’t approve", score: 0 },
      { text: "You feel the tension, but can still stay connected to what you believe", score: 1 },
      { text: "You feel pulled by their disapproval and start to get defensive or question yourself", score: 2 },
      { text: "You feel triggered and reactive — it’s hard to think clearly and you snap or shut down", score: 3 }
    ]
  },
  {
    id: "approval_4",
    category: "approval",
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
    id: "approval_5",
    category: "approval",
    type: "resilience",
    question: "I act from my own values even when I’m unsure how others will respond.",
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
    { text: "You feel the distance but still feel loved and connected", score: 0 },
    { text: "You feel the distance and a subtle uneasiness", score: 1 },
    { text: "You start to feel less loved, and it begins to affect your mood", score: 2 },
    { text: "You feel a sharp drop in feeling loved, and everything starts to feel less good", score: 3 }
  ]
},
{
  id: "connection_2",
  category: "connection",
  type: "scenario",
  question: "Someone important to you repeatedly overrides your needs or dismisses your input. Over time you notice:",
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
  question: "When I don’t feel loved in an important relationship, I feel anxious and more fragile.",
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
  question: "When someone I care about is upset with me, I quickly assume they don’t like me.",
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
  question: "When someone I love is quiet or distant, I trust that it isn't about me.",
  answers: [
    { text: "Almost always", score: 0 },
    { text: "Often", score: 1 },
    { text: "Sometimes", score: 2 },
    { text: "Never or rarely", score: 3 }
  ]
},

// -------------------------
// ATTACHMENT
// -------------------------
{
  id: "attachment_1",
  category: "attachment",
  type: "scenario",
  question: "Someone you love is struggling, and there’s nothing you can do to fix it. You notice:",
  answers: [
    { text: "You feel deeply for them and maintain your own daily life", score: 0 },
    { text: "Their pain stays with you, but you don't lose yourself in it", score: 1 },
    { text: "You start to take on their distress and it becomes hard to feel okay yourself", score: 2 },
    { text: "You can't separate their pain from your own and your well-being depends on theirs", score: 3 }
  ]
},
{
  id: "attachment_2",
  category: "attachment",
  type: "scenario",
  question: "You are supporting someone you love over an extended period, and their needs don’t let up. You notice:",
  answers: [
    { text: "You’re there for them, but your life doesn’t revolve around it", score: 0 },
    { text: "You feel the weight of it all, but are able to take care of yourself as well", score: 1 },
    { text: "You feel responsible for holding everything together and start to lose your footing", score: 2 },
    { text: "It feels like it’s all on you, and you can’t step back", score: 3 }
  ]
},
{
  id: "attachment_3",
  category: "attachment",
  type: "vulnerability",
  question: "I tend to prioritize my loved ones’ needs over my own.",
  answers: [
    { text: "Never or rarely", score: 0 },
    { text: "Sometimes", score: 1 },
    { text: "Often", score: 2 },
    { text: "Almost always", score: 3 }
  ]
},
{
  id: "attachment_4",
  category: "attachment",
  type: "vulnerability",
  question: "I feel responsible for my loved ones’ well-being, even when it isn’t mine to carry.",
  answers: [
    { text: "Never or rarely", score: 0 },
    { text: "Sometimes", score: 1 },
    { text: "Often", score: 2 },
    { text: "Almost always", score: 3 }
  ]
},
{
  id: "attachment_5",
  category: "attachment",
  type: "resilience",
  question: "I care deeply about the people in my life without taking their pain on as my own.",
  answers: [
    { text: "Almost always", score: 0 },
    { text: "Often", score: 1 },
    { text: "Sometimes", score: 2 },
    { text: "Never or rarely", score: 3 }
  ]
},

// -------------------------
// CAPACITY
// -------------------------
{
  id: "capacity_1",
  category: "capacity",
  type: "scenario",
  question: "You’re in a stretch where the demands on you don’t let up — work, family, obligations. You notice:",
  answers: [
    { text: "You feel steady and able to stay focused on what matters", score: 0 },
    { text: "You feel pressure building, but can still stay on top of things", score: 1 },
    { text: "You feel stretched and mentally scattered, like it’s getting harder to keep up", score: 2 },
    { text: "You feel overwhelmed and like everything is starting to fall apart", score: 3 }
  ]
},
{
  id: "capacity_2",
  category: "capacity",
  type: "scenario",
  question: "When your plate already feels full and someone asks you to take on something more, you notice:",
  answers: [
    { text: "You assess it and either take it on or say no without much strain", score: 0 },
    { text: "You feel the pressure, but are able to think it through before responding", score: 1 },
    { text: "You feel on the edge of overwhelm and aren’t sure you can handle much more", score: 2 },
    { text: "You feel completely overwhelmed and like you can’t function", score: 3 }
  ]
},
{
  id: "capacity_3",
  category: "capacity",
  type: "vulnerability",
  question: "My plate fills up quickly, even when I try to manage it.",
  answers: [
    { text: "Never or rarely", score: 0 },
    { text: "Sometimes", score: 1 },
    { text: "Often", score: 2 },
    { text: "Almost always", score: 3 }
  ]
},
{
  id: "capacity_4",
  category: "capacity",
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
  id: "capacity_5",
  category: "capacity",
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
  // CHANGE
  // ---------------------------
  {
    id: "change_1",
    category: "change",
    type: "scenario",
    question: "You experience a major change that you weren't prepared for and didn't see coming. You notice:",
    answers: [
      { text: "You find your footing quickly and stay open to the possibilities ahead", score: 0 },
      { text: "You feel unsettled and disoriented, but you adjust and begin to open up to what's next", score: 1 },
      { text: "You feel stuck in what you lost, and it's hard to move forward or imagine anything new", score: 2 },
      { text: "You feel like you lost yourself and can't find who you are in this new version of your life", score: 3 }
    ]
  },
  {
    id: "change_2",
    category: "change",
    type: "scenario",
    question: "You made a change you wanted and there have been many challenges. You notice:",
    answers: [
      { text: "You expected some disruption and find your footing without losing confidence in your decision", score: 0 },
      { text: "You feel unsettled by the challenges, but you trust your decision and stay open", score: 1 },
      { text: "The disruption is harder than you anticipated and you question whether you made the right choice", score: 2 },
      { text: "You feel like you made a mistake and can't stop measuring everything against how it was before", score: 3 }
    ]
  },
  {
    id: "change_3",
    category: "change",
    type: "vulnerability",
    question: "I find myself dreading upcoming changes even when I know they might be good for me.",
    answers: [
      { text: "Never or rarely", score: 0 },
      { text: "Sometimes", score: 1 },
      { text: "Often", score: 2 },
      { text: "Almost always", score: 3 }
    ]
  },
  {
    id: "change_4",
    category: "change",
    type: "resilience",
    question: "When things change, I stay open to what's coming rather than dwelling on what I lost.",
    answers: [
      { text: "Almost always", score: 0 },
      { text: "Often", score: 1 },
      { text: "Sometimes", score: 2 },
      { text: "Never or rarely", score: 3 }
    ]
  },
  {
    id: "change_5",
    category: "change",
    type: "resilience",
    question: "I'm comfortable trying new things even when I'm not good at them yet.",
    answers: [
      { text: "Almost always", score: 0 },
      { text: "Often", score: 1 },
      { text: "Sometimes", score: 2 },
      { text: "Never or rarely", score: 3 }
    ]
  },

  // ---------------------------
  // HUMANITY
  // ---------------------------
  {
    id: "global_1",
    category: "humanity",
    type: "scenario",
    question: "The news has been relentless for weeks, conflict, injustice, things that feel unfixable. You notice:",
    answers: [
      { text: "You stay informed without over-consuming and don't get pulled under by it", score: 0 },
      { text: "You feel a low hum of collective sadness in the background, but it doesn't follow you into your day", score: 1 },
      { text: "You feel angry and helpless, and it starts to affect your mood and your ability to focus", score: 2 },
      { text: "You cycle between numbing out and being overwhelmed, and it starts to affect your relationships and your ability to function", score: 3 }
    ]
  },
  {
    id: "global_2",
    category: "humanity",
    type: "scenario",
    question: "You witness or learn about something that deeply violates your sense of what is right, in an institution, a community, or the world. You notice:",
    answers: [
      { text: "You feel genuinely upset without taking the pain on as your own", score: 0 },
      { text: "You feel disturbed and sit with it for a while, but find your way back to yourself without too much difficulty", score: 1 },
      { text: "A weight settles in and stays, making it harder to be fully present in your own life", score: 2 },
      { text: "You lose trust in people or institutions, and it becomes hard to feel grounded or safe in your own life", score: 3 }
    ]
  },
  {
    id: "global_3",
    category: "humanity",
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
    id: "global_4",
    category: "humanity",
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
    id: "global_5",
    category: "humanity",
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
  // UNCERTAINTY
  // ---------------------------
  {
    id: "uncertainty_1",
    category: "uncertainty",
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
    id: "uncertainty_2",
    category: "uncertainty",
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
    id: "uncertainty_3",
    category: "uncertainty",
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
    id: "uncertainty_4",
    category: "uncertainty",
    type: "vulnerability",
    question: "Uncertainty or threats send me looking for information about what could go wrong.",
    answers: [
      { text: "Never or rarely", score: 0 },
      { text: "Sometimes", score: 1 },
      { text: "Often", score: 2 },
      { text: "Almost always", score: 3 }
    ]
  },
  {
    id: "uncertainty_5",
    category: "uncertainty",
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
