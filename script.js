/* ============================================================
   THE ZOOM-IN PROFILE — script.js
   Step 1: Navigation, depletion scale, quiz shell.
   No scoring logic yet. Content loaded from content.js.
============================================================ */

/* --- State ------------------------------------------------
   All quiz state lives here. Add to this object in later steps.
------------------------------------------------------------ */
const state = {
  currentIndex: 0,         // Which question we're on
  responses: [],           // Array of selected answer values per question
  depletionScore: null     // 1–10 from depletion scale; not yet used in scoring
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
}

/* ============================================================
   QUIZ INITIALIZATION
   Resets state and pre-fills the responses array based on
   however many questions content.js provides (or placeholder
   if content.js is empty).
============================================================ */
function initQuiz() {
  state.currentIndex = 0;

  // Use questions from content.js if available, otherwise fall back to placeholder
  const questionCount = (typeof questions !== 'undefined' && questions.length > 0)
    ? questions.length
    : 1;

  // Fill responses array with null (no answer chosen yet)
  state.responses = new Array(questionCount).fill(null);

  renderQuestion();
}

/* ============================================================
   RENDER QUESTION
   Displays the current question and answer options.
   Highlights any previously selected answer.
============================================================ */
function renderQuestion() {
  const index = state.currentIndex;
  const total = state.responses.length;

  // --- Determine question data ---
  // If real questions exist in content.js, use them.
  // Otherwise show a placeholder so the UI is demonstrable.
  let currentQuestion;

  if (typeof questions !== 'undefined' && questions.length > 0) {
    currentQuestion = questions[index];
  } else {
    currentQuestion = {
      category: 'Placeholder Category',
      text: 'This is a placeholder question. Real questions will be loaded from content.js in a later step.',
      options: [
        { value: 0, label: 'This almost never happens for me.' },
        { value: 1, label: 'This occasionally happens for me.' },
        { value: 2, label: 'This fairly often happens for me.' },
        { value: 3, label: 'This almost always happens for me.' }
      ]
    };
  }

  // --- Update text ---
  questionCategory.textContent = currentQuestion.category || '';
  questionText.textContent     = currentQuestion.text;

  // --- Update progress bar ---
  const percent = ((index + 1) / total) * 100;
  progressFill.style.width = percent + '%';
  progressLabel.textContent = 'Question ' + (index + 1) + ' of ' + total;

  // --- Rebuild answer buttons ---
  answerGrid.innerHTML = '';
  currentQuestion.options.forEach(function (option) {
    const btn = document.createElement('button');
    btn.textContent = option.label;
    btn.classList.add('answer-btn');
    btn.setAttribute('data-value', option.value);

    // Highlight if this answer was previously selected
    if (state.responses[index] === option.value) {
      btn.classList.add('selected');
    }

    btn.addEventListener('click', function () {
      selectAnswer(option.value);
    });

    answerGrid.appendChild(btn);
  });

  // --- Update navigation buttons ---
  backBtn.disabled = (index === 0);
  updateNextBtn();
}

/* ============================================================
   SELECT ANSWER
   Records the chosen value and highlights the button.
============================================================ */
function selectAnswer(value) {
  const index = state.currentIndex;

  // Save response
  state.responses[index] = value;

  // Update button visual states
  document.querySelectorAll('.answer-btn').forEach(function (btn) {
    btn.classList.remove('selected');
    if (parseInt(btn.getAttribute('data-value')) === value) {
      btn.classList.add('selected');
    }
  });

  // Allow moving forward once an answer is chosen
  updateNextBtn();
}

/* ============================================================
   NEXT / BACK NAVIGATION
============================================================ */
function updateNextBtn() {
  const index = state.currentIndex;
  const hasAnswer = state.responses[index] !== null;

  nextBtn.disabled = !hasAnswer;

  // On the final question, update the button label
  const isLast = (index === state.responses.length - 1);
  nextBtn.textContent = isLast ? 'See My Results' : 'Next';
}

nextBtn.addEventListener('click', function () {
  const index = state.currentIndex;
  const isLast = (index === state.responses.length - 1);

  if (isLast) {
    // Scoring and results will be added in a later step
    console.log('Quiz complete. Responses:', state.responses);
    console.log('Depletion score:', state.depletionScore);
    // TODO: Show results page in Step 3
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
   Hides the landing page and shows the quiz shell.
============================================================ */
startBtn.addEventListener('click', function () {
  landingPage.classList.add('hidden');
  quizPage.classList.remove('hidden');
  initQuiz();
});

/* ============================================================
   ON LOAD
   Build the depletion scale when the page is ready.
============================================================ */
document.addEventListener('DOMContentLoaded', function () {
  buildDepletionScale();
});
