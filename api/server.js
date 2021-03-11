// BUILD YOUR SERVER HERE
const express = require('express');

const server = express();
const model = require('./users/model')

server.use(express.json());


//GET REQUESTS
server.get('api/users', async (req, res) => {
    try {
        const users = await users.findAll();
        res.json(users);
    }   catch (err) {
        console.log(err)
        res.status(500).json({ error: err })
    }
})


module.exports = server; // EXPORT YOUR SERVER instead of {}