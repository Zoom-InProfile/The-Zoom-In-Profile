/* ============================================================
   THE ZOOM-IN PROFILE — script.js
   Steps 1–3: Navigation, depletion scale, quiz, scoring, results.
   Content loaded from content.js.
============================================================ */

/* --- State ------------------------------------------------ */
const state = {
  currentIndex: 0,
  responses: [],
  depletionScore: null,
  orderedQuestions: []
};

/* --- DOM References --------------------------------------- */
const landingPage      = document.getElementById('landing-page');
const quizPage         = document.getElementById('quiz-page');
const startBtn         = document.getElementById('start-btn');
const startNote        = document.getElementById('start-note');
const depletionScale   = document.getElementById('depletion-scale');
const progressFill     = document.getElementById('progress-bar-fill');
const progressLabel    = document.getElementById('progress-label');
const questionCategory = document.getElementById('question-category');
const questionText     = document.getElementById('question-text');
const answerGrid       = document.getElementById('answer-grid');
const backBtn          = document.getElementById('back-btn');
const nextBtn          = document.getElementById('next-btn');

/* ============================================================
   DEPLETION SCALE
============================================================ */
function buildDepletionScale() {
  for (let i = 1; i <= 10; i++) {
    const btn = document.createElement('button');
    btn.textContent = i;
    btn.classList.add('depletion-btn');
    btn.setAttribute('aria-label', 'Depletion level ' + i);

    btn.addEventListener('click', function () {
      document.querySelectorAll('.depletion-btn').forEach(function (b) {
        b.classList.remove('selected');
      });
      btn.classList.add('selected');
      state.depletionScore = i;
      startBtn.disabled = false;
      startNote.style.display = 'none';
    });

    depletionScale.appendChild(btn);
  }
}

/* ============================================================
   SHUFFLE — no same category back-to-back,
   no two scenarios in a row
============================================================ */
function shuffleQuestionsWithRules(questionsArray) {
  const pool = [...questionsArray];
  const ordered = [];

  while (pool.length > 0) {
    const candidates = pool.filter(function (q) {
      const last = ordered[ordered.length - 1];
      if (!last) return true;
      const sameCategory = q.category === last.category;
      const twoScenarios = q.type === 'scenario' && last.type === 'scenario';
      return !sameCategory && !twoScenarios;
    });

    const source = candidates.length > 0 ? candidates : pool;
    const nextQuestion = source[Math.floor(Math.random() * source.length)];
    ordered.push(nextQuestion);
    const indexToRemove = pool.findIndex(function (q) { return q.id === nextQuestion.id; });
    pool.splice(indexToRemove, 1);
  }

  return ordered;
}

