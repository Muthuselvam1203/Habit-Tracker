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
  Wind,
  Brain,
  PhoneCall,
  Sun,
  HeartPulse,
  Users,
  Smile,
  Coffee,
  CheckSquare,
  Check
} from 'lucide-react';
import { getHabitColor } from '../../data/habitOptions';

const ICON_MAP = {
  Droplet,
  Footprints,
  BookOpen,
  Target,
  Sparkles,
  Dumbbell,
  PenTool,
  Moon,
  Wind,
  Brain,
  PhoneCall,
  Sun,
  HeartPulse,
  Users,
  Smile,
  Coffee,
  CheckSquare
};

export const HabitOption = ({
  habit,
  isSelected,
  onSelect
}) => {
  const IconComponent = ICON_MAP[habit.icon] || Sparkles;
  const habitColor = getHabitColor(habit);

  return (
    <div
      className={`habit-option-item ${isSelected ? 'selected' : ''}`}
      onClick={() => onSelect(habit)}
      style={{
        borderLeft: isSelected ? `4px solid ${habitColor}` : undefined
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
        <div
          style={{
            width: '36px',
            height: '36px',
            borderRadius: 'var(--radius-sm)',
            backgroundColor: `${habitColor}18`,
            color: habitColor,
            border: `1px solid ${habitColor}30`,
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
          width: '22px',
          height: '22px',
          borderRadius: 'var(--radius-full)',
          border: `2px solid ${isSelected ? habitColor : 'var(--border-medium)'}`,
          backgroundColor: isSelected ? habitColor : 'transparent',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#FFFFFF',
          flexShrink: 0
        }}
      >
        {isSelected && <Check size={13} strokeWidth={3} />}
      </div>
    </div>
  );
};

