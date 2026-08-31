import React from 'react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Cell } from 'recharts';
import { getCategoryBreakdown } from '../../utils/analyticsUtils';
import { getCategoryColor } from '../../data/habitOptions';

export const CategoryChart = ({ habits = [], completions = {} }) => {
  const data = getCategoryBreakdown(habits, completions);

  if (data.length === 0) {
    return (
      <div style={{ height: 240, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-text-grey)', fontSize: '0.85rem' }}>
        No active habits to categorize.
      </div>
    );
  }

  return (
    <div style={{ width: '100%', height: 240 }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} layout="vertical" margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
          <XAxis type="number" tickLine={false} axisLine={{ stroke: '#E7EBF0' }} tick={{ fill: '#667085', fontSize: 11 }} />
          <YAxis dataKey="name" type="category" tickLine={false} axisLine={false} tick={{ fill: '#080B10', fontSize: 12, fontWeight: 600 }} width={90} />
          <Tooltip
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                const item = payload[0].payload;
                const catColor = getCategoryColor(item.categoryKey);
                return (
                  <div style={{ backgroundColor: 'var(--color-deep-navy)', color: '#FFFFFF', padding: '0.5rem 0.75rem', borderRadius: 'var(--radius-sm)', fontSize: '0.8rem', borderLeft: `3px solid ${catColor}` }}>
                    <div style={{ fontWeight: '700', color: '#FFFFFF' }}>{item.name}</div>
                    <div style={{ color: catColor, marginTop: '2px', fontWeight: '600' }}>{item.totalHabits} Habits</div>
                    <div style={{ color: '#94A3B8', fontSize: '0.75rem' }}>{item.totalCompletions} Total Check-ins</div>
                  </div>
                );
              }
              return null;
            }}
          />
          <Bar dataKey="totalCompletions" radius={[0, 4, 4, 0]}>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={getCategoryColor(entry.categoryKey)} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

