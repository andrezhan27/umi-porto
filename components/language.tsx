"use client";

import { usePathname } from "next/navigation";
import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { copy, defaultLocale, languages, type Locale } from "../app/copy";

const storageKey = "umi-language";
const LanguageContext = createContext({ locale: defaultLocale, setLocale: (_locale: Locale) => {} });

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, updateLocale] = useState<Locale>(defaultLocale);
  const pathname = usePathname();

  useEffect(() => {
    try {
      const saved = localStorage.getItem(storageKey);
      if (saved === "en" || saved === "pt") updateLocale(saved);
    } catch {
      // The switch still works if the browser blocks storage.
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = languages[locale].tag;
    document.title = pathname === "/reservation" ? copy[locale].booking.title : copy[locale].pageTitle;
  }, [locale, pathname]);

  function setLocale(next: Locale) {
    updateLocale(next);
    try {
      localStorage.setItem(storageKey, next);
    } catch {
      // Keep the selection for the current visit.
    }
  }

  return <LanguageContext.Provider value={{ locale, setLocale }}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const { locale, setLocale } = useContext(LanguageContext);
  return { locale, setLocale, copy: copy[locale] };
}
