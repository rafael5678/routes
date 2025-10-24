"use client";

import { useState, useEffect } from "react";
import { Language, translations, Translations } from "@/i18n/translations";

const LANGUAGE_KEY = "app-language";

export function useLanguage() {
  const [language, setLanguage] = useState<Language>(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem(LANGUAGE_KEY) as Language;
      if (stored && (stored === "es" || stored === "en")) {
        return stored;
      }
      
      // Detect browser language
      const browserLang = navigator.language.toLowerCase();
      if (browserLang.startsWith("es")) {
        return "es";
      }
    }
    return "es"; // Default to Spanish
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem(LANGUAGE_KEY, language);
    }
  }, [language]);

  const setSpanish = () => setLanguage("es");
  const setEnglish = () => setLanguage("en");
  const toggleLanguage = () => setLanguage(prev => prev === "es" ? "en" : "es");

  const t: Translations = translations[language];

  return {
    language,
    setLanguage,
    setSpanish,
    setEnglish,
    toggleLanguage,
    t, // translations
    isSpanish: language === "es",
    isEnglish: language === "en",
  };
}

