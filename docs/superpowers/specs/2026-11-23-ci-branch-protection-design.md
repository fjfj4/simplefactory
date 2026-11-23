# CI and branch protection: design

**Ask (Jacob, 2026-11-23):** GitHub Actions CI on every PR (lint, typecheck, unit tests, Playwright E2E/capture scripts as they apply) and branch protection on `main` requiring CI green before merge. No stack is chosen yet.

**Design:** one workflow, `.github/workflows/ci.yml`, with jobs gated on the presence of `package.json`, `playwright.config.ts` and `playwright.docs.config.ts`, plus an always-on actionlint job. A single aggregate job, `CI passed`, is the only required check. Rationale and alternatives: [docs/architecture/0001-ci-single-required-check.md](../../architecture/0001-ci-single-required-check.md).

**Also:** Dependabot for GitHub Actions (weekly, grouped). Secret scanning and push protection were already on (public repo), so nothing to add.

**Branch protection for `main`:** require a PR, require `CI passed` and require the branch be up to date, block force pushes and deletion. Admins may bypass (solo founder escape hatch).

**Out of scope:** deploys, coverage gates, npm Dependabot (no manifest yet).

**Workflow note:** infra-only change with no UI, so the feature-wrapup user-guide step is skipped; the architecture lesson is written directly.
