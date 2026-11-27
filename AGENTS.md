# Agent instructions

Instructions for any AI agent working in this repository. Each roadmap phase is done in a **new session**, so nothing from an earlier chat can be assumed. The files in this repository are the shared memory.

## 1. Start of every session

Do all of this before changing any code:

1. Read this file.
2. Read [PROGRESS.md](PROGRESS.md): current phase, what was done, open issues, decisions.
3. Read [ROADMAP.md](ROADMAP.md): section 3 (decisions), section 4 (target structure) and the current phase.
4. Read saved memory, if your tool has it. For Claude Code, open `MEMORY.md` in the project memory folder and any memory it links that is relevant.
5. Run `git status`, `git branch --show-current` and `git log --oneline -15`.
6. Check that the code matches `PROGRESS.md`. If they differ, trust the code, tell the user, and correct the file.
7. Tell the user in a few lines: the phase you are about to do, its tasks, and anything blocking. Then start.

If there are uncommitted changes you did not make, do not revert, overwrite or commit them. Tell the user and ask.

## 2. During the session

- Work on **one phase per session**. Do not start the next phase unless asked.
- Follow the task list of the phase. Suggest extra ideas, but do not build them without approval.
- Tick a task in `ROADMAP.md` (`- [x]`) only after it is verified.
- Ask before changing a decision from `ROADMAP.md` section 3. Record the answer in `PROGRESS.md`.
- Keep the app working after each task.

## 3. End of every session

Do this when the phase is finished, or when the user stops early:

1. Run `npm run build` and fix errors and warnings.
2. Update `PROGRESS.md`:
   - the status table
   - a new session log entry at the top, using the template there
   - decisions, open issues and the exact next step
3. Tick finished tasks in `ROADMAP.md`.
4. Update section 4 of this file if the stack, commands or folders changed.
5. Save to memory only what the repository does not record, such as user preferences.
6. Tell the user what was done, what was not, and what to test by hand.

Never mark something done if it was not tested. Write "not verified" instead.

## 4. Project facts

**What it is:** Netflix GPT, being expanded into a discovery and tracking app for movies, TV, anime and web series.

**Backend:** Firebase only. No custom server. Use the free Spark plan; ask before adding anything that needs Blaze.

**Stack (update after Phase 0):** React 18, Redux Toolkit, React Router 6, Tailwind CSS 3, Vite, Firebase 10, TMDB API, Gemini API. JavaScript.

| Command | Purpose |
| --- | --- |
| `npm run dev` (or `npm start`) | Development server on port 3000 |
| `npm run build` | Production build to `build/` |
| `npm run preview` | Serve the production build locally |
| `firebase deploy` | Deploy to Hosting (only when the user asks) |

| Path | Contents |
| --- | --- |
| `src/components/` | Pages and UI |
| `src/hooks/` | TMDB fetch hooks |
| `src/utils/` | Store, slices, Firebase, Gemini, constants |
| `tailwind.config.js` | Theme: colors, fonts, animations |
| `.env` | `VITE_TMDB_KEY`, `VITE_GEMINI_KEY` |

## 5. Code rules

- Functional components and hooks.
- Style with Tailwind and the theme tokens in `tailwind.config.js` (`brand`, `dark`). Match the existing look.
- Every page works on mobile, tablet and desktop.
- Every data view has loading, empty and error states.
- Cancel or ignore stale requests.
- Identify a title by `mediaType` + TMDB `id`, never by `id` alone.
- Keep category and status definitions in config files, not inside components.
- New code follows the folder structure in `ROADMAP.md` section 4.2 once Phase 0 sets it up.
- Accessibility: real buttons and links, labels, keyboard support.
- Add a dependency only when needed, and say why.

## 6. Firebase and security rules

- Never print, copy or commit values from `.env`. Variable names are fine.
- Never put a new secret key in client code.
- The Firebase web config in `src/utils/firebase.js` is public by design. Data is protected by security rules.
- Any new Firestore path needs security rules in the same change, tested with the emulator.
- A user reads and writes only their own data unless a feature is explicitly public.
- Limit Firestore reads: reuse listeners, paginate, avoid reads in loops.
- Keep TMDB attribution visible.

## 7. Git rules

- Do not commit, push or deploy unless the user asks.
- Do not work directly on `main`. Suggest a branch such as `phase-1-discovery`.
- Small commits with clear messages.
- No destructive git commands without approval.

## 8. Communication

- Use simple, short English.
- Ask when a choice changes the result. Otherwise pick a sensible default and say so.
- Report failures and skipped steps honestly.
