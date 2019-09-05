require('dotenv/config');

const express = require('express');
const cors = require('cors');
const axios = require('axios');
const app = express();

app.use(cors());

app.get('/', (req, res) => {
    res.send('<h1>Hello World!</h1>');
});

app.get('/pc', (req, res) => {
    try {
        axios
            .get(`https://www.giantbomb.com/api/games/?api_key=${process.env.GIANTBOMB_API_KEY}&format=json`)
            .then(data => {
                res.status(200).send(data.data);
            })
            .catch(err => res.send(err));
    } catch (err) {
        console.error('GG', err);
    }
});

app.listen(process.env.PORT, () => console.log(`Example app listening on port ${process.env.PORT}!`));
