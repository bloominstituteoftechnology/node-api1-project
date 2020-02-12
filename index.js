// implement your API here
const express = require('express');
const dataBase = require('./data/db.js');

const server = express();
server.use(express.json());

server.get('/api/users', (req, res) => {
    dataBase.find(req.query)
    .then(db => {
        res.status(200).json(db);
    })
    .catch(error => {
        res.status(500).json({ message: "The users information could not be retrieved"});
    });
});

server.get('/api/users/:id', (req, res) => {
    const id = req.params.id;

    dataBase.findById(id)
    .then(user => {
        if(user) {
            res.status(200).json(user);
        } else {
            res.status(404).json({ message: "The user with the specified ID does not exist"});
        }
    });
});

server.post("/api/users", (req, res) => {
    const name = req.body.name;
    const bio = req.body.bio;

    if(!name || !bio){
        res.sendStatus(400).json({ message: "Please provide name and bio for the user"});
    } else {
        dataBase.insert(req.body)
        .then(user => {
            res.status(201).json(user);
        })
        .catch(error => {
            res.status(500).json({ message: "There was an error while saving the user to the database"});
        });
    } 
});

server.put("/api/users/:id", (req, res) => {
    const id = req.params.id;
    const name = req.body.name;
    const bio = req.body.bio;
    const changes = req.body

    if(!id) {
        res.sendStatus(404).json({ message: "The user with the specified ID does not exist"});
    } else if(!name || !bio) {
        res.send(400).json({ message: "Please provide name and bio for the user"});
    } else {
        dataBase.insert(changes)
        .then(update => {
            res.status(200).json(update);
        })
        .catch(error => {
            res.data(500).json({ message: "The user information could not be modified"});
        });
    }
});

server.delete("/api/users/:id", (req, res) => {
    const id = req.params.id;
    if(!id){
        res.sendStatus(404).json({ message: "The user with specified ID does not exist"});
    } else {
        dataBase.remove(id)
        .then(user => {
            res.status(200).json({ message: "The user has been deleted"});
        });
    }    
});


const port = 4500;
server.listen(port, () => {
    console.log(`Server is listening on ${port}`);
});