// BUILD YOUR SERVER HERE
const express = require('express');
const server = express();
module.exports = server; // EXPORT YOUR SERVER instead of {}

server.use('*', (req, res) => {
    res.status(404).json({
        message: 'not found'
    })
})

module.exports = server;