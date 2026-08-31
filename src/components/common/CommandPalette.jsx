import React, { useState, useEffect, useRef } from 'react';
import {
  Search,
  CheckSquare,
  Target,
  Sun,
  Moon,
  BookOpen,
  Zap,
  Calendar,
  BarChart2,
  Award,
  Settings,
  Sparkles,
  ArrowRight,
  X
} from 'lucide-react';

export const CommandPalette = ({
  isOpen,
  onClose,
  onNavigate,
  habits = [],
  goals = [],
  tasks = []
}) => {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  // Static Navigation Items
  const navItems = [
    { type: 'nav', title: 'Dashboard', path: 'dashboard', icon: Sparkles, category: 'Navigation' },
    { type: 'nav', title: 'My Day (Central Operating Hub)', path: 'my-day', icon: Sun, category: 'Navigation' },
    { type: 'nav', title: 'Habits & Streaks', path: 'habits', icon: CheckSquare, category: 'Navigation' },
    { type: 'nav', title: 'Morning & Night Routines', path: 'routines', icon: Moon, category: 'Navigation' },
    { type: 'nav', title: 'Goals Architecture', path: 'goals', icon: Target, category: 'Navigation' },
    { type: 'nav', title: 'Daily Tasks', path: 'tasks', icon: CheckSquare, category: 'Navigation' },
    { type: 'nav', title: 'Deep Work & Focus Timer', path: 'focus', icon: Zap, category: 'Navigation' },
    { type: 'nav', title: 'Wellness Hub (Water, Sleep, Mood)', path: 'wellness', icon: Sun, category: 'Navigation' },
    { type: 'nav', title: 'Daily Reflection Journal', path: 'journal', icon: BookOpen, category: 'Navigation' },
    { type: 'nav', title: 'Calendar & Heatmap', path: 'calendar', icon: Calendar, category: 'Navigation' },
    { type: 'nav', title: 'Behavioral Analytics', path: 'analytics', icon: BarChart2, category: 'Navigation' },
    { type: 'nav', title: 'XP, Levels & Badges', path: 'achievements', icon: Award, category: 'Navigation' },
    { type: 'nav', title: 'Settings & Backups', path: 'settings', icon: Settings, category: 'Navigation' }
  ];

  // Search Results aggregation
  const habitItems = habits.map(h => ({
    type: 'habit',
    title: h.name,
    subtitle: `${h.category} • ${h.timeOfDay}`,
    path: `habits/${h.id}`,
    icon: CheckSquare,
    category: 'Habits'
  }));

  const goalItems = goals.map(g => ({
    type: 'goal',
    title: g.title,
    subtitle: `${g.category} • ${g.habitIds?.length || 0} linked habits`,
    path: 'goals',
    icon: Target,
    category: 'Goals'
  }));

  const taskItems = tasks.map(t => ({
    type: 'task',
    title: t.title,
    subtitle: `Priority: ${t.priority} • ${t.category}`,
    path: 'tasks',
    icon: CheckSquare,
    category: 'Tasks'
  }));

  const allItems = [...navItems, ...habitItems, ...goalItems, ...taskItems];

  const filteredItems = query.trim()
    ? allItems.filter(item =>
        item.title.toLowerCase().includes(query.toLowerCase()) ||
        item.category.toLowerCase().includes(query.toLowerCase()) ||
        (item.subtitle && item.subtitle.toLowerCase().includes(query.toLowerCase()))
      )
    : navItems;

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev => (prev + 1) % filteredItems.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => (prev - 1 + filteredItems.length) % filteredItems.length);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filteredItems[selectedIndex]) {
        handleSelect(filteredItems[selectedIndex]);
      }
    } else if (e.key === 'Escape') {
      onClose();
    }
  };

  const handleSelect = (item) => {
    onNavigate(item.path);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div
      className="anim-fade-in"
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(7, 17, 31, 0.65)',
        backdropFilter: 'blur(4px)',
        zIndex: 1000,
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
        padding: '5rem 1rem 1rem 1rem'
      }}
      onClick={onClose}
    >
      <div
        className="anim-scale-in"
        style={{
          width: '100%',
          maxWidth: '580px',
          backgroundColor: 'var(--bg-card)',
          borderRadius: 'var(--radius-lg)',
          border: '1px solid var(--border-subtle)',
          boxShadow: 'var(--shadow-lg)',
          overflow: 'hidden'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Header */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            padding: '1rem 1.25rem',
            borderBottom: '1px solid var(--border-subtle)'
          }}
        >
          <Search size={18} color="var(--primary-blue)" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search habits, goals, tasks, routines, pages... (↑↓ to navigate)"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            style={{
              flex: 1,
              border: 'none',
              outline: 'none',
              backgroundColor: 'transparent',
              fontSize: '1rem',
              color: 'var(--text-primary)',
              fontWeight: '500'
            }}
          />
          <button
            type="button"
            onClick={onClose}
            style={{
              padding: '0.2rem',
              color: 'var(--text-secondary)',
              borderRadius: '4px',
              display: 'flex',
              alignItems: 'center'
            }}
          >
            <X size={16} />
          </button>
        </div>

        {/* Results List */}
        <div style={{ maxHeight: '340px', overflowY: 'auto', padding: '0.5rem' }}>
          {filteredItems.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '2rem 1rem', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
              No results found for "{query}"
            </div>
          ) : (
            filteredItems.map((item, idx) => {
              const IconComp = item.icon || Sparkles;
              const isSelected = idx === selectedIndex;

              return (
                <div
                  key={`${item.type}-${item.title}-${idx}`}
                  onClick={() => handleSelect(item)}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '0.65rem 0.85rem',
                    borderRadius: 'var(--radius-sm)',
                    backgroundColor: isSelected ? 'var(--primary-blue-light)' : 'transparent',
                    color: isSelected ? 'var(--primary-blue)' : 'var(--text-primary)',
                    cursor: 'pointer',
                    transition: 'all 0.1s'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                    <IconComp size={16} color={isSelected ? 'var(--primary-blue)' : 'var(--text-secondary)'} />
                    <div>
                      <div style={{ fontSize: '0.875rem', fontWeight: '700' }}>
                        {item.title}
                      </div>
                      {item.subtitle && (
                        <div style={{ fontSize: '0.725rem', color: 'var(--text-secondary)' }}>
                          {item.subtitle}
                        </div>
                      )}
                    </div>
                  </div>

                  <span
                    style={{
                      fontSize: '0.675rem',
                      fontWeight: '800',
                      textTransform: 'uppercase',
                      padding: '0.15rem 0.45rem',
                      borderRadius: '4px',
                      backgroundColor: 'var(--bg-surface)',
                      color: 'var(--text-secondary)'
                    }}
                  >
                    {item.category}
                  </span>
                </div>
              );
            })
          )}
        </div>

        {/* Footer shortcuts */}
        <div
          style={{
            padding: '0.5rem 1rem',
            borderTop: '1px solid var(--border-subtle)',
            backgroundColor: 'var(--bg-surface)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            fontSize: '0.725rem',
            color: 'var(--text-secondary)'
          }}
        >
          <div>
            Press <kbd style={{ padding: '0.1rem 0.35rem', background: 'var(--bg-card)', borderRadius: '3px', border: '1px solid var(--border-subtle)' }}>↵ Enter</kbd> to open
          </div>
          <div>
            <kbd style={{ padding: '0.1rem 0.35rem', background: 'var(--bg-card)', borderRadius: '3px', border: '1px solid var(--border-subtle)' }}>ESC</kbd> to close
          </div>
        </div>
      </div>
    </div>
  );
};
