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

    test('README documenta as rotas GET /vote e POST /vote que existem no app', () => {
        const readmePath = path.join(__dirname, '..', '..', 'README.md');
        const readmeContent = fs.readFileSync(readmePath, 'utf-8');

        expect(readmeContent).toContain('POST /vote');
        expect(readmeContent).toContain('GET /vote');

        const routes = app._router.stack
            .filter(r => r.route)
            .map(r => ({
                path: r.route.path,
                methods: Object.keys(r.route.methods)
            }));

        const hasPostVote = routes.some(r => r.path === '/vote' && r.methods.includes('post'));
        const hasGetVote = routes.some(r => r.path === '/vote' && r.methods.includes('get'));

        expect(hasPostVote).toBe(true);
        expect(hasGetVote).toBe(true);
    });
});
