require('dotenv/config');

const express = require('express');
const cors = require('cors');
const axios = require('axios');
const app = express();

app.use(cors());

app.get('/', (req, res) => {
    res.send('<h1>Hello World!</h1>');
});

// app.get('/pc', (req, res) => {
//     try {
//         axios
//             .get(
//                 `https://www.giantbomb.com/api/games/?api_key=${process.env.GIANTBOMB_API_KEY}&format=json&platforms=`
//             )
//             .then(data => {
//                 res.status(200).send(data.data);
//             })
//             .catch(err => res.send(err));
//     } catch (err) {
//         console.error('GG', err);
//     }
// });

app.get('/pc', (req, res) => {
    axios({
        url: 'https://api-v3.igdb.com/games',
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'user-key': process.env.IGDB_API_KEY
        },
        data: `fields name, release_dates.*, status, first_release_date;
            where release_dates.platform = (6) & release_dates.y > 2019 & themes != (42);
            limit 50;`
    })
        .then(response => {
            res.status(200).send(response.data);
        })
        .catch(err => {
            console.error(err);
        });
});

app.listen(process.env.PORT, () => console.log(`Example app listening on port ${process.env.PORT}!`));
