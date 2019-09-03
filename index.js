// implement your API here

const express = require('express');
const dataB = require('./data/db.js');
const server = express();

server.use(express.json());

server.get('/', (req, res) => {
    res.send('hello web 21');
});

const port = 5000;
server.listen(port, () => console.log('api running'));
