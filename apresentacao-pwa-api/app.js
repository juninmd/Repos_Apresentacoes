const app = require('express')();
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');

app.use(cors());
app.use(bodyParser.json({ limit: '500mb' }));
app.use(bodyParser.urlencoded({ limit: '500mb', extended: true }));


app.post('/vote', (req, res, next) => {

    if (!(req.body.id >= 1 && req.body.id <= 6)) {
        return res.status(400).send({ message: 'Opção inválida.' });
    }

    let json = {};

    if (fs.existsSync('vote.txt')) {
        json = JSON.parse(fs.readFileSync('vote.txt').toString());
    }

    if (json[`u${req.body.id}`] === undefined) {
        json[`u${req.body.id}`] = {
            id: req.body.id,
            votes: 0
        }
    };

    json[`u${req.body.id}`].votes = json[`u${req.body.id}`].votes + 1;

    fs.writeFileSync('vote.txt', JSON.stringify(json));

    return res.status(200).send({ message: 'Seu voto foi computado com sucesso.' });
})

app.get('/vote', (req, res, next) => {

    let json = {};

    if (fs.existsSync('vote.txt')) {
        json = JSON.parse(fs.readFileSync('vote.txt').toString());
    }

    const result = Object.values(json);
    return res.send(result);
})

app.get('/reset', (req, res, next) => {
    if (fs.existsSync('vote.txt')) {
        fs.unlinkSync('vote.txt');
    }
    return res.send({ status: 'ok' });
})

app.listen(process.env.PORT || 8050);