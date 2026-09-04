import { test, describe, before } from "node:test";
import assert from "node:assert/strict";
import { readFile, access } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const contentDir = resolve(root, "content/legal");
const builtDir = resolve(root, ".next/server/app");

const SLUGS = ["privacy", "dpa", "terms", "client-terms", "cookies", "subprocessors", "security"];
const ROUTES = [...SLUGS, "legal"];

const OPERATOR = "Andreas Kalvaris";
const PRIVACY_EMAIL = "privacy@getnutria.com";
const SECURITY_EMAIL = "security@getnutria.com";
const SUPPORT_EMAIL = "support@getnutria.com";

/** Draft markers and internal compliance notes that must never reach a public page. */
const FORBIDDEN_MARKERS = [
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
  "claude",
];

/** Claims contradicted by the verified production architecture. */
const FORBIDDEN_CLAIMS = [
  "vercel only hosts the frontend",
  "only hosts the frontend",
  "no health data passes through vercel",
  "only for non-personal recipe",
  "recipe-image generation at launch",
  "recipe images only",
];

/** Security controls that are not verified and must not be claimed. */
const UNVERIFIED_SECURITY_CLAIMS = [
  "mfa is enforced",
  "mfa enabled",
  "multi-factor authentication is enforced",
  "ssl enforcement is enabled",
  "database ssl enforcement",
  "ip allowlist",
  "network restrictions are enabled",
  "point-in-time recovery",
  "pitr",
  "iso 27001",
  "soc 2",
  "hipaa",
  "penetration test",
  "restore testing completed",
  "all data remains exclusively in the eu",
  "all processing occurs only in the eu",
];

const files = new Map();
let built = new Map();

async function exists(path) {
  try {
    await access(path);
    return true;
  } catch {
    return false;
  }
}

before(async () => {
  for (const slug of SLUGS) {
    for (const [locale, suffix] of [["en", ".md"], ["el", ".el.md"]]) {
      files.set(`${slug}:${locale}`, await readFile(resolve(contentDir, `${slug}${suffix}`), "utf8"));
    }
  }
  if (await exists(resolve(builtDir, "privacy.html"))) {
    for (const route of ROUTES) {
      built.set(route, await readFile(resolve(builtDir, `${route}.html`), "utf8"));
    }
  }
});

const body = (slug, locale) => files.get(`${slug}:${locale}`);

