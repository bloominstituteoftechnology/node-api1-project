// implement your API here
const express = require('express');

const db = require('./data/db.js');

const server = express();

server.listen(4000, () => {
    console.log('server listening on port 4000...');
});

server.use(express.json());

server.get('/', (req, res) => {
    res.send('Hello beautiful!')
});

//When the client makes a GET request to /api/users
//Return an array users.
server.get('/api/users', (req, res) => {
    db.find()
        .then(user => {
            res.status(200).json({user})
        })
        .catch(err => {
            res.status(500).json({success:false, err});
        });
});