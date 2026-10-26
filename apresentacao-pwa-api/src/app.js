const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');

// Aceita o inteiro JSON ou uma string só com dígitos (ex.: "2"); qualquer outra coisa vira NaN.
function normalizeId(raw) {
    if (typeof raw === 'string' && /^\d+$/.test(raw)) {
        return Number(raw);
    }
    return typeof raw === 'number' ? raw : NaN;
}

function createApp(options = {}) {
    const storePath = options.storePath || 'vote.txt';
    const app = express();

    app.use(cors());
    app.use(bodyParser.json({ limit: '500mb' }));
    app.use(bodyParser.urlencoded({ limit: '500mb', extended: true }));

    app.post('/vote', (req, res) => {
        const id = normalizeId(req.body && req.body.id);
        if (!Number.isInteger(id) || id < 1 || id > 6) {
            return res.status(400).send({ message: 'Opção inválida.' });
        }

        let json = {};

        if (fs.existsSync(storePath)) {
            json = JSON.parse(fs.readFileSync(storePath).toString());
        }

        if (json[`u${id}`] === undefined) {
            json[`u${id}`] = {
                id: id,
                votes: 0
            };
        }

        json[`u${id}`].votes = json[`u${id}`].votes + 1;

        fs.writeFileSync(storePath, JSON.stringify(json));

        return res.status(200).send({ message: 'Seu voto foi computado com sucesso.' });
    });

    app.get('/vote', (req, res) => {
        let json = {};

        if (fs.existsSync(storePath)) {
            json = JSON.parse(fs.readFileSync(storePath).toString());
        }

        const result = Object.values(json);
        return res.send(result);
    });

    app.get('/reset', (req, res) => {
        if (fs.existsSync(storePath)) {
            fs.unlinkSync(storePath);
        }
        return res.send({ status: 'ok' });
    });

    return app;
}

module.exports = { createApp };
