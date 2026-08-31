import { useState, useCallback, useEffect } from 'react';
import { getStoredNotifications, saveStoredNotifications, createNotification } from '../utils/notificationUtils';

export const useNotifications = () => {
  const [notifications, setNotifications] = useState(getStoredNotifications);

  const unreadCount = notifications.filter(n => !n.read).length;

  const addNotification = useCallback((title, message, type = 'info') => {
    const updated = createNotification(title, message, type);
    setNotifications(updated);
  }, []);

  const markAllAsRead = useCallback(() => {
    setNotifications(prev => {
      const updated = prev.map(n => ({ ...n, read: true }));
      saveStoredNotifications(updated);
      return updated;
    });
  }, []);

  const clearAllNotifications = useCallback(() => {
    setNotifications([]);
    saveStoredNotifications([]);
  }, []);

  const deleteNotification = useCallback((id) => {
    setNotifications(prev => {
      const updated = prev.filter(n => n.id !== id);
      saveStoredNotifications(updated);
      return updated;
    });
  }, []);

  return {
    notifications,
    unreadCount,
    addNotification,
    markAllAsRead,
    clearAllNotifications,
    deleteNotification
  };
};
