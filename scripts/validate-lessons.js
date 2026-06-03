const fs = require("fs");
const vm = require("vm");

const source = fs.readFileSync("data/lessons.js", "utf8");
const sandbox = {
  window: {}
};

vm.runInNewContext(source, sandbox);
const lessons = sandbox.window.THINKING_ISLAND_LESSONS;
const errors = [];
const lessonIds = new Set();
const lessonIdPattern = /^[a-z][a-z0-9-]*$/;
const limits = {
  maxLessonTitleLength: 12,
  maxLessonDescriptionLength: 24,
  maxQuestionTypeLength: 12,
  maxPromptLength: 72,
  maxExplanationLength: 90,
  maxVisualTokenLength: 12,
  maxChoiceLength: 24,
  minChoices: 3,
  maxChoices: 5,
  minQuestionsPerLesson: 10
};

if (!Array.isArray(lessons) || lessons.length === 0) {
  errors.push("lessons must be a non-empty array.");
}

for (const [lessonIndex, lesson] of lessons.entries()) {
  const label = lesson.id || `lesson-${lessonIndex + 1}`;

  requireText(lesson.id, `${label}.id`);
  requireText(lesson.icon, `${label}.icon`);
  requireText(lesson.title, `${label}.title`);
  requireText(lesson.desc, `${label}.desc`);
  requireMaxLength(lesson.title, limits.maxLessonTitleLength, `${label}.title`);
  requireMaxLength(lesson.desc, limits.maxLessonDescriptionLength, `${label}.desc`);

  if (typeof lesson.id === "string" && !lessonIdPattern.test(lesson.id)) {
    errors.push(`${label}.id must be a stable lowercase slug.`);
  }

  if (lessonIds.has(lesson.id)) {
    errors.push(`${label}.id must be unique.`);
  }
  lessonIds.add(lesson.id);

  if (!Array.isArray(lesson.questions) || lesson.questions.length === 0) {
    errors.push(`${label}.questions must be a non-empty array.`);
    continue;
  }

  if (lesson.questions.length < limits.minQuestionsPerLesson) {
    errors.push(`${label}.questions must contain at least ${limits.minQuestionsPerLesson} questions.`);
  }

  const questionIds = new Set();
  for (const [questionIndex, question] of lesson.questions.entries()) {
    const questionLabel = `${label}.questions[${questionIndex}]`;
    requireText(question.id, `${questionLabel}.id`);
    requireText(question.type, `${questionLabel}.type`);
    requireText(question.prompt, `${questionLabel}.prompt`);
    requireText(question.answer, `${questionLabel}.answer`);
    requireText(question.explain, `${questionLabel}.explain`);

    if (typeof question.id === "string" && !lessonIdPattern.test(question.id)) {
      errors.push(`${questionLabel}.id must be a stable lowercase slug.`);
    }

    if (questionIds.has(question.id)) {
      errors.push(`${questionLabel}.id must be unique within ${label}.`);
    }
    questionIds.add(question.id);

    requireMaxLength(question.type, limits.maxQuestionTypeLength, `${questionLabel}.type`);
    requireMaxLength(question.prompt, limits.maxPromptLength, `${questionLabel}.prompt`);
    requireMaxLength(question.explain, limits.maxExplanationLength, `${questionLabel}.explain`);

    if (!Array.isArray(question.visual) || question.visual.length === 0) {
      errors.push(`${questionLabel}.visual must be a non-empty array.`);
    } else {
      for (const [visualIndex, token] of question.visual.entries()) {
        const tokenPath = `${questionLabel}.visual[${visualIndex}]`;
        requireText(token, tokenPath);
        requireMaxLength(token, limits.maxVisualTokenLength, tokenPath);
      }
    }

    if (!Array.isArray(question.choices) || question.choices.length < limits.minChoices) {
      errors.push(`${questionLabel}.choices must have at least ${limits.minChoices} options.`);
      continue;
    }

    if (question.choices.length > limits.maxChoices) {
      errors.push(`${questionLabel}.choices must have no more than ${limits.maxChoices} options.`);
    }

    const normalizedChoices = question.choices.map((choice) =>
      typeof choice === "string" ? choice.trim() : choice
    );
    const uniqueChoices = new Set(normalizedChoices);
    if (uniqueChoices.size !== normalizedChoices.length) {
      errors.push(`${questionLabel}.choices must not contain duplicates.`);
    }

    for (const [choiceIndex, choice] of question.choices.entries()) {
      const choicePath = `${questionLabel}.choices[${choiceIndex}]`;
      requireText(choice, choicePath);
      requireMaxLength(choice, limits.maxChoiceLength, choicePath);
    }

    if (!question.choices.includes(question.answer)) {
      errors.push(`${questionLabel}.answer must exist in choices.`);
    }
  }
}

if (errors.length > 0) {
  console.error("Lesson validation failed:");
  for (const error of errors) {
    console.error(`- ${error}`);
  }
  process.exit(1);
}

const questionCount = lessons.reduce((total, lesson) => total + lesson.questions.length, 0);
console.log(`Lesson validation passed: ${lessons.length} lessons, ${questionCount} questions.`);

function requireText(value, path) {
  if (typeof value !== "string" || value.trim() === "") {
    errors.push(`${path} must be a non-empty string.`);
  }
}

function requireMaxLength(value, maxLength, path) {
  if (typeof value === "string" && Array.from(value.trim()).length > maxLength) {
    errors.push(`${path} must be ${maxLength} characters or fewer.`);
  }
}
