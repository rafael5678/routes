"use client";

import { useState } from "react";
import type { MonthlyStats } from "@/types/session";
import { useLanguage } from "@/hooks/useLanguage";

interface StatisticsViewProps {
  yearlyStats: MonthlyStats[];
  weeklyStats: any;
  allTimeStats: any;
}

export default function StatisticsView({ yearlyStats, weeklyStats, allTimeStats }: StatisticsViewProps) {
  const [selectedPeriod, setSelectedPeriod] = useState<"week" | "month" | "year" | "all">("year");
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const { t, language } = useLanguage();

  const monthNames = language === 'es' 
    ? ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"]
    : ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  const maxSessions = Math.max(...yearlyStats.map(s => s.sessions), 1);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-5 border shadow-sm">
      <h2 className="text-2xl font-bold mb-4 text-center text-gray-900 dark:text-white">{t.stats.title}</h2>

      {/* Period Tabs */}
      <div className="flex justify-around mb-6 border-b dark:border-gray-700">
        <button
          onClick={() => setSelectedPeriod("week")}
          className={`pb-2 px-4 ${selectedPeriod === "week" ? "text-purple-600 dark:text-purple-400 border-b-2 border-purple-600 font-semibold" : "text-gray-500 dark:text-gray-400"}`}
        >
          {t.stats.week}
        </button>
        <button
          onClick={() => setSelectedPeriod("month")}
          className={`pb-2 px-4 ${selectedPeriod === "month" ? "text-purple-600 dark:text-purple-400 border-b-2 border-purple-600 font-semibold" : "text-gray-500 dark:text-gray-400"}`}
        >
          {t.stats.month}
        </button>
        <button
          onClick={() => setSelectedPeriod("year")}
          className={`pb-2 px-4 ${selectedPeriod === "year" ? "text-purple-600 dark:text-purple-400 border-b-2 border-purple-600 font-semibold" : "text-gray-500 dark:text-gray-400"}`}
        >
          {t.stats.year}
        </button>
        <button
          onClick={() => setSelectedPeriod("all")}
          className={`pb-2 px-4 ${selectedPeriod === "all" ? "text-purple-600 dark:text-purple-400 border-b-2 border-purple-600 font-semibold" : "text-gray-500 dark:text-gray-400"}`}
        >
          {t.stats.all}
        </button>
      </div>

      {selectedPeriod === "year" && (
        <>
          {/* Year Selector */}
          <div className="flex items-center justify-center gap-4 mb-6">
            <button
              onClick={() => setSelectedYear(prev => prev - 1)}
              className="w-8 h-8 rounded-full hover:bg-gray-100 flex items-center justify-center"
            >
              ←
            </button>
            <span className="text-xl font-bold">{selectedYear}</span>
            <button
              onClick={() => setSelectedYear(prev => prev + 1)}
              disabled={selectedYear >= new Date().getFullYear()}
              className="w-8 h-8 rounded-full hover:bg-gray-100 flex items-center justify-center disabled:opacity-30"
            >
              →
            </button>
          </div>

          {/* Bar Chart */}
          <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4 mb-6">
            <h3 className="text-center font-semibold mb-4 text-gray-900 dark:text-white">{t.stats.activities}</h3>
            <div className="flex items-end justify-around h-40 gap-1">
              {yearlyStats.map((stat, index) => {
                const heightPercent = (stat.sessions / maxSessions) * 100;
                return (
                  <div key={index} className="flex flex-col items-center gap-1 flex-1">
                    <div className="flex-1 w-full flex items-end">
                      <div
                        className="w-full bg-purple-600 dark:bg-purple-500 rounded-t transition-all duration-300 hover:bg-purple-700 dark:hover:bg-purple-600"
                        style={{ height: `${heightPercent}%` }}
                      ></div>
                    </div>
                    <span className="text-xs text-gray-600 dark:text-gray-400">{monthNames[index]}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Year Summary */}
          <div className="grid gap-4">
            <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-xl">
              <span className="text-gray-600 dark:text-gray-400">{t.stats.activeMinutes}</span>
              <div className="text-right">
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{Math.floor(yearlyStats.reduce((sum, s) => sum + s.totalTime, 0) / 60)}</p>
              </div>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-xl">
              <span className="text-gray-600 dark:text-gray-400">{t.session.distance}</span>
              <div className="text-right">
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{(yearlyStats.reduce((sum, s) => sum + s.totalDistance, 0) / 1000).toFixed(2)} km</p>
              </div>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-xl">
              <span className="text-gray-600 dark:text-gray-400">{t.session.calories}</span>
              <div className="text-right">
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{yearlyStats.reduce((sum, s) => sum + s.totalCalories, 0).toLocaleString()} kcal</p>
              </div>
            </div>
          </div>
        </>
      )}

      {selectedPeriod === "week" && (
        <div className="grid gap-4">
          <div className="text-center p-4 bg-purple-50 dark:bg-purple-900/30 rounded-xl">
            <p className="text-sm text-purple-600 dark:text-purple-400 mb-2">{t.stats.thisWeek}</p>
            <p className="text-4xl font-black text-purple-700 dark:text-purple-300">{weeklyStats.sessions}</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">{t.stats.sessions}</p>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
              <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">{t.session.distance}</p>
              <p className="text-xl font-bold text-gray-900 dark:text-white">{(weeklyStats.totalDistance / 1000).toFixed(2)} km</p>
            </div>
            <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
              <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">{t.history.time}</p>
              <p className="text-xl font-bold text-gray-900 dark:text-white">{Math.floor(weeklyStats.totalTime / 60)} min</p>
            </div>
            <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
              <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">{t.session.calories}</p>
              <p className="text-xl font-bold text-gray-900 dark:text-white">{weeklyStats.totalCalories}</p>
            </div>
            <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
              <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">{t.stats.avgPace}</p>
              <p className="text-xl font-bold text-gray-900 dark:text-white">{weeklyStats.avgPace}</p>
            </div>
          </div>
        </div>
      )}

      {selectedPeriod === "all" && (
        <div className="grid gap-4">
          <div className="text-center p-4 bg-purple-50 dark:bg-purple-900/30 rounded-xl">
            <p className="text-sm text-purple-600 dark:text-purple-400 mb-2">{t.stats.totalRuns}</p>
            <p className="text-4xl font-black text-purple-700 dark:text-purple-300">{allTimeStats.sessions}</p>
          </div>
          <div className="grid gap-3">
            <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
              <span className="text-gray-600 dark:text-gray-400">{t.stats.totalDistance}</span>
              <p className="text-xl font-bold text-gray-900 dark:text-white">{(allTimeStats.totalDistance / 1000).toFixed(2)} km</p>
            </div>
            <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
              <span className="text-gray-600 dark:text-gray-400">{t.stats.totalTime}</span>
              <p className="text-xl font-bold text-gray-900 dark:text-white">{Math.floor(allTimeStats.totalTime / 60)} min</p>
            </div>
            <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
              <span className="text-gray-600 dark:text-gray-400">{t.stats.totalCalories}</span>
              <p className="text-xl font-bold text-gray-900 dark:text-white">{allTimeStats.totalCalories.toLocaleString()} kcal</p>
            </div>
            <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
              <span className="text-gray-600 dark:text-gray-400">{t.stats.totalSteps}</span>
              <p className="text-xl font-bold text-gray-900 dark:text-white">{allTimeStats.totalSteps.toLocaleString()}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
