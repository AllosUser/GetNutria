"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { ThemeToggle } from "./theme-toggle";
import Image from "next/image";
import { useTranslation, T } from "@/i18n/LanguageContext";

const NAV_LINKS = [
  { key: "nav.features", href: "#features" },
  { key: "nav.aiTools", href: "#ai-tools" },
  { key: "nav.howItWorks", href: "#how-it-works" },
  { key: "nav.bookDemo", href: "#book-demo" },
] as const;

export function LanguageToggle() {
  const { language, setLanguage, isMounted } = useTranslation();

  if (!isMounted) {
    return (
      <div className="flex items-center text-[12px] font-semibold text-[var(--muted)] px-3 select-none">
        EN
      </div>
    );
  }

  return (
    <div className="flex items-center text-[11px] font-semibold tracking-wider select-none bg-[var(--surface-elevated)] border border-[var(--border-light)] p-0.5 rounded-lg shadow-2xs">
      <button
        type="button"
        onClick={() => setLanguage("en")}
        className={`px-2 py-0.5 rounded-md transition-all duration-200 cursor-pointer ${
          language === "en"
            ? "bg-[var(--brand)] text-white dark:bg-[var(--brand)] dark:text-[var(--background)] shadow-xs"
            : "text-[var(--muted)] hover:text-[var(--foreground)] hover:bg-[var(--hover)]"
        }`}
      >
        EN
      </button>
      <button
        type="button"
        onClick={() => setLanguage("el")}
        className={`px-2 py-0.5 rounded-md transition-all duration-200 cursor-pointer ${
          language === "el"
            ? "bg-[var(--brand)] text-white dark:bg-[var(--brand)] dark:text-[var(--background)] shadow-xs"
            : "text-[var(--muted)] hover:text-[var(--foreground)] hover:bg-[var(--hover)]"
        }`}
      >
        ΕΛ
      </button>
    </div>
  );
}

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-[var(--surface)]/80 backdrop-blur-xl border-b border-[var(--border-light)] shadow-[0_1px_3px_var(--shadow-card)]"
            : "bg-transparent"
        }`}
      >
        <div className="mx-auto max-w-6xl flex items-center justify-between px-6 h-16">
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="flex items-center gap-2.5 group"
          >
            <Image
              src="/brand/source-logo.png"
              alt="GetNutria"
              width={32}
              height={32}
              className="h-8 w-8 rounded-lg object-contain"
            />
            <Image
              src="/brand/getnutria-text-only.png"
              alt="GetNutria"
              width={120}
              height={24}
              className="h-5 w-auto object-contain"
            />
          </a>

          <div className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="px-4 py-2 text-[13px] font-medium text-[var(--muted)] rounded-lg transition-colors hover:text-[var(--foreground)] hover:bg-[var(--hover)]"
              >
                <T k={link.key} />
              </a>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-3">
            <LanguageToggle />
            <ThemeToggle />
            <a
              href="#book-demo"
              className="inline-flex items-center justify-center h-9 px-4 text-[13px] font-semibold text-white bg-[#0F4533] rounded-lg transition-all hover:bg-[#0a3325] hover:shadow-md active:scale-[0.98]"
            >
              <T k="nav.bookDemo" />
            </a>
          </div>

          <div className="flex items-center gap-2 md:hidden">
            <LanguageToggle />
            <ThemeToggle />
            <button
              type="button"
              onClick={() => setMobileOpen(!mobileOpen)}
              className="p-2 rounded-lg text-[var(--muted)] hover:bg-[var(--hover)] cursor-pointer"
            >
              {mobileOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>
      </motion.nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 top-16 z-40 bg-[var(--surface)]/95 backdrop-blur-xl border-b border-[var(--border)] shadow-lg md:hidden"
          >
            <div className="px-6 py-4 space-y-1">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="block px-4 py-3 text-[15px] font-medium text-[var(--foreground)] rounded-lg hover:bg-[var(--hover)]"
                >
                  <T k={link.key} />
                </a>
              ))}
              <div className="pt-3 border-t border-[var(--border-light)]">
                <a
                  href="#book-demo"
                  onClick={() => setMobileOpen(false)}
                  className="block w-full text-center py-3 text-[15px] font-semibold text-white bg-[#0F4533] rounded-lg"
                >
                  <T k="nav.bookDemo" />
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
