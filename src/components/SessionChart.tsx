"use client";

import type { SessionData } from "@/types/session";

interface SessionChartProps {
  session: SessionData;
}

export default function SessionChart({ session }: SessionChartProps) {
  if (!session.positions || session.positions.length < 2) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 text-center">
        <p className="text-gray-500 dark:text-gray-400">
          No hay suficientes datos para mostrar gráficos
        </p>
      </div>
    );
  }

  // Calculate speed for each segment
  const speeds = calculateSpeedData(session);
  const distances = calculateDistanceData(session);

  return (
    <div className="space-y-4">
      {/* Speed Chart */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
          ⚡ Velocidad a lo Largo de la Ruta
        </h3>
        <SpeedChart speeds={speeds} />
      </div>

      {/* Distance Chart */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
          📏 Distancia Acumulada
        </h3>
        <DistanceChart distances={distances} />
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard
          icon="⚡"
          label="Vel. Máxima"
          value={`${Math.max(...speeds.map(s => s.speed)).toFixed(1)} km/h`}
          color="blue"
        />
        <StatCard
          icon="📊"
          label="Vel. Promedio"
          value={`${(speeds.reduce((sum, s) => sum + s.speed, 0) / speeds.length).toFixed(1)} km/h`}
          color="green"
        />
        <StatCard
          icon="📏"
          label="Distancia Total"
          value={`${(session.distance / 1000).toFixed(2)} km`}
          color="orange"
        />
        <StatCard
          icon="⏱️"
          label="Tiempo Total"
          value={formatDuration(session.duration)}
          color="purple"
        />
      </div>
    </div>
  );
}

function SpeedChart({ speeds }: { speeds: { time: number; speed: number }[] }) {
  const width = 600;
  const height = 200;
  const padding = 40;

  const maxSpeed = Math.max(...speeds.map(s => s.speed));
  const maxTime = Math.max(...speeds.map(s => s.time));

  const points = speeds.map((s, i) => {
    const x = padding + ((s.time / maxTime) * (width - 2 * padding));
    const y = height - padding - ((s.speed / maxSpeed) * (height - 2 * padding));
    return `${x},${y}`;
  }).join(' ');

  const avgSpeed = speeds.reduce((sum, s) => sum + s.speed, 0) / speeds.length;
  const avgY = height - padding - ((avgSpeed / maxSpeed) * (height - 2 * padding));

  return (
    <div className="w-full overflow-x-auto">
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="w-full h-auto"
        style={{ minWidth: '300px' }}
      >
        {/* Grid lines */}
        {[0, 0.25, 0.5, 0.75, 1].map(ratio => {
          const y = height - padding - (ratio * (height - 2 * padding));
          return (
            <g key={ratio}>
              <line
                x1={padding}
                y1={y}
                x2={width - padding}
                y2={y}
                stroke="currentColor"
                strokeWidth="1"
                className="text-gray-200 dark:text-gray-700"
                strokeDasharray="4"
              />
              <text
                x={padding - 10}
                y={y + 5}
                textAnchor="end"
                className="text-xs fill-gray-500 dark:fill-gray-400"
              >
                {(maxSpeed * ratio).toFixed(1)}
              </text>
            </g>
          );
        })}

        {/* Average speed line */}
        <line
          x1={padding}
          y1={avgY}
          x2={width - padding}
          y2={avgY}
          stroke="currentColor"
          strokeWidth="2"
          className="text-green-500"
          strokeDasharray="8 4"
        />

        {/* Speed line */}
        <polyline
          points={points}
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          className="text-blue-500"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Filled area */}
        <polygon
          points={`${padding},${height - padding} ${points} ${width - padding},${height - padding}`}
          fill="currentColor"
          className="text-blue-500 opacity-10"
        />

        {/* Axes */}
        <line
          x1={padding}
          y1={height - padding}
          x2={width - padding}
          y2={height - padding}
          stroke="currentColor"
          strokeWidth="2"
          className="text-gray-400 dark:text-gray-600"
        />
        <line
          x1={padding}
          y1={padding}
          x2={padding}
          y2={height - padding}
          stroke="currentColor"
          strokeWidth="2"
          className="text-gray-400 dark:text-gray-600"
        />

        {/* Labels */}
        <text
          x={width / 2}
          y={height - 10}
          textAnchor="middle"
          className="text-sm fill-gray-700 dark:fill-gray-300 font-semibold"
        >
          Tiempo (min)
        </text>
        <text
          x={15}
          y={height / 2}
          textAnchor="middle"
          transform={`rotate(-90 15 ${height / 2})`}
          className="text-sm fill-gray-700 dark:fill-gray-300 font-semibold"
        >
          Velocidad (km/h)
        </text>
      </svg>

      {/* Legend */}
      <div className="flex items-center justify-center gap-6 mt-4 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-8 h-1 bg-blue-500"></div>
          <span className="text-gray-700 dark:text-gray-300">Velocidad</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-8 h-1 bg-green-500 border-dashed border-2 border-green-500"></div>
          <span className="text-gray-700 dark:text-gray-300">Promedio</span>
        </div>
      </div>
    </div>
  );
}

