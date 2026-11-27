# Roadmap: from Netflix GPT to a discovery and tracking app

## 1. Goal

A web app where a signed-in user can:

1. Discover everything on TMDB: movies, TV series, web series, anime and more, by genre.
2. Save titles to a personal library with a status.
3. Track progress, rate titles and get AI recommendations based on their own taste.

**Constraint:** frontend only. Firebase is the only backend. TMDB and Gemini are external APIs.

Tags used below: **[Idea]** is from the original idea, **[Added]** is a proposed addition.

---

## 2. Where the project is today

| Area | Current state |
| --- | --- |
| Stack | React 18, Redux Toolkit, React Router 6, Tailwind 3, Create React App |
| Firebase | Email/password auth, Analytics, Hosting. No database yet |
| Pages | `/` (login), `/browse`, `/movie/:movieId` |
| Content | Movies only: now playing, popular, top rated, upcoming |
| AI | Gemini search that returns 5 movie names, matched on TMDB |

Things to fix before adding features:

- The auth listener lives in `Header.js`, so route protection depends on the header being rendered.
- The router is created inside the `Body` component.
- Each TMDB list has its own hook with the same fetch logic and no loading or error handling.
- The Gemini key and TMDB token are shipped in the browser bundle.
- `openAI.js`, `OPENAI_KEY` and the `openai` package are no longer used.
- `react-router-dom` is listed under `devDependencies`. `init` and `npx` are not needed.
- Create React App is deprecated.

---

## 3. Decisions to take first

### 3.1 Content types

TMDB has only two main media types: `movie` and `tv`. Anime and web series are **not** TMDB categories, so the app defines them as filters.

| Section | How to query TMDB |
| --- | --- |
| Movies | `/discover/movie` |
| TV Series | `/discover/tv` |
| Anime series | `/discover/tv?with_genres=16&with_original_language=ja` |
| Anime movies | `/discover/movie?with_genres=16&with_original_language=ja` |
| Web Series **[Added definition]** | `/discover/tv?with_networks=213\|1024` (Netflix, Prime Video; extend the list) |
| K-Drama **[Added]** | `/discover/tv?with_genres=18&with_original_language=ko` |
| Indian **[Added]** | `with_original_language=hi\|ta\|te\|ml\|kn` |
| Documentaries **[Added]** | `with_genres=99` |

Keep these in one config file (`src/config/categories.js`). A new section then means one new entry, not a new page.

Notes:

- Movie and TV genre lists differ (`/genre/movie/list` and `/genre/tv/list`). For example, TV uses "Action & Adventure".
- A movie and a TV show can share the same numeric ID. Always identify a title as `mediaType` + `id`.
- Discover results stop at page 500.

### 3.2 Watch statuses

"Watching" and "in progress" mean nearly the same thing, so they are merged. "On Hold" covers a started but paused title.

| Status | Meaning |
| --- | --- |
| Planned **[Idea]** | Want to watch |
| Watching **[Idea]** | In progress now |
| Completed **[Idea]** | Finished |
| On Hold **[Added]** | Paused, will return |
| Dropped **[Added]** | Stopped, will not return |

**Favorite** is a separate flag, because a title can be both Completed and a favorite.

### 3.3 Firebase plan

Aim to stay on the free **Spark** plan.

| Service | Use | Note |
| --- | --- | --- |
| Authentication | Email, Google sign-in, password reset | Free |
| Firestore | Library, profile, lists, reviews | Free daily quota (about 50k reads, 20k writes) |
| Hosting | Deploy and preview channels | Free tier |
| App Check | Block requests that do not come from the app | Free to start |
| Firebase AI Logic | Call Gemini without shipping the key | Replaces `gemini.js` |
| Cloud Functions | Server-side TMDB proxy, aggregates | Needs the paid Blaze plan, so avoid for now |
| Cloud Storage | Avatar uploads | Needs Blaze, so offer preset avatars |

