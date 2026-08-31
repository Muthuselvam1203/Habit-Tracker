import React from 'react';
import { LayoutDashboard, Sun, Plus, Calendar as CalendarIcon, User } from 'lucide-react';

export const MobileNavbar = ({
  currentPath = 'dashboard',
  onNavigate,
  onOpenQuickAdd
}) => {
  const navItems = [
    { id: 'dashboard', label: 'Home', icon: LayoutDashboard },
    { id: 'my-day', label: 'My Day', icon: Sun },
    { id: 'quick-add', label: 'Add', icon: Plus, isAction: true },
    { id: 'calendar', label: 'Calendar', icon: CalendarIcon },
    { id: 'profile', label: 'Profile', icon: User }
  ];

  return (
    <nav className="mobile-nav-bar" aria-label="Mobile navigation">
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = currentPath === item.id;

        if (item.isAction) {
          return (
            <button
              key={item.id}
              type="button"
              onClick={onOpenQuickAdd}
              style={{
                width: '42px',
                height: '42px',
                borderRadius: '999px',
                backgroundColor: 'var(--primary-blue)',
                color: '#FFFFFF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: 'none',
                boxShadow: 'var(--shadow-blue)',
                margin: '0 4px',
                cursor: 'pointer'
              }}
              aria-label="Quick Add"
            >
              <Plus size={22} strokeWidth={2.5} />
            </button>
          );
        }

        return (
          <button
            key={item.id}
            type="button"
            onClick={() => onNavigate(item.id)}
            className={`mobile-nav-item ${isActive ? 'active' : ''}`}
            aria-current={isActive ? 'page' : undefined}
          >
            <Icon size={19} />
            <span>{item.label}</span>
          </button>
        );
      })}
    </nav>
  );
};
