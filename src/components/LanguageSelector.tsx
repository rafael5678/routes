"use client";

import { useLanguage } from "@/hooks/useLanguage";
import { useEffect, useState } from "react";

export default function LanguageSelector() {
  const { language, setLanguage } = useLanguage();
  const [mounted, setMounted] = useState(false);

  // Avoid hydration mismatch by only rendering after mount
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    // Return a placeholder that matches the server render
    return (
      <div className="flex gap-2 bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
        <button
          className="px-3 py-1.5 rounded-md text-sm font-semibold bg-white dark:bg-gray-600 text-purple-600 dark:text-purple-300 shadow-md scale-105"
          disabled
        >
          🇪🇸 ES
        </button>
        <button
          className="px-3 py-1.5 rounded-md text-sm font-semibold text-gray-600 dark:text-gray-400"
          disabled
        >
          🇺🇸 EN
        </button>
      </div>
    );
  }

  return (
    <div className="flex gap-2 bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
      <button
        onClick={() => setLanguage("es")}
        className={`px-3 py-1.5 rounded-md text-sm font-semibold transition-all ${
          language === "es"
            ? "bg-white dark:bg-gray-600 text-purple-600 dark:text-purple-300 shadow-md scale-105"
            : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
        }`}
      >
        🇪🇸 ES
      </button>
      <button
        onClick={() => setLanguage("en")}
        className={`px-3 py-1.5 rounded-md text-sm font-semibold transition-all ${
          language === "en"
            ? "bg-white dark:bg-gray-600 text-purple-600 dark:text-purple-300 shadow-md scale-105"
            : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
        }`}
      >
        🇺🇸 EN
      </button>
    </div>
  );
}

