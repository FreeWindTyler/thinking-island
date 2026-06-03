const fs = require("fs");
const vm = require("vm");

const errors = [];
const warnings = [];

const requiredFiles = [
  "index.html",
  "app.js",
  "styles.css",
  "data/lessons.js",
  "README.md",
  "LICENSE",
  "CONTRIBUTING.md",
  "SUPPORT.md",
  "GOVERNANCE.md",
  "ROADMAP.md",
  "SECURITY.md",
  "CHANGELOG.md",
  "AGENTS.md",
  "docs/CODEX_FOR_OSS_APPLICATION.md",
  "docs/APPLICATION_EVIDENCE_PACKET.md",
  "docs/GITHUB_PAGES_SETUP.md",
  "docs/GITHUB_WEB_UPLOAD_GUIDE.md",
  "docs/ISSUES_TO_CREATE.md",
  "docs/MAINTENANCE_PLAN.md",
  "docs/PUBLIC_LAUNCH_RUNBOOK.md",
  "docs/QUESTION_AUTHOR_GUIDE.md",
  "docs/RELEASE_CHECKLIST.md",
  "docs/RELEASE_NOTES_v0.1.0.md",
  ".github/CODEOWNERS",
  ".github/workflows/validate.yml",
  ".github/workflows/pages.yml",
  ".github/pull_request_template.md",
  ".github/ISSUE_TEMPLATE/bug_report.md",
  ".github/ISSUE_TEMPLATE/feature_request.md",
  ".github/ISSUE_TEMPLATE/question_content.md",
  ".nojekyll"
];

for (const file of requiredFiles) {
  if (!fs.existsSync(file)) {
    errors.push(`Missing required release file: ${file}`);
  }
}

const packageJson = readJson("package.json");
if (packageJson) {
  requireEqual(packageJson.name, "thinking-island", "package name");
  requireEqual(packageJson.version, "0.1.0", "package version");
  requireEqual(packageJson.license, "MIT", "package license");
  requireScript(packageJson, "check");
  requireScript(packageJson, "test");
  requireScript(packageJson, "serve");

  if (packageJson.dependencies) {
    errors.push("package.json should not define runtime dependencies for v0.1.0.");
  }

  if (packageJson.devDependencies) {
    errors.push("package.json should not define devDependencies for v0.1.0.");
  }
}

const readme = readText("README.md");
if (readme) {
  requireIncludes(readme, "https://github.com/FreeWindTyler/thinking-island", "README repository link");
  requireIncludes(readme, "https://freewindtyler.github.io/thinking-island/", "README demo link");
  requireIncludes(readme, "docs/QUESTION_AUTHOR_GUIDE.md", "README question author guide link");
  requireIncludes(readme, "SUPPORT.md", "README support link");
  requireIncludes(readme, "npm run check", "README check command");
  requireIncludes(readme, "npm test", "README test command");
}

const changelog = readText("CHANGELOG.md");
if (changelog) {
  requireIncludes(changelog, "## 0.1.0 - 2026-06-02", "CHANGELOG v0.1.0 entry");
  requireIncludes(changelog, "GitHub Pages", "CHANGELOG GitHub Pages mention");
  requireIncludes(changelog, "wrong-answer review", "CHANGELOG review feature mention");
}

const validateWorkflow = readText(".github/workflows/validate.yml");
if (validateWorkflow) {
  requireIncludes(validateWorkflow, "npm run check", "validate workflow check step");
  requireIncludes(validateWorkflow, "npm test", "validate workflow test step");
  requireNotIncludes(validateWorkflow, "npm install", "validate workflow dependency install");
}

const pagesWorkflow = readText(".github/workflows/pages.yml");
if (pagesWorkflow) {
  requireIncludes(pagesWorkflow, "actions/deploy-pages", "Pages deploy action");
  requireIncludes(pagesWorkflow, "npm run check", "Pages workflow check step");
  requireIncludes(pagesWorkflow, "npm test", "Pages workflow test step");
  requireNotIncludes(pagesWorkflow, "npm install", "Pages workflow dependency install");
}

const lessons = loadLessons();
if (lessons) {
  const questionCount = lessons.reduce((total, lesson) => total + lesson.questions.length, 0);
  requireEqual(lessons.length, 5, "lesson count");
  if (questionCount < 50) {
    errors.push(`question count should be at least 50, got ${questionCount}.`);
  }
  for (const lesson of lessons) {
    if (lesson.questions.length < 10) {
      errors.push(`${lesson.id} should have at least 10 questions, got ${lesson.questions.length}.`);
    }
  }
}

