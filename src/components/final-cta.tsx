"use client";

import { AnimatedSection } from "./animated-section";
import { ArrowRight } from "lucide-react";

export function FinalCta() {
  return (
    <section className="py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <AnimatedSection>
          <div className="relative rounded-3xl overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-900 to-emerald-900" />
            <div className="absolute inset-0 bg-grid opacity-10" />

            {/* Glow */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/20 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-[80px] pointer-events-none" />

            <div className="relative px-8 py-16 md:px-16 md:py-24 text-center">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white tracking-tight max-w-2xl mx-auto leading-tight">
                Ready to run your practice{" "}
                <span className="bg-gradient-to-r from-emerald-400 to-emerald-300 bg-clip-text text-transparent">
                  like a pro?
                </span>
              </h2>
              <p className="mt-5 text-gray-400 text-lg max-w-xl mx-auto leading-relaxed">
                Join nutritionists who&apos;ve already made the switch. Start
                your free trial today — no credit card, no commitment.
              </p>
              <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
                <a
                  href="#pricing"
                  className="group inline-flex items-center justify-center h-13 px-8 text-[15px] font-semibold text-gray-900 bg-white rounded-xl transition-all hover:shadow-lg hover:shadow-white/20 active:scale-[0.98] gap-2"
                >
                  Start Free Trial
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </a>
                <a
                  href="mailto:hello@getnutria.com"
                  className="inline-flex items-center justify-center h-13 px-8 text-[15px] font-medium text-gray-300 border border-gray-700 rounded-xl transition-all hover:border-gray-500 hover:text-white"
                >
                  Talk to Us
                </a>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
