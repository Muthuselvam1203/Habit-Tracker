const PREFIX = 'streakly_';

export const storage = {
  get: (key, defaultValue = null) => {
    try {
      const item = localStorage.getItem(`${PREFIX}${key}`);
      return item ? JSON.parse(item) : defaultValue;
    } catch (e) {
      console.error(`Error reading ${key} from storage:`, e);
      return defaultValue;
    }
  },

  set: (key, value) => {
    try {
      localStorage.setItem(`${PREFIX}${key}`, JSON.stringify(value));
      return true;
    } catch (e) {
      console.error(`Error saving ${key} to storage:`, e);
      return false;
    }
  },

  remove: (key) => {
    try {
      localStorage.removeItem(`${PREFIX}${key}`);
      return true;
    } catch (e) {
      console.error(`Error removing ${key} from storage:`, e);
      return false;
    }
  },

  exportData: () => {
    try {
      const backup = {};
      for (let i = 0; i < localStorage.length; i++) {
        const fullKey = localStorage.key(i);
        if (fullKey && fullKey.startsWith(PREFIX)) {
          const rawKey = fullKey.replace(PREFIX, '');
          backup[rawKey] = JSON.parse(localStorage.getItem(fullKey) || 'null');
        }
      }
      return JSON.stringify(backup, null, 2);
    } catch (e) {
      console.error('Error exporting data:', e);
      return null;
    }
  },

  importData: (jsonString) => {
    try {
      const data = JSON.parse(jsonString);
      if (typeof data !== 'object' || data === null) return false;
      
      Object.keys(data).forEach((key) => {
        storage.set(key, data[key]);
      });
      return true;
    } catch (e) {
      console.error('Error importing data:', e);
      return false;
    }
  },

  clearAll: () => {
    try {
      const keysToRemove = [];
      for (let i = 0; i < localStorage.length; i++) {
        const fullKey = localStorage.key(i);
        if (fullKey && fullKey.startsWith(PREFIX)) {
          keysToRemove.push(fullKey);
        }
      }
      keysToRemove.forEach((key) => localStorage.removeItem(key));
      return true;
    } catch (e) {
      console.error('Error clearing data:', e);
      return false;
    }
  }
};
