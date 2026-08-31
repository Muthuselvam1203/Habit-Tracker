export const HABIT_CATEGORIES = [
  { id: 'all', label: 'All Habits', icon: 'Sparkles' },
  { id: 'health', label: 'Health & Wellness', icon: 'HeartPulse', color: '#10B981' },
  { id: 'fitness', label: 'Fitness & Sports', icon: 'Dumbbell', color: '#EF4444' },
  { id: 'learning', label: 'Learning & Growth', icon: 'BookOpen', color: '#8B5CF6' },
  { id: 'productivity', label: 'Productivity & Work', icon: 'Target', color: '#F59E0B' },
  { id: 'personal', label: 'Mindfulness & Soul', icon: 'Smile', color: '#EC4899' },
  { id: 'relationships', label: 'Relationships & Family', icon: 'Users', color: '#F43F5E' },
  { id: 'sleep', label: 'Sleep & Rest', icon: 'Moon', color: '#6366F1' },
  { id: 'quit', label: 'Break Bad Habits', icon: 'ShieldCheck', color: '#DC2626' },
  { id: 'other', label: 'Other Activities', icon: 'CheckSquare', color: '#2563EB' }
];

export const CATEGORY_COLORS = {
  health: '#10B981',
  fitness: '#EF4444',
  learning: '#8B5CF6',
  productivity: '#F59E0B',
  personal: '#EC4899',
  relationships: '#F43F5E',
  sleep: '#6366F1',
  quit: '#DC2626',
  other: '#2563EB'
};

export const HABIT_COLORS = [
  { id: 'emerald', label: 'Emerald Green', hex: '#10B981' },
  { id: 'indigo', label: 'Deep Indigo', hex: '#6366F1' },
  { id: 'purple', label: 'Royal Purple', hex: '#8B5CF6' },
  { id: 'cyan', label: 'Sky Cyan', hex: '#06B6D4' },
  { id: 'amber', label: 'Warm Amber', hex: '#F59E0B' },
  { id: 'rose', label: 'Coral Rose', hex: '#F43F5E' },
  { id: 'pink', label: 'Blush Pink', hex: '#EC4899' },
  { id: 'yellow', label: 'Sun Gold', hex: '#EAB308' },
  { id: 'crimson', label: 'Crimson Red', hex: '#EF4444' },
  { id: 'blue', label: 'Electric Blue', hex: '#2563EB' },
  { id: 'teal', label: 'Mint Teal', hex: '#14B8A6' },
  { id: 'fuchsia', label: 'Bright Fuchsia', hex: '#D946EF' }
];

export const MEASURABLE_UNITS = [
  { id: 'ml', label: 'Milliliters (ml)', defaultTarget: 2000, defaultStep: 250 },
  { id: 'glasses', label: 'Glasses', defaultTarget: 8, defaultStep: 1 },
  { id: 'pages', label: 'Pages', defaultTarget: 20, defaultStep: 5 },
  { id: 'chapters', label: 'Chapters', defaultTarget: 1, defaultStep: 1 },
  { id: 'steps', label: 'Steps', defaultTarget: 8000, defaultStep: 1000 },
  { id: 'km', label: 'Kilometers (km)', defaultTarget: 5, defaultStep: 1 },
  { id: 'reps', label: 'Repetitions (reps)', defaultTarget: 50, defaultStep: 10 },
  { id: 'pushups', label: 'Push-ups', defaultTarget: 30, defaultStep: 10 },
  { id: 'minutes', label: 'Minutes', defaultTarget: 30, defaultStep: 5 },
  { id: 'times', label: 'Times / Count', defaultTarget: 3, defaultStep: 1 }
];

export const FREQUENCY_TYPES = [
  { id: 'daily', label: 'Every Day', desc: 'Repeat every single day' },
  { id: 'specific_days', label: 'Specific Days', desc: 'Choose Mon, Tue, etc.' },
  { id: 'weekly_target', label: 'Times per Week', desc: 'e.g. 3 times / week' },
  { id: 'interval', label: 'Repeat Interval', desc: 'Every X days' }
];

export const TIME_OF_DAY_OPTIONS = [
  { id: 'anytime', label: 'Any time', icon: 'Clock', desc: 'Throughout the day' },
  { id: 'morning', label: 'Morning', icon: 'Sun', desc: '05:00 - 12:00' },
  { id: 'afternoon', label: 'Afternoon', icon: 'Zap', desc: '12:00 - 18:00' },
  { id: 'evening', label: 'Evening', icon: 'Moon', desc: '18:00 - 23:59' }
];

