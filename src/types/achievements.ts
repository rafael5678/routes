export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: "distance" | "time" | "speed" | "consistency" | "special";
  requirement: number;
  unlocked: boolean;
  unlockedDate?: Date;
  progress: number; // 0-100
}

export const ACHIEVEMENTS: Omit<Achievement, "unlocked" | "unlockedDate" | "progress">[] = [
  // Distance Achievements
  {
    id: "first-run",
    title: "Primera Carrera",
    description: "Completa tu primera sesión de running",
    icon: "🏃",
    category: "distance",
    requirement: 1,
  },
  {
    id: "5km-runner",
    title: "Corredor 5K",
    description: "Recorre 5 kilómetros en una sola sesión",
    icon: "🥉",
    category: "distance",
    requirement: 5000,
  },
  {
    id: "10km-runner",
    title: "Corredor 10K",
    description: "Recorre 10 kilómetros en una sola sesión",
    icon: "🥈",
    category: "distance",
    requirement: 10000,
  },
  {
    id: "half-marathon",
    title: "Medio Maratón",
    description: "Recorre 21.1 kilómetros en una sola sesión",
    icon: "🥇",
    category: "distance",
    requirement: 21100,
  },
  {
    id: "marathon",
    title: "Maratonista",
    description: "Recorre 42.2 kilómetros en una sola sesión",
    icon: "🏆",
    category: "distance",
    requirement: 42200,
  },
  {
    id: "100km-total",
    title: "Centenario",
    description: "Acumula 100 kilómetros en total",
    icon: "💯",
    category: "distance",
    requirement: 100000,
  },

  // Time Achievements
  {
    id: "30min-run",
    title: "Media Hora",
    description: "Corre durante 30 minutos consecutivos",
    icon: "⏱️",
    category: "time",
    requirement: 1800,
  },
  {
    id: "1hour-run",
    title: "La Hora",
    description: "Corre durante 1 hora consecutiva",
    icon: "⏰",
    category: "time",
    requirement: 3600,
  },
  {
    id: "10hours-total",
    title: "Dedicación",
    description: "Acumula 10 horas de running en total",
    icon: "🕐",
    category: "time",
    requirement: 36000,
  },

  // Consistency Achievements
  {
    id: "3-day-streak",
    title: "Constancia Inicial",
    description: "Corre 3 días seguidos",
    icon: "🔥",
    category: "consistency",
    requirement: 3,
  },
  {
    id: "7-day-streak",
    title: "Semana Perfecta",
    description: "Corre 7 días seguidos",
    icon: "📅",
    category: "consistency",
    requirement: 7,
  },
  {
    id: "30-day-streak",
    title: "Hábito Sólido",
    description: "Corre 30 días seguidos",
    icon: "📆",
    category: "consistency",
    requirement: 30,
  },
  {
    id: "100-sessions",
    title: "Veterano",
    description: "Completa 100 sesiones de running",
    icon: "🎖️",
    category: "consistency",
    requirement: 100,
  },

  // Speed Achievements
  {
    id: "speed-5kmh",
    title: "Trotador",
    description: "Alcanza una velocidad de 5 km/h",
    icon: "🐢",
    category: "speed",
    requirement: 5,
  },
  {
    id: "speed-10kmh",
    title: "Corredor",
    description: "Alcanza una velocidad de 10 km/h",
    icon: "🏃‍♂️",
    category: "speed",
    requirement: 10,
  },
  {
    id: "speed-15kmh",
    title: "Velocista",
    description: "Alcanza una velocidad de 15 km/h",
    icon: "⚡",
    category: "speed",
    requirement: 15,
  },
  {
    id: "speed-20kmh",
    title: "Rayo",
    description: "Alcanza una velocidad de 20 km/h",
    icon: "🚀",
    category: "speed",
    requirement: 20,
  },

  // Special Achievements
  {
    id: "early-bird",
    title: "Madrugador",
    description: "Corre antes de las 6:00 AM",
    icon: "🌅",
    category: "special",
    requirement: 1,
  },
  {
    id: "night-runner",
    title: "Búho Nocturno",
    description: "Corre después de las 10:00 PM",
    icon: "🦉",
    category: "special",
    requirement: 1,
  },
  {
    id: "rainy-day",
    title: "Incondicional",
    description: "Corre un día lluvioso",
    icon: "🌧️",
    category: "special",
    requirement: 1,
  },
  {
    id: "1000-calories",
    title: "Quemador",
    description: "Quema 1000 calorías en una sesión",
    icon: "🔥",
    category: "special",
    requirement: 1000,
  },
];

