"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import en from "./locales/en.json";
import el from "./locales/el.json";

// Type check: ensure el.json matches the structure of en.json exactly
export const _checkEl: typeof en = el;

export type Translations = typeof en;

// Helper types to extract nested dot notation paths from Translation object
type Prev = [never, 0, 1, 2, 3, 4, 5, ...0[]];

type Join<K, P> = K extends string | number ?
    P extends string | number ?
    `${K}${"" extends P ? "" : "."}${P}`
    : never : never;

export type TranslationKeys = {
  [K in keyof Translations]: Translations[K] extends string
    ? K
    : Translations[K] extends object
    ? Join<K, Paths<Translations[K]>>
    : never;
}[keyof Translations];

type Paths<T, D extends number = 4> = [D] extends [never]
  ? never
  : T extends object
  ? {
      [K in keyof T]-?: K extends string | number
        ? T[K] extends string
          ? K
          : T[K] extends object
          ? Join<K, Paths<T[K], Prev[D]>>
          : never
        : never;
    }[keyof T]
  : "";

export type Language = "en" | "el";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: TranslationKeys) => string;
  isMounted: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function getNestedValue(obj: any, path: string): string | undefined {
  const parts = path.split(".");
  let current = obj;
  for (const part of parts) {
    if (current == null || typeof current !== "object") return undefined;
    current = current[part];
  }
  return typeof current === "string" ? current : undefined;
}

// Static lookup helpers for zero-flicker T component
export function tEn(key: TranslationKeys): string {
  return getNestedValue(en, key) || key;
}

export function tEl(key: TranslationKeys): string {
  const val = getNestedValue(el, key);
  if (val === undefined) {
    if (process.env.NODE_ENV !== "production") {
      console.warn(`[i18n] Missing Greek translation key: "${key}"`);
    }
    return tEn(key);
  }
  return val;
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>("en");
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    // Read from localStorage on mount
    try {
      const stored = localStorage.getItem("language");
      if (stored === "el" || stored === "en") {
        setTimeout(() => {
          setLanguageState(stored);
        }, 0);
        document.documentElement.setAttribute("data-lang", stored);
        document.documentElement.lang = stored;
      } else {
        // Default to English if not set
        document.documentElement.setAttribute("data-lang", "en");
        document.documentElement.lang = "en";
      }
    } catch (e) {
      console.error("Failed to read language from localStorage", e);
    }
    setTimeout(() => {
      setIsMounted(true);
    }, 0);
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    try {
      localStorage.setItem("language", lang);
      document.documentElement.setAttribute("data-lang", lang);
      document.documentElement.lang = lang;
    } catch (e) {
      console.error("Failed to save language to localStorage", e);
    }
  };

  const t = (key: TranslationKeys): string => {
    const currentLocale = language === "el" ? el : en;
    let val = getNestedValue(currentLocale, key);

    if (val === undefined) {
      // Fallback to English
      val = getNestedValue(en, key);
      if (process.env.NODE_ENV !== "production") {
        console.warn(
          `[i18n] Missing translation key "${key}" in language "${language}". Flipped to English fallback.`
        );
      }
    }

    return val || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, isMounted }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useTranslation() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useTranslation must be used within a LanguageProvider");
  }
  return context;
}

// Zero-flicker component that renders both languages and lets CSS manage visibility
export function T({ k }: { k: TranslationKeys }) {
  return (
    <>
      <span className="lang-en" suppressHydrationWarning={true}>
        {tEn(k)}
      </span>
      <span className="lang-el" suppressHydrationWarning={true}>
        {tEl(k)}
      </span>
    </>
  );
}
