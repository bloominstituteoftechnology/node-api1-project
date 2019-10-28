// implement your API here

console.log("/n=== It's alive ===/n")
//import express from 'express' // ES modules
const express = require('express'); //commonjs modules, and it is equivalent to the line above

const server = express(); //creates a server

//.request/route handlers

//handles GET requests to / on localhost:8000
server.get('/', (req, res) => {
    res.send('Hello node')
})

server.post('/echo', (req, res) => {
    const data = req.body;

    res.json(data);
})

const port = 8000;
server.listen(port, () => console.log('\n=== API on port 8000 ===\n'));
