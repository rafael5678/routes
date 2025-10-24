"use client";

import { useState } from "react";
import type { SessionData } from "@/types/session";
import SessionChart from "./SessionChart";
import { exportSessionAsGPX, exportSessionAsCSV } from "@/utils/exportData";

interface SessionHistoryProps {
  sessions: SessionData[];
}

export default function SessionHistory({ sessions }: SessionHistoryProps) {
  const [selectedSession, setSelectedSession] = useState<SessionData | null>(null);

  const formatDuration = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${minutes}:${secs.toString().padStart(2, '0')}`;
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('es-ES', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(new Date(date));
  };

  if (selectedSession) {
    return (
      <div className="grid gap-4">
        <button 
          onClick={() => setSelectedSession(null)}
          className="flex items-center gap-2 text-purple-600 dark:text-purple-400 font-semibold"
        >
          ← Volver al historial
        </button>

        {/* Session Detail Header */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-16 h-16 bg-linear-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
              <span className="text-white text-3xl">🏃</span>
            </div>
            <div className="flex-1">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{selectedSession.type}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">{formatDate(selectedSession.date)}</p>
            </div>
          </div>

          {/* Export Buttons */}
          <div className="grid grid-cols-2 gap-3 mb-4">
            <button
              onClick={() => exportSessionAsGPX(selectedSession)}
              className="py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-semibold transition-colors flex items-center justify-center gap-2"
            >
              <span>🗺️</span> GPX
            </button>
            <button
              onClick={() => exportSessionAsCSV(selectedSession)}
              className="py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg font-semibold transition-colors flex items-center justify-center gap-2"
            >
              <span>📊</span> CSV
            </button>
          </div>
        </div>

        {/* Performance Charts */}
        <SessionChart session={selectedSession} />
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl p-4 border shadow-sm">
      <h2 className="text-xl font-bold mb-4">📋 Historial de Carreras</h2>
      
      {sessions.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500">No hay carreras registradas</p>
          <p className="text-sm text-gray-400 mt-2">¡Comienza tu primera sesión!</p>
        </div>
      ) : (
        <div className="grid gap-3">
          {sessions.map((session) => (
            <button
              key={session.id}
              onClick={() => setSelectedSession(session)}
              className="p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors text-left border"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-lg">🏃</span>
                  <h3 className="font-bold">{session.type}</h3>
                </div>
                <span className="text-sm text-gray-600">
                  {new Date(session.date).toLocaleDateString('es-ES')}
                </span>
              </div>
              
              <div className="grid grid-cols-3 gap-2 text-sm">
                <div>
                  <p className="text-gray-600">Distancia</p>
                  <p className="font-semibold">{(session.distance / 1000).toFixed(2)} km</p>
                </div>
                <div>
                  <p className="text-gray-600">Tiempo</p>
                  <p className="font-semibold">{formatDuration(session.duration)}</p>
                </div>
                <div>
                  <p className="text-gray-600">Calorías</p>
                  <p className="font-semibold">{session.calories} kcal</p>
                </div>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
