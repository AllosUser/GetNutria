"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { ThemeToggle } from "./theme-toggle";

const NAV_LINKS = [
  { label: "Features", href: "#features" },
  { label: "How it works", href: "#how-it-works" },
  { label: "Pricing", href: "#pricing" },
];

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
          {/* Logo */}
          <a href="#" className="flex items-center gap-2.5 group">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center shadow-sm">
              <span className="text-white font-bold text-sm">G</span>
            </div>
            <span className="text-[17px] font-bold tracking-tight text-[var(--foreground)]">
              GetNutria
            </span>
          </a>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="px-4 py-2 text-[13px] font-medium text-[var(--muted)] rounded-lg transition-colors hover:text-[var(--foreground)] hover:bg-[var(--hover)]"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-3">
            <ThemeToggle />
            <a
              href="#pricing"
              className="text-[13px] font-medium text-[var(--muted)] hover:text-[var(--foreground)] transition-colors px-3 py-2"
            >
              Sign in
            </a>
            <a
              href="#pricing"
              className="inline-flex items-center justify-center h-9 px-4 text-[13px] font-semibold dark:text-[var(--background)] text-white bg-[var(--foreground)] rounded-lg transition-all hover:bg-[var(--foreground)]/90 hover:shadow-md active:scale-[0.98]"
            >
              Get Started
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center gap-1 md:hidden">
            <ThemeToggle />
            <button
              type="button"
              onClick={() => setMobileOpen(!mobileOpen)}
              className="p-2 rounded-lg text-[var(--muted)] hover:bg-[var(--hover)]"
            >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile menu */}
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
                  {link.label}
                </a>
              ))}
              <div className="pt-3 border-t border-[var(--border-light)]">
                <a
                  href="#pricing"
                  onClick={() => setMobileOpen(false)}
                  className="block w-full text-center py-3 text-[15px] font-semibold text-white bg-[var(--foreground)] rounded-lg"
                >
                  Get Started
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
