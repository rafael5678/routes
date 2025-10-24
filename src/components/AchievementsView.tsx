"use client";

import { useState } from "react";
import { useAchievements } from "@/hooks/useAchievements";
import type { Achievement } from "@/types/achievements";

export default function AchievementsView() {
  const {
    achievements,
    getUnlockedCount,
    getTotalCount,
    getProgressPercentage,
    getAchievementsByCategory,
  } = useAchievements();

  const [selectedCategory, setSelectedCategory] = useState<Achievement["category"] | "all">("all");

  const categories = [
    { id: "all" as const, name: "Todos", icon: "🏆" },
    { id: "distance" as const, name: "Distancia", icon: "📏" },
    { id: "time" as const, name: "Tiempo", icon: "⏱️" },
    { id: "speed" as const, name: "Velocidad", icon: "⚡" },
    { id: "consistency" as const, name: "Constancia", icon: "🔥" },
    { id: "special" as const, name: "Especiales", icon: "⭐" },
  ];

  const filteredAchievements = selectedCategory === "all" 
    ? achievements 
    : getAchievementsByCategory(selectedCategory);

  const unlockedAchievements = filteredAchievements.filter(a => a.unlocked);
  const lockedAchievements = filteredAchievements.filter(a => !a.unlocked);

  return (
    <div className="space-y-6">
      {/* Header Stats */}
      <div className="bg-gradient-to-r from-purple-500 to-purple-600 dark:from-purple-700 dark:to-purple-800 rounded-2xl p-6 text-white shadow-xl">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-2xl font-bold">🏆 Logros</h2>
            <p className="text-purple-100">
              {getUnlockedCount()} de {getTotalCount()} desbloqueados
            </p>
          </div>
          <div className="text-right">
            <div className="text-4xl font-bold">{getProgressPercentage()}%</div>
            <div className="text-sm text-purple-100">Completado</div>
          </div>
        </div>
        
        {/* Progress Bar */}
        <div className="w-full bg-purple-700/50 rounded-full h-3 overflow-hidden">
          <div 
            className="bg-white h-full rounded-full transition-all duration-500"
            style={{ width: `${getProgressPercentage()}%` }}
          />
        </div>
      </div>

      {/* Category Filter */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-lg">
        <div className="flex flex-wrap gap-2">
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                selectedCategory === cat.id
                  ? "bg-purple-500 text-white scale-105 shadow-lg"
                  : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
              }`}
            >
              <span className="mr-1">{cat.icon}</span>
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      {/* Unlocked Achievements */}
      {unlockedAchievements.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <span>✨</span>
            Desbloqueados ({unlockedAchievements.length})
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {unlockedAchievements.map(achievement => (
              <AchievementCard key={achievement.id} achievement={achievement} />
            ))}
          </div>
        </div>
      )}

      {/* Locked Achievements */}
      {lockedAchievements.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <span>🔒</span>
            Bloqueados ({lockedAchievements.length})
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {lockedAchievements.map(achievement => (
              <AchievementCard key={achievement.id} achievement={achievement} />
            ))}
          </div>
        </div>
      )}

      {filteredAchievements.length === 0 && (
        <div className="text-center py-12 text-gray-500 dark:text-gray-400">
          <div className="text-6xl mb-4">🏆</div>
          <p>No hay logros en esta categoría</p>
        </div>
      )}
    </div>
  );
}

function AchievementCard({ achievement }: { achievement: Achievement }) {
  const isUnlocked = achievement.unlocked;

  return (
    <div
      className={`rounded-xl p-4 shadow-lg transition-all ${
        isUnlocked
          ? "bg-gradient-to-br from-yellow-50 to-amber-100 dark:from-yellow-900/30 dark:to-amber-800/30 border-2 border-yellow-400 dark:border-yellow-600"
          : "bg-white dark:bg-gray-800 opacity-75 grayscale"
      }`}
    >
      <div className="flex items-start gap-4">
        <div
          className={`text-5xl ${
            isUnlocked ? "animate-bounce" : "opacity-50"
          }`}
        >
          {achievement.icon}
        </div>
        <div className="flex-1">
          <h4 className="font-bold text-lg text-gray-900 dark:text-white mb-1">
            {achievement.title}
          </h4>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
            {achievement.description}
          </p>

          {isUnlocked ? (
            <div className="flex items-center gap-2 text-green-600 dark:text-green-400 font-semibold">
              <span>✅</span>
              <span>Desbloqueado</span>
              {achievement.unlockedDate && (
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  {new Date(achievement.unlockedDate).toLocaleDateString()}
                </span>
              )}
            </div>
          ) : (
            <div>
              <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400 mb-1">
                <span>Progreso</span>
                <span className="font-bold">{Math.round(achievement.progress)}%</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-purple-500 to-purple-600 h-full rounded-full transition-all duration-500"
                  style={{ width: `${achievement.progress}%` }}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

