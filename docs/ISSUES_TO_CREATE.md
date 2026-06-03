# Suggested GitHub Issues

These issues are intended to create a real public maintenance trail for Thinking Island. Do not create them all as empty placeholders; use them as concrete work items and close them only after the work is done.

## 1. Verify GitHub Pages demo and add screenshots

Title:

```text
Verify GitHub Pages demo and add screenshots
```

Body:

```text
The project includes a GitHub Pages deployment workflow. After enabling Pages with Source: GitHub Actions, we should verify the public demo and add screenshots to the README.

Tasks:

- confirm https://freewindtyler.github.io/thinking-island/ loads correctly
- complete one lesson from the public demo
- confirm wrong-answer review appears after missed questions
- add the demo link to README
- add desktop and mobile screenshots if possible
```

## 2. Add first release notes and publish v0.1.0

Title:

```text
Publish v0.1.0 initial prototype release
```

Body:

```text
After the GitHub Actions checks and Pages deployment are green, publish the first GitHub release.

Tasks:

- confirm `npm run check` and `npm test` pass in CI
- confirm GitHub Pages demo works
- use `docs/RELEASE_CHECKLIST.md`
- publish release title: `v0.1.0 - Initial prototype`
```

## 3. Refine wrong-answer review UX

Title:

```text
Refine wrong-answer review UX
```

Body:

```text
The first wrong-answer review mode is implemented. We should test it with real users and refine the child-facing flow.

Questions to answer:

- is the review button clear enough?
- should review rewards differ from lesson rewards?
- should the app show which questions were cleared?
- does the language feel encouraging and low-pressure?
```

## 4. Move lesson content toward contributor-friendly format

Title:

```text
Design a contributor-friendly lesson data format
```

Body:

```text
Lesson data now lives in data/lessons.js. This is easier than editing app logic, but future contributors may prefer JSON or a documented schema.

Questions to resolve:

- should we use JSON, JS, or another format?
- how do we keep direct index.html loading without a build step?
- should we document examples for each question type?
- how should we preserve stable question ids across content updates?
```

## 5. Review visual tokens on mobile

Title:

```text
Review visual tokens on mobile
```

Body:

```text
The first visual token rendering for colors and shapes is implemented. We should verify that it works well on small screens and remains easy for first-grade children to understand.

Initial scope:

- test color and shape questions on a phone-sized screen
- confirm token text remains readable
- confirm triangle and rectangle tokens do not overlap nearby content
- capture screenshots for README or release notes
```

## 6. Review question author guide with an educator or parent

Title:

```text
Review question author guide with an educator or parent
```

Body:

```text
The project now has docs/QUESTION_AUTHOR_GUIDE.md. We should ask at least one parent, teacher, or education-focused contributor to review whether the guide is clear enough for non-developers.

Questions to answer:

- are the examples easy to understand?
- are the content rules practical for first-grade math?
- is anything missing for teachers who want to contribute questions?
- should the guide include more examples or a shorter checklist?
```
