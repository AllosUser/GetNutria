"use client";

import { AnimatedSection } from "./animated-section";
import { Users, Utensils, FileText, Calendar } from "lucide-react";
import { T, TranslationKeys } from "@/i18n/LanguageContext";

export function SocialProof() {
  return (
    <section className="py-16 md:py-20 border-y border-[var(--border-light)]">
      <div className="mx-auto max-w-6xl px-6">
        <AnimatedSection>
          <p className="text-center text-[12px] font-bold uppercase tracking-[0.2em] text-[var(--muted)]/60 mb-10">
            <T k="socialProof.title" />
          </p>
        </AnimatedSection>

        <AnimatedSection delay={0.1}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 max-w-3xl mx-auto">
            {[
              { icon: Users, key: "socialProof.items.crm" },
              { icon: Utensils, key: "socialProof.items.templates" },
              { icon: FileText, key: "socialProof.items.aiImport" },
              { icon: Calendar, key: "socialProof.items.scheduling" },
            ].map((item) => (
              <div key={item.key} className="text-center">
                <div className="w-10 h-10 rounded-xl bg-[var(--icon-bg-brand)] flex items-center justify-center mx-auto mb-3">
                  <item.icon className="w-5 h-5 text-[#0F4533] dark:text-[#AFC5B5]" />
                </div>
                <p className="text-[15px] font-bold text-[var(--foreground)]">
                  <T k={`${item.key}.value` as TranslationKeys} />
                </p>
                <p className="text-[12px] text-[var(--muted)] mt-0.5">
                  <T k={`${item.key}.label` as TranslationKeys} />
                </p>
              </div>
            ))}
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
