# Release Checklist

Use this checklist before publishing a new GitHub release.

## v0.1.0

- [ ] Run `npm run check`
- [ ] Run `npm test`
- [ ] Run `npm run release:audit`
- [ ] Run `npm run application:preflight`
- [ ] Open `index.html` in a browser and complete one lesson
- [ ] Confirm README local run instructions are correct
- [ ] Confirm CHANGELOG includes the release
- [ ] Confirm GitHub Actions passes on `main`
- [ ] Confirm GitHub Pages deployment succeeds
- [ ] Confirm `https://freewindtyler.github.io/thinking-island/` loads
- [ ] Create release title: `v0.1.0 - Initial prototype`
- [ ] Add screenshots or a short demo GIF if available
- [ ] Publish GitHub release

## Suggested Release Notes

```text
v0.1.0 - Initial prototype

This first release introduces Thinking Island, a privacy-first open-source math thinking practice app for first-grade children.

Highlights:
- 5 lesson tracks: number sense, patterns, comparison, story problems, and spatial observation
- Expanded question bank with 64 total practice questions
- Each practice session draws 5 questions from the larger bank
- Stable question ids for future wrong-answer review and learning reports
- Wrong-answer review mode using local browser storage
- Visual token rendering for colors and shapes
- Immediate feedback and child-friendly explanations
- XP, stars, streaks, and local browser progress storage
- Open-source maintenance files, issue templates, PR template, validation script, and GitHub Actions workflow
- Automated app-flow test for wrong-answer review
- GitHub Pages deployment workflow for the public demo
- Question author guide for future content contributors
- Zero-dependency local preview server
- CODEOWNERS, SUPPORT, GitHub web upload guide, and application evidence packet
- Governance guide, public launch runbook, and application preflight
- Text, lesson, app-flow, and release-audit validation scripts

The project is still early. The next focus is uploading all local files to GitHub, confirming Actions and Pages are green, adding README screenshots, and collecting early parent/teacher feedback.
```
