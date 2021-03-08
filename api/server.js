// BUILD YOUR SERVER HERE
const express = require("express");
const helmet = require("helmet");
const router = require('./users/router');

const server = express();
server.use(helmet());
server.use(express.json());

server.use('/api/users', router)

server.get("/", (req, res) => {
  res.json({ API: "Online" });
});

module.exports = server;
