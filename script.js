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
  orderedQuestions: [],
  ageRange: null,
  gender: null
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
const categoryMeta = {
  somatic: {
    descriptor: 'How attuned your nervous system is to physical signals, and whether your body tends to become the primary lens through which you experience stress.',
    label: 'Somatic',
    fullLabel: 'Somatic-Type',
    tiedName: 'Somatic',
    validationLine: 'Your body has been paying attention for a reason.',
    tiedBody: 'When Somatic is one of your primary patterns, physical sensation becomes the loudest signal in the room — and that same attunement is what makes you unusually aware of what your body needs before others even notice something is off.',
    mirror: 'Your body speaks early and loudly under stress. People with a Somatic-Type stress pattern have a refined awareness of their body, and that attunement is a real capacity. You tend to notice physical signals early and respond to what your body needs before others would register something is off. Under stress, that same attunement can shift from responsive to vigilant — ordinary sensations start to feel like warning signs, and the body stops feeling like an ally and starts feeling like something to manage. The nervous system learned to pay close attention for a reason. The Zoom-Out work is learning to hear your body as a messenger rather than a threat detector, so the signal comes through without the alarm taking over.'
  },
  appraisal: {
    descriptor: 'How your inner evaluative voice responds when things go wrong, and whether it tends toward understanding or harsh judgment under pressure.',
    label: 'Appraisal',
    fullLabel: 'Appraisal-Type',
    tiedName: 'Appraisal',
    validationLine: 'You can hold yourself to a high standard and still be on your own side.',
    tiedBody: 'When Appraisal is one of your primary patterns, a mistake or a moment of falling short can begin to be inappropriately labeled as evidence of something larger about who you are — and that same evaluative mind is what drives the self-awareness and high standards that make you unusually thoughtful about your own behavior and impact.',
    mirror: 'Your mind evaluates quickly and holds a high standard. People with an Appraisal-Type stress pattern have an active evaluative mind that notices what went wrong and wants to do better. That capacity drives real self-awareness and growth. Under stress, that same process can turn harsh — a mistake stops being a moment and starts feeling like evidence of something larger about who you are. The critic and the conscience are running on the same engine, which is why simply being kinder to yourself doesn\'t always land. The Zoom-Out work is learning to notice when your evaluation has shifted from accurate to harsh, and returning to a clearer read of what actually happened.'
  },
  perception: {
    descriptor: 'How sensitive you are to others\' evaluations and social signals, and whether how you are seen by others has a strong pull on your sense of stability.',
    label: 'Perception',
    fullLabel: 'Perception-Type',
    tiedName: 'Perception',
    validationLine: 'Reading a room the way you do is a rare and undervalued skill.',
    tiedBody: 'When Perception is one of your primary patterns, how others see you carries more weight than you\'d like — and that same attunement is what makes you perceptive, socially intelligent, and skilled at reading a room.',
    mirror: 'You read people and environments with unusual accuracy. People with a Perception-Type stress pattern have a finely tuned social awareness. You pick up on tone, energy, and subtle shifts before anything is said directly. Under stress, that same awareness can tip into hypervigilance — a look, a comment, or a moment of perceived disapproval can carry more weight than the situation warrants. The perception is often accurate, but the meaning attached to it can expand quickly. The Zoom-Out work is learning to notice when a signal has been amplified, and returning to your own footing so you can respond from who you are, not from how you think you\'re being seen.'
  },
  connection: {
    descriptor: 'How much your sense of well-being depends on feeling close and connected to the people who matter most to you, and how you respond when that connection feels insecure.',
    label: 'Connection',
    fullLabel: 'Connection-Type',
    tiedName: 'Connection',
    validationLine: 'The depth at which you love is not a liability.',
    tiedBody: 'When Connection is one of your primary patterns, perceived distance in a relationship can feel like disconnection even when the evidence does not support it — and that same sensitivity is what makes you one of the most attuned and relationally present people in any room.',
    mirror: 'People with a Connection-Type stress pattern have a deep and genuine investment in the people they love, and that investment is a real strength. You notice the texture of your relationships with unusual precision, picking up on shifts in warmth and emotional presence that others might miss entirely. Under stress, when connection feels uncertain — a quiet day, the sense that you weren\'t really heard, or the feeling that you weren\'t thought of — that same sensitivity can tip into anxiety, triggering a response that feels out of proportion to what\'s actually happening. The depth of feeling in this pattern is directly proportional to the depth of love underneath it. You don\'t experience relational uncertainty casually because you don\'t love casually. The Zoom-Out work is about learning to distinguish between genuine disconnection that needs attention and the natural ebb and flow of closeness that every relationship moves through.'
  },
  influence: {
    descriptor: 'How you respond when you have a felt responsibility, can see clearly what needs to happen but are not the one in control of the outcome, especially when someone you love is involved.',
    label: 'Influence',
    fullLabel: 'Influence-Type',
    tiedName: 'Influence',
    validationLine: 'This isn\'t about needing control. It\'s about deep care and the fear of watching something go wrong when you could see it coming and couldn\'t stop it.',
    tiedBody: 'When Influence is one of your primary patterns, the stress isn\'t about lacking clarity or lacking care. It\'s about having both in full measure, seeing exactly what needs to happen, feeling genuinely responsible for the outcome, and having little to no ability to make it happen. That same combination is what makes you someone who shows up with real perception and genuine commitment to the people you care about.',
    mirror: 'You see what needs to happen and feel responsible for it. People with an Influence-Type stress pattern experience stress when three things are present at once: you can see clearly what needs to happen, you care deeply about the outcome, and you\'re not in control of the decision. When that gap opens, it creates frustration and helplessness, especially when the stakes are high or the person involved matters to you. What feels like clarity and care from the inside can sometimes feel like pressure from the outside. The Zoom-Out work is learning to hold what you can see without needing to act on all of it, and staying connected to others without being consumed by what you cannot change.'
  },
  balance: {
    descriptor: 'How your nervous system responds to the perception of too much on your plate, and whether the weight of demand tips you toward overwhelm or avoidance.',
    label: 'Balance',
    fullLabel: 'Balance-Type',
    tiedName: 'Balance',
    validationLine: 'Knowing what balance feels like is a form of intelligence most people spend years trying to develop.',
    tiedBody: 'When Balance is one of your primary patterns, the perception of too much tips your nervous system toward overwhelm — and that same sensitivity is what keeps you oriented toward sustainability and what actually matters.',
    mirror: 'You know when your load is too much, and it hits quickly. People with a Balance-Type stress pattern have a strong internal sense of what sustainable feels like. You can tell when something is tipping before others notice. Under stress, when things feel like too much, your ability to prioritize can go quiet — everything feels equally urgent, and there\'s no clear place to start. What looks like avoidance is often your system shutting down after not finding a way through. The Zoom-Out work is learning to see the load more accurately, separate what truly matters from what feels heavy, and start with one clear next step.'
  },
  comfort: {
    descriptor: 'How sensitive you are to disruptions in familiarity, routine, and safety, and how your nervous system responds when the ground beneath something familiar shifts.',
    label: 'Comfort',
    fullLabel: 'Comfort-Type',
    tiedName: 'Comfort',
    validationLine: 'Investing deeply in what you love is not something everyone knows how to do.',
    tiedBody: 'When Comfort is one of your primary patterns, disruptions to the familiar land harder than others might expect — and that same sensitivity is what makes you someone who invests deeply in the relationships, routines, and environments that make life feel meaningful and grounded.',
    mirror: 'Change lands deeply for you, even when you want it. People with a Comfort-Type stress pattern have a strong connection to what feels known, safe, and consistent. That stability supports deep commitment and lasting connection. Under stress, even wanted change can feel disorienting. It\'s not resistance, it\'s your system registering the loss that comes with transition, including the loss of routines and identity anchors. The Zoom-Out work is finding small points of familiarity during change and giving yourself the same steadiness you offer others when something meaningful shifts.'
  },
  attunement: {
    descriptor: 'How permeable you are to others\' emotional states, and whether the feelings of people around you tend to move into you and stay there.',
    label: 'Attunement',
    fullLabel: 'Attunement-Type',
    tiedName: 'Attunement',
    validationLine: 'Being genuinely present with another person\'s pain is one of the rarest things one human can offer another.',
    tiedBody: 'When Attunement is one of your primary patterns, others\' emotional states move into you easily and don\'t always leave quickly — and that same permeability is what makes you someone people feel genuinely met by in a way that is rare.',
    mirror: 'You don\'t just understand others\' emotions, you feel them. People with an Attunement-Type stress pattern are deeply receptive to the emotional states of others. You don\'t have to work to understand, you naturally feel what others are carrying. Under stress, that openness can make it hard to separate what\'s yours from what isn\'t. Emotional states can move into you quickly and stay longer than you\'d like. The Zoom-Out work is not about becoming less sensitive, it\'s about reliably returning to your own emotional ground so your empathy remains a strength without becoming overwhelming.'
  },
  certainty: {
    descriptor: 'How your nervous system responds to unresolved situations and an unknown future, and whether not knowing tends to keep your mind activated and searching.',
    label: 'Certainty',
    fullLabel: 'Certainty-Type',
    tiedName: 'Certainty',
    validationLine: 'A mind that prepares carefully is a mind that cares about getting things right.',
    tiedBody: 'When Certainty is one of your primary patterns, not-knowing feels genuinely uncomfortable and your mind moves quickly to fill that gap — and that same sensitivity is what makes you a careful thinker who anticipates what others miss.',
    mirror: 'Your mind looks ahead and wants to know what\'s coming. People with a Certainty-Type stress pattern have a forward-thinking mind that plans, anticipates, and prepares. That ability creates real stability and people around you rely on it more than they realize. Under stress, when the future feels unclear, your mind keeps searching — running scenarios, testing outcomes, trying to resolve the unknown. Sometimes a worst-case scenario can feel more relieving than uncertainty itself, because at least it\'s resolved. The Zoom-Out work is learning to tolerate not knowing without needing to resolve it, trusting that your ability to prepare will be there when it\'s actually needed.'
  }
};
/* Tier */
function getTier(score) {
  if (score <= 5)  return { name: 'Resilient Range',        key: 'resilient' };
  if (score <= 8)  return { name: 'Activated Sensitivity',  key: 'mild' };
  if (score <= 10) return { name: 'Heightened Sensitivity', key: 'moderate' };
  return               { name: 'Active Stress Zone',        key: 'active' };
}

