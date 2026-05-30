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
  BookOpen,
  ClipboardList,
  UserPlus,
  Shield,
  Sparkles,
  BrainCircuit,
  CookingPot,
  TrendingUp,
} from "lucide-react";
import { T, TranslationKeys } from "@/i18n/LanguageContext";

const FEATURE_GROUPS = [
  {
    categoryKey: "features.groups.practiceManagement.title",
    highlight: false,
    features: [
      {
        icon: Users,
        key: "features.groups.practiceManagement.items.crm",
      },
      {
        icon: CalendarCheck,
        key: "features.groups.practiceManagement.items.appointments",
      },
      {
        icon: UserPlus,
        key: "features.groups.practiceManagement.items.onboarding",
      },
      {
        icon: Shield,
        key: "features.groups.practiceManagement.items.roleBasedAccess",
      },
    ],
  },
  {
    categoryKey: "features.groups.nutritionWorkflows.title",
    highlight: false,
    features: [
      {
        icon: ClipboardList,
        key: "features.groups.nutritionWorkflows.items.dietTemplates",
      },
      {
        icon: UtensilsCrossed,
        key: "features.groups.nutritionWorkflows.items.personalizedDietPlans",
      },
      {
        icon: BookOpen,
        key: "features.groups.nutritionWorkflows.items.foodLibrary",
      },
      {
        icon: MessageCircle,
        key: "features.groups.nutritionWorkflows.items.builtInMessaging",
      },
    ],
  },
  {
    categoryKey: "features.groups.measurementsInsights.title",
    highlight: false,
    features: [
      {
        icon: Activity,
        key: "features.groups.measurementsInsights.items.bodyComposition",
      },
      {
        icon: BarChart3,
        key: "features.groups.measurementsInsights.items.analyticsInsights",
      },
      {
        icon: Smartphone,
        key: "features.groups.measurementsInsights.items.clientPortal",
      },
      {
        icon: TrendingUp,
        key: "features.groups.measurementsInsights.items.progressReports",
      },
    ],
  },
  {
    categoryKey: "features.groups.aiTools.title",
    highlight: true,
    features: [
      {
        icon: FileSearch,
        key: "features.groups.aiTools.items.aiPdfImport",
      },
      {
        icon: Sparkles,
        key: "features.groups.aiTools.items.aiDietGenerator",
      },
      {
        icon: CookingPot,
        key: "features.groups.aiTools.items.aiRecipeImport",
      },
      {
        icon: BrainCircuit,
        key: "features.groups.aiTools.items.aiClientInsights",
      },
    ],
  },
] as const;

export function Features() {
  return (
    <section className="py-20 md:py-28">
      <div id="features" className="scroll-mt-[60px]" />
      <div className="mx-auto max-w-6xl px-6">
        <AnimatedSection>
          <div className="text-center max-w-2xl mx-auto">
            <p className="text-[12px] font-bold uppercase tracking-[0.2em] text-[#0F4533] dark:text-[#AFC5B5] mb-3">
              <T k="features.sectionLabel" />
            </p>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">
              <T k="features.title" />
            </h2>
            <p className="mt-4 text-[var(--muted)] text-lg leading-relaxed">
              <T k="features.subtitle" />
            </p>
          </div>
        </AnimatedSection>

        <div className="mt-16 space-y-16">
          {FEATURE_GROUPS.map((group, groupIdx) => (
            <AnimatedSection key={group.categoryKey} delay={0.05 + groupIdx * 0.08}>
              <div
                id={group.highlight ? "ai-tools" : undefined}
                className={group.highlight ? "scroll-mt-[80px]" : undefined}
              >
                <div className="flex items-center gap-3 mb-6">
                  {group.highlight && (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[var(--icon-bg-brand)] text-[11px] font-bold uppercase tracking-wider text-[#0F4533] dark:text-[#AFC5B5]">
                      <Sparkles className="w-3 h-3" />
                      <T k="features.aiPoweredBadge" />
                    </span>
                  )}
                  <h3 className="text-lg font-bold text-[var(--foreground)]">
                    <T k={group.categoryKey} />
                  </h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {group.features.map((feature) => (
                    <div
                      key={feature.key}
                      className={`group relative rounded-2xl border bg-[var(--surface)] p-6 transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 ${
                        group.highlight
                          ? "border-[#AFC5B5]/30 hover:border-[#AFC5B5]/60 hover:shadow-[#0F4533]/[0.06]"
                          : "border-[var(--border)] hover:shadow-[#0F4533]/[0.04]"
                      }`}
                    >
                      <div
                        className={`w-11 h-11 rounded-xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110 ${
                          group.highlight
                            ? "bg-gradient-to-br from-[#0F4533]/10 to-[#AFC5B5]/20 dark:from-[#AFC5B5]/15 dark:to-[#0F4533]/10"
                            : "bg-[var(--icon-bg-brand)]"
                        }`}
                      >
                        <feature.icon className="w-5 h-5 text-[#0F4533] dark:text-[#AFC5B5]" />
                      </div>
                      <h4 className="text-[15px] font-bold text-[var(--foreground)] mb-2">
                        <T k={`${feature.key}.title` as TranslationKeys} />
                      </h4>
                      <p className="text-[13px] text-[var(--muted)] leading-relaxed">
                        <T k={`${feature.key}.description` as TranslationKeys} />
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
