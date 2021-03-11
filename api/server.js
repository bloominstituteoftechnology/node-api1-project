// BUILD YOUR SERVER HERE

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { find, findById, insert, remove, update } = require('./users/model');

const server = express();

server.use(bodyParser.json());

server.post('/api/users', (req,res) => {
        if(!req.body.bio) {
            res.status(400).json({ message: "provide name and bio"});
            return
        }
        if(!req.body.name) {
            res.status(400).send({message: 'provide name and bio'});
            return
        }
        insert(req.body).then((data) => {
            res.status(201).json(data)
        })
});

server.get('/api/users', (req, res) => {
    find().then(data => {
        res.status(201).json(data);
        return
    })
});

server.get('/api/users/:id',(req,res) => {
    findById(req.params.id).then((data) => {
        if(!data) {
            res.status(404).json({message: 'does not exist'})
            return
        }
        res.status(201).json(data)
    })
})

server.delete('/api/users/:id', (req,res) => {
    findById(req.params.id).then(data => {
        if(!data) {
            res.status(404).json({message: 'does not exist'})
            return
        }
        res.status(500).json(data);
        remove(req.params.id)
    })
})

server.put('/api/users/:id', (req,res) => {
    if(!req.body.bio || !req.body.name) {
        res.status(400).json({message: 'provide name and bio'});
        return
    }
    findById(req.params.id).then(data => {
        if(!data) {
            res.status(404).json({message: 'does not exist'})
            return
        }

        update(req.params.id, req.body).then(data => {
            res.status(500).json(data);
        })
    })

})

module.exports={server};