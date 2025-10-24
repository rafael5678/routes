"use client";

import { useUserProfile } from "@/hooks/useUserProfile";

interface ProfileSummaryProps {
  compact?: boolean;
}

export default function ProfileSummary({ compact = false }: ProfileSummaryProps) {
  const { profile, calculateBMR } = useUserProfile();

  const bmr = calculateBMR();
  const bmi = (profile.weight / Math.pow(profile.height / 100, 2)).toFixed(1);

  const getExperienceIcon = () => {
    switch (profile.experienceLevel) {
      case "beginner": return "🐣";
      case "intermediate": return "🏃";
      case "advanced": return "🏆";
    }
  };

  const getExperienceName = () => {
    switch (profile.experienceLevel) {
      case "beginner": return "Principiante";
      case "intermediate": return "Intermedio";
      case "advanced": return "Avanzado";
    }
  };

  const getBMICategory = () => {
    const bmiNum = parseFloat(bmi);
    if (bmiNum < 18.5) return { text: "Bajo peso", color: "text-blue-600" };
    if (bmiNum < 25) return { text: "Normal", color: "text-green-600" };
    if (bmiNum < 30) return { text: "Sobrepeso", color: "text-yellow-600" };
    return { text: "Obesidad", color: "text-red-600" };
  };

  const bmiCategory = getBMICategory();

  if (compact) {
    return (
      <div className="bg-gradient-to-r from-purple-500 to-purple-600 dark:from-purple-700 dark:to-purple-800 rounded-xl p-4 text-white shadow-lg">
        <div className="flex items-center gap-3">
          <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center text-3xl">
            👤
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-bold">{profile.name}</h3>
            <p className="text-sm opacity-90">
              {getExperienceIcon()} {getExperienceName()} • {profile.weight}kg • {profile.height}cm
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
      <div className="flex items-start justify-between mb-6">
        <div className="flex items-center gap-4">
          <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center text-4xl">
            👤
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{profile.name}</h2>
            <p className="text-gray-600 dark:text-gray-400">
              {getExperienceIcon()} {getExperienceName()}
            </p>
          </div>
        </div>
        <div className="text-right">
          <div className="text-sm text-gray-500 dark:text-gray-400">Sistema</div>
          <div className="text-lg font-semibold text-gray-900 dark:text-white">
            {profile.unitSystem === "metric" ? "📏 Métrico" : "📐 Imperial"}
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/30 rounded-xl p-4">
          <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Peso</div>
          <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{profile.weight} kg</div>
        </div>

        <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/30 dark:to-green-800/30 rounded-xl p-4">
          <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Altura</div>
          <div className="text-2xl font-bold text-green-600 dark:text-green-400">{profile.height} cm</div>
        </div>

        <div className="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/30 dark:to-orange-800/30 rounded-xl p-4">
          <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Edad</div>
          <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">{profile.age} años</div>
        </div>

        <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/30 dark:to-purple-800/30 rounded-xl p-4">
          <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Género</div>
          <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
            {profile.gender === "male" ? "♂️" : profile.gender === "female" ? "♀️" : "⚧"}
          </div>
        </div>
      </div>

      {/* Health Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="bg-gradient-to-r from-pink-50 to-rose-100 dark:from-pink-900/20 dark:to-rose-800/20 rounded-xl p-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">IMC (BMI)</div>
              <div className="text-3xl font-bold text-gray-900 dark:text-white">{bmi}</div>
              <div className={`text-sm font-semibold ${bmiCategory.color}`}>
                {bmiCategory.text}
              </div>
            </div>
            <div className="text-5xl">⚖️</div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-yellow-50 to-amber-100 dark:from-yellow-900/20 dark:to-amber-800/20 rounded-xl p-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">TMB (BMR)</div>
              <div className="text-3xl font-bold text-gray-900 dark:text-white">{Math.round(bmr)}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">kcal/día</div>
            </div>
            <div className="text-5xl">🔥</div>
          </div>
        </div>
      </div>

      {/* Goals */}
      <div className="bg-gradient-to-br from-green-50 to-emerald-100 dark:from-green-900/20 dark:to-emerald-800/20 rounded-xl p-4">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">🎯 Mis Metas</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className="flex items-center gap-2">
            <span className="text-2xl">👣</span>
            <div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Pasos diarios</div>
              <div className="text-lg font-bold text-gray-900 dark:text-white">
                {profile.goals.dailySteps.toLocaleString()}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-2xl">📏</span>
            <div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Distancia diaria</div>
              <div className="text-lg font-bold text-gray-900 dark:text-white">
                {(profile.goals.dailyDistance / 1000).toFixed(1)} km
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-2xl">📅</span>
            <div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Carreras semanales</div>
              <div className="text-lg font-bold text-gray-900 dark:text-white">
                {profile.goals.weeklyRuns}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