Check current limits and pricing on the Firebase site before relying on them.

### 3.4 Name and legal

- The Netflix name and logo are trademarks. Choose an own name and logo before sharing the app publicly. **[Added]**
- TMDB requires attribution (logo and notice). Its free API access is for non-commercial use.
- The app tracks and discovers titles. It does not stream them.

---

## 4. Target structure

### 4.1 Routes

```
/                      Landing and login
/home                  Personalised home
/movies                Movie discovery
/tv                    TV series discovery
/anime                 Anime discovery
/web-series            Web series discovery
/genres                All genres
/genre/:type/:genreId  Titles in one genre
/search                Search with filters
/title/:type/:id       Movie or TV detail
/person/:id            Actor or director
/library               My library, tabs by status
/lists/:listId         Custom list
/stats                 My watch statistics
/profile               Settings
```

### 4.2 Folders

```
src/
  app/          store, router, providers
  config/       categories, statuses, constants
  services/     tmdb, firebase, firestore, ai
  features/     auth, discover, title, library, lists, search, ai, profile
  components/   shared UI (Card, Row, Grid, Modal, Skeleton, Toast)
  hooks/        shared hooks
```

### 4.3 Firestore data model

```
users/{uid}
  displayName, avatarId, createdAt
  preferences: { favoriteGenres: [], languages: [], region: "IN" }

users/{uid}/library/{mediaType_tmdbId}        e.g. tv_1399
  tmdbId, mediaType, title, posterPath, genreIds, releaseYear, runtime
  status: planned | watching | completed | on_hold | dropped
  isFavorite, rating (1-10), notes
  progress: { watchedEpisodes: { "1": [1, 2, 3] }, lastSeason, lastEpisode }
  addedAt, updatedAt, startedAt, completedAt

users/{uid}/lists/{listId}
  name, description, isPublic, items: [ { key, title, posterPath } ]
```

- One document per title, with the ID built from type and TMDB ID. This prevents duplicates.
- Title, poster and genres are copied into the document, so the library renders without extra TMDB calls.
- Load the library once with a real-time listener and share it across the app. This saves reads.