export const PRESET_LIBRARY = [
  // Health
  {
    name: 'Drink 2,000ml Water',
    category: 'health',
    icon: 'Droplet',
    color: '#06B6D4',
    timeOfDay: 'anytime',
    habitType: 'measurable',
    measurableUnit: 'ml',
    measurableTarget: 2000,
    measurableStep: 250,
    difficulty: 'easy',
    reminderTime: '09:00',
    description: 'Keep hydrated throughout the day for sustained metabolic and mental energy.'
  },
  {
    name: 'Take daily vitamins & minerals',
    category: 'health',
    icon: 'HeartPulse',
    color: '#10B981',
    timeOfDay: 'morning',
    habitType: 'boolean',
    difficulty: 'easy',
    reminderTime: '08:30',
    description: 'Essential micronutrients and omega-3s with morning meal.'
  },
  {
    name: 'Outdoor Morning Walk',
    category: 'health',
    icon: 'Footprints',
    color: '#10B981',
    timeOfDay: 'morning',
    habitType: 'measurable',
    measurableUnit: 'steps',
    measurableTarget: 4000,
    measurableStep: 500,
    difficulty: 'easy',
    reminderTime: '07:30',
    description: 'Brisk walk in natural morning sunlight to set biological clock.'
  },
  // Fitness
  {
    name: 'Strength & Gym Workout',
    category: 'fitness',
    icon: 'Dumbbell',
    color: '#EF4444',
    timeOfDay: 'morning',
    habitType: 'timer',
    timerTargetMinutes: 45,
    difficulty: 'hard',
    reminderTime: '07:00',
    description: 'Progressive resistance training for bone density and muscle mass.'
  },
  {
    name: 'Core & 50 Push-ups',
    category: 'fitness',
    icon: 'Flame',
    color: '#EF4444',
    timeOfDay: 'afternoon',
    habitType: 'measurable',
    measurableUnit: 'pushups',
    measurableTarget: 50,
    measurableStep: 10,
    difficulty: 'medium',
    reminderTime: '17:30',
    description: 'Upper body and core strength maintenance.'
  },
  {
    name: 'Full Body Mobility & Stretch',
    category: 'fitness',
    icon: 'Wind',
    color: '#F97316',
    timeOfDay: 'evening',
    habitType: 'timer',
    timerTargetMinutes: 15,
    difficulty: 'easy',
    reminderTime: '21:00',
    description: 'Joint mobility, hip opening, and spinal decompression.'
  },
  // Productivity & Learning
  {
    name: 'Deep Work Block',
    category: 'productivity',
    icon: 'Target',
    color: '#F59E0B',
    timeOfDay: 'morning',
    habitType: 'timer',
    timerTargetMinutes: 60,
    difficulty: 'hard',
    reminderTime: '09:30',
    description: 'Zero distraction, single-tasking flow session on highest priority project.'
  },
  {
    name: 'Read 20 Pages',
    category: 'learning',
    icon: 'BookOpen',
    color: '#3B82F6',
    timeOfDay: 'evening',
    habitType: 'measurable',
    measurableUnit: 'pages',
    measurableTarget: 20,
    measurableStep: 5,
    difficulty: 'easy',
    reminderTime: '21:30',
    description: 'Continuous non-fiction learning before sleep.'
  },
  {
    name: 'Daily Priority Brain Dump',
    category: 'productivity',
    icon: 'Brain',
    color: '#F59E0B',
    timeOfDay: 'morning',
    habitType: 'boolean',
    difficulty: 'easy',
    reminderTime: '08:45',
    description: 'Organize top 3 must-win outcomes for the day.'
  },
  // Mindfulness & Rest
  {
    name: 'Mindful Meditation',
    category: 'personal',
    icon: 'Sparkles',
    color: '#8B5CF6',
    timeOfDay: 'morning',
    habitType: 'timer',
    timerTargetMinutes: 15,
    difficulty: 'medium',
    reminderTime: '07:15',
    description: 'Calm the mind, focus on breath sensations, center awareness.'
  },
  {
    name: 'Evening Reflection Journal',
    category: 'personal',
    icon: 'PenTool',
    color: '#EC4899',
    timeOfDay: 'evening',
    habitType: 'boolean',
    difficulty: 'easy',
    reminderTime: '22:00',
    description: 'Record 3 wins, lessons learned, and gratitude.'
  },
  {
    name: 'Sleep 8 Hours',
    category: 'sleep',
    icon: 'Moon',
    color: '#6366F1',
    timeOfDay: 'evening',
    habitType: 'timer',
    timerTargetMinutes: 480,
    difficulty: 'medium',
    reminderTime: '22:30',
    description: 'Protect 8 hours of restorative deep and REM sleep.'
  },
  // Bad Habits to Break
  {
    name: 'No Sugar / Junk Food',
    category: 'quit',
    icon: 'ShieldCheck',
    color: '#DC2626',
    timeOfDay: 'anytime',
    habitType: 'boolean',
    difficulty: 'hard',
    reminderTime: '12:00',
    description: 'Eliminate refined sugars and ultra-processed snacks.'
  },
  {
    name: 'No Late-Night Screens',
    category: 'quit',
    icon: 'Moon',
    color: '#6366F1',
    timeOfDay: 'evening',
    habitType: 'boolean',
    difficulty: 'medium',
    reminderTime: '22:00',
    description: 'No social media or blue light within 1 hour of sleep.'
  }
];

