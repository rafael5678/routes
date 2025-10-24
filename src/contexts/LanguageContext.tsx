"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Language, translations, Translations } from "@/i18n/translations";

const LANGUAGE_KEY = "app-language";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  setSpanish: () => void;
  setEnglish: () => void;
  toggleLanguage: () => void;
  t: Translations;
  isSpanish: boolean;
  isEnglish: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(() => {
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

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
  };

  const setSpanish = () => setLanguageState("es");
  const setEnglish = () => setLanguageState("en");
  const toggleLanguage = () => setLanguageState(prev => prev === "es" ? "en" : "es");

  const t: Translations = translations[language];

  const value = {
    language,
    setLanguage,
    setSpanish,
    setEnglish,
    toggleLanguage,
    t,
    isSpanish: language === "es",
    isEnglish: language === "en",
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}

