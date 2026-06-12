const lessons = window.THINKING_ISLAND_LESSONS || [];
const practiceQuestionCount = 5;
const reviewMasteryTarget = 2;

const storageKey = "thinking-island-progress-v1";
const today = new Date().toISOString().slice(0, 10);

const state = {
  activeLessonId: lessons[0]?.id || "",
  questionIndex: 0,
  selected: false,
  mode: "lesson",
  correctInLesson: 0,
  correctInReview: 0,
  sessionMissedIds: new Set(),
  reviewQuestions: [],
  sessionQuestions: [],
  progress: loadProgress()
};

const elements = {
  lessonList: document.querySelector("#lesson-list"),
  progressDashboard: document.querySelector("#progress-dashboard"),
  streak: document.querySelector("#streak"),
  xp: document.querySelector("#xp"),
  stars: document.querySelector("#stars"),
  lessonLabel: document.querySelector("#lesson-label"),
  questionCount: document.querySelector("#question-count"),
  progressFill: document.querySelector("#progress-fill"),
  questionCard: document.querySelector("#question-card"),
  choices: document.querySelector("#choices"),
  feedback: document.querySelector("#feedback"),
  startButton: document.querySelector("#start-button"),
  reviewButton: document.querySelector("#review-button"),
  nextButton: document.querySelector("#next-button"),
  resetProgress: document.querySelector("#reset-progress")
};

function createFallbackProgress() {
  return {
    xp: 0,
    stars: 0,
    streak: 0,
    lastPlayed: "",
    lessons: {},
    missedByLesson: {},
    reviewMasteryByLesson: {}
  };
}

function loadProgress() {
  const fallback = createFallbackProgress();

  try {
    const stored = JSON.parse(localStorage.getItem(storageKey));
    return {
      ...fallback,
      ...(stored || {}),
      lessons: stored?.lessons || fallback.lessons,
      missedByLesson: stored?.missedByLesson || fallback.missedByLesson,
      reviewMasteryByLesson: stored?.reviewMasteryByLesson || fallback.reviewMasteryByLesson
    };
  } catch {
    return fallback;
  }
}

function saveProgress() {
  localStorage.setItem(storageKey, JSON.stringify(state.progress));
}

function getActiveLesson() {
  return lessons.find((lesson) => lesson.id === state.activeLessonId) || lessons[0];
}

function getQuestionSet() {
  if (state.mode === "review") {
    return state.reviewQuestions;
  }

  if (state.sessionQuestions.length > 0) {
    return state.sessionQuestions;
  }

  return pickLessonQuestions(getActiveLesson());
}

function shuffleItems(items) {
  return items
    .map((item) => ({ item, sort: Math.random() }))
    .sort((left, right) => left.sort - right.sort)
    .map(({ item }) => item);
}

function pickLessonQuestions(lesson) {
  return shuffleItems(lesson.questions)
    .slice(0, practiceQuestionCount)
    .map((question) => ({
      ...question,
      choices: shuffleItems(question.choices)
    }));
}

function getMissedIds(lessonId) {
  return state.progress.missedByLesson[lessonId] || [];
}

function getLessonProgress(lessonId) {
  const saved = state.progress.lessons[lessonId] || {};
  return {
    best: saved.best || 0,
    attempts: saved.attempts || 0,
    lastScore: saved.lastScore ?? null,
    completedAt: saved.completedAt || ""
  };
}

function getReviewMastery(lessonId, questionId) {
  return state.progress.reviewMasteryByLesson[lessonId]?.[questionId] || 0;
}

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (character) => {
    const entities = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;"
    };
    return entities[character];
  });
}

function getVisualTokenClass(value) {
  const classNames = ["token"];
  const text = String(value);
  const colorClasses = {
    红: "token-red",
    黄: "token-yellow",
    蓝: "token-blue",
    绿: "token-green"
  };
  const shapeClasses = {
    圆: "token-circle",
    方: "token-square",
    三角: "token-triangle",
    长方: "token-rectangle"
  };

  if (colorClasses[text]) {
    classNames.push("token-color", colorClasses[text]);
  }

  if (shapeClasses[text]) {
    classNames.push("token-shape", shapeClasses[text]);
  }

  return classNames.join(" ");
}

function renderVisualToken(value) {
  return `<span class="${getVisualTokenClass(value)}">${escapeHtml(value)}</span>`;
}

function setMissedIds(lessonId, ids) {
  state.progress.missedByLesson[lessonId] = Array.from(new Set(ids));
}

function setReviewMastery(lessonId, questionId, count) {
  state.progress.reviewMasteryByLesson[lessonId] = {
    ...(state.progress.reviewMasteryByLesson[lessonId] || {}),
    [questionId]: Math.max(0, Math.min(count, reviewMasteryTarget))
  };
}

