const express = require('express');
const shortid = require('shortid');

const server = express();

let users = [];

// Create 
// Read 
// Update 
// Delete
// CRUD

// GET /

server.use(express.json());

// Create
server.post('/api/users', (req, res) => {
    const userInfo = req.body;
    userInfo.id = shortid.generate();
    users.push(userInfo);
    if(userInfo.name === undefined || userInfo.bio === undefined) {
        res.status(400).json({errorMessage: 'Please provide name and bio for the user.'})
    } else if (users === undefined){
        res.status(500).json({errorMessage: 'There was an error saving the user.'})
    } else {
        res.status(201).json(userInfo);
    }
});

// Read

server.get('/api/users', (req, res) => {
    if(users === undefined) {
        res.status(500).json({errorMessage: 'The users information could not be retrieved.'})
    } else {
        res.json(users)
    }
})

server.get('/api/users/:id', (req, res) => {
    const { id } = req.params;

    let found = users.find(user => user.id === id);

    if(found){
        res.status(200).json(found)
    } else if (found === undefined){
        res.status(500).json({errorMessage: 'The user information could not be retrieved.'})
    } else {
        res.status(404).json({message: 'The user with the specified ID does not exist.'})
    }
})

// Update - replace
server.put('/api/users/:id', (req, res) => {
    const { id } = req.params;
    const changes = req.body;
    changes.id = id;

    let index = hubs.findIndex(hub => hub.id === id);

    if(index !== -1) {
        hubs[index] = changes;
        res.status(200).json(hubs[index]);
    } else if (changes.name === undefined || changes.bio === undefined){
        res.status(400).json({errorMessage: 'Please provide name and bio for the user.'})
    } else if (hubs[index] === undefined) {
        res.status(500).json({errorMessage: 'The user information could not be modified.'})
    } else {
        res.status(400).json({message: 'The user with the specified ID does not exist.'})
    }
});

// Delete 

server.delete('/api/users/:id', (req, res) => {
    const { id } = req.params; 

    const deleted = users.find(user => user.id === id);

    if(deleted) {
        users = users.filter(user => user.id !== id)
        res.status(200).json(deleted);
    } else if (deleted === undefined){
        res.status(500).json({errorMessage: 'The user could not be removed.'});
    } else {
        res.status(404).json({message: 'The user with the specified ID does not exist.'});
    }
})

const PORT = 5000;
server.listen(PORT, () => {
    console.log('listening on localhost:', PORT);
});

