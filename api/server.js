// BUILD YOUR SERVER HERE
const express = require("express")
const server = express();
server.use(express.json());


let user = require('./users/model')

module.exports = {server}; // EXPORT YOUR SERVER instead of {}
