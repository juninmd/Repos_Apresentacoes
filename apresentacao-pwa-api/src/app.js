const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
const crypto = require('crypto');

// Aceita o inteiro JSON ou uma string só com dígitos (ex.: "2"); qualquer outra coisa vira NaN.
function normalizeId(raw) {
    if (typeof raw === 'string' && /^\d+$/.test(raw)) {
        return Number(raw);
    }
    return typeof raw === 'number' ? raw : NaN;
}

// Um voto cabe em poucos bytes; 500mb deixava qualquer cliente estourar a memória do processo.
const BODY_LIMIT = '1kb';

function readStore(storePath) {
    if (!fs.existsSync(storePath)) {
        return {};
    }
    try {
        return JSON.parse(fs.readFileSync(storePath).toString());
    } catch {
        const error = new Error('Armazenamento de votos corrompido; chame POST /reset (com ADMIN_TOKEN) para recriá-lo.');
        error.status = 500;
        throw error;
    }
}

// Write to a sibling file and rename: a crash mid-write must not leave a truncated store behind.
function writeStore(storePath, json) {
    const tmpPath = `${storePath}.${process.pid}.tmp`;
    try {
        fs.writeFileSync(tmpPath, JSON.stringify(json));
        fs.renameSync(tmpPath, storePath);
    } catch (err) {
        fs.rmSync(tmpPath, { force: true });
        throw err;
    }
}

// Hash both sides so timingSafeEqual never throws on different lengths.
function tokenMatches(given, expected) {
    const digest = (v) => crypto.createHash('sha256').update(v).digest();
    return crypto.timingSafeEqual(digest(given), digest(expected));
}

function requireAdmin(adminToken) {
    return (req, res, next) => {
        if (!adminToken) {
            return res.status(503).send({ message: 'Reset desabilitado: defina ADMIN_TOKEN.' });
        }
        const [scheme, token] = (req.get('authorization') || '').split(' ');
        if (scheme !== 'Bearer' || !token || !tokenMatches(token, adminToken)) {
            return res.status(401).send({ message: 'Não autorizado.' });
        }
        return next();
    };
}

function createApp(options = {}) {
    const storePath = options.storePath || 'vote.txt';
    const adminToken = options.adminToken ?? process.env.ADMIN_TOKEN;
    const app = express();

    // CORS só na votação pública; o reset administrativo não aceita chamadas de outras origens.
    app.use('/vote', cors());
    app.use(bodyParser.json({ limit: BODY_LIMIT }));
    app.use(bodyParser.urlencoded({ limit: BODY_LIMIT, extended: true }));

    app.post('/vote', (req, res) => {
        const id = normalizeId(req.body && req.body.id);
        if (!Number.isInteger(id) || id < 1 || id > 6) {
            return res.status(400).send({ message: 'Opção inválida.' });
        }

        const json = readStore(storePath);

        if (json[`u${id}`] === undefined) {
            json[`u${id}`] = {
                id: id,
                votes: 0
            };
        }

        json[`u${id}`].votes = json[`u${id}`].votes + 1;

        writeStore(storePath, json);

        return res.status(200).send({ message: 'Seu voto foi computado com sucesso.' });
    });

    app.get('/vote', (req, res) => {
        const json = readStore(storePath);
        const result = Object.values(json);
        return res.send(result);
    });

    // GET destrutivo podia ser disparado por qualquer link ou <img>; agora é POST autenticado.
    app.get('/reset', (req, res) => res.status(405).set('Allow', 'POST').send({ message: 'Use POST /reset com Authorization: Bearer <ADMIN_TOKEN>.' }));

    app.post('/reset', requireAdmin(adminToken), (req, res) => {
        if (fs.existsSync(storePath)) {
            fs.unlinkSync(storePath);
        }
        return res.send({ status: 'ok' });
    });

    // Erros do body-parser (JSON inválido, corpo grande demais) e do armazenamento viram JSON, não HTML.
    // eslint-disable-next-line no-unused-vars
    app.use((err, req, res, next) => {
        const status = err.status || err.statusCode || 500;
        const message = status === 413 ? 'Corpo da requisição grande demais.' : err.message;
        return res.status(status).send({ message });
    });

    return app;
}

module.exports = { createApp };
