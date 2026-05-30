"use client";

import { AnimatedSection } from "./animated-section";
import { ArrowRight } from "lucide-react";
import { T } from "@/i18n/LanguageContext";

export function Solution() {
  return (
    <section className="py-20 md:py-28 bg-gradient-to-b from-[var(--background)] via-[var(--icon-bg-emerald)] to-[var(--background)]">
      <div className="mx-auto max-w-6xl px-6">
        <AnimatedSection>
          <div className="text-center max-w-3xl mx-auto">
            <p className="text-[12px] font-bold uppercase tracking-[0.2em] text-[#0F4533] dark:text-[#AFC5B5] mb-3">
              <T k="solution.sectionLabel" />
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight">
              <T k="solution.titleStart" />
              <span className="text-gradient">
                <T k="solution.titleHighlight" />
              </span>
            </h2>
            <p className="mt-5 text-[var(--muted)] text-lg md:text-xl leading-relaxed">
              <T k="solution.subtitle" />
            </p>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={0.15}>
          <div className="mt-12 flex justify-center">
            <a
              href="#features"
              className="group inline-flex items-center gap-2 text-[14px] font-semibold text-[#0F4533] dark:text-[#AFC5B5] hover:opacity-80 transition-colors"
            >
              <T k="solution.seeWhatIsIncluded" />
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
