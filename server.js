const http = require('http');
const express = require("express");
const db = require("./database");


const server = express();

// this middleware helps to parse the incoming data.
    server.use(express.json());

server.get('/', (req, res) => {
    res.json({ message: "Hello, World" });
});

server.post('/api/users', (req, res) => {
    
    if (!req.body.name || !req.body.bio) {
        return res.status(400).json({
            message: "Please provide name and bio for the user."
        })
    }
    const newUser = db.createUser({
        name: req.body.name
    })
    req.json(newUser);
})

server.get("/api/users", (req, res) => {
   
    const users = db.getUsers();
    res.json(users);

    if (!users) {
        return res.status(500).json({
            message: "The users information could not be retrieved."
        })
    }
})

server.get("/api/users/:id", (req, res) => {
    const id = req.params.id;
    const users = db.getUserById(id);
    if (users) {
        res.json(users);
    } else {
        res.status(404).json({
            message: "The user with the specified ID does not exist."
        })
    }
    
})

server.put("/api/users/:id", (req, res) => {
    const user = db.getUserById(req.params.id);

    if (user) {
        // we can use db.updateUser(req.params.id)
        const updateUser = db.updateUser(user.id, {
            name: req.body.name || user.name
        })
        res.json(updateUser);
    } else {
        res.status(400).json({
            message: "The user with the specified ID does not exist."
        })
    }
})

server.listen(8080, () => {
    console.log('server started at http://localhost:8080');
})