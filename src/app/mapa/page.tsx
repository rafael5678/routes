"use client";

import dynamic from "next/dynamic";
import { useMemo, useState } from "react";
import { useProgress } from "@/hooks/useProgress";
import { useLocation } from "@/hooks/useLocation";
import ProgressCard from "@/components/ProgressCard";
import StatsCard from "@/components/StatsCard";
import NavigationPanel from "@/components/NavigationPanel";
import QuickDestinations from "@/components/QuickDestinations";

export default function MapaPage() {
  const [navigationMessage, setNavigationMessage] = useState("Toca el mapa para seleccionar origen y destino. La ruta aparecerá automáticamente.");
  
  const {
    progress,
    addRoute,
    updateGoal,
    resetProgress,
    getProgressPercentage,
    getRemainingDistance,
  } = useProgress();

  const { currentLocation, isNearUniversity } = useLocation();
  
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

  return (
    <div className="min-h-svh w-full flex items-center justify-center bg-linear-to-br from-orange-200 via-orange-300 to-orange-200 relative overflow-hidden">
      {/* Background decorative circles */}
      <div className="absolute top-10 left-10 w-32 h-32 bg-orange-100 rounded-full opacity-60 animate-pulse"></div>
      <div className="absolute bottom-20 right-20 w-24 h-24 bg-yellow-200 rounded-full opacity-40 animate-bounce"></div>
      <div className="absolute top-1/3 right-10 w-16 h-16 bg-orange-100 rounded-full opacity-50"></div>
      <div className="w-[360px] max-w-[90vw] rounded-[28px] bg-white shadow-2xl p-4 grid gap-4 relative">
        <button 
          className="absolute left-5 top-5 z-5 h-9 w-9 rounded-full bg-white/90 shadow flex items-center justify-center border hover:bg-gray-50 transition-colors" 
          aria-label="Volver" 
          onClick={() => history.back()}
        >
          ←
        </button>
        
        {/* Map Container */}
        <div className="rounded-2xl overflow-hidden border">
          <MapView 
            onRouteComplete={handleRouteComplete}
            onNavigationUpdate={setNavigationMessage}
            onDestinationSelect={handleDestinationSelect}
          />
        </div>
        
        {/* Location Status */}
        {currentLocation && (
          <div className="bg-green-50 border border-green-200 rounded-xl p-3">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              <p className="text-sm font-medium text-green-800">
                {isNearUniversity ? "📍 Cerca de la Universidad Cooperativa" : "📍 Ubicación detectada"}
              </p>
            </div>
            <p className="text-xs text-green-600 mt-1">
              Lat: {currentLocation.latitude.toFixed(6)}, Lng: {currentLocation.longitude.toFixed(6)}
            </p>
          </div>
        )}

        {/* Quick Destinations - Only show if near university */}
        {isNearUniversity && currentLocation && (
          <QuickDestinations 
            onDestinationSelect={handleDestinationSelect}
            currentLocation={[currentLocation.latitude, currentLocation.longitude]}
          />
        )}
        
        {/* Progress Card */}
        <ProgressCard 
          progress={progress}
          onEditGoal={handleEditGoal}
          onReset={handleReset}
          progressPercentage={getProgressPercentage()}
          remainingDistance={getRemainingDistance()}
        />
        
        {/* Navigation Panel */}
        <NavigationPanel message={navigationMessage} />
        
        {/* Stats Card */}
        <StatsCard progress={progress} />
      </div>
    </div>
  );
}


