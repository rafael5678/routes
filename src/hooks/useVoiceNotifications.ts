"use client";

import { useEffect, useRef, useState } from "react";

interface VoiceNotificationOptions {
  enabled: boolean;
  language: "es-ES" | "en-US";
  intervalMinutes: number; // Interval for periodic updates (0 = disabled)
  distanceInterval: number; // Distance interval in meters (0 = disabled)
}

const DEFAULT_OPTIONS: VoiceNotificationOptions = {
  enabled: true,
  language: "es-ES",
  intervalMinutes: 5,
  distanceInterval: 1000, // Every 1km
};

export function useVoiceNotifications(options: Partial<VoiceNotificationOptions> = {}) {
  const config = { ...DEFAULT_OPTIONS, ...options };
  const [isSupported, setIsSupported] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const lastDistanceNotification = useRef(0);
  const lastTimeNotification = useRef(0);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsSupported("speechSynthesis" in window);
    }
  }, []);

  const speak = (text: string, force = false) => {
    if (!isSupported || (!config.enabled && !force)) return;

    // Cancel any ongoing speech
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = config.language;
    utterance.rate = 0.9; // Slightly slower for clarity
    utterance.pitch = 1;
    utterance.volume = 1;

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    window.speechSynthesis.speak(utterance);
  };

  const announceStart = () => {
    const messages = {
      "es-ES": "Iniciando sesión. ¡Buena suerte!",
      "en-US": "Starting session. Good luck!",
    };
    speak(messages[config.language], true);
  };

  const announcePause = () => {
    const messages = {
      "es-ES": "Sesión pausada",
      "en-US": "Session paused",
    };
    speak(messages[config.language], true);
  };

  const announceResume = () => {
    const messages = {
      "es-ES": "Continuando",
      "en-US": "Resuming",
    };
    speak(messages[config.language], true);
  };

  const announceStop = (stats: { distance: number; time: number; calories: number }) => {
    const distanceKm = (stats.distance / 1000).toFixed(2);
    const timeMin = Math.floor(stats.time / 60);

    const messages = {
      "es-ES": `Sesión finalizada. Has recorrido ${distanceKm} kilómetros en ${timeMin} minutos, quemando ${stats.calories} calorías. ¡Excelente trabajo!`,
      "en-US": `Session completed. You covered ${distanceKm} kilometers in ${timeMin} minutes, burning ${stats.calories} calories. Great job!`,
    };
    speak(messages[config.language], true);
  };

  const announceStats = (stats: {
    distance: number;
    time: number;
    speed: number;
    calories: number;
  }) => {
    if (!config.enabled) return;

    const distanceKm = (stats.distance / 1000).toFixed(1);
    const timeMin = Math.floor(stats.time / 60);
    const speedKmh = stats.speed.toFixed(1);

    const messages = {
      "es-ES": `Has recorrido ${distanceKm} kilómetros en ${timeMin} minutos. Velocidad actual: ${speedKmh} kilómetros por hora. Calorías quemadas: ${stats.calories}`,
      "en-US": `You've covered ${distanceKm} kilometers in ${timeMin} minutes. Current speed: ${speedKmh} kilometers per hour. Calories burned: ${stats.calories}`,
    };

    speak(messages[config.language]);
  };

  const announceDistance = (distanceKm: number) => {
    if (!config.enabled) return;

    const messages = {
      "es-ES": `Has completado ${distanceKm} kilómetros`,
      "en-US": `You've completed ${distanceKm} kilometers`,
    };

    speak(messages[config.language]);
  };

  const announceGoalReached = (goalName: string) => {
    const messages = {
      "es-ES": `¡Felicidades! Has alcanzado tu meta de ${goalName}`,
      "en-US": `Congratulations! You've reached your goal of ${goalName}`,
    };

    speak(messages[config.language], true);
  };

  const announceAchievement = (achievementName: string) => {
    const messages = {
      "es-ES": `¡Nuevo logro desbloqueado! ${achievementName}`,
      "en-US": `New achievement unlocked! ${achievementName}`,
    };

    speak(messages[config.language], true);
  };

  // Check if it's time for periodic notifications
  const checkPeriodicNotifications = (
    currentDistance: number,
    currentTime: number,
    stats: { distance: number; time: number; speed: number; calories: number }
  ) => {
    // Distance-based notifications
    if (config.distanceInterval > 0) {
      const currentKm = Math.floor(currentDistance / config.distanceInterval);
      const lastKm = Math.floor(lastDistanceNotification.current / config.distanceInterval);

      if (currentKm > lastKm) {
        lastDistanceNotification.current = currentDistance;
        announceDistance(currentKm);
        return;
      }
    }

    // Time-based notifications
    if (config.intervalMinutes > 0) {
      const currentInterval = Math.floor(currentTime / (config.intervalMinutes * 60));
      const lastInterval = Math.floor(lastTimeNotification.current / (config.intervalMinutes * 60));

      if (currentInterval > lastInterval) {
        lastTimeNotification.current = currentTime;
        announceStats(stats);
      }
    }
  };

  const reset = () => {
    lastDistanceNotification.current = 0;
    lastTimeNotification.current = 0;
    window.speechSynthesis?.cancel();
  };

  return {
    isSupported,
    isSpeaking,
    speak,
    announceStart,
    announcePause,
    announceResume,
    announceStop,
    announceStats,
    announceDistance,
    announceGoalReached,
    announceAchievement,
    checkPeriodicNotifications,
    reset,
  };
}

