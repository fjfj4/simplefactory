## What & why

<!-- 2–4 sentences: what changes for the user or the system, and why. Link the spec in docs/superpowers/specs/. -->

## See it

<!-- Show, don't tell. Delete the sections that don't apply, but every PR should keep at least one visual. -->

### UI (before → after)

<!-- Screenshots from docs/user-guide/media/<feature>/ (produced by feature-wrapup).
     PR descriptions need absolute URLs:
     ![Alt](https://github.com/fjfj4/simplefactory/blob/<branch>/docs/user-guide/media/<feature>/01-x.png?raw=true) -->

| Before | After |
|---|---|
| | |

▶ [Watch the video](<link to .webm on the branch>)

### Flow

```mermaid
flowchart LR
  A[User action] --> B[Component] --> C[(Data)]
```

### Database changes

<!-- Changed entities only. Mark new fields with a comment. Link the migration file. -->

```mermaid
erDiagram
  TABLE_A ||--o{ TABLE_B : has
```

Migration: `<path>` · Reversible: yes/no · Backfill needed: yes/no

### Architecture

<!-- Link the lesson from docs/architecture/ if feature-wrapup wrote one, and paste its main diagram. -->

## Security review

<!-- Result of /security-review. List any finding not fixed, with a one-line reason. -->

## How to test

1.
