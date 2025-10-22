"use client";

import { DailyProgress } from "@/types";

interface ProgressCardProps {
  progress: DailyProgress;
  onEditGoal: () => void;
  onReset: () => void;
  progressPercentage: number;
  remainingDistance: number;
}

export default function ProgressCard({ 
  progress, 
  onEditGoal, 
  onReset, 
  progressPercentage, 
  remainingDistance 
}: ProgressCardProps) {
  return (
    <section className="rounded-3xl bg-zinc-900 text-white p-5 grid gap-2">
      <div className="flex items-center gap-3">
        <div className="h-9 w-9 rounded-2xl bg-white/10 flex items-center justify-center">👟</div>
        <div className="flex-1">
          <p className="font-medium">Running</p>
          <p className="text-sm text-white/70">{progress.goal} meters per day</p>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={onEditGoal}
            className="text-xs px-2 py-1 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
          >
            Editar
          </button>
          <button 
            onClick={onReset}
            className="text-xs px-2 py-1 rounded-full bg-red-500/20 hover:bg-red-500/30 transition-colors"
          >
            Reset
          </button>
        </div>
      </div>
      
      {/* Progress Bar */}
      <div className="mt-1 h-1.5 rounded-full bg-white/20">
        <div 
          className="h-1.5 rounded-full bg-yellow-400 transition-all duration-500" 
          style={{ width: `${progressPercentage}%` }} 
        />
      </div>
      
      {/* Progress Stats */}
      <div className="grid grid-cols-2 gap-2 mt-2 text-xs">
        <div className="flex justify-between">
          <span className="text-white/70">Recorrido:</span>
          <span className="font-semibold">{(progress.totalDistance / 1000).toFixed(2)} km</span>
        </div>
        <div className="flex justify-between">
          <span className="text-white/70">Restante:</span>
          <span className="font-semibold">{(remainingDistance / 1000).toFixed(2)} km</span>
        </div>
      </div>
    </section>
  );
}
