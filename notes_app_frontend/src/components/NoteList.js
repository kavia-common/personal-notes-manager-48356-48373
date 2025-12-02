import React, { useMemo } from 'react';

// PUBLIC_INTERFACE
export default function NoteList({ notes, activeId, onSelect, search }) {
  /** Renders a list of notes with simple filtering by title/content. */
  const filtered = useMemo(() => {
    const q = (search || '').trim().toLowerCase();
    if (!q) return notes;
    return notes.filter(
      (n) =>
        (n.title || '').toLowerCase().includes(q) ||
        (n.content || '').toLowerCase().includes(q)
    );
  }, [notes, search]);

  if (!filtered.length) {
    return (
      <div className="empty" role="status" aria-live="polite">
        No notes found. Create a new note to get started.
      </div>
    );
  }

  return (
    <div className="list" role="list">
      {filtered.map((n) => (
        <button
          key={n.id}
          className={`note-item ${activeId === n.id ? 'active' : ''}`}
          onClick={() => onSelect(n.id)}
          role="listitem"
          aria-current={activeId === n.id ? 'true' : 'false'}
        >
          <div style={{ flex: 1, textAlign: 'left' }}>
            <div className="note-title">{n.title || 'Untitled'}</div>
            <div className="note-meta">
              {new Date(n.updatedAt || n.createdAt || Date.now()).toLocaleString()}
            </div>
          </div>
        </button>
      ))}
    </div>
  );
}
