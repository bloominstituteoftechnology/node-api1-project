// BUILD YOUR SERVER HERE

const express = require('express');
const cors = require('cors');
const users = require('./users/model');

// INSTANCE OF EXPRESS APP

const server = express();

// GLOBAL MIDDLEWARE

server.use(express.json());
server.use(cors());

// ENDPOINTS

// server.get('/hello', (req, res) => {
//     res.json({ message: 'hello' });
// });

// GET	/api/users	Returns an array users.

server.get('/api/users', (req, res) => {
    users.find()
        .then(users => {
            res.json(users);
        })
        .catch(err => {
            res.status(500).json({
                message: 'error getting all users',
                error: err.message
            });
        });
});

// GET	/api/users/:id	Returns the user object with the specified id.

server.get('/api/users/:id', (req, res) => {
    users.findById(req.params.id)
        .then(user => {
            res.json(user);
        })
        .catch(err => {
            res.status(500).json({
                message: 'error getting user by id',
                error: err.message
            });
        });
});

// POST	/api/users	Creates a user using the information sent inside the request body.

server.post('/api/users', async (req, res) => {
    try {
        if (!req.body.name || !req.body.bio) {
            res.status(400).json({
                message: 'name and bio are required'
            });
        }
        else {
            const newUser = await users.insert(req.body);
            res.status(201).json(newUser);
        }
    }
    catch (err) {
        res.status(500).json({
            message: 'error posting new user',
            error: err.message
        });
    }
//     users.insert(req.body)
//         .then(user => {
//             res.status(201).json(user);
//         })
//         .catch(err => {
//             res.status(500).json({
//                 message: 'error posting a new user',
//                 error: err.message
//             });
//         });
});

// PUT	/api/users/:id	Updates the user with the specified id using data from the request body. Returns the modified user

server.put('/api/users/:id', async (req, res) => {
    const { id } = req.params;
    const { body } = req;
    try {
        const updated = await users.update(id, body);
        if (!updated) {
            res.status(404).json({
                message: `user by id ${id} does not exist`
            });
        }
        else {
            res.json(updated);
        }
    }
    catch (err) {
        res.status(500).json({
            message: 'error updating existing user',
            error: err.message
        });
    }
});

// DELETE	/api/users/:id	Removes the user with the specified id and returns the deleted user.

server.delete('/api/users/:id', (req, res) => {
    const { id } = req.params;
    users.remove(id)
        .then(deletedUser => {
            if (!deletedUser) {
                res.status(404).json({
                    message: `user by id ${id} does not exist`
                });
            }
            else {
                res.json(deletedUser);
            }
        })
        .catch(err => {
            res.status(500).json({
                message: 'error deleting user',
                error: err.message
            });
        });
});

module.exports = server; // EXPORT YOUR SERVER instead of {}
