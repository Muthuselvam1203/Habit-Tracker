import React, { useState, useEffect } from 'react';
import { Sidebar } from './Sidebar';
import { Topbar } from './Topbar';
import { MobileNavbar } from './MobileNavbar';
import { CommandPalette } from '../common/CommandPalette';
import { GlobalQuickAdd } from '../common/GlobalQuickAdd';

export const AppLayout = ({
  children,
  currentPath,
  onNavigate,
  onOpenNewHabit,
  onOpenNewTask,
  onOpenNewGoal,
  onAddWater,
  onOpenFocus,
  userProfile,
  streakCount,
  theme,
  onToggleTheme,
  habits = [],
  goals = [],
  tasks = [],
  notifications = [],
  unreadCount = 0,
  onMarkAllRead,
  onClearAllNotifications,
  onDeleteNotification
}) => {
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);

  // Global Ctrl + K / Cmd + K listener
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setIsCommandPaletteOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: 'var(--bg-surface)' }}>
      {/* Desktop Persistent Deep Navy Sidebar */}
      <Sidebar
        currentPath={currentPath}
        onNavigate={onNavigate}
        onOpenNewHabit={onOpenNewHabit}
        streakCount={streakCount}
      />

      {/* Main Content Area */}
      <div
        className="app-main-layout"
        style={{
          flex: 1,
          marginLeft: 'var(--sidebar-width)',
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh',
          backgroundColor: 'var(--bg-surface)'
        }}
      >
        <Topbar
          userProfile={userProfile}
          onNavigate={onNavigate}
          theme={theme}
          onToggleTheme={onToggleTheme}
          onOpenCommandPalette={() => setIsCommandPaletteOpen(true)}
          notifications={notifications}
          unreadCount={unreadCount}
          onMarkAllRead={onMarkAllRead}
          onClearAllNotifications={onClearAllNotifications}
          onDeleteNotification={onDeleteNotification}
        />

        <main
          className="app-main-content anim-fade-in"
          style={{
            flex: 1,
            padding: '2rem',
            maxWidth: 'var(--content-max-width)',
            width: '100%',
            margin: '0 auto'
          }}
        >
          {children}
        </main>
      </div>

      {/* Floating Global Quick Add Button */}
      <GlobalQuickAdd
        onOpenNewHabit={onOpenNewHabit}
        onOpenNewTask={onOpenNewTask}
        onOpenNewGoal={onOpenNewGoal}
        onAddWater={onAddWater}
        onOpenFocus={onOpenFocus}
        onNavigate={onNavigate}
      />

      {/* Global Command Palette Search (Ctrl + K) */}
      <CommandPalette
        isOpen={isCommandPaletteOpen}
        onClose={() => setIsCommandPaletteOpen(false)}
        onNavigate={onNavigate}
        habits={habits}
        goals={goals}
        tasks={tasks}
      />

      {/* Mobile Bottom Navigation Bar */}
      <MobileNavbar
        currentPath={currentPath}
        onNavigate={onNavigate}
        onOpenQuickAdd={() => setIsCommandPaletteOpen(true)}
      />
    </div>
  );
};
