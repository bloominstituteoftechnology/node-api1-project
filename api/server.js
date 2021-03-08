// BUILD YOUR SERVER HERE
const express = require('express') // import express
const User = require('./users/model.js') // import model

const server = express() // instance of express

server.use(express.json()) // express parses body of req as JSON

module.exports = server // EXPORT YOUR SERVER instead of {}