describe("legal source content", () => {
  test("every document exists in English and Greek", () => {
    for (const slug of SLUGS) {
      assert.ok(body(slug, "en")?.length > 500, `${slug} English copy missing or too short`);
      assert.ok(body(slug, "el")?.length > 500, `${slug} Greek copy missing or too short`);
    }
  });

  test("English documents are written in English", () => {
    for (const slug of SLUGS) {
      const greekLetters = (body(slug, "en").match(/[Ͱ-Ͽἀ-῿]/g) || []).length;
      // Only the Cyprus registration number "EE 63204 a" is legitimately Greek-scripted here.
      assert.ok(greekLetters < 30, `${slug}.md contains unexpected Greek text (${greekLetters} Greek characters)`);
    }
  });

  test("Greek documents are written in Greek", () => {
    for (const slug of SLUGS) {
      const text = body(slug, "el");
      const greekLetters = (text.match(/[Ͱ-Ͽἀ-῿]/g) || []).length;
      assert.ok(greekLetters > 1000, `${slug}.el.md is not substantially Greek (${greekLetters} Greek characters)`);
    }
  });

  test("Greek documents keep provider names and technical identifiers untranslated", () => {
    assert.match(body("subprocessors", "el"), /Vercel/);
    assert.match(body("subprocessors", "el"), /Supabase/);
    assert.match(body("subprocessors", "el"), /Railway/);
    assert.match(body("subprocessors", "el"), /OpenAI/);
    assert.match(body("subprocessors", "el"), /Cloudflare R2/);
    assert.match(body("subprocessors", "el"), /GET NUTRIA/);
    assert.match(body("privacy", "el"), /eu-west-1/);
    assert.match(body("privacy", "el"), /dub1/);
    assert.match(body("privacy", "el"), /GDPR/);
  });

  test("no document contains a placeholder or internal drafting note", () => {
    for (const slug of SLUGS) {
      for (const locale of ["en", "el"]) {
        const haystack = body(slug, locale).toLowerCase();
        for (const marker of FORBIDDEN_MARKERS) {
          assert.ok(
            !haystack.includes(marker.toLowerCase()),
            `${slug} (${locale}) contains the unpublishable marker "${marker}"`
          );
        }
      }
    }
  });

  test("no document contains a bare asterisk placeholder", () => {
    for (const slug of SLUGS) {
      for (const locale of ["en", "el"]) {
        for (const line of body(slug, locale).split(/\r?\n/)) {
          // Bold markers (**text**) are legitimate; a lone or run-of asterisks is not.
          const stripped = line.replace(/\*\*[^*]+\*\*/g, "");
          assert.ok(!/\*/.test(stripped), `${slug} (${locale}) has a leftover asterisk placeholder: ${line}`);
        }
      }
    }
  });

  test("the operator is named correctly in every document", () => {
    for (const slug of SLUGS) {
      for (const locale of ["en", "el"]) {
        assert.ok(body(slug, locale).includes(OPERATOR), `${slug} (${locale}) does not name the operator`);
        assert.ok(body(slug, locale).includes("GET NUTRIA"), `${slug} (${locale}) does not name the business`);
      }
    }
  });

  test("privacy contact appears where a privacy contact is required", () => {
    for (const slug of ["privacy", "cookies", "dpa", "subprocessors", "security", "client-terms", "terms"]) {
      for (const locale of ["en", "el"]) {
        assert.ok(body(slug, locale).includes(PRIVACY_EMAIL), `${slug} (${locale}) is missing ${PRIVACY_EMAIL}`);
      }
    }
  });

  test("security contact appears on the security overview", () => {
    for (const locale of ["en", "el"]) {
      assert.ok(body("security", locale).includes(SECURITY_EMAIL), `security (${locale}) is missing ${SECURITY_EMAIL}`);
    }
  });

  test("support contact appears where a support contact is required", () => {
    for (const slug of ["privacy", "terms", "client-terms", "security"]) {
      for (const locale of ["en", "el"]) {
        assert.ok(body(slug, locale).includes(SUPPORT_EMAIL), `${slug} (${locale}) is missing ${SUPPORT_EMAIL}`);
      }
    }
  });

  test("sales address is not used as the privacy or GDPR contact", () => {
    for (const slug of ["privacy", "cookies", "dpa", "subprocessors", "security"]) {
      for (const locale of ["en", "el"]) {
        assert.ok(
          !body(slug, locale).includes("sales@getnutria.com"),
          `${slug} (${locale}) uses the sales address as a data-protection contact`
        );
      }
    }
  });
});

