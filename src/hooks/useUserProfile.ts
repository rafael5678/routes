"use client";

import { useState, useEffect } from "react";
import { UserProfile, DEFAULT_PROFILE } from "@/types/user";

const PROFILE_KEY = "user-profile";

export function useUserProfile() {
  const [profile, setProfile] = useState<UserProfile>(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem(PROFILE_KEY);
      if (stored) {
        try {
          return JSON.parse(stored);
        } catch {
          return DEFAULT_PROFILE;
        }
      }
    }
    return DEFAULT_PROFILE;
  });

  const [isFirstTime, setIsFirstTime] = useState(() => {
    if (typeof window !== "undefined") {
      return !localStorage.getItem(PROFILE_KEY);
    }
    return true;
  });

  // Save to localStorage whenever profile changes
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
      if (isFirstTime) {
        setIsFirstTime(false);
      }
    }
  }, [profile, isFirstTime]);

  const updateProfile = (updates: Partial<UserProfile>) => {
    setProfile(prev => ({ ...prev, ...updates }));
  };

  const updateGoals = (goals: Partial<UserProfile["goals"]>) => {
    setProfile(prev => ({
      ...prev,
      goals: { ...prev.goals, ...goals },
    }));
  };

  // Calculate BMR (Basal Metabolic Rate) using Mifflin-St Jeor Equation
  const calculateBMR = () => {
    const { weight, height, age, gender } = profile;
    if (gender === "male") {
      return 10 * weight + 6.25 * height - 5 * age + 5;
    } else if (gender === "female") {
      return 10 * weight + 6.25 * height - 5 * age - 161;
    }
    // Default to average for "other"
    return 10 * weight + 6.25 * height - 5 * age - 78;
  };

  // Calculate calories burned per kilometer
  const calculateCaloriesPerKm = () => {
    // MET (Metabolic Equivalent) for running is approximately 9.8
    // Calories = MET × weight(kg) × time(hours)
    // Average running speed: 10 km/h (6 min/km)
    // Time for 1 km at 10 km/h = 0.1 hours
    const met = profile.experienceLevel === "beginner" ? 8 : 
                profile.experienceLevel === "intermediate" ? 9.8 : 11;
    return met * profile.weight * 0.1; // 0.1 hours per km at 10 km/h
  };

  // Convert meters to user's preferred unit
  const formatDistance = (meters: number) => {
    if (profile.unitSystem === "metric") {
      if (meters >= 1000) {
        return `${(meters / 1000).toFixed(2)} km`;
      }
      return `${meters.toFixed(0)} m`;
    } else {
      const miles = meters * 0.000621371;
      if (miles >= 1) {
        return `${miles.toFixed(2)} mi`;
      }
      const feet = meters * 3.28084;
      return `${feet.toFixed(0)} ft`;
    }
  };

  // Convert speed to user's preferred unit
  const formatSpeed = (kmh: number) => {
    if (profile.unitSystem === "metric") {
      return `${kmh.toFixed(1)} km/h`;
    } else {
      const mph = kmh * 0.621371;
      return `${mph.toFixed(1)} mph`;
    }
  };

  return {
    profile,
    updateProfile,
    updateGoals,
    isFirstTime,
    calculateBMR,
    calculateCaloriesPerKm,
    formatDistance,
    formatSpeed,
  };
}

