"use client";

import { useState, useEffect } from "react";
import { DailyProgress } from "@/types";

const STORAGE_KEY = "daily-progress";

export function useProgress() {
  const [progress, setProgress] = useState<DailyProgress>(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    }
    return {
      totalDistance: 0,
      totalTime: 0,
      totalCalories: 0,
      goal: 3000,
    };
  });

  // Save to localStorage whenever progress changes
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    }
  }, [progress]);

  const addRoute = (distanceKm: number, durationMin: number) => {
    const distanceMeters = distanceKm * 1000;
    const calories = Math.round(distanceKm * 50); // Simple calculation: 50 cal/km
    
    setProgress(prev => ({
      ...prev,
      totalDistance: prev.totalDistance + distanceMeters,
      totalTime: prev.totalTime + durationMin,
      totalCalories: prev.totalCalories + calories,
    }));
  };

  const updateGoal = (newGoal: number) => {
    setProgress(prev => ({
      ...prev,
      goal: newGoal,
    }));
  };

  const resetProgress = () => {
    setProgress(prev => ({
      ...prev,
      totalDistance: 0,
      totalTime: 0,
      totalCalories: 0,
    }));
  };

  const getProgressPercentage = () => {
    return Math.min((progress.totalDistance / progress.goal) * 100, 100);
  };

  const getRemainingDistance = () => {
    return Math.max(progress.goal - progress.totalDistance, 0);
  };

  return {
    progress,
    addRoute,
    updateGoal,
    resetProgress,
    getProgressPercentage,
    getRemainingDistance,
  };
}