function resetReviewMastery(lessonId, questionId) {
  setReviewMastery(lessonId, questionId, 0);
}

function advanceReviewMastery(lessonId, questionId) {
  const nextCount = getReviewMastery(lessonId, questionId) + 1;
  setReviewMastery(lessonId, questionId, nextCount);
  return Math.min(nextCount, reviewMasteryTarget);
}

function rememberMissedQuestion(lessonId, questionId) {
  setMissedIds(lessonId, [...getMissedIds(lessonId), questionId]);
  resetReviewMastery(lessonId, questionId);
}

function clearMissedQuestion(lessonId, questionId) {
  setMissedIds(
    lessonId,
    getMissedIds(lessonId).filter((id) => id !== questionId)
  );
  resetReviewMastery(lessonId, questionId);
}

function renderStats() {
  elements.streak.textContent = state.progress.streak;
  elements.xp.textContent = state.progress.xp;
  elements.stars.textContent = state.progress.stars;
}

function getProgressSummary() {
  const lessonSummaries = lessons.map((lesson) => {
    const saved = getLessonProgress(lesson.id);
    const missedCount = getMissedIds(lesson.id).length;
    return {
      lesson,
      ...saved,
      missedCount
    };
  });

  const totalAttempts = lessonSummaries.reduce((total, item) => total + item.attempts, 0);
  const completedLessons = lessonSummaries.filter((item) => item.attempts > 0).length;
  const totalMissed = lessonSummaries.reduce((total, item) => total + item.missedCount, 0);
  const latestLesson = lessonSummaries
    .filter((item) => item.completedAt)
    .sort((left, right) => right.completedAt.localeCompare(left.completedAt))[0];

  return {
    totalAttempts,
    completedLessons,
    totalMissed,
    latestLesson
  };
}

function renderProgressDashboard() {
  const summary = getProgressSummary();
  const latestScore =
    summary.latestLesson && summary.latestLesson.lastScore !== null
      ? `${summary.latestLesson.lesson.title} ${summary.latestLesson.lastScore} / ${practiceQuestionCount}`
      : "还没有完成练习";

  elements.progressDashboard.innerHTML = `
    <div class="dashboard-heading">
      <span>学习概览</span>
      <small>只保存在本机</small>
    </div>
    <div class="dashboard-grid">
      <div>
        <strong>${summary.totalAttempts}</strong>
        <span>总练习</span>
      </div>
      <div>
        <strong>${summary.completedLessons}</strong>
        <span>已练关卡</span>
      </div>
      <div>
        <strong>${summary.totalMissed}</strong>
        <span>当前错题</span>
      </div>
    </div>
    <p class="dashboard-latest">最近成绩：${escapeHtml(latestScore)}</p>
  `;
}

function renderLessons() {
  elements.lessonList.innerHTML = lessons
    .map((lesson) => {
      const saved = getLessonProgress(lesson.id);
      const missedCount = getMissedIds(lesson.id).length;
      const isActive = lesson.id === state.activeLessonId ? " active" : "";
      const scoreText = [
        `最佳 ${saved.best} / ${practiceQuestionCount}`,
        `题库 ${lesson.questions.length}`,
        `练习 ${saved.attempts}`,
        `错题 ${missedCount}`
      ].join(" · ");

      return `
        <button class="lesson-button${isActive}" type="button" data-lesson-id="${lesson.id}">
          <span class="lesson-icon">${escapeHtml(lesson.icon)}</span>
          <span>
            <span class="lesson-title">${escapeHtml(lesson.title)}</span>
            <span class="lesson-desc">${escapeHtml(lesson.desc)}</span>
          </span>
          <span class="lesson-score">${escapeHtml(scoreText)}</span>
        </button>
      `;
    })
    .join("");
}

function renderQuestion() {
  const lesson = getActiveLesson();
  const questions = getQuestionSet();
  const question = questions[state.questionIndex];
  const current = state.questionIndex + 1;
  const progressPercent = (state.questionIndex / questions.length) * 100;

  elements.lessonLabel.textContent = state.mode === "review" ? `${lesson.title} · 错题复习` : lesson.title;
  elements.questionCount.textContent = `${current} / ${questions.length}`;
  elements.progressFill.style.width = `${progressPercent}%`;
  elements.feedback.textContent = state.mode === "review" ? "把刚才卡住的题再想一次。" : "认真想一想，再选择答案。";
  elements.feedback.className = "feedback";
  elements.nextButton.classList.add("hidden");
  elements.startButton.classList.add("hidden");
  elements.reviewButton.classList.add("hidden");

  elements.questionCard.innerHTML = `
    <p class="prompt-kicker">${escapeHtml(question.type)}</p>
    <h3>${escapeHtml(question.prompt)}</h3>
    <div class="visual-line" aria-label="题目提示">
      ${question.visual.map((item) => renderVisualToken(item)).join("")}
    </div>
  `;

  elements.choices.innerHTML = question.choices
    .map((choice, index) => `<button class="choice-button" type="button" data-choice-index="${index}">${escapeHtml(choice)}</button>`)
    .join("");

  state.selected = false;
}

