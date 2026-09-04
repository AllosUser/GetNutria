import type { Metadata } from "next";
import Link from "next/link";
import { legalDocuments, legalEntityConfig, legalMetaLine } from "@/lib/legal";

const title = "Legal & Privacy Centre (GDPR) | GetNutria";
const description =
  "GetNutria legal documents: privacy notice, terms, data processing agreement, subprocessors, security and cookies.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/legal" },
  openGraph: { title, description, url: "/legal", siteName: "GetNutria", type: "website" },
  twitter: { card: "summary", title, description },
};

export default function LegalCentre() {
  const a = legalEntityConfig.businessAddress;
  const el = legalEntityConfig.businessAddressEl;

  return (
    <div className="legal-shell">
      <h1>
        <span className="lang-en" lang="en">Legal &amp; Privacy Centre (GDPR)</span>
        <span className="lang-el" lang="el">Νομικά &amp; Απόρρητο (GDPR)</span>
      </h1>
      <p className="legal-meta">
        <span className="lang-en" lang="en">{legalMetaLine.en}</span>
        <span className="lang-el" lang="el">{legalMetaLine.el}</span>
      </p>

      <p className="legal-identity">
        <span className="lang-en" lang="en">
          <strong>{legalEntityConfig.operatorLine}</strong><br />
          {legalEntityConfig.businessNameRegistrationNumberLabel}<br />
          {a.line1}, {a.district}, {a.postalCode} {a.city}, {a.country}
        </span>
        <span className="lang-el" lang="el">
          <strong>{legalEntityConfig.operatorLineEl}</strong><br />
          {legalEntityConfig.businessNameRegistrationNumberLabelEl}<br />
          {el.line1}, {el.district}, {el.postalCode} {el.city}, {el.country}
        </span>
      </p>

      <p className="legal-identity">
        <span className="lang-en" lang="en">
          Privacy enquiries: <a href={`mailto:${legalEntityConfig.privacyEmail}`}>{legalEntityConfig.privacyEmail}</a><br />
          Security matters: <a href={`mailto:${legalEntityConfig.securityEmail}`}>{legalEntityConfig.securityEmail}</a><br />
          Support: <a href={`mailto:${legalEntityConfig.supportEmail}`}>{legalEntityConfig.supportEmail}</a>
        </span>
        <span className="lang-el" lang="el">
          Ερωτήματα απορρήτου: <a href={`mailto:${legalEntityConfig.privacyEmail}`}>{legalEntityConfig.privacyEmail}</a><br />
          Θέματα ασφάλειας: <a href={`mailto:${legalEntityConfig.securityEmail}`}>{legalEntityConfig.securityEmail}</a><br />
          Υποστήριξη: <a href={`mailto:${legalEntityConfig.supportEmail}`}>{legalEntityConfig.supportEmail}</a>
        </span>
      </p>

      <div className="legal-grid">
        {Object.entries(legalDocuments).map(([slug, d]) => (
          <Link className="legal-card" href={`/${slug}`} key={slug}>
            <h2>
              <span className="lang-en" lang="en">{d.title}</span>
              <span className="lang-el" lang="el">{d.titleEl}</span>
            </h2>
            <p>
              <span className="lang-en" lang="en">{d.audience}</span>
              <span className="lang-el" lang="el">{d.audienceEl}</span>
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
