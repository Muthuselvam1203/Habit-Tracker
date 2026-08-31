import React from 'react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Cell } from 'recharts';
import { getWeeklyTrends } from '../../utils/analyticsUtils';

export const WeeklyChart = ({ habits = [], completions = {} }) => {
  const data = getWeeklyTrends(habits, completions);

  return (
    <div style={{ width: '100%', height: 240 }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <XAxis
            dataKey="dayName"
            tickLine={false}
            axisLine={{ stroke: '#E7EBF0' }}
            tick={{ fill: '#667085', fontSize: 12, fontWeight: 600 }}
          />
          <YAxis
            domain={[0, 100]}
            tickLine={false}
            axisLine={false}
            tick={{ fill: '#667085', fontSize: 11 }}
            unit="%"
          />
          <Tooltip
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                const item = payload[0].payload;
                return (
                  <div style={{ backgroundColor: 'var(--color-deep-navy)', color: '#FFFFFF', padding: '0.5rem 0.75rem', borderRadius: 'var(--radius-sm)', fontSize: '0.8rem', boxShadow: 'var(--shadow-md)' }}>
                    <div style={{ fontWeight: '700' }}>{item.dayName} ({item.dateKey})</div>
                    <div style={{ color: '#60A5FA', marginTop: '2px' }}>{item.rate}% Completion</div>
                    <div style={{ color: '#94A3B8', fontSize: '0.75rem' }}>{item.completed} of {item.due} habits completed</div>
                  </div>
                );
              }
              return null;
            }}
          />
          <Bar dataKey="rate" radius={[6, 6, 0, 0]}>
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={entry.rate === 100 ? '#059669' : '#2563EB'}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
