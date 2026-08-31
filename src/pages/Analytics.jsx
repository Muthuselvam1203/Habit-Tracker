import React from 'react';
import { AnalyticsCard } from '../components/analytics/AnalyticsCard';
import { WeeklyChart } from '../components/analytics/WeeklyChart';
import { CompletionChart } from '../components/analytics/CompletionChart';
import { CategoryChart } from '../components/analytics/CategoryChart';
import { HabitPerformance } from '../components/analytics/HabitPerformance';
import { getAnalyticsSummary } from '../utils/analyticsUtils';
import { BarChart2, TrendingUp, PieChart, Trophy, Flame, CheckCircle2, Calendar, Target } from 'lucide-react';

export const Analytics = ({
  habits = [],
  completions = {},
  stats = {}
}) => {
  const summary = getAnalyticsSummary(habits, completions);
  const { bestHabit, mostMissedHabit, bestDay, weeklyRate } = summary;

  return (
    <div className="analytics-container anim-fade-in">
      {/* Header */}
      <div>
        <h2 style={{ fontSize: '1.75rem', fontWeight: '800', color: 'var(--color-black)' }}>
          Analytics & Trends
        </h2>
        <p style={{ color: 'var(--color-text-grey)', fontSize: '0.9rem', marginTop: '0.2rem' }}>
          Real-time metrics, completion trends, and consistency rankings based on your check-in logs.
        </p>
      </div>

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
            {bestHabit ? bestHabit.name : 'N/A'}
          </span>
          <span className="metric-box-sub">{bestHabit ? `${bestHabit.rate30}% 30-day rate` : 'No logs yet'}</span>
        </div>

        <div className="metric-box">
          <span className="metric-box-title">Total Lifetime Logs</span>
          <span className="metric-box-val">{stats.totalCompletions || 0}</span>
          <span className="metric-box-sub">Across all routines</span>
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
