import React from 'react';
import { Flame, Trophy, Calendar, CheckCircle2 } from 'lucide-react';
import { calculateHabitStreak } from '../../utils/streakUtils';

export const HabitProgress = ({ habit, completions = {} }) => {
  const { currentStreak, longestStreak } = calculateHabitStreak(habit, completions);
  const habitLogs = completions[habit.id] || {};
  const totalCompleted = Object.keys(habitLogs).length;

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '0.85rem' }}>
      <div style={{ background: 'var(--bg-surface-elevated)', padding: '0.85rem 1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--flame-mid)', fontSize: '0.75rem', fontWeight: '700' }}>
          <Flame size={14} /> CURRENT STREAK
        </div>
        <div style={{ fontSize: '1.35rem', fontWeight: '800', color: 'var(--text-primary)', marginTop: '4px' }}>
          {currentStreak} Days
        </div>
      </div>

      <div style={{ background: 'var(--bg-surface-elevated)', padding: '0.85rem 1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#EAB308', fontSize: '0.75rem', fontWeight: '700' }}>
          <Trophy size={14} /> BEST STREAK
        </div>
        <div style={{ fontSize: '1.35rem', fontWeight: '800', color: 'var(--text-primary)', marginTop: '4px' }}>
          {longestStreak} Days
        </div>
      </div>

      <div style={{ background: 'var(--bg-surface-elevated)', padding: '0.85rem 1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#10B981', fontSize: '0.75rem', fontWeight: '700' }}>
          <CheckCircle2 size={14} /> TOTAL COMPLETED
        </div>
        <div style={{ fontSize: '1.35rem', fontWeight: '800', color: 'var(--text-primary)', marginTop: '4px' }}>
          {totalCompleted} Times
        </div>
      </div>
    </div>
  );
};
