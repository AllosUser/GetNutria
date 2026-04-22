"use client";

import { AnimatedSection } from "./animated-section";
import {
  Users,
  UtensilsCrossed,
  Activity,
  FileSearch,
  MessageCircle,
  CalendarCheck,
  Smartphone,
  BarChart3,
} from "lucide-react";

const FEATURES = [
  {
    icon: Users,
    title: "Client Management",
    description:
      "Every client in one place. Goals, history, notes, measurements — all searchable, all organized.",
    color: "emerald",
  },
  {
    icon: UtensilsCrossed,
    title: "Diet Planning",
    description:
      "Build personalized meal plans in minutes. Templates, macros, and automatic portion calculations.",
    color: "blue",
  },
  {
    icon: Activity,
    title: "Body Composition Tracking",
    description:
      "Track weight, body fat, muscle mass, and water balance over time with beautiful analytics.",
    color: "violet",
  },
  {
    icon: FileSearch,
    title: "AI-Powered Import",
    description:
      "Upload InBody, SECA, or any PDF report. Our AI extracts and maps every metric automatically.",
    color: "amber",
  },
  {
    icon: MessageCircle,
    title: "Built-in Messaging",
    description:
      "Chat with clients directly inside the platform. No more lost WhatsApp threads.",
    color: "pink",
  },
  {
    icon: CalendarCheck,
    title: "Scheduling & Reminders",
    description:
      "Book appointments, send reminders, and track attendance — all integrated with client profiles.",
    color: "cyan",
  },
  {
    icon: Smartphone,
    title: "Client Mobile App",
    description:
      "Clients track meals, view plans, and check progress from their phone. You stay in control.",
    color: "orange",
  },
  {
    icon: BarChart3,
    title: "Analytics & Insights",
    description:
      "See trends, anomalies, and progress at a glance. Make data-driven decisions, not guesses.",
    color: "indigo",
  },
];

const COLOR_MAP: Record<string, { bg: string; icon: string; border: string }> = {
  emerald: { bg: "bg-[var(--icon-bg-emerald)]", icon: "text-emerald-600 dark:text-emerald-400", border: "group-hover:border-emerald-200 dark:group-hover:border-emerald-800" },
  blue: { bg: "bg-[var(--icon-bg-blue)]", icon: "text-blue-600 dark:text-blue-400", border: "group-hover:border-blue-200 dark:group-hover:border-blue-800" },
  violet: { bg: "bg-[var(--icon-bg-violet)]", icon: "text-violet-600 dark:text-violet-400", border: "group-hover:border-violet-200 dark:group-hover:border-violet-800" },
  amber: { bg: "bg-[var(--icon-bg-amber)]", icon: "text-amber-600 dark:text-amber-400", border: "group-hover:border-amber-200 dark:group-hover:border-amber-800" },
  pink: { bg: "bg-[var(--icon-bg-pink)]", icon: "text-pink-600 dark:text-pink-400", border: "group-hover:border-pink-200 dark:group-hover:border-pink-800" },
  cyan: { bg: "bg-[var(--icon-bg-cyan)]", icon: "text-cyan-600 dark:text-cyan-400", border: "group-hover:border-cyan-200 dark:group-hover:border-cyan-800" },
  orange: { bg: "bg-[var(--icon-bg-orange)]", icon: "text-orange-600 dark:text-orange-400", border: "group-hover:border-orange-200 dark:group-hover:border-orange-800" },
  indigo: { bg: "bg-[var(--icon-bg-indigo)]", icon: "text-indigo-600 dark:text-indigo-400", border: "group-hover:border-indigo-200 dark:group-hover:border-indigo-800" },
};

export function Features() {
  return (
    <section id="features" className="py-20 md:py-28 scroll-mt-20">
      <div className="mx-auto max-w-6xl px-6">
        <AnimatedSection>
          <div className="text-center max-w-2xl mx-auto">
            <p className="text-[12px] font-bold uppercase tracking-[0.2em] text-emerald-600 mb-3">
              Features
            </p>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">
              Everything to run your practice
            </h2>
            <p className="mt-4 text-[var(--muted)] text-lg leading-relaxed">
              From first consultation to long-term progress tracking — GetNutria
              covers every step.
            </p>
          </div>
        </AnimatedSection>

        <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {FEATURES.map((feature, i) => {
            const colors = COLOR_MAP[feature.color];
            return (
              <AnimatedSection key={feature.title} delay={0.05 + i * 0.06}>
                <div
                  className={`group relative rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 transition-all duration-300 hover:shadow-lg hover:shadow-black/[0.03] hover:-translate-y-0.5 ${colors.border}`}
                >
                  <div className={`w-11 h-11 rounded-xl ${colors.bg} flex items-center justify-center mb-4 transition-transform group-hover:scale-110`}>
                    <feature.icon className={`w-5 h-5 ${colors.icon}`} />
                  </div>
                  <h3 className="text-[15px] font-bold text-[var(--foreground)] mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-[13px] text-[var(--muted)] leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </AnimatedSection>
            );
          })}
        </div>
      </div>
    </section>
  );
}
