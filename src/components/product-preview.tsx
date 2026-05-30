"use client";

import { AnimatedSection } from "./animated-section";
import { motion } from "framer-motion";
import { T, TranslationKeys } from "@/i18n/LanguageContext";

function MobilePreview() {
  return (
    <div className="relative w-[220px] h-[440px] mx-auto">
      <div className="absolute inset-0 rounded-[32px] border-[3px] border-gray-800 bg-gray-900 shadow-2xl overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-6 bg-gray-900 rounded-b-2xl z-10" />

        <div className="absolute inset-[3px] rounded-[28px] bg-[var(--surface)] overflow-hidden">
          <div className="h-12 bg-[#0F4533] flex items-end justify-center pb-2">
            <span className="text-[#F4ECE4] text-[10px] font-semibold">
              <T k="productPreview.mobile.myProgress" />
            </span>
          </div>

          <div className="p-3 space-y-3">
            <div className="rounded-xl bg-[var(--icon-bg-brand)] p-3">
              <p className="text-[9px] font-bold text-[#0F4533] dark:text-[#AFC5B5] uppercase tracking-wider">
                <T k="productPreview.mobile.currentWeight" />
              </p>
              <p className="text-2xl font-extrabold text-[var(--foreground)] mt-0.5">
                72.4 <span className="text-sm font-semibold text-[var(--muted)]">kg</span>
              </p>
              <p className="text-[10px] font-semibold text-[#0F4533] dark:text-[#AFC5B5] mt-0.5">
                -2.1 kg <T k="productPreview.mobile.thisMonthTrend" />
              </p>
            </div>

            <div className="rounded-xl border border-[var(--border-light)] p-3">
              <p className="text-[9px] font-bold text-[var(--muted)] uppercase tracking-wider mb-2">
                <T k="productPreview.mobile.thirtyDayTrend" />
              </p>
              <svg viewBox="0 0 180 50" className="w-full h-10">
                <motion.path
                  d="M0,35 C20,32 40,28 60,25 C80,22 100,30 120,20 C140,10 160,15 180,8"
                  fill="none"
                  stroke="#0F4533"
                  strokeWidth="2"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 2, delay: 0.5 }}
                />
              </svg>
            </div>

            <div className="rounded-xl border border-[var(--border-light)] p-3">
              <p className="text-[9px] font-bold text-[var(--muted)] uppercase tracking-wider mb-2">
                <T k="productPreview.mobile.todaysPlan" />
              </p>
              {[
                { key: "productPreview.mobile.breakfast" },
                { key: "productPreview.mobile.lunch" },
                { key: "productPreview.mobile.snack" },
              ].map((item) => (
                <div key={item.key} className="flex items-center justify-between py-1.5 border-b border-[var(--border-light)] last:border-0">
                  <span className="text-[10px] font-medium text-[var(--foreground)]">
                    <T k={item.key as TranslationKeys} />
                  </span>
                  <div className="w-3.5 h-3.5 rounded-full bg-[var(--icon-bg-brand)] flex items-center justify-center">
                    <span className="text-[7px] text-[#0F4533] dark:text-[#AFC5B5]">&#10003;</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="rounded-xl bg-[#0F4533]/10 dark:bg-[#AFC5B5]/10 p-3">
              <p className="text-[9px] font-bold text-[#0F4533] dark:text-[#AFC5B5] uppercase tracking-wider">
                <T k="productPreview.mobile.nextCheckIn" />
              </p>
              <p className="text-[11px] font-semibold text-[var(--foreground)] mt-0.5">
                <T k="productPreview.mobile.nextCheckInTime" />
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function DesktopPreview() {
  return (
    <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] shadow-xl overflow-hidden">
      <div className="flex items-center gap-2 px-4 py-2.5 border-b border-[var(--border-light)] bg-[var(--surface-elevated)]">
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-red-400/70" />
          <div className="w-2.5 h-2.5 rounded-full bg-amber-400/70" />
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-400/70" />
        </div>
      </div>

      <div className="p-5 bg-[var(--surface-inset)]">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-[13px] font-bold text-[var(--foreground)]">
              <T k="productPreview.desktop.dietPlan" /> — Anna K.
            </p>
            <p className="text-[11px] text-[var(--muted)]">
              <T k="productPreview.desktop.weightManagement" /> &middot; 1,800 <T k="productPreview.desktop.kcalPerDay" />
            </p>
          </div>
          <span className="px-2.5 py-1 text-[10px] font-bold text-[var(--badge-emerald-text)] bg-[var(--badge-emerald-bg)] rounded-full uppercase tracking-wide">
            <T k="productPreview.desktop.statusActive" />
          </span>
        </div>

        <div className="flex gap-3 mb-4">
          {[
            { key: "productPreview.desktop.macros.protein", value: "135g", pct: 30, color: "bg-[#0F4533]" },
            { key: "productPreview.desktop.macros.carbs", value: "203g", pct: 45, color: "bg-[#AFC5B5]" },
            { key: "productPreview.desktop.macros.fat", value: "50g", pct: 25, color: "bg-[#F4ECE4] dark:bg-[#F4ECE4]/50" },
          ].map((macro) => (
            <div key={macro.key} className="flex-1">
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] font-semibold text-[var(--muted)]">
                  <T k={macro.key as TranslationKeys} />
                </span>
                <span className="text-[10px] font-bold text-[var(--foreground)]">{macro.value}</span>
              </div>
              <div className="h-1.5 rounded-full bg-[var(--macro-bar-bg)]">
                <div
                  className={`h-full rounded-full ${macro.color}`}
                  style={{ width: `${macro.pct}%` }}
                />
              </div>
            </div>
          ))}
        </div>

        <div className="space-y-2">
          {[
            { mealKey: "productPreview.desktop.meals.breakfast", itemsKey: "productPreview.desktop.meals.breakfastItems", cal: 420 },
            { mealKey: "productPreview.desktop.meals.lunch", itemsKey: "productPreview.desktop.meals.lunchItems", cal: 580 },
            { mealKey: "productPreview.desktop.meals.snack", itemsKey: "productPreview.desktop.meals.snackItems", cal: 220 },
            { mealKey: "productPreview.desktop.meals.dinner", itemsKey: "productPreview.desktop.meals.dinnerItems", cal: 580 },
          ].map((row) => (
            <div
              key={row.mealKey}
              className="flex items-center justify-between py-2.5 px-3 rounded-lg bg-[var(--surface)] border border-[var(--border-light)] hover:border-[#AFC5B5] transition-colors"
            >
              <div>
                <p className="text-[12px] font-semibold text-[var(--foreground)]">
                  <T k={row.mealKey as TranslationKeys} />
                </p>
                <p className="text-[11px] text-[var(--muted)]">
                  <T k={row.itemsKey as TranslationKeys} />
                </p>
              </div>
              <span className="text-[12px] font-bold text-[var(--foreground)] tabular-nums">
                {row.cal} kcal
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function ProductPreview() {
  return (
    <section className="py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <AnimatedSection>
          <div className="text-center max-w-2xl mx-auto mb-14">
            <p className="text-[12px] font-bold uppercase tracking-[0.2em] text-[#0F4533] dark:text-[#AFC5B5] mb-3">
              <T k="productPreview.sectionLabel" />
            </p>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">
              <T k="productPreview.title" />
            </h2>
            <p className="mt-4 text-[var(--muted)] text-lg leading-relaxed">
              <T k="productPreview.subtitle" />
            </p>
          </div>
        </AnimatedSection>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
          <AnimatedSection className="lg:col-span-2" direction="left">
            <DesktopPreview />
          </AnimatedSection>

          <AnimatedSection direction="right" delay={0.2}>
            <MobilePreview />
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
