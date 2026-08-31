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
  Database
} from 'lucide-react';
import { Button } from '../components/common/Button';
import { ConfirmDialog } from '../components/common/ConfirmDialog';
import { storage } from '../utils/storage';

export const Settings = ({
  onSeedDemoData,
  onClearData,
  onResetOnboarding
}) => {
  const [confirmClearOpen, setConfirmClearOpen] = useState(false);
  const [confirmSeedOpen, setConfirmSeedOpen] = useState(false);
  const [confirmResetOnboardingOpen, setConfirmResetOnboardingOpen] = useState(false);
  const [importStatus, setImportStatus] = useState(null);

  // Export all localStorage data as a downloadable JSON file
  const handleExport = () => {
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
          setTimeout(() => window.location.reload(), 1200);
        } else {
          setImportStatus('Failed to import invalid backup JSON file.');
        }
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="anim-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem', maxWidth: '800px', paddingBottom: '2.5rem' }}>
      {/* Header */}
      <div>
        <h2 style={{ fontSize: '1.75rem', fontWeight: '800', color: 'var(--color-black)' }}>
          Settings
        </h2>
        <p style={{ color: 'var(--color-text-grey)', fontSize: '0.9rem', marginTop: '0.2rem' }}>
          Manage your local habit data backups, system preferences, and reset options.
        </p>
      </div>

      {/* Local Data Privacy Notice (Section 33) */}
      <div
        className="card"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '1rem',
          backgroundColor: 'var(--color-light-blue)',
          border: '1px solid #BFDBFE'
        }}
      >
        <div
          style={{
            width: '40px',
            height: '40px',
            borderRadius: 'var(--radius-full)',
            backgroundColor: 'var(--color-white)',
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
          <h4 style={{ fontSize: '0.95rem', fontWeight: '700', color: 'var(--color-deep-navy)' }}>
            Your data is stored locally in this browser
          </h4>
          <p style={{ fontSize: '0.825rem', color: '#334155', marginTop: '2px' }}>
            Streakly does not transmit your habits to any external cloud database. All progress is saved in your browser's private storage.
          </p>
        </div>
      </div>

      {/* Backup & Export Data Management (Section 32) */}
      <div className="card">
        <h4 className="card-title" style={{ marginBottom: '0.5rem' }}>
          <Database size={18} color="var(--primary-blue)" /> Data Backup & Migration
        </h4>
        <p style={{ fontSize: '0.85rem', color: 'var(--color-text-grey)', marginBottom: '1.25rem' }}>
          Export all your habits, streaks, completions, and achievements as a JSON file, or restore from a backup.
        </p>

        <div style={{ display: 'flex', gap: '0.85rem', flexWrap: 'wrap' }}>
          <Button variant="secondary" onClick={handleExport} icon={Download}>
            Export JSON Backup
          </Button>

          <label className="btn btn-secondary" style={{ cursor: 'pointer' }}>
            <Upload size={16} /> Import Backup
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
        <h4 className="card-title" style={{ marginBottom: '0.5rem' }}>
          <Clock size={18} color="var(--primary-blue)" /> Routine Flow
        </h4>
        <p style={{ fontSize: '0.85rem', color: 'var(--color-text-grey)', marginBottom: '1.25rem' }}>
          Re-run the initial onboarding flow if you want to readjust your sleep or target baseline.
        </p>

        <Button
          variant="secondary"
          onClick={() => setConfirmResetOnboardingOpen(true)}
        >
          Re-run Onboarding Flow
        </Button>
      </div>

      {/* Danger Zone & Data Reset (Section 32 & 52) */}
      <div className="card" style={{ borderColor: '#FECACA' }}>
        <h4 className="card-title" style={{ color: '#991B1B', marginBottom: '0.5rem' }}>
          <Trash2 size={18} /> Danger Zone
        </h4>
        <p style={{ fontSize: '0.85rem', color: 'var(--color-text-grey)', marginBottom: '1.25rem' }}>
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
        message="This will restore realistic sample habits, completion logs, and badge progress."
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
        message="Warning: This will permanently erase all habits, streak histories, achievements, and notifications in this browser."
        confirmText="Erase All Data"
        isDanger={true}
      />
    </div>
  );
};
