# Progress

Shared memory between sessions. Read it at the start of a session and update it at the end. See [AGENTS.md](AGENTS.md).

## Current state

- **Current phase:** Phase 0 (Foundation and cleanup). Task 1 is committed and merged into `main`. Task 2 is on branch `phase-0-cleanup`, not committed
- **Next step:** User tests tasks 1 and 2 (sign-in, browse, detail, AI search). Once approved: tick both, commit, start task 3 (router, layout and protected routes)

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

- Task 1 (Vite): signed-in pages are not verified, so it is not ticked in `ROADMAP.md`.
- There is no linter or test runner since Create React App was removed. Tests are planned for Phase 8.
- Task 2: signed-in pages are not verified, so it is not ticked in `ROADMAP.md`.
- `npm audit --omit=dev` reports 17 issues (2 critical, 5 high, 10 moderate) in packages under Firebase and React Router. Not fixed; needs the user's approval.
- `README.md` still describes Netflix GPT and OpenAI. Update it in task 7 (rebrand).

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


## Session log

Newest first.

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
