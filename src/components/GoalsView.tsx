"use client";

import { useState } from "react";
import { useLanguage } from "@/hooks/useLanguage";

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
  const { t } = useLanguage();
  
  // Usar useMemo para actualizar los goals cuando cambie el idioma
  const goals = [
    {
      id: "steps",
      name: t.goals.dailySteps,
      current: dailyStats.steps,
      target: 10000,
      unit: t.goals.steps,
      icon: "👣"
    },
    {
      id: "distance",
      name: t.goals.dailyDistance,
      current: dailyStats.distance,
      target: 5000,
      unit: t.goals.meters,
      icon: "📏"
    },
    {
      id: "calories",
      name: t.goals.dailyCalories,
      current: dailyStats.calories,
      target: 500,
      unit: "kcal",
      icon: "🔥"
    }
  ];

  const [editingGoal, setEditingGoal] = useState<string | null>(null);
  const [goalTargets, setGoalTargets] = useState({
    steps: 10000,
    distance: 5000,
    calories: 500
  });

  const getProgressPercent = (current: number, target: number) => {
    return Math.min((current / target) * 100, 100);
  };

  const handleEditGoal = (goalId: string) => {
    const goal = goals.find(g => g.id === goalId);
    if (!goal) return;

    const newTarget = prompt(`${t.goals.newGoalPrompt} ${goal.name}:`, goal.target.toString());
    if (newTarget && !isNaN(Number(newTarget)) && Number(newTarget) > 0) {
      setGoalTargets(prev => ({
        ...prev,
        [goalId]: Number(newTarget)
      }));
    }
  };

  const stepsGoal = goals.find(g => g.id === "steps");
  const stepsProgress = stepsGoal ? getProgressPercent(stepsGoal.current, goalTargets.steps) : 0;

  const trendDiff = dailyStats.steps - yesterdaySteps;
  const trendPercent = yesterdaySteps > 0 ? Math.round((trendDiff / yesterdaySteps) * 100) : 0;

  return (
    <div className="grid gap-4">
      {/* Steps Card */}
      <div className="bg-linear-to-r from-orange-100 to-yellow-100 dark:from-orange-900 dark:to-yellow-900 rounded-2xl p-5 border-2 border-orange-200 dark:border-orange-700">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-orange-400 dark:bg-orange-600 rounded-full flex items-center justify-center">
            <span className="text-3xl">🏃</span>
          </div>
          <div className="flex-1">
            <p className="text-sm text-gray-700 dark:text-gray-300 font-medium">{t.goals.stepsToday}</p>
            <p className="text-3xl font-black text-gray-900 dark:text-white">{dailyStats.steps.toLocaleString()}</p>
          </div>
        </div>
      </div>

      {/* Main Goal */}
      {stepsGoal && (
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-5 border shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <div>
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-1">{t.goals.currentGoal}</p>
              <p className="text-xl font-bold text-gray-900 dark:text-white">{goalTargets.steps.toLocaleString()} {t.goals.stepsPerDay}</p>
            </div>
            <button
              onClick={() => handleEditGoal("steps")}
              className="w-10 h-10 rounded-full hover:bg-gray-100 flex items-center justify-center"
            >
              ✏️
            </button>
          </div>

          {/* Progress Bar */}
          <div className="relative h-6 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
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
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-5 border shadow-sm">
        <h3 className="text-xl font-bold mb-4 text-center text-gray-900 dark:text-white">{t.goals.statistics}</h3>

        <div className="grid grid-cols-2 gap-4">
          <div className="text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">{t.goals.trend}</p>
            <div className="flex items-center justify-center gap-1">
              <span className={trendDiff >= 0 ? "text-green-500 dark:text-green-400" : "text-red-500 dark:text-red-400"}>
                {trendDiff >= 0 ? "↗" : "↘"}
              </span>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{Math.abs(trendDiff).toLocaleString()}</p>
            </div>
          </div>

          <div className="text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">{t.goals.yesterday}</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">{yesterdaySteps.toLocaleString()}</p>
          </div>

          <div className="text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">{t.session.distance}</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">{(dailyStats.distance / 1000).toFixed(2)} km</p>
          </div>

          <div className="text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">{t.session.calories}</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">{dailyStats.calories} kcal</p>
          </div>
        </div>
      </div>

      {/* Other Goals */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-5 border shadow-sm">
        <h3 className="text-lg font-bold mb-4 text-gray-900 dark:text-white">{t.goals.otherGoals}</h3>
        <div className="grid gap-3">
          {goals.filter(g => g.id !== "steps").map(goal => {
            const target = goalTargets[goal.id as keyof typeof goalTargets] || goal.target;
            const progress = getProgressPercent(goal.current, target);
            return (
              <div key={goal.id} className="p-3 bg-gray-50 dark:bg-gray-700 rounded-xl">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span>{goal.icon}</span>
                    <span className="font-semibold text-gray-900 dark:text-white">{goal.name}</span>
                  </div>
                  <button
                    onClick={() => handleEditGoal(goal.id)}
                    className="text-xs px-2 py-1 rounded bg-white dark:bg-gray-600 hover:bg-gray-100 dark:hover:bg-gray-500 text-gray-900 dark:text-white"
                  >
                    {t.goals.edit}
                  </button>
                </div>
                <div className="mb-2">
                  <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-1">
                    <span>{goal.current.toLocaleString()} / {target.toLocaleString()} {goal.unit}</span>
                    <span>{Math.round(progress)}%</span>
                  </div>
                  <div className="h-2 bg-gray-200 dark:bg-gray-600 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-purple-600 dark:bg-purple-500 rounded-full transition-all duration-500"
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
      <button className="w-full py-4 bg-purple-600 dark:bg-purple-700 text-white rounded-xl font-bold hover:bg-purple-700 dark:hover:bg-purple-600 transition-colors">
        {t.goals.viewHistory}
      </button>
    </div>
  );
}
