// implement your API here
const express = require('express');

const server = express();

server.get('/api/users', (req, res) => {
    res.send('This is Ians server')
})

server.listen(8000, () => console.log('server on 8000'));
