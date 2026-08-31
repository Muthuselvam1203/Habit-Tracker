import React from 'react';
import {
  LayoutDashboard,
  Sun,
  CheckSquare,
  Moon,
  Target,
  Zap,
  Activity,
  PenTool,
  Calendar as CalendarIcon,
  BarChart2,
  Award,
  Settings as SettingsIcon,
  Flame,
  Plus,
  Sparkles
} from 'lucide-react';

export const Sidebar = ({
  currentPath = 'dashboard',
  onNavigate,
  onOpenNewHabit,
  streakCount = 0
}) => {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'my-day', label: '⭐ My Day', icon: Sun },
    { id: 'habits', label: 'Habits', icon: CheckSquare },
    { id: 'routines', label: 'Routines', icon: Moon },
    { id: 'goals', label: 'Goals', icon: Target },
    { id: 'tasks', label: 'Tasks', icon: CheckSquare },
    { id: 'calendar', label: 'Calendar', icon: CalendarIcon },
    { id: 'focus', label: 'Focus', icon: Zap },
    { id: 'journal', label: 'Journal', icon: PenTool },
    { id: 'analytics', label: 'Analytics', icon: BarChart2 },
    { id: 'achievements', label: 'Achievements', icon: Award },
    { id: 'settings', label: 'Settings', icon: SettingsIcon }
  ];

  return (
    <aside
      className="sidebar-container"
      style={{
        width: 'var(--sidebar-width)',
        height: '100vh',
        position: 'fixed',
        top: 0,
        left: 0,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '1.25rem 1rem',
        zIndex: 50,
        backgroundColor: 'var(--color-deep-navy)',
        borderRight: '1px solid var(--color-secondary-navy)',
        overflowY: 'auto'
      }}
    >
      <div>
        {/* Brand Logo & Name */}
        <div
          onClick={() => onNavigate('dashboard')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            cursor: 'pointer',
            padding: '0.25rem 0.5rem',
            marginBottom: '1.25rem'
          }}
        >
          <div
            style={{
              width: '36px',
              height: '36px',
              borderRadius: 'var(--radius-md)',
              background: 'linear-gradient(135deg, #2563EB 0%, #7C3AED 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--color-white)',
              boxShadow: '0 4px 14px rgba(37, 99, 235, 0.45)'
            }}
          >
            <Zap size={20} fill="#FFFFFF" />
          </div>

          <div>
            <div
              style={{
                fontFamily: 'var(--font-family)',
                fontSize: '1.15rem',
                fontWeight: '900',
                letterSpacing: '-0.03em',
                color: 'var(--color-white)',
                lineHeight: 1.1
              }}
            >
              STREAKLY
            </div>
            <div style={{ fontSize: '0.675rem', color: '#60A5FA', fontWeight: '700', letterSpacing: '0.04em' }}>
              LIFE OPERATING SYSTEM
            </div>
          </div>
        </div>

        {/* Quick Add Habit Primary Action */}
        <button
          type="button"
          onClick={onOpenNewHabit}
          className="btn btn-primary"
          style={{
            width: '100%',
            marginBottom: '1.25rem',
            padding: '0.65rem',
            fontSize: '0.85rem',
            borderRadius: 'var(--radius-md)',
            fontWeight: '700',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.4rem'
          }}
        >
          <Plus size={16} />
          <span>Add Habit</span>
        </button>

        {/* Main Navigation Links */}
        <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentPath === item.id;

            return (
              <button
                type="button"
                key={item.id}
                onClick={() => onNavigate(item.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.7rem',
                  padding: '0.5rem 0.75rem',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: isActive ? 'rgba(37, 99, 235, 0.2)' : 'transparent',
                  color: isActive ? '#60A5FA' : '#94A3B8',
                  fontWeight: isActive ? '800' : '500',
                  fontSize: '0.835rem',
                  transition: 'all var(--transition-fast)',
                  border: '1px solid',
                  borderColor: isActive ? 'rgba(37, 99, 235, 0.4)' : 'transparent',
                  textAlign: 'left',
                  width: '100%',
                  cursor: 'pointer'
                }}
                onMouseEnter={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.05)';
                    e.currentTarget.style.color = '#FFFFFF';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.backgroundColor = 'transparent';
                    e.currentTarget.style.color = '#94A3B8';
                  }
                }}
              >
                <Icon size={16} color={isActive ? '#60A5FA' : '#94A3B8'} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Bottom Best Streak Widget */}
      <div
        style={{
          marginTop: '1rem',
          padding: '0.75rem 0.85rem',
          borderRadius: 'var(--radius-md)',
          backgroundColor: 'rgba(255, 255, 255, 0.04)',
          border: '1px solid rgba(255, 255, 255, 0.08)'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
          <div
            style={{
              width: '30px',
              height: '30px',
              borderRadius: 'var(--radius-full)',
              backgroundColor: 'rgba(249, 115, 22, 0.2)',
              color: '#F97316',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0
            }}
          >
            <Flame size={16} fill="#F97316" />
          </div>
          <div>
            <div style={{ fontSize: '0.65rem', color: '#94A3B8', fontWeight: '700', textTransform: 'uppercase' }}>
              Unbroken Streak
            </div>
            <div style={{ fontSize: '0.875rem', fontWeight: '800', color: 'var(--color-white)', marginTop: '1px' }}>
              {streakCount} {streakCount === 1 ? 'Day' : 'Days'} Active
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};
