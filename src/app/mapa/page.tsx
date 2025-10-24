"use client";

import dynamic from "next/dynamic";
import { useMemo, useState } from "react";
import { useProgress } from "@/hooks/useProgress";
import { useLocation } from "@/hooks/useLocation";
import { useRunningSession } from "@/hooks/useRunningSession";
import { useSessionHistory } from "@/hooks/useSessionHistory";
import { useUserProfile } from "@/hooks/useUserProfile";
import { useTheme } from "@/hooks/useTheme";
import { useLanguage } from "@/hooks/useLanguage";
import RunningRoutes from "@/components/RunningRoutes";
import LanguageSelector from "@/components/LanguageSelector";
import RunningSessionControl from "@/components/RunningSessionControl";
import SessionHistory from "@/components/SessionHistory";
import StatisticsView from "@/components/StatisticsView";
import GoalsView from "@/components/GoalsView";
import UserProfile from "@/components/UserProfile";
import ThemeToggle from "@/components/ThemeToggle";
import ExportData from "@/components/ExportData";
import AchievementsView from "@/components/AchievementsView";
import VoiceSettings from "@/components/VoiceSettings";
import type { RunningRoute } from "@/components/RunningRoutes";
import type { SessionData } from "@/types/session";

type TabView = "map" | "history" | "stats" | "goals" | "profile" | "achievements" | "export" | "settings";

