// Using the express server
const express = require('express')
// import express user-model with express & initthe express app
const User = require('./user-model');
const server = express();

// Start the app and configure it with the express json to read body req 1 day
server.use(express.json());

// Endpoints
// [GET] /

server.get('/', (req,res) => {
    res.json({message:'hello this is said to work'})
})



module.exports = server