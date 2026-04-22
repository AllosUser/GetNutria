"use client";

import { AnimatedSection } from "./animated-section";

export function SocialProof() {
  return (
    <section className="py-16 md:py-20 border-y border-[var(--border-light)]">
      <div className="mx-auto max-w-6xl px-6">
        <AnimatedSection>
          <p className="text-center text-[12px] font-bold uppercase tracking-[0.2em] text-[var(--muted)]/60 mb-10">
            Trusted by nutritionists who refuse to settle for spreadsheets
          </p>
        </AnimatedSection>

        <AnimatedSection delay={0.1}>
          <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6 opacity-40">
            {[
              "NutriPro Clinic",
              "BalancedLife",
              "FitDiet Studio",
              "Peak Nutrition",
              "HealthFirst",
              "CoreWellness",
            ].map((name) => (
              <span
                key={name}
                className="text-[15px] md:text-[17px] font-bold tracking-tight text-[var(--foreground)]"
              >
                {name}
              </span>
            ))}
          </div>
        </AnimatedSection>

        <AnimatedSection delay={0.2}>
          <div className="mt-14 max-w-2xl mx-auto text-center">
            <blockquote className="text-lg md:text-xl text-[var(--foreground)] font-medium leading-relaxed italic">
              &ldquo;I went from spending 3 hours a day on admin to 30 minutes.
              GetNutria changed how I run my practice.&rdquo;
            </blockquote>
            <div className="mt-5 flex items-center justify-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-100 to-emerald-200 dark:from-emerald-900 dark:to-emerald-800 flex items-center justify-center text-[12px] font-bold text-emerald-700 dark:text-emerald-400">
                AK
              </div>
              <div className="text-left">
                <p className="text-[13px] font-semibold text-[var(--foreground)]">Dr. Anna Kowalski</p>
                <p className="text-[12px] text-[var(--muted)]">Clinical Nutritionist, Warsaw</p>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
