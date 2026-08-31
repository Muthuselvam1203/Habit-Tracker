import React from 'react';
import {
  Check,
  Sun,
  Dumbbell,
  Droplet,
  Flame,
  Moon,
  Footprints,
  Wind,
  Brain,
  PenTool,
  BookOpen,
  Target,
  ShieldCheck,
  Smile,
  Users,
  Coffee,
  HeartPulse,
  Ban,
  Play
} from 'lucide-react';
import { formatDateKey } from '../../utils/dateUtils';
import { getHabitColor } from '../../data/habitOptions';

const ICON_MAP = {
  Sun,
  Dumbbell,
  Droplet,
  Flame,
  Moon,
  Footprints,
  Wind,
  Brain,
  PenTool,
  BookOpen,
  Target,
  ShieldCheck,
  Smile,
  Users,
  Coffee,
  HeartPulse,
  Ban
};

export const TickitHabitCard = ({
  habit,
  completions = {},
  dateKey = formatDateKey(new Date()),
  onToggleCompletion,
  onIncrement,
  onOpenDetails,
  onStartTimer
}) => {
  const habitLog = completions[habit.id]?.[dateKey] || {};
  const isDone = !!habitLog.completedAt || (habit.habitType === 'measurable' && (habitLog.measurableValue || 0) >= (habit.measurableTarget || 1));

  const habitColor = getHabitColor(habit);

  // Icon mapping
  let IconComp = ICON_MAP[habit.icon] || Sun;
  const nameLower = habit.name.toLowerCase();
  if (nameLower.includes('alcohol') || nameLower.includes('sugar') || nameLower.includes('quit') || nameLower.includes('no ')) {
    IconComp = Ban;
  } else if (nameLower.includes('work') || nameLower.includes('run') || nameLower.includes('gym')) {
    IconComp = Footprints;
  } else if (nameLower.includes('water') || nameLower.includes('drink')) {
    IconComp = Droplet;
  } else if (nameLower.includes('early') || nameLower.includes('wake') || nameLower.includes('morning')) {
    IconComp = Sun;
  }

  // Progress Calculation
  let progressPercent = 0;
  let progressSubtitle = null;

  if (habit.habitType === 'timer') {
    const loggedMins = habitLog.timerLoggedMinutes || (isDone ? habit.timerTargetMinutes : 0) || 0;
    const targetMins = habit.timerTargetMinutes || 30;
    progressPercent = Math.min(100, Math.round((loggedMins / targetMins) * 100));
    progressSubtitle = `${loggedMins} / ${targetMins} min`;
  } else if (habit.habitType === 'measurable') {
    const currentVal = habitLog.measurableValue || (isDone ? habit.measurableTarget : 0) || 0;
    const targetVal = habit.measurableTarget || 1;
    progressPercent = Math.min(100, Math.round((currentVal / targetVal) * 100));
    progressSubtitle = `${currentVal} / ${targetVal} ${habit.measurableUnit || 'Times'}`;
  }

  // Background color - if completed, bright green or habit color
  const baseCardColor = isDone ? '#10B981' : habitColor;

  return (
    <div
      className="tickit-pill-card anim-scale-in"
      style={{
        backgroundColor: baseCardColor
      }}
      onClick={() => {
        if (onOpenDetails) onOpenDetails(habit);
      }}
    >
      {/* Dynamic Progress Fill Layer */}
      {!isDone && progressPercent > 0 && (
        <div
          className="progress-fill-layer"
          style={{
            width: `${progressPercent}%`
          }}
        />
      )}

      {/* Main Content */}
      <div className="card-content">
        <div className="card-icon-wrap">
          <IconComp size={30} strokeWidth={2.4} color="#FFFFFF" />
        </div>

        <div>
          <div className="card-title">
            {habit.name}
          </div>
          {progressSubtitle && !isDone && (
            <div className="card-subtitle">
              {progressSubtitle}
            </div>
          )}
        </div>
      </div>

      {/* Right Circular Checkmark Action Button */}
      <div
        onClick={(e) => {
          e.stopPropagation();
          if (habit.habitType === 'measurable' && onIncrement && !isDone) {
            onIncrement(habit.id, habit.measurableStep || 1, dateKey);
          } else {
            onToggleCompletion(habit.id, dateKey);
          }
        }}
        title={isDone ? 'Mark as incomplete' : 'Mark as complete'}
        style={{ zIndex: 3 }}
      >
        {isDone ? (
          <div className="check-circle-badge">
            <Check size={26} strokeWidth={3.5} color="#10B981" />
          </div>
        ) : (
          <div className="uncheck-circle-badge">
            {habit.habitType === 'timer' && onStartTimer ? (
              <Play size={18} fill="#FFFFFF" color="#FFFFFF" style={{ marginLeft: '2px' }} />
            ) : (
              <span style={{ fontSize: '0.85rem', fontWeight: '900', color: '#FFFFFF' }}>+</span>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
