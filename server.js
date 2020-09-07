const express = require('express');

const server = express();

server.get('/', (req, res) => {
    res.send('hello from express')
})

server.listen(5000, () => {
    console.log('Server running on http://localhost:5000')
})