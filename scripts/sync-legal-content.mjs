import { access, mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const localCanonicalSource = resolve(here, "../../NutriTrackBeta/web/getnutria_gdpr_starter_pack_v1_0");
const source = process.env.LEGAL_SOURCE_DIR
  ? resolve(process.env.LEGAL_SOURCE_DIR)
  : localCanonicalSource;
const output = resolve(here, "../content/legal");
const documents = {
  privacy: "01-GETNUTRIA-PRIVACY-NOTICE-GDPR.md",
  dpa: "02-DATA-PROCESSING-AGREEMENT-GDPR-ARTICLE-28.md",
  terms: "03-NUTRITIONIST-TERMS-OF-SERVICE-GDPR.md",
  "client-terms": "05-CLIENT-TERMS-OF-USE-GDPR.md",
  cookies: "06-COOKIE-POLICY-GDPR-EPRIVACY.md",
  subprocessors: "07-SUBPROCESSOR-LIST-GDPR.md",
  security: "08-SECURITY-DATA-PROTECTION-OVERVIEW-GDPR.md",
};

async function exists(path) {
  try {
    await access(path);
    return true;
  } catch {
    return false;
  }
}

const canonicalPackAvailable = await exists(resolve(source, documents.privacy));
if (canonicalPackAvailable) {
  await mkdir(output, { recursive: true });
  for (const [slug, filename] of Object.entries(documents)) {
    const markdown = (await readFile(resolve(source, filename), "utf8"))
      .replaceAll("[TO COMPLETE]", "*****");
    const header = "<!-- Generated from GetNutria GDPR Legal Pack Version 1.0. Do not edit this generated copy directly. -->\n";
    await writeFile(resolve(output, `${slug}.md`), header + markdown, "utf8");
  }
  console.log(`Synced ${Object.keys(documents).length} public legal documents from the canonical pack.`);
} else {
  // Cloud builds intentionally do not depend on a sibling local repository.
  // The reviewed generated copies are committed to this repository for builds.
  for (const slug of Object.keys(documents)) {
    const generated = resolve(output, `${slug}.md`);
    if (!(await exists(generated))) {
      throw new Error(`Missing committed legal document: ${generated}. Run npm run legal:sync from a checkout with the canonical pack.`);
    }
    const markdown = await readFile(generated, "utf8");
    if (!markdown.startsWith("<!-- Generated from GetNutria GDPR Legal Pack Version 1.0.")) {
      throw new Error(`Generated legal document has an invalid source header: ${generated}`);
    }
    if (markdown.includes("[TO COMPLETE]")) {
      throw new Error(`Generated legal document contains an unresolved marker: ${generated}`);
    }
  }
  console.log(`Validated ${Object.keys(documents).length} committed legal documents for this standalone build.`);
}
