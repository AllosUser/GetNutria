import { test, describe, before } from "node:test";
import assert from "node:assert/strict";
import { readFile, access } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const builtDir = resolve(root, ".next/server/app");

const SLUGS = ["privacy", "dpa", "terms", "client-terms", "cookies", "subprocessors", "security"];
const ROUTES = [...SLUGS, "legal"];
const SITE = "https://getnutria.com";

const built = new Map();
let css = "";
let navbar = "";
let context = "";
let sitemap = "";
let robots = "";

const exists = async (p) => { try { await access(p); return true; } catch { return false; } };
const head = (html) => html.split("</head>")[0];
const stripScripts = (html) => html.replace(/<script[\s\S]*?<\/script>/g, "");

before(async () => {
  css = await readFile(resolve(root, "src/app/globals.css"), "utf8");
  navbar = await readFile(resolve(root, "src/components/navbar.tsx"), "utf8");
  context = await readFile(resolve(root, "src/i18n/LanguageContext.tsx"), "utf8");
  if (await exists(resolve(builtDir, "privacy.html"))) {
    for (const r of ROUTES) built.set(r, await readFile(resolve(builtDir, `${r}.html`), "utf8"));
  }
  for (const [name, file] of [["sitemap", "sitemap.xml.body"], ["robots", "robots.txt.body"]]) {
    const p = resolve(builtDir, file);
    if (await exists(p)) {
      const c = await readFile(p, "utf8");
      if (name === "sitemap") sitemap = c; else robots = c;
    }
  }
});

const needsBuild = () => built.size === 0;
const skipMsg = "run `npm run build` first to check rendered output";

