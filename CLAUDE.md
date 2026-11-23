# SimpleFactory

A web app. Stack not chosen yet; update this file when it is.

## Workflow

- Use the Superpowers workflow (brainstorming → writing-plans → implementation → review).
- **When a feature is complete and tests pass, run the `feature-wrapup` skill BEFORE `superpowers:finishing-a-development-branch`.** It writes end-user docs with screenshots and video, plus an architecture lesson with diagrams, and commits them on the branch.

## Documentation layout

- `docs/user-guide/` holds end-user help pages: task-focused, no jargon. Media lives in `docs/user-guide/media/<feature>/`.
- `docs/capture/` holds re-runnable Playwright scripts that produce that media. Run with `npx playwright test -c playwright.docs.config.ts`.
- `docs/architecture/` holds architecture lessons (ADR-style) for developers: why, trade-offs, alternatives, Mermaid diagrams.
- `docs/superpowers/specs/` and `docs/superpowers/plans/` hold design specs and plans. These are the source of truth for *why*.

## Requirement on the app: demo state

Doc captures need the app to boot with **deterministic demo data and a demo login** (e.g. `npm run dev:demo`). Keep this working; it also gives us E2E smoke tests.
