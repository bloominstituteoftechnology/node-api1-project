const express = require('express');

const Db = require('./data/db');

const server = express();

server.use(express.json());

server.get('/', (req, res) => {
    res.json({response: 'Hello world!!'})
})

server.get('/api/users', (req, res) => {
    Db.find()
        .then(users => {
            res.status(200).json(users)
        })
        .catch(error => console.log(error))
})

const port = 5000;
server.listen(port, () => console.log(`Server listening on port ${port}`));