const releaseChecklist = readText("docs/RELEASE_CHECKLIST.md");
if (releaseChecklist) {
  requireIncludes(releaseChecklist, "v0.1.0 - Initial prototype", "release title");
  requireIncludes(releaseChecklist, "npm run check", "release checklist check command");
  requireIncludes(releaseChecklist, "npm test", "release checklist test command");
  if (releaseChecklist.includes("splitting lesson data") || releaseChecklist.includes("adding wrong-answer review")) {
    warnings.push("Release checklist suggested notes mention already-completed work as next focus.");
  }
}

const releaseNotes = readText("docs/RELEASE_NOTES_v0.1.0.md");
if (releaseNotes) {
  requireIncludes(releaseNotes, "v0.1.0 - Initial prototype", "release notes title");
  requireIncludes(releaseNotes, "Wrong-answer review mode", "release notes wrong-answer review mention");
  requireIncludes(releaseNotes, "GitHub Pages", "release notes GitHub Pages mention");
  requireIncludes(releaseNotes, "npm run release:audit", "release notes audit command");
}

const support = readText("SUPPORT.md");
if (support) {
  requireIncludes(support, "@FreeWindTyler", "SUPPORT maintainer mention");
  requireIncludes(support, "Child Safety and Privacy", "SUPPORT child safety section");
}

const codeowners = readText(".github/CODEOWNERS");
if (codeowners) {
  requireIncludes(codeowners, "* @FreeWindTyler", "CODEOWNERS primary maintainer");
}

const evidencePacket = readText("docs/APPLICATION_EVIDENCE_PACKET.md");
if (evidencePacket) {
  requireIncludes(evidencePacket, "https://github.com/FreeWindTyler/thinking-island", "evidence packet repository link");
  requireIncludes(evidencePacket, "Public Evidence Still Needed", "evidence packet remaining public evidence section");
  requireIncludes(evidencePacket, "Primary maintainer", "evidence packet maintainer section");
}

const governance = readText("GOVERNANCE.md");
if (governance) {
  requireIncludes(governance, "@FreeWindTyler", "GOVERNANCE maintainer mention");
  requireIncludes(governance, "Sensitive Changes", "GOVERNANCE sensitive changes section");
}

const launchRunbook = readText("docs/PUBLIC_LAUNCH_RUNBOOK.md");
if (launchRunbook) {
  requireIncludes(launchRunbook, "Smoke Test Demo", "launch runbook smoke test section");
  requireIncludes(launchRunbook, "v0.1.0 - Initial prototype", "launch runbook release title");
}

if (warnings.length > 0) {
  console.warn("Release audit warnings:");
  for (const warning of warnings) {
    console.warn(`- ${warning}`);
  }
}

if (errors.length > 0) {
  console.error("Release audit failed:");
  for (const error of errors) {
    console.error(`- ${error}`);
  }
  process.exit(1);
}

console.log("Release audit passed: v0.1.0 local release evidence is present.");

function readText(file) {
  try {
    return fs.readFileSync(file, "utf8");
  } catch {
    errors.push(`Could not read ${file}.`);
    return "";
  }
}

function readJson(file) {
  try {
    return JSON.parse(readText(file));
  } catch (error) {
    errors.push(`Could not parse ${file}: ${error.message}`);
    return null;
  }
}

function loadLessons() {
  try {
    const sandbox = { window: {} };
    vm.runInNewContext(readText("data/lessons.js"), sandbox);
    return sandbox.window.THINKING_ISLAND_LESSONS;
  } catch (error) {
    errors.push(`Could not load lessons: ${error.message}`);
    return null;
  }
}

function requireEqual(actual, expected, label) {
  if (actual !== expected) {
    errors.push(`${label} should be ${expected}, got ${actual}.`);
  }
}

function requireScript(packageJson, scriptName) {
  if (!packageJson.scripts?.[scriptName]) {
    errors.push(`package.json missing npm script: ${scriptName}`);
  }
}

function requireIncludes(text, expected, label) {
  if (!text.includes(expected)) {
    errors.push(`${label} missing: ${expected}`);
  }
}

function requireNotIncludes(text, unexpected, label) {
  if (text.includes(unexpected)) {
    errors.push(`${label} should not include: ${unexpected}`);
  }
}
