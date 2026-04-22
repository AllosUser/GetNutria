"use client";

import { AnimatedSection } from "./animated-section";
import { UserPlus, Upload, UtensilsCrossed, TrendingUp } from "lucide-react";

const STEPS = [
  {
    icon: UserPlus,
    number: "01",
    title: "Add your clients",
    description:
      "Import existing client data or add new ones. Goals, preferences, and notes — all in one profile.",
  },
  {
    icon: Upload,
    number: "02",
    title: "Import or track data",
    description:
      "Upload InBody/SECA PDFs or enter measurements manually. AI handles the rest.",
  },
  {
    icon: UtensilsCrossed,
    number: "03",
    title: "Create diet plans",
    description:
      "Use templates or build from scratch. Customize meals, portions, and macro targets per client.",
  },
  {
    icon: TrendingUp,
    number: "04",
    title: "Monitor progress",
    description:
      "Track body composition trends, schedule follow-ups, and adjust plans based on real data.",
  },
];

export function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="py-20 md:py-28 bg-[var(--surface-elevated)] border-y border-[var(--border-light)] scroll-mt-20"
    >
      <div className="mx-auto max-w-6xl px-6">
        <AnimatedSection>
          <div className="text-center max-w-2xl mx-auto">
            <p className="text-[12px] font-bold uppercase tracking-[0.2em] text-emerald-600 mb-3">
              How it works
            </p>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">
              Up and running in minutes
            </h2>
            <p className="mt-4 text-[var(--muted)] text-lg leading-relaxed">
              No onboarding calls. No complex setup. Just sign up and start
              managing your practice.
            </p>
          </div>
        </AnimatedSection>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-4">
          {STEPS.map((step, i) => (
            <AnimatedSection key={step.number} delay={0.1 + i * 0.1}>
              <div className="relative text-center md:text-left">
                {/* Connector line (desktop) */}
                {i < STEPS.length - 1 && (
                  <div className="hidden md:block absolute top-6 left-[calc(50%+24px)] right-[-16px] h-px bg-gradient-to-r from-emerald-300 to-emerald-100" />
                )}

                <div className="flex flex-col items-center md:items-start">
                  <div className="relative mb-4">
                    <div className="w-12 h-12 rounded-2xl bg-[var(--surface)] border border-[var(--border)] shadow-sm flex items-center justify-center">
                      <step.icon className="w-5 h-5 text-emerald-600" />
                    </div>
                    <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-[var(--foreground)] text-[var(--background)] text-[10px] font-bold flex items-center justify-center">
                      {step.number}
                    </span>
                  </div>
                  <h3 className="text-[15px] font-bold text-[var(--foreground)] mb-2">
                    {step.title}
                  </h3>
                  <p className="text-[13px] text-[var(--muted)] leading-relaxed max-w-[260px]">
                    {step.description}
                  </p>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
