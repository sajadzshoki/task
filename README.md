# My Tasks — Personal Task Manager

A simple, fast, frontend-only personal task manager. No backend, no database, no
accounts — all data lives in your browser's `localStorage`.

## Features

- Create, edit and delete tasks
- One level of nested subtasks per task (add, edit, delete, complete)
- Task descriptions and three priority levels (High / Medium / Low)
- Per-task progress bar (completed subtasks / total, percentage); tasks without
  subtasks fall back to their own completion status
- Instant search across task titles, descriptions and subtask titles
- Light / dark theme with toggle, persisted separately, system preference on
  first visit
- Fully responsive (desktop, tablet, mobile)

## Tech stack

- React 18 + TypeScript
- Vite (dev server + build)
- Plain CSS with CSS variables for theming
- `localStorage` for persistence (versioned keys:
  `personal-task-manager-v1` for tasks, `personal-task-manager-theme-v1` for the theme)

## Getting started

```bash
npm install
npm run dev      # start the dev server
```

## Build

```bash
npm run build    # type-check + production build into dist/
npm run preview  # serve the production build
```

## Project structure

```
src/
├── types.ts               # Task / Subtask / Priority types
├── storage.ts             # localStorage load/save (versioned, validated)
├── taskUtils.ts           # id generation, progress math, search filter
├── hooks/
│   ├── useTasks.ts        # central task state + all mutations
│   └── useTheme.ts        # theme state + persistence
├── components/
│   ├── Header.tsx         # app title, overall progress, theme toggle
│   ├── SearchBar.tsx      # instant search input
│   ├── TaskItem.tsx       # task row + expandable details
│   ├── SubtaskItem.tsx    # subtask row with inline editing
│   ├── TaskFormModal.tsx  # create/edit task modal
│   ├── ProgressBar.tsx    # accessible progress bar
│   ├── PriorityBadge.tsx  # priority indicator
│   ├── EmptyState.tsx     # empty / no-results states
│   └── icons.tsx          # inline SVG icons
├── App.tsx                # composition + search/modal state
├── main.tsx
└── styles.css             # theming via CSS variables
```
