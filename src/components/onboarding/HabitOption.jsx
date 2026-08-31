import React from 'react';
import {
  Droplet,
  Footprints,
  BookOpen,
  Target,
  Sparkles,
  Dumbbell,
  PenTool,
  Moon,
  Check
} from 'lucide-react';

const ICON_MAP = {
  Droplet,
  Footprints,
  BookOpen,
  Target,
  Sparkles,
  Dumbbell,
  PenTool,
  Moon
};

export const HabitOption = ({
  habit,
  isSelected,
  onSelect
}) => {
  const IconComponent = ICON_MAP[habit.icon] || Sparkles;

  return (
    <div
      className={`habit-option-item ${isSelected ? 'selected' : ''}`}
      onClick={() => onSelect(habit)}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
        <div
          style={{
            width: '36px',
            height: '36px',
            borderRadius: 'var(--radius-sm)',
            backgroundColor: `${habit.color}20`,
            color: habit.color,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <IconComponent size={18} />
        </div>
        <div>
          <h5 style={{ fontSize: '0.95rem', fontWeight: '600', color: isSelected ? 'var(--text-primary)' : 'var(--text-secondary)' }}>
            {habit.name}
          </h5>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
            {habit.description}
          </span>
        </div>
      </div>

      <div
        style={{
          width: '20px',
          height: '20px',
          borderRadius: 'var(--radius-full)',
          border: `2px solid ${isSelected ? 'var(--primary-accent)' : 'var(--border-medium)'}`,
          backgroundColor: isSelected ? 'var(--primary-accent)' : 'transparent',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#FFFFFF',
          flexShrink: 0
        }}
      >
        {isSelected && <Check size={12} strokeWidth={3} />}
      </div>
    </div>
  );
};
