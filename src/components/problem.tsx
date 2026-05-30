"use client";

import { AnimatedSection } from "./animated-section";
import { FileWarning, MessageSquare, Clock, FolderOpen, CookingPot, BellOff } from "lucide-react";
import { T, TranslationKeys } from "@/i18n/LanguageContext";

const PAIN_POINTS = [
  {
    icon: FileWarning,
    key: "problem.points.manualDataEntry",
  },
  {
    icon: MessageSquare,
    key: "problem.points.scatteredCommunication",
  },
  {
    icon: Clock,
    key: "problem.points.hoursOnDietPlanning",
  },
  {
    icon: FolderOpen,
    key: "problem.points.noSingleSource",
  },
  {
    icon: CookingPot,
    key: "problem.points.recipeChaos",
  },
  {
    icon: BellOff,
    key: "problem.points.missedFollowUps",
  },
] as const;

export function Problem() {
  return (
    <section className="py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <AnimatedSection>
          <div className="text-center max-w-2xl mx-auto">
            <p className="text-[12px] font-bold uppercase tracking-[0.2em] text-[#0F4533] dark:text-[#AFC5B5] mb-3">
              <T k="problem.sectionLabel" />
            </p>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">
              <T k="problem.title" />
            </h2>
            <p className="mt-4 text-[var(--muted)] text-lg leading-relaxed">
              <T k="problem.subtitle" />
            </p>
          </div>
        </AnimatedSection>

        <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5 max-w-5xl mx-auto">
          {PAIN_POINTS.map((point, i) => (
            <AnimatedSection key={point.key} delay={0.1 + i * 0.08}>
              <div className="group relative rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 transition-all hover:border-red-200 dark:hover:border-red-800 hover:shadow-lg hover:shadow-red-500/[0.04]">
                <div className="flex items-start gap-4">
                  <div className="shrink-0 w-10 h-10 rounded-xl bg-[var(--icon-bg-red)] flex items-center justify-center group-hover:bg-[var(--icon-bg-red-hover)] transition-colors">
                    <point.icon className="w-5 h-5 text-red-500" />
                  </div>
                  <div>
                    <h3 className="text-[15px] font-bold text-[var(--foreground)]">
                      <T k={`${point.key}.title` as TranslationKeys} />
                    </h3>
                    <p className="mt-1.5 text-[13px] text-[var(--muted)] leading-relaxed">
                      <T k={`${point.key}.description` as TranslationKeys} />
                    </p>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
