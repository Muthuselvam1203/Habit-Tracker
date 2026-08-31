import React from 'react';
import { getHabitPerformanceList } from '../../utils/analyticsUtils';
import { Flame, Trophy } from 'lucide-react';

export const HabitPerformance = ({ habits = [], completions = {} }) => {
  const performanceList = getHabitPerformanceList(habits, completions);

  if (performanceList.length === 0) {
    return (
      <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--color-text-grey)', fontSize: '0.85rem' }}>
        No active habits tracked yet.
      </div>
    );
  }

  return (
    <div style={{ overflowX: 'auto' }}>
      <table className="habit-leaderboard-table">
        <thead>
          <tr>
            <th>Habit Name</th>
            <th>Category</th>
            <th>Current Streak</th>
            <th>Best Streak</th>
            <th>30-Day Rate</th>
            <th>Total Logs</th>
          </tr>
        </thead>
        <tbody>
          {performanceList.map((habit, index) => (
            <tr key={habit.id}>
              <td>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                  <span style={{ fontSize: '0.75rem', fontWeight: '800', color: index === 0 ? 'var(--primary-blue)' : 'var(--color-text-grey)', width: '16px' }}>
                    #{index + 1}
                  </span>
                  <span style={{ fontWeight: '700', color: 'var(--color-black)' }}>{habit.name}</span>
                </div>
              </td>
              <td>
                <span className="habit-category-tag">{habit.category}</span>
              </td>
              <td>
                <span className="habit-streak-pill">
                  <Flame size={12} /> {habit.currentStreak}d
                </span>
              </td>
              <td>
                <span style={{ fontSize: '0.85rem', fontWeight: '700', color: 'var(--color-black)' }}>
                  {habit.longestStreak}d
                </span>
              </td>
              <td>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <div style={{ width: '60px', height: '6px', backgroundColor: 'var(--color-light-grey)', borderRadius: 'var(--radius-full)', overflow: 'hidden' }}>
                    <div style={{ width: `${habit.rate30}%`, height: '100%', backgroundColor: habit.rate30 >= 80 ? '#059669' : '#2563EB', borderRadius: 'var(--radius-full)' }} />
                  </div>
                  <span style={{ fontSize: '0.825rem', fontWeight: '700' }}>{habit.rate30}%</span>
                </div>
              </td>
              <td>
                <span style={{ fontSize: '0.85rem', color: 'var(--color-text-grey)', fontWeight: '600' }}>
                  {habit.totalCompletions} check-ins
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
