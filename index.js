// implement your API here
const http = require('http'); // this is the http method from Node.js
const express = require('express');
const hostname = '127.0.0.1'; //Always use the same number, localhost doesn't change
const port = 3000;


// Hubs pulling the data from db.js
const Hubs = require('./data/db.js');

const server = express();

server.use(express.json());

// create user POST/api/user
server.post(`/api/users`, (req, res) => {
    Hubs.insert(req.body)
    .then(user => {
        res.status(201).json(user);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            message: 'Error adding the hub',
        });
    });
});

// get user info GET /api/user
server.get(`/api/users`, (req, res) => {
    Hubs.find(req.query)
    .then( users => {
        res.status(200).json(users)
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            errorMessage: 'Error retrieving the users',
        });
    });
});

// returns specified ID with user info GET/api/user/:id
server.get(`api/users/:id`, (req, res) => {
    const { id } = req.params
    Hubs.findById(id)
    .then(user => {
        if (user) {
            res.status(200).json(user);
        } else {
            res.status(404).json({ message: 'user not found'});
        }
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            message: 'Err retrieving user ID',
        });
    });
});

// deletes user DELETE/api/user/:id
server.delete('/api/users/:id', (req, res) => {
    const { id } = req.params
    Hubs.remove(id)
    .then(count => {
        if (count > 0) {
            res.status(200).json({ message: 'user deleted' });
        } else {
            res.status(404).json({ message: 'User not found'});
        }
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            message: 'Error while deleting user',
        });
    });
});


// Updates user with id PUT/api/user/:id
server.put('/api/users/:id', (req, res) => {
    const changes = req.body;
    const { id } = req.params;
    Hubs.update(id, changes)
    .then(user => {
        if (user) {
            res.status(200).json(user);
        } else {
            res.status(404).json({ message: 'user not found'})
        }
    })
    .catch (err => {
        console.log(err);
        res.status(500).json({
            message: 'err updating the user'
        });
    });
});


// last thing to do that will render everything to the localhost:3000
// Listening for changes in the server
server.listen(port, () => {
    // now we are watching for connections on the port, given the port and hostname
    console.log(`\n Server is running at http://${port}/ \n`);
});