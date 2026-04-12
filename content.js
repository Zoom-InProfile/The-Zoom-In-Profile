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
      { text: "You imagine being judged and struggle to access confidence", score: 2 },
      { text: "You get pulled into worst-case thinking and have trouble pulling back", score: 3 }
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
  }

];
