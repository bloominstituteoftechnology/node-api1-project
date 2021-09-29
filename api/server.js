// BUILD YOUR SERVER HERE
const express = require("express");
const server = express();
const Users = require("./users/model");

server.use(express.json());

module.exports = server; // EXPORT YOUR SERVER instead of {}
