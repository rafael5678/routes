"use client";

import { useState } from "react";

interface Goal {
  id: string;
  name: string;
  current: number;
  target: number;
  unit: string;
  icon: string;
}

interface GoalsViewProps {
  dailyStats: {
    steps: number;
    distance: number;
    calories: number;
    time: number;
  };
  yesterdaySteps: number;
}

export default function GoalsView({ dailyStats, yesterdaySteps }: GoalsViewProps) {
  const [goals, setGoals] = useState<Goal[]>([
    {
      id: "steps",
      name: "Pasos diarios",
      current: dailyStats.steps,
      target: 10000,
      unit: "pasos",
      icon: "👣"
    },
    {
      id: "distance",
      name: "Distancia diaria",
      current: dailyStats.distance,
      target: 5000,
      unit: "metros",
      icon: "📏"
    },
    {
      id: "calories",
      name: "Calorías diarias",
      current: dailyStats.calories,
      target: 500,
      unit: "kcal",
      icon: "🔥"
    }
  ]);

  const [editingGoal, setEditingGoal] = useState<string | null>(null);

  const getProgressPercent = (current: number, target: number) => {
    return Math.min((current / target) * 100, 100);
  };

  const handleEditGoal = (goalId: string) => {
    const goal = goals.find(g => g.id === goalId);
    if (!goal) return;

    const newTarget = prompt(`Nuevo objetivo para ${goal.name}:`, goal.target.toString());
    if (newTarget && !isNaN(Number(newTarget)) && Number(newTarget) > 0) {
      setGoals(prev => prev.map(g => 
        g.id === goalId ? { ...g, target: Number(newTarget) } : g
      ));
    }
  };

  const stepsGoal = goals.find(g => g.id === "steps");
  const stepsProgress = stepsGoal ? getProgressPercent(stepsGoal.current, stepsGoal.target) : 0;

  const trendDiff = dailyStats.steps - yesterdaySteps;
  const trendPercent = yesterdaySteps > 0 ? Math.round((trendDiff / yesterdaySteps) * 100) : 0;

  return (
    <div className="grid gap-4">
      {/* Steps Card */}
      <div className="bg-linear-to-r from-orange-100 to-yellow-100 rounded-2xl p-5 border-2 border-orange-200">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-orange-400 rounded-full flex items-center justify-center">
            <span className="text-3xl">🏃</span>
          </div>
          <div className="flex-1">
            <p className="text-sm text-gray-700 font-medium">Pasos hoy</p>
            <p className="text-3xl font-black text-gray-900">{dailyStats.steps.toLocaleString()}</p>
          </div>
        </div>
      </div>

      {/* Main Goal */}
      {stepsGoal && (
        <div className="bg-white rounded-2xl p-5 border shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <div>
              <p className="text-gray-600 text-sm mb-1">Objetivo actual</p>
              <p className="text-xl font-bold">{stepsGoal.target.toLocaleString()} Pasos / día</p>
            </div>
            <button
              onClick={() => handleEditGoal("steps")}
              className="w-10 h-10 rounded-full hover:bg-gray-100 flex items-center justify-center"
            >
              ✏️
            </button>
          </div>

          {/* Progress Bar */}
          <div className="relative h-6 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="absolute inset-y-0 left-0 bg-linear-to-r from-yellow-400 to-orange-500 rounded-full transition-all duration-500"
              style={{ width: `${stepsProgress}%` }}
            >
              <div className="absolute inset-0 flex items-center justify-end pr-3">
                <span className="text-sm font-bold text-white drop-shadow">{Math.round(stepsProgress)}%</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Statistics */}
      <div className="bg-white rounded-2xl p-5 border shadow-sm">
        <h3 className="text-xl font-bold mb-4 text-center">Estadísticas</h3>

        <div className="grid grid-cols-2 gap-4">
          <div className="text-center">
            <p className="text-sm text-gray-600 mb-1">Tendencia</p>
            <div className="flex items-center justify-center gap-1">
              <span className={trendDiff >= 0 ? "text-green-500" : "text-red-500"}>
                {trendDiff >= 0 ? "↗" : "↘"}
              </span>
              <p className="text-2xl font-bold">{Math.abs(trendDiff).toLocaleString()}</p>
            </div>
          </div>

          <div className="text-center">
            <p className="text-sm text-gray-600 mb-1">Ayer</p>
            <p className="text-2xl font-bold">{yesterdaySteps.toLocaleString()}</p>
          </div>

          <div className="text-center">
            <p className="text-sm text-gray-600 mb-1">Distancia</p>
            <p className="text-2xl font-bold">{(dailyStats.distance / 1000).toFixed(2)} km</p>
          </div>

          <div className="text-center">
            <p className="text-sm text-gray-600 mb-1">Calorías</p>
            <p className="text-2xl font-bold">{dailyStats.calories} kcal</p>
          </div>
        </div>
      </div>

      {/* Other Goals */}
      <div className="bg-white rounded-2xl p-5 border shadow-sm">
        <h3 className="text-lg font-bold mb-4">Otros Objetivos</h3>
        <div className="grid gap-3">
          {goals.filter(g => g.id !== "steps").map(goal => {
            const progress = getProgressPercent(goal.current, goal.target);
            return (
              <div key={goal.id} className="p-3 bg-gray-50 rounded-xl">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span>{goal.icon}</span>
                    <span className="font-semibold">{goal.name}</span>
                  </div>
                  <button
                    onClick={() => handleEditGoal(goal.id)}
                    className="text-xs px-2 py-1 rounded bg-white hover:bg-gray-100"
                  >
                    Editar
                  </button>
                </div>
                <div className="mb-2">
                  <div className="flex justify-between text-sm text-gray-600 mb-1">
                    <span>{goal.current.toLocaleString()} / {goal.target.toLocaleString()} {goal.unit}</span>
                    <span>{Math.round(progress)}%</span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-purple-600 rounded-full transition-all duration-500"
                      style={{ width: `${progress}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* History Button */}
      <button className="w-full py-4 bg-purple-600 text-white rounded-xl font-bold hover:bg-purple-700 transition-colors">
        📊 Ver Historial Completo
      </button>
    </div>
  );
}
