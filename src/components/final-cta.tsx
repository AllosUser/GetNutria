"use client";

import { AnimatedSection } from "./animated-section";
import { ArrowRight } from "lucide-react";
import { T } from "@/i18n/LanguageContext";

export function FinalCta() {
  return (
    <section className="py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <AnimatedSection>
          <div className="relative rounded-3xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-[#0F4533] via-[#0F4533] to-[#0a3325]" />
            <div className="absolute inset-0 bg-grid opacity-10" />

            <div className="absolute top-0 right-0 w-96 h-96 bg-[#AFC5B5]/20 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#AFC5B5]/10 rounded-full blur-[80px] pointer-events-none" />

            <div className="relative px-8 py-16 md:px-16 md:py-24 text-center">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-[#F4ECE4] tracking-tight max-w-2xl mx-auto leading-tight">
                <T k="finalCta.titleStart" />{" "}
                <span className="bg-gradient-to-r from-[#AFC5B5] to-[#c8dace] bg-clip-text text-transparent">
                  <T k="finalCta.titleHighlight" />
                </span>
              </h2>
              <p className="mt-5 text-[#AFC5B5]/80 text-lg max-w-xl mx-auto leading-relaxed">
                <T k="finalCta.subtitle" />
              </p>
              <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
                <a
                  href="#book-demo"
                  className="group inline-flex items-center justify-center h-13 px-8 text-[15px] font-semibold text-[#0F4533] bg-[#F4ECE4] rounded-xl transition-all hover:shadow-lg hover:shadow-white/20 active:scale-[0.98] gap-2"
                >
                  <T k="finalCta.bookDemo" />
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </a>
                <a
                  href="#how-it-works"
                  className="inline-flex items-center justify-center h-13 px-8 text-[15px] font-medium text-[#AFC5B5] border border-[#AFC5B5]/30 rounded-xl transition-all hover:border-[#AFC5B5]/30 hover:text-[#F4ECE4]"
                >
                  <T k="finalCta.seeHowItWorks" />
                </a>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
