const PREFIX = 'streakly_';

const normalizeKey = (key) => {
  if (key.startsWith(PREFIX)) return key;
  return `${PREFIX}${key}`;
};

export const storage = {
  get: (key, defaultValue = null) => {
    try {
      const fullKey = normalizeKey(key);
      const item = localStorage.getItem(fullKey);
      if (item === null || item === undefined || item === 'undefined') {
        return defaultValue;
      }
      return JSON.parse(item);
    } catch (e) {
      console.error(`Error reading ${key} from storage:`, e);
      return defaultValue;
    }
  },

  set: (key, value) => {
    try {
      const fullKey = normalizeKey(key);
      localStorage.setItem(fullKey, JSON.stringify(value));
      return true;
    } catch (e) {
      console.error(`Error saving ${key} to storage:`, e);
      return false;
    }
  },

  remove: (key) => {
    try {
      const fullKey = normalizeKey(key);
      localStorage.removeItem(fullKey);
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
          try {
            backup[rawKey] = JSON.parse(localStorage.getItem(fullKey) || 'null');
          } catch (err) {
            backup[rawKey] = localStorage.getItem(fullKey);
          }
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
