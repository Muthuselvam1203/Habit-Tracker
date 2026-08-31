import React from 'react';
import { LayoutDashboard, CheckSquare, Sun, Activity, BarChart2 } from 'lucide-react';

export const MobileNavbar = ({
  currentPath = 'dashboard',
  onNavigate
}) => {
  const navItems = [
    { id: 'dashboard', label: 'Home', icon: LayoutDashboard },
    { id: 'habits', label: 'Habits', icon: CheckSquare },
    { id: 'routines', label: 'Routines', icon: Sun },
    { id: 'wellness', label: 'Wellness', icon: Activity },
    { id: 'analytics', label: 'Analytics', icon: BarChart2 }
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
            <Icon size={19} />
            <span>{item.label}</span>
          </button>
        );
      })}
    </nav>
  );
};
