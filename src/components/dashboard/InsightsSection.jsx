import React from 'react';
import { generateLocalInsights } from '../../utils/insightsUtils';
import { Sparkles, TrendingUp, Award, Calendar, Flame, Trophy, Sunrise, Moon, Target } from 'lucide-react';

const ICON_MAP = {
  Sparkles,
  TrendingUp,
  Award,
  Calendar,
  Flame,
  Trophy,
  Sunrise,
  Moon,
  Target
};

export const InsightsSection = ({ habits = [], completions = {} }) => {
  const insights = generateLocalInsights(habits, completions);

  return (
    <div className="insights-card">
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
        <Sparkles size={18} color="var(--primary-blue)" />
        <h4 style={{ fontSize: '1rem', fontWeight: '700', color: 'var(--color-black)' }}>
          Consistency Insights
        </h4>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {insights.map((item) => {
          const IconComp = ICON_MAP[item.icon] || Sparkles;

          return (
            <div key={item.id} className="insight-item">
              <div className="insight-icon-box">
                <IconComp size={16} />
              </div>
              <div className="insight-text">
                {item.text}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
