import React from 'react';
import { getHabitPerformanceList } from '../../utils/analyticsUtils';
import { getHabitColor } from '../../data/habitOptions';
import {
  Flame,
  Trophy,
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
  CheckSquare
} from 'lucide-react';

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
          {performanceList.map((habit, index) => {
            const habitColor = getHabitColor(habit);
            const IconComp = ICON_MAP[habit.icon] || Sparkles;

            return (
              <tr key={habit.id}>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                    <span style={{ fontSize: '0.75rem', fontWeight: '800', color: index === 0 ? habitColor : 'var(--color-text-grey)', width: '16px' }}>
                      #{index + 1}
                    </span>
                    <div
                      style={{
                        width: '28px',
                        height: '28px',
                        borderRadius: 'var(--radius-xs)',
                        backgroundColor: `${habitColor}18`,
                        color: habitColor,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0
                      }}
                    >
                      <IconComp size={14} />
                    </div>
                    <span style={{ fontWeight: '700', color: 'var(--color-black)' }}>{habit.name}</span>
                  </div>
                </td>
                <td>
                  <span
                    className="habit-category-tag"
                    style={{
                      backgroundColor: `${habitColor}12`,
                      color: habitColor,
                      fontWeight: '700'
                    }}
                  >
                    {habit.category}
                  </span>
                </td>
                <td>
                  <span
                    className="habit-streak-pill"
                    style={{
                      backgroundColor: `${habitColor}14`,
                      color: habitColor,
                      border: `1px solid ${habitColor}28`
                    }}
                  >
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
                    <div style={{ width: '64px', height: '7px', backgroundColor: 'var(--color-light-grey)', borderRadius: 'var(--radius-full)', overflow: 'hidden' }}>
                      <div
                        style={{
                          width: `${habit.rate30}%`,
                          height: '100%',
                          backgroundColor: habitColor,
                          borderRadius: 'var(--radius-full)',
                          transition: 'width 0.4s ease'
                        }}
                      />
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
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

