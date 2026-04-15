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
  somatic: 'Somatic',
  appraisal: 'Appraisal',
  perception: 'Perception',
  connection: 'Connection',
  influence: 'Influence',
  balance: 'Balance',
  comfort: 'Comfort',
  attunement: 'Attunement',
  certainty: 'Certainty',
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
    descriptor: 'How attuned your nervous system is to physical signals, and whether your body tends to become the primary lens through which you experience stress.',
    label: 'Somatic',
    fullLabel: 'Somatic-Sensitive',
    tiedName: 'Somatic',
    validationLine: 'Your body has been paying attention for a reason.',
    tiedBody: 'When Somatic is one of your primary patterns, physical sensation becomes the loudest signal in the room — and that same attunement is what makes you unusually aware of what your body needs before others even notice something is off.',
    mirror: 'Your primary stress pattern is Somatic-Sensitive. Your nervous system has a finely tuned awareness of your body, and that attunement is genuinely valuable. Under stress that same awareness can shift from responsive to vigilant, scanning for threat rather than simply listening and responding. This is an intelligent response to real experience rather than a weakness, and the Zoom-Out work for this pattern is about learning to hear your body as a messenger rather than a threat detector.'
  },
  appraisal: {
    descriptor: 'How your inner evaluative voice responds when things go wrong, and whether it tends toward understanding or harsh judgment under pressure.',
    label: 'Appraisal',
    fullLabel: 'Appraisal-Sensitive',
    tiedName: 'Appraisal',
    validationLine: 'You can hold yourself to a high standard and still be on your own side.',
    tiedBody: 'When Appraisal is one of your primary patterns, a mistake or a moment of falling short can begin to be inappropriately labeled as evidence of something larger about who you are — and that same evaluative mind is what drives the self-awareness and high standards that make you unusually thoughtful about your own behavior and impact.',
    mirror: 'Your primary stress pattern is Appraisal-Sensitive. People in the Appraisal category have a highly active evaluative mind, one that processes experiences quickly, notices what went wrong, and holds itself to a standard. That capacity tends to drive real self-awareness and a genuine desire to do better, and it often makes people in this category unusually thoughtful about their own behavior and impact. Under stress that same evaluative process can turn harsh. A mistake or a moment of falling short may not just register as an event, it can begin to be inappropriately labeled as evidence of something larger about who you are. And the internal voice that delivers that verdict can be critical and difficult to argue with from the inside, because the same mind doing the evaluating is also the one being evaluated. What makes this pattern particularly common among high-functioning people is that the critic and the conscience are running on the same engine. That\'s part of why simply being told to be kinder to yourself often doesn\'t land. The self-criticism and the self-awareness aren\'t separate things, they\'re two expressions of the same capacity, and that capacity is also genuinely a strength. The Zoom-Out work for this pattern is about learning to notice when the appraisal has shifted from accurate to harsh, and finding your way back to a clearer and kinder read of what actually happened. Many people in this pattern believe the inner critic is what keeps them sharp, or that they deserve its judgment. Both are worth examining, because the evaluative mind doesn\'t need to be punishing to be effective. You can hold yourself to a high standard and still be on your own side. That combination is not only possible, it tends to work considerably better.'
  },
  perception: {
    descriptor: 'How sensitive you are to others\' evaluations and social signals, and whether how you are seen by others has a strong pull on your sense of stability.',
    label: 'Perception',
    fullLabel: 'Perception-Sensitive',
    tiedName: 'Perception',
    validationLine: 'Reading a room the way you do is a rare and undervalued skill.',
    tiedBody: 'When Perception is one of your primary patterns, how others see you carries more weight than you\'d like — and that same attunement is what makes you perceptive, socially intelligent, and skilled at reading a room.',
    mirror: 'Your primary stress pattern is Perception-Sensitive. People in the Perception category have a finely tuned awareness of how they are coming across to others, and that sensitivity is a genuine social intelligence. You read rooms accurately, notice shifts in tone and energy quickly, and care about how your actions land on the people around you. Under stress that same awareness can tip into hypervigilance, where the social signal becomes the loudest thing in the room and how you are being seen starts to shape how you feel about yourself. An offhand comment, a look, or a moment of perceived disapproval can shift the ground faster than the situation warrants. The Zoom-Out work for this pattern is about distinguishing between social information that is genuinely useful and social evaluation that your nervous system is amplifying beyond its actual weight.'
  },
  connection: {
    descriptor: 'How much your sense of well-being depends on feeling close and connected to the people who matter most to you, and how you respond when that connection feels insecure.',
    label: 'Connection',
    fullLabel: 'Connection-Sensitive',
    tiedName: 'Connection',
    validationLine: 'The depth at which you love is not a liability.',
    tiedBody: 'When Connection is one of your primary patterns, perceived distance in a relationship can feel like disconnection even when the evidence does not support it — and that same sensitivity is what makes you one of the most attuned and relationally present people in any room.',
    mirror: 'Your primary stress pattern is Connection-Sensitive. People in the Connection category have a deep need for felt closeness with the people who matter most to them, and that need is also a profound capacity for intimacy and presence. You notice shifts in relational warmth quickly, and when connection feels uncertain your nervous system responds as though something essential is at risk. A quiet day, a distracted conversation, or a moment of emotional distance can land harder than the situation warrants. The Zoom-Out work for this pattern is about learning to distinguish between genuine disconnection that needs attention and the natural ebb and flow of closeness that every relationship moves through.'
  },
  influence: {
    descriptor: 'How you respond when you have a felt responsibility, can see clearly what needs to happen but are not the one in control of the outcome, especially when someone you love is involved.',
    label: 'Influence',
    fullLabel: 'Influence-Sensitive',
    tiedName: 'Influence',
    validationLine: 'Seeing what needs to happen is a form of intelligence, not a burden to carry alone.',
    tiedBody: 'When Influence is one of your primary patterns, the gap between what you can see clearly and what you can actually make happen becomes its own source of suffering — and that same clarity is what makes you someone who spots what others miss and shows up with genuine commitment to the people you care about.',
    mirror: 'Your primary stress pattern is Influence-Sensitive. People in the Influence category have a clear-eyed ability to see what needs to happen, and a strong felt responsibility toward the people and situations they care about. That combination is a genuine strength. Under stress the gap between your clarity and your control becomes its own source of frustration, particularly when someone you love is involved and the decision isn\'t yours to make. The helplessness of seeing clearly and being unable to act can follow you even when you\'re not in the room with it. The Zoom-Out work for this pattern is about learning to separate what you can influence from what you cannot, and finding a way to hold concern without being consumed by it.'
  },
  balance: {
    descriptor: 'How your nervous system responds to the perception of too much on your plate, and whether the weight of demand tips you toward overwhelm or avoidance.',
    label: 'Balance',
    fullLabel: 'Balance-Sensitive',
    tiedName: 'Balance',
    validationLine: 'Knowing what balance feels like is a form of intelligence most people spend years trying to develop.',
    tiedBody: 'When Balance is one of your primary patterns, the perception of too much tips your nervous system toward overwhelm — and that same sensitivity is what keeps you oriented toward sustainability and what actually matters.',
    mirror: 'Your primary stress pattern is Balance-Sensitive. People in the Balance category have a finely tuned internal sense of what a sustainable life feels like, and they notice quickly when something tips that equilibrium. This isn\'t about having a small container or low tolerance for hard work. It\'s about a nervous system that is particularly sensitive to the perception of too much, and for many people in this category there tends to be a perfectionism quality that keeps the weight of each item on the plate elevated, because what\'s there feels like it needs to be done completely and well. The collapse in this pattern doesn\'t always wait for the plate to be objectively full. The anticipation of too much can be enough to freeze the system. The Zoom-Out work for this pattern is about developing a more flexible relationship with the perception of too much, and learning to distinguish what actually requires full effort from what simply feels that way.'
  },
  comfort: {
    descriptor: 'How sensitive you are to disruptions in familiarity, routine, and safety, and how your nervous system responds when the ground beneath something familiar shifts.',
    label: 'Comfort',
    fullLabel: 'Comfort-Sensitive',
    tiedName: 'Comfort',
    validationLine: 'Creating safety and warmth for the people around you is a genuine and undervalued skill.',
    tiedBody: 'When Comfort is one of your primary patterns, disruptions to the familiar land harder than others might expect — and that same sensitivity is what makes you someone who creates genuine warmth, safety, and sanctuary for the people in your life.',
    mirror: 'Your primary stress pattern is Comfort-Sensitive. People in the Comfort category have a finely tuned sense of what safety and familiarity feel like, and they know how to create it. That capacity produces genuine warmth in their lives and relationships, and the people around them tend to benefit from it in ways they may not always name. Under stress, when something familiar is disrupted, the nervous system responds as though something load bearing has been removed, because for this person it has. The disruption doesn\'t have to be large to land hard. The Zoom-Out work for this pattern is about developing the capacity to locate or rebuild comfort relatively quickly after disruption, and extending some of that same warmth toward yourself during the in-between.'
  },
  attunement: {
    descriptor: 'How permeable you are to others\' emotional states, and whether the feelings of people around you tend to move into you and stay there.',
    label: 'Attunement',
    fullLabel: 'Attunement-Sensitive',
    tiedName: 'Attunement',
    validationLine: 'Being genuinely present with another person\'s pain is one of the rarest things one human can offer another.',
    tiedBody: 'When Attunement is one of your primary patterns, others\' emotional states move into you easily and don\'t always leave quickly — and that same permeability is what makes you someone people feel genuinely met by in a way that is rare.',
    mirror: 'Your primary stress pattern is Attunement-Sensitive. People in the Attunement category have a profound and genuine openness to others\' emotional experience. They don\'t just feel for someone, they feel as them, temporarily losing access to their own emotional ground because another person\'s has flooded the space. This isn\'t a choice and it isn\'t a failure of self-regulation. It simply happens, and the people around you feel the difference because being with you means being genuinely met. Under stress, and especially around people you love, that permeability can make it difficult to find your own baseline until those around you feel better. The Zoom-Out work for this pattern is not about closing down or becoming less sensitive. It\'s about finding reliable ways back to your own emotional ground after the merge has happened.'
  },
  certainty: {
    descriptor: 'How your nervous system responds to unresolved situations and an unknown future, and whether not knowing tends to keep your mind activated and searching.',
    label: 'Certainty',
    fullLabel: 'Certainty-Sensitive',
    tiedName: 'Certainty',
    validationLine: 'A mind that prepares carefully is a mind that cares about getting things right.',
    tiedBody: 'When Certainty is one of your primary patterns, not-knowing feels genuinely uncomfortable and your mind moves quickly to fill that gap — and that same sensitivity is what makes you a careful thinker who anticipates what others miss.',
    mirror: 'Your primary stress pattern is Certainty-Sensitive. People in the Certainty category have a forward-looking mind that plans carefully, thinks ahead, and finds genuine comfort in knowing what\'s coming. That capacity is a real strength and the people around you often benefit from it. Under stress, when the future feels unresolvable, that same mind has nowhere to land and stays activated, rehearsing outcomes and searching for solid ground that isn\'t available yet. The discomfort of not knowing can be genuinely difficult to set aside even when you can see that the searching isn\'t helping. The Zoom-Out work for this pattern is about building enough tolerance for ambiguity that you can function and even rest while things are still unresolved, trusting that you will be able to respond when clarity arrives.'
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
function buildGlossary() {
  const glossaryContent = document.getElementById('glossary-content');
  if (!glossaryContent) return;
  glossaryContent.innerHTML = '';
  const categoryOrder = ['somatic', 'appraisal', 'perception', 'connection', 'influence', 'balance', 'comfort', 'attunement', 'certainty'];
  categoryOrder.forEach(function(cat) {
    const meta = categoryMeta[cat];
    if (!meta) return;
    const item = document.createElement('div');
    item.classList.add('glossary-item');
    const name = document.createElement('span');
    name.classList.add('glossary-name');
    name.textContent = meta.label;
    const desc = document.createElement('span');
    desc.classList.add('glossary-desc');
    desc.textContent = ' — ' + meta.descriptor;
    item.appendChild(name);
    item.appendChild(desc);
    glossaryContent.appendChild(item);
  });
}

/* ============================================================
   RENDER RESULTS
============================================================ */
function showResults() {
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
    buildGlossary();
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
