const express = require('express');

const server = express();

const Hubs = require('./data/db.js');

server.use(express.json());

server.get('/api/users', (req, res) => {
    Hubs.find()
    .then(hubs => {
        res.status(200).json(hubs)
    })
    .catch(err => {
        res.status(500).json({ errorMessage: "The users information could not be retrieved." })
    })
});

server.get('/api/users/:id', (req, res) => {
    const id = req.params.id;
    Hubs.findById(id)
    .then(user => {
        console.log(user)
        if(user === undefined){
            res.status(404).json({ message: "The user with the specified ID does not exist." })
        } else {
            res.status(200).json(user)
        }
    })
    .catch(err => {
        res.status(500).json({ errorMessage: "The user information could not be retrieved." })
    })
});

server.post('/api/users', (req, res) => {
    const hubData = req.body;
    Hubs.insert(hubData)
    .then(user => {
        if(req.body.name === ""){
            res.status(400).json({ errorMessage: "Please provide name and bio for the user." })
        }else if(req.body.bio === ""){
            res.status(400).json({ errorMessage: "Please provide name and bio for the user." })
        }else{
            res.status(201).json(user)
        }
    })
    .catch(err => {
        res.status(500).json({ errorMessage: "There was an error while saving the user to the database"})
    })
});

server.delete('/api/users/:id', (req, res) => {
    const id = req.params.id;
    Hubs.remove(id)
    .then(user => {
        if(user === undefined) {
            res.status(404).json({ message: "The user with the specified ID does not exist." })
        }else{
            res.status(204).end()
        }
    })
    .catch(err => {
        res.status(500).json({ errorMessage: "The user could not be removed" })
    })
});

server.put('/api/users/:id', (req, res) => {
    const id = req.params.id;
    const hubData = req.body;
    Hubs.update(id, hubData)
    .then(updated => {
        console.log(updated)
        if(updated === 0){
            res.status(404).json({ message: "The user with the specified ID does not exist." })
        }else if(req.body.name === ""){
            res.status(400).json({ errorMessage: "Please provide name and bio for the user." })
        }else if(req.body.bio === ""){
            res.status(400).json({ errorMessage: "Please provide name and bio for the user." })
        }else{
            res.status(200).json(updated)
        }
        
    })
    .catch(err => {
        res.status(500).json({ errorMessage: "The user information could not be modified." })
    })
})

const port = process.env.PORT || 8000;
server.listen(port, () => console.log(`Server listening on port: ${port}`))