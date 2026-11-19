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
| `GET /reset` | apaga os votos |

Corpo da requisição limitado a 1 kb (413 acima disso). Se `vote.txt` estiver corrompido, `POST`/`GET /vote` respondem 500 e `GET /reset` recria o armazenamento.

## Estrutura

- `server.js`: sobe o servidor (`PORT`, padrão 8050); o `Procfile` aponta para ele.
- `src/app.js`: `createApp({ storePath })`, usado também pelos testes.
- `tests/app.test.js`: testes das rotas.

> Sem autenticação e com `GET /reset` aberto: só para demonstração, não para produção.