/* ============================================================
   QUIZ INITIALIZATION
============================================================ */
function initQuiz() {
  state.currentIndex = 0;

  if (typeof questions !== 'undefined' && questions.length > 0) {
    state.orderedQuestions = shuffleQuestionsWithRules(questions);
  } else {
    state.orderedQuestions = [
      {
        id: 'placeholder_1',
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
  const currentQuestion = state.orderedQuestions[index];

  const categoryLabels = {
    somatic:     'Somatically Sensitive',
    self:        'Self-Relationship',
    approval:    'Approval',
    connection:  'Connection',
    attachment:  'Attachment',
    capacity:    'Capacity',
    change:      'Change',
    humanity:    'Humanity',
    uncertainty: 'Uncertainty',
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

/* ============================================================
   SCORING ENGINE — Step 3
============================================================ */

/* Category display metadata */
const categoryMeta = {
  somatic: {
    label: 'Somatic',
    fullLabel: 'Somatically Sensitive',
    zoomInTrap: 'Pain becomes the lens through which everything is filtered, and little else gets through.',
    resilienceNote: 'Your body is already a source of steadiness for you, and that is worth noticing.'
  },
  self: {
    label: 'Self',
    fullLabel: 'Self-Judgment Sensitive',
    zoomInTrap: 'One mistake becomes proof of a deeper flaw, and the inner critic runs the story.',
    resilienceNote: 'Your sense of your own worth is stable and hard to shake, even when things go wrong.'
  },
  approval: {
    label: 'Approval',
    fullLabel: 'Approval-Sensitive',
    zoomInTrap: "Others' opinions become the measure of your value, and the ground shifts when someone disapproves.",
    resilienceNote: "Your self-perception doesn't depend heavily on how others see you, and that is a genuine steadying resource."
  },
  connection: {
    label: 'Connection',
    fullLabel: 'Connection-Sensitive',
    zoomInTrap: 'Distance from someone you love starts to feel like being unloved, even when the evidence says otherwise.',
    resilienceNote: 'Closeness comes naturally to you, and connection is reliably available as a source of steadiness.'
  },
  attachment: {
    label: 'Attachment',
    fullLabel: 'Attachment-Sensitive',
    zoomInTrap: "A loved one's pain becomes indistinguishable from your own, and the weight of caring starts to cost you your footing.",
    resilienceNote: 'You can be fully present with someone you love without losing yourself in what they are carrying.'
  },
  capacity: {
    label: 'Capacity',
    fullLabel: 'Capacity-Sensitive',
    zoomInTrap: 'Everything feels urgent and nothing feels finishable, and the weight of feeling like you are failing everyone starts to close in.',
    resilienceNote: 'You can triage and prioritize under pressure without losing sight of what matters most.'
  },
  change: {
    label: 'Change',
    fullLabel: 'Change-Sensitive',
    zoomInTrap: 'You feel unmoored — no longer connected to who you were and not yet connected to who you are becoming.',
    resilienceNote: 'You can hold transition with curiosity rather than dread, staying connected to yourself even when the ground feels different.'
  },
  humanity: {
    label: 'Humanity',
    fullLabel: 'Globally Sensitive',
    zoomInTrap: "The world's suffering lands as your own, and the grief or rage is hard to set down.",
    resilienceNote: 'You can hold the weight of what is happening in the world without being flooded by it.'
  },
  uncertainty: {
    label: 'Uncertainty',
    fullLabel: 'Uncertainty-Sensitive',
    zoomInTrap: 'When the future is unclear, your nervous system fills the gap with the worst possible version of it.',
    resilienceNote: 'You can sit with not-knowing without catastrophizing, and that tolerance is a genuine resource.'
  }
};

/* Assign tier based on score */
function getTier(score) {
  if (score <= 5)  return { name: 'Resilient Area',       key: 'resilient' };
  if (score <= 8)  return { name: 'Mild Sensitivity',     key: 'mild' };
  if (score <= 10) return { name: 'Moderate Sensitivity', key: 'moderate' };
  return               { name: 'Active Stress Zone',      key: 'active' };
}

/* Depletion context message */
function depletionNote(score) {
  if (score <= 3) {
    return 'Your depletion level today is low (' + score + '/10). Your scores are likely a reliable reflection of your baseline stress patterns.';
  } else if (score <= 6) {
    return 'Your depletion level today is moderate (' + score + '/10). Some scores may be slightly elevated compared to a more rested baseline, and that is worth keeping in mind as you read your results.';
  } else {
    return 'Your depletion level today is high (' + score + '/10). When your nervous system is running low on resources, stress patterns tend to feel more intense. Your scores today may reflect that added strain rather than your baseline pattern alone.';
  }
}

/* Tally scores by category using the shuffled orderedQuestions */
function calculateScores() {
  const totals = {};

  state.orderedQuestions.forEach(function (q, i) {
    const cat = q.category;
    if (!(cat in totals)) totals[cat] = 0;
    const response = state.responses[i];
    if (response !== null) totals[cat] += response;
  });

  return totals;
}

/* ============================================================
   RENDER RESULTS
============================================================ */
function showResults() {
  quizPage.classList.add('hidden');
  document.getElementById('results-page').classList.remove('hidden');
  window.scrollTo(0, 0);

  const totals = calculateScores();

  /* Build sorted array high to low */
  const sorted = Object.keys(totals).map(function (cat) {
    const score = totals[cat];
    const tier  = getTier(score);
    const meta  = categoryMeta[cat] || { label: cat, fullLabel: cat };
    return { category: cat, score: score, tier: tier, label: meta.label, fullLabel: meta.fullLabel };
  }).sort(function (a, b) { return b.score - a.score; });

  /* Primary: highest score — all ties are co-Primaries */
  const highScore = sorted[0].score;
  const primaries = sorted.filter(function (c) { return c.score === highScore; });

  /* Resilience Areas: lowest 3 scores */
  const byScoreAsc = sorted.slice().sort(function (a, b) { return a.score - b.score; });
  const resilience = byScoreAsc.slice(0, 3);

  /* --- Results title --- */
  if (primaries.length === 1) {
    document.getElementById('results-title').textContent =
      'Your primary stress type: ' + primaries[0].fullLabel;
  } else {
    const names = primaries.map(function (p) { return p.fullLabel; }).join(' and ');
    document.getElementById('results-title').textContent =
      'Your primary stress types: ' + names;
  }

  /* --- Depletion context note --- */
  const depEl = document.getElementById('depletion-context');
  depEl.textContent = depletionNote(state.depletionScore);
  if (state.depletionScore >= 7) depEl.classList.add('high-depletion');

  /* --- Primary block --- */
  const primaryContent = document.getElementById('primary-content');
  primaryContent.innerHTML = '';
  const tagContainer = document.createElement('div');
  tagContainer.classList.add('primary-tags');
  primaries.forEach(function (p) {
    const tag = document.createElement('span');
    tag.classList.add('primary-tag');
    tag.textContent = p.fullLabel;
    tagContainer.appendChild(tag);
  });
  const scoreNote = document.createElement('p');
  scoreNote.classList.add('primary-score');
  scoreNote.textContent = primaries.map(function (p) {
    return p.fullLabel + ': ' + p.score + '/15 — ' + p.tier.name;
  }).join('   |   ');
  primaryContent.appendChild(tagContainer);
  primaryContent.appendChild(scoreNote);

  /* --- Resilience block --- */
  const resContent = document.getElementById('resilience-content');
  resContent.innerHTML = '';
  const resContainer = document.createElement('div');
  resContainer.classList.add('resilience-tags');
  resilience.forEach(function (r) {
    const tag = document.createElement('span');
    tag.classList.add('resilience-tag');
    tag.textContent = r.fullLabel;
    resContainer.appendChild(tag);
  });
  resContent.appendChild(resContainer);

  /* --- Bar graph --- */
  const graph = document.getElementById('bar-graph');
  graph.innerHTML = '';
  const maxScore = 15;

  sorted.forEach(function (item, idx) {
    const row = document.createElement('div');
    row.classList.add('bar-row');

    /* Label column */
    const labelWrap = document.createElement('div');
    labelWrap.classList.add('bar-label-wrap');

    const label = document.createElement('span');
    label.classList.add('bar-label');
    label.textContent = item.label;
    labelWrap.appendChild(label);

    /* Mark the top bar as Primary */
    if (idx === 0) {
      const primaryBadge = document.createElement('span');
      primaryBadge.classList.add('bar-primary-badge');
      primaryBadge.textContent = 'Primary';
      labelWrap.appendChild(primaryBadge);
    }

    const track = document.createElement('div');
    track.classList.add('bar-track');

    const fill = document.createElement('div');
    fill.classList.add('bar-fill', 'tier-' + item.tier.key);
    fill.style.width = '0%';
    track.appendChild(fill);

    const scoreEl = document.createElement('span');
    scoreEl.classList.add('bar-score');
    scoreEl.textContent = item.score;

    row.appendChild(labelWrap);
    row.appendChild(track);
    row.appendChild(scoreEl);
    graph.appendChild(row);

    /* Animate bar after paint */
    setTimeout(function () {
      fill.style.width = ((item.score / maxScore) * 100) + '%';
    }, 80);
  });

  /* --- Mirror paragraph (after bar graph, before CTA) --- */
  const mirrorEl = document.getElementById('mirror-paragraph');
  if (mirrorEl) {
    const primary = primaries[0];
    const meta = categoryMeta[primary.category];
    let mirrorText = '';
    if (meta) {
      if (primaries.length === 1) {
        mirrorText = 'Your highest score is ' + primary.fullLabel + '. When this is your primary pattern, ' + meta.zoomInTrap.charAt(0).toLowerCase() + meta.zoomInTrap.slice(1) + ' This may be how your nervous system is wired, or it may be where you are right now. Either way, seeing it clearly is the first step to working with it instead of being pulled by it.';
      } else {
        const names = primaries.map(function(p) { return p.fullLabel; }).join(' and ');
        mirrorText = 'Your highest scores are tied across ' + names + '. These are the areas where your nervous system is working hardest right now. This may be how you are wired, or it may reflect where you are in this season. Either way, seeing it clearly is the first step to working with it instead of being pulled by it.';
      }
    }
    mirrorEl.textContent = mirrorText;
  }
}

/* ============================================================
   ON LOAD
============================================================ */
document.addEventListener('DOMContentLoaded', function () {
  buildDepletionScale();

  /* Next button */
  nextBtn.addEventListener('click', function () {
    const index = state.currentIndex;
    const isLast = (index === state.responses.length - 1);
    if (isLast) {
      showResults();
    } else {
      state.currentIndex++;
      renderQuestion();
    }
  });

  /* Back button */
  backBtn.addEventListener('click', function () {
    if (state.currentIndex > 0) {
      state.currentIndex--;
      renderQuestion();
    }
  });

  /* Start button */
  startBtn.addEventListener('click', function () {
    landingPage.classList.add('hidden');
    quizPage.classList.remove('hidden');
    initQuiz();
  });

  /* Retake button */
  const retakeBtn = document.getElementById('retake-btn');
  if (retakeBtn) {
    retakeBtn.addEventListener('click', function () {
      state.currentIndex = 0;
      state.responses = [];
      state.depletionScore = null;
      state.orderedQuestions = [];

      document.querySelectorAll('.depletion-btn').forEach(function (b) {
        b.classList.remove('selected');
      });

      document.getElementById('primary-content').innerHTML = '';
      document.getElementById('resilience-content').innerHTML = '';
      document.getElementById('bar-graph').innerHTML = '';
      const depEl = document.getElementById('depletion-context');
      depEl.textContent = '';
      depEl.classList.remove('high-depletion');
      document.getElementById('results-title').textContent = 'Your Results';

      startBtn.disabled = true;
      startNote.style.display = '';

      document.getElementById('results-page').classList.add('hidden');
      quizPage.classList.add('hidden');
      landingPage.classList.remove('hidden');
      window.scrollTo(0, 0);
    });
  }

  /* Stripe placeholder */
  const stripeBtn = document.getElementById('stripe-btn');
  if (stripeBtn) {
    stripeBtn.addEventListener('click', function () {
      alert('Payment coming soon. Please email robin@happierhour.com with a screenshot of your results to get started.');
    });
  }
});
