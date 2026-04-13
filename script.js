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
    sensitivityPhrase: 'physical sensation becomes the loudest signal in the room',
    strengthPhrase: 'that same attunement makes you unusually aware of what your body needs before others even notice something is off',
    mirror: 'Your highest score is in the Somatic area. When this is your primary pattern, physical sensation becomes the loudest signal in the room — and that same attunement is what makes you unusually aware of what your body needs before others even notice something is off. That is not a small thing. This may be how your nervous system is wired, or it may reflect where you are right now. Your interpretation will show you how this pattern operates across different categories in your life and how to use it to your advantage.'
  },
  self: {
    label: 'Self',
    fullLabel: 'Self-Judgment Sensitive',
    sensitivityPhrase: 'a single mistake can feel like evidence of something larger',
    strengthPhrase: 'that same inner voice is what drives the high standards and self-awareness that make you good at what you do',
    mirror: 'Your highest score is in Self-Judgment. When this is your primary pattern, a single mistake can feel like evidence of something larger — and that same inner voice is what drives the high standards and self-awareness that make you good at what you do. That is not a small thing. This may be a long-standing pattern, or it may reflect where you are right now. Your interpretation will show you how this pattern operates across different categories in your life and how to use it to your advantage.'
  },
  approval: {
    label: 'Approval',
    fullLabel: 'Approval-Sensitive',
    sensitivityPhrase: 'how others see you carries more weight than you would like',
    strengthPhrase: 'that same attunement makes you perceptive, socially intelligent, and skilled at reading a room',
    mirror: "Your highest score is in Approval. When this is your primary pattern, how others see you carries more weight than you'd like — and that same attunement is what makes you perceptive, socially intelligent, and skilled at reading a room. That is not a small thing. This may be how your nervous system is wired, or it may reflect where you are right now. Your interpretation will show you how this pattern operates across different categories in your life and how to use it to your advantage."
  },
  connection: {
    label: 'Connection',
    fullLabel: 'Connection-Sensitive',
    sensitivityPhrase: 'perceived distance in a relationship can feel like disconnection even when the evidence does not support it',
    strengthPhrase: 'that same sensitivity makes you one of the most attuned and relationally present people in any room',
    mirror: 'Your highest score is in Connection. When this is your primary pattern, perceived distance in a relationship can feel like disconnection even when the evidence does not support it — and that same sensitivity is what makes you one of the most attuned and relationally present people in any room. That is not a small thing. This may be how your nervous system is wired, or it may reflect where you are right now. Your interpretation will show you how this pattern operates across different categories in your life and how to use it to your advantage.'
  },
  attachment: {
    label: 'Attachment',
    fullLabel: 'Attachment-Sensitive',
    sensitivityPhrase: 'the people you love feel like they are partly inside you and their pain lands as your own',
    strengthPhrase: 'that same depth of care makes you an extraordinary source of support for the people in your life',
    mirror: 'Your highest score is in Attachment. When this is your primary pattern, the people you love feel like they are partly inside you — their pain lands as your own, and that same depth of care is what makes you an extraordinary source of support for the people in your life. That is not a small thing. This may be how your nervous system is wired, or it may reflect where you are right now. Your interpretation will show you how this pattern operates across different categories in your life and how to use it to your advantage.'
  },
  capacity: {
    label: 'Capacity',
    fullLabel: 'Capacity-Sensitive',
    sensitivityPhrase: 'demand starts to feel like threat and everything can feel urgent at once',
    strengthPhrase: 'that same sensitivity keeps you honest about your limits and protective of what actually matters to you',
    mirror: 'Your highest score is in Capacity. When this is your primary pattern, demand starts to feel like threat — and that same sensitivity is what keeps you honest about your limits and protective of what actually matters to you. That is not a small thing. This may be how your nervous system is wired, or it may reflect where you are right now. Your interpretation will show you how this pattern operates across different categories in your life and how to use it to your advantage.'
  },
  change: {
    label: 'Change',
    fullLabel: 'Change-Sensitive',
    sensitivityPhrase: 'transition can feel disorienting before it feels freeing',
    strengthPhrase: 'that same sensitivity keeps you deeply connected to meaning, continuity, and the things that matter most to you',
    mirror: 'Your highest score is in Change. When this is your primary pattern, transition — even wanted transition — can feel disorienting before it feels freeing — and that same sensitivity is what keeps you deeply connected to meaning, continuity, and the things that matter most to you. That is not a small thing. This may be how your nervous system is wired, or it may reflect where you are right now. Your interpretation will show you how this pattern operates across different categories in your life and how to use it to your advantage.'
  },
  humanity: {
    label: 'Humanity',
    fullLabel: 'Globally Sensitive',
    sensitivityPhrase: 'the weight of what is happening in the world lands personally',
    strengthPhrase: 'that same permeability makes you someone who genuinely feels the stakes and shows up with real care for people and for what is right',
    mirror: 'Your highest score is in the Humanity area. When this is your primary pattern, the weight of what is happening in the world lands personally — and that same permeability is what makes you someone who genuinely feels the stakes and shows up with real care for people and for what is right. That is not a small thing. This may be how your nervous system is wired, or it may reflect where you are right now. Your interpretation will show you how this pattern operates across different categories in your life and how to use it to your advantage.'
  },
  uncertainty: {
    label: 'Uncertainty',
    fullLabel: 'Uncertainty-Sensitive',
    sensitivityPhrase: 'not-knowing feels genuinely uncomfortable and your mind moves quickly to fill that gap',
    strengthPhrase: 'that same sensitivity makes you a careful thinker who anticipates what others miss',
    mirror: 'Your highest score is in Uncertainty. When this is your primary pattern, not-knowing feels genuinely uncomfortable and your mind moves quickly to fill that gap — and that same sensitivity is what makes you a careful thinker who anticipates what others miss. That is not a small thing. This may be how your nervous system is wired, or it may reflect where you are right now. Your interpretation will show you how this pattern operates across different categories in your life and how to use it to your advantage.'
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
      'Your Primary Stress Type: ' + primaries[0].fullLabel;
  } else {
    const names = primaries.map(function (p) { return p.fullLabel; }).join(' and ');
    document.getElementById('results-title').textContent =
      'Your Primary Stress Types: ' + names;
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
    const meta = categoryMeta[r.category];
    tag.textContent = meta ? meta.label : r.label;
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

    /* Mark all tied primaries */
    const isPrimary = primaries.some(function(p) { return p.category === item.category; });
    if (isPrimary) {
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
    if (primaries.length === 1 && meta && meta.mirror) {
      mirrorText = meta.mirror;
    } else {
      const names = primaries.map(function (p) { return p.fullLabel; }).join(' and ');
      const sensitivityParts = primaries.map(function (p) {
        const m = categoryMeta[p.category];
        return m ? m.sensitivityPhrase : p.fullLabel;
      });
      const strengthParts = primaries.map(function (p) {
        const m = categoryMeta[p.category];
        return m ? m.strengthPhrase : '';
      }).filter(Boolean);
      const sensitivityText = sensitivityParts.join(', and ');
      const strengthText = strengthParts.join(', and ');
      mirrorText = 'Your highest scores are tied across ' + names + '. When both are active, ' + sensitivityText + ' can land at the same time — and that combination can make it hard to find solid ground when both are pulling at once. ' + strengthText.charAt(0).toUpperCase() + strengthText.slice(1) + '. That is not a small thing. This may be how you are wired, or it may reflect where you are right now. Your interpretation will show you how these patterns operate across different categories in your life and how to use them to your advantage.';
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