function startLesson(lessonId = state.activeLessonId) {
  state.activeLessonId = lessonId;
  state.questionIndex = 0;
  state.selected = false;
  state.mode = "lesson";
  state.correctInLesson = 0;
  state.correctInReview = 0;
  state.sessionMissedIds = new Set();
  state.reviewQuestions = [];
  state.sessionQuestions = pickLessonQuestions(getActiveLesson());
  renderLessons();
  renderQuestion();
}

function startReview() {
  const lesson = getActiveLesson();
  const reviewQuestions = getMissedIds(lesson.id)
    .map((id) => lesson.questions.find((question) => question.id === id))
    .filter(Boolean);

  if (reviewQuestions.length === 0) {
    renderWelcome();
    return;
  }

  state.questionIndex = 0;
  state.selected = false;
  state.mode = "review";
  state.correctInReview = 0;
  state.reviewQuestions = reviewQuestions;
  state.sessionQuestions = [];
  renderLessons();
  renderQuestion();
}

function markDailyPlay() {
  if (state.progress.lastPlayed === today) {
    return;
  }

  const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
  state.progress.streak = state.progress.lastPlayed === yesterday ? state.progress.streak + 1 : 1;
  state.progress.lastPlayed = today;
}

function selectAnswer(choiceIndex, button) {
  if (state.selected) {
    return;
  }

  const lesson = getActiveLesson();
  const questions = getQuestionSet();
  const question = questions[state.questionIndex];
  const answer = question.choices[choiceIndex];
  const isCorrect = answer === question.answer;
  state.selected = true;

  markDailyPlay();

  if (isCorrect) {
    if (state.mode === "review") {
      state.correctInReview += 1;
      state.progress.xp += 5;
    } else {
      state.correctInLesson += 1;
      state.progress.xp += 10;
      state.progress.stars += 1;
    }

    const wasMissedQuestion = getMissedIds(lesson.id).includes(question.id);
    const masteryCount = wasMissedQuestion
      ? advanceReviewMastery(lesson.id, question.id)
      : reviewMasteryTarget;

    if (wasMissedQuestion && masteryCount >= reviewMasteryTarget) {
      clearMissedQuestion(lesson.id, question.id);
    }

    button.classList.add("correct");
    elements.feedback.textContent =
      wasMissedQuestion && masteryCount < reviewMasteryTarget
        ? `答对了！这道错题需要连续答对 ${reviewMasteryTarget} 次才会清除，还差 ${reviewMasteryTarget - masteryCount} 次。${question.explain}`
        : `答对了！${question.explain}`;
    elements.feedback.className = "feedback success";
  } else {
    if (state.mode === "lesson") {
      state.sessionMissedIds.add(question.id);
    }

    rememberMissedQuestion(lesson.id, question.id);
    button.classList.add("wrong");
    elements.feedback.textContent = `再想想。正确答案是 ${question.answer}。${question.explain}`;
    elements.feedback.className = "feedback error";
  }

  document.querySelectorAll(".choice-button").forEach((choiceButton) => {
    const choice = question.choices[Number(choiceButton.dataset.choiceIndex)];
    choiceButton.disabled = true;
    if (choice === question.answer) {
      choiceButton.classList.add("correct");
    }
  });

  renderStats();
  renderLessons();
  renderProgressDashboard();
  saveProgress();

  const isLastQuestion = state.questionIndex === questions.length - 1;
  elements.nextButton.textContent = isLastQuestion
    ? state.mode === "review"
      ? "完成复习"
      : "完成关卡"
    : "下一题";
  elements.nextButton.classList.remove("hidden");
}

function finishLesson() {
  const lesson = getActiveLesson();
  const questions = getQuestionSet();
  const saved = getLessonProgress(lesson.id);
  const missedCount = getMissedIds(lesson.id).length;

  state.progress.lessons[lesson.id] = {
    best: Math.max(saved.best, state.correctInLesson),
    attempts: saved.attempts + 1,
    lastScore: state.correctInLesson,
    completedAt: today
  };
  saveProgress();
  renderLessons();
  renderStats();
  renderProgressDashboard();
  renderProgressDashboard();

  elements.progressFill.style.width = "100%";
  elements.questionCount.textContent = `${questions.length} / ${questions.length}`;
  elements.questionCard.innerHTML = `
    <p class="prompt-kicker">关卡完成</p>
    <h3>${escapeHtml(lesson.title)}：答对 ${state.correctInLesson} / ${questions.length}</h3>
    <p class="support-text">本次从 ${lesson.questions.length} 道题库中抽取 ${questions.length} 道。再练一次会遇到不同题目。</p>
  `;
  elements.choices.innerHTML = "";
  elements.feedback.textContent = missedCount > 0 ? `还有 ${missedCount} 道题可以温习一下。` : "表现稳定，进入下一座小岛吧。";
  elements.feedback.className = missedCount > 0 ? "feedback" : "feedback success";
  elements.nextButton.classList.add("hidden");
  elements.startButton.textContent = "再练一次";
  elements.startButton.classList.remove("hidden");
  elements.reviewButton.textContent = "复习错题";
  elements.reviewButton.classList.toggle("hidden", missedCount === 0);
}

