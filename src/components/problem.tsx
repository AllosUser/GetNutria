"use client";

import { AnimatedSection } from "./animated-section";
import { FileWarning, MessageSquare, Clock, FolderOpen } from "lucide-react";

const PAIN_POINTS = [
  {
    icon: FileWarning,
    title: "Manual PDF data entry",
    description:
      "You're typing numbers from InBody or SECA reports into spreadsheets. Every. Single. Time.",
  },
  {
    icon: MessageSquare,
    title: "Scattered communication",
    description:
      "Client messages across WhatsApp, email, and SMS. Nothing is centralized, nothing is tracked.",
  },
  {
    icon: Clock,
    title: "Hours on diet planning",
    description:
      "Building meal plans from scratch in Word or Excel. Copy-pasting macros. Reformatting PDFs.",
  },
  {
    icon: FolderOpen,
    title: "No single source of truth",
    description:
      "Client data lives in 5 different apps. Progress is impossible to track at a glance.",
  },
];

export function Problem() {
  return (
    <section className="py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <AnimatedSection>
          <div className="text-center max-w-2xl mx-auto">
            <p className="text-[12px] font-bold uppercase tracking-[0.2em] text-emerald-600 mb-3">
              The problem
            </p>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">
              Your tools are holding you back
            </h2>
            <p className="mt-4 text-[var(--muted)] text-lg leading-relaxed">
              Most nutritionists waste 10+ hours a week on admin work that could
              be automated. Sound familiar?
            </p>
          </div>
        </AnimatedSection>

        <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5 max-w-4xl mx-auto">
          {PAIN_POINTS.map((point, i) => (
            <AnimatedSection key={point.title} delay={0.1 + i * 0.08}>
              <div className="group relative rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 transition-all hover:border-red-200 dark:hover:border-red-800 hover:shadow-lg hover:shadow-red-500/[0.04]">
                <div className="flex items-start gap-4">
                  <div className="shrink-0 w-10 h-10 rounded-xl bg-[var(--icon-bg-red)] flex items-center justify-center group-hover:bg-[var(--icon-bg-red-hover)] transition-colors">
                    <point.icon className="w-5 h-5 text-red-500" />
                  </div>
                  <div>
                    <h3 className="text-[15px] font-bold text-[var(--foreground)]">
                      {point.title}
                    </h3>
                    <p className="mt-1.5 text-[13px] text-[var(--muted)] leading-relaxed">
                      {point.description}
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
