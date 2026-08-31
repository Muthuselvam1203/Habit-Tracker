import React, { useState } from 'react';
import { getPastDays, formatDateKey, getDayOfWeek } from '../../utils/dateUtils';
import { Sparkles, Calendar, Flame, CheckCircle2 } from 'lucide-react';

export const HeatmapCalendar = ({
  habits = [],
  completions = {},
  onSelectDate
}) => {
  const [hoveredDay, setHoveredDay] = useState(null);
  const pastDays = getPastDays(120); // Last 4 months (17+ weeks)

  const activeHabits = habits.filter(h => !h.archived);

  // Group past days into weeks
  const weeks = [];
  let currentWeek = [];

  pastDays.forEach((day, index) => {
    const dayName = getDayOfWeek(day.dateKey);
    const scheduled = activeHabits.filter(h => {
      const targetDays = h.targetDays || ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
      return targetDays.includes(dayName);
    });

    const completed = scheduled.filter(h => !!completions[h.id]?.[day.dateKey]);
    const rate = scheduled.length > 0 ? Math.round((completed.length / scheduled.length) * 100) : 0;

    currentWeek.push({
      ...day,
      scheduledCount: scheduled.length,
      completedCount: completed.length,
      rate
    });

    if (currentWeek.length === 7 || index === pastDays.length - 1) {
      weeks.push(currentWeek);
      currentWeek = [];
    }
  });

  const getHeatmapColor = (cell) => {
    if (cell.completedCount === 0 && cell.scheduledCount === 0) return '#E2E8F0';
    if (cell.completedCount === 0 && cell.scheduledCount > 0) return '#FCA5A5'; // Soft Red
    if (cell.rate >= 80) return '#10B981'; // Green / Excellent
    if (cell.rate >= 50) return '#FBBF24'; // Yellow / Moderate
    return '#F87171'; // Red / Low
  };

  return (
    <div
      className="card"
      style={{
        backgroundColor: 'var(--color-white)',
        border: '1px solid var(--border-subtle)',
        padding: '1.5rem',
        marginTop: '1.5rem'
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '0.5rem' }}>
        <div>
          <h3 style={{ fontSize: '1.15rem', fontWeight: '800', margin: 0, color: 'var(--color-black)', display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
            <Flame size={18} color="#F97316" /> GitHub-Style Activity & Consistency Heatmap
          </h3>
          <p style={{ fontSize: '0.8rem', color: 'var(--color-text-grey)', margin: '0.2rem 0 0 0' }}>
            Visual distribution of your daily consistency score across the last 120 days.
          </p>
        </div>

        {/* Legend */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.75rem', fontWeight: '700', color: 'var(--color-text-grey)' }}>
          <span>Less</span>
          <span style={{ width: '12px', height: '12px', borderRadius: '3px', backgroundColor: '#E2E8F0', display: 'inline-block' }} />
          <span style={{ width: '12px', height: '12px', borderRadius: '3px', backgroundColor: '#F87171', display: 'inline-block' }} />
          <span style={{ width: '12px', height: '12px', borderRadius: '3px', backgroundColor: '#FBBF24', display: 'inline-block' }} />
          <span style={{ width: '12px', height: '12px', borderRadius: '3px', backgroundColor: '#10B981', display: 'inline-block' }} />
          <span>More</span>
        </div>
      </div>

      {/* Heatmap Grid Track */}
      <div style={{ overflowX: 'auto', paddingBottom: '0.5rem' }}>
        <div style={{ display: 'flex', gap: '4px', minWidth: '600px' }}>
          {weeks.map((week, wIndex) => (
            <div key={wIndex} style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              {week.map((cell, cIndex) => {
                const color = getHeatmapColor(cell);
                return (
                  <div
                    key={`${cell.dateKey}-${cIndex}`}
                    onClick={() => onSelectDate && onSelectDate(cell.dateKey)}
                    onMouseEnter={() => setHoveredDay(cell)}
                    onMouseLeave={() => setHoveredDay(null)}
                    style={{
                      width: '14px',
                      height: '14px',
                      borderRadius: '3px',
                      backgroundColor: color,
                      cursor: 'pointer',
                      transition: 'transform 0.15s, box-shadow 0.15s'
                    }}
                    title={`${cell.dateKey}: ${cell.completedCount}/${cell.scheduledCount} completed (${cell.rate}%)`}
                  />
                );
              })}
            </div>
          ))}
        </div>
      </div>

      {/* Hover Info Strip */}
      {hoveredDay && (
        <div
          className="anim-scale-in"
          style={{
            marginTop: '0.75rem',
            padding: '0.5rem 0.75rem',
            borderRadius: 'var(--radius-sm)',
            backgroundColor: 'var(--color-light-grey)',
            fontSize: '0.8rem',
            fontWeight: '700',
            color: 'var(--color-black)',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}
        >
          <Calendar size={14} color="var(--primary-blue)" />
          <span>{hoveredDay.dateKey} ({hoveredDay.dayName}):</span>
          <span style={{ color: getHeatmapColor(hoveredDay) }}>
            {hoveredDay.completedCount} of {hoveredDay.scheduledCount} habits completed ({hoveredDay.rate}%)
          </span>
        </div>
      )}
    </div>
  );
};
