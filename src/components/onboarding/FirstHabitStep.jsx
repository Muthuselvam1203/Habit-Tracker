import React, { useState } from 'react';
import { PRESET_ONBOARDING_HABITS } from '../../data/habitOptions';
import { Button } from '../common/Button';
import {
  Sparkles,
  Moon,
  Footprints,
  Wind,
  Brain,
  PenTool,
  PhoneCall,
  Sun,
  Plus,
  Check
} from 'lucide-react';

const ICON_MAP = {
  Sparkles,
  Moon,
  Footprints,
  Wind,
  Brain,
  PenTool,
  PhoneCall,
  Sun
};

export const FirstHabitStep = ({ selectedHabit, onSelectHabit }) => {
  const [customName, setCustomName] = useState('');

  const handleAddCustom = (e) => {
    e.preventDefault();
    if (!customName.trim()) return;

    const customHabit = {
      id: `custom-${Date.now()}`,
      name: customName.trim(),
      category: 'personal',
      icon: 'Sparkles',
      timeOfDay: 'morning',
      targetDays: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      reminderTime: '08:00',
      description: 'Custom personalized habit routine.'
    };

    onSelectHabit(customHabit);
    setCustomName('');
  };

  return (
    <div className="anim-fade-in">
      <div className="step-header">
        <h2 className="step-title">Choose the first habit that you'd like to build</h2>
        <p className="step-subtitle">You can always add or adjust more habits anytime later.</p>
      </div>

      {/* Preset Habits Grid */}
      <div className="habit-presets-grid">
        {PRESET_ONBOARDING_HABITS.map((habit) => {
          const IconComp = ICON_MAP[habit.icon] || Sparkles;
          const isSelected = selectedHabit?.name === habit.name;

          return (
            <div
              key={habit.id}
              className={`habit-preset-item ${isSelected ? 'selected' : ''}`}
              onClick={() => onSelectHabit(habit)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  onSelectHabit(habit);
                }
              }}
            >
              <div
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: 'var(--radius-sm)',
                  backgroundColor: isSelected ? 'var(--primary-blue)' : 'var(--color-light-grey)',
                  color: isSelected ? 'var(--color-white)' : 'var(--color-black)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}
              >
                <IconComp size={17} />
              </div>

              <div style={{ flex: 1, minWidth: 0 }}>
                <span className="habit-preset-name">{habit.name}</span>
              </div>

              {isSelected && <Check size={16} color="var(--primary-blue)" strokeWidth={3} />}
            </div>
          );
        })}
      </div>

      {/* Create Your Own Custom Habit Box */}
      <div className="custom-habit-box">
        <div style={{ fontSize: '0.85rem', fontWeight: '700', color: 'var(--color-black)', marginBottom: '0.5rem' }}>
          Create your own
        </div>
        <form onSubmit={handleAddCustom} style={{ display: 'flex', gap: '0.5rem' }}>
          <input
            type="text"
            className="form-input"
            placeholder="Type your own habit..."
            value={customName}
            onChange={(e) => setCustomName(e.target.value)}
          />
          <Button variant="secondary" type="submit" disabled={!customName.trim()} icon={Plus}>
            Add Habit
          </Button>
        </form>
      </div>
    </div>
  );
};
