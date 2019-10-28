// implement your API here
const express = require('express');
const db = require('./data/db.js');

const server = express();

//middleware
const port = 5000
server.listen(port, () => console.log('\n RUNNING ON 5000 SERVER \n'))

server.use(express.json());

server.get('/', (req, res) => {
    db.find()
        .then(users => res.status(200).json(users))
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: "the user info requested cannot be retrieved." });
        });
});

server.post('/users', (req, res) => {
    console.log(req.body);
    const { name, bio } = req.body;
    if (!name || !bio) {
        res.status(400).json({ errorMessage: "Please provide name and bio for the user." });
    }
    db.insert({ name, bio })
        .then(({ id }) => {
            db.findById(id)
                .then(user => {
                    res.status(201).json(user);
                })
                .catch(err => {
                    console.log(err);
                    res.status(500).json({ error: "There was an error while saving the user to the database" });
                });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: "server error inserting user" });
        });
});

server.get('/users/:id', (req, res) => {
    const { id } = req.params;
    db.findById(id)
        .then(user => {
            console.log("user", user);
            if (user) {
                res.status(200).json(user);
            } else {
                res.status(404).json({ message: "The user with the specified ID does not exist." });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: "The user information could not be retrieved." });
        });
});

server.delete('/users/:id', (req, res) => {
    const { id } = req.params;
    db.remove(id)
        .then(deleted => {
            console.log(deleted);
            if (deleted) {
                res.status(404).end();
            } else {
                res.status(404).json({ message: "The user with the specified ID does not exist." });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: "The user could not be removed" });
        });
});

server.put('/users/:id', (req, res) => {
    const { id } = req.params;
    const { name, bio } = req.body;
    if (!name && !bio) {
        res.status(400).json({ errorMessage: "Please provide name and bio for the user." });
    }
    db.update(id, { name, bio })
        .then(updated => {
            if (updated) {
                db.findById(id)
                    .then(user => res.status(200).json(user))
                    .catch(err => {
                        console.log(err);
                        res.status(500).json({ error: "The user information could not be modified." });
                    });
            } else {
                res.status(404).json({ message: "The user with the specified ID does not exist." });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: 'Error updating user' });
        });
});

