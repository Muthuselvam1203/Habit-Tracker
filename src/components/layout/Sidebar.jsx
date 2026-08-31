import React from 'react';
import {
  LayoutDashboard,
  CheckSquare,
  Calendar as CalendarIcon,
  BarChart2,
  Award,
  Settings as SettingsIcon,
  User,
  Flame,
  Plus,
  Zap
} from 'lucide-react';

export const Sidebar = ({
  currentPath = 'dashboard',
  onNavigate,
  onOpenNewHabit,
  streakCount = 0
}) => {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'habits', label: 'Habits', icon: CheckSquare },
    { id: 'calendar', label: 'Calendar', icon: CalendarIcon },
    { id: 'analytics', label: 'Analytics', icon: BarChart2 },
    { id: 'achievements', label: 'Achievements', icon: Award },
    { id: 'profile', label: 'Profile', icon: User },
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
        padding: '1.5rem 1.15rem',
        zIndex: 50,
        backgroundColor: 'var(--color-deep-navy)',
        borderRight: '1px solid var(--color-secondary-navy)'
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
            marginBottom: '1.75rem'
          }}
        >
          {/* Logo Mark: Minimalist Streakly Emblem */}
          <div
            style={{
              width: '36px',
              height: '36px',
              borderRadius: 'var(--radius-md)',
              backgroundColor: 'var(--primary-blue)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--color-white)',
              boxShadow: '0 4px 12px rgba(37, 99, 235, 0.4)'
            }}
          >
            <Zap size={20} fill="#FFFFFF" />
          </div>

          <div>
            <span
              style={{
                fontFamily: 'var(--font-family)',
                fontSize: '1.25rem',
                fontWeight: '900',
                letterSpacing: '-0.03em',
                color: 'var(--color-white)'
              }}
            >
              STREAKLY
            </span>
          </div>
        </div>

        {/* Quick Add Habit Primary Action */}
        <button
          onClick={onOpenNewHabit}
          className="btn btn-primary"
          style={{
            width: '100%',
            marginBottom: '1.5rem',
            padding: '0.7rem',
            fontSize: '0.875rem',
            borderRadius: 'var(--radius-md)',
            fontWeight: '700'
          }}
        >
          <Plus size={18} />
          <span>Add Habit</span>
        </button>

        {/* Main Navigation Links */}
        <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentPath === item.id;

            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  padding: '0.65rem 0.85rem',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: isActive ? 'rgba(37, 99, 235, 0.18)' : 'transparent',
                  color: isActive ? '#60A5FA' : '#94A3B8',
                  fontWeight: isActive ? '700' : '500',
                  fontSize: '0.875rem',
                  transition: 'all var(--transition-fast)',
                  border: '1px solid',
                  borderColor: isActive ? 'rgba(37, 99, 235, 0.35)' : 'transparent',
                  textAlign: 'left',
                  width: '100%'
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
                <Icon size={18} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Bottom Best Streak Widget */}
      <div
        style={{
          padding: '0.85rem 1rem',
          borderRadius: 'var(--radius-md)',
          backgroundColor: 'rgba(255, 255, 255, 0.04)',
          border: '1px solid rgba(255, 255, 255, 0.08)'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
          <div
            style={{
              width: '32px',
              height: '32px',
              borderRadius: 'var(--radius-full)',
              backgroundColor: 'rgba(37, 99, 235, 0.2)',
              color: '#60A5FA',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0
            }}
          >
            <Flame size={17} />
          </div>
          <div>
            <div style={{ fontSize: '0.725rem', color: '#94A3B8', fontWeight: '600', textTransform: 'uppercase' }}>
              Current Best
            </div>
            <div style={{ fontSize: '0.95rem', fontWeight: '800', color: 'var(--color-white)', marginTop: '1px' }}>
              {streakCount} {streakCount === 1 ? 'Day' : 'Days'} Streak
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};
