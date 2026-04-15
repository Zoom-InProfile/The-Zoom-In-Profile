/* ============================================================
   THE ZOOM-IN PROFILE — script.js
   Steps 1-3: Navigation, depletion scale, quiz, scoring, results.
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
   SHUFFLE
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
    state.orderedQuestions = [{
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
    }];
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
    somatic: 'Somatically Sensitive',
    appraisal: 'Self-Relationship',
    approval: 'Approval',
    connection: 'Connection',
    influence: 'Influence',
    capacity: 'Capacity',
    change: 'Change',
    humanity: 'Humanity',
    uncertainty: 'Uncertainty',
    placeholder: 'Category'
  };
  const categoryDisplay = categoryLabels[currentQuestion.category] || currentQuestion.category;
  questionCategory.textContent = categoryDisplay;
  questionText.textContent = (currentQuestion.type === 'scenario' ? 'Imagine: ' : '') + (currentQuestion.question || '');
  const percent = ((index + 1) / total) * 100;
  progressFill.style.width = percent + '%';
  progressLabel.textContent = 'Question ' + (index + 1) + ' of ' + total;
  answerGrid.innerHTML = '';
  /* Shuffle answers so score-0 is not always first */
  var shuffledAnswers = currentQuestion.answers.slice();
  if (currentQuestion.type === 'scenario') {
    for (var i = shuffledAnswers.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = shuffledAnswers[i];
      shuffledAnswers[i] = shuffledAnswers[j];
      shuffledAnswers[j] = temp;
    }
  }
  shuffledAnswers.forEach(function (option) {
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
   SCORING ENGINE
============================================================ */

/* Category metadata */
const categoryMeta = {
  somatic: {
    label: 'Somatic',
    fullLabel: 'Somatical-Sensitive',
    tiedName: 'Somatic',
    validationLine: 'Your body has been paying attention for a reason.',
    tiedBody: 'When Somatic is one of your primary patterns, physical sensation becomes the loudest signal in the room — and that same attunement is what makes you unusually aware of what your body needs before others even notice something is off.',
    mirror: 'mirror: 'Your primary stress pattern is Somatic-Sensitive. When this is your primary pattern, your nervous system has a finely tuned awareness of your body, and that attunement is genuinely valuable. Under stress that same awareness can shift from responsive to vigilant, scanning for threat rather than simply listening and responding. This is an intelligent response to real experience rather than a weakness, and the Zoom-Out work for this pattern is about learning to hear your body as a messenger rather than a threat detector.'
  },
  appraisal: {
  label: 'Appraisal',
  fullLabel: 'Appraisal-Sensitive',
  tiedName: 'Appraisal',
  validationLine: 'You can hold yourself to a high standard and still be on your own side.',
  tiedBody: 'When Appraisal is one of your primary patterns, a mistake or a moment of falling short can begin to be inappropriately labeled as evidence of something larger about who you are — and that same evaluative mind is what drives the self-awareness and high standards that make you unusually thoughtful about your own behavior and impact.',
  mirror: '...' // the full mirror text we wrote above
},
    mirror: 'mirror: 'Your primary stress pattern is Appraisal-Sensitive. People in the Appraisal category have a highly active evaluative mind, one that processes experiences quickly, notices what went wrong, and holds itself to a standard. That capacity tends to drive real self-awareness and a genuine desire to do better, and it often makes people in this category unusually thoughtful about their own behavior and impact. Under stress that same evaluative process can turn harsh. A mistake or a moment of falling short may not just register as an event, it can begin to be inappropriately labeled as evidence of something larger about who you are. And the internal voice that delivers that verdict can be critical and difficult to argue with from the inside, because the same mind doing the evaluating is also the one being evaluated. What makes this pattern particularly common among high-functioning people is that the critic and the conscience are running on the same engine. That\'s part of why simply being told to be kinder to yourself often doesn\'t land. The self-criticism and the self-awareness aren\'t separate things, they\'re two expressions of the same capacity, and that capacity is also genuinely a strength. The Zoom-Out work for this pattern is about learning to notice when the appraisal has shifted from accurate to harsh, and finding your way back to a clearer and kinder read of what actually happened. Many people in this pattern believe the inner critic is what keeps them sharp, or that they deserve its judgment. Both are worth examining, because the evaluative mind doesn\'t need to be punishing to be effective. You can hold yourself to a high standard and still be on your own side. That combination is not only possible, it tends to work considerably better.'
  },
  approval: {
    label: 'Approval',
    fullLabel: 'Approval-Sensitive',
    tiedName: 'Approval',
    validationLine: 'Reading a room the way you do is a rare and undervalued skill.',
    tiedBody: "When Approval is one of your primary patterns, how others see you carries more weight than you'd like — and that same attunement is what makes you perceptive, socially intelligent, and skilled at reading a room.",
    mirror: "Your highest score is in Approval. When this is your primary pattern, how others see you carries more weight than you'd like — and that same attunement is what makes you perceptive, socially intelligent, and skilled at reading a room. Reading a room the way you do is a rare and undervalued skill. This may be how your nervous system is wired, or it may reflect where you are right now. Your interpretation will show you how this pattern operates across different categories in your life and how to use it to your advantage."
  },
  connection: {
    label: 'Connection',
    fullLabel: 'Connection-Sensitive',
    tiedName: 'Connection',
    validationLine: 'That is not a small thing.',
    tiedBody: 'When Connection is one of your primary patterns, perceived distance in a relationship can feel like disconnection even when the evidence does not support it — and that same sensitivity is what makes you one of the most attuned and relationally present people in any room.',
    mirror: 'Your highest score is in Connection. When this is your primary pattern, perceived distance in a relationship can feel like disconnection even when the evidence does not support it — and that same sensitivity is what makes you one of the most attuned and relationally present people in any room. That is not a small thing. This may be how your nervous system is wired, or it may reflect where you are right now. Your interpretation will show you how this pattern operates across different categories in your life and how to use it to your advantage.'
  },
  influence: {
    label: 'Influence',
    fullLabel: 'Influence-Sensitive',
    tiedName: 'Influence',
    validationLine: 'Seeing what needs to happen is a form of intelligence, not a burden to carry alone.',
    tiedBody: 'When Influence is one of your primary patterns, the gap between what you can see clearly and what you can actually make happen becomes its own source of suffering — and that same clarity is what makes you someone who spots what others miss and shows up with genuine commitment to the people you care about.',
    mirror: 'Your highest score is in Influence. When this is your primary pattern, the gap between what you can see clearly and what you can actually make happen becomes its own source of suffering — and that same clarity is what makes you someone who spots what others miss and shows up with genuine commitment to the people you care about. Seeing what needs to happen is a form of intelligence, not a burden to carry alone. This may be how your nervous system is wired, or it may reflect where you are right now. Your interpretation will show you how this pattern operates across different categories in your life and how to use it to your advantage.'
  },
  capacity: {
    label: 'Capacity',
    fullLabel: 'Capacity-Sensitive',
    tiedName: 'Capacity',
    validationLine: 'Knowing your limits is wisdom, not weakness.',
    tiedBody: 'When Capacity is one of your primary patterns, demand starts to feel like threat — and that same sensitivity is what keeps you honest about your limits and protective of what actually matters to you.',
    mirror: 'Your highest score is in Capacity. When this is your primary pattern, demand starts to feel like threat — and that same sensitivity is what keeps you honest about your limits and protective of what actually matters to you. Knowing your limits is wisdom, not weakness. This may be how your nervous system is wired, or it may reflect where you are right now. Your interpretation will show you how this pattern operates across different categories in your life and how to use it to your advantage.'
  },
  change: {
    label: 'Change',
    fullLabel: 'Change-Sensitive',
    tiedName: 'Change',
    validationLine: 'Staying connected to what matters during transition is harder than it looks.',
    tiedBody: 'When Change is one of your primary patterns, transition — even wanted transition — can feel disorienting before it feels freeing — and that same sensitivity is what keeps you deeply connected to meaning, continuity, and the things that matter most to you.',
    mirror: 'Your highest score is in Change. When this is your primary pattern, transition — even wanted transition — can feel disorienting before it feels freeing — and that same sensitivity is what keeps you deeply connected to meaning, continuity, and the things that matter most to you. Staying connected to what matters during transition is harder than it looks. This may be how your nervous system is wired, or it may reflect where you are right now. Your interpretation will show you how this pattern operates across different categories in your life and how to use it to your advantage.'
  },
  humanity: {
    label: 'Humanity',
    fullLabel: 'Globally Sensitive',
    tiedName: 'Globally Sensitive',
    validationLine: 'Feeling the weight of the world means you are paying attention to what is real.',
    tiedBody: 'When Globally Sensitive is one of your primary patterns, the weight of what is happening in the world lands personally — and that same permeability is what makes you someone who genuinely feels the stakes and shows up with real care for people and for what is right.',
    mirror: 'Your highest score is in the Humanity area. When this is your primary pattern, the weight of what is happening in the world lands personally — and that same permeability is what makes you someone who genuinely feels the stakes and shows up with real care for people and for what is right. Feeling the weight of the world means you are paying attention to what is real. This may be how your nervous system is wired, or it may reflect where you are right now. Your interpretation will show you how this pattern operates across different categories in your life and how to use it to your advantage.'
  },
  uncertainty: {
    label: 'Uncertainty',
    fullLabel: 'Uncertainty-Sensitive',
    tiedName: 'Uncertainty',
    validationLine: 'A mind that prepares for what others miss is a mind worth understanding.',
    tiedBody: 'When Uncertainty is one of your primary patterns, not-knowing feels genuinely uncomfortable and your mind moves quickly to fill that gap — and that same sensitivity is what makes you a careful thinker who anticipates what others miss.',
    mirror: 'Your highest score is in Uncertainty. When this is your primary pattern, not-knowing feels genuinely uncomfortable and your mind moves quickly to fill that gap — and that same sensitivity is what makes you a careful thinker who anticipates what others miss. A mind that prepares for what others miss is a mind worth understanding. This may be how your nervous system is wired, or it may reflect where you are right now. Your interpretation will show you how this pattern operates across different categories in your life and how to use it to your advantage.'
  }
};

/* Tier */
function getTier(score) {
  if (score <= 5)  return { name: 'Resilient Area',       key: 'resilient' };
  if (score <= 8)  return { name: 'Mild Sensitivity',     key: 'mild' };
  if (score <= 10) return { name: 'Moderate Sensitivity', key: 'moderate' };
  return               { name: 'Active Stress Zone',      key: 'active' };
}

/* Depletion note */
function depletionNote(score) {
  if (score <= 3) {
    return 'Your depletion level today is low (' + score + '/10). Your scores are likely a reliable reflection of your baseline stress patterns.';
  } else if (score <= 6) {
    return 'Your depletion level today is moderate (' + score + '/10). Some scores may be slightly elevated compared to a more rested baseline, and that is worth keeping in mind as you read your results.';
  } else {
    return 'Your depletion level today is high (' + score + '/10). When your system is running low on resources, stress patterns tend to feel more intense. Your scores today may reflect that added strain rather than your baseline pattern alone.';
  }
}

/* Calculate scores */
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

  const sorted = Object.keys(totals).map(function (cat) {
    const score = totals[cat];
    const tier  = getTier(score);
    const meta  = categoryMeta[cat] || { label: cat, fullLabel: cat };
    return { category: cat, score: score, tier: tier, label: meta.label, fullLabel: meta.fullLabel };
  }).sort(function (a, b) { return b.score - a.score; });

  const highScore = sorted[0].score;
  const primaries = sorted.filter(function (c) { return c.score === highScore; });
  const byScoreAsc = sorted.slice().sort(function (a, b) { return a.score - b.score; });
  const resilience = byScoreAsc.slice(0, 3);

  /* Results title */
  if (primaries.length === 1) {
    document.getElementById('results-title').textContent =
      'Your Primary Stress Type: ' + primaries[0].fullLabel;
  } else {
    const names = primaries.map(function (p) { return p.fullLabel; }).join(' and ');
    document.getElementById('results-title').textContent =
      'Your Primary Stress Types: ' + names;
  }

  /* Depletion context */
  const depEl = document.getElementById('depletion-context');
  depEl.textContent = depletionNote(state.depletionScore);
  if (state.depletionScore >= 7) depEl.classList.add('high-depletion');

  /* Primary block */
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

  /* Resilience block */
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

  /* Bar graph */
  const graph = document.getElementById('bar-graph');
  graph.innerHTML = '';
  const maxScore = 15;

  sorted.forEach(function (item) {
    const row = document.createElement('div');
    row.classList.add('bar-row');

    const labelWrap = document.createElement('div');
    labelWrap.classList.add('bar-label-wrap');

    const label = document.createElement('span');
    label.classList.add('bar-label');
    label.textContent = item.label;
    labelWrap.appendChild(label);

    const isPrimary = primaries.some(function (p) { return p.category === item.category; });
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

    setTimeout(function () {
      fill.style.width = ((item.score / maxScore) * 100) + '%';
    }, 80);
  });

  /* Mirror paragraph */
  const mirrorEl = document.getElementById('mirror-paragraph');
  if (mirrorEl) {
    if (primaries.length === 1) {
      const meta = categoryMeta[primaries[0].category];
      mirrorEl.textContent = meta && meta.mirror ? meta.mirror : '';
    } else {
      /* Tied primaries: separate paragraph per category, then shared closing */
      const names = primaries.map(function (p) { return p.fullLabel; }).join(' and ');
      let parts = ['Your highest scores are tied across ' + names + '.'];
      primaries.forEach(function (p) {
        const m = categoryMeta[p.category];
        if (m && m.tiedBody && m.validationLine) {
          parts.push(m.tiedBody + ' ' + m.validationLine);
        }
      });
      parts.push('These patterns do not operate in isolation. When both are active, they tend to shape and amplify each other in ways that can feel hard to untangle — and that is exactly what your interpretation is designed to help you see. Your interpretation will show you how these patterns operate across different categories in your life and how to use them to your advantage.');
      mirrorEl.textContent = parts.join(' ');
    }
  }
}

