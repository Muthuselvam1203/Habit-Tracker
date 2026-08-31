import React from 'react';
import {
  ArrowLeft,
  Bell,
  Calendar,
  Flame,
  Clock,
  TrendingUp,
  Smile,
  Edit3,
  CheckCircle2
} from 'lucide-react';
import { formatTime } from '../../utils/dateUtils';
import { calculateHabitStreak } from '../../utils/streakUtils';

export const HabitStatisticsModal = ({
  habit,
  completions = {},
  onClose,
  onOpenEdit
}) => {
  if (!habit) return null;

  const { currentStreak, isCompletedToday } = calculateHabitStreak(habit, completions);
  const habitLogs = completions[habit.id] || {};

  // Mock / Calculated weekly bars matching Screenshot 2
  const currentWeekBars = [
    { day: 'S', val: 28, type: 'blue' },
    { day: 'M', val: 32, type: 'blue' },
    { day: 'T', val: 20, type: 'blue' },
    { day: 'W', val: 42, type: 'blue' },
    { day: 'T', val: 26, type: 'blue' },
    { day: 'F', val: 33, type: 'orange' },
    { day: 'S', val: 0, type: 'dot' }
  ];

  const prevWeekBars = [
    { day: 'S', val: 18, type: 'blue' },
    { day: 'M', val: 24, type: 'blue' },
    { day: 'T', val: 35, type: 'orange' },
    { day: 'W', val: 15, type: 'blue' },
    { day: 'T', val: 28, type: 'blue' },
    { day: 'F', val: 22, type: 'blue' },
    { day: 'S', val: 0, type: 'dot' }
  ];

  const maxBarHeight = 50;

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
        {/* Top Header matching Screenshot 2 */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <button
              type="button"
              onClick={onClose}
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
            <div>
              <h3 style={{ fontSize: '1.65rem', fontWeight: '900', color: '#FFFFFF', margin: 0, letterSpacing: '-0.02em' }}>
                Statistics
              </h3>
              <div style={{ fontSize: '0.85rem', color: '#9CA3AF', fontWeight: '700' }}>
                {habit.name}
              </div>
            </div>
          </div>

          {onOpenEdit && (
            <button
              type="button"
              onClick={() => {
                onOpenEdit(habit);
                onClose();
              }}
              className="btn btn-ghost btn-sm"
              style={{ color: '#9CA3AF' }}
            >
              <Edit3 size={16} />
            </button>
          )}
        </div>

        {/* PILL BADGES ROW matching Screenshot 2 */}
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1.25rem' }}>
          <span className="tickit-badge-pill">
            {habit.timeOfDay || 'EVENING'}
          </span>
          <span className="tickit-badge-pill">
            {habit.frequencyType === 'daily' ? 'EVERYDAY' : '3X / WEEK'}
          </span>
          {habit.reminderTime && (
            <span className="tickit-badge-pill" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}>
              <Bell size={12} /> {formatTime(habit.reminderTime)}
            </span>
          )}
        </div>

        {/* WEEK 1 BAR CHART CARD matching Screenshot 2 */}
        <div className="tickit-stat-bar-card" style={{ marginBottom: '1rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <div style={{ fontSize: '1.15rem', fontWeight: '900', color: '#FFFFFF' }}>
                Current Week
              </div>
              <div style={{ fontSize: '0.75rem', color: '#9CA3AF', fontWeight: '700', marginTop: '2px' }}>
                2026
              </div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '1.2rem', fontWeight: '900', color: '#FFFFFF' }}>
                31.7 min
              </div>
              <div style={{ fontSize: '0.75rem', color: '#9CA3AF', fontWeight: '700' }}>
                Avg
              </div>
            </div>
          </div>

          {/* Vertical Bar Chart with Target Dotted Line */}
          <div className="tickit-bar-chart-container">
            {/* Target Dotted Line at 70% height */}
            <div className="tickit-target-line" style={{ top: '35%' }}>
              <span className="tickit-target-pill">33</span>
            </div>

            {currentWeekBars.map((b, i) => {
              const heightPx = b.val === 0 ? 0 : Math.min(90, Math.round((b.val / maxBarHeight) * 90));
              return (
                <div key={i} className="tickit-bar-col">
                  {b.type === 'dot' ? (
                    <div className="tickit-bar-dot" />
                  ) : (
                    <div
                      className={`tickit-bar-fill ${b.type}`}
                      style={{ height: `${heightPx}px` }}
                    />
                  )}
                  <span style={{ fontSize: '0.75rem', fontWeight: '800', color: '#9CA3AF' }}>
                    {b.day}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* WEEK 2 COMPARISON CARD matching Screenshot 2 */}
        <div className="tickit-stat-bar-card" style={{ marginBottom: '1.25rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <div style={{ fontSize: '1.15rem', fontWeight: '900', color: '#FFFFFF' }}>
                Previous Week
              </div>
              <div style={{ fontSize: '0.75rem', color: '#9CA3AF', fontWeight: '700', marginTop: '2px' }}>
                2026
              </div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '1.2rem', fontWeight: '900', color: '#FFFFFF' }}>
                25.1 min
              </div>
              <div style={{ fontSize: '0.75rem', color: '#9CA3AF', fontWeight: '700' }}>
                Avg
              </div>
            </div>
          </div>

          <div className="tickit-bar-chart-container">
            <div className="tickit-target-line" style={{ top: '45%' }}>
              <span className="tickit-target-pill">30</span>
            </div>

            {prevWeekBars.map((b, i) => {
              const heightPx = b.val === 0 ? 0 : Math.min(90, Math.round((b.val / maxBarHeight) * 90));
              return (
                <div key={i} className="tickit-bar-col">
                  {b.type === 'dot' ? (
                    <div className="tickit-bar-dot" />
                  ) : (
                    <div
                      className={`tickit-bar-fill ${b.type}`}
                      style={{ height: `${heightPx}px` }}
                    />
                  )}
                  <span style={{ fontSize: '0.75rem', fontWeight: '800', color: '#9CA3AF' }}>
                    {b.day}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* DAILY DIARY / REFLECTION CARD matching Screenshot 2 */}
        <div
          style={{
            backgroundColor: '#14171E',
            borderRadius: '20px',
            padding: '1.15rem 1.35rem',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            display: 'flex',
            alignItems: 'center',
            gap: '1rem'
          }}
        >
          <div style={{ textAlign: 'center', minWidth: '42px', borderRight: '1px solid rgba(255, 255, 255, 0.1)', paddingRight: '0.85rem' }}>
            <div style={{ fontSize: '1.5rem', fontWeight: '900', color: '#FFFFFF', lineHeight: 1 }}>
              7
            </div>
            <div style={{ fontSize: '0.65rem', fontWeight: '800', color: '#9CA3AF', textTransform: 'uppercase', marginTop: '2px' }}>
              AUG
            </div>
          </div>

          <div style={{ fontSize: '1.75rem' }}>
            😄
          </div>

          <div style={{ flex: 1, fontSize: '0.875rem', fontWeight: '600', color: '#D1D5DB', lineHeight: '1.45' }}>
            "I can feel my body getting stronger and more energized than ever before!"
          </div>
        </div>
      </div>
    </div>
  );
};
