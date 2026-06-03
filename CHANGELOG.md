# Changelog

All notable changes to Thinking Island will be documented in this file.

## 0.1.0 - 2026-06-02

### Added

- Initial static web app prototype.
- Added 5 first-grade math thinking lessons with 25 total questions.
- Added immediate feedback, explanations, XP, stars, streaks, and local progress storage.
- Added wrong-answer review mode backed by stable question ids and local browser storage.
- Added visual token rendering for colors and shapes in practice prompts.
- Added open-source project files: README, MIT License, contributing guide, roadmap, security policy, and application preparation notes.
- Added lesson validation script and GitHub Actions workflow.
- Added automated app-flow test for wrong-answer review behavior.
- Added text validation to catch Unicode replacement characters in source files.
- Added GitHub Pages deployment workflow for the public demo.
- Added question author guide for parents, teachers, and contributors.
- Added zero-dependency local preview server using Node.js built-in modules.
- Added release audit script and v0.1.0 release notes draft.
- Added CODEOWNERS, SUPPORT, GitHub web upload guide, and Codex application evidence packet.
- Added GOVERNANCE, public launch runbook, and application preflight script.

### Changed

- Split lesson content into `data/lessons.js` so contributors can maintain question data without editing application logic.
- Strengthened lesson validation with content quality checks for prompt length, explanation length, choice count, duplicate choices, empty visual tokens, and stable lesson ids.
- Added stable question ids and validation for unique ids within each lesson.
- Escaped lesson and choice text before rendering HTML so symbol choices such as `<` and `>` display safely.
- Updated GitHub Actions to run both validation and app-flow tests.
- Expanded app-flow tests to cover symbol choices and visual token rendering.
- Removed external `http-server` development dependency and simplified CI setup.
- Updated Validate workflow to run the release audit.
- Updated Validate workflow to run the application preflight.
