// implement your API here

const express = require('express');
const db = require('./data/db');
const server = express();
const port = 4000;

server.use(express.json());

server.get('/', (req, res) => {});

server.listen(port, () => console.log(`\n***Server running on port ${port}***\n`));