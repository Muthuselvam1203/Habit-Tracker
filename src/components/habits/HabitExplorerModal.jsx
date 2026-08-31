import React, { useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  ThumbsUp,
  Footprints,
  Droplet,
  Smile,
  Sparkles,
  Dumbbell,
  BookOpen,
  Sun,
  Moon,
  PenTool,
  Brain,
  ShieldCheck,
  Plus,
  Check
} from 'lucide-react';

const LIFESTYLE_CATEGORIES = [
  {
    id: 'essential',
    title: 'Essential habits',
    subtitle: 'Refresh your life with simple acts',
    color: '#EF4444', // Red
    icon: ThumbsUp,
    habits: [
      { name: 'Get up early', category: 'productivity', icon: 'Sun', color: '#EF4444', timeOfDay: 'morning', habitType: 'boolean', reminderTime: '06:30' },
      { name: 'Make the bed', category: 'personal', icon: 'Sparkles', color: '#EF4444', timeOfDay: 'morning', habitType: 'boolean', reminderTime: '07:00' },
      { name: 'Brush teeth & floss', category: 'health', icon: 'ShieldCheck', color: '#EF4444', timeOfDay: 'morning', habitType: 'boolean', reminderTime: '07:15' },
      { name: 'Take daily vitamins', category: 'health', icon: 'ShieldCheck', color: '#EF4444', timeOfDay: 'morning', habitType: 'boolean', reminderTime: '08:00' }
    ]
  },
  {
    id: 'fitness',
    title: 'Keep active & Get fit',
    subtitle: 'Sweat never lies',
    color: '#2563EB', // Blue
    icon: Footprints,
    habits: [
      { name: 'Workout', category: 'fitness', icon: 'Dumbbell', color: '#2563EB', timeOfDay: 'morning', habitType: 'timer', timerTargetMinutes: 20, reminderTime: '07:30' },
      { name: 'Walking 6,000 steps', category: 'fitness', icon: 'Footprints', color: '#2563EB', timeOfDay: 'afternoon', habitType: 'measurable', measurableTarget: 6000, measurableUnit: 'steps', measurableStep: 500, reminderTime: '17:00' },
      { name: 'Core & 30 Push-ups', category: 'fitness', icon: 'Flame', color: '#2563EB', timeOfDay: 'afternoon', habitType: 'measurable', measurableTarget: 30, measurableUnit: 'reps', measurableStep: 10, reminderTime: '18:00' },
      { name: 'Full Body Stretch', category: 'fitness', icon: 'Wind', color: '#2563EB', timeOfDay: 'evening', habitType: 'timer', timerTargetMinutes: 15, reminderTime: '21:00' }
    ]
  },
  {
    id: 'health',
    title: 'Eat & drink healthily',
    subtitle: 'Stay healthy with daily intake',
    color: '#059669', // Green
    icon: Droplet,
    habits: [
      { name: 'Drink water', category: 'health', icon: 'Droplet', color: '#059669', timeOfDay: 'anytime', habitType: 'measurable', measurableTarget: 8, measurableUnit: 'Times', measurableStep: 1, reminderTime: '09:00' },
      { name: 'Eat fresh fruits & greens', category: 'health', icon: 'ShieldCheck', color: '#059669', timeOfDay: 'afternoon', habitType: 'boolean', reminderTime: '13:00' },
      { name: 'No sugar / junk food', category: 'health', icon: 'ShieldCheck', color: '#059669', timeOfDay: 'anytime', habitType: 'boolean', reminderTime: '12:00' },
      { name: 'No alcohol', category: 'health', icon: 'ShieldCheck', color: '#059669', timeOfDay: 'evening', habitType: 'boolean', reminderTime: '20:00' }
    ]
  },
  {
    id: 'stress',
    title: 'Ease stress',
    subtitle: 'Your efforts deserve a break',
    color: '#7C3AED', // Purple
    icon: Smile,
    habits: [
      { name: 'Mindful Meditation', category: 'personal', icon: 'Smile', color: '#7C3AED', timeOfDay: 'morning', habitType: 'timer', timerTargetMinutes: 15, reminderTime: '07:15' },
      { name: 'Box Breathing (5 min)', category: 'personal', icon: 'Wind', color: '#7C3AED', timeOfDay: 'afternoon', habitType: 'timer', timerTargetMinutes: 5, reminderTime: '14:00' },
      { name: 'Nature Walk in silence', category: 'personal', icon: 'Footprints', color: '#7C3AED', timeOfDay: 'evening', habitType: 'timer', timerTargetMinutes: 20, reminderTime: '18:30' },
      { name: 'Sleep over 8h', category: 'sleep', icon: 'Moon', color: '#7C3AED', timeOfDay: 'evening', habitType: 'timer', timerTargetMinutes: 480, reminderTime: '22:30' }
    ]
  },
  {
    id: 'tidy',
    title: 'Tidy life',
    subtitle: 'Live your life to the max',
    color: '#EA580C', // Orange
    icon: Sparkles,
    habits: [
      { name: 'Daily Brain Dump', category: 'productivity', icon: 'Brain', color: '#EA580C', timeOfDay: 'morning', habitType: 'boolean', reminderTime: '08:45' },
      { name: 'Read 20 pages', category: 'learning', icon: 'BookOpen', color: '#EA580C', timeOfDay: 'evening', habitType: 'measurable', measurableTarget: 20, measurableUnit: 'pages', measurableStep: 5, reminderTime: '21:30' },
      { name: 'Evening Reflection Journal', category: 'personal', icon: 'PenTool', color: '#EA580C', timeOfDay: 'evening', habitType: 'boolean', reminderTime: '22:00' },
      { name: 'Clean workspace desk', category: 'productivity', icon: 'Sparkles', color: '#EA580C', timeOfDay: 'evening', habitType: 'boolean', reminderTime: '19:00' }
    ]
  }
];

