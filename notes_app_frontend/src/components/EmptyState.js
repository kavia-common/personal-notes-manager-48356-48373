import React from 'react';

// PUBLIC_INTERFACE
export default function EmptyState() {
  /** Empty view when there is no selected note. */
  return (
    <div className="card empty" role="status" aria-live="polite">
      Select a note from the list or create a new one to start editing.
    </div>
  );
}
