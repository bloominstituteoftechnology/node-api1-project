// implement your API here
const db = require('./data/db.js');

const express = require('express');

const server = express();

server.listen(5000, () => {
    console.log('=== server listening on port 5000 ===');
});

server.get('/', (req, res) => {
    res.send('Hello World..')
})