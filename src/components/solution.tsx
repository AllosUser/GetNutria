"use client";

import { AnimatedSection } from "./animated-section";
import { ArrowRight } from "lucide-react";

export function Solution() {
  return (
    <section className="py-20 md:py-28 bg-gradient-to-b from-[var(--background)] via-[var(--icon-bg-emerald)] to-[var(--background)]">
      <div className="mx-auto max-w-6xl px-6">
        <AnimatedSection>
          <div className="text-center max-w-3xl mx-auto">
            <p className="text-[12px] font-bold uppercase tracking-[0.2em] text-emerald-600 mb-3">
              The solution
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight">
              One platform.{" "}
              <span className="text-gradient">Everything you need.</span>
            </h2>
            <p className="mt-5 text-[var(--muted)] text-lg md:text-xl leading-relaxed">
              GetNutria replaces your spreadsheets, WhatsApp groups, and manual
              workflows with a single, intelligent platform designed for
              nutrition professionals.
            </p>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={0.15}>
          <div className="mt-12 flex justify-center">
            <a
              href="#features"
              className="group inline-flex items-center gap-2 text-[14px] font-semibold text-emerald-600 hover:text-emerald-700 transition-colors"
            >
              See what&apos;s included
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