describe("statements consistent with verified production architecture", () => {
  test("no document contradicts the verified architecture", () => {
    for (const slug of SLUGS) {
      const haystack = body(slug, "en").toLowerCase();
      for (const claim of FORBIDDEN_CLAIMS) {
        assert.ok(!haystack.includes(claim), `${slug} contains the contradicted claim "${claim}"`);
      }
    }
  });

  test("privacy notice does not describe Vercel as frontend-only", () => {
    const text = body("privacy", "en").toLowerCase();
    assert.ok(!text.includes("frontend only"), "privacy describes Vercel as frontend-only");
    assert.ok(!text.includes("only hosts the frontend"), "privacy describes Vercel as frontend-only");
    assert.match(body("privacy", "en"), /server-side compute/);
  });

  test("privacy notice states the verified database and compute regions", () => {
    assert.match(body("privacy", "en"), /Supabase in Ireland \(`eu-west-1`\)/);
    assert.match(body("privacy", "en"), /Dublin \(`dub1`\)/);
  });

  test("subprocessor list does not carry internal compliance statuses", () => {
    const text = body("subprocessors", "en").toLowerCase();
    for (const status of ["unverified", "compliance blocker", "launch status", "not approved", "disabled until"]) {
      assert.ok(!text.includes(status), `subprocessors contains the internal status "${status}"`);
    }
  });

  test("subprocessor list does not describe OpenAI as recipe-images-only", () => {
    const openaiSection = body("subprocessors", "en").split("### OpenAI")[1].split("###")[0];
    assert.ok(!/only/i.test(openaiSection.split("\n")[0]), "OpenAI purpose is narrowed with 'only'");
    assert.match(openaiSection, /health/i, "OpenAI entry does not disclose possible health data");
  });

  test("subprocessor list names every verified provider", () => {
    for (const provider of ["Vercel", "Supabase", "GitHub", "Cloudflare R2", "Railway", "OpenAI", "Resend", "Brevo", "WebSmsCY", "Charder"]) {
      assert.ok(body("subprocessors", "en").includes(provider), `subprocessors is missing ${provider}`);
      assert.ok(body("subprocessors", "el").includes(provider), `subprocessors (el) is missing ${provider}`);
    }
  });

  test("subprocessor list does not state a Railway region", () => {
    const railway = body("subprocessors", "en").split("### Railway")[1].split("## ")[0];
    assert.ok(!/region|Ireland|Dublin|United States|eu-west|us-east/i.test(railway), "Railway entry states a region");
  });

  test("subprocessor list does not present inactive monitoring services as active", () => {
    const text = body("subprocessors", "en");
    assert.ok(!/Sentry/i.test(text), "subprocessors lists Sentry");
    assert.ok(!/Vercel Analytics|Speed Insights/i.test(text), "subprocessors lists inactive analytics services");
  });
});

describe("security overview claims only verified controls", () => {
  test("does not claim unverified security controls", () => {
    for (const locale of ["en", "el"]) {
      const haystack = body("security", locale).toLowerCase();
      for (const claim of UNVERIFIED_SECURITY_CLAIMS) {
        assert.ok(!haystack.includes(claim), `security (${locale}) claims the unverified control "${claim}"`);
      }
    }
  });

  test("does not describe RLS as the primary authorisation layer", () => {
    const text = body("security", "en");
    assert.match(text, /defence-in-depth/i, "security does not frame RLS as defence-in-depth");
    assert.match(text, /supplements, rather than replaces/i, "security does not subordinate RLS to server-side checks");
  });

  test("describes the verified access and database controls", () => {
    const text = body("security", "en");
    assert.match(text, /Data API is disabled for production tables/i);
    assert.match(text, /server-mediated/i);
    assert.match(text, /Prisma/);
  });

  test("does not claim blanket absence of personal data in logs", () => {
    assert.match(
      body("security", "en"),
      /does not claim that no personal data appears anywhere/i,
      "security overstates the logging remediation"
    );
  });

  test("does not promise a fixed backup retention period", () => {
    for (const locale of ["en", "el"]) {
      const text = body("security", locale);
      assert.ok(!/14[- ]day|14 calendar days/i.test(text), `security (${locale}) promises a 14-day backup retention`);
    }
    assert.match(body("security", "en"), /operational backup-retention controls/i);
  });
});

describe("retention wording", () => {
  test("privacy notice does not promise a fixed backup expiry window", () => {
    const retention = body("privacy", "en").split("## 9. Data retention")[1].split("## 10.")[0];
    assert.ok(!/90 calendar days/i.test(retention), "privacy still promises a 90-day backup expiry");
    assert.ok(!/encrypted backup copies/i.test(retention), "privacy still claims encrypted backups");
    assert.match(retention, /operational backup-retention controls/i);
  });

  test("privacy notice keeps statutory and contractual retention periods", () => {
    const retention = body("privacy", "en").split("## 9. Data retention")[1].split("## 10.")[0];
    assert.match(retention, /7 years/, "statutory accounting retention was removed");
    assert.match(retention, /30 calendar days/, "contractual export period was removed");
  });

  test("DPA does not promise a fixed backup deletion deadline", () => {
    for (const locale of ["en", "el"]) {
      const text = body("dpa", locale);
      assert.ok(!/90 calendar days|90 ημερολογιακ/i.test(text), `dpa (${locale}) promises a 90-day backup deletion`);
    }
    assert.match(body("dpa", "en"), /operational backup-retention controls/i);
  });

  test("DPA keeps the contractual export and objection periods", () => {
    assert.match(body("dpa", "en"), /\*\*30 calendar days\*\*/);
    assert.match(body("dpa", "en"), /\*\*14 calendar days\*\*/);
  });
});

