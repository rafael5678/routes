export type Language = "es" | "en";

export interface Translations {
  // Navigation
  nav: {
    map: string;
    history: string;
    stats: string;
    goals: string;
    profile: string;
    achievements: string;
    export: string;
    settings: string;
  };

  // App Title
  appTitle: string;
  greeting: string;

  // Map
  map: {
    myLocation: string;
    selectDestination: string;
    calculating: string;
    distance: string;
    duration: string;
  };

  // Running Session
  session: {
    start: string;
    pause: string;
    resume: string;
    stop: string;
    duration: string;
    distance: string;
    speed: string;
    avgSpeed: string;
    calories: string;
    steps: string;
    pace: string;
  };

  // Profile
  profile: {
    title: string;
    edit: string;
    save: string;
    personalInfo: string;
    name: string;
    weight: string;
    height: string;
    age: string;
    gender: string;
    male: string;
    female: string;
    other: string;
    preferences: string;
    experienceLevel: string;
    beginner: string;
    intermediate: string;
    advanced: string;
    unitSystem: string;
    metric: string;
    imperial: string;
    goals: string;
    dailySteps: string;
    dailyDistance: string;
    weeklyRuns: string;
    bmi: string;
    bmr: string;
  };

  // Achievements
  achievements: {
    title: string;
    unlocked: string;
    locked: string;
    progress: string;
    all: string;
    distance: string;
    time: string;
    speed: string;
    consistency: string;
    special: string;
  };

  // Export
  export: {
    title: string;
    exportSessions: string;
    exportCSV: string;
    exportGPX: string;
    backup: string;
    downloadBackup: string;
    restoreBackup: string;
    info: string;
  };

  // Voice Settings
  voice: {
    title: string;
    enable: string;
    language: string;
    timeInterval: string;
    distanceInterval: string;
    test: string;
  };

  // Common
  common: {
    back: string;
    close: string;
    save: string;
    cancel: string;
    delete: string;
    edit: string;
    loading: string;
    error: string;
    success: string;
  };
}

