# AGENTS.md

Coleção de repositórios de apresentações técnicas (slides `.pptx` + recursos). Só a pasta `apresentacao-pwa-api/` tem código executável.

## Stack

- Slides: PowerPoint (`.pptx`), Markdown
- API (`apresentacao-pwa-api/`): Node.js 22, Express 5, Jest + supertest

## Commands

- Test API: `cd apresentacao-pwa-api && npm ci && npm test`
- Start API: `cd apresentacao-pwa-api && npm start` (porta `PORT`, padrão 8050)
- Lint/typecheck: none in this repo (validate runs the reusable base-actions workflow)

## Structure

- `apresentacao-desenvolvimento-hibrido/` — slides de desenvolvimento híbrido (Ionic)
- `apresentacao-global-azure-pwa/` — slides Global Azure + PWA
- `apresentacao-pwa/` — slides de PWA
- `apresentacao-pwa-api/` — API de votação da demo (`server.js`, `src/app.js`, `tests/`)
- `apresentacao-rust-lang/` — slides de Rust
- `apresentacao-ecmascript-2019/` — slides de ECMAScript 2019
- `.github/` — workflows, template de PR, assets do README

Cada subpasta de apresentação tem seu próprio `AGENTS.md` e `README.md`.

## Conventions

- Branch padrão: `master`.
- PR: siga `.github/pull_request_template.md`.
- CI: `test.yml` roda `npm test` da API; `validate.yml` usa o workflow reutilizável `juninmd/base-actions`; também há `sast.yml` e `security.yml`.
- Actions internas: referencie `juninmd/base-actions` por branch, nunca por SHA.

## Gotchas

- Os `.pptx` chegam a 60 MB. Para clonar só o necessário use `git clone --filter=blob:none --sparse`.
- `PORT` é a única env var da API (opcional).
- Não há versões PDF dos slides: edite o `.pptx` original.

<!-- base-actions-main-policy -->
## GitHub Actions — padrão obrigatório (@main)

- Referencie as actions internas sempre pelo branch, nunca por SHA:
  - `uses: juninmd/base-actions/<action>@main`
  - `uses: juninmd/base-actions/.github/workflows/<arquivo>.yml@main`
- Não fixe `@<sha>` em `juninmd/base-actions`: a atualização é centralizada no
  `main` e passa a valer no próximo run.
- PRs cujos checks não iniciam por billing/spending limit são mesclados pelo bot central
  `juninmd/base-actions/.github/workflows/auto-merge-billing-blocked.yml`.
  Para impedir o merge automático de um PR, aplique a label `do-not-merge`.