/* Depletion note */
function depletionNote(score) {
  const contextLine = 'Your results reflect where your nervous system is right now. This pattern may represent a long-standing stress signature or a response to what\'s happening in your life at this particular moment.';
  if (score <= 3) {
    return 'Your stress level today is low (' + score + '/10). Your scores are likely a reliable reflection of your baseline stress patterns. ' + contextLine;
  } else if (score <= 6) {
    return 'Your stress level today is moderate (' + score + '/10). Some scores may be slightly elevated compared to a more rested baseline, and that is worth keeping in mind as you read your results. ' + contextLine;
  } else {
    return 'Your stress level today is high (' + score + '/10). When your system is running low on resources, stress patterns tend to feel more intense. Your scores today may reflect that added strain rather than your baseline pattern alone. ' + contextLine;
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
  const resBlock = document.getElementById('resilience-block');
  const resHeading = resBlock.querySelector('h3');
  resContent.innerHTML = '';

  const genuinelyResilient = byScoreAsc.filter(function (r) { return r.score <= 5; });
  const allAboveEight = byScoreAsc[0].score >= 8;

  if (genuinelyResilient.length > 0) {
    resHeading.textContent = 'Resilience Areas';
    const resContainer = document.createElement('div');
    resContainer.classList.add('resilience-tags');
    genuinelyResilient.forEach(function (r) {
      const tag = document.createElement('span');
      tag.classList.add('resilience-tag');
      const meta = categoryMeta[r.category];
      tag.textContent = meta ? meta.label : r.label;
      resContainer.appendChild(tag);
    });
    resContent.appendChild(resContainer);
  } else if (allAboveEight) {
    resHeading.textContent = 'A Note on Your Profile';
    const note = document.createElement('p');
    note.classList.add('multi-score-text');
    note.textContent = 'Your profile shows activation across all nine areas — there are no patterns sitting fully quiet right now. This is worth taking seriously. It suggests your nervous system is carrying a broad load rather than narrowing around one or two specific stress types, and that kind of widespread activation tends to accumulate in ways that aren\'t always visible from the inside. The personalized interpretation is particularly valuable for profiles like yours, where understanding which patterns to address first can make a meaningful difference.';
    resContent.appendChild(note);
  } else {
    resHeading.textContent = 'Areas of Steadiness';
    const resContainer = document.createElement('div');
    resContainer.classList.add('resilience-tags');
    byScoreAsc.slice(0, 3).forEach(function (r) {
      const tag = document.createElement('span');
      tag.classList.add('resilience-tag', 'tier-tag-' + r.tier.key);
      const meta = categoryMeta[r.category];
      tag.textContent = meta ? meta.label : r.label;
      resContainer.appendChild(tag);
    });
    resContent.appendChild(resContainer);
  }
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
  const mirrorText = meta && meta.mirror ? meta.mirror : '';
  const validationText = meta && meta.validationLine ? meta.validationLine : '';
  mirrorEl.textContent = mirrorText + (validationText ? ' ' + validationText : '');
} else {
      /* Tied primaries: handles two, three, or more */
      const count = primaries.length;
      const nameList = primaries.map(function (p) { return p.fullLabel; });
      const namesFormatted = count === 2
        ? nameList.join(' and ')
        : nameList.slice(0, -1).join(', ') + ', and ' + nameList[nameList.length - 1];

      let parts = ['Your highest scores are tied across ' + namesFormatted + '.'];

      primaries.forEach(function (p) {
        const m = categoryMeta[p.category];
        if (m && m.tiedBody && m.validationLine) {
          parts.push(m.tiedBody + ' ' + m.validationLine);
        }
      });

      parts.push('The Zoom-Out work for ' + (count === 2 ? 'both' : 'all ' + count) + ' patterns is about learning to recognize when each one is narrowing your perspective, and finding your way back to a clearer and steadier view of what\'s actually happening.');
      parts.push('These patterns do not operate in isolation. When more than one is active, they shape and amplify each other in ways that can feel hard to untangle. Your personalized interpretation is designed to show you exactly how your specific combination works together and where to focus first.');

      mirrorEl.textContent = parts.join(' ');
    }
  }
   /* Multi-score acknowledgment */
  const multiEl = document.getElementById('multi-score-block');
  if (multiEl) {
    const primaryCategories = primaries.map(function (p) { return p.category; });
    const activating = sorted.filter(function (item) {
      return item.score >= 8 && !primaryCategories.includes(item.category);
    });

    if (activating.length > 0) {
      const names = activating.map(function (item) {
        return categoryMeta[item.category] ? categoryMeta[item.category].label : item.label;
      });

      const nameList = names.length === 1
        ? names[0]
        : names.slice(0, -1).join(', ') + ' and ' + names[names.length - 1];

     const typeWord = primaries.length === 1 ? 'type' : 'types';
      const verbPhrase = primaries.length === 1 ? 'how it shows up' : 'how they show up';

      multiEl.innerHTML =
        '<p class="multi-score-text">Your results also show activation in ' + nameList + '. ' +
        'These patterns are present alongside your primary ' + typeWord + ' and tend to shape ' + verbPhrase + ' — ' +
        'what situations pull you off center, how quickly the stress response builds, and how it feels from the inside. ' +
        'What\'s harder to see is how your specific combination works together, where these patterns amplify each other, ' +
        'and what to actually do about it. That\'s exactly what the personalized interpretation report is designed to show you.</p>';
    } else {
      multiEl.innerHTML = '';
    }
  }
  buildGlossary();
  initAccuracyScale();
  submitInitialToAirtable(); 
}
/* Data Collection */
let airtableRecordId = null;

