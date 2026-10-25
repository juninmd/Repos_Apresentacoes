# AGENTS.md - Repos Apresentacoes

## Tech Stack
- **Format:** PowerPoint (.pptx), Markdown
- **Topics:** Hybrid development, PWA, Rust, Azure

## Project Structure
```
apresentacao-desenvolvimento-hibrido/   # Hybrid development slides
apresentacao-global-azure-pwa/          # Azure + PWA slides
apresentacao-pwa-api/                   # PWA API slides
apresentacao-pwa/                       # PWA slides
apresentacao-rust-lang/                 # Rust language slides
```

## Notes
- Collection of presentation repositories
- Each subdirectory is a standalone presentation project
- Contains slides, code samples, and related resources

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