const fs = require("fs");
const vm = require("vm");

class FakeClassList {
  constructor() {
    this.values = new Set();
  }

  add(value) {
    this.values.add(value);
  }

  remove(value) {
    this.values.delete(value);
  }

  toggle(value, force) {
    if (force === undefined ? !this.values.has(value) : force) {
      this.values.add(value);
    } else {
      this.values.delete(value);
    }
  }

  contains(value) {
    return this.values.has(value);
  }
}

class FakeElement {
  constructor(id = "") {
    this.id = id;
    this.dataset = {};
    this.classList = new FakeClassList();
    this.listeners = {};
    this.disabled = false;
    this.textContent = "";
    this.style = {};
    this._innerHTML = "";
  }

  set innerHTML(value) {
    this._innerHTML = value;
    if (this.id === "choices") {
      fakeChoiceButtons.length = 0;
      for (const match of value.matchAll(/data-choice-index="(\d+)"[^>]*>(.*?)<\/button>/g)) {
        const button = new FakeElement("choice");
        button.dataset.choiceIndex = match[1];
        button.textContent = unescapeHtml(match[2]);
        fakeChoiceButtons.push(button);
      }
    }
  }

  get innerHTML() {
    return this._innerHTML;
  }

  addEventListener(type, handler) {
    this.listeners[type] = handler;
  }

  closest(selector) {
    if (selector === "[data-choice-index]" && this.dataset.choiceIndex !== undefined) {
      return this;
    }

    if (selector === "[data-lesson-id]" && this.dataset.lessonId !== undefined) {
      return this;
    }

    return null;
  }
}

function unescapeHtml(value) {
  return value
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");
}

function createSandbox() {
  const elements = new Map();
  const storage = new Map();
  fakeChoiceButtons.length = 0;

  for (const id of [
    "lesson-list",
    "progress-dashboard",
    "streak",
    "xp",
    "stars",
    "lesson-label",
    "question-count",
    "progress-fill",
    "question-card",
    "choices",
    "feedback",
    "start-button",
    "review-button",
    "next-button",
    "reset-progress"
  ]) {
    elements.set(id, new FakeElement(id));
  }

  const sandbox = {
    window: {
      confirm: () => true
    },
    document: {
      querySelector(selector) {
        return elements.get(selector.replace("#", ""));
      },
      querySelectorAll(selector) {
        return selector === ".choice-button" ? fakeChoiceButtons : [];
      }
    },
    localStorage: {
      getItem(key) {
        return storage.get(key) || null;
      },
      setItem(key, value) {
        storage.set(key, value);
      },
      removeItem(key) {
        storage.delete(key);
      }
    },
    Date,
    Math,
    Set,
    JSON,
    Number,
    String,
    Array,
    console
  };

  vm.createContext(sandbox);
  vm.runInContext(fs.readFileSync("data/lessons.js", "utf8"), sandbox);
  vm.runInContext(
    `${fs.readFileSync("app.js", "utf8")}
window.__test = {
  state,
  startLesson,
  selectAnswer,
  goNext,
  startReview,
  resetProgress,
  renderQuestion,
  renderProgressDashboard,
  getProgressSummary,
  getActiveLesson,
  getQuestionSet,
  getMissedIds,
  getReviewMastery,
  lessons
};`,
    sandbox
  );

  return {
    test: sandbox.window.__test,
    elements
  };
}

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

function answerCurrentQuestion(test, strategy) {
  const question = test.getQuestionSet()[test.state.questionIndex];
  const choiceIndex = strategy(question);
  test.selectAnswer(choiceIndex, fakeChoiceButtons[choiceIndex]);
  test.goNext();
}

const fakeChoiceButtons = [];
const { test, elements } = createSandbox();

assert(test.lessons.length === 5, "The current open route should still render 5 lessons.");
assert(
  test.lessons.every(
    (item) =>
      item.grade === 1 &&
      item.gradeBand === "lower" &&
      /^[a-z][a-z0-9-]*$/.test(item.domain) &&
      item.level === "foundation"
  ),
  "Current lessons should include lower-grade positioning metadata."
);

test.startLesson("number-sense");
const lesson = test.getActiveLesson();
const lessonQuestions = test.getQuestionSet();

