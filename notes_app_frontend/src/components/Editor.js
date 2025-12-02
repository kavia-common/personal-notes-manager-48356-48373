import React, { useEffect, useState } from 'react';

// PUBLIC_INTERFACE
export default function Editor({ note, onChange }) {
  /** Editor for the active note. */
  const [title, setTitle] = useState(note?.title || '');
  const [content, setContent] = useState(note?.content || '');

  useEffect(() => {
    setTitle(note?.title || '');
    setContent(note?.content || '');
  }, [note?.id]); // re-init when switching notes

  useEffect(() => {
    if (!note) return;
    // debounce minor changes? For simplicity, call onChange directly on each change
    onChange({ ...note, title, content });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [title, content]);

  if (!note) return null;

  return (
    <div className="card" aria-label="Editor">
      <div className="header-row">
        <input
          className="title-input"
          placeholder="Note title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          aria-label="Note title"
        />
      </div>
      <textarea
        className="editor"
        placeholder="Write your note here..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
        aria-label="Note content"
      />
    </div>
  );
}
