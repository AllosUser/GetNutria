import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const source = resolve(here, "../../NutriTrackBeta/web/getnutria_gdpr_starter_pack_v1_0");
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

await mkdir(output, { recursive: true });
for (const [slug, filename] of Object.entries(documents)) {
  const markdown = (await readFile(resolve(source, filename), "utf8"))
    .replaceAll("[TO COMPLETE]", "*****");
  const header = "<!-- Generated from GetNutria GDPR Legal Pack Version 1.0. Do not edit this generated copy directly. -->\n";
  await writeFile(resolve(output, `${slug}.md`), header + markdown, "utf8");
}
console.log(`Synced ${Object.keys(documents).length} public legal documents.`);