export const translations: Record<Language, Translations> = {
  es: {
    nav: {
      map: "Mapa",
      history: "Historial",
      stats: "Estadísticas",
      goals: "Objetivos",
      profile: "Perfil",
      achievements: "Logros",
      export: "Exportar",
      settings: "Config",
    },
    appTitle: "RunTracker",
    greeting: "Hola",
    map: {
      myLocation: "Mi ubicación",
      selectDestination: "Selecciona destino",
      calculating: "Calculando ruta...",
      distance: "Distancia",
      duration: "Duración",
    },
    session: {
      start: "Iniciar",
      pause: "Pausar",
      resume: "Continuar",
      stop: "Terminar",
      duration: "Duración",
      distance: "Distancia",
      speed: "Velocidad",
      avgSpeed: "Vel. Promedio",
      calories: "Calorías",
      steps: "Pasos",
      pace: "Ritmo",
    },
    profile: {
      title: "Mi Perfil",
      edit: "Editar Perfil",
      save: "Guardar Perfil",
      personalInfo: "Información Personal",
      name: "Nombre",
      weight: "Peso (kg)",
      height: "Altura (cm)",
      age: "Edad",
      gender: "Género",
      male: "Masculino",
      female: "Femenino",
      other: "Otro",
      preferences: "Preferencias",
      experienceLevel: "Nivel de Experiencia",
      beginner: "Principiante",
      intermediate: "Intermedio",
      advanced: "Avanzado",
      unitSystem: "Sistema de Unidades",
      metric: "Métrico (km, m)",
      imperial: "Imperial (mi, ft)",
      goals: "Metas",
      dailySteps: "Pasos Diarios",
      dailyDistance: "Distancia Diaria (metros)",
      weeklyRuns: "Carreras Semanales",
      bmi: "IMC (BMI)",
      bmr: "TMB (BMR)",
    },
    achievements: {
      title: "Logros",
      unlocked: "Desbloqueados",
      locked: "Bloqueados",
      progress: "Progreso",
      all: "Todos",
      distance: "Distancia",
      time: "Tiempo",
      speed: "Velocidad",
      consistency: "Constancia",
      special: "Especiales",
    },
    export: {
      title: "Exportar e Importar Datos",
      exportSessions: "Exportar Sesiones",
      exportCSV: "Exportar todas como CSV",
      exportGPX: "Exportar todas como GPX (Strava)",
      backup: "Respaldo Completo",
      downloadBackup: "Descargar Respaldo (JSON)",
      restoreBackup: "Restaurar Respaldo",
      info: "Información",
    },
    voice: {
      title: "Notificaciones de Voz",
      enable: "Activar notificaciones",
      language: "Idioma",
      timeInterval: "Intervalo de tiempo",
      distanceInterval: "Intervalo de distancia",
      test: "Probar",
    },
    common: {
      back: "Volver",
      close: "Cerrar",
      save: "Guardar",
      cancel: "Cancelar",
      delete: "Eliminar",
      edit: "Editar",
      loading: "Cargando...",
      error: "Error",
      success: "Éxito",
    },
  },
  en: {
    nav: {
      map: "Map",
      history: "History",
      stats: "Statistics",
      goals: "Goals",
      profile: "Profile",
      achievements: "Achievements",
      export: "Export",
      settings: "Settings",
    },
    appTitle: "RunTracker",
    greeting: "Hello",
    map: {
      myLocation: "My Location",
      selectDestination: "Select destination",
      calculating: "Calculating route...",
      distance: "Distance",
      duration: "Duration",
    },
    session: {
      start: "Start",
      pause: "Pause",
      resume: "Resume",
      stop: "Stop",
      duration: "Duration",
      distance: "Distance",
      speed: "Speed",
      avgSpeed: "Avg Speed",
      calories: "Calories",
      steps: "Steps",
      pace: "Pace",
    },
    profile: {
      title: "My Profile",
      edit: "Edit Profile",
      save: "Save Profile",
      personalInfo: "Personal Information",
      name: "Name",
      weight: "Weight (kg)",
      height: "Height (cm)",
      age: "Age",
      gender: "Gender",
      male: "Male",
      female: "Female",
      other: "Other",
      preferences: "Preferences",
      experienceLevel: "Experience Level",
      beginner: "Beginner",
      intermediate: "Intermediate",
      advanced: "Advanced",
      unitSystem: "Unit System",
      metric: "Metric (km, m)",
      imperial: "Imperial (mi, ft)",
      goals: "Goals",
      dailySteps: "Daily Steps",
      dailyDistance: "Daily Distance (meters)",
      weeklyRuns: "Weekly Runs",
      bmi: "BMI",
      bmr: "BMR",
    },
    achievements: {
      title: "Achievements",
      unlocked: "Unlocked",
      locked: "Locked",
      progress: "Progress",
      all: "All",
      distance: "Distance",
      time: "Time",
      speed: "Speed",
      consistency: "Consistency",
      special: "Special",
    },
    export: {
      title: "Export and Import Data",
      exportSessions: "Export Sessions",
      exportCSV: "Export all as CSV",
      exportGPX: "Export all as GPX (Strava)",
      backup: "Full Backup",
      downloadBackup: "Download Backup (JSON)",
      restoreBackup: "Restore Backup",
      info: "Information",
    },
    voice: {
      title: "Voice Notifications",
      enable: "Enable notifications",
      language: "Language",
      timeInterval: "Time interval",
      distanceInterval: "Distance interval",
      test: "Test",
    },
    common: {
      back: "Back",
      close: "Close",
      save: "Save",
      cancel: "Cancel",
      delete: "Delete",
      edit: "Edit",
      loading: "Loading...",
      error: "Error",
      success: "Success",
    },
  },
};

