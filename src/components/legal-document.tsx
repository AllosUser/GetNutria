import { Fragment, type ReactNode } from "react";

type Locale = "en" | "el";

const labels = {
  en: { contents: "Contents" },
  el: { contents: "Περιεχόμενα" },
} as const;

function inline(text: string) {
  return text.split(/(\*\*.*?\*\*|`.*?`)/g).map((part, i) =>
    part.startsWith("**") ? <strong key={i}>{part.slice(2, -2)}</strong> :
    part.startsWith("`") ? <code key={i}>{part.slice(1, -1)}</code> : <Fragment key={i}>{part}</Fragment>);
}

/**
 * Renders one locale's legal copy. Both locales are rendered into the page and
 * CSS (html[data-lang]) reveals exactly one, matching the zero-flicker <T />
 * pattern used elsewhere. Anchor ids are locale-prefixed so the two copies never
 * collide and so Greek headings, which slugify to nothing, still get stable ids.
 */
export function LegalDocument({ markdown, locale }: { markdown: string; locale: Locale }) {
  const lines = markdown.split(/\r?\n/).filter((l) => !l.startsWith("<!--"));
  const headingId = (index: number) => `${locale}-section-${index}`;

  const headings: { text: string; id: string }[] = [];
  lines.forEach((line) => {
    if (/^## /.test(line)) headings.push({ text: line.slice(3), id: headingId(headings.length) });
  });

  // Consecutive "- " lines become one real <ul>, so assistive technology
  // announces list length and wrapped items get a native hanging indent.
  const blocks: ReactNode[] = [];
  let listItems: string[] = [];
  let seen = 0;

  const flushList = () => {
    if (listItems.length === 0) return;
    blocks.push(
      <ul className="legal-list" key={`list-${blocks.length}`}>
        {listItems.map((item, i) => <li key={i}>{inline(item)}</li>)}
      </ul>
    );
    listItems = [];
  };

  lines.forEach((line, i) => {
    if (line.startsWith("- ")) { listItems.push(line.slice(2)); return; }
    flushList();
    if (line.startsWith("# ")) return;
    if (line.startsWith("## ")) {
      const id = headingId(seen++);
      blocks.push(<h2 id={id} key={i}>{line.slice(3)}</h2>);
      return;
    }
    if (line.startsWith("### ")) { blocks.push(<h3 key={i}>{line.slice(4)}</h3>); return; }
    if (!line.trim()) return;
    blocks.push(<p key={i}>{inline(line)}</p>);
  });
  flushList();

  return (
    <div className={`lang-${locale}`} lang={locale}>
      {headings.length > 3 && (
        <nav className="legal-toc-wrap" aria-label={labels[locale].contents}>
          <details className="legal-toc" open>
            <summary>{labels[locale].contents}</summary>
            <ol>{headings.map((h) => <li key={h.id}><a href={`#${h.id}`}>{h.text}</a></li>)}</ol>
          </details>
        </nav>
      )}
      <article className="legal-copy">{blocks}</article>
    </div>
  );
}
