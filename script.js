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

/* Category metadata */
const categoryMeta = {
  somatic: {
    descriptor: 'How attuned your nervous system is to physical signals, and whether your body tends to become the primary lens through which you experience stress.',
    label: 'Somatic',
    fullLabel: 'Somatic-Sensitive',
    tiedName: 'Somatic',
    validationLine: 'Your body has been paying attention for a reason.',
    tiedBody: 'When Somatic is one of your primary patterns, physical sensation becomes the loudest signal in the room — and that same attunement is what makes you unusually aware of what your body needs before others even notice something is off.',
    mirror: 'Your primary stress pattern is Somatic-Sensitive. People in this category have a genuinely sophisticated awareness of their body, and that attunement is a real capacity. You tend to notice physical signals early, respond to what your body needs before others would even register something is off, and live with a level of physical self-awareness that many people spend years trying to develop. Your body is not background noise. It is information, and you are unusually good at receiving it. Under stress that same attunement can shift from responsive to vigilant. Rather than listening to the body and responding, the nervous system begins scanning for threat, monitoring for changes, and interpreting physical sensation through an alarm lens. For some people this shows up as acute sensitivity to pain that narrows everything else out. For others it is a quieter pattern, a low-grade background awareness that tracks physical signals closely, sometimes reading ordinary sensations as potential warning signs before there is any real evidence to support that reading. This is an intelligent response to real experience rather than a flaw or an overreaction. The nervous system learned to pay close attention because paying close attention mattered at some point. The difficulty is that over time the vigilance can become the default lens, and when that happens the body stops feeling like an ally and starts feeling like something that needs to be managed. The same attunement that produces vigilance under stress is also what makes you physically self-aware, responsive, and genuinely connected to what your body needs when things are calm. That capacity is worth understanding and protecting. The Zoom-Out work for this pattern is about learning to hear your body as a messenger rather than a threat detector, so the signal gets through without the alarm taking over.'
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
    mirror: 'Your primary stress pattern is Perception-Sensitive. People in this category have a finely tuned social awareness that most people don\'t develop to the same degree. You read rooms accurately, pick up on shifts in tone and energy before anyone has said anything directly, and genuinely care about how your actions land on the people around you. That\'s not insecurity, it\'s a form of social intelligence that makes you unusually attuned to the relational texture of any situation you\'re in. Under stress that same awareness can tip into hypervigilance. The social signal becomes the loudest thing in the room, and how you are being seen starts to feel more important than what is actually happening. An offhand comment, a look, or a moment of perceived disapproval can shift the ground faster than the situation warrants. What\'s worth understanding is that the perception itself is often accurate. The room really did shift. The tone really did change. The difficulty isn\'t that you\'re imagining things, it\'s that the weight you give to what you\'re reading can exceed what the situation actually calls for. When the pattern activates, you may find yourself adjusting, softening your position, over-explaining, or reshaping what you were going to say in order to manage how you\'re landing. This happens quickly and often below the level of conscious choice. The social antenna is doing its job, it\'s just calibrated to a threat level that isn\'t quite matched to the actual risk. People in this category have sometimes been told they are too sensitive or that they care too much about what others think. What that framing misses is that the sensitivity is a capacity, not a liability, and the same quality that makes social situations feel high stakes is also what makes you genuinely present, thoughtful, and skilled at navigating the relational world. The Zoom-Out work for this pattern is about learning to notice when the social signal has been amplified beyond what the situation warrants, questioning whether the judgment you\'re sensing is actually there or as loud as it feels, and finding your way back to your own footing so you can respond from who you are rather than from who you think you\'re being seen as.'
  },
  connection: {
    descriptor: 'How much your sense of well-being depends on feeling close and connected to the people who matter most to you, and how you respond when that connection feels insecure.',
    label: 'Connection',
    fullLabel: 'Connection-Sensitive',
    tiedName: 'Connection',
    validationLine: 'The depth at which you love is not a liability.',
    tiedBody: 'When Connection is one of your primary patterns, perceived distance in a relationship can feel like disconnection even when the evidence does not support it — and that same sensitivity is what makes you one of the most attuned and relationally present people in any room.',
    mirror: 'Your primary stress pattern is Connection-Sensitive. People in this category have a deep and genuine investment in the people they love, and that investment is a real strength. You notice the texture of your relationships with unusual precision, picking up on shifts in warmth, availability, and emotional presence that others might miss entirely. That sensitivity makes you one of the most relationally present people in any room, someone who shows up fully and makes the people in your life feel genuinely seen. Under stress, when connection feels uncertain, that same sensitivity can tip into anxiety. A quiet day, a distracted conversation, or a moment of emotional distance can land harder than the situation warrants, triggering a response that feels out of proportion to what\'s actually happening. The nervous system interprets the distance as a signal that something essential is at risk, even when the evidence doesn\'t support that reading. When the pattern activates you may find yourself replaying interactions, wondering what shifted, seeking reassurance, or pulling away to protect yourself from the discomfort of uncertainty in the relationship. These responses make complete sense given how much the connection matters, and they can also create the very distance they\'re trying to resolve. It\'s worth knowing that the depth of feeling in this pattern is directly proportional to the depth of love underneath it. People in this category don\'t experience relational uncertainty casually because they don\'t love casually. The sensitivity and the investment are the same thing. The Zoom-Out work for this pattern is about learning to distinguish between genuine disconnection that needs attention and the natural ebb and flow of closeness that every relationship moves through, and finding ways to stay grounded in the love that\'s there even when the warmth feels temporarily out of reach.'
  },
  influence: {
    descriptor: 'How you respond when you have a felt responsibility, can see clearly what needs to happen but are not the one in control of the outcome, especially when someone you love is involved.',
    label: 'Influence',
    fullLabel: 'Influence-Sensitive',
    tiedName: 'Influence',
    validationLine: 'This isn\'t about needing control. It\'s actually about deep care and the fear of watching something go wrong when you could see it coming and couldn\'t stop it.',
    tiedBody: 'When Influence is one of your primary patterns, the stress isn\'t about lacking clarity or lacking care. It\'s about having both in full measure, seeing exactly what needs to happen, feeling genuinely responsible for the outcome, and having little to no ability to make it happen. That same combination is what makes you someone who shows up with real perception and genuine commitment to the people you care about.',
    mirror: 'Your primary stress pattern is Influence-Sensitive. People in the Influence category experience a specific kind of stress that requires three things to be present at once: you can see clearly what needs to happen, you feel genuinely responsible for the outcome, and you are not the one in control of the decision. When all three converge, the gap between your clarity and your ability to act becomes its own source of frustration and helplessness. Any one of them alone is manageable. It is the combination that is consuming, particularly when the person involved is someone you love and the stakes feel high. The helplessness of seeing clearly and being unable to act can follow you even when you are not in the room with it. It\'s worth knowing that this pattern can land differently on the people closest to you than it feels from the inside. What feels like care and clarity to you can feel like control or lack of trust to the person on the receiving end, particularly when they are trying to find their own footing. The love underneath the pattern is real and the people in your life usually know that. But the expression of it through trying to influence outcomes can sometimes create the opposite of what you\'re hoping for. The Zoom-Out work for this pattern is about learning to hold what you can see without needing to act on all of it, and finding a way to stay present with the people you love without being consumed by what you cannot change.'
  },
  balance: {
    descriptor: 'How your nervous system responds to the perception of too much on your plate, and whether the weight of demand tips you toward overwhelm or avoidance.',
    label: 'Balance',
    fullLabel: 'Balance-Sensitive',
    tiedName: 'Balance',
    validationLine: 'Knowing what balance feels like is a form of intelligence most people spend years trying to develop.',
    tiedBody: 'When Balance is one of your primary patterns, the perception of too much tips your nervous system toward overwhelm — and that same sensitivity is what keeps you oriented toward sustainability and what actually matters.',
    mirror: 'Your primary stress pattern is Balance-Sensitive. People in this category have a finely tuned internal sense of what a sustainable life feels like, and that sense is a genuine form of intelligence. You know when something is tipping before others would notice, and you have a clear read on what a well-functioning day, week, or season feels like for you. That capacity is worth naming because most people spend years trying to develop it and never quite get there. Under stress, when the perception of too much settles in, the internal organizing system that normally helps you sort, prioritize, and sequence can go quiet. What\'s left is feeling stuck, where everything feels equally urgent and equally weighted, and there is nowhere obvious to start. For some people in this category a perfectionism quality amplifies this, keeping the weight of each item elevated because everything feels like it needs to be done completely and well. The pile stops being a list and becomes a wall. What often looks like avoidance or procrastination from the outside is something more specific from the inside. It\'s the nervous system shutting down after being unable to find a way through, not a failure of motivation or discipline but a failure of the sorting system under too much perceived load. The perception piece is worth holding onto. The plate may or may not be objectively full. What\'s happening is that the nervous system is reading it as full, and that reading is what drives the response. The pile is often heavier in perception than in reality, and that gap is exactly where the Zoom-Out work lives. The Zoom-Out work for this pattern is about learning to see the pile more accurately, separating what genuinely needs your full attention from what your nervous system is making heavier than it needs to be, and finding the one thing that is actually most important to start with right now.'
  },
  comfort: {
    descriptor: 'How sensitive you are to disruptions in familiarity, routine, and safety, and how your nervous system responds when the ground beneath something familiar shifts.',
    label: 'Comfort',
    fullLabel: 'Comfort-Sensitive',
    tiedName: 'Comfort',
    validationLine: 'Investing deeply in what you love is not something everyone knows how to do.',
    tiedBody: 'When Comfort is one of your primary patterns, disruptions to the familiar land harder than others might expect — and that same sensitivity is what makes you someone who invests deeply in the relationships, routines, and environments that make life feel meaningful and grounded.',
    mirror: 'Your primary stress pattern is Comfort-Sensitive. People in the Comfort category have a deep attachment to what feels familiar, safe, and known, and change, even wanted change, can land hard. That\'s not resistance or rigidity. It\'s a nervous system that is genuinely attuned to the loss that lives inside every transition, even the good ones. Something is always ending when something new begins, and for people in this category that ending is felt fully before the new thing has had time to become home. The familiar here isn\'t just about place. It\'s about the rituals, routines, and rhythms that structure daily life and create a quiet sense of safety and predictability. It\'s also about identity, the roles, relationships, and ways of being that tell you who you are. When those shift, even gradually, the nervous system notices, and the disorientation can go deeper than the practical changes on the surface. You may notice yourself wanting to go back to how things were, or feeling unsettled even when you know the change is right. That\'s not weakness or indecision. It\'s the nervous system doing what it does, looking for solid ground while the new hasn\'t yet become familiar. The same quality that makes change difficult is also what makes your commitments deep and your connections lasting. People in this category invest genuinely in what they have, and that investment produces something real that more change-tolerant people sometimes miss entirely. The in-between is often the hardest part, the space where what was familiar is gone and what\'s coming hasn\'t yet settled into place. People in this category sometimes judge themselves for not adapting faster, but the timeline for finding a new normal is simply longer, and that\'s not a flaw. The Zoom-Out work for this pattern is about finding small anchors of familiarity that help the nervous system settle during transitions, and extending the same patience toward yourself that you would offer anyone navigating a genuine loss.'
  },
  attunement: {
    descriptor: 'How permeable you are to others\' emotional states, and whether the feelings of people around you tend to move into you and stay there.',
    label: 'Attunement',
    fullLabel: 'Attunement-Sensitive',
    tiedName: 'Attunement',
    validationLine: 'Being genuinely present with another person\'s pain is one of the rarest things one human can offer another.',
    tiedBody: 'When Attunement is one of your primary patterns, others\' emotional states move into you easily and don\'t always leave quickly — and that same permeability is what makes you someone people feel genuinely met by in a way that is rare.',
    mirror: 'Your primary stress pattern is Attunement-Sensitive. People in this category are often the ones others describe as empaths, and that language is accurate as far as it goes. You don\'t just notice what someone is feeling, you feel it with them, and often as them. That quality is a genuine gift. The people in your life feel genuinely met by you in a way that is rare, because you aren\'t performing empathy or working to understand, you simply receive what others are carrying and respond from inside it. What makes this a stress pattern rather than just a personality trait is the permeability. The emotional states of others move into you without your permission, and they don\'t always leave quickly. This isn\'t a failure of self-regulation or a sign that something is wrong with your boundaries. It simply happens, the way some people absorb sound more acutely than others or feel temperature changes before anyone else notices them. Your nervous system is built to receive. Empathy is the capacity to feel what someone else is feeling. For most people that capacity has a natural return, they feel into someone\'s experience and then come back to their own. For people in the Attunement category that return is slower and less automatic, not because anything is wrong, but because the nervous system is built to stay open longer. What comes in doesn\'t leave as quickly, and that\'s both the gift and the cost of this pattern. Under stress, and especially around people you love, that permeability can make it difficult to locate your own emotional ground. You may find yourself carrying feelings that don\'t quite belong to you, or not being able to feel okay until the people around you do. The Zoom-Out work for this pattern is not about closing down or becoming less sensitive. The sensitivity is the gift and it isn\'t going anywhere. It\'s about finding reliable ways back to your own emotional ground after the merge has happened, so the gift stays available without the cost becoming chronic.'
  },
  certainty: {
    descriptor: 'How your nervous system responds to unresolved situations and an unknown future, and whether not knowing tends to keep your mind activated and searching.',
    label: 'Certainty',
    fullLabel: 'Certainty-Sensitive',
    tiedName: 'Certainty',
    validationLine: 'A mind that prepares carefully is a mind that cares about getting things right.',
    tiedBody: 'When Certainty is one of your primary patterns, not-knowing feels genuinely uncomfortable and your mind moves quickly to fill that gap — and that same sensitivity is what makes you a careful thinker who anticipates what others miss.',
    mirror: 'Your primary stress pattern is Certainty-Sensitive. People in this category have a forward-looking mind that plans carefully, thinks ahead, and finds genuine comfort in knowing what\'s coming. That\'s not anxiety, it\'s intelligence. The ability to anticipate, prepare, and think through what\'s ahead is a real strength, and people around you often rely on it more than they realize. Under stress, when the future feels unclear or unresolvable, that same forward-looking mind has nowhere to land. It keeps moving, trying to find an answer that isn\'t available yet, running through possibilities and testing outcomes, looking for something that will make the unknown feel more manageable. This is where worst-case thinking can take over. Not because you expect the worst, but because imagining it creates a sense of readiness. If you can think it through, you might be able to prevent it, or at least not be caught off guard. The mind is trying to replace uncertainty with preparation. What\'s distinctive about this pattern is that the mind tends to stay in the search until it finds a resolution, real or constructed. In many cases, a fully imagined worst-case scenario can feel more relieving than continued uncertainty. The difficulty is not the outcome itself, it\'s the not knowing. The challenge is that the searching feels useful, even when it isn\'t helping. Letting go of it can feel like giving up control, and when things are uncertain, that can feel genuinely risky. It\'s worth knowing that this pattern is often harder on the people around you than it is on you. Because you have found ways to manage the uncertainty internally, through planning, researching, and resolving it in your mind, the distress may feel temporary and manageable from the inside. The people close to you, however, may experience the searching and catastrophizing as ongoing tension, particularly if they are less activated by uncertainty than you are. You may also notice this in your body, a restlessness or low-level tension that makes it hard to fully settle, even when nothing is actively wrong. The issue isn\'t the present moment, it\'s that the future hasn\'t resolved yet. The Zoom-Out work for this pattern is about learning to tolerate not knowing without needing to resolve it, trusting that your ability to think ahead will be there when it\'s actually needed, and that continuing to search in the meantime often keeps you more stuck than prepared.'
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
  const contextLine = 'Your results reflect where your nervous system is right now. This pattern may represent a long-standing stress signature or a response to what\'s happening in your life at this particular moment.';
  if (score <= 3) {
    return 'Your depletion level today is low (' + score + '/10). Your scores are likely a reliable reflection of your baseline stress patterns. ' + contextLine;
  } else if (score <= 6) {
    return 'Your depletion level today is moderate (' + score + '/10). Some scores may be slightly elevated compared to a more rested baseline, and that is worth keeping in mind as you read your results. ' + contextLine;
  } else {
    return 'Your depletion level today is high (' + score + '/10). When your system is running low on resources, stress patterns tend to feel more intense. Your scores today may reflect that added strain rather than your baseline pattern alone. ' + contextLine;
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
  const mirrorText = meta && meta.mirror ? meta.mirror : '';
  const validationText = meta && meta.validationLine ? meta.validationLine : '';
  mirrorEl.textContent = mirrorText + (validationText ? ' ' + validationText : '');
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
      parts.push('The Zoom-Out work for both patterns is about learning to recognize when each one is narrowing your perspective, and finding your way back to a clearer and steadier view of what\'s actually happening.');
      parts.push('These patterns do not operate in isolation. When both are active, they tend to shape and amplify each other in ways that can feel hard to untangle — and that is exactly what your interpretation is designed to help you see. Your interpretation will show you how these patterns operate across different categories in your life and how to use them to your advantage.');
      mirrorEl.textContent = parts.join(' ');
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
