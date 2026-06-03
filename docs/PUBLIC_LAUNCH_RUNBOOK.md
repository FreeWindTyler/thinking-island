# Public Launch Runbook

Use this runbook after uploading the local project files to GitHub.

## 1. Confirm Repository Files

Open the repository root and confirm these are visible:

- `README.md`
- `LICENSE`
- `CONTRIBUTING.md`
- `SUPPORT.md`
- `SECURITY.md`
- `GOVERNANCE.md`
- `CHANGELOG.md`
- `.github`
- `data`
- `docs`
- `scripts`

## 2. Confirm Actions

Open the `Actions` tab.

Confirm the `Validate` workflow is green and includes:

- `Run checks`
- `Run tests`
- `Run release audit`

Confirm the `Deploy GitHub Pages` workflow is green.

## 3. Enable Pages

If Pages does not deploy automatically:

1. Open `Settings -> Pages`
2. Set `Build and deployment -> Source` to `GitHub Actions`
3. Re-run `Deploy GitHub Pages`

Expected demo URL:

https://freewindtyler.github.io/thinking-island/

## 4. Smoke Test Demo

In the public demo:

- open the page
- start the first lesson
- answer at least one question incorrectly
- finish the lesson
- confirm the review button appears
- complete wrong-answer review

## 5. Create Initial Issues

Create at least 3 real issues using `docs/ISSUES_TO_CREATE.md`.

Recommended first issues:

- Verify GitHub Pages demo and add screenshots
- Publish v0.1.0 initial prototype release
- Review question author guide with an educator or parent

## 6. Publish v0.1.0

Use:

- `docs/RELEASE_CHECKLIST.md`
- `docs/RELEASE_NOTES_v0.1.0.md`

Release title:

```text
v0.1.0 - Initial prototype
```

## 7. Update Evidence Packet

After public evidence exists, update `docs/APPLICATION_EVIDENCE_PACKET.md`:

- mark uploaded repository as complete
- mark green Actions as complete
- mark working Pages demo as complete
- link created issues
- link v0.1.0 release

Do not submit the Codex for Open Source application until the evidence packet reflects public, verifiable links.
