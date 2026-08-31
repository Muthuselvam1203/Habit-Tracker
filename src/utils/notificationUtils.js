import { storage } from './storage';

const NOTIFICATIONS_KEY = 'notifications';

export const getStoredNotifications = () => {
  return storage.get(NOTIFICATIONS_KEY, [
    {
      id: 'welcome-notif',
      title: 'Welcome to Streakly!',
      message: 'Your personal habit system is active. Small daily steps lead to massive life transformations.',
      type: 'info',
      timestamp: new Date().toISOString(),
      read: false
    }
  ]);
};

export const saveStoredNotifications = (notifications) => {
  storage.set(NOTIFICATIONS_KEY, notifications);
};

export const createNotification = (title, message, type = 'info') => {
  const current = getStoredNotifications();
  const newNotif = {
    id: `notif-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
    title,
    message,
    type,
    timestamp: new Date().toISOString(),
    read: false
  };
  const updated = [newNotif, ...current.slice(0, 19)]; // Keep latest 20
  saveStoredNotifications(updated);
  return updated;
};
