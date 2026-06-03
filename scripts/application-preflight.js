const fs = require("fs");

const requiredLocalEvidence = [
  "README.md",
  "LICENSE",
  "CONTRIBUTING.md",
  "SUPPORT.md",
  "SECURITY.md",
  "GOVERNANCE.md",
  "ROADMAP.md",
  "CHANGELOG.md",
  ".github/CODEOWNERS",
  ".github/workflows/validate.yml",
  ".github/workflows/pages.yml",
  "docs/APPLICATION_EVIDENCE_PACKET.md",
  "docs/CODEX_FOR_OSS_APPLICATION.md",
  "docs/PUBLIC_LAUNCH_RUNBOOK.md",
  "docs/QUESTION_AUTHOR_GUIDE.md",
  "docs/RELEASE_NOTES_v0.1.0.md"
];

const publicEvidenceNeeded = [
  "Upload all current local files to GitHub",
  "Validate workflow passes on GitHub",
  "Deploy GitHub Pages workflow passes on GitHub",
  "Public demo loads at https://freewindtyler.github.io/thinking-island/",
  "At least 3 real GitHub issues exist",
  "v0.1.0 release is published",
  "README screenshots are added after the demo is live",
  "OpenAI Organization ID is available"
];

const errors = [];

for (const file of requiredLocalEvidence) {
  if (!fs.existsSync(file)) {
    errors.push(`Missing local application evidence: ${file}`);
  }
}

const applicationDoc = readText("docs/CODEX_FOR_OSS_APPLICATION.md");
if (applicationDoc) {
  requireIncludes(applicationDoc, "Describe your role", "application role draft");
  requireIncludes(applicationDoc, "Why does this repository qualify?", "application qualification draft");
  requireIncludes(applicationDoc, "How will you use API credits for your project?", "application API credits draft");
  requireIncludes(applicationDoc, "Anything else we should know?", "application additional information draft");
}

const evidencePacket = readText("docs/APPLICATION_EVIDENCE_PACKET.md");
if (evidencePacket) {
  requireIncludes(evidencePacket, "Public Evidence Still Needed", "public evidence section");
  requireIncludes(evidencePacket, "Primary maintainer", "maintainer evidence");
}

if (errors.length > 0) {
  console.error("Application preflight failed:");
  for (const error of errors) {
    console.error(`- ${error}`);
  }
  process.exit(1);
}

console.log("Application preflight passed for local evidence.");
console.log("Public evidence still needed before submitting:");
for (const item of publicEvidenceNeeded) {
  console.log(`- ${item}`);
}

function readText(file) {
  try {
    return fs.readFileSync(file, "utf8");
  } catch {
    errors.push(`Could not read ${file}.`);
    return "";
  }
}

function requireIncludes(text, expected, label) {
  if (!text.includes(expected)) {
    errors.push(`${label} missing: ${expected}`);
  }
}