function getPrimaryType(scores) {
  const sorted = Object.entries(scores).sort((a, b) => b[1] - a[1]);
  const topKey = sorted[0][0];
  return categoryMeta[topKey] ? categoryMeta[topKey].fullLabel : topKey;
}

async function submitInitialToAirtable() {
  const scores = calculateScores();
  const primary = getPrimaryType(scores);

  const AIRTABLE_TOKEN = 'patx16V5sirHe944I.cc59aa32fc93d895acbd1dd3a60a712b3b0ca194750e28ac9469e4a628316ce4';
  const BASE_ID = 'appoiZOho3OE12Hlk';
  const TABLE_NAME = 'Responses';

  const fields = {
    'Depletion': state.depletionScore,
    'Somatic': scores.somatic || 0,
    'Appraisal': scores.appraisal || 0,
    'Perception': scores.perception || 0,
    'Connection': scores.connection || 0,
    'Influence': scores.influence || 0,
    'Balance': scores.balance || 0,
    'Comfort': scores.comfort || 0,
    'Attunement': scores.attunement || 0,
    'Certainty': scores.certainty || 0,
    'Primary Type': primary,
    'Submitted At': new Date().toISOString()
  };

  if (state.ageRange) fields['Age Range'] = state.ageRange;
  if (state.gender) fields['Gender'] = state.gender;

  try {
    const response = await fetch(`https://api.airtable.com/v0/${BASE_ID}/${TABLE_NAME}`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${AIRTABLE_TOKEN}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ fields })
    });
    const data = await response.json();
    if (data && data.id) {
      airtableRecordId = data.id;
    }
  } catch (err) {
    console.error('Airtable submission failed:', err);
  }
}

