export const DEFAULT_MORNING_ROUTINE = [
  { id: 'mr-1', title: 'Wake up early', scheduledTime: '06:00', durationMin: 5, icon: 'Sun', notes: 'Rise without hitting snooze' },
  { id: 'mr-2', title: 'Drink 500ml warm water', scheduledTime: '06:05', durationMin: 5, icon: 'Droplets', notes: 'Rehydrate cells immediately' },
  { id: 'mr-3', title: 'Brush teeth & freshen up', scheduledTime: '06:10', durationMin: 10, icon: 'Sparkles', notes: 'Morning dental & hygiene' },
  { id: 'mr-4', title: 'Make the bed', scheduledTime: '06:20', durationMin: 5, icon: 'CheckSquare', notes: 'First disciplined win of the day' },
  { id: 'mr-5', title: 'Morning workout / Stretch', scheduledTime: '06:30', durationMin: 30, icon: 'Dumbbell', notes: 'Activate metabolism & muscles' },
  { id: 'mr-6', title: 'Mindfulness & Meditation', scheduledTime: '07:05', durationMin: 15, icon: 'Heart', notes: 'Center attention and breathe' },
  { id: 'mr-7', title: 'Cold/warm shower', scheduledTime: '07:20', durationMin: 15, icon: 'Sparkles', notes: 'Invigorate the nervous system' },
  { id: 'mr-8', title: 'Nutritious Breakfast', scheduledTime: '07:40', durationMin: 20, icon: 'Coffee', notes: 'High-protein energizing meal' },
  { id: 'mr-9', title: 'Read 15 mins of a book', scheduledTime: '08:05', durationMin: 15, icon: 'BookOpen', notes: 'Feed positive mental models' },
  { id: 'mr-10', title: 'Plan Top 3 Day Goals', scheduledTime: '08:25', durationMin: 10, icon: 'Target', notes: 'Set deep focus priorities' }
];

export const DEFAULT_NIGHT_ROUTINE = [
  { id: 'nr-1', title: 'Stop phone & screen usage', scheduledTime: '21:00', durationMin: 15, icon: 'PhoneOff', notes: 'Cut blue light exposure' },
  { id: 'nr-2', title: 'Nutritious light dinner', scheduledTime: '21:15', durationMin: 30, icon: 'Coffee', notes: 'Allow 2h before bed' },
  { id: 'nr-3', title: 'Streakly Daily Journal', scheduledTime: '21:45', durationMin: 15, icon: 'PenTool', notes: 'Log 3 wins & learnings' },
  { id: 'nr-4', title: 'Prepare clothes & desk for tomorrow', scheduledTime: '22:00', durationMin: 10, icon: 'CheckSquare', notes: 'Zero morning friction' },
  { id: 'nr-5', title: 'Read fiction/non-fiction', scheduledTime: '22:15', durationMin: 20, icon: 'BookOpen', notes: 'Relax the mind peacefully' },
  { id: 'nr-6', title: 'Breathing / Wind-down', scheduledTime: '22:35', durationMin: 10, icon: 'Wind', notes: '4-7-8 relaxing breathing' },
  { id: 'nr-7', title: 'Deep sleep in dark cool room', scheduledTime: '22:45', durationMin: 480, icon: 'Moon', notes: 'Target 7.5 - 8 hours sleep' }
];

export const DEFAULT_BAD_HABITS = [
  {
    id: 'bh-1',
    name: 'Late-night phone scrolling',
    category: 'productivity',
    icon: 'PhoneOff',
    cleanSince: new Date(Date.now() - 6 * 86400000).toISOString(),
    bestCleanDays: 18,
    targetUnit: 'screen-free',
    reason: 'Improves sleep latency and morning clarity'
  },
  {
    id: 'bh-2',
    name: 'Junk food & sugary drinks',
    category: 'health',
    icon: 'Shield',
    cleanSince: new Date(Date.now() - 11 * 86400000).toISOString(),
    bestCleanDays: 14,
    targetUnit: 'clean diet',
    reason: 'Eliminates afternoon brain fog'
  },
  {
    id: 'bh-3',
    name: 'Procrastinating top task',
    category: 'productivity',
    icon: 'Zap',
    cleanSince: new Date(Date.now() - 4 * 86400000).toISOString(),
    bestCleanDays: 9,
    targetUnit: 'eat the frog',
    reason: 'Builds massive execution momentum'
  }
];

export const DEFAULT_GOALS = [
  {
    id: 'goal-1',
    title: 'Peak Physical Fitness & Vitality',
    description: 'Build strength, stay hydrated, and maintain consistent high energy.',
    icon: 'Dumbbell',
    category: 'health',
    color: '#10B981',
    targetDate: '2026-12-31',
    habitIds: ['habit-2', 'habit-water']
  },
  {
    id: 'goal-2',
    title: 'Mental Mastery & Emotional Calm',
    description: 'Practice daily mindfulness, reflection journaling, and stress management.',
    icon: 'Heart',
    category: 'mind',
    color: '#8B5CF6',
    targetDate: '2026-12-31',
    habitIds: ['habit-1', 'habit-4']
  },
  {
    id: 'goal-3',
    title: 'Elite Deep Work & Skill Growth',
    description: 'Execute focused study blocks, deliberate practice, and continuous learning.',
    icon: 'Target',
    category: 'learning',
    color: '#F59E0B',
    targetDate: '2026-12-31',
    habitIds: ['habit-3', 'habit-study']
  }
];
