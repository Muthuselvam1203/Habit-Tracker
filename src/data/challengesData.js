/**
 * 30-Day Challenges & Habit Journeys
 * Based on the scientifically proven 3-Stage Habit Formation Model:
 * - Stage 1 (Days 1–7): Friction & Initiation (Overcoming inertia & establishing baseline)
 * - Stage 2 (Days 8–21): Conditioning & Neural Grooving (Building consistent daily cadence)
 * - Stage 3 (Days 22–30): Mastery & Automaticity (Solidifying identity & effortless execution)
 */

export const CHALLENGES_LIST = [
  {
    id: 'morning-routine-30',
    title: '30-Day Morning Transformation',
    subtitle: 'Win your morning, dominate your day',
    category: 'productivity',
    durationDays: 30,
    difficulty: 'medium',
    color: '#F59E0B', // Amber
    gradient: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
    icon: 'Sun',
    coverEmoji: '🌅',
    description: 'Transform your mornings with early rising, zero phone scrolling, dynamic hydration, and 15 minutes of mindfulness.',
    benefits: [
      'Boost natural cortisol awakening response and sustained morning alertness',
      'Eliminate reactive social media consumption within the first hour',
      'Accomplish your highest priority goal before 9:00 AM'
    ],
    stages: [
      {
        stage: 1,
        days: 'Days 1–7',
        name: 'Initiation & Awakening',
        focus: 'Waking up at a consistent hour and drinking 500ml of water before touching any screen.',
        quote: 'The secret of getting ahead is getting started.'
      },
      {
        stage: 2,
        days: 'Days 8–21',
        name: 'Neural Conditioning',
        focus: 'Layering 10 minutes of light movement, deep breathing, and priority time-blocking.',
        quote: 'We are what we repeatedly do. Excellence, then, is not an act, but a habit.'
      },
      {
        stage: 3,
        days: 'Days 22–30',
        name: 'Effortless Automaticity',
        focus: 'Complete morning rhythm locked in. Deep flow state within 30 minutes of waking.',
        quote: 'Discipline is choosing between what you want now and what you want most.'
      }
    ],
    presetHabits: [
      {
        name: 'Wake up before 7:00 AM',
        category: 'productivity',
        icon: 'Sun',
        color: '#F59E0B',
        timeOfDay: 'morning',
        habitType: 'boolean',
        difficulty: 'medium',
        reminderTime: '06:45',
        description: 'Consistent sleep-wake cycle for circadian alignment.'
      },
      {
        name: 'Hydrate 500ml upon waking',
        category: 'health',
        icon: 'Droplet',
        color: '#06B6D4',
        timeOfDay: 'morning',
        habitType: 'measurable',
        measurableUnit: 'ml',
        measurableTarget: 500,
        measurableStep: 250,
        difficulty: 'easy',
        reminderTime: '07:00',
        description: 'Rehydrate internal organs immediately after 8 hours of sleep.'
      },
      {
        name: 'Zero phone first 30 mins',
        category: 'personal',
        icon: 'ShieldCheck',
        color: '#8B5CF6',
        timeOfDay: 'morning',
        habitType: 'boolean',
        difficulty: 'hard',
        reminderTime: '07:15',
        description: 'Protect dopamine baseline and prevent reactive state of mind.'
      }
    ]
  },
  {
    id: 'hydration-mastery-30',
    title: '21-Day Hydration Mastery',
    subtitle: 'Optimal cellular energy and cognitive clarity',
    category: 'health',
    durationDays: 21,
    difficulty: 'easy',
    color: '#06B6D4', // Cyan
    gradient: 'linear-gradient(135deg, #06B6D4 0%, #0284C7 100%)',
    icon: 'Droplet',
    coverEmoji: '💧',
    description: 'Scientifically calibrated daily hydration protocol to boost energy, enhance skin health, and eliminate brain fog.',
    benefits: [
      'Improve cognitive processing speed and sustained mental focus',
      'Optimize digestion and cellular nutrient transport',
      'Eliminate false hunger cravings driven by mild dehydration'
    ],
    stages: [
      {
        stage: 1,
        days: 'Days 1–7',
        name: 'Baseline Loading',
        focus: 'Reach a steady 2,000 ml daily with visual water-bottle markers.',
        quote: 'Water is the driving force of all nature.'
      },
      {
        stage: 2,
        days: 'Days 8–14',
        name: 'Timed Cadence',
        focus: 'Drink 500ml upon waking, 500ml before meals, and 500ml during afternoon focus.',
        quote: 'Small daily improvements over time lead to stunning results.'
      },
      {
        stage: 3,
        days: 'Days 15–21',
        name: 'Optimal Energy State',
        focus: 'Peak hydration reaches 2,500ml+. Clear skin, vibrant energy, and sharp cognition.',
        quote: 'Consistency is the true foundation of vitality.'
      }
    ],
    presetHabits: [
      {
        name: 'Daily Hydration Target',
        category: 'health',
        icon: 'Droplet',
        color: '#06B6D4',
        timeOfDay: 'anytime',
        habitType: 'measurable',
        measurableUnit: 'ml',
        measurableTarget: 2500,
        measurableStep: 250,
        difficulty: 'easy',
        reminderTime: '10:00',
        description: 'Hit optimal 2.5L daily hydration target.'
      }
    ]
  },
  {
    id: 'deep-work-30',
    title: '30-Day Deep Focus Mastery',
    subtitle: 'Master single-tasking and high-leverage output',
    category: 'learning',
    durationDays: 30,
    difficulty: 'hard',
    color: '#8B5CF6', // Purple
    gradient: 'linear-gradient(135deg, #8B5CF6 0%, #6D28D9 100%)',
    icon: 'Target',
    coverEmoji: '🧠',
    description: 'Train your brain to enter effortless flow states, resist modern digital distractions, and ship meaningful creative work.',
    benefits: [
      'Double your high-value cognitive output in fewer working hours',
      'Rebuild sustained attention span and deep reading capacity',
      'Experience the neurological calm of uninterrupted flow'
    ],
    stages: [
      {
        stage: 1,
        days: 'Days 1–7',
        name: 'Distraction Barrier',
        focus: 'Complete one 25-minute Pomodoro session daily in full Do-Not-Disturb mode.',
        quote: 'Focus is a muscle. The more you shield it, the stronger it grows.'
      },
      {
        stage: 2,
        days: 'Days 8–21',
        name: 'Deep Flow Sprints',
        focus: 'Expand to 60-minute uninterrupted deep work blocks with ambient soundscapes.',
        quote: 'Deep work is the superpower of the 21st century economy.'
      },
      {
        stage: 3,
        days: 'Days 22–30',
        name: 'Cognitive Mastery',
        focus: 'Execute 90-minute hyper-focused blocks daily. High-impact projects completed effortlessly.',
        quote: 'Who you are, what you think, feel, and do, is the sum of what you focus on.'
      }
    ],
    presetHabits: [
      {
        name: 'Deep Work Session',
        category: 'learning',
        icon: 'Target',
        color: '#8B5CF6',
        timeOfDay: 'morning',
        habitType: 'timer',
        timerTargetMinutes: 60,
        difficulty: 'hard',
        reminderTime: '09:30',
        description: 'Uninterrupted cognitive focus block with zero browser tabs or notifications.'
      }
    ]
  },
  {
    id: 'fitness-strength-30',
    title: '30-Day Fitness & Movement Kickstart',
    subtitle: 'Energize body, strengthen core, and elevate mood',
    category: 'fitness',
    durationDays: 30,
    difficulty: 'medium',
    color: '#EF4444', // Red
    gradient: 'linear-gradient(135deg, #EF4444 0%, #B91C1C 100%)',
    icon: 'Dumbbell',
    coverEmoji: '💪',
    description: 'Build a durable, unbreakable habit of daily physical movement, functional strength training, and cardiovascular health.',
    benefits: [
      'Elevate daily basal metabolic rate and physical stamina',
      'Trigger powerful endorphin and dopamine releases for all-day energy',
      'Improve joint mobility, posture, and back strength'
    ],
    stages: [
      {
        stage: 1,
        days: 'Days 1–7',
        name: 'Daily Movement Floor',
        focus: '15 minutes of light cardio, brisk walking, or basic bodyweight warmups.',
        quote: 'Action creates motivation, not the other way around.'
      },
      {
        stage: 2,
        days: 'Days 8–21',
        name: 'Strength & Conditioning',
        focus: '30 minutes of targeted resistance training or HIIT 4 days per week.',
        quote: 'The body achieves what the mind believes.'
      },
      {
        stage: 3,
        days: 'Days 22–30',
        name: 'Peak Physical Cadence',
        focus: 'Full workout consistency. High energy levels and noticeable muscular tone.',
        quote: 'Physical vitality is the prerequisite for mental greatness.'
      }
    ],
    presetHabits: [
      {
        name: 'Daily Workout / Cardio',
        category: 'fitness',
        icon: 'Dumbbell',
        color: '#EF4444',
        timeOfDay: 'morning',
        habitType: 'timer',
        timerTargetMinutes: 30,
        difficulty: 'medium',
        reminderTime: '07:30',
        description: '30 minutes of strength, cardio, or mobility work.'
      },
      {
        name: '8,000 Daily Steps',
        category: 'fitness',
        icon: 'Footprints',
        color: '#10B981',
        timeOfDay: 'afternoon',
        habitType: 'measurable',
        measurableUnit: 'steps',
        measurableTarget: 8000,
        measurableStep: 1000,
        difficulty: 'medium',
        reminderTime: '17:00',
        description: 'Non-exercise physical activity for active metabolic health.'
      }
    ]
  },
  {
    id: 'mindful-calm-30',
    title: '30-Day Mindful Living & Zen',
    subtitle: 'Cultivate inner stillness and emotional resilience',
    category: 'personal',
    durationDays: 30,
    difficulty: 'easy',
    color: '#10B981', // Emerald
    gradient: 'linear-gradient(135deg, #10B981 0%, #047857 100%)',
    icon: 'Sparkles',
    coverEmoji: '🧘',
    description: 'Cultivate daily mindfulness, gratitude journaling, and box breathing to reduce cortisol and increase emotional serenity.',
    benefits: [
      'Lower chronic stress and decrease autonomic nervous system reactivity',
      'Enhance emotional regulation and psychological resilience',
      'Improve sleep latency and restorative slow-wave rest'
    ],
    stages: [
      {
        stage: 1,
        days: 'Days 1–7',
        name: 'Breath Awareness',
        focus: '5 minutes of morning breathwork and 3 gratitude entries.',
        quote: 'Feelings come and go like clouds in a windy sky. Conscious breathing is my anchor.'
      },
      {
        stage: 2,
        days: 'Days 8–21',
        name: 'Mindful Stillness',
        focus: '10 minutes of guided meditation and daily mindful walk in nature.',
        quote: 'Peace comes from within. Do not seek it without.'
      },
      {
        stage: 3,
        days: 'Days 22–30',
        name: 'Unshakable Serenity',
        focus: 'Complete 15-minute daily practice. Calm response to stressful triggers.',
        quote: 'You cannot stop the waves, but you can learn to surf.'
      }
    ],
    presetHabits: [
      {
        name: 'Mindful Meditation',
        category: 'personal',
        icon: 'Sparkles',
        color: '#10B981',
        timeOfDay: 'morning',
        habitType: 'timer',
        timerTargetMinutes: 10,
        difficulty: 'easy',
        reminderTime: '07:15',
        description: '10 minutes of quiet mindfulness to anchor emotional clarity.'
      },
      {
        name: 'Evening Gratitude Journal',
        category: 'personal',
        icon: 'PenTool',
        color: '#EC4899',
        timeOfDay: 'evening',
        habitType: 'boolean',
        difficulty: 'easy',
        reminderTime: '21:30',
        description: 'Log 3 things you are genuinely grateful for before sleeping.'
      }
    ]
  },
  {
    id: 'digital-detox-30',
    title: '30-Day Digital & Screen Detox',
    subtitle: 'Reclaim your attention and protect your dopamine baseline',
    category: 'personal',
    durationDays: 30,
    difficulty: 'hard',
    color: '#6366F1', // Indigo
    gradient: 'linear-gradient(135deg, #6366F1 0%, #4338CA 100%)',
    icon: 'Moon',
    coverEmoji: '📵',
    description: 'Break impulsive screen checking, banish late-night blue light, and replace mindless infinite scrolling with real life hobbies.',
    benefits: [
      'Restore natural dopamine sensitivity and intrinsic motivation',
      'Significantly improve deep sleep quality and melatonin production',
      'Recover 2+ hours of reclaimed personal time every single day'
    ],
    stages: [
      {
        stage: 1,
        days: 'Days 1–7',
        name: 'No Screens in Bed',
        focus: 'Charge phone outside the bedroom and turn off screens 45 mins before sleep.',
        quote: 'Where your attention goes, your life follows.'
      },
      {
        stage: 2,
        days: 'Days 8–21',
        name: 'App Boundaries',
        focus: 'Cap social media to under 30 minutes daily with scheduled check times.',
        quote: 'Control your screen, or your screen will control you.'
      },
      {
        stage: 3,
        days: 'Days 22–30',
        name: 'Digital Freedom',
        focus: 'Mindful intentional device usage. Calm mind and deep presence in every moment.',
        quote: 'The ability to be alone with one’s thoughts is a superpower.'
      }
    ],
    presetHabits: [
      {
        name: 'No screens 45m before bed',
        category: 'sleep',
        icon: 'Moon',
        color: '#6366F1',
        timeOfDay: 'evening',
        habitType: 'boolean',
        difficulty: 'medium',
        reminderTime: '22:00',
        description: 'Protect melatonin synthesis and transition into restorative sleep.'
      },
      {
        name: 'Read physical book 20 mins',
        category: 'learning',
        icon: 'BookOpen',
        color: '#3B82F6',
        timeOfDay: 'evening',
        habitType: 'measurable',
        measurableUnit: 'pages',
        measurableTarget: 20,
        measurableStep: 5,
        difficulty: 'easy',
        reminderTime: '21:45',
        description: 'Replace night scrolling with high-impact non-fiction reading.'
      }
    ]
  }
];

export const getStageForDay = (dayNumber) => {
  if (dayNumber <= 7) return { stage: 1, name: 'Initiation (Days 1–7)' };
  if (dayNumber <= 21) return { stage: 2, name: 'Conditioning (Days 8–21)' };
  return { stage: 3, name: 'Automaticity (Days 22–30)' };
};
