/* ============================================================
   THE ZOOM-IN PROFILE — script.js
   Step 1: Navigation, depletion scale, quiz shell.
   No scoring logic yet. Content loaded from content.js.
============================================================ */

/* --- State ------------------------------------------------
   All quiz state lives here. Add to this object in later steps.
------------------------------------------------------------ */
const state = {
  currentIndex: 0,
  responses: [],
  depletionScore: null,
  orderedQuestions: []
};

/* --- DOM References --------------------------------------- */
const landingPage   = document.getElementById('landing-page');
const quizPage      = document.getElementById('quiz-page');
const startBtn      = document.getElementById('start-btn');
const startNote     = document.getElementById('start-note');
const depletionScale = document.getElementById('depletion-scale');
const progressFill  = document.getElementById('progress-bar-fill');
const progressLabel = document.getElementById('progress-label');
const questionCategory = document.getElementById('question-category');
const questionText  = document.getElementById('question-text');
const answerGrid    = document.getElementById('answer-grid');
const backBtn       = document.getElementById('back-btn');
const nextBtn       = document.getElementById('next-btn');

/* ============================================================
   DEPLETION SCALE
   Renders 10 numbered buttons and saves the chosen value
   to state.depletionScore. Enables the Start button once set.
============================================================ */
function buildDepletionScale() {
  for (let i = 1; i <= 10; i++) {
    const btn = document.createElement('button');
    btn.textContent = i;
    btn.classList.add('depletion-btn');
    btn.setAttribute('aria-label', 'Depletion level ' + i);

    btn.addEventListener('click', function () {
      // Clear previous selection
      document.querySelectorAll('.depletion-btn').forEach(function (b) {
        b.classList.remove('selected');
      });

      // Mark this button selected
      btn.classList.add('selected');

      // Save to state
      state.depletionScore = i;

      // Enable Start button and hide the helper note
      startBtn.disabled = false;
      startNote.style.display = 'none';
    });

    depletionScale.appendChild(btn);
  }
} function shuffleQuestionsWithRules(questionsArray) {
  const pool = [...questionsArray];
  const ordered = [];

  while (pool.length > 0) {
    const candidates = pool.filter((q) => {
      const last = ordered[ordered.length - 1];

      if (!last) return true;

      const sameCategory = q.category === last.category;
      const twoScenarios = q.type === 'scenario' && last.type === 'scenario';

      return !sameCategory && !twoScenarios;
    });

    const source = candidates.length > 0 ? candidates : pool;
    const nextQuestion = source[Math.floor(Math.random() * source.length)];

    ordered.push(nextQuestion);

    const indexToRemove = pool.findIndex((q) => q.id === nextQuestion.id);
    pool.splice(indexToRemove, 1);
  }

  return ordered;
}
/* ============================================================
   QUIZ INITIALIZATION
   Resets state and pre-fills the responses array based on
   however many questions content.js provides (or placeholder
   if content.js is empty).
============================================================ */
function initQuiz() {
  state.currentIndex = 0;

  if (typeof questions !== 'undefined' && questions.length > 0) {
    state.orderedQuestions = shuffleQuestionsWithRules(questions);
  } else {
    state.orderedQuestions = [
      {
        category: 'placeholder',
        type: 'scenario',
        question: 'This is a placeholder question.',
        answers: [
          { text: 'This almost never happens for me.', score: 0 },
          { text: 'This occasionally happens for me.', score: 1 },
          { text: 'This fairly often happens for me.', score: 2 },
          { text: 'This almost always happens for me.', score: 3 }
        ]
      }
    ];
  }

  state.responses = new Array(state.orderedQuestions.length).fill(null);

  renderQuestion();   
}
/* ============================================================
   RENDER QUESTION
============================================================ */
function renderQuestion() {
  const index = state.currentIndex;
  const total = state.responses.length;

  let currentQuestion = state.orderedQuestions[index];

  const categoryLabels = {
    somatic: 'Somatically Sensitive',
    self: 'Self-Relationship',
    approval: 'Approval',
    placeholder: 'Category'
  };

  const categoryDisplay = categoryLabels[currentQuestion.category] || currentQuestion.category;
  questionCategory.textContent = categoryDisplay;

  questionText.textContent = currentQuestion.question || '';

  const percent = ((index + 1) / total) * 100;
  progressFill.style.width = percent + '%';
  progressLabel.textContent = 'Question ' + (index + 1) + ' of ' + total;

  answerGrid.innerHTML = '';

  currentQuestion.answers.forEach(function (option) {
    const btn = document.createElement('button');
    btn.textContent = option.text;
    btn.classList.add('answer-btn');
    btn.setAttribute('data-value', option.score);

    if (state.responses[index] === option.score) {
      btn.classList.add('selected');
    }

    btn.addEventListener('click', function () {
      selectAnswer(option.score);
    });

    answerGrid.appendChild(btn);
  });

  backBtn.disabled = (index === 0);
  updateNextBtn();
}

/* ============================================================
   SELECT ANSWER
============================================================ */
function selectAnswer(value) {
  const index = state.currentIndex;

  state.responses[index] = value;

  document.querySelectorAll('.answer-btn').forEach(function (btn) {
    btn.classList.remove('selected');
    if (parseInt(btn.getAttribute('data-value')) === value) {
      btn.classList.add('selected');
    }
  });

  updateNextBtn();
}

/* ============================================================
   NAVIGATION
============================================================ */
function updateNextBtn() {
  const index = state.currentIndex;
  const hasAnswer = state.responses[index] !== null;

  nextBtn.disabled = !hasAnswer;

  const isLast = (index === state.responses.length - 1);
  nextBtn.textContent = isLast ? 'See My Results' : 'Next';
}

nextBtn.addEventListener('click', function () {
  const index = state.currentIndex;
  const isLast = (index === state.responses.length - 1);

  if (isLast) {
    console.log('Quiz complete', state.responses);
  } else {
    state.currentIndex++;
    renderQuestion();
  }
});

backBtn.addEventListener('click', function () {
  if (state.currentIndex > 0) {
    state.currentIndex--;
    renderQuestion();
  }
});

/* ============================================================
   START BUTTON
============================================================ */
startBtn.addEventListener('click', function () {
  landingPage.classList.add('hidden');
  quizPage.classList.remove('hidden');
  initQuiz();
});

/* ============================================================
   ON LOAD
============================================================ */
document.addEventListener('DOMContentLoaded', function () {
  buildDepletionScale();
});




