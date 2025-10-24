"use client";

import { useLanguage } from "@/hooks/useLanguage";

interface RunningRoute {
  name: string;
  distance: number; // in km
  difficulty: "easy" | "moderate" | "difficult";
  estimatedTime: number; // in minutes
  waypoints: [number, number][]; // Array of [lat, lng]
  description: string;
}

interface RunningRoutesProps {
  onRouteSelect: (route: RunningRoute) => void;
}

const getRoutes = (t: any): RunningRoute[] => [
  {
    name: t.routes.route1Name,
    distance: 2.5,
    difficulty: "easy",
    estimatedTime: 15,
    waypoints: [
      [1.2098, -77.2765], // Universidad Cooperativa
      [1.2105, -77.2778], // Universidad de Nariño
      [1.2110, -77.2770],
      [1.2100, -77.2755],
      [1.2098, -77.2765], // Regreso
    ],
    description: t.routes.route1Desc
  },
  {
    name: t.routes.route2Name,
    distance: 5.0,
    difficulty: "moderate",
    estimatedTime: 30,
    waypoints: [
      [1.2098, -77.2765], // Universidad
      [1.2090, -77.2780],
      [1.2086, -77.2789], // Centro de Pasto
      [1.2078, -77.2798], // Plaza de Nariño
      [1.2086, -77.2789],
      [1.2098, -77.2765], // Regreso
    ],
    description: t.routes.route2Desc
  },
  {
    name: t.routes.route3Name,
    distance: 3.5,
    difficulty: "easy",
    estimatedTime: 20,
    waypoints: [
      [1.2098, -77.2765], // Universidad
      [1.2150, -77.2820],
      [1.2189, -77.2856], // Parque de la Salud
      [1.2167, -77.2834], // Hospital
      [1.2098, -77.2765], // Regreso
    ],
    description: t.routes.route3Desc
  },
  {
    name: t.routes.route4Name,
    distance: 7.5,
    difficulty: "difficult",
    estimatedTime: 45,
    waypoints: [
      [1.2098, -77.2765], // Universidad
      [1.2080, -77.2770],
      [1.2056, -77.2756], // Terminal
      [1.2070, -77.2780],
      [1.2086, -77.2789], // Centro
      [1.2098, -77.2765], // Regreso
    ],
    description: t.routes.route4Desc
  }
];

export default function RunningRoutes({ onRouteSelect }: RunningRoutesProps) {
  const { t } = useLanguage();
  const RUNNING_ROUTES = getRoutes(t);
  
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "easy": return "bg-green-100 text-green-800 border-green-300 dark:bg-green-900 dark:text-green-200";
      case "moderate": return "bg-yellow-100 text-yellow-800 border-yellow-300 dark:bg-yellow-900 dark:text-yellow-200";
      case "difficult": return "bg-red-100 text-red-800 border-red-300 dark:bg-red-900 dark:text-red-200";
      default: return "bg-gray-100 text-gray-800 border-gray-300";
    }
  };

  const getDifficultyLabel = (difficulty: string) => {
    switch (difficulty) {
      case "easy": return t.routes.easy;
      case "moderate": return t.routes.moderate;
      case "difficult": return t.routes.difficult;
      default: return difficulty;
    }
  };

  return (
    <section className="bg-linear-to-br from-blue-50 to-indigo-50 dark:from-blue-900 dark:to-indigo-900 rounded-2xl p-4 border border-blue-200 dark:border-blue-700">
      <div className="flex items-center gap-2 mb-3">
        <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
          <span className="text-white text-lg">🏃</span>
        </div>
        <div>
          <p className="font-bold text-blue-900 dark:text-blue-100">{t.routes.title}</p>
          <p className="text-xs text-blue-600 dark:text-blue-300">{t.routes.selectRoute}</p>
        </div>
      </div>
      
      <div className="grid gap-3">
        {RUNNING_ROUTES.map((route, index) => (
          <button
            key={index}
            onClick={() => onRouteSelect(route)}
            className="p-3 rounded-xl bg-white dark:bg-gray-800 border-2 border-blue-200 dark:border-blue-700 hover:border-blue-400 dark:hover:border-blue-500 hover:shadow-lg transition-all duration-200 text-left"
          >
            <div className="flex items-start justify-between mb-2">
              <div className="flex-1">
                <p className="text-sm font-bold text-gray-900 dark:text-white">{route.name}</p>
                <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">{route.description}</p>
              </div>
              <span className={`text-xs px-2 py-1 rounded-full border ${getDifficultyColor(route.difficulty)}`}>
                {getDifficultyLabel(route.difficulty)}
              </span>
            </div>
            
            <div className="flex items-center gap-4 text-xs text-gray-700 dark:text-gray-300">
              <div className="flex items-center gap-1">
                <span>📏</span>
                <span className="font-semibold">{route.distance} km</span>
              </div>
              <div className="flex items-center gap-1">
                <span>⏱️</span>
                <span className="font-semibold">{route.estimatedTime} min</span>
              </div>
            </div>
          </button>
        ))}
      </div>
    </section>
  );
}

export type { RunningRoute };
