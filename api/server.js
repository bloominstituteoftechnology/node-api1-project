// BUILD YOUR SERVER HERE
const express = require("express");
const User = require("./users/model");

const server = express();

// Global Middleware
server.use(express.json())

module.exports = server; // EXPORT YOUR SERVER instead of {}
