export interface RouteData {
  distanceKm: number;
  durationMin: number;
  geometry: [number, number][]; // [lng, lat]
}

export interface DailyProgress {
  totalDistance: number; // in meters
  totalTime: number; // in minutes
  totalCalories: number;
  goal: number; // daily goal in meters
}

export interface MapState {
  start: [number, number] | null; // [lat, lng]
  end: [number, number] | null;
  route: RouteData | null;
  locating: boolean;
}
