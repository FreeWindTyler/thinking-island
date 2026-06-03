# Maintenance Plan

This plan is for building Thinking Island into a credible open-source education project before applying to Codex for Open Source.

## Week 1

- Upload the current project files to GitHub.
- Use `docs/GITHUB_WEB_UPLOAD_GUIDE.md` if uploading through the GitHub website.
- Confirm GitHub Actions runs successfully.
- Confirm both `npm run check` and `npm test` pass in CI.
- Confirm `npm run release:audit` passes in CI.
- Confirm `npm run application:preflight` passes in CI.
- Confirm CI does not require installing external npm packages.
- Keep `docs/APPLICATION_EVIDENCE_PACKET.md` up to date while public evidence is added.
- Create the first 3-5 real issues from `docs/ISSUES_TO_CREATE.md`.
- Enable GitHub Pages with `Source: GitHub Actions` and confirm the demo URL works.
- Publish `v0.1.0 - Initial prototype`.
- Keep the validation workflow green after every content change.

## Week 2

- Refine wrong-answer review UX based on early feedback.
- Add screenshots to README.
- Ask a parent, teacher, or contributor to review `docs/QUESTION_AUTHOR_GUIDE.md`.
- Invite feedback from at least one parent, teacher, or developer.
- Record feedback as GitHub issues.

## Week 3

- Refine visual question presentation on mobile and add screenshots.
- Add more first-grade topics.
- Add a lightweight contributor guide for question authors.
- Publish `v0.2.0` if enough user-facing improvements land.

## Application Readiness Signals

Before applying, the repository should ideally show:

- public repository with clear README
- online demo
- passing GitHub Actions
- real issues and resolved work
- at least one release
- visible maintenance activity over multiple days
- privacy-first and child-safety documentation
