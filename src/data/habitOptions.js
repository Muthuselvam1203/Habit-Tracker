export const HABIT_CATEGORIES = [
  { id: 'all', label: 'All Habits', icon: 'Sparkles' },
  { id: 'health', label: 'Health', icon: 'HeartPulse', color: '#10B981' },
  { id: 'fitness', label: 'Fitness', icon: 'Dumbbell', color: '#EF4444' },
  { id: 'learning', label: 'Learning', icon: 'BookOpen', color: '#8B5CF6' },
  { id: 'productivity', label: 'Productivity', icon: 'Target', color: '#F59E0B' },
  { id: 'personal', label: 'Personal', icon: 'Smile', color: '#EC4899' },
  { id: 'relationships', label: 'Relationships', icon: 'Users', color: '#F43F5E' },
  { id: 'sleep', label: 'Sleep', icon: 'Moon', color: '#6366F1' },
  { id: 'other', label: 'Other', icon: 'CheckSquare', color: '#2563EB' }
];

export const CATEGORY_COLORS = {
  health: '#10B981',
  fitness: '#EF4444',
  learning: '#8B5CF6',
  productivity: '#F59E0B',
  personal: '#EC4899',
  relationships: '#F43F5E',
  sleep: '#6366F1',
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

export const PRESET_ONBOARDING_HABITS = [
  {
    id: 'meditation',
    name: 'Practice meditation',
    category: 'personal',
    icon: 'Sparkles',
    color: '#8B5CF6', // Purple
    timeOfDay: 'morning',
    targetDays: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    reminderTime: '07:00',
    description: 'Calm the mind and cultivate peaceful awareness for 10 minutes.'
  },
  {
    id: 'sleep-8h',
    name: 'Sleep over 8h',
    category: 'sleep',
    icon: 'Moon',
    color: '#6366F1', // Indigo
    timeOfDay: 'evening',
    targetDays: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    reminderTime: '22:30',
    description: 'Rest deeply to support cellular recovery, mood, and focus.'
  },
  {
    id: 'walking',
    name: 'Walking',
    category: 'health',
    icon: 'Footprints',
    color: '#10B981', // Emerald
    timeOfDay: 'morning',
    targetDays: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    reminderTime: '07:30',
    description: 'Take a brisk 20-minute walk in natural light.'
  },
  {
    id: 'breathing',
    name: 'Practice breathing',
    category: 'personal',
    icon: 'Wind',
    color: '#06B6D4', // Sky Cyan
    timeOfDay: 'morning',
    targetDays: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    reminderTime: '08:00',
    description: '5 minutes of box breathing to lower cortisol and center focus.'
  },
  {
    id: 'brain-dump',
    name: 'Brain dump',
    category: 'productivity',
    icon: 'Brain',
    color: '#F59E0B', // Warm Amber
    timeOfDay: 'morning',
    targetDays: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
    reminderTime: '09:00',
    description: 'Clear mental clutter by writing down thoughts and priorities.'
  },
  {
    id: 'journal',
    name: 'Keep a journal',
    category: 'personal',
    icon: 'PenTool',
    color: '#EC4899', // Blush Pink
    timeOfDay: 'evening',
    targetDays: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    reminderTime: '21:30',
    description: 'Reflect on wins, insights, and gratitude from the day.'
  },
  {
    id: 'call-family',
    name: 'Call family/friends',
    category: 'relationships',
    icon: 'PhoneCall',
    color: '#F43F5E', // Coral Rose
    timeOfDay: 'evening',
    targetDays: ['Mon', 'Wed', 'Fri', 'Sun'],
    reminderTime: '19:00',
    description: 'Reach out to stay close with the people who matter most.'
  },
  {
    id: 'outdoors',
    name: 'Enjoy outdoors',
    category: 'health',
    icon: 'Sun',
    color: '#EAB308', // Sun Gold
    timeOfDay: 'afternoon',
    targetDays: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    reminderTime: '16:00',
    description: 'Spend 15+ minutes in nature breathing fresh air.'
  }
];

export const HABIT_ICONS = [
  'Sparkles', 'Moon', 'Footprints', 'Wind', 'Brain', 'PenTool',
  'PhoneCall', 'Sun', 'Dumbbell', 'BookOpen', 'Target', 'Droplet',
  'HeartPulse', 'Users', 'Smile', 'Coffee', 'CheckSquare', 'Flame'
];

export const PRESET_HABITS = PRESET_ONBOARDING_HABITS;

/**
 * Intelligent helper to resolve the distinct color of any habit/activity.
 * Checks explicit color -> keyword detection -> category default -> fallback palette.
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
  if (name.includes('gym') || name.includes('workout') || name.includes('exercise') || name.includes('lift') || name.includes('fit')) {
    return '#EF4444'; // Crimson
  }
  if (name.includes('read') || name.includes('book') || name.includes('study') || name.includes('learn')) {
    return '#8B5CF6'; // Purple
  }
  if (name.includes('water') || name.includes('drink') || name.includes('hydrate')) {
    return '#06B6D4'; // Sky Cyan
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

