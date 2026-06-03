const lessons = window.THINKING_ISLAND_LESSONS || [];

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
  progress: loadProgress()
};

const elements = {
  lessonList: document.querySelector("#lesson-list"),
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
    missedByLesson: {}
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
      missedByLesson: stored?.missedByLesson || fallback.missedByLesson
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
  return state.mode === "review" ? state.reviewQuestions : getActiveLesson().questions;
}

function getMissedIds(lessonId) {
  return state.progress.missedByLesson[lessonId] || [];
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

function rememberMissedQuestion(lessonId, questionId) {
  setMissedIds(lessonId, [...getMissedIds(lessonId), questionId]);
}

function clearMissedQuestion(lessonId, questionId) {
  setMissedIds(
    lessonId,
    getMissedIds(lessonId).filter((id) => id !== questionId)
  );
}

function renderStats() {
  elements.streak.textContent = state.progress.streak;
  elements.xp.textContent = state.progress.xp;
  elements.stars.textContent = state.progress.stars;
}

function renderLessons() {
  elements.lessonList.innerHTML = lessons
    .map((lesson) => {
      const saved = state.progress.lessons[lesson.id] || { best: 0 };
      const missedCount = getMissedIds(lesson.id).length;
      const isActive = lesson.id === state.activeLessonId ? " active" : "";
      const scoreText =
        missedCount > 0
          ? `${saved.best || 0} / ${lesson.questions.length} · 复习 ${missedCount}`
          : `${saved.best || 0} / ${lesson.questions.length}`;

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

    clearMissedQuestion(lesson.id, question.id);
    button.classList.add("correct");
    elements.feedback.textContent = `答对了！${question.explain}`;
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
  const saved = state.progress.lessons[lesson.id] || { best: 0 };
  const missedCount = getMissedIds(lesson.id).length;

  state.progress.lessons[lesson.id] = {
    best: Math.max(saved.best || 0, state.correctInLesson),
    completedAt: today
  };
  saveProgress();
  renderLessons();
  renderStats();

  elements.progressFill.style.width = "100%";
  elements.questionCount.textContent = `${lesson.questions.length} / ${lesson.questions.length}`;
  elements.questionCard.innerHTML = `
    <p class="prompt-kicker">关卡完成</p>
    <h3>${escapeHtml(lesson.title)}：答对 ${state.correctInLesson} / ${lesson.questions.length}</h3>
    <p class="support-text">今天已经完成一次思维训练。可以换一个关卡继续，也可以明天再来保持连续天数。</p>
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
  renderStats();
  renderLessons();
  renderWelcome();
}

function renderWelcome() {
  const lesson = getActiveLesson();
  const missedCount = getMissedIds(lesson.id).length;

  state.mode = "lesson";
  elements.lessonLabel.textContent = "欢迎上岛";
  elements.questionCount.textContent = `0 / ${lesson.questions.length}`;
  elements.progressFill.style.width = "0%";
  elements.questionCard.innerHTML = `
    <p class="prompt-kicker">请选择一个关卡</p>
    <h3>每个关卡包含 5 道题，答对会获得星星和经验值。</h3>
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
renderWelcome();