function DistanceChart({ distances }: { distances: { time: number; distance: number }[] }) {
  const width = 600;
  const height = 200;
  const padding = 40;

  const maxDistance = Math.max(...distances.map(d => d.distance));
  const maxTime = Math.max(...distances.map(d => d.time));

  const points = distances.map((d) => {
    const x = padding + ((d.time / maxTime) * (width - 2 * padding));
    const y = height - padding - ((d.distance / maxDistance) * (height - 2 * padding));
    return `${x},${y}`;
  }).join(' ');

  return (
    <div className="w-full overflow-x-auto">
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="w-full h-auto"
        style={{ minWidth: '300px' }}
      >
        {/* Grid lines */}
        {[0, 0.25, 0.5, 0.75, 1].map(ratio => {
          const y = height - padding - (ratio * (height - 2 * padding));
          return (
            <g key={ratio}>
              <line
                x1={padding}
                y1={y}
                x2={width - padding}
                y2={y}
                stroke="currentColor"
                strokeWidth="1"
                className="text-gray-200 dark:text-gray-700"
                strokeDasharray="4"
              />
              <text
                x={padding - 10}
                y={y + 5}
                textAnchor="end"
                className="text-xs fill-gray-500 dark:fill-gray-400"
              >
                {((maxDistance / 1000) * ratio).toFixed(1)}
              </text>
            </g>
          );
        })}

        {/* Distance line */}
        <polyline
          points={points}
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          className="text-orange-500"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Filled area */}
        <polygon
          points={`${padding},${height - padding} ${points} ${width - padding},${height - padding}`}
          fill="currentColor"
          className="text-orange-500 opacity-20"
        />

        {/* Axes */}
        <line
          x1={padding}
          y1={height - padding}
          x2={width - padding}
          y2={height - padding}
          stroke="currentColor"
          strokeWidth="2"
          className="text-gray-400 dark:text-gray-600"
        />
        <line
          x1={padding}
          y1={padding}
          x2={padding}
          y2={height - padding}
          stroke="currentColor"
          strokeWidth="2"
          className="text-gray-400 dark:text-gray-600"
        />

        {/* Labels */}
        <text
          x={width / 2}
          y={height - 10}
          textAnchor="middle"
          className="text-sm fill-gray-700 dark:fill-gray-300 font-semibold"
        >
          Tiempo (min)
        </text>
        <text
          x={15}
          y={height / 2}
          textAnchor="middle"
          transform={`rotate(-90 15 ${height / 2})`}
          className="text-sm fill-gray-700 dark:fill-gray-300 font-semibold"
        >
          Distancia (km)
        </text>
      </svg>
    </div>
  );
}

function StatCard({ icon, label, value, color }: {
  icon: string;
  label: string;
  value: string;
  color: 'blue' | 'green' | 'orange' | 'purple';
}) {
  const colorClasses = {
    blue: 'from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/30 text-blue-600 dark:text-blue-400',
    green: 'from-green-50 to-green-100 dark:from-green-900/30 dark:to-green-800/30 text-green-600 dark:text-green-400',
    orange: 'from-orange-50 to-orange-100 dark:from-orange-900/30 dark:to-orange-800/30 text-orange-600 dark:text-orange-400',
    purple: 'from-purple-50 to-purple-100 dark:from-purple-900/30 dark:to-purple-800/30 text-purple-600 dark:text-purple-400',
  };

  return (
    <div className={`bg-linear-to-br ${colorClasses[color]} rounded-xl p-4`}>
      <div className="text-3xl mb-2">{icon}</div>
      <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">{label}</div>
      <div className={`text-lg font-bold ${colorClasses[color]}`}>{value}</div>
    </div>
  );
}

// Helper functions
function calculateSpeedData(session: SessionData): { time: number; speed: number }[] {
  const { positions, duration } = session;
  const data: { time: number; speed: number }[] = [];

  for (let i = 1; i < positions.length; i++) {
    const time = (i / positions.length) * duration;
    const distance = calculateDistance(
      positions[i - 1][0],
      positions[i - 1][1],
      positions[i][0],
      positions[i][1]
    );

    // Calculate speed (km/h) - assuming 1 second between positions
    const speed = (distance / 1000) * 3600;

    data.push({ time: time / 60, speed: Math.min(speed, 30) }); // Cap at 30 km/h for display
  }

  return data;
}

function calculateDistanceData(session: SessionData): { time: number; distance: number }[] {
  const { positions, duration } = session;
  const data: { time: number; distance: number }[] = [];
  let totalDistance = 0;

  data.push({ time: 0, distance: 0 });

  for (let i = 1; i < positions.length; i++) {
    const time = (i / positions.length) * duration;
    const distance = calculateDistance(
      positions[i - 1][0],
      positions[i - 1][1],
      positions[i][0],
      positions[i][1]
    );

    totalDistance += distance;
    data.push({ time: time / 60, distance: totalDistance });
  }

  return data;
}

function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371e3; // Earth's radius in meters
  const φ1 = (lat1 * Math.PI) / 180;
  const φ2 = (lat2 * Math.PI) / 180;
  const Δφ = ((lat2 - lat1) * Math.PI) / 180;
  const Δλ = ((lon2 - lon1) * Math.PI) / 180;

  const a =
    Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
    Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c;
}

function formatDuration(seconds: number): string {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;

  if (hours > 0) {
    return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }
  return `${minutes}:${secs.toString().padStart(2, '0')}`;
}

