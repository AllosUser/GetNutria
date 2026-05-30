"use client";

import { motion } from "framer-motion";
import { ArrowRight, Play } from "lucide-react";
import { T, TranslationKeys } from "@/i18n/LanguageContext";

const TIME_RANGES = [
  { key: "hero.dashboard.timeRanges.1W", val: "1W" },
  { key: "hero.dashboard.timeRanges.1M", val: "1M" },
  { key: "hero.dashboard.timeRanges.3M", val: "3M" },
] as const;

function DashboardPreview() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.9, delay: 0.4, ease: [0.21, 0.47, 0.32, 0.98] }}
      className="relative mx-auto max-w-5xl mt-16 md:mt-20"
    >
      <div className="absolute -inset-4 bg-gradient-to-b from-[#0F4533]/10 via-[#0F4533]/5 to-transparent rounded-3xl blur-3xl" />

      <div className="relative rounded-2xl border border-[var(--border)] bg-[var(--surface)] shadow-2xl shadow-[var(--shadow-card)] overflow-hidden">
        <div className="flex items-center gap-2 px-4 py-3 border-b border-[var(--border-light)] bg-[var(--surface-elevated)]">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-400/80" />
            <div className="w-3 h-3 rounded-full bg-amber-400/80" />
            <div className="w-3 h-3 rounded-full bg-emerald-400/80" />
          </div>
          <div className="flex-1 flex justify-center">
            <div className="px-4 py-1 rounded-md bg-[var(--hover-strong)] text-[11px] text-[var(--muted)] font-mono">
              app.getnutria.com
            </div>
          </div>
          <div className="w-12" />
        </div>

        <div className="p-6 md:p-8 bg-[var(--surface-inset)]">
          <div className="grid grid-cols-12 gap-4 md:gap-6">
            <div className="hidden md:block col-span-2 space-y-3">
              <div className="h-8 rounded-lg bg-[#0F4533]/10 border border-[#0F4533]/20" />
              {[...Array(5)].map((_, i) => (
                <div key={i} className="h-7 rounded-lg bg-[var(--hover)]" />
              ))}
            </div>

            <div className="col-span-12 md:col-span-10 space-y-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {([
                  { key: "hero.dashboard.activeClients", value: "47", change: "+3" },
                  { key: "hero.dashboard.dietPlans", value: "34", change: "+5" },
                  { key: "hero.dashboard.appointments", value: "12", change: "+5" },
                  { key: "hero.dashboard.compliance", value: "89%", change: "+2%" },
                ] as const).map((kpi, kpiIdx) => (
                  <motion.div
                    key={kpi.key}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.7 + kpiIdx * 0.08 }}
                    className="rounded-xl border border-[var(--border-light)] bg-[var(--surface)] p-4 shadow-sm"
                  >
                    <p className="text-[11px] font-medium text-[var(--muted)] uppercase tracking-wider">
                      <T k={kpi.key} />
                    </p>
                    <p className="mt-1 text-2xl font-bold tracking-tight text-[var(--foreground)]">
                      {kpi.value}
                    </p>
                    <p className="mt-0.5 text-xs font-semibold text-[#0F4533] dark:text-[#AFC5B5]">
                      {kpi.change} <T k="hero.dashboard.thisWeek" />
                    </p>
                  </motion.div>
                ))}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                <div className="md:col-span-3 rounded-xl border border-[var(--border-light)] bg-[var(--surface)] p-5 shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <p className="text-sm font-semibold text-[var(--foreground)]">
                      <T k="hero.dashboard.bodyComposition" />
                    </p>
                    <div className="flex gap-1">
                      {TIME_RANGES.map((r) => (
                        <span
                          key={r.val}
                          className={`px-2.5 py-1 text-[10px] font-semibold rounded-md ${
                            r.val === "1M"
                              ? "bg-[#0F4533] text-white dark:bg-[#AFC5B5] dark:text-[#0F4533]"
                              : "text-[var(--muted)] bg-[var(--hover)]"
                          }`}
                        >
                          <T k={r.key} />
                        </span>
                      ))}
                    </div>
                  </div>
                  <svg viewBox="0 0 400 120" className="w-full h-24 md:h-28">
                    <defs>
                      <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#0F4533" stopOpacity="0.12" />
                        <stop offset="100%" stopColor="#0F4533" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                    <motion.path
                      d="M0,80 C40,75 80,60 120,55 C160,50 200,65 240,45 C280,25 320,35 360,20 L400,15 L400,120 L0,120Z"
                      fill="url(#chartGrad)"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 1, delay: 1 }}
                    />
                    <motion.path
                      d="M0,80 C40,75 80,60 120,55 C160,50 200,65 240,45 C280,25 320,35 360,20 L400,15"
                      fill="none"
                      stroke="#0F4533"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      initial={{ pathLength: 0, opacity: 0 }}
                      animate={{ pathLength: 1, opacity: 1 }}
                      transition={{ duration: 1.5, delay: 0.8, ease: "easeOut" }}
                    />
                    <motion.path
                      d="M0,40 C40,50 80,45 120,60 C160,65 200,55 240,70 C280,75 320,65 360,75 L400,80"
                      fill="none"
                      stroke="#AFC5B5"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeDasharray="4 4"
                      initial={{ pathLength: 0, opacity: 0 }}
                      animate={{ pathLength: 1, opacity: 0.6 }}
                      transition={{ duration: 1.5, delay: 1, ease: "easeOut" }}
                    />
                  </svg>
                  <div className="flex items-center gap-4 mt-2">
                    <span className="flex items-center gap-1.5 text-[11px] text-[var(--muted)]">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#0F4533]" /> <T k="hero.dashboard.weight" />
                    </span>
                    <span className="flex items-center gap-1.5 text-[11px] text-[var(--muted)]">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#AFC5B5]" /> <T k="hero.dashboard.muscle" />
                    </span>
                  </div>
                </div>

                <div className="md:col-span-2 rounded-xl border border-[var(--border-light)] bg-[var(--surface)] p-5 shadow-sm">
                  <p className="text-sm font-semibold text-[var(--foreground)] mb-3">
                    <T k="hero.dashboard.recentClients" />
                  </p>
                  <div className="space-y-2.5">
                    {[
                      { name: "Anna K.", statusKey: "hero.dashboard.status.onTrack", statusColor: "emerald" },
                      { name: "Marcus R.", statusKey: "hero.dashboard.status.review", statusColor: "amber" },
                      { name: "Sofia L.", statusKey: "hero.dashboard.status.new", statusColor: "blue" },
                      { name: "David M.", statusKey: "hero.dashboard.status.onTrack", statusColor: "emerald" },
                    ].map((client) => (
                      <div
                        key={client.name}
                        className="flex items-center justify-between py-2 px-2.5 rounded-lg hover:bg-[var(--hover)] transition-colors"
                      >
                        <div className="flex items-center gap-2.5">
                          <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[var(--avatar-bg-from)] to-[var(--avatar-bg-to)] flex items-center justify-center text-[10px] font-bold text-[var(--avatar-text)]">
                            {client.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </div>
                          <span className="text-[13px] font-medium">{client.name}</span>
                        </div>
                        <span
                          className={`text-[10px] font-bold uppercase tracking-wide px-2 py-0.5 rounded-full ${
                            client.statusColor === "emerald"
                              ? "bg-[var(--badge-emerald-bg)] text-[var(--badge-emerald-text)]"
                              : client.statusColor === "amber"
                                ? "bg-[var(--badge-amber-bg)] text-[var(--badge-amber-text)]"
                                : "bg-[var(--badge-blue-bg)] text-[var(--badge-blue-text)]"
                          }`}
                        >
                          <T k={client.statusKey as TranslationKeys} />
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[var(--background)] to-transparent pointer-events-none" />
    </motion.div>
  );
}

export function Hero() {
  return (
    <section className="relative pt-32 pb-8 md:pt-40 md:pb-16 overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-50" />

      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-gradient-radial from-[#0F4533]/[0.06] via-transparent to-transparent rounded-full blur-3xl pointer-events-none" />

      <div className="relative mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex justify-center mb-6"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#AFC5B5] bg-[var(--icon-bg-brand)] text-[12px] font-semibold text-[#0F4533] dark:text-[#AFC5B5] backdrop-blur-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-[#0F4533] dark:bg-[#AFC5B5] animate-pulse" />
            <T k="hero.badge" />
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="text-center text-4xl sm:text-5xl md:text-6xl lg:text-[68px] font-extrabold tracking-tight leading-[1.08] max-w-4xl mx-auto"
        >
          <T k="hero.titleStart" />
          <span className="text-gradient">
            <T k="hero.titleHighlight" />
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-6 text-center text-lg md:text-[21px] font-medium text-[var(--muted)] dark:text-[#a5c2ad] max-w-2xl mx-auto leading-relaxed"
        >
          <T k="hero.subtitle" />
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3"
        >
          <a
            href="#book-demo"
            className="group inline-flex items-center justify-center h-12 px-7 text-[15px] font-semibold text-white bg-[#0F4533] rounded-xl transition-all hover:bg-[#0a3325] hover:shadow-lg hover:shadow-[#0F4533]/20 active:scale-[0.98] gap-2"
          >
            <T k="hero.bookDemo" />
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </a>
          <a
            href="#how-it-works"
            className="group inline-flex items-center justify-center h-12 px-7 text-[15px] font-medium text-[var(--foreground)] bg-[var(--surface)] border border-[var(--border)] rounded-xl transition-all hover:border-[var(--foreground)]/20 hover:shadow-md active:scale-[0.98] gap-2"
          >
            <Play className="h-3.5 w-3.5 text-[var(--muted)] group-hover:text-[var(--foreground)] transition-colors" />
            <T k="hero.seeHowItWorks" />
          </a>
        </motion.div>

        <DashboardPreview />
      </div>
    </section>
  );
}
