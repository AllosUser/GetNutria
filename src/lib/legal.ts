import "server-only";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const legalEntityConfig = {
  brandName: "GetNutria",
  registeredBusinessName: "GET NUTRIA",
  legalForm: "Registered Business Name",
  legalFormEl: "Εγγεγραμμένη Εμπορική Επωνυμία",
  registeredProprietorName: "*****",
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
  vatNumber: "*****", taxIdentificationNumber: "*****", privacyEmail: "*****",
  legalEmail: "*****", supportEmail: "*****", billingEmail: "*****", dpoContact: "*****",
} as const;

export const legalDocuments = {
  privacy: { title: "GetNutria Privacy Notice (GDPR)", titleEl: "Ενημέρωση Απορρήτου GetNutria (GDPR)", audience: "All website visitors and account holders" },
  terms: { title: "Nutritionist Terms of Service — Including GDPR Responsibilities", titleEl: "Όροι Παροχής Υπηρεσιών για Διατροφολόγους — Συμπεριλαμβανομένων Υποχρεώσεων GDPR", audience: "Nutritionists and clinics" },
  dpa: { title: "Data Processing Agreement (GDPR Article 28)", titleEl: "Σύμβαση Επεξεργασίας Δεδομένων (GDPR, Άρθρο 28)", audience: "Nutritionists and clinics" },
  "client-terms": { title: "Client Terms of Use — Including Privacy and GDPR Information", titleEl: "Όροι Χρήσης Πελάτη — Συμπεριλαμβανομένων Πληροφοριών Απορρήτου και GDPR", audience: "Clients" },
  cookies: { title: "Cookie Policy (GDPR and ePrivacy)", titleEl: "Πολιτική Cookies (GDPR και ePrivacy)", audience: "All website visitors" },
  subprocessors: { title: "GetNutria Subprocessor List (GDPR)", titleEl: "Κατάλογος Υπεργολάβων Επεξεργασίας GetNutria (GDPR)", audience: "Security and subprocessor information" },
  security: { title: "Security and Data Protection Overview (GDPR)", titleEl: "Επισκόπηση Ασφάλειας και Προστασίας Δεδομένων (GDPR)", audience: "Security and subprocessor information" },
} as const;
export type LegalSlug = keyof typeof legalDocuments;
export const hasPendingLegalDetails = [legalEntityConfig.registeredProprietorName, legalEntityConfig.vatNumber, legalEntityConfig.taxIdentificationNumber, legalEntityConfig.privacyEmail, legalEntityConfig.legalEmail, legalEntityConfig.supportEmail, legalEntityConfig.billingEmail, legalEntityConfig.dpoContact].some((v) => v === "*****");
export async function getLegalMarkdown(slug: LegalSlug) {
  return readFile(join(process.cwd(), "content", "legal", `${slug}.md`), "utf8");
}
