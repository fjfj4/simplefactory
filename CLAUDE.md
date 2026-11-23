# SimpleFactory

A web app. Stack not chosen yet; update this file when it is.

## Default workflow (follow for every feature)

By default, build every feature with the Superpowers skills, in this order:

1. **Design**: `superpowers:brainstorming` → design spec in `docs/superpowers/specs/`.
2. **Plan**: `superpowers:writing-plans` → plan in `docs/superpowers/plans/`.
3. **Build**: `superpowers:using-git-worktrees`, then `superpowers:subagent-driven-development` (or `superpowers:executing-plans`), with `superpowers:test-driven-development` for all code.
4. **Review**: `superpowers:requesting-code-review`, then `superpowers:verification-before-completion`. Tests must pass.
5. **Security review**: run `/security-review` on the branch's changes, then fix every high and medium finding before moving on. A finding you decide not to fix needs a one-line reason in the PR description.
   - The **security-guidance** plugin (enabled in `.claude/settings.json`) also warns about insecure patterns *while* code is being written. It complements step 5 and does not replace it.
6. **Document**: run the `feature-wrapup` skill. It writes end-user docs with screenshots and video, plus an architecture lesson with diagrams, and commits them on the branch.
7. **Finish**: `superpowers:finishing-a-development-branch`.

Skip a step only when your human partner says so. For a tiny change (typo, copy tweak), steps 1–2 can be a short design and steps 5–6 can be skipped. Say so explicitly.

## Pull requests: visual by default

Every PR should let a reviewer *see* the change before reading code. Use `.github/pull_request_template.md` and include every visual that applies:

- **UI change**: before/after screenshots and a link to the feature video, from `docs/user-guide/media/<feature>/`. In a PR description, reference images by absolute URL: `https://github.com/fjfj4/simplefactory/blob/<branch>/<path>?raw=true`.
- **Behaviour or logic change**: a Mermaid `flowchart` or `sequenceDiagram` of the new path.
- **Database change**: a Mermaid `erDiagram` of the changed entities (new fields marked), plus the migration path and whether it is reversible.
- **Architecture decision**: link the lesson in `docs/architecture/` and paste its main diagram.
- **State or lifecycle change**: a `stateDiagram-v2`.

A PR with no visual at all needs a one-line reason (e.g. "dependency bump only"). Keep diagrams small, about 12 nodes at most, and label them with names from the code.

## CI and branch protection

- `.github/workflows/ci.yml` runs on every PR and on push to `main`. Jobs switch on when their files exist: `package.json` (npm `lint`, `typecheck`, `test` scripts), `playwright.config.ts` (E2E), `playwright.docs.config.ts` (doc capture smoke in demo mode).
- `main` requires the single check **`CI passed`**. Add new CI jobs to its `needs:` list; never require individual jobs in branch protection. Why: `docs/architecture/0001-ci-single-required-check.md`.
- Pin third-party actions to a full commit SHA with a `# vX.Y.Z` comment; Dependabot bumps them. Keep `permissions: contents: read` and never use `pull_request_target`.
- When the stack lands: drop `--if-present` from the CI scripts and add an `npm` entry to `.github/dependabot.yml`.

## Documentation layout

- `docs/user-guide/` holds end-user help pages: task-focused, no jargon. Media lives in `docs/user-guide/media/<feature>/`.
- `docs/capture/` holds re-runnable Playwright scripts that produce that media. Run with `npx playwright test -c playwright.docs.config.ts`.
- `docs/architecture/` holds architecture lessons (ADR-style) for developers: why, trade-offs, alternatives, Mermaid diagrams.
- `docs/superpowers/specs/` and `docs/superpowers/plans/` hold design specs and plans. These are the source of truth for *why*.

## Requirement on the app: demo state

Doc captures need the app to boot with **deterministic demo data and a demo login** (e.g. `npm run dev:demo`). Keep this working; it also gives us E2E smoke tests.
