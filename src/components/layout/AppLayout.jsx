import React from 'react';
import { Sidebar } from './Sidebar';
import { Topbar } from './Topbar';
import { MobileNavbar } from './MobileNavbar';

export const AppLayout = ({
  children,
  currentPath,
  onNavigate,
  onOpenNewHabit,
  userProfile,
  streakCount,
  notifications = [],
  unreadCount = 0,
  onMarkAllRead,
  onClearAllNotifications,
  onDeleteNotification
}) => {
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

      {/* Mobile Floating / Anchored Bottom Navigation Bar */}
      <MobileNavbar currentPath={currentPath} onNavigate={onNavigate} />
    </div>
  );
};
