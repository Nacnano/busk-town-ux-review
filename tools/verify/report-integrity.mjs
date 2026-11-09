import { createHash } from "node:crypto";
import { existsSync, readFileSync, readdirSync } from "node:fs";
import { dirname, isAbsolute, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("../../", import.meta.url));
const errors = [];
const read = (path) => readFileSync(resolve(root, path), "utf8");
const hash = (path) => createHash("sha256").update(readFileSync(resolve(root, path))).digest("hex");
const references = (text) => [
  ...[...text.matchAll(/!?\[[^\]]*\]\(([^)]+)\)/g)].map((match) => match[1]),
  ...[...text.matchAll(/src="([^"]+)"/g)].map((match) => match[1]),
];

function checkLinks(directory) {
  for (const entry of readdirSync(directory, { withFileTypes: true })) {
    if ([".git", ".context", "node_modules"].includes(entry.name)) continue;
    const path = resolve(directory, entry.name);
    if (entry.isDirectory()) checkLinks(path);
    else if (entry.name.endsWith(".md")) {
      for (const target of references(readFileSync(path, "utf8"))) {
        if (/^[a-z][a-z0-9+.-]*:|^#/i.test(target)) continue;
        const local = resolve(dirname(path), decodeURIComponent(target.split("#")[0]));
        if (!existsSync(local)) errors.push(`Missing link in ${relative(root, path)}: ${target}`);
      }
    }
  }
}

function checkImages(entries, label) {
  const seen = new Set();
  for (const entry of entries) {
    const path = resolve(root, entry.image);
    if (seen.has(entry.image)) errors.push(`${label}: duplicate image ${entry.image}`);
    seen.add(entry.image);
    if (isAbsolute(entry.image) || relative(root, path).startsWith("..")) {
      errors.push(`${label}: image outside repository ${entry.image}`);
    } else if (!existsSync(path)) {
      errors.push(`${label}: missing image ${entry.image}`);
    } else if (hash(entry.image) !== entry.sha256) {
      errors.push(`${label}: hash mismatch ${entry.image}`);
    }
    for (const source of entry.sources ?? []) {
      if (!existsSync(resolve(root, source.path))) errors.push(`${label}: missing source ${source.path}`);
      else if (hash(source.path) !== source.sha256) errors.push(`${label}: source hash mismatch ${source.path}`);
    }
  }
}

checkLinks(root);
const original = JSON.parse(read("evidence/2026-10-07-recheck.json"));
const live = JSON.parse(read("evidence/2026-11-09-live-recheck.json"));
const final = JSON.parse(read("evidence/2026-11-09-final-audit.json"));
checkImages(original, "October captures");
checkImages(live, "November live captures");
checkImages(final.images, "Published images");
const published = [...read("README.md").matchAll(/<img\b[^>]*src="([^"]+)"/g)].map((match) => match[1]);
const recorded = new Set(final.images.map((entry) => entry.image));
for (const path of published) if (!recorded.has(path)) errors.push(`Published image absent from final manifest: ${path}`);
for (const path of recorded) if (!published.includes(path)) errors.push(`Final manifest contains an unpublished image: ${path}`);
if (errors.length) {
  console.error(errors.join("\n"));
  process.exitCode = 1;
} else {
  console.log(`PASS: all local links, ${original.length} original capture hashes, ${live.length} fresh capture hashes and ${published.length} published image hashes; publication coverage is complete.`);
}
