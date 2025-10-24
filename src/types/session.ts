export interface SessionData {
  id: string;
  type: "Correr" | "Caminar" | "Trotar";
  date: Date;
  duration: number; // seconds
  distance: number; // meters
  calories: number;
  avgPace: string; // min/km
  steps: number;
  stepsPerMinute: number;
  positions: [number, number][]; // [lat, lng]
  route?: {
    name: string;
    difficulty: string;
  };
}

export interface WeeklyStats {
  week: number;
  totalDistance: number;
  totalTime: number;
  totalCalories: number;
  sessions: number;
}

export interface MonthlyStats {
  month: number;
  year: number;
  totalDistance: number;
  totalTime: number;
  totalCalories: number;
  sessions: number;
}

export interface Goal {
  id: string;
  type: "distance" | "steps" | "time" | "calories";
  target: number;
  current: number;
  period: "daily" | "weekly" | "monthly";
  startDate: Date;
}
