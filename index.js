// implement your API here
const express = require('express');
const db = require('./data/db');

const server = express();

server.listen(4000, () => {
    console.log('*** listening on port 4000');
});

server.use(express.json());

server.get('/', (req, res) => {
    res.send('Hello World!');
});

server.get('/api/users', (req, res) => {
    db.find()
        .then(users => {
            res.status(200).json(users);
        })
        .catch(err => {
            res.status(500).json({ errorMessage: "The users information could not be retrieved.", err })
        });
});

server.get('/api/users/:id', (req, res) => {
    const { id } = req.params;

    db.findById(id)
        .then(user => {
            if (user) {
                res.status(200).json(user);
            } else {
                res.status(404).json({ message: "The user with the specified ID does not exist." });
            }
        })
        .catch(err => {
            res.status(500).json({ errorMessage: "The users information could not be retrieved.", err })
        });
});

server.post('/api/users', (req, res) => {
    const userinfo = req.body;

    db.insert(userinfo)
        .then(info => {
            if (info) {
                res.status(201).json(userinfo);
            } else {
                res.status(400).json({ errorMessage: "Please provide name and bio for the user." });
            };
        })
        .catch(err => {
            res.status(500).json({ errorMessage: "There was an error while saving the user to the database" }, err);
        });
});

server.delete('/api/users/:id', (req, res) => {
    const { id } = req.params;

    db.remove(id)
        .then(deleted => {
            if(deleted) {
                res.status(204).end();
            } else {
                res.status(404).json( { message: "The user with the specified ID does not exist." } );
            }
        })
        .catch(err => {
            res.status(500).json({ errorMessage: "The user could not be removed" }, err);
        });
});

server.put('/api/users/:id', (req, res) => {
    const { id } = req.params;
    const stuff = req.body;

    db.update(id, stuff)
        .then(updated => {
            if(updated) {
                res.status(200).json(stuff);
            } else if (updated) {
                res.status(400).json({ errorMessage: "Please provide name and bio for the user." });
            } else {
                res.status(404).json({ message: "The user with the specified ID does not exist." });
            }
        })
        .catch(err => {
            res.status(500).json({ errorMessage: "The user information could not be modified." }, err);
        })
});