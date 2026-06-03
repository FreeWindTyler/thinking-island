# v0.1.0 - Initial prototype

This first release introduces Thinking Island, a privacy-first open-source math thinking practice app for first-grade children.

## Highlights

- 5 lesson tracks: number sense, patterns, comparison, story problems, and spatial observation
- 25 total practice questions
- Stable question ids for future review, progress tracking, and learning reports
- Wrong-answer review mode using local browser storage
- Visual token rendering for colors and shapes
- Immediate feedback and child-friendly explanations
- XP, stars, streaks, and local browser progress storage
- Question author guide for parents, teachers, and contributors
- Zero-dependency local preview server
- Text, lesson, and app-flow validation scripts
- GitHub Actions validation workflow
- GitHub Pages deployment workflow for the public demo

## Privacy and Child Safety

- No login required
- No child profile required
- No cloud upload of learning progress
- No ads, tracking scripts, or ranking mechanics
- Missed-question review data stays in local browser storage

## Validation

Before publishing this release, run:

```powershell
npm run check
npm test
npm run release:audit
```

Expected local results:

- Text validation passes
- Lesson validation reports 5 lessons and 25 questions
- App-flow test confirms wrong-answer review clears missed questions
- Release audit confirms local release evidence is present

## Next Focus

- Upload all local files to GitHub
- Confirm Validate and Deploy GitHub Pages workflows are green
- Verify the public demo at https://freewindtyler.github.io/thinking-island/
- Add README screenshots after the public demo is available
- Collect early feedback from at least one parent, teacher, or contributor
