"use client";

import { AnimatedSection } from "./animated-section";
import { motion } from "framer-motion";

function MobilePreview() {
  return (
    <div className="relative w-[220px] h-[440px] mx-auto">
      {/* Phone frame */}
      <div className="absolute inset-0 rounded-[32px] border-[3px] border-gray-800 bg-gray-900 shadow-2xl overflow-hidden">
        {/* Notch */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-6 bg-gray-900 rounded-b-2xl z-10" />

        {/* Screen content */}
        <div className="absolute inset-[3px] rounded-[28px] bg-[var(--surface)] overflow-hidden">
          {/* Status bar */}
          <div className="h-12 bg-emerald-600 flex items-end justify-center pb-2">
            <span className="text-white text-[10px] font-semibold">My Progress</span>
          </div>

          {/* Content */}
          <div className="p-3 space-y-3">
            {/* Weight card */}
            <div className="rounded-xl bg-[var(--icon-bg-emerald)] p-3">
              <p className="text-[9px] font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider">Current Weight</p>
              <p className="text-2xl font-extrabold text-[var(--foreground)] mt-0.5">72.4 <span className="text-sm font-semibold text-[var(--muted)]">kg</span></p>
              <p className="text-[10px] font-semibold text-emerald-600 dark:text-emerald-400 mt-0.5">-2.1 kg this month</p>
            </div>

            {/* Mini chart */}
            <div className="rounded-xl border border-[var(--border-light)] p-3">
              <p className="text-[9px] font-bold text-[var(--muted)] uppercase tracking-wider mb-2">30-Day Trend</p>
              <svg viewBox="0 0 180 50" className="w-full h-10">
                <motion.path
                  d="M0,35 C20,32 40,28 60,25 C80,22 100,30 120,20 C140,10 160,15 180,8"
                  fill="none"
                  stroke="#10b981"
                  strokeWidth="2"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 2, delay: 0.5 }}
                />
              </svg>
            </div>

            {/* Today's meals */}
            <div className="rounded-xl border border-[var(--border-light)] p-3">
              <p className="text-[9px] font-bold text-[var(--muted)] uppercase tracking-wider mb-2">Today&apos;s Plan</p>
              {["Breakfast", "Lunch", "Snack"].map((meal) => (
                <div key={meal} className="flex items-center justify-between py-1.5 border-b border-[var(--border-light)] last:border-0">
                  <span className="text-[10px] font-medium text-[var(--foreground)]">{meal}</span>
                  <div className="w-3.5 h-3.5 rounded-full bg-[var(--icon-bg-emerald)] flex items-center justify-center">
                    <span className="text-[7px] text-emerald-600 dark:text-emerald-400">&#10003;</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Next appointment */}
            <div className="rounded-xl bg-[var(--icon-bg-blue)] p-3">
              <p className="text-[9px] font-bold text-blue-700 dark:text-blue-400 uppercase tracking-wider">Next Check-in</p>
              <p className="text-[11px] font-semibold text-[var(--foreground)] mt-0.5">Tomorrow, 10:00 AM</p>
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
      {/* Title bar */}
      <div className="flex items-center gap-2 px-4 py-2.5 border-b border-[var(--border-light)] bg-[var(--surface-elevated)]">
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-red-400/70" />
          <div className="w-2.5 h-2.5 rounded-full bg-amber-400/70" />
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-400/70" />
        </div>
      </div>

      {/* Diet plan preview */}
      <div className="p-5 bg-[var(--surface-inset)]">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-[13px] font-bold text-[var(--foreground)]">Diet Plan — Anna K.</p>
            <p className="text-[11px] text-[var(--muted)]">Weight Management &middot; 1,800 kcal/day</p>
          </div>
          <span className="px-2.5 py-1 text-[10px] font-bold text-[var(--badge-emerald-text)] bg-[var(--badge-emerald-bg)] rounded-full uppercase tracking-wide">
            Active
          </span>
        </div>

        {/* Macros bar */}
        <div className="flex gap-3 mb-4">
          {[
            { label: "Protein", value: "135g", pct: 30, color: "bg-blue-500" },
            { label: "Carbs", value: "203g", pct: 45, color: "bg-amber-500" },
            { label: "Fat", value: "50g", pct: 25, color: "bg-rose-500" },
          ].map((macro) => (
            <div key={macro.label} className="flex-1">
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] font-semibold text-[var(--muted)]">{macro.label}</span>
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

        {/* Meal rows */}
        <div className="space-y-2">
          {[
            { meal: "Breakfast", items: "Greek yogurt, berries, granola", cal: 420 },
            { meal: "Lunch", items: "Grilled chicken, quinoa, veggies", cal: 580 },
            { meal: "Snack", items: "Almonds, apple", cal: 220 },
            { meal: "Dinner", items: "Salmon, sweet potato, salad", cal: 580 },
          ].map((row) => (
            <div
              key={row.meal}
              className="flex items-center justify-between py-2.5 px-3 rounded-lg bg-[var(--surface)] border border-[var(--border-light)] hover:border-emerald-200 dark:hover:border-emerald-800 transition-colors"
            >
              <div>
                <p className="text-[12px] font-semibold text-[var(--foreground)]">{row.meal}</p>
                <p className="text-[11px] text-[var(--muted)]">{row.items}</p>
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
            <p className="text-[12px] font-bold uppercase tracking-[0.2em] text-emerald-600 mb-3">
              Product
            </p>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">
              Designed for how you actually work
            </h2>
            <p className="mt-4 text-[var(--muted)] text-lg leading-relaxed">
              A dashboard you&apos;ll want to open every morning. A mobile app
              your clients will actually use.
            </p>
          </div>
        </AnimatedSection>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
          {/* Desktop preview */}
          <AnimatedSection className="lg:col-span-2" direction="left">
            <DesktopPreview />
          </AnimatedSection>

          {/* Mobile preview */}
          <AnimatedSection direction="right" delay={0.2}>
            <MobilePreview />
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
