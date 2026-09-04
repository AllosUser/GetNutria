import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { LegalDocument } from "@/components/legal-document";
import { getLegalMarkdown, legalDocuments, legalMetaLine, type LegalSlug } from "@/lib/legal";

export function generateStaticParams() {
  return Object.keys(legalDocuments).map((legalSlug) => ({ legalSlug }));
}

export async function generateMetadata({ params }: { params: Promise<{ legalSlug: string }> }): Promise<Metadata> {
  const { legalSlug } = await params;
  const d = legalDocuments[legalSlug as LegalSlug];
  return d ? { title: `${d.title} | GetNutria`, description: d.audience, alternates: { canonical: `/${legalSlug}` } } : {};
}

export default async function Page({ params }: { params: Promise<{ legalSlug: string }> }) {
  const { legalSlug } = await params;
  if (!(legalSlug in legalDocuments)) notFound();
  const slug = legalSlug as LegalSlug;
  const d = legalDocuments[slug];
  const [markdownEn, markdownEl] = await Promise.all([getLegalMarkdown(slug, "en"), getLegalMarkdown(slug, "el")]);

  return (
    <div className="legal-shell">
      <Link href="/legal" className="legal-back">
        <span className="lang-en">← Legal &amp; Privacy Centre</span>
        <span className="lang-el">← Νομικά &amp; Απόρρητο</span>
      </Link>
      <h1><span className="lang-en">{d.title}</span><span className="lang-el">{d.titleEl}</span></h1>
      <p className="legal-meta">
        <span className="lang-en">{legalMetaLine.en}</span>
        <span className="lang-el">{legalMetaLine.el}</span>
      </p>
      <LegalDocument markdown={markdownEn} locale="en" />
      <LegalDocument markdown={markdownEl} locale="el" />
    </div>
  );
}
