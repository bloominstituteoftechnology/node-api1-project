// implement your API here
const express = require('express');

const server = express();

server.use(express.json());

//adding the model
const db = require('./data/db.js');

//get 







//port 
const port = 5000;
server.listen(port, () => {
    console.log(`\n** API is running on ${port}! \n`);
})