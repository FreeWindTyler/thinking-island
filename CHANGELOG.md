# Changelog

All notable changes to Thinking Island will be documented in this file.

## Unreleased

### Changed

- Strengthened wrong-answer review so missed questions require two consecutive correct answers before being cleared.
- Updated app-flow tests to cover reinforced mistake review behavior.
- Added a local learner progress dashboard with total attempts, completed lessons, current missed questions, and latest score.
- Expanded lesson progress storage with attempts and latest score while keeping data in local browser storage.
- Improved route layout and visual readability with wider lesson cards and wrapped progress tags.
- Refined project positioning to elementary math thinking practice while keeping the current route focused on grade 1 foundations for grades 1-3 expansion.
- Added lesson-level grade, grade band, domain, and level metadata for future lower-elementary question-bank growth.
- Added mobile demo screenshots to the README and application evidence packet.
- Refreshed the roadmap and maintenance plan for the current application-readiness phase.
- Improved child-facing wrong-answer review guidance for the two-correct-answer rule.

## 0.1.0 - 2026-06-02

### Added

- Initial static web app prototype.
- Added 5 first-grade math thinking lessons with an expanded question bank.
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
- Added generated first-grade question variants so each lesson has at least 10 questions.

### Changed

- Changed lesson sessions to draw 5 questions from a larger bank instead of replaying the same fixed 5 questions.
- Changed answer choices to shuffle for each new practice session.
- Split lesson content into `data/lessons.js` so contributors can maintain question data without editing application logic.
- Strengthened lesson validation with content quality checks for prompt length, explanation length, choice count, duplicate choices, empty visual tokens, and stable lesson ids.
- Added stable question ids and validation for unique ids within each lesson.
- Escaped lesson and choice text before rendering HTML so symbol choices such as `<` and `>` display safely.
- Updated GitHub Actions to run both validation and app-flow tests.
- Expanded app-flow tests to cover symbol choices and visual token rendering.
- Removed external `http-server` development dependency and simplified CI setup.
- Updated Validate workflow to run the release audit.
- Updated Validate workflow to run the application preflight.