assert(lesson.questions.length > 5, "Each lesson should have a larger question bank than one practice session.");
assert(lessonQuestions.length === 5, "A practice session should draw 5 questions from the larger bank.");
assert(
  elements.get("lesson-list").innerHTML.includes("lesson-meta-item"),
  "Lesson progress details should render as wrapped meta tags."
);

for (let index = 0; index < lessonQuestions.length; index += 1) {
  answerCurrentQuestion(test, (question) => question.choices.findIndex((choice) => choice !== question.answer));
}

const missedAfterLesson = test.getMissedIds("number-sense").length;
assert(missedAfterLesson > 0, "Wrong answers should create missed-question records.");
assert(test.state.mode === "lesson", "Finishing a lesson should return to lesson mode.");
assert(test.state.progress.lessons["number-sense"].attempts === 1, "Finishing a lesson should increment attempts.");
assert(test.state.progress.lessons["number-sense"].lastScore === 0, "Finishing a lesson should record the latest score.");
assert(test.getProgressSummary().totalAttempts === 1, "Progress summary should count total attempts.");
assert(test.getProgressSummary().totalMissed === missedAfterLesson, "Progress summary should count current missed questions.");
assert(
  elements.get("progress-dashboard").innerHTML.includes("学习概览") &&
    elements.get("progress-dashboard").innerHTML.includes("当前错题"),
  "Progress dashboard should render local learning overview and missed-question count."
);

test.startReview();
assert(test.state.mode === "review", "Review should start when missed questions exist.");

let guard = 0;
while (test.state.mode === "review" && guard < 10) {
  answerCurrentQuestion(test, (question) => question.choices.indexOf(question.answer));
  guard += 1;
}

const missedAfterFirstReview = test.getMissedIds("number-sense").length;
assert(missedAfterFirstReview === missedAfterLesson, "One correct review pass should keep missed questions for reinforcement.");

const firstMissedId = test.getMissedIds("number-sense")[0];
assert(
  test.getReviewMastery("number-sense", firstMissedId) === 1,
  "Correct review answers should record one mastery step."
);

test.startReview();
guard = 0;
while (test.state.mode === "review" && guard < 10) {
  answerCurrentQuestion(test, (question) => question.choices.indexOf(question.answer));
  guard += 1;
}

const missedAfterReview = test.getMissedIds("number-sense").length;
assert(missedAfterReview === 0, "Two correct review passes should clear missed questions.");
assert(test.state.progress.xp > 0, "Lesson and review answers should award XP.");

test.startLesson("compare");
test.state.sessionQuestions = [test.getActiveLesson().questions.find((question) => question.id === "compare-symbol")];
test.state.questionIndex = 0;
test.renderQuestion();
assert(fakeChoiceButtons.some((button) => button.textContent === "<"), "The < choice should render as visible text.");
assert(fakeChoiceButtons.some((button) => button.textContent === ">"), "The > choice should render as visible text.");

test.startLesson("patterns");
test.state.sessionQuestions = [test.getActiveLesson().questions.find((question) => question.id === "red-yellow-next")];
test.state.questionIndex = 0;
test.renderQuestion();
assert(
  elements.get("question-card").innerHTML.includes("token-color"),
  "Color pattern questions should render visual color tokens."
);

test.startLesson("space");
test.state.sessionQuestions = [test.getActiveLesson().questions.find((question) => question.id === "no-corners")];
test.state.questionIndex = 0;
test.renderQuestion();
assert(
  elements.get("question-card").innerHTML.includes("token-shape"),
  "Shape questions should render visual shape tokens."
);

const xpBeforeReset = test.state.progress.xp;
test.resetProgress();
assert(test.getProgressSummary().totalAttempts === 0, "Reset should clear total attempts.");
assert(test.getProgressSummary().totalMissed === 0, "Reset should clear missed questions.");
assert(
  elements.get("progress-dashboard").innerHTML.includes("<strong>0</strong>"),
  "Reset should render zero values in the progress dashboard."
);

console.log(
  JSON.stringify(
    {
      status: "passed",
      missedAfterLesson,
      missedAfterFirstReview,
      missedAfterReview,
      xp: xpBeforeReset,
      visualTokens: "passed"
    },
    null,
    2
  )
);