/* ============================================================
   ON LOAD
============================================================ */
document.addEventListener('DOMContentLoaded', function () {
  buildDepletionScale();

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

  backBtn.addEventListener('click', function () {
    if (state.currentIndex > 0) {
      state.currentIndex--;
      renderQuestion();
    }
  });

  startBtn.addEventListener('click', function () {
    landingPage.classList.add('hidden');
    quizPage.classList.remove('hidden');
    initQuiz();
  });

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
      document.getElementById('mirror-paragraph').textContent = '';
      startBtn.disabled = true;
      startNote.style.display = '';
      document.getElementById('results-page').classList.add('hidden');
      quizPage.classList.add('hidden');
      landingPage.classList.remove('hidden');
      window.scrollTo(0, 0);
    });
  }

  const stripeBtn = document.getElementById('stripe-btn');
  if (stripeBtn) {
    stripeBtn.addEventListener('click', function () {
      window.open('https://buy.stripe.com/bJe7sMaLH3yg0fs9Po9ws00', '_blank');
    });
  }

  const coupleBtn = document.getElementById('couple-btn');
  if (coupleBtn) {
    coupleBtn.addEventListener('click', function () {
      window.open('https://buy.stripe.com/aFaeVe1b7d8Qd2e8Lk9ws01', '_blank');
    });
  }
});
