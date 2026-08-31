import React from 'react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip } from 'recharts';
import { get30DayTrends } from '../../utils/analyticsUtils';

export const CompletionChart = ({ habits = [], completions = {} }) => {
  const data = get30DayTrends(habits, completions);

  return (
    <div style={{ width: '100%', height: 240 }}>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#2563EB" stopOpacity={0.25} />
              <stop offset="95%" stopColor="#2563EB" stopOpacity={0.0} />
            </linearGradient>
          </defs>
          <XAxis
            dataKey="date"
            tickLine={false}
            axisLine={{ stroke: '#E7EBF0' }}
            tick={{ fill: '#667085', fontSize: 10 }}
            interval={4}
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
                    <div style={{ fontWeight: '700' }}>{item.date}</div>
                    <div style={{ color: '#60A5FA', marginTop: '2px' }}>{item.rate}% Completion</div>
                    <div style={{ color: '#94A3B8', fontSize: '0.75rem' }}>{item.completed} of {item.due} completed</div>
                  </div>
                );
              }
              return null;
            }}
          />
          <Area
            type="monotone"
            dataKey="rate"
            stroke="#2563EB"
            strokeWidth={2.5}
            fillOpacity={1}
            fill="url(#areaGradient)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};
