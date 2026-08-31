import React from 'react';
import { HABIT_CATEGORIES } from '../../data/habitOptions';
import { Search, ArrowUpDown, X } from 'lucide-react';

export const HabitFilters = ({
  statusTab = 'active',
  onSelectStatusTab,
  selectedCategory = 'all',
  onSelectCategory,
  searchQuery = '',
  onSearchChange,
  sortBy = 'newest',
  onSortChange
}) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      {/* Top Controls: Status Tabs, Search and Sort */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.85rem' }}>
        {/* Status Tabs (All, Active, Archived) */}
        <div style={{ display: 'flex', backgroundColor: 'var(--color-light-grey)', padding: '4px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
          {[
            { id: 'active', label: 'Active' },
            { id: 'all', label: 'All' },
            { id: 'archived', label: 'Archived' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => onSelectStatusTab(tab.id)}
              style={{
                padding: '0.45rem 0.9rem',
                borderRadius: 'var(--radius-sm)',
                fontSize: '0.825rem',
                fontWeight: statusTab === tab.id ? '700' : '500',
                backgroundColor: statusTab === tab.id ? 'var(--color-white)' : 'transparent',
                color: statusTab === tab.id ? 'var(--color-black)' : 'var(--color-text-grey)',
                boxShadow: statusTab === tab.id ? 'var(--shadow-xs)' : 'none',
                transition: 'all var(--transition-fast)'
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Search & Sort Group */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flex: '1', maxWidth: '480px', minWidth: '240px' }}>
          {/* Search Box */}
          <div className="input-with-icon" style={{ flex: 1 }}>
            <Search className="input-icon-left" size={16} />
            <input
              type="text"
              className="form-input"
              placeholder="Search habits or categories..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
            />
            {searchQuery && (
              <button
                onClick={() => onSearchChange('')}
                style={{
                  position: 'absolute',
                  right: '0.75rem',
                  color: 'var(--color-text-grey)',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer'
                }}
                aria-label="Clear search"
              >
                <X size={15} />
              </button>
            )}
          </div>

          {/* Sort Dropdown */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
            <select
              className="form-select"
              value={sortBy}
              onChange={(e) => onSortChange(e.target.value)}
              style={{ padding: '0.65rem 0.75rem', fontSize: '0.825rem', width: 'auto' }}
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="streak">Highest Streak</option>
              <option value="completion">Highest Completion</option>
              <option value="alphabetical">Alphabetical (A-Z)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Category Pills Bar */}
      <div style={{ display: 'flex', gap: '0.4rem', overflowX: 'auto', paddingBottom: '4px' }}>
        {HABIT_CATEGORIES.map((cat) => {
          const isSelected = selectedCategory === cat.id;
          const catColor = cat.color || 'var(--primary-blue)';

          return (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              style={{
                padding: '0.35rem 0.75rem',
                borderRadius: 'var(--radius-full)',
                fontSize: '0.8rem',
                fontWeight: isSelected ? '700' : '500',
                backgroundColor: isSelected ? 'var(--color-deep-navy)' : 'var(--color-white)',
                color: isSelected ? 'var(--color-white)' : 'var(--color-text-grey)',
                border: `1px solid ${isSelected ? 'var(--color-deep-navy)' : 'var(--border-subtle)'}`,
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.35rem',
                whiteSpace: 'nowrap',
                transition: 'all var(--transition-fast)',
                cursor: 'pointer'
              }}
            >
              {cat.id !== 'all' && (
                <span
                  style={{
                    width: '8px',
                    height: '8px',
                    borderRadius: 'var(--radius-full)',
                    backgroundColor: catColor
                  }}
                />
              )}
              {cat.label}
            </button>
          );
        })}
      </div>
    </div>
  );
};