### 4.4 Security rules (starting point)

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{uid}/{document=**} {
      allow read, write: if request.auth != null && request.auth.uid == uid;
    }
  }
}
```

Add field validation (allowed status values, rating range, string length) in Phase 3.

---

## 5. Phases

Do them in order. Each phase ends with a working, deployable app.

### Phase 0: Foundation and cleanup

- [x] Migrate from Create React App to Vite (env variables become `VITE_*`, set Hosting folder to `dist` or keep `build`)
- [x] Remove unused packages and files, move `react-router-dom` to `dependencies`
- [x] Create the router once, add a layout route and protected routes
- [x] Move the auth listener to an app-level provider
- [x] One TMDB service using RTK Query (caching, loading and error states) to replace the separate hooks
- [x] Shared UI: Card, Row, Grid, Skeleton, Toast, Error boundary, 404 page
- [x] Rebrand: name, logo, theme **[Added]**
- [ ] Optional: TypeScript for new files **[Added]** (skipped: the project stays on JavaScript)

**Done when:** the current features work on the new structure and no unused code remains.

### Phase 1: Multi-media discovery **[Idea]**

- [ ] Category config file
- [ ] Pages for Movies, TV, Anime and Web Series, each with a hero banner and rows
- [ ] Genres page and genre result page
- [ ] Detail page for both movies and TV (seasons and episodes for TV)
- [ ] Infinite scroll or "Load more"
- [ ] New navigation, including a mobile bottom bar
- [ ] TMDB attribution in the footer

**Done when:** a user can reach any category or genre and open any title.

### Phase 2: Search and filters **[Added]**

- [ ] Search across movies, TV and people (`/search/multi`) with debounce
- [ ] Filters: genre, year, rating, language, runtime, streaming provider
- [ ] Sorting: popularity, rating, release date
- [ ] Filters stored in the URL so results can be shared
- [ ] "Where to watch" on detail pages (TMDB watch providers, credit JustWatch)
- [ ] Person page with filmography

**Done when:** a filtered search survives a page refresh.

### Phase 3: Library and watchlist **[Idea]**

- [ ] Enable Firestore, write and test security rules with the emulator
- [ ] Create the user document on first sign-in
- [ ] "Add to library" button on cards and detail pages, with a status menu
- [ ] Library page: tabs by status, filter by type and genre, sort, search
- [ ] Change status, remove with undo, mark favorite
- [ ] Status badge on every card that is already saved
- [ ] Optimistic updates and offline persistence

**Done when:** the library stays in sync across two devices and no user can read another user's data.

### Phase 4: Progress, ratings and stats

- [ ] Episode and season checklist **[Added]**
- [ ] "Continue watching" row with next episode **[Added]**
- [ ] Automatic status changes: first episode sets Watching, last episode of an ended show sets Completed **[Added]**
- [ ] Personal rating and private notes **[Added]**
- [ ] Stats page: counts by status, hours watched, top genres, activity by month **[Added]**

**Done when:** progress and stats update immediately after marking an episode.

### Phase 5: Accounts and personalisation

- [ ] Google sign-in, password reset, email verification **[Added]**
- [ ] Onboarding: pick favorite genres, languages and region **[Idea + Added]**
- [ ] Home page built from those preferences: "Because you watched ...", new in your genres
- [ ] Hide titles already completed or dropped from suggestions
- [ ] Profile settings, preset avatars, delete account with its data

**Done when:** two users with different tastes see different home pages.

### Phase 6: AI features **[Added]**

- [ ] Move Gemini calls to Firebase AI Logic, enable App Check, delete the old key
- [ ] Request structured JSON (title, type, year, reason) instead of comma-separated text
- [ ] Recommendations for movies, TV and anime
- [ ] Use the library as context: ratings and favorites in, completed titles excluded
- [ ] "Mood" and "what should I watch tonight" pickers
- [ ] Add a suggestion to the library in one click
- [ ] Per-user daily limit to protect the quota

**Done when:** no Gemini key is in the built bundle and suggestions reflect the user's library.

### Phase 7: Sharing and community (optional) **[Added]**

- [ ] Custom lists
- [ ] Public profile and public list links (opt-in, private by default)
- [ ] Reviews with spoiler tag and report option
- [ ] Follow users and an activity feed
- [ ] Update security rules for every public path

Social features raise Firestore usage and need moderation. Start only after real users ask for them.

### Phase 8: Quality and launch **[Added]**

- [ ] Tests: unit tests for status logic, rules tests, end-to-end for sign-in and library
- [ ] Performance: code splitting, lazy images, correct TMDB image sizes
- [ ] Accessibility: keyboard navigation, focus states, contrast
- [ ] PWA: installable, offline library
- [ ] Import and export of the library (CSV or JSON)
- [ ] GitHub Actions: build, test and deploy to Hosting preview channels
- [ ] Error and usage monitoring with Analytics

---

## 6. Release plan

| Release | Phases | What users get |
| --- | --- | --- |
| v1 (minimum) | 0, 1, 3 | Browse all categories and keep a watchlist |
| v2 | 2, 4, 5 | Search, progress tracking, personal home |
| v3 | 6, 8 | Smart recommendations, polished app |
| Later | 7 | Community |

## 7. Risks

| Risk | Handling |
| --- | --- |
| TMDB token visible in the browser | Use only the read-only token. A proxy needs Blaze or another host |
| Firestore quota | One listener for the library, cache, paginate public data |
| TMDB rate limits | RTK Query caching, debounced search |
| AI returns wrong titles | Match on title, type and year; drop anything not found |
| Scope grows too large | Ship v1 before starting later phases |
