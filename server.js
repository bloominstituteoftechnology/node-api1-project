const express = require("express"); // import the express package

const server = express(); // creates the server


const users = ['one']
// handle requests to the root of the api, the / route
server.get("/", (req, res) => {
  res.send("Hello from Express");
});

server.get("/api/users", (req, res) => {
  res.send("Hello from Express", users);
});

server.get("/api/users/:id", (req, res) => {
  res.send("Hello from Express");
});

// watch for connections on port 5000
server.listen(5000, () =>
  console.log("Server running on http://localhost:5000")
);
