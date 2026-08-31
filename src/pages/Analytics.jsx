import React, { useState } from 'react';
import { AnalyticsCard } from '../components/analytics/AnalyticsCard';
import { WeeklyChart } from '../components/analytics/WeeklyChart';
import { CompletionChart } from '../components/analytics/CompletionChart';
import { CategoryChart } from '../components/analytics/CategoryChart';
import { HabitPerformance } from '../components/analytics/HabitPerformance';
import { getAnalyticsSummary } from '../utils/analyticsUtils';
import { getBehavioralCorrelations } from '../utils/correlationUtils';
import {
  BarChart2,
  TrendingUp,
  PieChart,
  Trophy,
  Flame,
  CheckCircle2,
  Calendar,
  Target,
  Download,
  Upload,
  Sparkles,
  Zap,
  Heart,
  Moon,
  Droplets
} from 'lucide-react';
import { Button } from '../components/common/Button';

export const Analytics = ({
  habits = [],
  completions = {},
  stats = {},
  wellnessLogs = {}
}) => {
  const summary = getAnalyticsSummary(habits, completions);
  const { bestHabit, mostMissedHabit, bestDay, weeklyRate } = summary;
  const correlations = getBehavioralCorrelations(habits, completions, wellnessLogs);

  const [exportAlert, setExportAlert] = useState(false);

  const handleExportJSON = () => {
    const data = {
      habits,
      completions,
      wellnessLogs,
      exportedAt: new Date().toISOString(),
      app: 'Streakly 2.0 Life OS'
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `streakly_life_os_backup_${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
    setExportAlert(true);
    setTimeout(() => setExportAlert(false), 3000);
  };

  const handleExportCSV = () => {
    let csv = 'Habit Name,Category,Current Streak,Longest Streak,Total Check-ins\n';
    habits.forEach(h => {
      const logs = completions[h.id] || {};
      const total = Object.keys(logs).length;
      csv += `"${h.name}","${h.category}",${h.longestStreak || 0},${h.longestStreak || 0},${total}\n`;
    });
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `streakly_habits_${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="analytics-container anim-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', paddingBottom: '3rem' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h2 style={{ fontSize: '1.75rem', fontWeight: '900', color: 'var(--color-black)', margin: 0, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <BarChart2 size={24} color="var(--primary-blue)" /> Advanced Behavior & Habit Analytics
          </h2>
          <p style={{ color: 'var(--color-text-grey)', fontSize: '0.9rem', marginTop: '0.2rem' }}>
            Multi-dimensional insights, behavioral correlations, consistency trends, and exportable data logs.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          <button
            type="button"
            onClick={handleExportCSV}
            className="btn btn-secondary btn-sm"
            style={{ fontWeight: '700' }}
          >
            <Download size={14} /> Export CSV
          </button>
          <button
            type="button"
            onClick={handleExportJSON}
            className="btn btn-primary btn-sm"
            style={{ fontWeight: '700' }}
          >
            <Download size={14} /> Full JSON Backup
          </button>
        </div>
      </div>

      {exportAlert && (
        <div className="anim-scale-in" style={{ padding: '0.75rem 1rem', borderRadius: 'var(--radius-md)', backgroundColor: '#ECFDF5', border: '1px solid #A7F3D0', color: '#059669', fontSize: '0.85rem', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
          <CheckCircle2 size={16} /> Backup file generated and downloaded successfully!
        </div>
      )}

      {/* 4 Core Summary KPI Boxes */}
      <div className="analytics-metrics-strip">
        <div className="metric-box">
          <span className="metric-box-title">Weekly Average</span>
          <span className="metric-box-val">{weeklyRate}%</span>
          <span className="metric-box-sub">7-day performance</span>
        </div>

        <div className="metric-box">
          <span className="metric-box-title">Best Day of Week</span>
          <span className="metric-box-val">{bestDay}</span>
          <span className="metric-box-sub">Highest consistency</span>
        </div>

        <div className="metric-box">
          <span className="metric-box-title">Strongest Habit</span>
          <span className="metric-box-val" style={{ fontSize: '1.05rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            {bestHabit ? bestHabit.name : 'Meditation'}
          </span>
          <span className="metric-box-sub">{bestHabit ? `${bestHabit.rate30}% 30-day rate` : '95% rate'}</span>
        </div>

        <div className="metric-box">
          <span className="metric-box-title">Total Lifetime Logs</span>
          <span className="metric-box-val">{stats.totalCompletions || 124}</span>
          <span className="metric-box-sub">Across all routines</span>
        </div>
      </div>

      {/* Behavioral Correlation Engine Card */}
      <div className="card" style={{ backgroundColor: 'var(--color-white)', border: '1px solid var(--border-subtle)', padding: '1.5rem' }}>
        <h3 style={{ fontSize: '1.15rem', fontWeight: '800', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Sparkles size={20} color="var(--primary-blue)" /> Behavioral Correlation Engine
        </h3>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
          {correlations.insightsList.map(item => (
            <div
              key={item.id}
              style={{
                padding: '1rem',
                borderRadius: 'var(--radius-md)',
                backgroundColor: 'var(--color-light-grey)',
                borderLeft: `4px solid ${item.color}`
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
                <span style={{ fontSize: '0.85rem', fontWeight: '800', color: 'var(--color-black)' }}>
                  {item.title}
                </span>
                <span style={{ fontSize: '0.725rem', fontWeight: '800', color: item.color, backgroundColor: `${item.color}15`, padding: '0.15rem 0.45rem', borderRadius: '4px' }}>
                  {item.statHighlight}
                </span>
              </div>
              <p style={{ fontSize: '0.8rem', color: 'var(--color-text-grey)', margin: 0, lineHeight: '1.45' }}>
                {item.summary}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Charts Grid: 7-Day & 30-Day */}
      <div className="analytics-grid-2col">
        <AnalyticsCard
          title="7-Day Completion Rate"
          subtitle="Daily percentage of scheduled habits completed"
          icon={BarChart2}
        >
          <WeeklyChart habits={habits} completions={completions} />
        </AnalyticsCard>

        <AnalyticsCard
          title="30-Day Consistency Trend"
          subtitle="Rolling 30-day daily completion momentum"
          icon={TrendingUp}
        >
          <CompletionChart habits={habits} completions={completions} />
        </AnalyticsCard>
      </div>

      {/* Category Breakdown */}
      <AnalyticsCard
        title="Category Activity Distribution"
        subtitle="Total completions distributed by routine category"
        icon={PieChart}
      >
        <CategoryChart habits={habits} completions={completions} />
      </AnalyticsCard>

      {/* Habit Performance Leaderboard */}
      <AnalyticsCard
        title="Habit Leaderboard & Streaks"
        subtitle="Individual routine consistency rankings and 30-day metrics"
        icon={Trophy}
      >
        <HabitPerformance habits={habits} completions={completions} />
      </AnalyticsCard>
    </div>
  );
};
