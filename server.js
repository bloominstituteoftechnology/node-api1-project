const http = require('http');
const express = require("express");
const db = require('./database');


const server = express();

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

server.listen(8080, () => {
    console.log('server started at htttp://localhost:8000');
})