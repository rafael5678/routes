"use client";

import { DailyProgress } from "@/types";

interface StatsCardProps {
  progress: DailyProgress;
}

export default function StatsCard({ progress }: StatsCardProps) {
  return (
    <section className="bg-white rounded-3xl p-4 shadow-sm border">
      <p className="px-1 pb-3 text-black font-bold">Today</p>
      <div className="grid grid-cols-3 gap-3">
        {/* Distance Card */}
        <div className="rounded-2xl bg-white shadow border p-4 text-center">
          <div className="w-6 h-6 mx-auto mb-2 text-blue-500 flex items-center justify-center">
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
            </svg>
          </div>
          <p className="text-base text-black font-bold">{(progress.totalDistance / 1000).toFixed(2)}</p>
          <p className="text-sm font-bold text-black">Kilometer</p>
        </div>

        {/* Time Card */}
        <div className="rounded-2xl bg-white shadow border p-4 text-center">
          <div className="w-6 h-6 mx-auto mb-2 text-green-500 flex items-center justify-center">
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
              <path d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M16.2,16.2L11,13V7H12.5V12.2L17,14.9L16.2,16.2Z"/>
            </svg>
          </div>
          <p className="text-base text-black font-bold">{progress.totalTime}</p>
          <p className="text-sm font-bold text-black">minutes</p>
        </div>

        {/* Calories Card */}
        <div className="rounded-2xl bg-white shadow border p-4 text-center">
          <div className="w-6 h-6 mx-auto mb-2 text-orange-500 flex items-center justify-center">
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
              <path d="M17.66,7.93L12,2.27L6.34,7.93C3.22,11.05 3.22,16.12 6.34,19.24C7.9,20.8 9.95,21.58 12,21.58C14.05,21.58 16.1,20.8 17.66,19.24C20.78,16.12 20.78,11.05 17.66,7.93M12,19.58C10.4,19.58 8.8,18.98 7.54,17.72C5.24,15.42 5.24,11.75 7.54,9.45L12,5L16.46,9.45C18.76,11.75 18.76,15.42 16.46,17.72C15.2,18.98 13.6,19.58 12,19.58Z"/>
            </svg>
          </div>
          <p className="text-base text-black font-bold">{progress.totalCalories}</p>
          <p className="text-sm font-bold text-black">Calories</p>
        </div>
      </div>
    </section>
  );
}
