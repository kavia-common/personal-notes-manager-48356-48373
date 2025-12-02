# Personal Notes Manager (React)

A single-page React application to create, edit, search, and delete personal notes with a modern "Ocean Professional" theme.

## Features
- Sidebar layout with actions and search
- Notes list with filter by title/content
- Create, edit (title/content), delete with confirmation
- LocalStorage persistence (fallback/offline mode)
- Optional awareness of backend via environment variables (no hard dependency)
- Modern UI with Ocean Professional palette (blue + amber accents)

## Run
- `npm start` and open http://localhost:3000

## Data Persistence
- Notes and theme are stored in `localStorage` under:
  - `notes_app__notes_v1`
  - `notes_app__theme_v1`

## Environment Variables (optional, no hard dependency)
- `REACT_APP_API_BASE`
- `REACT_APP_BACKEND_URL`

If either is set, the app shows "Backend detected" in the top bar, but still uses localStorage unless you wire real API calls.

## Files
- `src/theme.css` — Theme and layout styles
- `src/utils/storage.js` — LocalStorage utilities
- `src/utils/api.js` — Backend config probe
- `src/components/*` — Sidebar, NoteList, Editor
- `src/App.js` — App shell and page composition

## Theme: Ocean Professional
- Primary: #2563EB
- Secondary: #F59E0B
- Error: #EF4444
- Background: #f9fafb
- Surface: #ffffff
- Text: #111827
