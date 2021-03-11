// import data
const User = require('./users/model.js');
// instantiate express
const express = require('express');

// server using express instance
const server = express();
// middleware for converting input to JSON format
server.use(express.json());

server.get('/', (req, res) => {
    res.send({message: "Welcome to Users API !"})
});

server.post('/api/users', async (req, res) => {
    const user = req.body;

    if (!user.name || !user.bio) {
        res.status(400).json({message: "Please provide name and bio for the user"})
    } else {
        try {
            const newUser = await User.insert(user);
            res.status(201).json(newUser);
        } catch (err) {
            res.status(500).json({message: "There was an error while saving the user to the database"})
        }
    }
});

server.get('/api/users', async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users)
    } catch (err) {
        res.status(500).json({ message: "The users information could not be retrieved" });
    }
});

server.get('/api/users/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const user = await User.findById(id);
        if (user) {
            res.status(200).json(user)
        } else {
            res.status(404).json({message: `User with specified id "${id}" unknown`})
        }
    } catch (err) {
        res.status(500).json({message: "The user information could not be retrieved"})
    }
});

server.delete('/api/users/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const user = await User.remove(id);
        if (user) {
            res.status(200).json(user)
        } else {
            res.status(404).json({message: "The user with the specified ID does not exist"})
        }
    } catch (err) {
        res.status(500).json({message: "The user could not be removed"})
    }
});

server.put('api/users/:id', async (req, res) => {
    const { id } = req.params;
    const changes = req.body;
    
    // validate body
    if (!changes.name || !changes.bio) {
        res.status(400).json({message: "Please provide name and bio for the user"});
    } else {
        // has req.body, try DB
        try {
            const updateUser = await User.update(id, changes);
            if (updateUser) {
                // id exists, respond status 200 and return updated user object
                res.status(200).json(updateUser)
            } else {
                res.status(404).json({message: "The user with the specified ID does not exist"})
            }
        } catch (err) {
            // error updating DB
            res.status(500).json({ message: "The user information could not be modified"})
        }
    }
})




module.exports = server; 
