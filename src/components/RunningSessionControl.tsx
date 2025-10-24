"use client";

interface RunningSessionControlProps {
  isActive: boolean;
  isPaused: boolean;
  elapsedTime: string;
  distance: string;
  currentSpeed: number;
  averageSpeed: number;
  calories: number;
  steps: number;
  goalTime?: string;
  onStart: () => void;
  onPause: () => void;
  onResume: () => void;
  onStop: () => void;
}

export default function RunningSessionControl({
  isActive,
  isPaused,
  elapsedTime,
  distance,
  currentSpeed,
  averageSpeed,
  calories,
  steps,
  goalTime,
  onStart,
  onPause,
  onResume,
  onStop,
}: RunningSessionControlProps) {
  
  const calculatePace = (distanceStr: string, timeStr: string) => {
    const dist = parseFloat(distanceStr);
    if (dist === 0) return "0:00";
    
    const timeParts = timeStr.split(":");
    let totalSeconds = 0;
    if (timeParts.length === 3) {
      totalSeconds = parseInt(timeParts[0]) * 3600 + parseInt(timeParts[1]) * 60 + parseInt(timeParts[2]);
    } else {
      totalSeconds = parseInt(timeParts[0]) * 60 + parseInt(timeParts[1]);
    }
    
    const paceMinPerKm = totalSeconds / 60 / dist;
    const minutes = Math.floor(paceMinPerKm);
    const seconds = Math.floor((paceMinPerKm - minutes) * 60);
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const parseTimeToSeconds = (timeStr: string) => {
    const parts = timeStr.split(":");
    if (parts.length === 3) {
      return parseInt(parts[0]) * 3600 + parseInt(parts[1]) * 60 + parseInt(parts[2]);
    }
    return parseInt(parts[0]) * 60 + parseInt(parts[1]);
  };

  const goalTimeSeconds = goalTime ? parseTimeToSeconds(goalTime) : 4500; // 1h 15min default
  const currentTimeSeconds = parseTimeToSeconds(elapsedTime);
  const goalProgress = Math.min((currentTimeSeconds / goalTimeSeconds) * 100, 100);
  
  if (!isActive) {
    return (
      <section className="bg-linear-to-r from-green-500 to-emerald-600 rounded-2xl p-5 text-white shadow-xl">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
            <span className="text-2xl">🏃</span>
          </div>
          <div>
            <p className="font-bold text-lg">Iniciar Entrenamiento</p>
            <p className="text-sm text-white/80">Haz clic para comenzar a correr</p>
          </div>
        </div>
        <button
          onClick={onStart}
          className="w-full py-3 bg-white text-green-600 rounded-xl font-bold text-lg hover:bg-green-50 transition-colors shadow-lg"
        >
          🚀 COMENZAR AHORA
        </button>
      </section>
    );
  }

  const pace = calculatePace(distance, elapsedTime);

  return (
    <section className="bg-white rounded-2xl p-4 shadow-lg border-2 border-gray-200">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <span className="text-xl font-bold text-purple-600">Correr</span>
          <span className="text-gray-400">▼</span>
        </div>
        <div className="flex gap-2">
          <button className="w-8 h-8 rounded-full hover:bg-gray-100 flex items-center justify-center">❄️</button>
          <button className="w-8 h-8 rounded-full hover:bg-gray-100 flex items-center justify-center">⚙️</button>
        </div>
      </div>

      {/* Main Stats Row */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        {/* Duration */}
        <div className="bg-gray-50 rounded-xl p-4">
          <p className="text-sm text-gray-600 mb-1">Duración</p>
          <p className="text-3xl font-black text-gray-900">{elapsedTime}</p>
          {goalTime && (
            <>
              <p className="text-sm text-orange-500 font-semibold mt-1">Meta: {goalTime}</p>
              <div className="mt-2 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-orange-500 rounded-full transition-all duration-500"
                  style={{ width: `${goalProgress}%` }}
                ></div>
              </div>
            </>
          )}
        </div>

        {/* Distance */}
        <div className="bg-gray-50 rounded-xl p-4">
          <p className="text-sm text-gray-600 mb-1">Distancia</p>
          <p className="text-3xl font-black text-gray-900">{distance} km</p>
        </div>
      </div>

      {/* Secondary Stats */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <p className="text-sm text-gray-600 mb-1">Calorías</p>
          <p className="text-2xl font-bold text-gray-900">{calories} kcal</p>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600 mb-1">Ritmo</p>
            <p className="text-2xl font-bold text-gray-900">{pace}</p>
          </div>
          <span className="text-gray-400">→</span>
        </div>
      </div>

      {/* Steps */}
      <div className="bg-gray-50 rounded-xl p-3 mb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span>👣</span>
            <span className="font-semibold">Pasos hoy</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold text-purple-600">{steps.toLocaleString()}</span>
            <span className="text-gray-400">→</span>
          </div>
        </div>
      </div>

      {/* Control Buttons */}
      <div className="flex gap-3">
        {isPaused ? (
          <button
            onClick={onResume}
            className="flex-1 py-4 bg-purple-600 hover:bg-purple-700 rounded-2xl font-bold text-white transition-colors shadow-lg text-lg"
          >
            Reanudar
          </button>
        ) : (
          <button
            onClick={onPause}
            className="flex-1 py-4 bg-purple-600 hover:bg-purple-700 rounded-2xl font-bold text-white transition-colors shadow-lg text-lg"
          >
            Pausa
          </button>
        )}
        <button
          onClick={onStop}
          className="flex-1 py-4 bg-red-500 hover:bg-red-600 rounded-2xl font-bold text-white transition-colors shadow-lg text-lg"
        >
          Parar
        </button>
      </div>
    </section>
  );
}
