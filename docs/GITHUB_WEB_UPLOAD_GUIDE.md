# GitHub Web Upload Guide

Use this guide when updating the repository through the GitHub website instead of the command line.

Repository:

https://github.com/FreeWindTyler/thinking-island

## Upload Files

1. Open the repository on GitHub.
2. Click `Add file -> Upload files`.
3. Drag the full contents of `E:\Codex\思维教育` into the upload area.
4. Wait for all files and folders to finish uploading.
5. Use a clear commit message, for example:

```text
Prepare v0.1.0 open-source release
```

6. Choose `Commit directly to the main branch`.
7. Click `Commit changes`.

## Important Folders to Include

- `.github`
- `data`
- `docs`
- `scripts`

Also include all root files such as `README.md`, `index.html`, `app.js`, `styles.css`, `package.json`, `LICENSE`, `CHANGELOG.md`, `SUPPORT.md`, and `.nojekyll`.

## After Uploading

Open the `Actions` tab and confirm these workflows pass:

- `Validate`
- `Deploy GitHub Pages`

Then open:

https://freewindtyler.github.io/thinking-island/

Confirm:

- the page loads
- lesson buttons are visible
- one lesson can be completed
- wrong-answer review appears after missed questions

## Before Applying to Codex for Open Source

Do not submit the application until these public signals exist:

- public repository is up to date
- `Validate` workflow is green
- `Deploy GitHub Pages` workflow is green
- online demo works
- at least 3 real issues exist
- `v0.1.0` release is published