describe("cookie notice", () => {
  test("contains no unfinished analytics placeholder", () => {
    for (const locale of ["en", "el"]) {
      const text = body("cookies", locale);
      assert.ok(!/\[TO COMPLETE/i.test(text), `cookies (${locale}) has an unfinished analytics entry`);
      assert.ok(!/NOT USED/i.test(text), `cookies (${locale}) has a drafting instruction`);
    }
  });

  test("states that advertising cookies are not used", () => {
    assert.match(body("cookies", "en"), /does not use advertising or cross-site tracking cookies/i);
    assert.match(body("cookies", "el"), /δεν χρησιμοποιεί cookies διαφήμισης/i);
  });

  test("states that Vercel Analytics and Speed Insights are not enabled", () => {
    for (const locale of ["en", "el"]) {
      assert.match(body("cookies", locale), /Vercel Web Analytics/);
      assert.match(body("cookies", locale), /Speed Insights/);
    }
  });

  test("names only the browser storage keys that the source actually sets", () => {
    for (const locale of ["en", "el"]) {
      assert.match(body("cookies", locale), /`language`/);
      assert.match(body("cookies", locale), /`theme`/);
    }
  });
});

describe("rendered legal pages", () => {
  const needsBuild = () => built.size === 0;

  test("both locales are rendered into every legal page", (t) => {
    if (needsBuild()) return t.skip("run `npm run build` first to check rendered output");
    for (const route of ROUTES) {
      const html = built.get(route);
      assert.match(html, /class="lang-en"/, `${route} does not render English content`);
      assert.match(html, /class="lang-el"/, `${route} does not render Greek content`);
    }
  });

  test("document bodies render in both languages", (t) => {
    if (needsBuild()) return t.skip("run `npm run build` first to check rendered output");
    for (const slug of SLUGS) {
      const html = built.get(slug);
      assert.match(html, /class="lang-en" lang="en"/, `${slug} is missing the English document body`);
      assert.match(html, /class="lang-el" lang="el"/, `${slug} is missing the Greek document body`);
      const greekLetters = (html.match(/[Ͱ-Ͽ]/g) || []).length;
      assert.ok(greekLetters > 1000, `${slug} renders too little Greek text (${greekLetters} characters)`);
    }
  });

  test("locale switching swaps the legal copy", (t) => {
    if (needsBuild()) return t.skip("run `npm run build` first to check rendered output");
    // The English body is inside .lang-en and the Greek body inside .lang-el, so the
    // existing html[data-lang] CSS rules show exactly one of them. Strip <script>
    // tags first: the RSC flight payload serialises both locales and is not markup.
    const html = built.get("privacy").replace(/<script[\s\S]*?<\/script>/g, "");
    const enBlock = html.split('class="lang-en" lang="en"')[1].split('class="lang-el" lang="el"')[0];
    const elBlock = html.split('class="lang-el" lang="el"')[1];
    assert.match(enBlock, /primary production PostgreSQL database/);
    assert.ok(!/primary production PostgreSQL database/.test(elBlock), "Greek block repeats English copy");
    assert.match(elBlock, /Ενημέρωση Απορρήτου|βάση δεδομένων/);
  });

  test("heading anchors are unique across the two locales", (t) => {
    if (needsBuild()) return t.skip("run `npm run build` first to check rendered output");
    for (const slug of SLUGS) {
      const ids = built.get(slug).match(/id="(en|el)-section-\d+"/g) || [];
      assert.ok(ids.length > 0, `${slug} rendered no section anchors`);
      assert.equal(new Set(ids).size, ids.length, `${slug} has duplicate heading anchors`);
    }
  });

  test("no rendered page shows a placeholder or internal note", (t) => {
    if (needsBuild()) return t.skip("run `npm run build` first to check rendered output");
    for (const route of ROUTES) {
      const haystack = built.get(route).toLowerCase();
      for (const marker of FORBIDDEN_MARKERS) {
        assert.ok(!haystack.includes(marker.toLowerCase()), `${route} renders the marker "${marker}"`);
      }
    }
  });

  test("rendered pages show the correct operator and contacts", (t) => {
    if (needsBuild()) return t.skip("run `npm run build` first to check rendered output");
    for (const route of ROUTES) {
      assert.ok(built.get(route).includes(OPERATOR), `${route} does not name the operator`);
    }
    assert.ok(built.get("security").includes(SECURITY_EMAIL), "security page is missing the security contact");
    assert.ok(built.get("privacy").includes(PRIVACY_EMAIL), "privacy page is missing the privacy contact");
    assert.ok(built.get("legal").includes(PRIVACY_EMAIL), "legal centre is missing the privacy contact");
  });

  test("the legal centre links to every legal document", (t) => {
    if (needsBuild()) return t.skip("run `npm run build` first to check rendered output");
    for (const slug of SLUGS) {
      assert.match(built.get("legal"), new RegExp(`href="/${slug}"`), `legal centre does not link to /${slug}`);
    }
  });

  test("every internal link on a legal page resolves to a real route", (t) => {
    if (needsBuild()) return t.skip("run `npm run build` first to check rendered output");
    const known = new Set([...ROUTES.map((r) => `/${r}`), "/"]);
    for (const route of ROUTES) {
      const hrefs = [...built.get(route).matchAll(/href="(\/[^"#?]*)"/g)].map((m) => m[1]);
      for (const href of hrefs) {
        if (href.startsWith("/_next") || href.startsWith("/brand") || /\.[a-z0-9]+$/i.test(href)) continue;
        assert.ok(known.has(href), `${route} links to unknown route ${href}`);
      }
    }
  });

  test("each legal page links back to the legal centre", (t) => {
    if (needsBuild()) return t.skip("run `npm run build` first to check rendered output");
    for (const slug of SLUGS) {
      assert.match(built.get(slug), /href="\/legal"/, `${slug} has no link back to the legal centre`);
    }
  });

  test("the language-toggle CSS matches the classes the pages actually render", async (t) => {
    if (needsBuild()) return t.skip("run `npm run build` first to check rendered output");
    const css = await readFile(resolve(root, "src/app/globals.css"), "utf8");
    // These two rules are what make the language switch work; the rendered legal
    // bodies must use exactly the class names they target.
    assert.match(
      css,
      /html\[data-lang="el"\]\s+\.lang-en\s*\{\s*display:\s*none\s*!important;?\s*\}/,
      "the rule hiding English under the Greek locale is missing"
    );
    assert.match(
      css,
      /html:not\(\[data-lang="el"\]\)\s+\.lang-el\s*\{\s*display:\s*none\s*!important;?\s*\}/,
      "the rule hiding Greek under the English locale is missing"
    );
    for (const slug of SLUGS) {
      const html = built.get(slug);
      assert.match(html, /<div class="lang-en" lang="en">/, `${slug} English body is not targeted by the CSS rule`);
      assert.match(html, /<div class="lang-el" lang="el">/, `${slug} Greek body is not targeted by the CSS rule`);
    }
  });

  test("the table of contents is scoped to its own locale", (t) => {
    if (needsBuild()) return t.skip("run `npm run build` first to check rendered output");
    // A TOC outside the locale wrapper would stay visible in the other language.
    for (const slug of SLUGS) {
      const html = built.get(slug).replace(/<script[\s\S]*?<\/script>/g, "");
      const outside = html.split('<div class="lang-en" lang="en">')[0];
      assert.ok(!outside.includes("legal-toc"), `${slug} renders a table of contents outside a locale wrapper`);
    }
  });

  test("pages show the effective date and the last-updated date", (t) => {
    if (needsBuild()) return t.skip("run `npm run build` first to check rendered output");
    for (const route of ROUTES) {
      assert.match(built.get(route), /Last updated: 4 September 2026/, `${route} is missing the English last-updated date`);
      assert.match(built.get(route), /4 Σεπτεμβρίου 2026/, `${route} is missing the Greek last-updated date`);
      assert.match(built.get(route), /1 August 2026/, `${route} is missing the effective date`);
    }
  });
});
