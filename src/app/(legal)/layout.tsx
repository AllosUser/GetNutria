import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

export default function LegalLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <a className="skip-link" href="#legal-content">
        <span className="lang-en" lang="en">Skip to document</span>
        <span className="lang-el" lang="el">Μετάβαση στο έγγραφο</span>
      </a>
      <Navbar />
      <main className="legal-main" id="legal-content">{children}</main>
      <Footer />
    </>
  );
}
