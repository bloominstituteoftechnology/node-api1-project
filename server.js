const express = require('express');
const server = express();

server.get('/', (req, res) => {
    res.send("hey there")
})

server.get('/hello', (req, res) => {
    res.send("hello")
})
server.post('/api/users', async (req, res) => {
    const user = req.body;

    try {
        const newUser = user.creat(user);
        res.status(200).json(newUser);
    } catch (err) {
        res.status(500).json({error:err.message})
    }
})


module.exports = server;