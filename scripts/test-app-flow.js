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
  getActiveLesson,
  getQuestionSet,
  getMissedIds
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

test.startLesson("number-sense");
const lesson = test.getActiveLesson();

for (let index = 0; index < lesson.questions.length; index += 1) {
  answerCurrentQuestion(test, () => 0);
}

const missedAfterLesson = test.getMissedIds("number-sense").length;
assert(missedAfterLesson > 0, "Wrong answers should create missed-question records.");
assert(test.state.mode === "lesson", "Finishing a lesson should return to lesson mode.");

test.startReview();
assert(test.state.mode === "review", "Review should start when missed questions exist.");

let guard = 0;
while (test.state.mode === "review" && guard < 10) {
  answerCurrentQuestion(test, (question) => question.choices.indexOf(question.answer));
  guard += 1;
}

const missedAfterReview = test.getMissedIds("number-sense").length;
assert(missedAfterReview === 0, "Correct review answers should clear missed questions.");
assert(test.state.progress.xp > 0, "Lesson and review answers should award XP.");

test.startLesson("compare");
answerCurrentQuestion(test, (question) => question.choices.indexOf(question.answer));
answerCurrentQuestion(test, (question) => question.choices.indexOf(question.answer));
answerCurrentQuestion(test, (question) => question.choices.indexOf(question.answer));
assert(fakeChoiceButtons.some((button) => button.textContent === "<"), "The < choice should render as visible text.");
assert(fakeChoiceButtons.some((button) => button.textContent === ">"), "The > choice should render as visible text.");

test.startLesson("patterns");
assert(
  elements.get("question-card").innerHTML.includes("token-color"),
  "Color pattern questions should render visual color tokens."
);

test.startLesson("space");
assert(
  elements.get("question-card").innerHTML.includes("token-shape"),
  "Shape questions should render visual shape tokens."
);

console.log(
  JSON.stringify(
    {
      status: "passed",
      missedAfterLesson,
      missedAfterReview,
      xp: test.state.progress.xp,
      visualTokens: "passed"
    },
    null,
    2
  )
);
