const express = require("express"); // import the express package

const server = express(); // creates the server

const data = require("./database");


// handle requests to the root of the api, the / route
server.get("/", (req, res) => {
  res.send("Hello from Express");
});

server.get("/api/users", (req, res, next) => {
const users = data.getUsers()
res.json(users)
});

server.get("/api/users/:id", (req, res, next) => {
  const user = data.getUsersById(req.params.id)
  res.json(user)
});

// watch for connections on port 5000
server.listen(5000, () =>
  console.log("Server running on http://localhost:5000")
);
