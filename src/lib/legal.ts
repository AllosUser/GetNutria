import "server-only";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export type LegalLocale = "en" | "el";

export const legalEntityConfig = {
  brandName: "GetNutria",
  registeredBusinessName: "GET NUTRIA",
  registeredProprietorName: "Andreas Kalvaris",
  operatorLine: "Andreas Kalvaris, trading as GET NUTRIA",
  operatorLineEl: "Andreas Kalvaris, με την εμπορική επωνυμία GET NUTRIA",
  legalForm: "Registered Business Name",
  legalFormEl: "Εγγεγραμμένη Εμπορική Επωνυμία",
  businessNameRegistrationNumber: "ΕΕ 63204 α",
  businessNameRegistrationNumberLabel: "Business Name Registration No. ΕΕ 63204 α",
  businessNameRegistrationNumberLabelEl: "Αριθμός Εγγραφής Εμπορικής Επωνυμίας ΕΕ 63204 α",
  businessNameRegistrationDate: "2026-06-26",
  businessNameRegistrationDateDisplay: "26 June 2026",
  businessNameRegistrationDateDisplayEl: "26 Ιουνίου 2026",
  registeredAddress: { line1: "10 Nikou Karantoni", district: "Akropoli", postalCode: "2013", city: "Nicosia", country: "Cyprus" },
  registeredAddressEl: { line1: "Νίκου Καραντώνη 10", district: "Ακρόπολη", postalCode: "2013", city: "Λευκωσία", country: "Κύπρος" },
  businessAddress: { line1: "10 Nikou Karantoni", district: "Akropoli", postalCode: "2013", city: "Nicosia", country: "Cyprus" },
  businessAddressEl: { line1: "Νίκου Καραντώνη 10", district: "Ακρόπολη", postalCode: "2013", city: "Λευκωσία", country: "Κύπρος" },
  privacyEmail: "privacy@getnutria.com",
  securityEmail: "security@getnutria.com",
  supportEmail: "support@getnutria.com",
  salesEmail: "sales@getnutria.com",
} as const;

/** Single source of truth for the version/date line shown on every public legal page. */
export const legalVersion = {
  version: "1.1",
  effectiveDate: "2026-08-01",
  effectiveDateDisplay: "1 August 2026",
  effectiveDateDisplayEl: "1 Αυγούστου 2026",
  lastUpdated: "2026-09-04",
  lastUpdatedDisplay: "4 September 2026",
  lastUpdatedDisplayEl: "4 Σεπτεμβρίου 2026",
} as const;

export const legalMetaLine = {
  en: `Version ${legalVersion.version} · Effective ${legalVersion.effectiveDateDisplay} · Last updated: ${legalVersion.lastUpdatedDisplay}`,
  el: `Έκδοση ${legalVersion.version} · Σε ισχύ από ${legalVersion.effectiveDateDisplayEl} · Τελευταία ενημέρωση: ${legalVersion.lastUpdatedDisplayEl}`,
} as const;

export const legalDocuments = {
  privacy: {
    title: "GetNutria Privacy Notice (GDPR)",
    titleEl: "Ενημέρωση Απορρήτου GetNutria (GDPR)",
    audience: "All website visitors and account holders",
    audienceEl: "Όλοι οι επισκέπτες του ιστότοπου και οι κάτοχοι λογαριασμού",
    description: "How GetNutria collects, uses and protects personal data.",
  },
  terms: {
    title: "Nutritionist Terms of Service — Including GDPR Responsibilities",
    titleEl: "Όροι Παροχής Υπηρεσιών για Διατροφολόγους — Συμπεριλαμβανομένων Υποχρεώσεων GDPR",
    audience: "Nutritionists and clinics",
    audienceEl: "Διατροφολόγοι και κλινικές",
    description: "Terms of service for nutritionists, dietitians and clinics using GetNutria.",
  },
  dpa: {
    title: "Data Processing Agreement (GDPR Article 28)",
    titleEl: "Σύμβαση Επεξεργασίας Δεδομένων (GDPR, Άρθρο 28)",
    audience: "Nutritionists and clinics",
    audienceEl: "Διατροφολόγοι και κλινικές",
    description: "GetNutria Data Processing Agreement for professional customers.",
  },
  "client-terms": {
    title: "Client Terms of Use — Including Privacy and GDPR Information",
    titleEl: "Όροι Χρήσης Πελάτη — Συμπεριλαμβανομένων Πληροφοριών Απορρήτου και GDPR",
    audience: "Clients",
    audienceEl: "Πελάτες",
    description: "Terms of use for clients accessing the GetNutria client portal.",
  },
  cookies: {
    title: "Cookie Notice (GDPR and ePrivacy)",
    titleEl: "Ενημέρωση για τα Cookies (GDPR και ePrivacy)",
    audience: "All website visitors",
    audienceEl: "Όλοι οι επισκέπτες του ιστότοπου",
    description: "How GetNutria uses cookies and similar browser storage.",
  },
  subprocessors: {
    title: "GetNutria Subprocessor List (GDPR)",
    titleEl: "Κατάλογος Υπεκτελούντων την Επεξεργασία GetNutria (GDPR)",
    audience: "Service providers used to operate GetNutria",
    audienceEl: "Πάροχοι υπηρεσιών που χρησιμοποιούνται για τη λειτουργία του GetNutria",
    description: "Third-party service providers used to operate GetNutria.",
  },
  security: {
    title: "Security and Data Protection Overview (GDPR)",
    titleEl: "Επισκόπηση Ασφάλειας και Προστασίας Δεδομένων (GDPR)",
    audience: "Security and data protection information",
    audienceEl: "Πληροφορίες ασφάλειας και προστασίας δεδομένων",
    description: "Overview of GetNutria's security and data-protection practices.",
  },
} as const;

export type LegalSlug = keyof typeof legalDocuments;

export const legalSlugs = Object.keys(legalDocuments) as LegalSlug[];

/**
 * Reads the reviewed public copy for a document. English lives in `<slug>.md`
 * and Greek in `<slug>.el.md`; both are committed and validated at build time.
 */
export async function getLegalMarkdown(slug: LegalSlug, locale: LegalLocale = "en") {
  const filename = locale === "el" ? `${slug}.el.md` : `${slug}.md`;
  return readFile(join(process.cwd(), "content", "legal", filename), "utf8");
}
