const db = require('./data/db.js');
const http = require('http');
const express = require('express');
const server = express();

server.listen(4000, () => {
    console.log('=== server listening on port 4000 ===');
});

server.use(express.json());

server.get('/', (req, res) => {
    res.send('hello world...');
})

server.get('/api/users', (req, res) => {
    db.find()
        .then(users => {
            res.status(200).json(users);
        })
        .catch(err => {
            res.status(500).json({ success: false, errorMessage: "The users information could not be retrieved." });
        });
});

server.post('/api/users', (req, res) => {
    const userInfo = req.body;

    db.insert(userInfo)
        .then((user) => {
            res.status(201).json({ success: true, user });
        })
        .catch((err) => {
            res.status(500).json({ success: false, errorMessage: "There was an error while saving the user to the database" });
        });
});

server.get('/api/users/:id', (req, res) => {
    db.findById(req.params.id)
        .then(user => {
            if (user) {
                res.status(200).json({ success: true, user });
            } else {
                res.status(404).json({ success: false, message: "The user with the specified ID does not exist." });
            }
        })
        .catch(err => {
            res.status(500).json({ success: false, errorMessage: "The user information could not be retrieved." });
        });
});

server.delete('/api/users/:id', (req, res) => {
    const { id } = req.params;

    db.remove(id)
        .then(deletedUser => {
            if (deletedUser) {
                res.status(204).end();
            } else {
                res.status(404).json({ message: "The user with the specified ID does not exist." });
            }
        })
        .catch(err => {
            res.status(500).json({ success: false, errorMessage: "The user could not be removed" });
        });
});

server.put('/api/users/:id', (req, res) => {
    const id = req.params.id;
    const userInfo = req.body;

    db.update(id, userInfo)
        .then(user => {
            if (user) {
                res.status(200).json({ success: true, user });
            } else {
                res.status(404).json({ success: false, message: "The user with the specified ID does not exist." });
            }
        })
        .catch(err => {
            res.status(500).json({ success: false, errorMessage: "The user information could not be modified." });
        });
});
