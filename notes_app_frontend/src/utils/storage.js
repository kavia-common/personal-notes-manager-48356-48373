const STORAGE_KEY = 'notes_app__notes_v1';
const THEME_KEY = 'notes_app__theme_v1';

// PUBLIC_INTERFACE
export function loadNotes() {
  /** Load notes from localStorage; returns an array of notes sorted by updatedAt desc. */
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const notes = raw ? JSON.parse(raw) : [];
    if (!Array.isArray(notes)) return [];
    return notes.sort((a, b) => (b.updatedAt || 0) - (a.updatedAt || 0));
  } catch {
    return [];
  }
}

// PUBLIC_INTERFACE
export function saveNotes(notes) {
  /** Persist notes to localStorage. */
  localStorage.setItem(STORAGE_KEY, JSON.stringify(notes || []));
}

// PUBLIC_INTERFACE
export function loadTheme() {
  /** Load theme (light|dark) from localStorage. */
  try {
    return localStorage.getItem(THEME_KEY) || 'light';
  } catch {
    return 'light';
  }
}

// PUBLIC_INTERFACE
export function saveTheme(theme) {
  /** Save theme (light|dark) to localStorage. */
  try {
    localStorage.setItem(THEME_KEY, theme);
  } catch {
    /* no-op */
  }
}

// PUBLIC_INTERFACE
export function generateId() {
  /** Generate a reasonably unique id for notes. */
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
}