export const PRESET_ONBOARDING_HABITS = PRESET_LIBRARY.slice(0, 8);
export const PRESET_HABITS = PRESET_LIBRARY;

export const HABIT_ICONS = [
  'Sparkles', 'Moon', 'Footprints', 'Wind', 'Brain', 'PenTool',
  'PhoneCall', 'Sun', 'Dumbbell', 'BookOpen', 'Target', 'Droplet',
  'HeartPulse', 'Users', 'Smile', 'Coffee', 'CheckSquare', 'Flame',
  'ShieldCheck', 'Clock', 'Zap', 'Layers', 'Award'
];

/**
 * Intelligent helper to resolve the distinct color of any habit/activity.
 */
export const getHabitColor = (habit) => {
  if (!habit) return '#2563EB';
  if (habit.color && typeof habit.color === 'string' && habit.color.startsWith('#')) {
    return habit.color;
  }

  const name = (habit.name || '').toLowerCase();
  
  if (name.includes('walk') || name.includes('step') || name.includes('run') || name.includes('jog') || name.includes('hike')) {
    return '#10B981'; // Emerald
  }
  if (name.includes('sleep') || name.includes('bed') || name.includes('rest') || name.includes('nap')) {
    return '#6366F1'; // Indigo
  }
  if (name.includes('meditat') || name.includes('mindful') || name.includes('zen') || name.includes('yoga')) {
    return '#8B5CF6'; // Purple
  }
  if (name.includes('breath') || name.includes('pranayam') || name.includes('relax')) {
    return '#06B6D4'; // Sky Cyan
  }
  if (name.includes('brain') || name.includes('dump') || name.includes('focus') || name.includes('work') || name.includes('task') || name.includes('plan')) {
    return '#F59E0B'; // Amber
  }
  if (name.includes('journal') || name.includes('write') || name.includes('diary') || name.includes('reflect')) {
    return '#EC4899'; // Pink
  }
  if (name.includes('call') || name.includes('family') || name.includes('friend') || name.includes('social') || name.includes('talk')) {
    return '#F43F5E'; // Rose
  }
  if (name.includes('sun') || name.includes('outdoor') || name.includes('nature') || name.includes('fresh air')) {
    return '#EAB308'; // Yellow / Sun
  }
  if (name.includes('gym') || name.includes('workout') || name.includes('exercise') || name.includes('lift') || name.includes('fit') || name.includes('pushup')) {
    return '#EF4444'; // Crimson
  }
  if (name.includes('read') || name.includes('book') || name.includes('study') || name.includes('learn')) {
    return '#3B82F6'; // Blue
  }
  if (name.includes('water') || name.includes('drink') || name.includes('hydrate')) {
    return '#06B6D4'; // Sky Cyan
  }
  if (name.includes('sugar') || name.includes('junk') || name.includes('quit') || name.includes('stop') || name.includes('detox')) {
    return '#DC2626'; // Red
  }

  // Category fallback
  if (habit.category && CATEGORY_COLORS[habit.category]) {
    return CATEGORY_COLORS[habit.category];
  }

  // Deterministic fallback by id or name hash
  const str = habit.id || habit.name || 'habit';
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  const index = Math.abs(hash) % HABIT_COLORS.length;
  return HABIT_COLORS[index].hex;
};

export const getCategoryColor = (categoryId) => {
  return CATEGORY_COLORS[categoryId] || '#2563EB';
};
