// BUILD YOUR SERVER HERE
const express = require('express');

const server = express();
const users = require('./users/model.js')

server.use(express.json());


// *** GET REQUESTS ***
server.get('/', (req, res) => {
    res.json({ hello: "Lambda Grader" });
})

// All Users
server.get('/api/users', async (req, res) => {
    try {
        const userList = await users.find();
        res.json(userList);
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: "The users information could not be retrieved" })
    }
})

// Users By Id
server.get('/api/users/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const user = await users.findById(id)
        res.json(user);
    } catch (err) {
        console.log(err)
        res.status(404).json({ message: "The user with the specified ID does not exist" })
    }
})

// *** POST REQUESTS ***

server.post('/api/users', async (req, res) => {
    const user = req.body;
    console.log(user)

    if (!user.name || !user.bio) {
        res.status(400).json({ message: 'name and bio required' })
    } else {

        try {
            const newUser = await users.insert(user);
            res.status(201).json(newUser)
        } catch (err) {
            console.log(err)
            res.status(500).json({ message: "Oops! Looks like we could not save this new user :(" })
        }
    }
})

// *** PUT REQUEST ***

server.put('/api/users/:id'), async (req, res) => {
    const user = req.body;
    const { id } = req.params;

    if (!user.name || user.bio) {
        res.status(400).json({ message: "Please provide name and bio for the user" })
    } else {

        try {
            const updateUser = await users.update(id, user);
            if (updateUser) {
                res.json(updateUser);
            } else {
                res.status(404).json({ message: "The user with the specified ID does not exist" })
            }
        } catch (err) {
            console.log(err)
            res.status(500).json({ message: "The user information could not be modified" })
        }
    }
}

// *** DELETE REQUEST ***

server.delete('/api/users/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const user = await users.delete(id);
        if (user) {
            res.json(user);
        } else {
            res.status(404).json({ message: "The user with the specified ID does not exist" })
        }
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: "The user information could not be modified" })
    }
})

module.exports = server; // EXPORT YOUR SERVER instead of {}