import React, { useState } from 'react';
import { Bell, Calendar, User, Search, Sun, Moon } from 'lucide-react';
import { getGreeting, formatDisplayDate } from '../../utils/dateUtils';
import { NotificationCenter } from './NotificationCenter';

export const Topbar = ({
  userProfile = {},
  onNavigate,
  theme = 'light',
  onToggleTheme,
  onOpenCommandPalette,
  notifications = [],
  unreadCount = 0,
  onMarkAllRead,
  onClearAllNotifications,
  onDeleteNotification
}) => {
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const greeting = getGreeting();
  const userName = userProfile.name || 'Muthuselvam';
  const currentDateFormatted = formatDisplayDate();

  return (
    <header
      className="topbar-container"
      style={{
        height: 'var(--topbar-height)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 2rem',
        position: 'sticky',
        top: 0,
        zIndex: 40,
        backgroundColor: 'var(--bg-card)',
        borderBottom: '1px solid var(--border-subtle)',
        transition: 'background-color 0.2s, border-color 0.2s'
      }}
    >
      {/* Left: Greeting & Current Date */}
      <div>
        <h3 style={{ fontSize: '1.05rem', fontWeight: '800', color: 'var(--text-primary)' }}>
          {greeting}, <span style={{ color: 'var(--primary-blue)' }}>{userName}</span>
        </h3>
        <p style={{ fontSize: '0.775rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '0.35rem', marginTop: '1px' }}>
          <Calendar size={13} /> {currentDateFormatted}
        </p>
      </div>

      {/* Middle: Global Command Palette Search Trigger */}
      <button
        type="button"
        onClick={onOpenCommandPalette}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.65rem',
          padding: '0.45rem 0.95rem',
          borderRadius: 'var(--radius-full)',
          backgroundColor: 'var(--bg-surface)',
          border: '1px solid var(--border-subtle)',
          color: 'var(--text-secondary)',
          fontSize: '0.825rem',
          cursor: 'pointer',
          minWidth: '220px',
          justifyContent: 'space-between',
          transition: 'all 0.15s'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
          <Search size={14} color="var(--primary-blue)" />
          <span>Quick Search...</span>
        </div>
        <kbd
          style={{
            fontSize: '0.7rem',
            fontWeight: '700',
            padding: '0.1rem 0.35rem',
            borderRadius: '4px',
            backgroundColor: 'var(--bg-card)',
            border: '1px solid var(--border-subtle)'
          }}
        >
          Ctrl K
        </kbd>
      </button>

      {/* Right: Theme switch, Notification Center & Profile Chip */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', position: 'relative' }}>
        {/* Theme Toggle Button */}
        <button
          type="button"
          onClick={onToggleTheme}
          className="btn btn-secondary btn-icon"
          style={{
            borderRadius: 'var(--radius-full)',
            width: '38px',
            height: '38px',
            color: 'var(--text-primary)'
          }}
          title={theme === 'dark' ? 'Switch to Light Theme' : 'Switch to Dark Theme'}
          aria-label="Toggle theme"
        >
          {theme === 'dark' ? <Sun size={18} color="#FBBF24" /> : <Moon size={18} color="var(--text-secondary)" />}
        </button>

        {/* Notification Bell Toggle */}
        <div style={{ position: 'relative' }}>
          <button
            type="button"
            onClick={() => setIsNotifOpen(!isNotifOpen)}
            className="btn btn-secondary btn-icon"
            style={{
              position: 'relative',
              borderRadius: 'var(--radius-full)',
              width: '38px',
              height: '38px',
              color: 'var(--text-primary)'
            }}
            aria-label="Toggle notifications"
          >
            <Bell size={18} />
            {unreadCount > 0 && (
              <span
                style={{
                  position: 'absolute',
                  top: '-2px',
                  right: '-2px',
                  width: '18px',
                  height: '18px',
                  borderRadius: 'var(--radius-full)',
                  backgroundColor: 'var(--primary-blue)',
                  color: '#FFFFFF',
                  fontSize: '0.675rem',
                  fontWeight: '800',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: '2px solid var(--bg-card)'
                }}
              >
                {unreadCount > 9 ? '9+' : unreadCount}
              </span>
            )}
          </button>

          {/* Notification Drawer Dropdown */}
          <NotificationCenter
            isOpen={isNotifOpen}
            onClose={() => setIsNotifOpen(false)}
            notifications={notifications}
            onMarkAllRead={onMarkAllRead}
            onClearAll={onClearAllNotifications}
            onDelete={onDeleteNotification}
          />
        </div>

        {/* User Profile Avatar Pill */}
        <div
          onClick={() => onNavigate('profile')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.6rem',
            padding: '0.3rem 0.65rem 0.3rem 0.35rem',
            borderRadius: 'var(--radius-full)',
            backgroundColor: 'var(--bg-surface)',
            border: '1px solid var(--border-subtle)',
            cursor: 'pointer',
            transition: 'border-color var(--transition-fast)'
          }}
        >
          <div
            style={{
              width: '30px',
              height: '30px',
              borderRadius: 'var(--radius-full)',
              backgroundColor: 'var(--primary-blue)',
              color: '#FFFFFF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: '700',
              fontSize: '0.8rem'
            }}
          >
            {userName.charAt(0).toUpperCase()}
          </div>
          <span style={{ fontSize: '0.85rem', fontWeight: '700', color: 'var(--text-primary)' }}>
            {userName.split(' ')[0]}
          </span>
        </div>
      </div>
    </header>
  );
};
