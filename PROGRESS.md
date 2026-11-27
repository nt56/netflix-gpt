# Progress

Shared memory between sessions. Read it at the start of a session and update it at the end. See [AGENTS.md](AGENTS.md).

## Current state

- **Current phase:** Phase 0 (Foundation and cleanup). All required tasks are done on branch `phase-0-cleanup`, committed and pushed, not merged into `main`. Waiting for the user's test with the real services
- **Next step:** User tests sign-up, sign-in, browse, movie page and AI search with real Firebase, TMDB and Gemini. If it works: merge `phase-0-cleanup` into `main`, set Phase 0 to Done, then start Phase 1 in a new session

## Status

| Phase | Name | Status |
| --- | --- | --- |
| 0 | Foundation and cleanup | In progress |
| 1 | Multi-media discovery | Not started |
| 2 | Search and filters | Not started |
| 3 | Library and watchlist | Not started |
| 4 | Progress, ratings and stats | Not started |
| 5 | Accounts and personalisation | Not started |
| 6 | AI features | Not started |
| 7 | Sharing and community (optional) | Not started |
| 8 | Quality and launch | Not started |

Status values: Not started, In progress, Done.

## Open issues

- Phase 0 is not verified with real Firebase, TMDB or Gemini, and not deployed. The new Hosting rewrite in `firebase.json` is not verified.
- `api.themoviedb.org` timed out on the user's network on 2026-11-27 (`image.tmdb.org` worked). DNS came from the JioFiber router, so it looks like an ISP block. Users on such networks see error states.
- There is no linter or test runner since Create React App was removed. Tests are planned for Phase 8.
- `npm audit --omit=dev` reported 17 issues (2 critical, 5 high, 10 moderate) in packages under Firebase and React Router. Not fixed; needs the user's approval.
- The TMDB token and Gemini key are in the browser bundle (Gemini moves in Phase 6).
- The login page's "Auto-fill Demo Details" button puts a demo password in client code. Ask the user whether to keep it.
- The brand color `#E50914` is the same red Netflix uses. Kept; ask before changing the theme.
- While AI search is open, the header links "Top Rated" and "Upcoming" close it but do not scroll. This was already true before Phase 0.
- The Firebase project ID `netflix-gpt-1ef51` and the repository name cannot be changed by code.
- The TMDB attribution notice is in the README only; the in-app footer notice is a Phase 1 task.

## Decisions

| Date | Decision |
| --- | --- |
| 2026-11-27 | Firebase is the only backend |
| 2026-11-27 | One roadmap phase per session |
| 2026-11-27 | Use the Firebase free (Spark) plan |
| 2026-11-27 | Keep the Flixora brand. In Phase 0, replace the Netflix-hosted image, remove false labels, rename Netflix references |
| 2026-11-27 | Stay on JavaScript |
| 2026-11-27 | After each task: stop, user tests, agent commits once approved |
| 2026-11-27 | Content categories and watch statuses in `ROADMAP.md` section 3 are accepted |
| 2026-11-27 | Phase 0 tasks 3 to 7 were done without stopping after each one, then pushed (that session only) |


## Session log

Newest first.

### 2026-11-27: Phase 0, tasks 3 to 7

- **Done:** new folder structure; one router with a layout route and route guards; app-level auth provider; RTK Query TMDB service; shared Card, Row, Grid, Skeleton, Toast, error boundary and 404 page; rebrand (original backdrop, false labels removed, new row names, package renamed to `flixora`, new README). Fixed the hero text and button hidden behind the rows (an older bug). Removed unused styles.
- **Not done:** optional TypeScript task (the project stays on JavaScript). Not merged, not deployed.
- **Code changes:** `src/app/`, `src/config/`, `src/services/`, `src/features/`, `src/components/`, `firebase.json`.
- **Behaviour changes:** the hero has one button, "More Info"; AI results are cleared on sign-out; each browse and AI row has its own loading and error state; a sign-out failure shows a toast; the `/error` page was removed.
- **Verified:** `npm run build` with no warnings; a temporary headless Edge test with 26 checks passed on the preview and development servers. It faked Firebase Auth, Gemini, TMDB, images and YouTube, and the test script is not in the repository. Not verified: any real service, deploy, browsers other than Edge.
- **Next:** user test, merge, Phase 1.

### 2026-11-27: Phase 0, task 2 (unused packages and files)

- **Done:** removed `openai`, `init` and `npx`; moved `react-router-dom` to `dependencies`; deleted `public/netflix.png`; stopped tracking `.firebase/` and added it to `.gitignore`; removed unused constants `APP_NAME`, `APP_TAGLINE`, `LOGO`.
- **Not done:** tasks 3 to 7. No commit.
- **Code changes:** `package.json`, `package-lock.json`, `.gitignore`, `src/utils/constants.js`.
- **Verified:** `npm install`, `npm run build` (no warnings), unused-import check on `src/`, login page renders in preview (headless Edge). Not verified: sign-in, browse, detail, AI search, deploy.
- **Issues and decisions:** the user asked for Phase 2, then Phase 1. The code showed Phase 0 was not finished, and the user chose to finish Phase 0 first.
- **Next:** user test, commit, task 3.

### 2026-11-27: Phase 0, commit and merge task 1

- **Done:** removed the "Suggested by Gemini AI" row subtitle; committed, pushed and merged into `main` at the user's request.
- **Not done:** other Phase 0 tasks. No deploy.
- **Code changes:** `src/components/GPTMovieSuggestions.jsx`.
- **Verified:** `npm run build`. Not verified: sign-in, browse, detail, AI search, deploy.
- **Next:** task 2.

### 2026-11-27: Phase 0, task 1 (Vite)

- **Done:** replaced Create React App with Vite.
- **Not done:** other Phase 0 tasks.
- **Code changes:** `vite.config.js`, `postcss.config.js`, `index.html` moved to root, `src/main.jsx`, JSX files renamed to `.jsx`, env variables renamed to `VITE_*` (also in `.env`). Removed `.babelrc`, `setupTests.js`, `reportWebVitals.js`, `openAI.js`, testing libraries.
- **Verified:** `npm run build`; login page loads in dev and preview. Not verified: sign-in, browse, detail, AI search, deploy.
- **Next:** user test, commit, task 2.

### 2026-11-27: Planning

- **Done:** created `ROADMAP.md`, `AGENTS.md`, `CLAUDE.md` and this file.
- **Code changes:** none.
- **Verified:** `npm run build` compiled successfully, including the uncommitted changes.
- **Next:** Phase 0.

### Template

```
### YYYY-MM-DD: Phase N, short title

- **Done:**
- **Not done:**
- **Code changes:** main files and why
- **Verified:** what was run or tested, and what was not
- **Issues and decisions:**
- **Next:**
```
