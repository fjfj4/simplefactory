---
name: feature-wrapup
description: Use when a feature's implementation is complete and tests pass, BEFORE superpowers:finishing-a-development-branch. Produces end-user docs with screenshots and video (feature-docs agent) and an architecture lesson with diagrams (architecture-teacher agent), then commits them on the branch.
---

# Feature wrap-up

Runs the two documentation agents for a finished feature and commits their output on the feature branch, so the docs are reviewed in the same PR as the code.

Announce: "Using feature-wrapup to document this feature."

## 1. Gather context (yourself, quickly)

- Feature name and a kebab-case slug (e.g. `invite-teammate`).
- Current branch and base branch (usually `main`): `git rev-parse --abbrev-ref HEAD`.
- The matching spec in `docs/superpowers/specs/`, if any.
- Confirm tests pass. If they don't, stop. Documenting a broken feature produces misleading docs.

## 2. Dispatch both agents in parallel

Send both Agent calls in **one message**. They write to separate folders and don't depend on each other.

- `subagent_type: "feature-docs"`, with a prompt that gives the feature name, slug, branch, base branch, spec path, and one paragraph on what a user can now do.
- `subagent_type: "architecture-teacher"`, with a prompt that gives the feature name, branch, base branch, spec path, plan path, and any architectural choices you know were debated.

If a feature has no user-visible UI (e.g. a background job), tell feature-docs so. It will write a short text-only page, or nothing if users never notice the feature.

## 3. Review what came back

- **feature-docs:** open 1–2 screenshots with Read and skim the page for developer jargon. If it reported a blocker such as "no demo login", tell your human partner. That is a gap in the app, not in the docs.
- **architecture-teacher:** check that it wrote a lesson or a log line, and collect any **_Inferred_** reasons. Your human partner should confirm or correct those, because inferred reasons are guesses.

## 4. Commit

```bash
git add docs/user-guide docs/capture docs/architecture playwright.docs.config.ts 2>/dev/null
git commit -m "docs(<slug>): user guide and architecture notes"
```

Skip the video if it exceeds 5 MB, and say so.

## 5. Report, then continue

Tell your human partner in a few lines: the user-guide page path, the lesson path (or "no new decision"), any blockers, and any inferred reasons to confirm. Then continue with `superpowers:finishing-a-development-branch`.

## Refreshing all docs later

When the UI has changed broadly, dispatch only `feature-docs` with "refresh all captures". It re-runs every spec in `docs/capture/` and updates pages whose labels changed.
