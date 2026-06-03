const fs = require("fs");
const path = require("path");

const checkedExtensions = new Set([".html", ".css", ".js", ".json", ".md", ".yml"]);
const ignoredDirectories = new Set([".git", "node_modules"]);
const mojibakeMarkers = [
  [0x93ac],
  [0x93c1],
  [0x68f0, 0x6a3a, 0x7c31],
  [0x7edb, 0x65bf],
  [0x934f, 0x51b2],
  [0x6fb6, 0x5d84, 0x7bc4],
  [0x951b]
].map((codePoints) => String.fromCodePoint(...codePoints));
const errors = [];

walk(".");

if (errors.length > 0) {
  console.error("Text validation failed:");
  for (const error of errors) {
    console.error(`- ${error}`);
  }
  process.exit(1);
}

console.log("Text validation passed: no replacement characters found.");

function walk(directory) {
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    if (ignoredDirectories.has(entry.name)) {
      continue;
    }

    const fullPath = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      walk(fullPath);
      continue;
    }

    if (!checkedExtensions.has(path.extname(entry.name))) {
      continue;
    }

    const text = fs.readFileSync(fullPath, "utf8");
    if (text.includes("\uFFFD")) {
      errors.push(`${fullPath} contains Unicode replacement characters.`);
    }

    for (const marker of mojibakeMarkers) {
      if (text.includes(marker)) {
        errors.push(`${fullPath} contains possible mojibake marker: ${marker}`);
      }
    }
  }
}
