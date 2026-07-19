import { Fragment } from "react";

function inline(text: string) {
  return text.split(/(\*\*.*?\*\*|`.*?`)/g).map((part, i) =>
    part.startsWith("**") ? <strong key={i}>{part.slice(2, -2)}</strong> :
    part.startsWith("`") ? <code key={i}>{part.slice(1, -1)}</code> : <Fragment key={i}>{part}</Fragment>);
}
export function LegalDocument({ markdown }: { markdown: string }) {
  const lines = markdown.split(/\r?\n/).filter((l) => !l.startsWith("<!--"));
  const toc = lines.filter((l) => /^## /.test(l)).map((l) => l.slice(3));
  return <>
    {toc.length > 3 && <details className="legal-toc" open><summary>Contents / Περιεχόμενα</summary><ol>{toc.map((h) => <li key={h}><a href={`#${h.toLowerCase().replace(/[^a-z0-9]+/g,"-")}`}>{h}</a></li>)}</ol></details>}
    <article className="legal-copy">{lines.map((line, i) => {
      if (line.startsWith("# ")) return null;
      if (line.startsWith("## ")) { const h=line.slice(3); return <h2 id={h.toLowerCase().replace(/[^a-z0-9]+/g,"-")} key={i}>{h}</h2>; }
      if (line.startsWith("### ")) return <h3 key={i}>{line.slice(4)}</h3>;
      if (line.startsWith("- ")) return <p className="legal-list" key={i}>• {inline(line.slice(2))}</p>;
      if (!line.trim()) return null;
      return <p key={i}>{inline(line)}</p>;
    })}</article>
  </>;
}
