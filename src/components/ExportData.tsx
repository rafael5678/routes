"use client";

import { useState } from "react";
import { useSessionHistory } from "@/hooks/useSessionHistory";
import { exportSessionAsGPX, exportSessionsAsCSV, exportAllDataAsJSON, importDataFromJSON } from "@/utils/exportData";

export default function ExportData() {
  const { sessions } = useSessionHistory();
  const [importing, setImporting] = useState(false);

  const handleExportAllCSV = () => {
    exportSessionsAsCSV(sessions);
  };

  const handleExportAllGPX = () => {
    sessions.forEach(session => {
      exportSessionAsGPX(session);
    });
  };

  const handleExportBackup = () => {
    exportAllDataAsJSON();
  };

  const handleImportBackup = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setImporting(true);
    try {
      await importDataFromJSON(file);
      alert("✅ Datos importados correctamente. Recarga la página para ver los cambios.");
    } catch (error) {
      alert("❌ Error al importar datos. Verifica que el archivo sea válido.");
    } finally {
      setImporting(false);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">📤 Exportar e Importar Datos</h2>

      <div className="space-y-4">
        {/* Export Section */}
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-xl p-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">📊 Exportar Sesiones</h3>
          
          <div className="grid gap-3">
            <button
              onClick={handleExportAllCSV}
              disabled={sessions.length === 0}
              className="w-full bg-green-500 hover:bg-green-600 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-semibold py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              <span>📊</span>
              <span>Exportar todas como CSV</span>
            </button>

            <button
              onClick={handleExportAllGPX}
              disabled={sessions.length === 0}
              className="w-full bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-semibold py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              <span>🗺️</span>
              <span>Exportar todas como GPX (Strava)</span>
            </button>

            {sessions.length === 0 && (
              <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
                No hay sesiones para exportar
              </p>
            )}
          </div>
        </div>

        {/* Backup Section */}
        <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 rounded-xl p-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">💾 Respaldo Completo</h3>
          
          <div className="grid gap-3">
            <button
              onClick={handleExportBackup}
              className="w-full bg-purple-500 hover:bg-purple-600 text-white font-semibold py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              <span>💾</span>
              <span>Descargar Respaldo (JSON)</span>
            </button>

            <div>
              <label className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer">
                <span>📥</span>
                <span>{importing ? "Importando..." : "Restaurar Respaldo"}</span>
                <input
                  type="file"
                  accept=".json"
                  onChange={handleImportBackup}
                  className="hidden"
                  disabled={importing}
                />
              </label>
            </div>
          </div>

          <div className="mt-3 text-xs text-gray-600 dark:text-gray-400">
            <p>💡 El respaldo incluye:</p>
            <ul className="list-disc list-inside ml-2 mt-1">
              <li>Perfil de usuario</li>
              <li>Todas las sesiones</li>
              <li>Progreso diario</li>
              <li>Configuración de tema</li>
            </ul>
          </div>
        </div>

        {/* Info Section */}
        <div className="bg-gradient-to-br from-yellow-50 to-amber-100 dark:from-yellow-900/20 dark:to-amber-800/20 rounded-xl p-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">ℹ️ Información</h3>
          <div className="text-sm text-gray-700 dark:text-gray-300 space-y-2">
            <p>
              <strong>CSV:</strong> Abre en Excel, Google Sheets para análisis de datos
            </p>
            <p>
              <strong>GPX:</strong> Compatible con Strava, Garmin Connect, Google Earth
            </p>
            <p>
              <strong>JSON:</strong> Respaldo completo de todos tus datos
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600 rounded-xl p-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Total de sesiones</div>
              <div className="text-3xl font-bold text-gray-900 dark:text-white">{sessions.length}</div>
            </div>
            <div className="text-5xl">📋</div>
          </div>
        </div>
      </div>
    </div>
  );
}

