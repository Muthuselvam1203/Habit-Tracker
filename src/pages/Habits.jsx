import React, { useState } from 'react';
import { HabitFilters } from '../components/habits/HabitFilters';
import { HabitList } from '../components/habits/HabitList';
import { Button } from '../components/common/Button';
import { Plus, CheckSquare, Flame, Percent } from 'lucide-react';
import { calculateHabitStreak } from '../utils/streakUtils';

export const Habits = ({
  habits = [],
  completions = {},
  onToggleCompletion,
  onOpenHabitDetails,
  onOpenNewHabit,
  onOpenEdit,
  onToggleArchive,
  onDelete
}) => {
  const [statusTab, setStatusTab] = useState('active'); // 'active', 'all', 'archived'
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('newest');

  // Filter habits
  let filtered = habits.filter(habit => {
    // Status filter
    if (statusTab === 'active' && habit.archived) return false;
    if (statusTab === 'archived' && !habit.archived) return false;

    // Category filter
    if (selectedCategory !== 'all' && habit.category !== selectedCategory) {
      return false;
    }

    // Search filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = habit.name.toLowerCase().includes(q);
      const matchDesc = habit.description?.toLowerCase().includes(q);
      const matchCategory = habit.category?.toLowerCase().includes(q);
      if (!matchName && !matchDesc && !matchCategory) return false;
    }

    return true;
  });

  // Sort habits
  filtered.sort((a, b) => {
    if (sortBy === 'newest') {
      return new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
    }
    if (sortBy === 'oldest') {
      return new Date(a.createdAt || 0) - new Date(b.createdAt || 0);
    }
    if (sortBy === 'streak') {
      const streakA = calculateHabitStreak(a, completions).currentStreak;
      const streakB = calculateHabitStreak(b, completions).currentStreak;
      return streakB - streakA;
    }
    if (sortBy === 'completion') {
      const logsA = Object.keys(completions[a.id] || {}).length;
      const logsB = Object.keys(completions[b.id] || {}).length;
      return logsB - logsA;
    }
    if (sortBy === 'alphabetical') {
      return a.name.localeCompare(b.name);
    }
    return 0;
  });

  // Meta statistics
  const activeCount = habits.filter(h => !h.archived).length;
  let totalCompletionsCount = 0;
  let maxActiveStreak = 0;

  habits.forEach(h => {
    if (!h.archived) {
      const logs = Object.keys(completions[h.id] || {}).length;
      totalCompletionsCount += logs;
      const { currentStreak } = calculateHabitStreak(h, completions);
      if (currentStreak > maxActiveStreak) maxActiveStreak = currentStreak;
    }
  });

  return (
    <div className="anim-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', paddingBottom: '2.5rem' }}>
      {/* Top Header & Overview Strip */}
      <div className="page-header-row">
        <div>
          <h2 style={{ fontSize: '1.75rem', fontWeight: '800', color: 'var(--color-black)' }}>
            Habits
          </h2>
          <p style={{ color: 'var(--color-text-grey)', fontSize: '0.9rem', marginTop: '0.2rem' }}>
            Manage, filter, and track all your personal daily routines.
          </p>
        </div>

        <Button variant="primary" onClick={onOpenNewHabit} icon={Plus}>
          Add Habit
        </Button>
      </div>

      {/* Meta Statistics Bar */}
      <div className="habits-stats-strip">
        <div style={{ backgroundColor: 'var(--color-white)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-md)', padding: '0.85rem 1.15rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{ width: '36px', height: '36px', borderRadius: 'var(--radius-sm)', backgroundColor: 'var(--color-light-blue)', color: 'var(--primary-blue)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <CheckSquare size={18} />
          </div>
          <div>
            <div style={{ fontSize: '0.725rem', color: 'var(--color-text-grey)', fontWeight: '600', textTransform: 'uppercase' }}>Active Habits</div>
            <div style={{ fontSize: '1.15rem', fontWeight: '800', color: 'var(--color-black)' }}>{activeCount} Habits</div>
          </div>
        </div>

        <div style={{ backgroundColor: 'var(--color-white)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-md)', padding: '0.85rem 1.15rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{ width: '36px', height: '36px', borderRadius: 'var(--radius-sm)', backgroundColor: 'rgba(37, 99, 235, 0.15)', color: 'var(--primary-blue)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <Flame size={18} />
          </div>
          <div>
            <div style={{ fontSize: '0.725rem', color: 'var(--color-text-grey)', fontWeight: '600', textTransform: 'uppercase' }}>Highest Streak</div>
            <div style={{ fontSize: '1.15rem', fontWeight: '800', color: 'var(--color-black)' }}>{maxActiveStreak} Days</div>
          </div>
        </div>

        <div style={{ backgroundColor: 'var(--color-white)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-md)', padding: '0.85rem 1.15rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{ width: '36px', height: '36px', borderRadius: 'var(--radius-sm)', backgroundColor: 'var(--status-success-bg)', color: 'var(--status-success-text)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <Percent size={18} />
          </div>
          <div>
            <div style={{ fontSize: '0.725rem', color: 'var(--color-text-grey)', fontWeight: '600', textTransform: 'uppercase' }}>Total Check-ins</div>
            <div style={{ fontSize: '1.15rem', fontWeight: '800', color: 'var(--color-black)' }}>{totalCompletionsCount} Logs</div>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <HabitFilters
        statusTab={statusTab}
        onSelectStatusTab={setStatusTab}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        sortBy={sortBy}
        onSortChange={setSortBy}
      />

      {/* Habit Cards List */}
      <HabitList
        habits={filtered}
        completions={completions}
        onToggleCompletion={onToggleCompletion}
        onOpenHabitDetails={onOpenHabitDetails}
        onOpenNewHabit={onOpenNewHabit}
        onOpenEdit={onOpenEdit}
        onToggleArchive={onToggleArchive}
        onDelete={onDelete}
      />
    </div>
  );
};
