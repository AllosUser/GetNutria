"use client";

import Image from "next/image";
import { T, TranslationKeys } from "@/i18n/LanguageContext";

export function Footer() {
  const currentYear = new Date().getFullYear();

  const columns = [
    {
      titleKey: "footer.columns.product",
      links: [
        { labelKey: "nav.features", href: "#features" },
        { labelKey: "nav.aiTools", href: "#ai-tools" },
        { labelKey: "nav.howItWorks", href: "#how-it-works" },
        { labelKey: "nav.bookDemo", href: "#book-demo" },
      ],
    },
    {
      titleKey: "footer.columns.company",
      links: [
        { labelKey: "nav.signIn", href: "https://app.getnutria.com/app" },
        { label: "support@getnutria.com", href: "mailto:support@getnutria.com" },
        { label: "sales@getnutria.com", href: "mailto:sales@getnutria.com" },
      ],
    },
  ] as const;

  return (
    <footer className="border-t border-[var(--border-light)] bg-[var(--surface)]">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
          <div className="col-span-2">
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className="flex items-center gap-2.5 mb-4"
            >
              <Image
                src="/brand/source-logo.png"
                alt="GetNutria"
                width={32}
                height={32}
                className="h-8 w-8 rounded-lg object-contain"
              />
              <Image
                src="/brand/getnutria-text-only.png"
                alt="GetNutria"
                width={120}
                height={24}
                className="h-5 w-auto object-contain"
              />
            </a>
            <p className="text-[13px] text-[var(--muted)] leading-relaxed max-w-xs">
              <T k="footer.description" />
            </p>
            <a href="mailto:hello@getnutria.com" className="mt-4 block text-[12px] text-[var(--muted)] hover:text-[var(--foreground)] transition-colors">
              hello@getnutria.com
            </a>
          </div>

          {columns.map((col) => (
            <div key={col.titleKey}>
              <h4 className="text-[12px] font-bold uppercase tracking-[0.15em] text-[var(--foreground)] mb-4">
                <T k={col.titleKey as TranslationKeys} />
              </h4>
              <ul className="space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className="text-[13px] text-[var(--muted)] hover:text-[var(--foreground)] transition-colors"
                    >
                      {"labelKey" in link ? <T k={link.labelKey as TranslationKeys} /> : link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 pt-6 border-t border-[var(--border-light)] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[12px] text-[var(--muted)]">
            &copy; {currentYear} GetNutria. <T k="footer.allRightsReserved" />
          </p>
        </div>
      </div>
    </footer>
  );
}