function finishReview() {
  const lesson = getActiveLesson();
  const remainingCount = getMissedIds(lesson.id).length;
  const total = state.reviewQuestions.length;

  saveProgress();
  renderLessons();
  renderStats();

  elements.progressFill.style.width = "100%";
  elements.questionCount.textContent = `${total} / ${total}`;
  elements.questionCard.innerHTML = `
    <p class="prompt-kicker">复习完成</p>
    <h3>${escapeHtml(lesson.title)}：复习答对 ${state.correctInReview} / ${total}</h3>
    <p class="support-text">复习只保存在本机浏览器中，不会上传孩子的学习数据。</p>
  `;
  elements.choices.innerHTML = "";
  elements.feedback.textContent = remainingCount > 0 ? `还剩 ${remainingCount} 道题可以再想一次。` : "这组错题已经清空了。";
  elements.feedback.className = remainingCount > 0 ? "feedback" : "feedback success";
  elements.nextButton.classList.add("hidden");
  elements.startButton.textContent = "回到关卡";
  elements.startButton.classList.remove("hidden");
  elements.reviewButton.textContent = "再复习一次";
  elements.reviewButton.classList.toggle("hidden", remainingCount === 0);
}

function goNext() {
  const questions = getQuestionSet();
  if (state.questionIndex >= questions.length - 1) {
    if (state.mode === "review") {
      finishReview();
    } else {
      finishLesson();
    }
    return;
  }

  state.questionIndex += 1;
  renderQuestion();
}

function resetProgress() {
  if (!window.confirm("确定要清空本机保存的学习进度吗？")) {
    return;
  }

  localStorage.removeItem(storageKey);
  state.progress = loadProgress();
  state.questionIndex = 0;
  state.selected = false;
  state.mode = "lesson";
  state.correctInLesson = 0;
  state.correctInReview = 0;
  state.sessionMissedIds = new Set();
  state.reviewQuestions = [];
  state.sessionQuestions = [];
  renderStats();
  renderLessons();
  renderProgressDashboard();
  renderWelcome();
}

function renderWelcome() {
  const lesson = getActiveLesson();
  const missedCount = getMissedIds(lesson.id).length;

  state.mode = "lesson";
  elements.lessonLabel.textContent = "欢迎上岛";
  elements.questionCount.textContent = `0 / ${practiceQuestionCount}`;
  elements.progressFill.style.width = "0%";
  elements.questionCard.innerHTML = `
    <p class="prompt-kicker">请选择一个关卡</p>
    <h3>每次练习会从题库中抽取 5 道题。</h3>
    <p class="support-text">题目会训练数感、规律、比较、应用题和空间观察。答案存在本机浏览器中，适合孩子每天短时间练习。</p>
  `;
  elements.choices.innerHTML = "";
  elements.feedback.textContent = missedCount > 0 ? `当前关卡有 ${missedCount} 道题可以复习。` : "";
  elements.feedback.className = "feedback";
  elements.nextButton.classList.add("hidden");
  elements.startButton.textContent = "开始第一关";
  elements.startButton.classList.remove("hidden");
  elements.reviewButton.textContent = "复习错题";
  elements.reviewButton.classList.toggle("hidden", missedCount === 0);
}

elements.lessonList.addEventListener("click", (event) => {
  const lessonButton = event.target.closest("[data-lesson-id]");
  if (!lessonButton) {
    return;
  }

  startLesson(lessonButton.dataset.lessonId);
});

elements.choices.addEventListener("click", (event) => {
  const choiceButton = event.target.closest("[data-choice-index]");
  if (!choiceButton) {
    return;
  }

  selectAnswer(Number(choiceButton.dataset.choiceIndex), choiceButton);
});

elements.startButton.addEventListener("click", () => startLesson());
elements.reviewButton.addEventListener("click", startReview);
elements.nextButton.addEventListener("click", goNext);
elements.resetProgress.addEventListener("click", resetProgress);

renderStats();
renderLessons();
renderProgressDashboard();
renderWelcome();
