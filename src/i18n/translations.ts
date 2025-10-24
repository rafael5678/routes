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
    selectOrigin: string;
    routeReady: string;
    clear: string;
    locating: string;
    destinationsFromUniversity: string;
    tapDestinationToCalculate: string;
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
    startTraining: string;
    clickToStart: string;
    startNow: string;
    running: string;
    goal: string;
    stepsToday: string;
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
    of: string;
    unlockedCount: string;
    completedPercent: string;
    noAchievements: string;
    unlockedOn: string;
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

  // History
  history: {
    title: string;
    noSessions: string;
    startFirst: string;
    backToHistory: string;
    time: string;
  };

  // Routes
  routes: {
    title: string;
    selectRoute: string;
    easy: string;
    moderate: string;
    difficult: string;
    route1Name: string;
    route1Desc: string;
    route2Name: string;
    route2Desc: string;
    route3Name: string;
    route3Desc: string;
    route4Name: string;
    route4Desc: string;
  };

  // Statistics
  stats: {
    title: string;
    week: string;
    month: string;
    year: string;
    all: string;
    activities: string;
    activeMinutes: string;
    totalRuns: string;
    totalDistance: string;
    totalTime: string;
    totalCalories: string;
    totalSteps: string;
    thisWeek: string;
    sessions: string;
    avgPace: string;
  };

  // Goals
  goals: {
    title: string;
    stepsToday: string;
    currentGoal: string;
    stepsPerDay: string;
    statistics: string;
    trend: string;
    yesterday: string;
    otherGoals: string;
    edit: string;
    viewHistory: string;
    dailySteps: string;
    dailyDistance: string;
    dailyCalories: string;
    steps: string;
    meters: string;
    completed: string;
    newGoalPrompt: string;
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
      selectOrigin: "Selecciona origen",
      routeReady: "Ruta lista",
      clear: "Limpiar",
      locating: "Ubicando...",
      destinationsFromUniversity: "Destinos desde la Universidad",
      tapDestinationToCalculate: "Toca un destino para calcular la ruta automáticamente",
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
      startTraining: "Iniciar Entrenamiento",
      clickToStart: "Haz clic para comenzar a correr",
      startNow: "🚀 COMENZAR AHORA",
      running: "Correr",
      goal: "Meta",
      stepsToday: "Pasos hoy",
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
      of: "de",
      unlockedCount: "desbloqueados",
      completedPercent: "Completado",
      noAchievements: "No hay logros en esta categoría",
      unlockedOn: "Desbloqueado",
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
    history: {
      title: "📋 Historial de Carreras",
      noSessions: "No hay carreras registradas",
      startFirst: "¡Comienza tu primera sesión!",
      backToHistory: "← Volver al historial",
      time: "Tiempo",
    },
    routes: {
      title: "Rutas para Correr",
      selectRoute: "Selecciona una ruta y comienza tu entrenamiento",
      easy: "Fácil",
      moderate: "Moderado",
      difficult: "Difícil",
      route1Name: "Circuito Universidad - Pandiaco",
      route1Desc: "Circuito corto alrededor de las universidades",
      route2Name: "Ruta al Centro Histórico",
      route2Desc: "Ruta hasta el centro con paisaje urbano",
      route3Name: "Circuito Parque de la Salud",
      route3Desc: "Ruta tranquila hacia zona verde",
      route4Name: "Ruta Larga - Terminal",
      route4Desc: "Ruta completa para entrenamiento intenso",
    },
    stats: {
      title: "Estadísticas",
      week: "Semana",
      month: "Mes",
      year: "Año",
      all: "Total",
      activities: "Actividades",
      activeMinutes: "Minutos Activos",
      totalRuns: "Total de Carreras",
      totalDistance: "🏃 Distancia Total",
      totalTime: "⏱️ Tiempo Total",
      totalCalories: "🔥 Calorías Total",
      totalSteps: "👣 Pasos Total",
      thisWeek: "Esta Semana",
      sessions: "Sesiones",
      avgPace: "Ritmo Promedio",
    },
    goals: {
      title: "Objetivos",
      stepsToday: "Pasos hoy",
      currentGoal: "Objetivo actual",
      stepsPerDay: "Pasos / día",
      statistics: "Estadísticas",
      trend: "Tendencia",
      yesterday: "Ayer",
      otherGoals: "Otros Objetivos",
      edit: "Editar",
      viewHistory: "📊 Ver Historial Completo",
      dailySteps: "Pasos diarios",
      dailyDistance: "Distancia diaria",
      dailyCalories: "Calorías diarias",
      steps: "pasos",
      meters: "metros",
      completed: "Completado",
      newGoalPrompt: "Nuevo objetivo para",
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
      selectOrigin: "Select origin",
      routeReady: "Route ready",
      clear: "Clear",
      locating: "Locating...",
      destinationsFromUniversity: "Destinations from University",
      tapDestinationToCalculate: "Tap a destination to automatically calculate route",
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
      startTraining: "Start Training",
      clickToStart: "Click to start running",
      startNow: "🚀 START NOW",
      running: "Running",
      goal: "Goal",
      stepsToday: "Steps today",
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
      of: "of",
      unlockedCount: "unlocked",
      completedPercent: "Completed",
      noAchievements: "No achievements in this category",
      unlockedOn: "Unlocked",
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
    history: {
      title: "📋 Run History",
      noSessions: "No runs recorded",
      startFirst: "Start your first session!",
      backToHistory: "← Back to history",
      time: "Time",
    },
    routes: {
      title: "Running Routes",
      selectRoute: "Select a route and start your training",
      easy: "Easy",
      moderate: "Moderate",
      difficult: "Difficult",
      route1Name: "University Circuit - Pandiaco",
      route1Desc: "Short circuit around universities",
      route2Name: "Historic Center Route",
      route2Desc: "Route to downtown with urban landscape",
      route3Name: "Health Park Circuit",
      route3Desc: "Quiet route towards green area",
      route4Name: "Long Route - Terminal",
      route4Desc: "Complete route for intense training",
    },
    stats: {
      title: "Statistics",
      week: "Week",
      month: "Month",
      year: "Year",
      all: "All Time",
      activities: "Activities",
      activeMinutes: "Active Minutes",
      totalRuns: "Total Runs",
      totalDistance: "🏃 Total Distance",
      totalTime: "⏱️ Total Time",
      totalCalories: "🔥 Total Calories",
      totalSteps: "👣 Total Steps",
      thisWeek: "This Week",
      sessions: "Sessions",
      avgPace: "Average Pace",
    },
    goals: {
      title: "Goals",
      stepsToday: "Steps today",
      currentGoal: "Current goal",
      stepsPerDay: "Steps / day",
      statistics: "Statistics",
      trend: "Trend",
      yesterday: "Yesterday",
      otherGoals: "Other Goals",
      edit: "Edit",
      viewHistory: "📊 View Full History",
      dailySteps: "Daily steps",
      dailyDistance: "Daily distance",
      dailyCalories: "Daily calories",
      steps: "steps",
      meters: "meters",
      completed: "Completed",
      newGoalPrompt: "New goal for",
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

