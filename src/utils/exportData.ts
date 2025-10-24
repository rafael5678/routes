import type { SessionData } from "@/types/session";

/**
 * Export session as GPX (GPS Exchange Format)
 * Compatible with Strava, Garmin, and other fitness apps
 */
export function exportSessionAsGPX(session: SessionData): void {
  const gpx = `<?xml version="1.0" encoding="UTF-8"?>
<gpx version="1.1" creator="RunTracker" xmlns="http://www.topografix.com/GPX/1/1">
  <metadata>
    <name>${session.type} - ${new Date(session.date).toLocaleDateString()}</name>
    <time>${new Date(session.date).toISOString()}</time>
  </metadata>
  <trk>
    <name>${session.type} Session</name>
    <type>${session.type}</type>
    <trkseg>
${session.positions.map((pos, index) => {
  const timestamp = new Date(session.date).getTime() + (index * 1000);
  return `      <trkpt lat="${pos[0]}" lon="${pos[1]}">
        <time>${new Date(timestamp).toISOString()}</time>
      </trkpt>`;
}).join('\n')}
    </trkseg>
  </trk>
</gpx>`;

  downloadFile(gpx, `runtracker-${session.type}-${formatDate(session.date)}.gpx`, 'application/gpx+xml');
}

/**
 * Export sessions as CSV
 */
export function exportSessionsAsCSV(sessions: SessionData[]): void {
  const headers = [
    'ID',
    'Tipo',
    'Fecha',
    'Duración (min)',
    'Distancia (km)',
    'Calorías',
    'Ritmo Promedio',
    'Pasos',
    'Pasos/min',
  ];

  const rows = sessions.map(session => [
    session.id,
    session.type,
    new Date(session.date).toLocaleString('es-ES'),
    (session.duration / 60).toFixed(2),
    (session.distance / 1000).toFixed(2),
    session.calories,
    session.avgPace,
    session.steps,
    session.stepsPerMinute.toFixed(1),
  ]);

  const csv = [
    headers.join(','),
    ...rows.map(row => row.join(','))
  ].join('\n');

  downloadFile(csv, `runtracker-sessions-${formatDate(new Date())}.csv`, 'text/csv');
}

/**
 * Export single session as CSV
 */
export function exportSessionAsCSV(session: SessionData): void {
  exportSessionsAsCSV([session]);
}

/**
 * Export session positions as CSV (detailed GPS data)
 */
export function exportSessionPositionsAsCSV(session: SessionData): void {
  const headers = ['Índice', 'Latitud', 'Longitud', 'Tiempo Estimado (seg)'];
  
  const rows = session.positions.map((pos, index) => [
    index + 1,
    pos[0],
    pos[1],
    index * 1000, // Estimated time in milliseconds
  ]);

  const csv = [
    headers.join(','),
    ...rows.map(row => row.join(','))
  ].join('\n');

  downloadFile(csv, `runtracker-positions-${session.id}.csv`, 'text/csv');
}

/**
 * Export all data as JSON backup
 */
export function exportAllDataAsJSON(): void {
  const data = {
    version: '1.0',
    exportDate: new Date().toISOString(),
    profile: localStorage.getItem('user-profile'),
    progress: localStorage.getItem('daily-progress'),
    sessions: localStorage.getItem('running-session-history'),
    theme: localStorage.getItem('app-theme'),
  };

  const json = JSON.stringify(data, null, 2);
  downloadFile(json, `runtracker-backup-${formatDate(new Date())}.json`, 'application/json');
}

/**
 * Import data from JSON backup
 */
export function importDataFromJSON(file: File): Promise<boolean> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target?.result as string);
        
        if (data.profile) localStorage.setItem('user-profile', data.profile);
        if (data.progress) localStorage.setItem('daily-progress', data.progress);
        if (data.sessions) localStorage.setItem('running-session-history', data.sessions);
        if (data.theme) localStorage.setItem('app-theme', data.theme);
        
        resolve(true);
      } catch (error) {
        reject(error);
      }
    };
    
    reader.onerror = () => reject(new Error('Error al leer el archivo'));
    reader.readAsText(file);
  });
}

/**
 * Helper function to download a file
 */
function downloadFile(content: string, filename: string, mimeType: string): void {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

/**
 * Helper function to format date for filenames
 */
function formatDate(date: Date): string {
  return new Date(date).toISOString().split('T')[0];
}

