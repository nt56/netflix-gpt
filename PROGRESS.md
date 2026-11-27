# Progress

Shared memory between sessions. Read it at the start of a session and update it at the end. See [AGENTS.md](AGENTS.md).

## Current state

- **Next phase:** Phase 0 (Foundation and cleanup)
- **Next step:** Resolve the uncommitted changes below, then create a branch for Phase 0

## Status

| Phase | Name | Status |
| --- | --- | --- |
| 0 | Foundation and cleanup | Not started |
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

- 18 files in `src/`, `public/index.html` and `tailwind.config.js` have uncommitted UI changes on `main` (as of 2026-11-27). The user should review and commit them before Phase 0.

## Decisions

| Date | Decision |
| --- | --- |
| 2026-11-27 | Firebase is the only backend |
| 2026-11-27 | One roadmap phase per session |

The proposals in `ROADMAP.md` section 3 (categories, statuses, Spark plan, rebrand) are not yet confirmed by the user.

## Session log

Newest first.

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