export default function MapaPage() {
  const [currentTab, setCurrentTab] = useState<TabView>("map");
  const [navigationMessage, setNavigationMessage] = useState("Toca el mapa para seleccionar origen y destino. La ruta aparecerá automáticamente.");
  
  const { profile, calculateCaloriesPerKm, isFirstTime } = useUserProfile();
  const { isDark } = useTheme();
  const { t } = useLanguage();
  
  const {
    progress,
    addRoute,
    updateGoal,
    resetProgress,
    getProgressPercentage,
    getRemainingDistance,
  } = useProgress();

  const { currentLocation, isNearUniversity } = useLocation();
  
  const {
    sessions,
    saveSession,
    getTodaySessions,
    getWeeklyStats,
    getYearlyStats,
    getAllTimeStats,
  } = useSessionHistory();
  
  const {
    session,
    startSession,
    pauseSession,
    resumeSession,
    stopSession,
    getFormattedTime,
    getFormattedDistance,
    getCurrentPosition,
  } = useRunningSession({
    userWeight: profile.weight,
    userExperience: profile.experienceLevel,
  });

  const MapView = useMemo(
    () => dynamic(() => import("./partials/MapView"), { ssr: false }),
    []
  );

  const handleRouteComplete = (distanceKm: number, durationMin: number) => {
    addRoute(distanceKm, durationMin);
  };

  const handleEditGoal = () => {
    const newGoal = prompt("Nuevo objetivo diario (metros):", progress.goal.toString());
    if (newGoal && !isNaN(Number(newGoal)) && Number(newGoal) > 0) {
      updateGoal(Number(newGoal));
    }
  };

  const handleReset = () => {
    if (confirm("¿Estás seguro de que quieres resetear el progreso del día?")) {
      resetProgress();
    }
  };

  const handleDestinationSelect = (lat: number, lng: number, name: string) => {
    // This will be passed to MapView to handle destination selection
    setNavigationMessage(`Destino seleccionado: ${name}. Calculando ruta...`);
  };

  const handleRouteSelect = (route: RunningRoute) => {
    setNavigationMessage(`Ruta seleccionada: ${route.name} (${route.distance} km). ¡Puedes iniciar tu entrenamiento!`);
    // Optionally set route waypoints on map
  };

  const handleStopSession = () => {
    const distanceKm = parseFloat(getFormattedDistance());
    const durationMin = Math.floor(session.elapsedTime / 60);
    
    // Calculate average pace
    const avgPace = distanceKm > 0 
      ? `${Math.floor(session.elapsedTime / 60 / distanceKm).toString().padStart(2, '0')}:${Math.floor((session.elapsedTime / 60 / distanceKm % 1) * 60).toString().padStart(2, '0')}`
      : "0:00";
    
    // Save session to history
    if (distanceKm > 0) {
      const sessionData: Omit<SessionData, "id"> = {
        type: "Correr",
        date: new Date(),
        duration: session.elapsedTime,
        distance: session.distance,
        calories: session.calories,
        avgPace,
        steps: session.steps,
        stepsPerMinute: session.elapsedTime > 0 ? Math.floor(session.steps / (session.elapsedTime / 60)) : 0,
        positions: session.positions.map(p => [p.latitude, p.longitude] as [number, number]),
      };
      
      saveSession(sessionData);
      addRoute(distanceKm, durationMin);
    }
    
    stopSession();
    setNavigationMessage(`¡Sesión finalizada! Has corrido ${distanceKm} km en ${getFormattedTime()}`);
    
    // Switch to history tab to show the completed session
    setTimeout(() => setCurrentTab("history"), 500);
  };

  // Convert session positions to map format
  const livePositions = session.positions.map(p => [p.latitude, p.longitude] as [number, number]);
  
  // Get stats for different views
  const weeklyStats = getWeeklyStats();
  const yearlyStats = getYearlyStats(new Date().getFullYear());
  const allTimeStats = getAllTimeStats();
  const todaySessions = getTodaySessions();
  
  // Calculate today's stats
  const todayStats = {
    steps: session.isActive ? session.steps : todaySessions.reduce((sum, s) => sum + (s.steps || 0), 0),
    distance: session.isActive ? session.distance : todaySessions.reduce((sum, s) => sum + s.distance, 0),
    calories: session.isActive ? session.calories : todaySessions.reduce((sum, s) => sum + s.calories, 0),
    time: session.isActive ? session.elapsedTime : todaySessions.reduce((sum, s) => sum + s.duration, 0),
  };

  return (
    <div className="min-h-svh w-full flex items-center justify-center bg-linear-to-br from-orange-200 via-orange-300 to-orange-200 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 relative overflow-hidden transition-colors duration-300">
      {/* Background decorative circles */}
      <div className="absolute top-10 left-10 w-32 h-32 bg-orange-100 dark:bg-gray-700 rounded-full opacity-60 animate-pulse"></div>
      <div className="absolute bottom-20 right-20 w-24 h-24 bg-yellow-200 dark:bg-gray-600 rounded-full opacity-40 animate-bounce"></div>
      <div className="absolute top-1/3 right-10 w-16 h-16 bg-orange-100 dark:bg-gray-700 rounded-full opacity-50"></div>
      
      {/* Responsive container: mobile full width, desktop large */}
      <div className="w-full max-w-[95vw] md:max-w-[90vw] lg:max-w-7xl xl:max-w-[1400px] rounded-[28px] bg-white dark:bg-gray-800 shadow-2xl p-3 md:p-6 lg:p-8 grid gap-4 relative max-h-[90vh] overflow-y-auto transition-colors duration-300">
        {/* Header with theme toggle and language selector */}
        <div className="flex items-center justify-between pb-2 border-b border-gray-200 dark:border-gray-700 gap-4 flex-wrap">
          <div className="flex items-center gap-3">
            <h1 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white">
              🏃‍♂️ {t.appTitle}
            </h1>
            {profile.name !== "Atleta" && (
              <span className="text-sm text-gray-600 dark:text-gray-400">
                {t.greeting}, {profile.name}!
              </span>
            )}
          </div>
          <div className="flex items-center gap-3">
            <LanguageSelector />
            <ThemeToggle />
          </div>
        </div>

        {/* Content based on selected tab */}
        <div className="min-h-[60vh]">
          {currentTab === "map" && (
            <div className="grid lg:grid-cols-[1fr_400px] gap-4">
              {/* Map Container - Takes more space on desktop */}
              <div className="rounded-2xl overflow-hidden border h-[500px] lg:h-[700px]">
                <MapView 
                  onRouteComplete={handleRouteComplete}
                  onNavigationUpdate={setNavigationMessage}
                  onDestinationSelect={handleDestinationSelect}
                  livePositions={livePositions}
                  followUser={session.isActive}
                />
              </div>
              
              {/* Right sidebar on desktop, stacked on mobile */}
              <div className="grid gap-4">
                {/* Running Session Control */}
                <RunningSessionControl
                  isActive={session.isActive}
                  isPaused={session.isPaused}
                  elapsedTime={getFormattedTime()}
                  distance={getFormattedDistance()}
                  currentSpeed={session.currentSpeed}
                  averageSpeed={session.averageSpeed}
                  calories={session.calories}
                  steps={session.steps}
                  goalTime="1:15:00"
                  onStart={startSession}
                  onPause={pauseSession}
                  onResume={resumeSession}
                  onStop={handleStopSession}
                />

                {/* Running Routes - Only show when not in active session */}
                {!session.isActive && (
                  <RunningRoutes onRouteSelect={handleRouteSelect} />
                )}
              </div>
            </div>
          )}

          {currentTab === "history" && (
            <SessionHistory sessions={sessions} />
          )}

          {currentTab === "stats" && (
            <StatisticsView 
              yearlyStats={yearlyStats}
              weeklyStats={weeklyStats}
              allTimeStats={allTimeStats}
            />
          )}

          {currentTab === "goals" && (
            <GoalsView 
              dailyStats={todayStats}
              yesterdaySteps={0}
            />
          )}

          {currentTab === "profile" && (
            <UserProfile />
          )}

          {currentTab === "achievements" && (
            <AchievementsView />
          )}

          {currentTab === "export" && (
            <ExportData />
          )}

          {currentTab === "settings" && (
            <VoiceSettings />
          )}
        </div>

        {/* Bottom Navigation - Scrollable */}
        <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t dark:border-gray-700 shadow-lg transition-colors duration-300 overflow-x-auto">
          <div className="flex gap-1 p-1 min-w-max">
            <button
              onClick={() => setCurrentTab("map")}
              className={`flex flex-col items-center gap-0.5 py-2 px-3 rounded-lg transition-colors whitespace-nowrap ${
                currentTab === "map" ? "bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-300" : "text-gray-500 dark:text-gray-400"
              }`}
            >
              <span className="text-lg">🗺️</span>
              <span className="text-[10px] font-semibold">{t.nav.map}</span>
            </button>
            <button
              onClick={() => setCurrentTab("history")}
              className={`flex flex-col items-center gap-0.5 py-2 px-3 rounded-lg transition-colors whitespace-nowrap ${
                currentTab === "history" ? "bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-300" : "text-gray-500 dark:text-gray-400"
              }`}
            >
              <span className="text-lg">📋</span>
              <span className="text-[10px] font-semibold">{t.nav.history}</span>
            </button>
            <button
              onClick={() => setCurrentTab("stats")}
              className={`flex flex-col items-center gap-0.5 py-2 px-3 rounded-lg transition-colors whitespace-nowrap ${
                currentTab === "stats" ? "bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-300" : "text-gray-500 dark:text-gray-400"
              }`}
            >
              <span className="text-lg">📊</span>
              <span className="text-[10px] font-semibold">{t.nav.stats}</span>
            </button>
            <button
              onClick={() => setCurrentTab("goals")}
              className={`flex flex-col items-center gap-0.5 py-2 px-3 rounded-lg transition-colors whitespace-nowrap ${
                currentTab === "goals" ? "bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-300" : "text-gray-500 dark:text-gray-400"
              }`}
            >
              <span className="text-lg">🎯</span>
              <span className="text-[10px] font-semibold">{t.nav.goals}</span>
            </button>
            <button
              onClick={() => setCurrentTab("profile")}
              className={`flex flex-col items-center gap-0.5 py-2 px-3 rounded-lg transition-colors whitespace-nowrap ${
                currentTab === "profile" ? "bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-300" : "text-gray-500 dark:text-gray-400"
              }`}
            >
              <span className="text-lg">👤</span>
              <span className="text-[10px] font-semibold">{t.nav.profile}</span>
            </button>
            <button
              onClick={() => setCurrentTab("achievements")}
              className={`flex flex-col items-center gap-0.5 py-2 px-3 rounded-lg transition-colors whitespace-nowrap ${
                currentTab === "achievements" ? "bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-300" : "text-gray-500 dark:text-gray-400"
              }`}
            >
              <span className="text-lg">🏆</span>
              <span className="text-[10px] font-semibold">{t.nav.achievements}</span>
            </button>
            <button
              onClick={() => setCurrentTab("export")}
              className={`flex flex-col items-center gap-0.5 py-2 px-3 rounded-lg transition-colors whitespace-nowrap ${
                currentTab === "export" ? "bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-300" : "text-gray-500 dark:text-gray-400"
              }`}
            >
              <span className="text-lg">📤</span>
              <span className="text-[10px] font-semibold">{t.nav.export}</span>
            </button>
            <button
              onClick={() => setCurrentTab("settings")}
              className={`flex flex-col items-center gap-0.5 py-2 px-3 rounded-lg transition-colors whitespace-nowrap ${
                currentTab === "settings" ? "bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-300" : "text-gray-500 dark:text-gray-400"
              }`}
            >
              <span className="text-lg">⚙️</span>
              <span className="text-[10px] font-semibold">{t.nav.settings}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}


