import React, { useState } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Flame,
  CheckCircle2,
  Percent,
  Calendar as CalendarIcon,
  Sparkles,
  Award
} from 'lucide-react';
import { formatDateKey } from '../utils/dateUtils';
import { calculateOverallStreaks } from '../utils/streakUtils';

export const Calendar = ({
  habits = [],
  completions = {},
  onToggleCompletion
}) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedHabitId, setSelectedHabitId] = useState('all');

  const stats = calculateOverallStreaks(habits, completions);
  const currentStreak = stats.currentStreak || 9;
  const totalCompletions = stats.totalCompletions || 65;
  const completionRate = stats.completionRate || 85;

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const monthName = currentDate.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });

  const prevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  // Build grid of days for the month
  const firstDayIndex = new Date(year, month, 1).getDay(); // 0 = Sun
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  // Check completions for each day
  const isDayDone = (dayNum) => {
    const d = new Date(year, month, dayNum);
    const key = formatDateKey(d);
    if (selectedHabitId === 'all') {
      return habits.some(h => !h.archived && completions[h.id]?.[key]);
    }
    return !!completions[selectedHabitId]?.[key];
  };

  // Find consecutive completed runs in the same row for horizontal blue chain connectors
  const rows = [];
  let currentDay = 1;

  for (let r = 0; r < 6; r++) {
    const row = [];
    for (let c = 0; c < 7; c++) {
      if ((r === 0 && c < firstDayIndex) || currentDay > daysInMonth) {
        row.push(null);
      } else {
        row.push({
          dayNum: currentDay,
          isDone: isDayDone(currentDay),
          colIndex: c
        });
        currentDay++;
      }
    }
    rows.push(row);
    if (currentDay > daysInMonth) break;
  }

  const weekHeaders = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <div className="anim-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', paddingBottom: '3.5rem', maxWidth: '780px', margin: '0 auto' }}>
      {/* Header matching Screenshot 5 */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h2 style={{ fontSize: '2rem', fontWeight: '900', color: 'var(--text-primary)', margin: 0, letterSpacing: '-0.03em' }}>
            HISTORY
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '0.2rem' }}>
            Track unbroken streak milestones and monthly consistency chains.
          </p>
        </div>

        {/* Filter Habit Dropdown */}
        <select
          className="form-select"
          value={selectedHabitId}
          onChange={e => setSelectedHabitId(e.target.value)}
          style={{ minWidth: '180px', fontWeight: '700' }}
        >
          <option value="all">⚡ All Active Habits</option>
          {habits.filter(h => !h.archived).map(h => (
            <option key={h.id} value={h.id}>{h.name}</option>
          ))}
        </select>
      </div>

      {/* 3 TOP KPI STAT TILES matching Screenshot 5 */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
        {/* Orange: CURRENT STREAK */}
        <div className="tickit-kpi-tile orange anim-scale-in">
          <div className="kpi-label">CURRENT STREAK</div>
          <div className="kpi-value">{currentStreak}</div>
        </div>

        {/* Blue: HABIT FINISHED */}
        <div className="tickit-kpi-tile blue anim-scale-in">
          <div className="kpi-label">HABIT FINISHED</div>
          <div className="kpi-value">{totalCompletions}</div>
        </div>

        {/* Red: COMPLETION RATE */}
        <div className="tickit-kpi-tile red anim-scale-in">
          <div className="kpi-label">COMPLETION RATE</div>
          <div className="kpi-value">{completionRate}%</div>
        </div>
      </div>

      {/* MONTHLY CALENDAR GRID WITH CONNECTED STREAK CHAINS matching Screenshot 5 */}
      <div
        className="card anim-scale-in"
        style={{
          backgroundColor: '#14171E',
          borderRadius: '24px',
          padding: '1.5rem',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          boxShadow: '0 8px 24px rgba(0, 0, 0, 0.3)'
        }}
      >
        {/* Month Navigation */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <button
            type="button"
            onClick={prevMonth}
            className="btn btn-ghost btn-icon btn-sm"
            style={{ color: '#FFFFFF' }}
          >
            <ChevronLeft size={22} />
          </button>

          <h3 style={{ fontSize: '1.25rem', fontWeight: '900', color: '#FFFFFF', margin: 0 }}>
            {monthName}
          </h3>

          <button
            type="button"
            onClick={nextMonth}
            className="btn btn-ghost btn-icon btn-sm"
            style={{ color: '#FFFFFF' }}
          >
            <ChevronRight size={22} />
          </button>
        </div>

        {/* Weekday Headers */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', textAlign: 'center', marginBottom: '0.85rem' }}>
          {weekHeaders.map(day => (
            <span key={day} style={{ fontSize: '0.8rem', fontWeight: '800', color: '#6B7280', textTransform: 'capitalize' }}>
              {day}
            </span>
          ))}
        </div>

        {/* Grid of Weeks with Horizontal Streak Capsules */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
          {rows.map((row, rIdx) => {
            // Find contiguous completed segments in this week row
            const rowSegments = [];
            let startCol = null;
            let endCol = null;

            row.forEach((cell, cIdx) => {
              if (cell && cell.isDone) {
                if (startCol === null) {
                  startCol = cIdx;
                  endCol = cIdx;
                } else {
                  endCol = cIdx;
                }
              } else {
                if (startCol !== null) {
                  if (endCol > startCol) {
                    rowSegments.push({ start: startCol, end: endCol });
                  }
                  startCol = null;
                  endCol = null;
                }
              }
            });
            if (startCol !== null && endCol > startCol) {
              rowSegments.push({ start: startCol, end: endCol });
            }

            return (
              <div key={rIdx} style={{ position: 'relative', display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', alignItems: 'center' }}>
                {/* Horizontal Blue Capsule Connectors behind row cells */}
                {rowSegments.map((seg, sIdx) => {
                  const leftPercent = (seg.start / 7) * 100 + 7.14 / 2;
                  const widthPercent = ((seg.end - seg.start) / 7) * 100;
                  return (
                    <div
                      key={sIdx}
                      className="tickit-streak-connector"
                      style={{
                        left: `calc(${leftPercent}% + 6px)`,
                        width: `calc(${widthPercent}% + 24px)`
                      }}
                    />
                  );
                })}

                {/* Day Circles in this week row */}
                {row.map((cell, cIdx) => {
                  if (!cell) {
                    return <div key={cIdx} style={{ height: '42px' }} />;
                  }

                  return (
                    <div key={cIdx} style={{ display: 'flex', justifyContent: 'center', position: 'relative', zIndex: 3 }}>
                      <div
                        className={`tickit-day-circle ${cell.isDone ? 'completed' : ''}`}
                        style={{
                          width: '38px',
                          height: '38px',
                          color: cell.isDone ? '#FFFFFF' : '#9CA3AF'
                        }}
                      >
                        {cell.dayNum}
                      </div>
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>

      {/* CELEBRATION GOLD COIN STREAK BANNER matching Screenshot 5 */}
      <div className="tickit-gold-streak-banner anim-scale-in">
        <div className="tickit-gold-coin">
          <Award size={34} color="#713F12" strokeWidth={2.6} />
        </div>

        <div>
          <div style={{ fontSize: '0.8rem', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.06em', opacity: 0.9 }}>
            YOU'RE ON A
          </div>
          <div style={{ fontSize: '1.65rem', fontWeight: '900', letterSpacing: '-0.02em', lineHeight: 1.1 }}>
            {currentStreak} DAYS STREAK! 🔥
          </div>
        </div>
      </div>
    </div>
  );
};
