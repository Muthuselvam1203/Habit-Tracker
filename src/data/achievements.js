export const ACHIEVEMENTS_DATA = [
  {
    id: 'first-step',
    name: 'First Step',
    description: 'Complete your first habit or routine check-in in Streakly.',
    icon: 'Sparkles',
    tier: 'Bronze',
    points: 50,
    type: 'completion_count',
    threshold: 1
  },
  {
    id: 'streak-3',
    name: '3 Day Starter',
    description: 'Build your initial momentum with a 3-day active streak.',
    icon: 'Flame',
    tier: 'Bronze',
    points: 100,
    type: 'streak_days',
    threshold: 3
  },
  {
    id: 'week-warrior',
    name: '7 Day Warrior',
    description: 'Maintain an unbroken 7-day streak on any habit.',
    icon: 'Award',
    tier: 'Silver',
    points: 250,
    type: 'streak_days',
    threshold: 7
  },
  {
    id: 'streak-14',
    name: '14 Day Dedication',
    description: 'Reach a full fortnight of steady daily dedication.',
    icon: 'Target',
    tier: 'Silver',
    points: 500,
    type: 'streak_days',
    threshold: 14
  },
  {
    id: 'streak-30',
    name: '30 Day Consistency',
    description: 'A full month of non-stop consistency. Habit cemented!',
    icon: 'Trophy',
    tier: 'Gold',
    points: 1000,
    type: 'streak_days',
    threshold: 30
  },
  {
    id: 'hundred-completions',
    name: '100 Completions Club',
    description: 'Log 100 total habit check-ins across your lifetime journey.',
    icon: 'CheckCircle2',
    tier: 'Gold',
    points: 1200,
    type: 'completion_count',
    threshold: 100
  },
  {
    id: 'early-bird',
    name: 'Early Bird',
    description: 'Complete your morning routine or wake up early consistently.',
    icon: 'Sun',
    tier: 'Silver',
    points: 350,
    type: 'morning_routine',
    threshold: 5
  },
  {
    id: 'hydration-hero',
    name: 'Hydration Hero',
    description: 'Hit your daily water intake goal (8+ glasses / 2L+).',
    icon: 'Droplets',
    tier: 'Bronze',
    points: 150,
    type: 'water_goal',
    threshold: 3
  },
  {
    id: 'mindful-person',
    name: 'Mindful Person',
    description: 'Log meditation or breathing sessions across 5 active days.',
    icon: 'Heart',
    tier: 'Silver',
    points: 300,
    type: 'mindfulness',
    threshold: 5
  },
  {
    id: 'reading-master',
    name: 'Reading Master',
    description: 'Build steady knowledge by tracking reading or study time.',
    icon: 'BookOpen',
    tier: 'Silver',
    points: 350,
    type: 'reading',
    threshold: 5
  },
  {
    id: 'focus-master',
    name: 'Focus Master',
    description: 'Complete 5 deep work or Pomodoro focus sessions.',
    icon: 'Zap',
    tier: 'Gold',
    points: 500,
    type: 'focus_sessions',
    threshold: 5
  },
  {
    id: 'bad-habit-crusher',
    name: 'Bad Habit Crusher',
    description: 'Stay 5+ days clean from an avoided negative habit.',
    icon: 'ShieldCheck',
    tier: 'Gold',
    points: 600,
    type: 'bad_habit_streak',
    threshold: 5
  },
  {
    id: 'life-optimizer',
    name: 'Life Score Champion',
    description: 'Achieve a holistic Daily Life Score of 85+ out of 100.',
    icon: 'Crown',
    tier: 'Diamond',
    points: 1500,
    type: 'life_score',
    threshold: 85
  },
  {
    id: 'legend-100',
    name: '100 Day Legend',
    description: 'Reach the pinnacle milestone of 100 consecutive days of excellence.',
    icon: 'Shield',
    tier: 'Diamond',
    points: 2500,
    type: 'streak_days',
    threshold: 100
  }
];

export const calculateUserLevel = (totalXp = 0) => {
  // 300 XP per level
  const level = Math.max(1, Math.floor(totalXp / 300) + 1);
  const currentLevelBaseXp = (level - 1) * 300;
  const nextLevelXp = level * 300;
  const xpInCurrentLevel = totalXp - currentLevelBaseXp;
  const progressPercent = Math.min(100, Math.round((xpInCurrentLevel / 300) * 100));

  const TITLES = [
    'Novice Starter',
    'Routine Explorer',
    'Consistency Builder',
    'Habit Achiever',
    'Momentum Master',
    'Focus Warrior',
    'Wellness Guardian',
    'Life Architect',
    'Streak Champion',
    'High Performer',
    'Zen Master',
    'Productivity Titan',
    'Streakly Legend'
  ];

  const titleIndex = Math.min(TITLES.length - 1, level - 1);
  const title = TITLES[titleIndex];

  return {
    level,
    title,
    currentXp: totalXp,
    xpInCurrentLevel,
    xpForNextLevel: 300,
    nextLevelTotalXp: nextLevelXp,
    progressPercent
  };
};
