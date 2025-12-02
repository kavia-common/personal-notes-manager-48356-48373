import React from 'react';

// PUBLIC_INTERFACE
export default function Sidebar({ onCreate, onDeleteSelected, search, setSearch, disableDelete }) {
  /** Sidebar with actions and search input. */
  return (
    <aside className="sidebar" aria-label="Sidebar">
      <div className="actions">
        <button className="btn" onClick={onCreate} aria-label="Create note">
          ＋ New
        </button>
        <button
          className="btn secondary"
          onClick={onDeleteSelected}
          aria-label="Delete selected note"
          disabled={disableDelete}
          style={{ opacity: disableDelete ? 0.5 : 1 }}
        >
          🗑 Delete
        </button>
      </div>
      <div className="search">
        <span className="icon">🔎</span>
        <input
          type="text"
          placeholder="Search notes..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          aria-label="Search notes"
        />
      </div>
    </aside>
  );
}
