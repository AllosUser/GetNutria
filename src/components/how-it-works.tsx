"use client";

import { AnimatedSection } from "./animated-section";
import { UserPlus, Upload, UtensilsCrossed, TrendingUp } from "lucide-react";
import { T, TranslationKeys } from "@/i18n/LanguageContext";
import { AnchorTarget } from "./anchor-target";

const STEPS = [
  {
    icon: UserPlus,
    number: "01",
    key: "howItWorks.steps.step1",
  },
  {
    icon: Upload,
    number: "02",
    key: "howItWorks.steps.step2",
  },
  {
    icon: UtensilsCrossed,
    number: "03",
    key: "howItWorks.steps.step3",
  },
  {
    icon: TrendingUp,
    number: "04",
    key: "howItWorks.steps.step4",
  },
] as const;

export function HowItWorks() {
  return (
    <section className="py-20 md:py-28 bg-[var(--surface-elevated)] border-y border-[var(--border-light)]">
      <div className="mx-auto max-w-6xl px-6">
        <AnimatedSection>
          <AnchorTarget id="how-it-works" />
          <div className="text-center max-w-2xl mx-auto">
            <p className="text-[12px] font-bold uppercase tracking-[0.2em] text-[#0F4533] dark:text-[#AFC5B5] mb-3">
              <T k="howItWorks.sectionLabel" />
            </p>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">
              <T k="howItWorks.title" />
            </h2>
            <p className="mt-4 text-[var(--muted)] text-lg leading-relaxed">
              <T k="howItWorks.subtitle" />
            </p>
          </div>
        </AnimatedSection>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-4">
          {STEPS.map((step, i) => (
            <AnimatedSection key={step.number} delay={0.1 + i * 0.1}>
              <div className="relative text-center md:text-left">
                {i < STEPS.length - 1 && (
                  <div className="hidden md:block absolute top-6 left-[calc(50%+24px)] right-[-16px] h-px bg-gradient-to-r from-[#0F4533]/30 to-[#AFC5B5]/30" />
                )}

                <div className="flex flex-col items-center md:items-start">
                  <div className="relative mb-4">
                    <div className="w-12 h-12 rounded-2xl bg-[var(--surface)] border border-[var(--border)] shadow-sm flex items-center justify-center">
                      <step.icon className="w-5 h-5 text-[#0F4533] dark:text-[#AFC5B5]" />
                    </div>
                    <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-[#0F4533] dark:bg-[#AFC5B5] text-white dark:text-[#0F4533] text-[10px] font-bold flex items-center justify-center">
                      {step.number}
                    </span>
                  </div>
                  <h3 className="text-[15px] font-bold text-[var(--foreground)] mb-2">
                    <T k={`${step.key}.title` as TranslationKeys} />
                  </h3>
                  <p className="text-[13px] text-[var(--muted)] leading-relaxed max-w-[260px]">
                    <T k={`${step.key}.description` as TranslationKeys} />
                  </p>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>

        <AnimatedSection delay={0.5}>
          <div className="mt-16 max-w-2xl mx-auto rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-8 text-center shadow-sm">
            <div className="w-16 h-16 rounded-2xl bg-[var(--icon-bg-brand)] flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-[#0F4533] dark:text-[#AFC5B5]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="m15.75 10.5 4.72-4.72a.75.75 0 0 1 1.28.53v11.38a.75.75 0 0 1-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25h-9A2.25 2.25 0 0 0 2.25 7.5v9a2.25 2.25 0 0 0 2.25 2.25Z" />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-[var(--foreground)] mb-2">
              <T k="howItWorks.cta.title" />
            </h3>
            <p className="text-[14px] text-[var(--muted)] leading-relaxed mb-5">
              <T k="howItWorks.cta.description" />
            </p>
            <a
              href="#book-demo"
              className="inline-flex items-center justify-center h-10 px-6 text-[13px] font-semibold text-white bg-[#0F4533] rounded-lg transition-all hover:bg-[#0a3325] active:scale-[0.98]"
            >
              <T k="howItWorks.cta.button" />
            </a>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
