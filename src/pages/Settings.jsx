import React, { useState } from 'react';
import {
  Settings as SettingsIcon,
  Download,
  Upload,
  RefreshCw,
  Trash2,
  Check,
  ShieldCheck,
  Bell,
  Clock,
  Database,
  Sun,
  Moon,
  FileText
} from 'lucide-react';
import { Button } from '../components/common/Button';
import { ConfirmDialog } from '../components/common/ConfirmDialog';
import { storage } from '../utils/storage';

export const Settings = ({
  theme = 'light',
  onToggleTheme,
  onSeedDemoData,
  onClearData,
  onResetOnboarding
}) => {
  const [confirmClearOpen, setConfirmClearOpen] = useState(false);
  const [confirmSeedOpen, setConfirmSeedOpen] = useState(false);
  const [confirmResetOnboardingOpen, setConfirmResetOnboardingOpen] = useState(false);
  const [importStatus, setImportStatus] = useState(null);

  // Export JSON backup
  const handleExportJSON = () => {
    const jsonStr = storage.exportData();
    if (!jsonStr) return;

    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `streakly_backup_${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Export CSV summary
  const handleExportCSV = () => {
    const rawBackup = JSON.parse(storage.exportData() || '{}');
    const habits = rawBackup.habits || [];
    const completions = rawBackup.completions || {};

    let csvContent = 'data:text/csv;charset=utf-8,Habit ID,Name,Category,Type,Total Checkins\n';

    habits.forEach(h => {
      const checkinCount = Object.keys(completions[h.id] || {}).length;
      csvContent += `"${h.id}","${h.name}","${h.category}","${h.habitType || 'boolean'}",${checkinCount}\n`;
    });

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `streakly_habits_export_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Import JSON backup data
  const handleImport = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result;
      if (typeof content === 'string') {
        const success = storage.importData(content);
        if (success) {
          setImportStatus('Data imported successfully! Refreshing...');
          setTimeout(() => window.location.reload(), 1000);
        } else {
          setImportStatus('Failed to import invalid backup JSON file.');
        }
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="anim-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem', maxWidth: '800px', paddingBottom: '3.5rem' }}>
      {/* Header */}
      <div>
        <h2 style={{ fontSize: '1.75rem', fontWeight: '900', color: 'var(--text-primary)' }}>
          Settings & Preferences
        </h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '0.2rem' }}>
          Manage your theme, private local data backups, export sheets, and system resets.
        </p>
      </div>

      {/* Theme & Appearance (Section 60) */}
      <div className="card">
        <h4 className="card-title" style={{ marginBottom: '0.5rem', color: 'var(--text-primary)' }}>
          <Sun size={18} color="var(--primary-blue)" /> Theme & Visual Style
        </h4>
        <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '1.25rem' }}>
          Streakly uses a crisp, White-first SaaS design by default, with a dedicated dark theme for evening focus.
        </p>

        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
          <button
            type="button"
            onClick={() => { if (theme === 'dark') onToggleTheme(); }}
            style={{
              padding: '0.75rem 1.25rem',
              borderRadius: 'var(--radius-md)',
              border: theme === 'light' ? '2px solid var(--primary-blue)' : '1px solid var(--border-subtle)',
              backgroundColor: theme === 'light' ? 'var(--primary-blue-light)' : 'var(--bg-surface)',
              color: theme === 'light' ? 'var(--primary-blue)' : 'var(--text-primary)',
              fontWeight: '700',
              fontSize: '0.875rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              cursor: 'pointer'
            }}
          >
            <Sun size={18} /> Premium White (Default)
          </button>

          <button
            type="button"
            onClick={() => { if (theme === 'light') onToggleTheme(); }}
            style={{
              padding: '0.75rem 1.25rem',
              borderRadius: 'var(--radius-md)',
              border: theme === 'dark' ? '2px solid var(--primary-blue)' : '1px solid var(--border-subtle)',
              backgroundColor: theme === 'dark' ? 'var(--primary-blue-light)' : 'var(--bg-surface)',
              color: theme === 'dark' ? 'var(--primary-blue)' : 'var(--text-primary)',
              fontWeight: '700',
              fontSize: '0.875rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              cursor: 'pointer'
            }}
          >
            <Moon size={18} /> Dedicated Dark Mode
          </button>
        </div>
      </div>

      {/* Local Data Privacy Notice (Section 62) */}
      <div
        className="card"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '1rem',
          backgroundColor: 'var(--primary-blue-light)',
          border: '1px solid var(--primary-blue)'
        }}
      >
        <div
          style={{
            width: '40px',
            height: '40px',
            borderRadius: 'var(--radius-full)',
            backgroundColor: 'var(--bg-card)',
            color: 'var(--primary-blue)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0
          }}
        >
          <ShieldCheck size={22} />
        </div>
        <div>
          <h4 style={{ fontSize: '0.95rem', fontWeight: '800', color: 'var(--text-primary)' }}>
            Your data is stored locally in this browser
          </h4>
          <p style={{ fontSize: '0.825rem', color: 'var(--text-secondary)', marginTop: '2px' }}>
            Streakly does not transmit your private habits or journal thoughts to any external cloud database. All progress is saved in your browser's private storage.
          </p>
        </div>
      </div>

      {/* Backup & Export Data Management (Section 61) */}
      <div className="card">
        <h4 className="card-title" style={{ marginBottom: '0.5rem', color: 'var(--text-primary)' }}>
          <Database size={18} color="var(--primary-blue)" /> Data Export & Migration (JSON & CSV)
        </h4>
        <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '1.25rem' }}>
          Export all your habits, routines, wellness vitals, tasks, focus logs, and journal entries.
        </p>

        <div style={{ display: 'flex', gap: '0.85rem', flexWrap: 'wrap' }}>
          <Button variant="secondary" onClick={handleExportJSON} icon={Download}>
            Export Full JSON Backup
          </Button>

          <Button variant="secondary" onClick={handleExportCSV} icon={FileText}>
            Export Habits CSV
          </Button>

          <label className="btn btn-secondary" style={{ cursor: 'pointer' }}>
            <Upload size={16} /> Import JSON Backup
            <input
              type="file"
              accept=".json"
              style={{ display: 'none' }}
              onChange={handleImport}
            />
          </label>
        </div>

        {importStatus && (
          <p style={{ marginTop: '0.75rem', fontSize: '0.85rem', color: 'var(--primary-blue)', fontWeight: '600' }}>
            {importStatus}
          </p>
        )}
      </div>

      {/* Habit Preferences & Routine Reset */}
      <div className="card">
        <h4 className="card-title" style={{ marginBottom: '0.5rem', color: 'var(--text-primary)' }}>
          <Clock size={18} color="var(--primary-blue)" /> Routine Setup Flow
        </h4>
        <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '1.25rem' }}>
          Re-run the initial onboarding flow if you want to readjust your sleep or target baseline.
        </p>

        <Button
          variant="secondary"
          onClick={() => setConfirmResetOnboardingOpen(true)}
        >
          Re-run Onboarding Flow
        </Button>
      </div>

      {/* Danger Zone & Data Reset */}
      <div className="card" style={{ borderColor: '#FECACA' }}>
        <h4 className="card-title" style={{ color: '#DC2626', marginBottom: '0.5rem' }}>
          <Trash2 size={18} /> Danger Zone
        </h4>
        <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '1.25rem' }}>
          Reset your data back to initial sample routines or wipe all stored local habit data.
        </p>

        <div style={{ display: 'flex', gap: '0.85rem', flexWrap: 'wrap' }}>
          <Button
            variant="secondary"
            onClick={() => setConfirmSeedOpen(true)}
            icon={RefreshCw}
          >
            Reset Demo Data
          </Button>

          <Button
            variant="danger"
            onClick={() => setConfirmClearOpen(true)}
            icon={Trash2}
          >
            Delete All Local Data
          </Button>
        </div>
      </div>

      {/* Confirm Seed Modal */}
      <ConfirmDialog
        isOpen={confirmSeedOpen}
        onClose={() => setConfirmSeedOpen(false)}
        onConfirm={() => {
          onSeedDemoData();
          window.location.reload();
        }}
        title="Reset to Demo Data?"
        message="This will restore realistic sample habits, completion logs, tasks, focus logs, and badge progress."
        confirmText="Reset to Demo"
      />

      {/* Confirm Re-run Onboarding */}
      <ConfirmDialog
        isOpen={confirmResetOnboardingOpen}
        onClose={() => setConfirmResetOnboardingOpen(false)}
        onConfirm={() => {
          onResetOnboarding();
        }}
        title="Re-run Onboarding?"
        message="This will open the 5-step routine setup flow."
        confirmText="Start Setup"
      />

      {/* Confirm Clear Data Modal */}
      <ConfirmDialog
        isOpen={confirmClearOpen}
        onClose={() => setConfirmClearOpen(false)}
        onConfirm={() => {
          onClearData();
          window.location.reload();
        }}
        title="Delete All Local Data?"
        message="Warning: This will permanently erase all habits, streak histories, tasks, focus records, and achievements in this browser."
        confirmText="Erase All Data"
        isDanger={true}
      />
    </div>
  );
};
