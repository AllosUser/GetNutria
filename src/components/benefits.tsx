"use client";

import { AnimatedSection } from "./animated-section";
import { Clock, Heart, Sparkles, LineChart } from "lucide-react";
import { T, useTranslation, TranslationKeys } from "@/i18n/LanguageContext";

const BENEFITS = [
  {
    icon: Clock,
    stat: "10+",
    key: "benefits.items.hoursSaved",
  },
  {
    icon: Heart,
    stat: "Better",
    key: "benefits.items.clientExperience",
  },
  {
    icon: Sparkles,
    stat: "100%",
    key: "benefits.items.professional",
  },
  {
    icon: LineChart,
    stat: "Real",
    key: "benefits.items.insights",
  },
] as const;

export function Benefits() {
  const { language } = useTranslation();

  const getLocalizedStat = (stat: string) => {
    if (language === "el") {
      if (stat === "Better") return "Καλύτερη";
      if (stat === "Real") return "Πραγματικά";
    }
    return stat;
  };

  return (
    <section className="py-20 md:py-28 bg-[var(--surface-elevated)] border-y border-[var(--border-light)]">
      <div className="mx-auto max-w-6xl px-6">
        <AnimatedSection>
          <div className="text-center max-w-2xl mx-auto">
            <p className="text-[12px] font-bold uppercase tracking-[0.2em] text-[#0F4533] dark:text-[#AFC5B5] mb-3">
              <T k="benefits.sectionLabel" />
            </p>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">
              <T k="benefits.title" />
            </h2>
            <p className="mt-4 text-[var(--muted)] text-lg leading-relaxed">
              <T k="benefits.subtitle" />
            </p>
          </div>
        </AnimatedSection>

        <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {BENEFITS.map((benefit, i) => (
            <AnimatedSection key={benefit.key} delay={0.1 + i * 0.08}>
              <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 text-center transition-all hover:shadow-lg hover:shadow-[#0F4533]/[0.04] hover:-translate-y-0.5">
                <div className="w-12 h-12 rounded-xl bg-[var(--icon-bg-brand)] flex items-center justify-center mx-auto mb-4">
                  <benefit.icon className="w-6 h-6 text-[#0F4533] dark:text-[#AFC5B5]" />
                </div>
                <div className="mb-3">
                  <span className="text-3xl font-extrabold text-gradient">
                    {getLocalizedStat(benefit.stat)}
                  </span>
                  <p className="text-[13px] font-semibold text-[var(--foreground)] mt-0.5">
                    <T k={`${benefit.key}.unit` as TranslationKeys} />
                    {benefit.key === "benefits.items.hoursSaved" && (
                      <span className="text-[var(--muted)] font-normal">
                        {" "}
                        <T k="benefits.items.hoursSaved.period" />
                      </span>
                    )}
                  </p>
                </div>
                <p className="text-[13px] text-[var(--muted)] leading-relaxed">
                  <T k={`${benefit.key}.description` as TranslationKeys} />
                </p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
