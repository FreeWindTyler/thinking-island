# Maintenance Plan

This plan is for building Thinking Island into a credible open-source education project before applying to Codex for Open Source.

## Current Status

- GitHub repository, MIT license, governance docs, and contributor docs are in place.
- GitHub Pages demo and `v0.1.0 - Initial prototype` are available.
- Validation, release audit, and application preflight scripts are part of the repository.
- The current public route is grade 1 foundations, with the product positioned for elementary math thinking practice and grades 1-3 expansion.
- The grade 1 foundation question bank has been expanded to 85 validated questions.
- README mobile screenshots are available for the home, practice, and feedback states.

## Next Two Weeks

- Keep one issue per maintenance topic and one focused commit whenever possible.
- Confirm `Validate` and `Deploy GitHub Pages` pass after each push.
- Keep `CHANGELOG.md` updated under `Unreleased` until a larger `v0.2.0` release candidate is justified.
- Refresh `docs/APPLICATION_EVIDENCE_PACKET.md` with current public links before submitting any application.

## Suggested Issue Order

- `Review and publish expanded grade 1 question bank`
- `Add demo screenshots to project documentation`
- `Refresh maintenance roadmap and application evidence`
- `Improve wrong-answer review guidance`
- `Plan grade 2-3 content expansion`

## Versioning Guidance

- Do not publish a new version for a single documentation-only change.
- Consider `v0.2.0` only after a visible set of improvements lands, such as question bank expansion, demo screenshots, and wrong-answer review guidance.
- Keep child privacy and local-only learning data as release blockers for any new feature.

## Application Readiness Signals

Before applying, the repository should ideally show:

- public repository with clear README
- online demo
- passing GitHub Actions
- real issues and resolved work
- at least one release
- visible maintenance activity over multiple days
- privacy-first and child-safety documentation
