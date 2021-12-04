// BUILD YOUR SERVER HERE
// IMPORTS
const express = require("express")
const User = require("./users/model")

// INSTANCE OF EXPRESS
const server = express()

// GLOBAL MIDDLEWARE
server.use(express.json())

// ENDPOINTS




// EXPORT
module.exports = server; // EXPORT YOUR SERVER instead of {}