export const HabitExplorerModal = ({
  onSelectHabit,
  onOpenCustomizer,
  onClose
}) => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [addedIds, setAddedIds] = useState([]);

  const handleAddPreset = (habit) => {
    onSelectHabit(habit);
    setAddedIds(prev => [...prev, habit.name]);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-content anim-scale-in"
        onClick={e => e.stopPropagation()}
        style={{
          maxWidth: '460px',
          maxHeight: '90vh',
          overflowY: 'auto',
          backgroundColor: '#0F1115',
          borderRadius: '28px',
          padding: '1.5rem',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          color: '#FFFFFF'
        }}
      >
        {/* Top Header matching Screenshot 4 */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <button
              type="button"
              onClick={() => {
                if (selectedCategory) {
                  setSelectedCategory(null);
                } else {
                  onClose();
                }
              }}
              style={{
                background: 'transparent',
                border: 'none',
                color: '#FFFFFF',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '0.25rem'
              }}
            >
              <ArrowLeft size={24} />
            </button>
            <h3 style={{ fontSize: '1.45rem', fontWeight: '900', color: '#FFFFFF', margin: 0, letterSpacing: '-0.02em' }}>
              {selectedCategory ? selectedCategory.title : 'Create a new habit'}
            </h3>
          </div>

          {!selectedCategory && (
            <button
              type="button"
              onClick={() => {
                onOpenCustomizer();
                onClose();
              }}
              style={{
                padding: '0.4rem 0.75rem',
                borderRadius: '999px',
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                border: 'none',
                color: '#FFFFFF',
                fontSize: '0.8rem',
                fontWeight: '800',
                cursor: 'pointer'
              }}
            >
              + Custom
            </button>
          )}
        </div>

        {/* 5 EXPLORE NEW LIFESTYLE BANNERS matching Screenshot 4 */}
        {!selectedCategory ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            {LIFESTYLE_CATEGORIES.map(cat => {
              const IconComp = cat.icon;
              return (
                <div
                  key={cat.id}
                  className="tickit-lifestyle-banner"
                  style={{ backgroundColor: cat.color }}
                  onClick={() => setSelectedCategory(cat)}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1.15rem' }}>
                    <div className="banner-icon">
                      <IconComp size={34} strokeWidth={2.4} color="#FFFFFF" />
                    </div>
                    <div>
                      <div className="banner-title">{cat.title}</div>
                      <div className="banner-subtitle">{cat.subtitle}</div>
                    </div>
                  </div>

                  <div className="banner-arrow-badge">
                    <ArrowRight size={20} strokeWidth={3} color={cat.color} />
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          /* CATEGORY HABITS LIST FOR 1-CLICK ADD */
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <div style={{ fontSize: '0.825rem', color: '#9CA3AF', marginBottom: '0.25rem' }}>
              Tap any habit to add it directly into your daily operating system:
            </div>

            {selectedCategory.habits.map((habit, idx) => {
              const isAdded = addedIds.includes(habit.name);
              return (
                <div
                  key={idx}
                  style={{
                    backgroundColor: '#14171E',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    borderLeft: `4px solid ${selectedCategory.color}`,
                    borderRadius: '16px',
                    padding: '1rem 1.15rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '0.75rem'
                  }}
                >
                  <div>
                    <div style={{ fontSize: '1.05rem', fontWeight: '800', color: '#FFFFFF' }}>
                      {habit.name}
                    </div>
                    <div style={{ fontSize: '0.75rem', color: '#9CA3AF', marginTop: '0.2rem' }}>
                      {habit.timeOfDay} • {habit.habitType === 'timer' ? `${habit.timerTargetMinutes} mins` : habit.habitType === 'measurable' ? `${habit.measurableTarget} ${habit.measurableUnit}` : 'Daily Check'}
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleAddPreset(habit)}
                    disabled={isAdded}
                    style={{
                      padding: '0.5rem 1rem',
                      borderRadius: '999px',
                      backgroundColor: isAdded ? '#059669' : selectedCategory.color,
                      color: '#FFFFFF',
                      border: 'none',
                      fontWeight: '800',
                      fontSize: '0.8rem',
                      cursor: isAdded ? 'default' : 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.35rem'
                    }}
                  >
                    {isAdded ? <><Check size={14} strokeWidth={3} /> Added</> : <><Plus size={14} strokeWidth={3} /> Add</>}
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
