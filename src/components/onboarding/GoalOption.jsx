import React from 'react';
import { HeartPulse, Smile, Sparkles, Target, Users, Moon, Check } from 'lucide-react';

const ICON_MAP = {
  HeartPulse,
  Smile,
  Sparkles,
  Target,
  Users,
  Moon
};

export const GoalOption = ({ goal, isSelected, onSelect }) => {
  const IconComp = ICON_MAP[goal.icon] || Target;

  return (
    <div
      className={`goal-option-card ${isSelected ? 'selected' : ''}`}
      onClick={onSelect}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onSelect();
        }
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div className="goal-card-icon-box">
          <IconComp size={20} />
        </div>
        {isSelected && (
          <div
            style={{
              width: '20px',
              height: '20px',
              borderRadius: 'var(--radius-full)',
              backgroundColor: 'var(--primary-blue)',
              color: 'var(--color-white)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <Check size={12} strokeWidth={3} />
          </div>
        )}
      </div>

      <div>
        <h4 className="goal-card-title">{goal.title}</h4>
        <p className="goal-card-desc">{goal.description}</p>
      </div>
    </div>
  );
};
