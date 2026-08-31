export const HABIT_CATEGORIES = [
  { id: 'all', label: 'All Habits', icon: 'Sparkles' },
  { id: 'health', label: 'Health', icon: 'HeartPulse' },
  { id: 'fitness', label: 'Fitness', icon: 'Dumbbell' },
  { id: 'learning', label: 'Learning', icon: 'BookOpen' },
  { id: 'productivity', label: 'Productivity', icon: 'Target' },
  { id: 'personal', label: 'Personal', icon: 'Smile' },
  { id: 'relationships', label: 'Relationships', icon: 'Users' },
  { id: 'sleep', label: 'Sleep', icon: 'Moon' },
  { id: 'other', label: 'Other', icon: 'CheckSquare' }
];

export const PRESET_ONBOARDING_HABITS = [
  {
    id: 'meditation',
    name: 'Practice meditation',
    category: 'personal',
    icon: 'Sparkles',
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
