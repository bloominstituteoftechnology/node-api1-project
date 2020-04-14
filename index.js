const express = require("express");
const shortid = require('shortid');

const server = express();
server.use(express.json()); // <--- Enables express to read JSON

server.get("/", (req, res) => {
  res.status(200).json({ api: "running..." });
});

server.get("/hello", (req, res) => {
  res.status(200).json({ hello: "Wazzzuuuu RanchiGB" });
});

// Project endpoints

let users = []

//Data coming from the client shows up as req.body on the server
server.post("/api/users", (req, res) => {
  const userInfo = req.body;
  userInfo.id = shortid.generate();
  users.push(userInfo)
  res.status(201).json(userInfo)
});

server.get("/api/users", (req, res) => {
  res.status(200).json(users);
});

server.get("/api/users/:id", (req, res) => {
  res.status(200).json(users.id)
});







// to run the server use: node index.js in terminal
const PORT = 5000;
server.listen(PORT, () =>
  console.log(`\n ** API running on http://localhost:${PORT} ** \n`)
);