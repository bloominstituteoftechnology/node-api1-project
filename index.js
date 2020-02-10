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

server.get('/api/users/:id', (req, res) => {
    const {id} = req.params;
    Db.findById(id)
        .then(user => {
            res.status(200).json(user);
        })
        .catch(error => console.log(error))
})

server.post('/api/users', (req, res) => {
    const userInfo = req.body;
    Db.insert(userInfo)
        .then(user => {
            res.status(201).json(user);
        })
        .catch(error => console.log(error))
})

server.delete('/api/users/:id', (req, res) => {
    const {id} = req.params;
    Db.remove(id)
        .then(remove => {
            req.status(200).json(remove);
        })
        .catch(error => console.log(error))
})

server.put('/api/users/:id', (req, res) => {
    const {id} = req.params;
    Db.update(id)
        .then(user => {
            res.status(200).json(user);
        })
        .catch(error => console.log(error))
})


const port = 5000;
server.listen(port, () => console.log(`Server listening on port ${port}`));