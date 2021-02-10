// BUILD YOUR SERVER HERE
const express = require("express");
const db = require("./users/model");

const server = express();

server.use(express.json());

server.get("/", (req,res) => {
  res.json({message: "Hello!"});
})

module.exports = server; // EXPORT YOUR SERVER instead of {}
