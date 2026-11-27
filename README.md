# Flixora

A movie discovery web app. Browse movies from TMDB, watch trailers and ask Gemini AI for suggestions.

The app does not stream movies.

## Features

- Email sign-up and sign-in
- Browse rows: now playing, top rated, popular and upcoming movies
- Movie page with cast, trailer and recommendations
- AI search: describe a mood or plot and get five movie suggestions

Planned work is in [ROADMAP.md](ROADMAP.md).

## Tech stack

React 18, Redux Toolkit (with RTK Query), React Router 7, Tailwind CSS 3, Vite, Firebase 13 (Authentication and Hosting), TMDB API and Gemini API.

## Setup

You need Node.js 20 or newer, a [TMDB API read access token](https://developer.themoviedb.org/docs/getting-started) and a [Gemini API key](https://ai.google.dev/gemini-api/docs/api-key).

1. Install the packages: `npm install`
2. Create a `.env` file in the project root:

   ```text
   VITE_TMDB_KEY=your_tmdb_read_access_token
   VITE_GEMINI_KEY=your_gemini_api_key
   ```

3. Start the app: `npm run dev`, then open <http://localhost:3000>

Both keys are included in the browser bundle, so anyone who uses the app can read them. Use keys with limited access.

The Firebase settings are in `src/services/firebase.js`. Change them to use your own Firebase project.

## Commands

| Command | Purpose |
| --- | --- |
| `npm run dev` (or `npm start`) | Development server on port 3000 |
| `npm run build` | Production build to `build/` |
| `npm run preview` | Serve the production build locally |
| `firebase deploy` | Deploy to Firebase Hosting |

## Troubleshooting

If no movies load, check that your network can reach `api.themoviedb.org`. Some internet providers block it.

## Attribution

This product uses the TMDB API but is not endorsed or certified by [TMDB](https://www.themoviedb.org/).
