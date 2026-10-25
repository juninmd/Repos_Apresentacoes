# Project Health

This document records the repository improvement pass applied on 2026-05-17.

## Detected Surface

- GitHub Actions
- Node.js / npm (`/apresentacao-pwa-api`)

## Automation Added Or Confirmed

- Security policy: Already present before this pass.
- Dependabot: Configured in `.github/dependabot.yml` (monitoring `github-actions` at root and `npm` at `/apresentacao-pwa-api`).
- EditorConfig: Already present before this pass.
- Project Health workflow: Existing workflows present and updated.
- Pull request quality checklist: Added in this pass.

## Security Scan Scope (`.github/workflows/security.yml`)

- **Triggers**: Executed on `push` to main/master and on all `pull_request` events to detect potential secret leaks before PRs are merged into the repository history.
- **Engine**: Gitleaks secret detection via reusable workflow `juninmd/base-actions/.github/workflows/reusable-security-scan.yml`.
- **Permissions**: Restricted to minimal `contents: read` top-level scope.
- **Concurrency**: Grouped by ref (`security-${{ github.ref }}`) with `cancel-in-progress: true` to optimize workflow runs.
- **Supply Chain Hardening**: All action dependencies across workflows are pinned to 40-character commit SHAs.

## Available Root Commands

- No root package scripts detected.

## Improvement Plan

1. Keep dependency drift visible through weekly Dependabot pull requests.
2. Keep runtime secrets out of git through the Project Health guardrail.
3. Use .editorconfig to reduce formatting churn across agents and local editors.
4. Treat this file as the lightweight audit entry for future improvements.

## Suggested Next Improvements

- Add project-specific tests to the Project Health workflow once the default branch is stable.
- Add CodeQL or language-native security scanning where the repository has a supported build path.
- Convert manual setup notes into reproducible scripts when setup steps are repeated.
- Add structured logging and health endpoints to service repositories that expose long-running APIs.
