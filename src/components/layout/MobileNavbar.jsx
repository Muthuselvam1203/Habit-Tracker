import React from 'react';
import { LayoutDashboard, CheckSquare, Calendar as CalendarIcon, BarChart2, User } from 'lucide-react';

export const MobileNavbar = ({
  currentPath = 'dashboard',
  onNavigate
}) => {
  const navItems = [
    { id: 'dashboard', label: 'Home', icon: LayoutDashboard },
    { id: 'habits', label: 'Habits', icon: CheckSquare },
    { id: 'calendar', label: 'Calendar', icon: CalendarIcon },
    { id: 'analytics', label: 'Analytics', icon: BarChart2 },
    { id: 'profile', label: 'Profile', icon: User }
  ];

  return (
    <nav className="mobile-nav-bar" aria-label="Mobile navigation">
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = currentPath === item.id;

        return (
          <button
            key={item.id}
            onClick={() => onNavigate(item.id)}
            className={`mobile-nav-item ${isActive ? 'active' : ''}`}
            aria-current={isActive ? 'page' : undefined}
          >
            <Icon size={20} />
            <span>{item.label}</span>
          </button>
        );
      })}
    </nav>
  );
};
