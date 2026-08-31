export const ACHIEVEMENTS_DATA = [
  {
    id: 'first-step',
    name: 'First Step',
    description: 'Complete your first habit check-in in Streakly.',
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
    name: 'Week Warrior',
    description: 'Maintain an unbroken 7-day streak on any habit.',
    icon: 'Award',
    tier: 'Silver',
    points: 250,
    type: 'streak_days',
    threshold: 7
  },
  {
    id: 'streak-14',
    name: '14 Day Streak',
    description: 'Reach a full fortnight of steady daily dedication.',
    icon: 'Target',
    tier: 'Silver',
    points: 500,
    type: 'streak_days',
    threshold: 14
  },
  {
    id: 'streak-30',
    name: '30 Day Streak',
    description: 'A full month of non-stop consistency. Habit cemented!',
    icon: 'Trophy',
    tier: 'Gold',
    points: 1000,
    type: 'streak_days',
    threshold: 30
  },
  {
    id: 'consistency-king',
    name: 'Consistency King',
    description: 'Achieve a 60-day streak or reach 50 total logged habits.',
    icon: 'Crown',
    tier: 'Gold',
    points: 1500,
    type: 'streak_or_completions',
    streakThreshold: 60,
    completionThreshold: 50
  },
  {
    id: 'legend-100',
    name: '100 Day Legend',
    description: 'Reach the pinnacle milestone of 100 consecutive days.',
    icon: 'Shield',
    tier: 'Diamond',
    points: 2500,
    type: 'streak_days',
    threshold: 100
  },
  {
    id: 'habit-master',
    name: 'Habit Master',
    description: 'Actively maintain and track 5 or more concurrent habits.',
    icon: 'Layers',
    tier: 'Silver',
    points: 300,
    type: 'habit_count',
    threshold: 5
  },
  {
    id: 'perfect-week',
    name: 'Perfect Week',
    description: 'Complete 100% of all scheduled habits for 7 consecutive days.',
    icon: 'CheckCircle2',
    tier: 'Gold',
    points: 800,
    type: 'perfect_week',
    threshold: 7
  }
];
