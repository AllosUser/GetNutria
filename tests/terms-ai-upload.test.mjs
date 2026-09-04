import { test, describe, before } from "node:test";
import assert from "node:assert/strict";
import { readFile, access } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const contentDir = resolve(root, "content/legal");
const builtDir = resolve(root, ".next/server/app");

const en = { path: "terms.md" };
const el = { path: "terms.el.md" };
let builtTerms = "";

const exists = async (p) => { try { await access(p); return true; } catch { return false; } };
const stripScripts = (h) => h.replace(/<script[\s\S]*?<\/script>/g, "");

before(async () => {
  en.text = await readFile(resolve(contentDir, en.path), "utf8");
  el.text = await readFile(resolve(contentDir, el.path), "utf8");
  const p = resolve(builtDir, "terms.html");
  if (await exists(p)) builtTerms = await readFile(p, "utf8");
});

/** The AI-upload guidance lives as a subsection of the AI/import section. */
const section = (doc, heading) => {
  const i = doc.indexOf(heading);
  assert.notEqual(i, -1, `heading not found: ${heading}`);
  const rest = doc.slice(i + heading.length);
  const end = rest.search(/\n## /);
  return end === -1 ? rest : rest.slice(0, end);
};

const EN_HEADING = "### AI-assisted document uploads";
const EL_HEADING = "### Μεταφορτώσεις εγγράφων σε λειτουργίες τεχνητής νοημοσύνης";

describe("AI-assisted document upload guidance", () => {
  test("the guidance exists in English", () => {
    assert.ok(en.text.includes(EN_HEADING), "English heading is missing");
    const body = section(en.text, EN_HEADING);
    assert.match(body, /Before uploading any client report, PDF or other document to an AI-assisted feature/);
    assert.match(body, /you should remove\s+unnecessary direct identifiers|you should remove unnecessary direct identifiers/);
  });

  test("the guidance exists in Greek", () => {
    assert.ok(el.text.includes(EL_HEADING), "Greek heading is missing");
    const body = section(el.text, EL_HEADING);
    assert.match(body, /Πριν μεταφορτώσετε οποιαδήποτε έκθεση πελάτη/);
    assert.match(body, /θα πρέπει να αφαιρείτε τα μη αναγκαία άμεσα αναγνωριστικά στοιχεία/);
  });

  test("it sits inside the AI and import features section, not a new top-level clause", () => {
    const enAi = section(en.text, "## 7. Optional AI and import features");
    assert.ok(enAi.includes(EN_HEADING), "English guidance is outside section 7");
    const elAi = section(el.text, "## 7. Προαιρετικές λειτουργίες τεχνητής νοημοσύνης και εισαγωγής δεδομένων");
    assert.ok(elAi.includes(EL_HEADING), "Greek guidance is outside section 7");
  });

  test("English names every required direct identifier", () => {
    const body = section(en.text, EN_HEADING).toLowerCase();
    for (const id of [
      "first name", "surname", "email address", "telephone number",
      "postal address", "date of birth", "identification", "patient/reference numbers",
    ]) {
      assert.ok(body.includes(id), `English guidance does not cover "${id}"`);
    }
  });

  test("Greek names every required direct identifier", () => {
    const body = section(el.text, EL_HEADING);
    for (const [label, term] of [
      ["first name", "ονόματος"],
      ["surname", "επωνύμου"],
      ["email address", "ηλεκτρονικού ταχυδρομείου"],
      ["telephone number", "αριθμού τηλεφώνου"],
      ["postal address", "ταχυδρομικής διεύθυνσης"],
      ["date of birth", "ημερομηνίας γέννησης"],
      ["identification numbers", "αριθμών ταυτοποίησης"],
      ["patient/reference numbers", "ασθενούς/αναφοράς"],
    ]) {
      assert.ok(body.includes(term), `Greek guidance does not cover ${label} ("${term}")`);
    }
  });

  test("both locales limit uploads to what is necessary and authorised", () => {
    assert.match(section(en.text, EN_HEADING),
      /Upload only the information necessary for the intended professional purpose and only where you are authorised to process that information/);
    const body = section(el.text, EL_HEADING);
    assert.match(body, /Μεταφορτώνετε μόνο τις πληροφορίες που είναι απαραίτητες/);
    assert.match(body, /μόνο εφόσον νομιμοποιείστε να επεξεργάζεστε/);
  });
});

describe("the guidance makes no anonymisation claim", () => {
  test("English states removal does not necessarily anonymise", () => {
    assert.match(section(en.text, EN_HEADING),
      /Removing direct identifiers does not necessarily make health information anonymous\./);
  });

  test("Greek states removal does not necessarily anonymise", () => {
    assert.match(section(el.text, EL_HEADING),
      /Η αφαίρεση των άμεσων αναγνωριστικών στοιχείων δεν καθιστά κατ' ανάγκη ανώνυμα τα δεδομένα υγείας\./);
  });

  test("neither locale claims the document becomes anonymous or de-identified", () => {
    const enBody = section(en.text, EN_HEADING);
    for (const claim of [
      /becomes? anonymous/i, /is anonymous/i, /fully anonymis/i, /renders? .{0,30}anonymous/i,
      /no longer personal data/i, /de-?identified/i,
    ]) {
      assert.ok(!claim.test(enBody), `English guidance claims anonymisation: ${claim}`);
    }
    const elBody = section(el.text, EL_HEADING);
    // Greek must only ever say "anonymous" inside the negated sentence.
    for (const m of elBody.match(/[^.]*ανώνυμ[^.]*\./g) || []) {
      assert.match(m, /δεν καθιστά κατ' ανάγκη/, `Greek makes an unqualified anonymity claim: ${m.trim()}`);
    }
  });

  test("neither locale promises GetNutria blocks health data from AI providers", () => {
    for (const { text, path } of [en, el]) {
      const body = text;
      for (const claim of [
        /GetNutria (prevents|blocks|stops)[^.]{0,60}(AI|provider)/i,
        /health data (is|are) never sent/i,
        /AI (features?|providers?)[^.]{0,40}only[^.]{0,30}anonym/i,
        /δεν αποστέλλονται ποτέ/,
      ]) {
        assert.ok(!claim.test(body), `${path} promises GetNutria blocks health data: ${claim}`);
      }
    }
  });

  test("consent alone is not presented as sufficient authorisation to upload", () => {
    const body = section(en.text, EN_HEADING);
    assert.ok(!/because you have|provided you have consent|with client consent you may|if the client consents, you may/i.test(body),
      "the guidance treats consent as blanket authorisation");
    assert.match(body, /only where you are authorised to process that information/,
      "the guidance does not tie uploading to authorisation");
  });
});

describe("no other legal document changed", () => {
  test("the guidance appears only in the Terms", async () => {
    const others = ["privacy", "dpa", "client-terms", "cookies", "subprocessors", "security"];
    for (const slug of others) {
      for (const suffix of [".md", ".el.md"]) {
        const text = await readFile(resolve(contentDir, `${slug}${suffix}`), "utf8");
        assert.ok(!text.includes("AI-assisted document uploads"), `${slug}${suffix} was modified`);
        assert.ok(!text.includes(EL_HEADING), `${slug}${suffix} was modified`);
      }
    }
  });

  test("the existing AI, controller/processor and Article 9 wording is intact", () => {
    // Untouched clauses that the new subsection must not have displaced.
    assert.match(en.text, /you normally act as data controller and GetNutria acts as data processor/);
    assert.match(en.text, /where health or other special-category data is processed, you have identified an applicable Article 9 condition/);
    assert.match(en.text, /You are responsible for deciding whether an optional AI feature is appropriate/);
    assert.match(en.text, /You must not upload data to an AI-enabled feature where doing so would violate law/);
    assert.match(el.text, /ενεργείτε κατά κανόνα ως υπεύθυνος επεξεργασίας και το GetNutria ενεργεί ως εκτελών την επεξεργασία/);
    assert.match(el.text, /εφαρμοστέα προϋπόθεση του Άρθρου 9/);
  });

  test("the effective and last-updated dates are unchanged", async () => {
    const legal = await readFile(resolve(root, "src/lib/legal.ts"), "utf8");
    assert.match(legal, /effectiveDate: "2026-08-01"/, "the effective date changed");
    assert.match(legal, /lastUpdated: "2026-09-04"/, "the last-updated date changed");
  });
});

describe("rendered output", () => {
  test("both locales render the guidance on /terms", (t) => {
    if (!builtTerms) return t.skip("run `npm run build` first to check rendered output");
    const html = stripScripts(builtTerms);
    const enBlock = html.split('<div class="lang-en" lang="en">')[1].split('<div class="lang-el" lang="el">')[0];
    const elBlock = html.split('<div class="lang-el" lang="el">')[1];
    assert.match(enBlock, /<h3>AI-assisted document uploads<\/h3>/, "English heading did not render");
    assert.match(enBlock, /Removing direct identifiers does not necessarily make health information anonymous\./);
    assert.match(elBlock, /<h3>Μεταφορτώσεις εγγράφων σε λειτουργίες τεχνητής νοημοσύνης<\/h3>/, "Greek heading did not render");
    assert.match(elBlock, /δεν καθιστά κατ&#x27;? ?ανάγκη ανώνυμα τα δεδομένα υγείας|δεν καθιστά κατ' ανάγκη ανώνυμα τα δεδομένα υγείας/);
  });

  test("the guidance does not leak across locales", (t) => {
    if (!builtTerms) return t.skip("run `npm run build` first to check rendered output");
    const html = stripScripts(builtTerms);
    const enBlock = html.split('<div class="lang-en" lang="en">')[1].split('<div class="lang-el" lang="el">')[0];
    const elBlock = html.split('<div class="lang-el" lang="el">')[1];
    assert.ok(!enBlock.includes("Μεταφορτώσεις εγγράφων"), "Greek guidance rendered in the English block");
    assert.ok(!elBlock.includes("AI-assisted document uploads"), "English guidance rendered in the Greek block");
  });

  test("adding an h3 did not change the table of contents", (t) => {
    if (!builtTerms) return t.skip("run `npm run build` first to check rendered output");
    // The TOC lists only "## " headings; a subsection must not appear in it.
    const html = stripScripts(builtTerms);
    const toc = html.slice(html.indexOf("legal-toc"), html.indexOf("</details>"));
    assert.ok(!toc.includes("AI-assisted document uploads"), "the subsection leaked into the contents list");
  });
});
