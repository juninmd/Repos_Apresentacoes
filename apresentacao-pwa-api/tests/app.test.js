const request = require('supertest');
const fs = require('fs');
const path = require('path');
const os = require('os');
const { createApp } = require('../src/app');

describe('PWA Fatec API', () => {
    let tmpDir;
    let storePath;
    let app;

    beforeEach(() => {
        tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'pwa-api-test-'));
        storePath = path.join(tmpDir, 'vote.txt');
        app = createApp({ storePath });
    });

    afterEach(() => {
        if (fs.existsSync(tmpDir)) {
            fs.rmSync(tmpDir, { recursive: true, force: true });
        }
    });

    test('POST /vote com {"id":2} -> 200 e GET /vote contém {id:2, votes:1}', async () => {
        const postRes = await request(app)
            .post('/vote')
            .send({ id: 2 });

        expect(postRes.status).toBe(200);
        expect(postRes.body).toEqual({ message: 'Seu voto foi computado com sucesso.' });

        const getRes = await request(app).get('/vote');
        expect(getRes.status).toBe(200);
        expect(getRes.body).toEqual([{ id: 2, votes: 1 }]);
    });

    test('POST /vote com {"id":7} -> 400 Opção inválida.', async () => {
        const res = await request(app)
            .post('/vote')
            .send({ id: 7 });

        expect(res.status).toBe(400);
        expect(res.body).toEqual({ message: 'Opção inválida.' });
    });

    test.each([1.5, true, [2], null, 0, -1, 7, {}])('POST /vote com id %p -> 400 e nao grava voto', async (id) => {
        const res = await request(app)
            .post('/vote')
            .send({ id });

        expect(res.status).toBe(400);
        expect(res.body).toEqual({ message: 'Opção inválida.' });

        const getRes = await request(app).get('/vote');
        expect(getRes.body).toEqual([]);
    });

    test('POST /vote com id numérico em string ("2") conta como a opção 2', async () => {
        await request(app).post('/vote').send({ id: '2' });
        await request(app).post('/vote').send({ id: 2 });

        const getRes = await request(app).get('/vote');
        expect(getRes.body).toEqual([{ id: 2, votes: 2 }]);
    });

    test('dois votos na mesma opção somam 2', async () => {
        await request(app).post('/vote').send({ id: 2 });
        await request(app).post('/vote').send({ id: 2 });

        const getRes = await request(app).get('/vote');
        expect(getRes.status).toBe(200);
        expect(getRes.body).toEqual([{ id: 2, votes: 2 }]);
    });

    test('GET /reset apaga os votos', async () => {
        await request(app).post('/vote').send({ id: 2 });

        const resetRes = await request(app).get('/reset');
        expect(resetRes.status).toBe(200);
        expect(resetRes.body).toEqual({ status: 'ok' });

        const getRes = await request(app).get('/vote');
        expect(getRes.status).toBe(200);
        expect(getRes.body).toEqual([]);
    });

    test('corpo acima do limite -> 413 em JSON, sem gravar voto', async () => {
        const res = await request(app)
            .post('/vote')
            .send({ id: 2, lixo: 'x'.repeat(5000) });

        expect(res.status).toBe(413);
        expect(res.body).toEqual({ message: 'Corpo da requisição grande demais.' });
        expect((await request(app).get('/vote')).body).toEqual([]);
    });

    test('vote.txt corrompido -> 500 em JSON, preservado até o /reset', async () => {
        fs.writeFileSync(storePath, '{nao-e-json');

        const post = await request(app).post('/vote').send({ id: 1 });
        expect(post.status).toBe(500);
        expect(post.body.message).toMatch(/corrompido/);
        expect(fs.readFileSync(storePath, 'utf8')).toBe('{nao-e-json');

        expect((await request(app).get('/vote')).status).toBe(500);

        await request(app).get('/reset');
        expect((await request(app).post('/vote').send({ id: 1 })).status).toBe(200);
    });

    test('JSON inválido no corpo -> 400 em JSON', async () => {
        const res = await request(app).post('/vote').set('Content-Type', 'application/json').send('{oops');
        expect(res.status).toBe(400);
        expect(typeof res.body.message).toBe('string');
    });

    test('README documenta as rotas GET /vote e POST /vote que existem no app', async () => {
        const readmePath = path.join(__dirname, '..', '..', 'README.md');
        const readmeContent = fs.readFileSync(readmePath, 'utf-8');

        expect(readmeContent).toContain('POST /vote');
        expect(readmeContent).toContain('GET /vote');

        // Prova as rotas pelo comportamento HTTP, nao pela arvore interna do
        // Express: `app._router` deixou de existir no Express 5, entao ler
        // `_router.stack` quebrava o teste em qualquer upgrade de major.
        const postRes = await request(app).post('/vote').send({ id: 1 });
        const getRes = await request(app).get('/vote');

        expect(postRes.status).toBe(200);
        expect(getRes.status).toBe(200);
    });

    test('falha ao gravar não corrompe os votos já salvos', async () => {
        await request(app).post('/vote').send({ id: 2 });

        const realWrite = fs.writeFileSync;
        const spy = jest.spyOn(fs, 'writeFileSync').mockImplementation((file, data) => {
            realWrite(file, String(data).slice(0, 3)); // simula queda no meio da escrita
            throw new Error('disco cheio');
        });
        const failed = await request(app).post('/vote').send({ id: 2 });
        spy.mockRestore();

        expect(failed.status).toBe(500);
        const getRes = await request(app).get('/vote');
        expect(getRes.status).toBe(200);
        expect(getRes.body).toEqual([{ id: 2, votes: 1 }]);
        expect(fs.readdirSync(tmpDir)).toEqual(['vote.txt']);
    });
});
