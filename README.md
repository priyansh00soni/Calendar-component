# Workspace Calendar

A clean, minimalist calendar and notes interface built for a modern workspace UI.

## Tech stack & choices

- **React 19 & Vite**: Fast cold starts, modern React features, and instant HMR which is essential for quickly tweaking the UI.
- **Tailwind CSS v4**: Utility-first styling makes it easy to implement the glassmorphism and subtle blur effects directly in the markup without juggling external CSS files.
- **Framer Motion**: Used for fluid micro-interactions, layout transitions, and state changes (like navigating to previous/next months or returning to "Today"). This adds a necessary premium feel to the UI.

## How to run locally

You'll need Node.js installed on your machine.

1. Install the dependencies:
```sh
npm install
```

2. Start the development server:
```sh
npm run dev
```

3. Open `http://localhost:5173` in your browser.

## Deployment

This app is ready to be deployed to Vercel. Since it's built with Vite, Vercel will automatically detect the optimal build settings:
- Build Command: `npm run build`
- Output Directory: `dist`

You can deploy by importing your Git repository in the Vercel dashboard, or by using the Vercel CLI:
```sh
npx vercel
```

## Project structure

Most of the UI lives in `src/components`:
- `HeroHeader.jsx` - Top navigation and workspace branding.
- `CalendarCard.jsx` & `CalendarGrid.jsx` - The main interactive calendar view.
- `NotesPanel.jsx` - The side panel for workspace notes.
- Custom logic for date math and state management is extracted to `src/hooks/`.
