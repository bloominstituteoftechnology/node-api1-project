// implement your API here
const express = require('express');
const Users = require('./data/db');

const server = express();

server.use(express.json());

server.get('/', (req, res) => {
    res.json({ hello: 'App'})
})

// view a list of hubs
server.get('/api/users', (req, res) => {
    // got and get the hubs from the database
    Users.find().then(hubs => {
        res.status(200).json(hubs);
    }).catch(err => {
        console.log(err);
        res.status(500).json({ errorMessage: 'oops'})
    });
})

// add a hub
server.post('/api/users', (req, res) => {
    const hubInfo = req.body;

    Users.add(hubInfo)
        .then(hub => {  
            res.status(201).json(hub);
        }).catch(err => {
            console.log(err);
            res.status(500).json({ errorMessage: 'oops'})
        })
})

// delete
server.delete('/api/hubs/:id', (req, res) => {
    const { id } = req.params;

    Hubs.remove(id).then(removed => {
        res.status(200).json(removed);
    }).catch(err => {
        console.log(err);
        res.status(500).json({ errorMessage: 'oops'})
    })
})

const port = 5000;
server.listen(port, () => console.log(`\n** API on port ${port} \n`));
