# apresentacao-pwa-api

API de votação usada na demo da apresentação de PWA (`../apresentacao-pwa`). Express 5, sem banco: os votos ficam em `vote.txt`.

## Como rodar

Requer Node.js 22.

```bash
npm install
npm start      # http://localhost:8050 (ou PORT)
npm test       # jest + supertest
```

## Rotas

| Rota | Efeito |
|---|---|
| `POST /vote` com `{"id": 1..6}` | soma um voto; `id` inválido retorna 400 `Opção inválida.` |
| `GET /vote` | lista as opções votadas (`id`, `votes`) |
| `POST /reset` com `Authorization: Bearer $ADMIN_TOKEN` | apaga os votos (401 sem token válido, 503 se `ADMIN_TOKEN` não estiver definido; `GET /reset` responde 405) |

Corpo da requisição limitado a 1 kb (413 acima disso). Se `vote.txt` estiver corrompido, `POST`/`GET /vote` respondem 500 e `POST /reset` recria o armazenamento.

## Estrutura

- `server.js`: sobe o servidor (`PORT`, padrão 8050); o `Procfile` aponta para ele.
- `src/app.js`: `createApp({ storePath, adminToken })`, usado também pelos testes.
- `tests/app.test.js`: testes das rotas.

> A votação não tem autenticação nem rate limit: só para demonstração, não para produção.
