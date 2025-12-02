import React, { useEffect, useMemo, useState } from 'react';
import './theme.css';
import { loadNotes, saveNotes, loadTheme, saveTheme, generateId } from './utils/storage';
import { fetchBackendConfig } from './utils/api';
import Sidebar from './components/Sidebar';
import NoteList from './components/NoteList';
import Editor from './components/Editor';
import EmptyState from './components/EmptyState';

// PUBLIC_INTERFACE
function App() {
  /** Main SPA shell for the notes application. */
  const [notes, setNotes] = useState(() => loadNotes());
  const [activeId, setActiveId] = useState(() => notes[0]?.id || null);
  const [search, setSearch] = useState('');
  const [theme, setTheme] = useState(() => loadTheme()); // 'light' | 'dark'
  const backend = useMemo(() => fetchBackendConfig(), []);

  // Apply theme to document element and persist
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    saveTheme(theme);
  }, [theme]);

  // Persist notes to storage on change
  useEffect(() => {
    saveNotes(notes);
  }, [notes]);

  const activeNote = useMemo(() => notes.find((n) => n.id === activeId) || null, [notes, activeId]);

  // PUBLIC_INTERFACE
  const toggleTheme = () => setTheme((t) => (t === 'light' ? 'dark' : 'light'));

  // PUBLIC_INTERFACE
  const createNote = () => {
    const now = Date.now();
    const newNote = {
      id: generateId(),
      title: 'Untitled',
      content: '',
      createdAt: now,
      updatedAt: now,
    };
    setNotes((prev) => [newNote, ...prev]);
    setActiveId(newNote.id);
  };

  // PUBLIC_INTERFACE
  const updateNote = (updated) => {
    setNotes((prev) =>
      prev.map((n) => (n.id === updated.id ? { ...updated, updatedAt: Date.now() } : n))
    );
  };

  // PUBLIC_INTERFACE
  const deleteSelected = () => {
    if (!activeNote) return;
    const ok = window.confirm('Delete this note? This action cannot be undone.');
    if (!ok) return;
    setNotes((prev) => prev.filter((n) => n.id !== activeNote.id));
    // Choose next active: next in list or null
    const idx = notes.findIndex((n) => n.id === activeNote.id);
    const next = notes[idx + 1] || notes[idx - 1] || null;
    setActiveId(next?.id || null);
  };

  // PUBLIC_INTERFACE
  const selectNote = (id) => setActiveId(id);

  return (
    <div className="app-shell">
      <header className="topbar">
        <div className="brand" aria-label="App brand">
          <span className="dot" />
          <span>Personal Notes</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          {backend.enabled ? (
            <span title={`Connected to ${backend.baseUrl}`} style={{ color: 'var(--text-muted)', fontSize: 12 }}>
              Backend detected
            </span>
          ) : (
            <span title="Using localStorage" style={{ color: 'var(--text-muted)', fontSize: 12 }}>
              Offline mode
            </span>
          )}
          <button
            className="theme-toggle"
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
          >
            {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
          </button>
        </div>
      </header>

      <Sidebar
        onCreate={createNote}
        onDeleteSelected={deleteSelected}
        search={search}
        setSearch={setSearch}
        disableDelete={!activeNote}
      />

      <main className="main">
        <div className="card" style={{ marginBottom: 12 }}>
          <NoteList
            notes={notes}
            activeId={activeId}
            onSelect={selectNote}
            search={search}
          />
        </div>

        {activeNote ? (
          <>
            <Editor note={activeNote} onChange={updateNote} />
            <div className="footer-actions">
              <button className="btn danger" onClick={deleteSelected} disabled={!activeNote}>
                Delete
              </button>
              <button className="btn secondary" onClick={createNote}>New Note</button>
            </div>
          </>
        ) : (
          <EmptyState />
        )}
      </main>
    </div>
  );
}

export default App;
