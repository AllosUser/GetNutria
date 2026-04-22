"use client";

import { AnimatedSection } from "./animated-section";
import { Clock, Heart, Sparkles, LineChart } from "lucide-react";

const BENEFITS = [
  {
    icon: Clock,
    stat: "10+",
    unit: "hours saved",
    period: "per week",
    description:
      "Automate diet plans, PDF imports, and client follow-ups. Spend your time on consultations, not admin.",
  },
  {
    icon: Heart,
    stat: "2x",
    unit: "client retention",
    period: "",
    description:
      "Clients who can track their own progress and message you directly stay longer and refer more.",
  },
  {
    icon: Sparkles,
    stat: "100%",
    unit: "professional",
    period: "",
    description:
      "Branded reports, clean dashboards, and a polished mobile experience. Look like the expert you are.",
  },
  {
    icon: LineChart,
    stat: "Real",
    unit: "insights",
    period: "",
    description:
      "Spot trends, detect anomalies, and make evidence-based decisions instead of guessing.",
  },
];

export function Benefits() {
  return (
    <section className="py-20 md:py-28 bg-[var(--surface-elevated)] border-y border-[var(--border-light)]">
      <div className="mx-auto max-w-6xl px-6">
        <AnimatedSection>
          <div className="text-center max-w-2xl mx-auto">
            <p className="text-[12px] font-bold uppercase tracking-[0.2em] text-emerald-600 mb-3">
              Results
            </p>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">
              Less busywork. Better outcomes.
            </h2>
            <p className="mt-4 text-[var(--muted)] text-lg leading-relaxed">
              GetNutria isn&apos;t just another tool. It&apos;s the unfair
              advantage your practice needs.
            </p>
          </div>
        </AnimatedSection>

        <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {BENEFITS.map((benefit, i) => (
            <AnimatedSection key={benefit.stat + benefit.unit} delay={0.1 + i * 0.08}>
              <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 text-center transition-all hover:shadow-lg hover:shadow-emerald-500/[0.04] hover:-translate-y-0.5">
                <div className="w-12 h-12 rounded-xl bg-[var(--icon-bg-emerald)] flex items-center justify-center mx-auto mb-4">
                  <benefit.icon className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
                </div>
                <div className="mb-3">
                  <span className="text-3xl font-extrabold text-gradient">{benefit.stat}</span>
                  <p className="text-[13px] font-semibold text-[var(--foreground)] mt-0.5">
                    {benefit.unit}
                    {benefit.period && (
                      <span className="text-[var(--muted)] font-normal">
                        {" "}
                        {benefit.period}
                      </span>
                    )}
                  </p>
                </div>
                <p className="text-[13px] text-[var(--muted)] leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
