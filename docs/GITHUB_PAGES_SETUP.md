# GitHub Pages Setup

The repository includes `.github/workflows/pages.yml`, which can deploy the static app to GitHub Pages after each push to `main`.

## Required Repository Setting

In GitHub, open:

`Settings -> Pages -> Build and deployment`

Then set:

- Source: `GitHub Actions`

After the next successful workflow run, the demo should be available at:

https://freewindtyler.github.io/thinking-island/

## Verification Checklist

- `Validate` workflow is green
- `Deploy GitHub Pages` workflow is green
- The demo loads `index.html`
- The lesson buttons appear
- One lesson can be completed
- Wrong-answer review appears after missed questions

## README Update

After the first successful deployment, keep the demo link in `README.md`:

```md
Online demo: <https://freewindtyler.github.io/thinking-island/>
```
