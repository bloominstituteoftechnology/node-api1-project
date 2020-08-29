const express = require("express"); // import the express package
const db = require('./database')
const server = express(); // creates the server


const users = ['one', 'two', 'three']
// handle requests to the root of the api, the / route
server.get("/", (req, res) => {
  res.send("Hello from Express");
});

server.get("/api/users", (req, res, next) => {
  res.send("Hello from users");
});

server.get("/api/users/:id", (req, res, next) => {
  res.send(users[req.params.id])
});

// watch for connections on port 5000
server.listen(5000, () =>
  console.log("Server running on http://localhost:5000")
);
