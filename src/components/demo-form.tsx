"use client";

import { useState } from "react";
import { AnimatedSection } from "./animated-section";
import { Send, CheckCircle, AlertCircle } from "lucide-react";
import { T, useTranslation, TranslationKeys } from "@/i18n/LanguageContext";

interface FormData {
  name: string;
  email: string;
  clinic: string;
  dietitians: string;
  contactMethod: string;
  message: string;
}

const CONTACT_METHODS = [
  { key: "demoForm.contactMethods.email", val: "Email" },
  { key: "demoForm.contactMethods.phone", val: "Phone" },
  { key: "demoForm.contactMethods.whatsapp", val: "WhatsApp" },
  { key: "demoForm.contactMethods.videoCall", val: "Video call" },
] as const;

const INITIAL_FORM: FormData = {
  name: "",
  email: "",
  clinic: "",
  dietitians: "",
  contactMethod: "Email",
  message: "",
};

export function DemoForm() {
  const { t } = useTranslation();
  const [form, setForm] = useState<FormData>(INITIAL_FORM);
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  function validate(): boolean {
    const next: Partial<Record<keyof FormData, string>> = {};
    if (!form.name.trim()) {
      next.name = "demoForm.validation.nameRequired";
    }
    if (!form.email.trim()) {
      next.email = "demoForm.validation.emailRequired";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      next.email = "demoForm.validation.emailInvalid";
    }
    if (!form.clinic.trim()) {
      next.clinic = "demoForm.validation.clinicRequired";
    }
    if (!form.dietitians.trim()) {
      next.dietitians = "demoForm.validation.dietitiansRequired";
    } else if (isNaN(Number(form.dietitians)) || Number(form.dietitians) < 1) {
      next.dietitians = "demoForm.validation.dietitiansInvalid";
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;

    setStatus("submitting");

    // Simulate standard demo submission
    await new Promise((resolve) => setTimeout(resolve, 1200));

    setStatus("success");
    setForm(INITIAL_FORM);
  }

  function updateField(field: keyof FormData, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  }

  if (status === "success") {
    return (
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-xl px-6">
          <AnimatedSection>
            <div id="book-demo" className="scroll-mt-[84px]" aria-hidden="true" />
            <div className="rounded-2xl border border-[#AFC5B5] bg-[var(--surface)] p-10 text-center shadow-lg">
              <div className="w-16 h-16 rounded-full bg-[var(--icon-bg-brand)] flex items-center justify-center mx-auto mb-5">
                <CheckCircle className="w-8 h-8 text-[#0F4533] dark:text-[#AFC5B5]" />
              </div>
              <h3 className="text-2xl font-bold text-[var(--foreground)] mb-3">
                <T k="demoForm.success.title" />
              </h3>
              <p className="text-[var(--muted)] text-[15px] leading-relaxed mb-6">
                <T k="demoForm.success.message" />
              </p>
              <button
                type="button"
                onClick={() => setStatus("idle")}
                className="text-[14px] font-medium text-[#0F4533] dark:text-[#AFC5B5] hover:opacity-80 transition-colors cursor-pointer"
              >
                <T k="demoForm.success.submitAnother" />
              </button>
            </div>
          </AnimatedSection>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-6">
        <AnimatedSection>
          <div id="book-demo" className="scroll-mt-[84px]" aria-hidden="true" />
          <div className="text-center max-w-2xl mx-auto mb-12">
            <p className="text-[12px] font-bold uppercase tracking-[0.2em] text-[#0F4533] dark:text-[#AFC5B5] mb-3">
              <T k="demoForm.sectionLabel" />
            </p>
            <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight">
              <T k="demoForm.title" />
            </h2>
            <p className="mt-2 text-[var(--muted)] text-base leading-relaxed">
              <T k="demoForm.subtitle" />
            </p>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={0.15}>
          <form
            onSubmit={handleSubmit}
            className="max-w-2xl mx-auto rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 md:p-8 shadow-sm"
            noValidate
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="demo-name" className="block text-[13px] font-semibold text-[var(--foreground)] mb-1.5">
                  <T k="demoForm.labels.name" />
                </label>
                <input
                  id="demo-name"
                  type="text"
                  value={form.name}
                  onChange={(e) => updateField("name", e.target.value)}
                  className={`w-full h-10 px-3 rounded-lg border text-[14px] bg-[var(--background)] text-[var(--foreground)] placeholder:text-[var(--muted)]/50 transition-colors focus:outline-none focus:ring-2 focus:ring-[#0F4533]/30 ${
                    errors.name ? "border-red-400" : "border-[var(--border)]"
                  }`}
                  placeholder={t("demoForm.placeholders.name")}
                />
                {errors.name && (
                  <p className="mt-1 text-[12px] text-red-500 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" /> {t(errors.name as TranslationKeys)}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="demo-email" className="block text-[13px] font-semibold text-[var(--foreground)] mb-1.5">
                  <T k="demoForm.labels.email" />
                </label>
                <input
                  id="demo-email"
                  type="email"
                  value={form.email}
                  onChange={(e) => updateField("email", e.target.value)}
                  className={`w-full h-10 px-3 rounded-lg border text-[14px] bg-[var(--background)] text-[var(--foreground)] placeholder:text-[var(--muted)]/50 transition-colors focus:outline-none focus:ring-2 focus:ring-[#0F4533]/30 ${
                    errors.email ? "border-red-400" : "border-[var(--border)]"
                  }`}
                  placeholder={t("demoForm.placeholders.email")}
                />
                {errors.email && (
                  <p className="mt-1 text-[12px] text-red-500 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" /> {t(errors.email as TranslationKeys)}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="demo-clinic" className="block text-[13px] font-semibold text-[var(--foreground)] mb-1.5">
                  <T k="demoForm.labels.clinic" />
                </label>
                <input
                  id="demo-clinic"
                  type="text"
                  value={form.clinic}
                  onChange={(e) => updateField("clinic", e.target.value)}
                  className={`w-full h-10 px-3 rounded-lg border text-[14px] bg-[var(--background)] text-[var(--foreground)] placeholder:text-[var(--muted)]/50 transition-colors focus:outline-none focus:ring-2 focus:ring-[#0F4533]/30 ${
                    errors.clinic ? "border-red-400" : "border-[var(--border)]"
                  }`}
                  placeholder={t("demoForm.placeholders.clinic")}
                />
                {errors.clinic && (
                  <p className="mt-1 text-[12px] text-red-500 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" /> {t(errors.clinic as TranslationKeys)}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="demo-dietitians" className="block text-[13px] font-semibold text-[var(--foreground)] mb-1.5">
                  <T k="demoForm.labels.dietitians" />
                </label>
                <input
                  id="demo-dietitians"
                  type="number"
                  min="1"
                  value={form.dietitians}
                  onChange={(e) => updateField("dietitians", e.target.value)}
                  className={`w-full h-10 px-3 rounded-lg border text-[14px] bg-[var(--background)] text-[var(--foreground)] placeholder:text-[var(--muted)]/50 transition-colors focus:outline-none focus:ring-2 focus:ring-[#0F4533]/30 ${
                    errors.dietitians ? "border-red-400" : "border-[var(--border)]"
                  }`}
                  placeholder={t("demoForm.placeholders.dietitians")}
                />
                {errors.dietitians && (
                  <p className="mt-1 text-[12px] text-red-500 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" /> {t(errors.dietitians as TranslationKeys)}
                  </p>
                )}
              </div>
            </div>

            <div className="mt-4">
              <label className="block text-[13px] font-semibold text-[var(--foreground)] mb-1.5">
                <T k="demoForm.labels.contactMethod" />
              </label>
              <div className="flex flex-wrap gap-2">
                {CONTACT_METHODS.map((method) => (
                  <button
                    key={method.val}
                    type="button"
                    onClick={() => updateField("contactMethod", method.val)}
                    className={`px-4 py-2 rounded-lg text-[13px] font-medium border transition-all cursor-pointer ${
                      form.contactMethod === method.val
                        ? "border-[#0F4533] dark:border-[#AFC5B5] bg-[var(--icon-bg-brand)] text-[#0F4533] dark:text-[#AFC5B5]"
                        : "border-[var(--border)] text-[var(--muted)] hover:border-[var(--foreground)]/20"
                    }`}
                  >
                    <T k={method.key as TranslationKeys} />
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-5">
              <label htmlFor="demo-message" className="block text-[13px] font-semibold text-[var(--foreground)] mb-1.5">
                <T k="demoForm.labels.message" />
              </label>
              <textarea
                id="demo-message"
                rows={2}
                value={form.message}
                onChange={(e) => updateField("message", e.target.value)}
                className="w-full px-3 py-2.5 rounded-lg border border-[var(--border)] text-[14px] bg-[var(--background)] text-[var(--foreground)] placeholder:text-[var(--muted)]/50 transition-colors focus:outline-none focus:ring-2 focus:ring-[#0F4533]/30 resize-none"
                placeholder={t("demoForm.placeholders.message")}
              />
            </div>

            <button
              type="submit"
              disabled={status === "submitting"}
              className="mt-5 w-full h-11 rounded-xl bg-[#0F4533] text-white text-[15px] font-semibold flex items-center justify-center gap-2 transition-all hover:bg-[#0a3325] hover:shadow-lg hover:shadow-[#0F4533]/15 active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
            >
              {status === "submitting" ? (
                <>
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <T k="demoForm.submitting" />
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <T k="demoForm.submitButton" />
                </>
              )}
            </button>

            <p className="mt-3 text-center text-[12px] text-[var(--muted)]">
              <T k="demoForm.footerText.line1" />
              <br />
              <T k="demoForm.footerText.line2" /> sales@getnutria.com
            </p>
          </form>
        </AnimatedSection>
      </div>
    </section>
  );
}
