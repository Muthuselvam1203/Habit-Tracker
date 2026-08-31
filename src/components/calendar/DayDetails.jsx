import React from 'react';
import {
  Check,
  X,
  Calendar,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  Moon,
  Footprints,
  Wind,
  Brain,
  PenTool,
  PhoneCall,
  Sun,
  Dumbbell,
  BookOpen,
  Target,
  Droplet,
  HeartPulse,
  Users,
  Smile,
  Coffee,
  CheckSquare,
  Flame
} from 'lucide-react';
import { getDayOfWeek, parseDateKey, formatDisplayDate } from '../../utils/dateUtils';
import { getHabitColor } from '../../data/habitOptions';

const ICON_MAP = {
  Sparkles,
  Moon,
  Footprints,
  Wind,
  Brain,
  PenTool,
  PhoneCall,
  Sun,
  Dumbbell,
  BookOpen,
  Target,
  Droplet,
  HeartPulse,
  Users,
  Smile,
  Coffee,
  CheckSquare,
  Flame
};

export const DayDetails = ({
  selectedDateKey,
  habits = [],
  completions = {},
  onToggleCompletion
}) => {
  if (!selectedDateKey) return null;

  const shortDayName = getDayOfWeek(selectedDateKey);
  const fullDateFormatted = formatDisplayDate(parseDateKey(selectedDateKey));

  const activeHabits = habits.filter(h => !h.archived);
  const scheduledOnThisDay = activeHabits.filter(h => {
    const targetDays = h.targetDays || ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    return targetDays.includes(shortDayName);
  });

  const completedHabits = scheduledOnThisDay.filter(h => !!completions[h.id]?.[selectedDateKey]);
  const missedHabits = scheduledOnThisDay.filter(h => !completions[h.id]?.[selectedDateKey]);
  const completionPercentage = scheduledOnThisDay.length > 0
    ? Math.round((completedHabits.length / scheduledOnThisDay.length) * 100)
    : 0;

  return (
    <div className="day-details-panel">
      {/* Day Details Header */}
      <div className="day-details-header">
        <div>
          <h4 style={{ fontSize: '1.15rem', fontWeight: '800', color: 'var(--color-black)' }}>
            {fullDateFormatted}
          </h4>
          <p style={{ fontSize: '0.85rem', color: 'var(--color-text-grey)', marginTop: '2px' }}>
            {scheduledOnThisDay.length} habits scheduled for this day
          </p>
        </div>

        <div style={{ textAlign: 'right' }}>
          <span className={completionPercentage === 100 ? 'badge-success' : 'badge-blue'}>
            {completedHabits.length} / {scheduledOnThisDay.length} completed ({completionPercentage}%)
          </span>
        </div>
      </div>

      {scheduledOnThisDay.length === 0 ? (
        <div style={{ padding: '2rem 1rem', textAlign: 'center', color: 'var(--color-text-grey)', fontSize: '0.9rem' }}>
          No habits scheduled on this day of the week.
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {scheduledOnThisDay.map((habit) => {
            const isDone = !!completions[habit.id]?.[selectedDateKey];
            const habitColor = getHabitColor(habit);
            const IconComp = ICON_MAP[habit.icon] || Sparkles;

            return (
              <div
                key={habit.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '0.85rem 1.15rem',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: isDone ? 'var(--color-white)' : 'var(--color-light-grey)',
                  border: `1px solid ${isDone ? `${habitColor}50` : 'var(--border-subtle)'}`,
                  borderLeft: `4px solid ${habitColor}`,
                  boxShadow: isDone ? `0 2px 8px ${habitColor}15` : 'none',
                  transition: 'all var(--transition-fast)'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                  <button
                    type="button"
                    onClick={() => onToggleCompletion(habit.id, selectedDateKey)}
                    className={`habit-checkbox ${isDone ? 'checked' : ''}`}
                    style={{
                      backgroundColor: isDone ? habitColor : 'var(--color-white)',
                      borderColor: isDone ? habitColor : undefined,
                      boxShadow: isDone ? `0 2px 8px ${habitColor}50` : undefined
                    }}
                    aria-label={`Toggle completion for ${habit.name}`}
                  >
                    {isDone && <Check size={16} strokeWidth={3} />}
                  </button>

                  <div
                    style={{
                      width: '34px',
                      height: '34px',
                      borderRadius: 'var(--radius-sm)',
                      backgroundColor: `${habitColor}15`,
                      color: habitColor,
                      border: `1px solid ${habitColor}30`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0
                    }}
                  >
                    <IconComp size={16} />
                  </div>

                  <div>
                    <div style={{ fontSize: '0.925rem', fontWeight: '700', color: 'var(--color-black)' }}>
                      {habit.name}
                    </div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--color-text-grey)', marginTop: '2px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <span
                        style={{
                          backgroundColor: `${habitColor}15`,
                          color: habitColor,
                          padding: '0.05rem 0.4rem',
                          borderRadius: 'var(--radius-xs)',
                          fontWeight: '700',
                          fontSize: '0.7rem'
                        }}
                      >
                        {habit.category}
                      </span>
                      <span>• {habit.timeOfDay || 'morning'}</span>
                    </div>
                  </div>
                </div>

                <div>
                  {isDone ? (
                    <span style={{ fontSize: '0.775rem', fontWeight: '700', color: habitColor, display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <CheckCircle2 size={15} color={habitColor} /> Completed
                    </span>
                  ) : (
                    <span style={{ fontSize: '0.775rem', fontWeight: '600', color: 'var(--color-text-grey)' }}>
                      Pending
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

