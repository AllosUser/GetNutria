# Legal content

The public legal documents in `content/legal` are the reviewed source of truth for this site. Edit them here.

Each document exists in two locales:

- `<slug>.md` — English
- `<slug>.el.md` — Greek

Both are rendered into the page and CSS reveals the one matching the selected language, using the same `lang-en` / `lang-el` mechanism as the rest of the site. **When you change one locale, change the other in the same commit**, or the two languages will drift.

`npm run legal:sync` validates the committed copy: it checks that every document exists in both locales, carries the reviewed-copy header, and contains no draft placeholders or internal compliance notes. It runs automatically via `prebuild`, so a placeholder cannot reach production. It no longer regenerates these files from the drafting pack — an earlier version did, which meant a local build silently reverted reviewed public copy.

Changes to the substance of these documents are a legal matter, not only an editorial one. Do not add a factual claim about infrastructure, providers, retention or security controls unless it is verified. Never place internal policy, ROPA, DPIA, breach or retention documents in `content/legal` or `public`.
