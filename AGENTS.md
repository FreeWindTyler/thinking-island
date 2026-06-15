# AGENTS.md

This file gives coding agents and maintainers the project rules for Thinking Island.

## Project Goal

Build an open-source, privacy-first elementary math thinking practice app. The project should remain especially friendly for grades 1-3, with the current public route focused on first-grade foundation practice. The app should feel lightweight and motivating, while avoiding pressure, ranking, tracking, or data collection.

## Current Stack

- Static HTML, CSS, and JavaScript
- No build step required
- No external npm dependencies are required for check, test, or local preview
- Lesson data currently lives in `data/lessons.js`
- Local progress is stored in browser `localStorage`

## Development Rules

- Keep the app runnable by opening `index.html` directly.
- Keep child-facing Chinese copy short, concrete, and encouraging.
- Do not add tracking, ads, account collection, or unnecessary third-party scripts.
- Any new lesson must include `grade`, `gradeBand`, `domain`, and `level`.
- Any new question must include `id`, `type`, `prompt`, `visual`, `choices`, `answer`, and `explain`.
- Question ids must be stable lowercase slugs and unique within the lesson.
- The correct answer must be present in `choices`.
- Run `npm run check`, `npm test`, `npm run release:audit`, and `npm run application:preflight` before release or application-related changes.

## Near-Term Priorities

- Add release documentation and online demo instructions.
- Refine wrong-answer review based on user feedback.
- Verify visual tokens on mobile and keep them readable for young learners.
