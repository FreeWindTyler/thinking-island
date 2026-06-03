# Governance

Thinking Island is currently maintained by `@FreeWindTyler` as the primary maintainer.

The project is early, so governance is intentionally lightweight. The goal is to keep decisions clear while protecting child safety, privacy, and learning quality.

## Maintainer Responsibilities

The primary maintainer is responsible for:

- reviewing code and content changes
- keeping the app privacy-first
- keeping child-facing language age-appropriate
- maintaining releases and roadmap priorities
- responding to issues and pull requests when possible
- rejecting changes that add tracking, advertising, pressure mechanics, or unsafe child data handling

## Decision Principles

Project decisions should prioritize:

1. child privacy and safety
2. clear first-grade learning value
3. low-pressure learning experience
4. maintainability for families, teachers, and contributors
5. simple self-hosting and zero unnecessary dependencies

## Content Changes

Question content changes should follow `docs/QUESTION_AUTHOR_GUIDE.md`.

Content pull requests should explain:

- the target thinking skill
- why the question is suitable for first-grade children
- how the explanation helps the child understand the answer

## Sensitive Changes

These changes require extra review before implementation:

- accounts or profiles
- cloud sync
- analytics
- AI-generated questions
- teacher or parent dashboards
- any collection of child learning data

For these changes, open an issue first and describe the privacy model before implementation.

## Releases

Before publishing a release, run:

```powershell
npm run check
npm test
npm run release:audit
```

Use `docs/RELEASE_CHECKLIST.md` and update `CHANGELOG.md`.

## Adding Maintainers

Additional maintainers can be added after they make sustained, high-quality contributions and demonstrate care for child safety, privacy, and education quality.
