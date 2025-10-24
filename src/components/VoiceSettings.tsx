"use client";

import { useState, useEffect } from "react";
import { useLanguage } from "@/hooks/useLanguage";

interface VoiceSettingsData {
  enabled: boolean;
  language: "es-ES" | "en-US";
  intervalMinutes: number;
  distanceInterval: number;
}

const DEFAULT_SETTINGS: VoiceSettingsData = {
  enabled: true,
  language: "es-ES",
  intervalMinutes: 5,
  distanceInterval: 1000,
};

const STORAGE_KEY = "voice-settings";

export default function VoiceSettings() {
  const { t } = useLanguage();
  const [settings, setSettings] = useState<VoiceSettingsData>(DEFAULT_SETTINGS);
  const [isSupported, setIsSupported] = useState(false);

  useEffect(() => {
    // Check if speech synthesis is supported
    if (typeof window !== "undefined") {
      setIsSupported("speechSynthesis" in window);

      // Load settings from localStorage
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setSettings(JSON.parse(stored));
      }
    }
  }, []);

  const updateSettings = (updates: Partial<VoiceSettingsData>) => {
    const newSettings = { ...settings, ...updates };
    setSettings(newSettings);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newSettings));
  };

  const testVoice = () => {
    if (!isSupported) return;

    const messages = {
      "es-ES": "Esta es una prueba de las notificaciones de voz. Has recorrido 5 kilómetros en 30 minutos.",
      "en-US": "This is a test of voice notifications. You've covered 5 kilometers in 30 minutes.",
    };

    const utterance = new SpeechSynthesisUtterance(messages[settings.language]);
    utterance.lang = settings.language;
    utterance.rate = 0.9;
    window.speechSynthesis.speak(utterance);
  };

  if (!isSupported) {
    return (
      <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-xl p-6 border-2 border-yellow-300 dark:border-yellow-700">
        <div className="flex items-start gap-3">
          <span className="text-3xl">⚠️</span>
          <div>
            <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-2">
              {t.voice.notSupported}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {t.voice.notSupportedDesc}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">🔊 {t.voice.title}</h2>
        <button
          onClick={testVoice}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors"
        >
          🔊 {t.voice.test}
        </button>
      </div>

      {/* Enable/Disable */}
      <div className="bg-linear-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-xl p-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
              {t.voice.enable}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {t.voice.listenWhileRunning}
            </p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={settings.enabled}
              onChange={(e) => updateSettings({ enabled: e.target.checked })}
              className="sr-only peer"
            />
            <div className="w-14 h-8 bg-gray-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-6 peer-checked:after:border-white after:content-[''] after:absolute after:top-1 after:left-1 after:bg-white after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-blue-500"></div>
          </label>
        </div>
      </div>

      {/* Language */}
      <div className="bg-linear-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 rounded-xl p-4">
        <h3 className="font-semibold text-gray-900 dark:text-white mb-3">🌍 {t.voice.language}</h3>
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => updateSettings({ language: "es-ES" })}
            className={`px-4 py-3 rounded-lg font-semibold transition-all ${
              settings.language === "es-ES"
                ? "bg-purple-500 text-white scale-105 shadow-lg"
                : "bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-purple-100 dark:hover:bg-gray-600"
            }`}
          >
            🇪🇸 {t.voice.spanish}
          </button>
          <button
            onClick={() => updateSettings({ language: "en-US" })}
            className={`px-4 py-3 rounded-lg font-semibold transition-all ${
              settings.language === "en-US"
                ? "bg-purple-500 text-white scale-105 shadow-lg"
                : "bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-purple-100 dark:hover:bg-gray-600"
            }`}
          >
            🇺🇸 {t.voice.english}
          </button>
        </div>
      </div>

      {/* Time Interval */}
      <div className="bg-linear-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 rounded-xl p-4">
        <h3 className="font-semibold text-gray-900 dark:text-white mb-3">⏱️ {t.voice.timeInterval}</h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
          {t.voice.everyMinutes}
        </p>
        <div className="grid grid-cols-4 gap-2">
          {[0, 3, 5, 10].map((minutes) => (
            <button
              key={minutes}
              onClick={() => updateSettings({ intervalMinutes: minutes })}
              className={`px-3 py-2 rounded-lg font-semibold text-sm transition-all ${
                settings.intervalMinutes === minutes
                  ? "bg-green-500 text-white scale-105 shadow-lg"
                  : "bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-green-100 dark:hover:bg-gray-600"
              }`}
            >
              {minutes === 0 ? t.voice.off : `${minutes} min`}
            </button>
          ))}
        </div>
      </div>

      {/* Distance Interval */}
      <div className="bg-linear-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 rounded-xl p-4">
        <h3 className="font-semibold text-gray-900 dark:text-white mb-3">📏 {t.voice.distanceInterval}</h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
          {t.voice.announcementPerKm}
        </p>
        <div className="grid grid-cols-3 gap-2">
          {[0, 500, 1000].map((meters) => (
            <button
              key={meters}
              onClick={() => updateSettings({ distanceInterval: meters })}
              className={`px-3 py-2 rounded-lg font-semibold text-sm transition-all ${
                settings.distanceInterval === meters
                  ? "bg-orange-500 text-white scale-105 shadow-lg"
                  : "bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-orange-100 dark:hover:bg-gray-600"
              }`}
            >
              {meters === 0 ? t.voice.off : `${meters / 1000} km`}
            </button>
          ))}
        </div>
      </div>

      {/* Info */}
      <div className="bg-linear-to-br from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-600 rounded-xl p-4">
        <h3 className="font-semibold text-gray-900 dark:text-white mb-2">💡 {t.voice.infoTitle}</h3>
        <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1 list-disc list-inside">
          <li>{t.voice.info1}</li>
          <li>{t.voice.info2}</li>
          <li>{t.voice.info3}</li>
          <li>{t.voice.info4}</li>
        </ul>
      </div>
    </div>
  );
}

export function getVoiceSettings(): VoiceSettingsData {
  if (typeof window === "undefined") return DEFAULT_SETTINGS;
  
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    return JSON.parse(stored);
  }
  return DEFAULT_SETTINGS;
}

