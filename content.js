/* ============================================================
   THE ZOOM-IN PROFILE — content.js
   Step 1: Placeholder. Real questions will be added in Step 2.

   FORMAT (for Step 2):
   Each question object should follow this structure:

   {
     category: 'Category Name',        // e.g. 'Physical', 'Connection'
     text: 'The scenario text here.',  // The question prompt
     options: [
       { value: 0, label: 'This almost never happens for me.' },
       { value: 1, label: 'This occasionally happens for me.' },
       { value: 2, label: 'This fairly often happens for me.' },
       { value: 3, label: 'This almost always happens for me.' }
     ]
   }

   The `questions` array below will be read by script.js.
   Leave it empty for Step 1 — the quiz shell will use a
   built-in placeholder question so the UI is fully demonstrable.
============================================================ */

const questions = [
  // 1. SOMATICALLY-SENSITIVE CATEGORY
  {
    id: "somatic_1",
    category: "somatic",
    type: "scenario",
    question: "You are managing ongoing physical discomfort that isn't going away anytime soon. On a day when the discomfort is noticeable and the demands on you don't let up, you notice:",
    answers: [
      { text: "You acknowledge the discomfort, adjust your expectations, and move through the day without it taking over", score: 0 },
      { text: "You feel the strain and are less patient or present, but you stay engaged", score: 1 },
      { text: "The discomfort starts to shape your mood, attention, and interactions throughout the day", score: 2 },
      { text: "The discomfort takes over, and you withdraw, cancel, or feel defeated by it", score: 3 }
    ]
  },
  {
    id: "somatic_2",
    category: "somatic",
    type: "scenario",
    question: "Under stress, your body starts signaling tension, fatigue, or other physical symptoms. You notice:",
    answers: [
      { text: "You recognize the signals early and respond in ways that help regulate your system", score: 0 },
      { text: "You feel the physical tension but continue functioning and address it when you can", score: 1 },
      { text: "The physical symptoms amplify the stress, and it becomes harder to settle your system", score: 2 },
      { text: "Your body feels like it is working against you, and the symptoms make everything harder to manage", score: 3 }
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
  }
];