async function updateAccuracyRating(rating) {
  if (!airtableRecordId) return;

  const AIRTABLE_TOKEN = 'patx16V5sirHe944I.cc59aa32fc93d895acbd1dd3a60a712b3b0ca194750e28ac9469e4a628316ce4';
  const BASE_ID = 'appoiZOho3OE12Hlk';
  const TABLE_NAME = 'Responses';

  try {
    await fetch(`https://api.airtable.com/v0/${BASE_ID}/${TABLE_NAME}/${airtableRecordId}`, {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${AIRTABLE_TOKEN}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ fields: { 'Accuracy Rating': rating } })
    });
  } catch (err) {
    console.error('Airtable accuracy update failed:', err);
  }
}

function initAccuracyScale() {
  const scaleEl = document.getElementById('accuracy-scale');
  if (!scaleEl) return;
  scaleEl.innerHTML = '';
  for (let i = 1; i <= 5; i++) {
    const btn = document.createElement('button');
    btn.className = 'accuracy-btn';
    btn.textContent = i;
    btn.addEventListener('click', function () {
      document.querySelectorAll('.accuracy-btn').forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
      updateAccuracyRating(i);
    });
    scaleEl.appendChild(btn);
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
    document.getElementById('demo-page').classList.remove('hidden');
  });

 document.getElementById('demo-btn').addEventListener('click', function () {
    state.ageRange = document.getElementById('demo-age').value;
    state.gender = document.getElementById('demo-gender').value;
    document.getElementById('demo-page').classList.add('hidden');
    document.getElementById('settle-page').classList.remove('hidden');
    window.scrollTo(0, 0);
  });

  document.getElementById('demo-skip-link').addEventListener('click', function (e) {
    e.preventDefault();
    document.getElementById('demo-page').classList.add('hidden');
    document.getElementById('settle-page').classList.remove('hidden');
    window.scrollTo(0, 0);
  });

  document.getElementById('settle-btn').addEventListener('click', function () {
    document.getElementById('settle-page').classList.add('hidden');
    document.getElementById('agency-page').classList.remove('hidden');
    window.scrollTo(0, 0);
  });

  document.getElementById('agency-btn').addEventListener('click', function () {
    document.getElementById('agency-page').classList.add('hidden');
    quizPage.classList.remove('hidden');
    initQuiz();
    window.scrollTo(0, 0);
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
      const multiEl = document.getElementById('multi-score-block');
      if (multiEl) multiEl.innerHTML = '';
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


