// BUILD YOUR SERVER HERE
const users = require('./users/model');
const express = require('express');
const server = express();

server.use(express.json());

module.exports = server; // EXPORT YOUR SERVER instead of {}
