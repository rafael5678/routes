"use client";

import { useState, useEffect, useCallback } from "react";
import { Achievement, ACHIEVEMENTS } from "@/types/achievements";
import { useSessionHistory } from "./useSessionHistory";

const STORAGE_KEY = "user-achievements";

export function useAchievements() {
  const { sessions, getAllTimeStats } = useSessionHistory();
  const [achievements, setAchievements] = useState<Achievement[]>([]);

  // Load achievements from localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const storedAchievements = JSON.parse(stored);
        setAchievements(storedAchievements);
      } else {
        // Initialize with default achievements
        const initialAchievements = ACHIEVEMENTS.map(ach => ({
          ...ach,
          unlocked: false,
          progress: 0,
        }));
        setAchievements(initialAchievements);
      }
    }
  }, []);

  // Save achievements to localStorage
  useEffect(() => {
    if (typeof window !== "undefined" && achievements.length > 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(achievements));
    }
  }, [achievements]);

  // Check and update achievements
  const checkAchievements = useCallback(() => {
    if (sessions.length === 0) return [];

    const allTimeStats = getAllTimeStats();
    const newlyUnlocked: Achievement[] = [];

    setAchievements(prev => {
      return prev.map(ach => {
        if (ach.unlocked) return ach;

        let currentProgress = 0;
        let shouldUnlock = false;

        switch (ach.id) {
          // Distance achievements
          case "first-run":
            shouldUnlock = sessions.length >= 1;
            currentProgress = sessions.length >= 1 ? 100 : 0;
            break;
          case "5km-runner":
            const has5km = sessions.some(s => s.distance >= 5000);
            shouldUnlock = has5km;
            currentProgress = has5km ? 100 : Math.min((Math.max(...sessions.map(s => s.distance)) / 5000) * 100, 100);
            break;
          case "10km-runner":
            const has10km = sessions.some(s => s.distance >= 10000);
            shouldUnlock = has10km;
            currentProgress = has10km ? 100 : Math.min((Math.max(...sessions.map(s => s.distance)) / 10000) * 100, 100);
            break;
          case "half-marathon":
            const hasHalf = sessions.some(s => s.distance >= 21100);
            shouldUnlock = hasHalf;
            currentProgress = hasHalf ? 100 : Math.min((Math.max(...sessions.map(s => s.distance)) / 21100) * 100, 100);
            break;
          case "marathon":
            const hasMarathon = sessions.some(s => s.distance >= 42200);
            shouldUnlock = hasMarathon;
            currentProgress = hasMarathon ? 100 : Math.min((Math.max(...sessions.map(s => s.distance)) / 42200) * 100, 100);
            break;
          case "100km-total":
            shouldUnlock = allTimeStats.totalDistance >= 100000;
            currentProgress = Math.min((allTimeStats.totalDistance / 100000) * 100, 100);
            break;

          // Time achievements
          case "30min-run":
            const has30min = sessions.some(s => s.duration >= 1800);
            shouldUnlock = has30min;
            currentProgress = has30min ? 100 : Math.min((Math.max(...sessions.map(s => s.duration)) / 1800) * 100, 100);
            break;
          case "1hour-run":
            const has1hour = sessions.some(s => s.duration >= 3600);
            shouldUnlock = has1hour;
            currentProgress = has1hour ? 100 : Math.min((Math.max(...sessions.map(s => s.duration)) / 3600) * 100, 100);
            break;
          case "10hours-total":
            shouldUnlock = allTimeStats.totalTime >= 36000;
            currentProgress = Math.min((allTimeStats.totalTime / 36000) * 100, 100);
            break;

          // Consistency achievements
          case "100-sessions":
            shouldUnlock = sessions.length >= 100;
            currentProgress = Math.min((sessions.length / 100) * 100, 100);
            break;

          // Speed achievements
          case "speed-5kmh":
          case "speed-10kmh":
          case "speed-15kmh":
          case "speed-20kmh":
            const targetSpeed = parseInt(ach.id.split("-")[1]);
            const maxSpeed = Math.max(...sessions.map(s => {
              const pace = parseFloat(s.avgPace.split(":")[0]);
              return pace > 0 ? 60 / pace : 0;
            }));
            shouldUnlock = maxSpeed >= targetSpeed;
            currentProgress = Math.min((maxSpeed / targetSpeed) * 100, 100);
            break;

          // Special achievements
          case "1000-calories":
            const has1000cal = sessions.some(s => s.calories >= 1000);
            shouldUnlock = has1000cal;
            currentProgress = has1000cal ? 100 : Math.min((Math.max(...sessions.map(s => s.calories)) / 1000) * 100, 100);
            break;

          default:
            currentProgress = 0;
        }

        if (shouldUnlock && !ach.unlocked) {
          newlyUnlocked.push({ ...ach, unlocked: true, unlockedDate: new Date(), progress: 100 });
          return { ...ach, unlocked: true, unlockedDate: new Date(), progress: 100 };
        }

        return { ...ach, progress: currentProgress };
      });
    });

    return newlyUnlocked;
  }, [sessions, getAllTimeStats]);

  // Auto-check achievements when sessions change
  useEffect(() => {
    checkAchievements();
  }, [sessions.length, checkAchievements]);

  const getUnlockedCount = () => {
    return achievements.filter(a => a.unlocked).length;
  };

  const getTotalCount = () => {
    return achievements.length;
  };

  const getProgressPercentage = () => {
    return Math.round((getUnlockedCount() / getTotalCount()) * 100);
  };

  const getAchievementsByCategory = (category: Achievement["category"]) => {
    return achievements.filter(a => a.category === category);
  };

  return {
    achievements,
    checkAchievements,
    getUnlockedCount,
    getTotalCount,
    getProgressPercentage,
    getAchievementsByCategory,
  };
}