describe("routes and discoverability", () => {
  test("all eight legal routes are prerendered", (t) => {
    if (needsBuild()) return t.skip(skipMsg);
    for (const r of ROUTES) assert.ok(built.get(r)?.length > 1000, `/${r} did not prerender`);
  });

  test("the legal centre links to every legal document", (t) => {
    if (needsBuild()) return t.skip(skipMsg);
    for (const slug of SLUGS) {
      assert.match(built.get("legal"), new RegExp(`href="/${slug}"`), `legal centre is missing /${slug}`);
    }
  });

  test("the footer links to every legal route on every legal page", (t) => {
    if (needsBuild()) return t.skip(skipMsg);
    for (const route of ROUTES) {
      const html = built.get(route);
      for (const slug of ROUTES) {
        assert.match(html, new RegExp(`href="/${slug}"`), `/${route} footer is missing /${slug}`);
      }
    }
  });

  test("every internal link resolves to a real route", (t) => {
    if (needsBuild()) return t.skip(skipMsg);
    const known = new Set([...ROUTES.map((r) => `/${r}`), "/"]);
    for (const route of ROUTES) {
      for (const [, href] of built.get(route).matchAll(/href="(\/[^"#?]*)"/g)) {
        if (href.startsWith("/_next") || href.startsWith("/brand") || /\.[a-z0-9]+$/i.test(href)) continue;
        assert.ok(known.has(href), `/${route} links to unknown route ${href}`);
      }
    }
  });
});

describe("table of contents and anchors", () => {
  test("every TOC link resolves to a heading id on the same page", (t) => {
    if (needsBuild()) return t.skip(skipMsg);
    for (const slug of SLUGS) {
      const html = stripScripts(built.get(slug));
      const ids = new Set([...html.matchAll(/id="((?:en|el)-section-\d+)"/g)].map((m) => m[1]));
      const targets = [...html.matchAll(/href="#((?:en|el)-section-\d+)"/g)].map((m) => m[1]);
      assert.ok(targets.length > 0, `${slug} has no TOC links`);
      for (const target of targets) {
        assert.ok(ids.has(target), `${slug} TOC links to #${target} which has no heading`);
      }
    }
  });

  test("English and Greek anchor ids never collide", (t) => {
    if (needsBuild()) return t.skip(skipMsg);
    for (const slug of SLUGS) {
      const ids = [...stripScripts(built.get(slug)).matchAll(/id="((?:en|el)-section-\d+)"/g)].map((m) => m[1]);
      assert.equal(new Set(ids).size, ids.length, `${slug} has duplicate heading anchors`);
      assert.ok(ids.some((i) => i.startsWith("en-")), `${slug} has no English anchors`);
      assert.ok(ids.some((i) => i.startsWith("el-")), `${slug} has no Greek anchors`);
    }
  });

  test("each locale's TOC links only into its own locale", (t) => {
    if (needsBuild()) return t.skip(skipMsg);
    for (const slug of SLUGS) {
      const html = stripScripts(built.get(slug));
      const enBlock = html.split('<div class="lang-en" lang="en">')[1].split('<div class="lang-el" lang="el">')[0];
      const elBlock = html.split('<div class="lang-el" lang="el">')[1];
      assert.ok(!/href="#el-section-/.test(enBlock), `${slug} English TOC links into Greek sections`);
      assert.ok(!/href="#en-section-/.test(elBlock), `${slug} Greek TOC links into English sections`);
    }
  });

  test("the table of contents is a labelled navigation landmark", (t) => {
    if (needsBuild()) return t.skip(skipMsg);
    for (const slug of SLUGS) {
      const navs = [...built.get(slug).matchAll(/<nav class="legal-toc-wrap" aria-label="([^"]+)"/g)].map((m) => m[1]);
      assert.equal(navs.length, 2, `${slug} should have one contents landmark per locale`);
      assert.ok(navs.includes("Contents"), `${slug} is missing the English contents label`);
    }
  });

  test("headings clear the sticky header when linked to", () => {
    assert.match(css, /\.legal-copy h2\{[^}]*scroll-margin-top:7rem/, "h2 has no scroll-margin-top");
    assert.match(css, /\.legal-copy h3\{[^}]*scroll-margin-top:7rem/, "h3 has no scroll-margin-top");
  });
});

describe("language accessibility", () => {
  test("every locale block carries a matching lang attribute", (t) => {
    if (needsBuild()) return t.skip(skipMsg);
    for (const route of ROUTES) {
      const html = stripScripts(built.get(route));
      const bare = html.match(/<span class="lang-e[nl]"(?! lang=)/g) || [];
      assert.equal(bare.length, 0, `/${route} has ${bare.length} locale spans without a lang attribute`);
      assert.match(html, /<div class="lang-en" lang="en">|<span class="lang-en" lang="en">/);
      assert.match(html, /<div class="lang-el" lang="el">|<span class="lang-el" lang="el">/);
    }
  });

  test("mismatched lang attributes never appear", (t) => {
    if (needsBuild()) return t.skip(skipMsg);
    for (const route of ROUTES) {
      const html = built.get(route);
      assert.ok(!/class="lang-en" lang="el"/.test(html), `/${route} labels English content as Greek`);
      assert.ok(!/class="lang-el" lang="en"/.test(html), `/${route} labels Greek content as English`);
    }
  });

  test("the language control exposes its pressed state and is grouped", () => {
    // The switcher is client-only (SSR renders a static placeholder), so assert
    // on the source that actually runs in the browser.
    assert.match(navbar, /role="group"/, "language buttons are not grouped");
    assert.match(navbar, /aria-label="Language \/ [^"]+"/, "the language group has no accessible name");
    assert.match(navbar, /aria-pressed=\{language === "en"\}/, "the English button exposes no pressed state");
    assert.match(navbar, /aria-pressed=\{language === "el"\}/, "the Greek button exposes no pressed state");
    assert.match(navbar, /lang="el"[\s\S]{0,40}aria-pressed=\{language === "el"\}/, "the Greek button is not marked as Greek");
  });

  test("the hidden locale is hidden by CSS, not left visible", () => {
    assert.match(css, /html\[data-lang="el"\]\s+\.lang-en\s*\{\s*display:\s*none\s*!important/);
    assert.match(css, /html:not\(\[data-lang="el"\]\)\s+\.lang-el\s*\{\s*display:\s*none\s*!important/);
  });

  test("switching language keeps the user on the same route", () => {
    // Changing language must only write localStorage and the data-lang attribute.
    // Any navigation here would drop the reader out of the document they are on.
    assert.match(context, /localStorage\.setItem\("language", lang\)/, "language is not persisted");
    assert.match(context, /document\.documentElement\.setAttribute\("data-lang", lang\)/, "data-lang is not set");
    const setLanguage = context.slice(context.indexOf("const setLanguage"), context.indexOf("const t ="));
    for (const nav of ["router.push", "router.replace", "location.href", "location.assign", "window.location"]) {
      assert.ok(!setLanguage.includes(nav), `switching language navigates via ${nav}`);
    }
  });

  test("the locale preference is restored on load", () => {
    assert.match(context, /localStorage\.getItem\("language"\)/, "stored locale is never read back");
  });
});

describe("accessibility basics", () => {
  test("each legal page has a skip link pointing at the main landmark", (t) => {
    if (needsBuild()) return t.skip(skipMsg);
    for (const route of ROUTES) {
      const html = built.get(route);
      assert.match(html, /<a class="skip-link" href="#legal-content">/, `/${route} has no skip link`);
      assert.match(html, /<main class="legal-main" id="legal-content">/, `/${route} has no matching main landmark`);
    }
  });

  test("a visible focus indicator is defined for links and buttons", () => {
    assert.match(css, /a:focus-visible[^{]*\{[^}]*outline:\s*3px solid/, "no global focus-visible outline");
    assert.match(css, /button:focus-visible/, "buttons have no focus-visible rule");
  });

  test("the mobile menu button has an accessible name and expanded state", (t) => {
    if (needsBuild()) return t.skip(skipMsg);
    const html = built.get("privacy");
    assert.match(html, /aria-label="(Open|Close) menu"/, "menu button has no accessible name");
    assert.match(html, /aria-expanded="(true|false)"/, "menu button has no expanded state");
    assert.match(html, /aria-controls="mobile-menu"/, "menu button controls nothing");
  });

  test("bullet lists are real lists, not styled paragraphs", (t) => {
    if (needsBuild()) return t.skip(skipMsg);
    for (const slug of SLUGS) {
      const html = stripScripts(built.get(slug));
      assert.ok(!/<p class="legal-list">/.test(html), `${slug} still renders fake list paragraphs`);
      assert.match(html, /<ul class="legal-list">/, `${slug} renders no real lists`);
      assert.ok(!/<li>•/.test(html), `${slug} duplicates the bullet character inside list items`);
    }
  });

  test("exactly one h1 per page", (t) => {
    if (needsBuild()) return t.skip(skipMsg);
    for (const route of ROUTES) {
      const count = (stripScripts(built.get(route)).match(/<h1[\s>]/g) || []).length;
      assert.equal(count, 1, `/${route} has ${count} h1 elements`);
    }
  });

  test("email links use the approved addresses and are well formed", (t) => {
    if (needsBuild()) return t.skip(skipMsg);
    const allowed = new Set([
      "privacy@getnutria.com", "security@getnutria.com", "support@getnutria.com",
      "sales@getnutria.com", "hello@getnutria.com",
    ]);
    for (const route of ROUTES) {
      for (const [, addr] of built.get(route).matchAll(/href="mailto:([^"?]+)"/g)) {
        assert.ok(allowed.has(addr), `/${route} links to unexpected address ${addr}`);
        assert.match(addr, /^[^@\s]+@[^@\s]+\.[a-z]{2,}$/i, `/${route} has a malformed mailto: ${addr}`);
      }
    }
  });

  test("no mailto link carries tracking parameters", (t) => {
    if (needsBuild()) return t.skip(skipMsg);
    for (const route of ROUTES) {
      assert.ok(!/href="mailto:[^"]*[?&](utm_|ref=)/.test(built.get(route)), `/${route} has tracking on a mailto link`);
    }
  });
});

describe("responsive and overflow safety", () => {
  test("long words, identifiers and headings can wrap", () => {
    for (const sel of ["\\.legal-copy p", "\\.legal-copy code", "\\.legal-shell>h1", "\\.legal-identity"]) {
      assert.match(css, new RegExp(`${sel}\\{[^}]*overflow-wrap:break-word`), `${sel} cannot wrap long content`);
    }
  });

  test("inline code identifiers are styled and breakable", () => {
    assert.match(css, /\.legal-copy code\{[^}]*word-break:break-word/, "code cannot break");
    assert.match(css, /\.legal-copy code\{[^}]*background:/, "code has no visual distinction");
  });

  test("a long contents list is bounded on small screens", () => {
    assert.match(css, /@media\(max-width:640px\)\{[\s\S]*?\.legal-toc ol\{max-height:55vh;overflow-y:auto/,
      "the mobile TOC is not height-bounded");
  });

  test("interactive legal targets are large enough to tap", () => {
    assert.match(css, /\.legal-toc summary\{[^}]*min-height:2\.75rem/, "TOC summary is too small to tap");
    assert.match(css, /\.legal-back\{[^}]*min-height:2\.75rem/, "back link is too small to tap");
    assert.match(css, /\.legal-toc a\{[^}]*padding:\.4rem 0/, "TOC links have no vertical padding");
  });

  test("the reading column stays at a readable measure", () => {
    assert.match(css, /\.legal-copy\{max-width:75ch\}/, "the reading column lost its max-width");
  });
});

describe("print / save as PDF", () => {
  const printBlock = () => css.slice(css.indexOf("@media print{"));

  test("navigation chrome and the skip link are hidden when printing", () => {
    assert.match(printBlock(), /nav,footer,\.legal-back,\.skip-link\{display:none!important\}/);
  });

  test("the inactive language cannot print", () => {
    // The locale rules live outside any media query, so display:none applies to
    // print as well; nothing inside @media print may re-reveal them.
    const p = printBlock();
    assert.ok(!/\.lang-en\{[^}]*display:(block|inline|revert|initial)/.test(p), "print re-reveals English");
    assert.ok(!/\.lang-el\{[^}]*display:(block|inline|revert|initial)/.test(p), "print re-reveals Greek");
    assert.ok(!/\.lang-e[nl][^{]*\{[^}]*display:\s*(?!none)/.test(p), "print overrides a locale display rule");
  });

  test("headings stay with their content and text does not orphan", () => {
    const p = printBlock();
    assert.match(p, /break-after:avoid/, "headings can be stranded at a page break");
    assert.match(p, /orphans:3;widows:3/, "no orphan/widow control");
    assert.match(p, /\.legal-copy li\{break-inside:avoid\}/, "list items can split across pages");
  });

  test("the contents list is fully expanded and legible on paper", () => {
    assert.match(printBlock(), /\.legal-toc\[open\] ol\{max-height:none;overflow:visible/,
      "the mobile TOC height cap would clip the printed contents");
  });

  test("identifiers remain visible in print", () => {
    assert.match(printBlock(), /\.legal-copy code\{background:transparent!important;border:1px solid #999/);
  });
});

describe("SEO metadata", () => {
  test("every legal route has a unique, non-empty title", (t) => {
    if (needsBuild()) return t.skip(skipMsg);
    const titles = new Set();
    for (const route of ROUTES) {
      const m = head(built.get(route)).match(/<title>([^<]+)<\/title>/);
      assert.ok(m && m[1].trim().length > 10, `/${route} has no usable title`);
      assert.ok(!titles.has(m[1]), `/${route} duplicates the title "${m[1]}"`);
      titles.add(m[1]);
    }
  });

  test("every legal route has a unique meta description", (t) => {
    if (needsBuild()) return t.skip(skipMsg);
    const seen = new Set();
    for (const route of ROUTES) {
      const m = head(built.get(route)).match(/<meta name="description" content="([^"]+)"/);
      assert.ok(m, `/${route} has no meta description`);
      assert.ok(m[1].length >= 30 && m[1].length <= 200, `/${route} description length ${m[1].length} is out of range`);
      assert.ok(!seen.has(m[1]), `/${route} duplicates a description`);
      seen.add(m[1]);
    }
  });

  test("canonical URLs are absolute and match the route", (t) => {
    if (needsBuild()) return t.skip(skipMsg);
    for (const route of ROUTES) {
      const m = head(built.get(route)).match(/<link rel="canonical" href="([^"]+)"/);
      assert.ok(m, `/${route} has no canonical link`);
      assert.equal(m[1], `${SITE}/${route}`, `/${route} has the wrong canonical`);
    }
  });

  test("Open Graph title, description and URL are present", (t) => {
    if (needsBuild()) return t.skip(skipMsg);
    for (const route of ROUTES) {
      const h = head(built.get(route));
      assert.match(h, /<meta property="og:title"/, `/${route} has no og:title`);
      assert.match(h, /<meta property="og:description"/, `/${route} has no og:description`);
      assert.match(h, new RegExp(`<meta property="og:url" content="${SITE}/${route}"`), `/${route} has a wrong og:url`);
    }
  });

  test("no legal page is marked noindex", (t) => {
    if (needsBuild()) return t.skip(skipMsg);
    for (const route of ROUTES) {
      assert.ok(!/<meta name="robots"[^>]*noindex/.test(head(built.get(route))), `/${route} is noindex`);
    }
  });

  test("the sitemap lists every legal route", (t) => {
    if (!sitemap) return t.skip(skipMsg);
    for (const route of ROUTES) {
      assert.ok(sitemap.includes(`<loc>${SITE}/${route}</loc>`), `sitemap is missing /${route}`);
    }
    assert.ok(sitemap.includes(`<loc>${SITE}/</loc>`), "sitemap is missing the home page");
  });

  test("robots.txt allows crawling and points at the sitemap", (t) => {
    if (!robots) return t.skip(skipMsg);
    assert.match(robots, /User-Agent: \*/i);
    assert.match(robots, /Allow: \//);
    assert.ok(!/Disallow: \/\s*$/m.test(robots), "robots.txt blocks the whole site");
    assert.ok(robots.includes(`Sitemap: ${SITE}/sitemap.xml`), "robots.txt does not reference the sitemap");
  });

  test("no hreflang alternates are claimed for URLs that do not exist", (t) => {
    if (needsBuild()) return t.skip(skipMsg);
    // Both languages are served from one URL with client-side switching, so
    // per-locale alternate URLs would be fabricated.
    for (const route of ROUTES) {
      assert.ok(!/hreflang=/.test(head(built.get(route))), `/${route} claims hreflang alternates that do not exist`);
    }
  });
});

describe("date presentation", () => {
  test("effective and last-updated dates appear once per locale", (t) => {
    if (needsBuild()) return t.skip(skipMsg);
    for (const route of ROUTES) {
      const html = stripScripts(built.get(route));
      assert.equal((html.match(/Last updated: 4 September 2026/g) || []).length, 1,
        `/${route} shows the English last-updated date more than once`);
      assert.equal((html.match(/Τελευταία ενημέρωση: 4 Σεπτεμβρίου 2026/g) || []).length, 1,
        `/${route} shows the Greek last-updated date more than once`);
      assert.match(html, /Effective 1 August 2026/, `/${route} is missing the English effective date`);
      assert.match(html, /Σε ισχύ από 1 Αυγούστου 2026/, `/${route} is missing the Greek effective date`);
    }
  });
});
