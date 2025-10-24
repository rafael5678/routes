"use client";

import { useState } from "react";
import { useUserProfile } from "@/hooks/useUserProfile";
import { ExperienceLevel } from "@/types/user";
import ProfileSummary from "./ProfileSummary";
import { useLanguage } from "@/hooks/useLanguage";

interface UserProfileProps {
  onClose?: () => void;
}

export default function UserProfile({ onClose }: UserProfileProps) {
  const { t } = useLanguage();
  const { profile, updateProfile, updateGoals } = useUserProfile();
  const [formData, setFormData] = useState(profile);
  const [showForm, setShowForm] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile(formData);
    setShowForm(false);
  };

  const handleChange = (field: string, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleGoalChange = (field: string, value: number) => {
    setFormData(prev => ({
      ...prev,
      goals: { ...prev.goals, [field]: value }
    }));
  };

  if (!showForm) {
    return (
      <div className="max-h-[80vh] overflow-y-auto space-y-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">👤 {t.profile.title}</h2>
        </div>
        
        <ProfileSummary />
        
        <button
          onClick={() => setShowForm(true)}
          className="w-full bg-linear-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white font-bold py-3 px-6 rounded-xl shadow-lg transition-all duration-200 hover:scale-[1.02]"
        >
          ✏️ {t.profile.edit}
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 max-h-[80vh] overflow-y-auto">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">✏️ {t.profile.edit}</h2>
        <button
          onClick={() => setShowForm(false)}
          className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 text-2xl leading-none"
        >
          ←
        </button>
      </div>

      <form onSubmit={handleSubmit} className="grid gap-6">
        {/* Personal Info */}
        <div className="bg-linear-to-br from-orange-50 to-orange-100 dark:from-gray-800 dark:to-gray-700 rounded-xl p-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">📋 {t.profile.personalInfo}</h3>
          
          <div className="grid gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                {t.profile.name}
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => handleChange("name", e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                placeholder={t.profile.name}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  {t.profile.weight}
                </label>
                <input
                  type="number"
                  value={formData.weight}
                  onChange={(e) => handleChange("weight", Number(e.target.value))}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  min="30"
                  max="200"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  {t.profile.height}
                </label>
                <input
                  type="number"
                  value={formData.height}
                  onChange={(e) => handleChange("height", Number(e.target.value))}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  min="100"
                  max="250"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  {t.profile.age}
                </label>
                <input
                  type="number"
                  value={formData.age}
                  onChange={(e) => handleChange("age", Number(e.target.value))}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  min="10"
                  max="100"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  {t.profile.gender}
                </label>
                <select
                  value={formData.gender}
                  onChange={(e) => handleChange("gender", e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                >
                  <option value="male">{t.profile.male}</option>
                  <option value="female">{t.profile.female}</option>
                  <option value="other">{t.profile.other}</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Experience & Preferences */}
        <div className="bg-linear-to-br from-blue-50 to-blue-100 dark:from-gray-800 dark:to-gray-700 rounded-xl p-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">⚙️ {t.profile.preferences}</h3>
          
          <div className="grid gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {t.profile.experienceLevel}
              </label>
              <div className="grid grid-cols-3 gap-2">
                {(["beginner", "intermediate", "advanced"] as ExperienceLevel[]).map((level) => (
                  <button
                    key={level}
                    type="button"
                    onClick={() => handleChange("experienceLevel", level)}
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      formData.experienceLevel === level
                        ? "bg-blue-500 text-white"
                        : "bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-blue-100 dark:hover:bg-gray-600"
                    }`}
                  >
                    {level === "beginner" ? `🐣 ${t.profile.beginner}` : level === "intermediate" ? `🏃 ${t.profile.intermediate}` : `🏆 ${t.profile.advanced}`}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {t.profile.unitSystem}
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => handleChange("unitSystem", "metric")}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    formData.unitSystem === "metric"
                      ? "bg-blue-500 text-white"
                      : "bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-blue-100 dark:hover:bg-gray-600"
                  }`}
                >
                  📏 {t.profile.metric}
                </button>
                <button
                  type="button"
                  onClick={() => handleChange("unitSystem", "imperial")}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    formData.unitSystem === "imperial"
                      ? "bg-blue-500 text-white"
                      : "bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-blue-100 dark:hover:bg-gray-600"
                  }`}
                >
                  📐 {t.profile.imperial}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Goals */}
        <div className="bg-linear-to-br from-green-50 to-green-100 dark:from-gray-800 dark:to-gray-700 rounded-xl p-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">🎯 {t.profile.goals}</h3>
          
          <div className="grid gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                {t.profile.dailySteps}
              </label>
              <input
                type="number"
                value={formData.goals.dailySteps}
                onChange={(e) => handleGoalChange("dailySteps", Number(e.target.value))}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500 focus:border-transparent"
                min="1000"
                max="50000"
                step="1000"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                {t.profile.dailyDistance}
              </label>
              <input
                type="number"
                value={formData.goals.dailyDistance}
                onChange={(e) => handleGoalChange("dailyDistance", Number(e.target.value))}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500 focus:border-transparent"
                min="500"
                max="50000"
                step="500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                {t.profile.weeklyRuns}
              </label>
              <input
                type="number"
                value={formData.goals.weeklyRuns}
                onChange={(e) => handleGoalChange("weeklyRuns", Number(e.target.value))}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500 focus:border-transparent"
                min="1"
                max="14"
              />
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-linear-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold py-3 px-6 rounded-xl shadow-lg transition-all duration-200 hover:scale-[1.02]"
        >
          💾 {t.profile.save}
        </button>
      </form>
    </div>
  );
}

