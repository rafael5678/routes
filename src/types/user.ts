export type UnitSystem = "metric" | "imperial";
export type ExperienceLevel = "beginner" | "intermediate" | "advanced";

export interface UserProfile {
  name: string;
  weight: number; // kg
  height: number; // cm
  age: number;
  gender: "male" | "female" | "other";
  experienceLevel: ExperienceLevel;
  unitSystem: UnitSystem;
  avatar?: string;
  goals: {
    dailySteps: number;
    dailyDistance: number; // meters
    weeklyRuns: number;
  };
}

export const DEFAULT_PROFILE: UserProfile = {
  name: "Atleta",
  weight: 70,
  height: 170,
  age: 25,
  gender: "other",
  experienceLevel: "beginner",
  unitSystem: "metric",
  goals: {
    dailySteps: 10000,
    dailyDistance: 3000,
    weeklyRuns: 3,
  },
};

