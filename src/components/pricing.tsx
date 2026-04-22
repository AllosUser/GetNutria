"use client";

import { AnimatedSection } from "./animated-section";
import { Check, ArrowRight } from "lucide-react";

const PLANS = [
  {
    name: "Starter",
    description: "For solo practitioners getting started",
    price: "29",
    period: "/month",
    features: [
      "Up to 20 active clients",
      "Diet plan templates",
      "Body composition tracking",
      "Manual data entry",
      "Client mobile app",
      "Email support",
    ],
    cta: "Start Free Trial",
    highlighted: false,
  },
  {
    name: "Professional",
    description: "For growing nutrition practices",
    price: "79",
    period: "/month",
    features: [
      "Unlimited clients",
      "AI PDF import (InBody, SECA)",
      "Custom diet templates",
      "Built-in messaging",
      "Appointment scheduling",
      "Advanced analytics",
      "Priority support",
    ],
    cta: "Start Free Trial",
    highlighted: true,
  },
  {
    name: "Clinic",
    description: "For multi-practitioner clinics",
    price: "149",
    period: "/month",
    features: [
      "Everything in Professional",
      "Up to 5 team members",
      "Team calendar & scheduling",
      "Client assignment & handoff",
      "Custom branding",
      "API access",
      "Dedicated account manager",
    ],
    cta: "Contact Sales",
    highlighted: false,
  },
];

export function Pricing() {
  return (
    <section id="pricing" className="py-20 md:py-28 scroll-mt-20">
      <div className="mx-auto max-w-6xl px-6">
        <AnimatedSection>
          <div className="text-center max-w-2xl mx-auto">
            <p className="text-[12px] font-bold uppercase tracking-[0.2em] text-emerald-600 mb-3">
              Pricing
            </p>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">
              Simple, transparent pricing
            </h2>
            <p className="mt-4 text-[var(--muted)] text-lg leading-relaxed">
              Start free for 14 days. No credit card required.
              Cancel anytime.
            </p>
          </div>
        </AnimatedSection>

        <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-5 items-stretch">
          {PLANS.map((plan, i) => (
            <AnimatedSection key={plan.name} delay={0.1 + i * 0.1}>
              <div
                className={`relative flex flex-col rounded-2xl border p-7 transition-all h-full ${
                  plan.highlighted
                    ? "border-emerald-300 dark:border-emerald-700 bg-[var(--surface)] shadow-xl shadow-emerald-500/[0.08] scale-[1.02] z-10"
                    : "border-[var(--border)] bg-[var(--surface)] hover:shadow-lg hover:shadow-black/[0.03]"
                }`}
              >
                {plan.highlighted && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                    <span className="inline-flex items-center px-4 py-1 rounded-full bg-[var(--foreground)] text-[var(--background)] text-[11px] font-bold uppercase tracking-wider">
                      Most Popular
                    </span>
                  </div>
                )}

                <div className="mb-6">
                  <h3 className="text-[17px] font-bold text-[var(--foreground)]">{plan.name}</h3>
                  <p className="text-[13px] text-[var(--muted)] mt-1">{plan.description}</p>
                </div>

                <div className="mb-6">
                  <span className="text-4xl font-extrabold text-[var(--foreground)] tracking-tight">
                    &euro;{plan.price}
                  </span>
                  <span className="text-[var(--muted)] text-sm font-medium">{plan.period}</span>
                </div>

                <ul className="space-y-3 mb-8 flex-1">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2.5">
                      <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                      <span className="text-[13px] text-[var(--foreground)]/80">{feature}</span>
                    </li>
                  ))}
                </ul>

                <a
                  href="#"
                  className={`group flex items-center justify-center gap-2 h-11 rounded-xl text-[14px] font-semibold transition-all active:scale-[0.98] ${
                    plan.highlighted
                      ? "bg-[var(--foreground)] text-[var(--background)] hover:shadow-lg hover:shadow-black/15"
                      : "bg-[var(--surface)] border border-[var(--border)] text-[var(--foreground)] hover:border-[var(--foreground)]/20 hover:shadow-md"
                  }`}
                >
                  {plan.cta}
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
                </a>
              </div>
            </AnimatedSection>
          ))}
        </div>

        <AnimatedSection delay={0.4}>
          <p className="text-center text-[13px] text-[var(--muted)] mt-10">
            All plans include a 14-day free trial. Prices in EUR, billed
            monthly. Annual billing saves 20%.
          </p>
        </AnimatedSection>
      </div>
    </section>
  );
}
