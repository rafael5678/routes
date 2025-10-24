"use client";

import { useState } from "react";
import type { MonthlyStats } from "@/types/session";

interface StatisticsViewProps {
  yearlyStats: MonthlyStats[];
  weeklyStats: any;
  allTimeStats: any;
}

export default function StatisticsView({ yearlyStats, weeklyStats, allTimeStats }: StatisticsViewProps) {
  const [selectedPeriod, setSelectedPeriod] = useState<"week" | "month" | "year" | "all">("year");
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  const monthNames = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"];

  const maxSessions = Math.max(...yearlyStats.map(s => s.sessions), 1);

  return (
    <div className="bg-white rounded-2xl p-5 border shadow-sm">
      <h2 className="text-2xl font-bold mb-4 text-center">Estadísticas</h2>

      {/* Period Tabs */}
      <div className="flex justify-around mb-6 border-b">
        <button
          onClick={() => setSelectedPeriod("week")}
          className={`pb-2 px-4 ${selectedPeriod === "week" ? "text-purple-600 border-b-2 border-purple-600 font-semibold" : "text-gray-500"}`}
        >
          Semana
        </button>
        <button
          onClick={() => setSelectedPeriod("month")}
          className={`pb-2 px-4 ${selectedPeriod === "month" ? "text-purple-600 border-b-2 border-purple-600 font-semibold" : "text-gray-500"}`}
        >
          Mes
        </button>
        <button
          onClick={() => setSelectedPeriod("year")}
          className={`pb-2 px-4 ${selectedPeriod === "year" ? "text-purple-600 border-b-2 border-purple-600 font-semibold" : "text-gray-500"}`}
        >
          Año
        </button>
        <button
          onClick={() => setSelectedPeriod("all")}
          className={`pb-2 px-4 ${selectedPeriod === "all" ? "text-purple-600 border-b-2 border-purple-600 font-semibold" : "text-gray-500"}`}
        >
          Total
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
          <div className="bg-gray-50 rounded-xl p-4 mb-6">
            <h3 className="text-center font-semibold mb-4">Actividades</h3>
            <div className="flex items-end justify-around h-40 gap-1">
              {yearlyStats.map((stat, index) => {
                const heightPercent = (stat.sessions / maxSessions) * 100;
                return (
                  <div key={index} className="flex flex-col items-center gap-1 flex-1">
                    <div className="flex-1 w-full flex items-end">
                      <div
                        className="w-full bg-purple-600 rounded-t transition-all duration-300 hover:bg-purple-700"
                        style={{ height: `${heightPercent}%` }}
                      ></div>
                    </div>
                    <span className="text-xs text-gray-600">{monthNames[index]}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Year Summary */}
          <div className="grid gap-4">
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
              <span className="text-gray-600">Minutos Activos</span>
              <div className="text-right">
                <p className="text-2xl font-bold">{Math.floor(yearlyStats.reduce((sum, s) => sum + s.totalTime, 0) / 60)}</p>
              </div>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
              <span className="text-gray-600">Distancia</span>
              <div className="text-right">
                <p className="text-2xl font-bold">{(yearlyStats.reduce((sum, s) => sum + s.totalDistance, 0) / 1000).toFixed(2)} km</p>
              </div>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
              <span className="text-gray-600">Calorías</span>
              <div className="text-right">
                <p className="text-2xl font-bold">{yearlyStats.reduce((sum, s) => sum + s.totalCalories, 0).toLocaleString()} kcal</p>
              </div>
            </div>
          </div>
        </>
      )}

      {selectedPeriod === "week" && (
        <div className="grid gap-4">
          <div className="text-center p-4 bg-purple-50 rounded-xl">
            <p className="text-sm text-purple-600 mb-2">Esta Semana</p>
            <p className="text-4xl font-black text-purple-700">{weeklyStats.sessions}</p>
            <p className="text-sm text-gray-600">Sesiones</p>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="p-4 bg-gray-50 rounded-xl">
              <p className="text-xs text-gray-600 mb-1">Distancia</p>
              <p className="text-xl font-bold">{(weeklyStats.totalDistance / 1000).toFixed(2)} km</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-xl">
              <p className="text-xs text-gray-600 mb-1">Tiempo</p>
              <p className="text-xl font-bold">{Math.floor(weeklyStats.totalTime / 60)} min</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-xl">
              <p className="text-xs text-gray-600 mb-1">Calorías</p>
              <p className="text-xl font-bold">{weeklyStats.totalCalories}</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-xl">
              <p className="text-xs text-gray-600 mb-1">Ritmo Promedio</p>
              <p className="text-xl font-bold">{weeklyStats.avgPace}</p>
            </div>
          </div>
        </div>
      )}

      {selectedPeriod === "all" && (
        <div className="grid gap-4">
          <div className="text-center p-4 bg-purple-50 rounded-xl">
            <p className="text-sm text-purple-600 mb-2">Total de Carreras</p>
            <p className="text-4xl font-black text-purple-700">{allTimeStats.sessions}</p>
          </div>
          <div className="grid gap-3">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
              <span className="text-gray-600">🏃 Distancia Total</span>
              <p className="text-xl font-bold">{(allTimeStats.totalDistance / 1000).toFixed(2)} km</p>
            </div>
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
              <span className="text-gray-600">⏱️ Tiempo Total</span>
              <p className="text-xl font-bold">{Math.floor(allTimeStats.totalTime / 60)} min</p>
            </div>
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
              <span className="text-gray-600">🔥 Calorías Total</span>
              <p className="text-xl font-bold">{allTimeStats.totalCalories.toLocaleString()} kcal</p>
            </div>
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
              <span className="text-gray-600">👣 Pasos Total</span>
              <p className="text-xl font-bold">{allTimeStats.totalSteps.toLocaleString()}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
