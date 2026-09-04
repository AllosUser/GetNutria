import { access, readFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

// The public legal copy in content/legal is the reviewed source of truth for this
// site: it is edited here, published from here, and exists in an English and a
// Greek version per document. This script no longer overwrites it from the
// canonical drafting pack; it validates the committed copy before a build so a
// placeholder or an internal drafting note can never reach a public page.

const here = dirname(fileURLToPath(import.meta.url));
const content = resolve(here, "../content/legal");

const slugs = ["privacy", "dpa", "terms", "client-terms", "cookies", "subprocessors", "security"];
const locales = [
  { suffix: ".md", name: "English" },
  { suffix: ".el.md", name: "Greek" },
];

// Draft markers and internal compliance notes that must never be published.
const forbidden = [
  "*****",
  "[TO COMPLETE",
  "TODO",
  "FIXME",
  "pending verification",
  "pending final confirmation",
  "publication gate",
  "before publication",
  "must verify",
  "do not represent",
  "add before",
  "compliance blocker",
  "codex",
];

// Statements contradicted by the verified production architecture.
const contradictions = [
  "vercel only hosts the frontend",
  "recipe-image generation at launch",
  "only for non-personal recipe",
];

async function exists(path) {
  try {
    await access(path);
    return true;
  } catch {
    return false;
  }
}

const errors = [];

for (const slug of slugs) {
  for (const { suffix, name } of locales) {
    const file = resolve(content, `${slug}${suffix}`);
    if (!(await exists(file))) {
      errors.push(`Missing ${name} legal document: ${slug}${suffix}`);
      continue;
    }
    const markdown = await readFile(file, "utf8");
    const haystack = markdown.toLowerCase();

    if (!markdown.startsWith("<!-- Reviewed public copy.")) {
      errors.push(`${slug}${suffix}: missing the reviewed-copy source header`);
    }
    for (const marker of forbidden) {
      if (haystack.includes(marker.toLowerCase())) {
        errors.push(`${slug}${suffix}: contains the unpublishable marker "${marker}"`);
      }
    }
    for (const claim of contradictions) {
      if (haystack.includes(claim)) {
        errors.push(`${slug}${suffix}: contains a statement contradicted by production architecture ("${claim}")`);
      }
    }
    if (!/^# .+/m.test(markdown)) {
      errors.push(`${slug}${suffix}: missing a top-level document title`);
    }
  }
}

if (errors.length > 0) {
  console.error("Legal content validation failed:");
  for (const error of errors) console.error(`  - ${error}`);
  process.exit(1);
}

console.log(`Validated ${slugs.length} legal documents in English and Greek (${slugs.length * locales.length} files).`);
