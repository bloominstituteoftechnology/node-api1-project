// BUILD YOUR SERVER HERE
// importing the Data model to interact with the data
const Model = require('./users/model.js');
// bringing express into the project
const express = require('express');

const server = express();

server.get('/', (req, res) => {
    res.json ({ hello : 'world' });
});


module.exports = server; // EXPORT YOUR SERVER instead of {}
