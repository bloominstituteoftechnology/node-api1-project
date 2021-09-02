// BUILD YOUR SERVER HERE
const express = require("express");

const server = express();

server.use("*", (req, res) => {
  res.json({ api: "running" });
});

module.exports = server;
