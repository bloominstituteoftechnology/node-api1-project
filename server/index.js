// const http = require("http");

// const hostname = "127.0.0.1";
// const port = 3000;

// const server = http.createServer((req, res) => {
//   res.statusCode = 200;
//   res.setHeader("Content-Type", "text/plain");
//   res.end("Hello");
// })

// server.listen(port, hostname, () => {
//   console.log("server running")
// })


const express = require("express");
const { nanoid } = require("nanoid");
const server = express();
server.use(express.json());

const users = [
  {
    id: nanoid(5), // hint: use the shortid npm package to nanoid it
    name: "Jane Doe", // String, required
    bio: "Not Tarzan's Wife, another Jane",  // String, required
  }
];

server.post("/api/users", (req, res) => {
  const newUser = {...req.body, id: nanoid(5)};
  if (req.body.name && req.body.bio) {
    users.push(newUser);
    res.status(201).json(newUser);
  } else if (!req.body.name || !req.body.bio) {
    res.status(400).json({errorMessage: "Please provide name and bio for the user."});
  } else {
    res.status(500).json({errorMessage: `Unknown error occurred. ${req} rquest was received but not posted.`});
  };
});

server.get("/api/users", (req, res) => {
  if (users.length > 0) {
    res.status(200).json(users)
  } else if (!users) {
    res.status(404).json({errorMessage: "There are no users in the database."});
  } else {
    res.status(500).json({errorMessage: "User information could not be retrieved."})
  }
});

server.get("/api/users/:id", (req, res) => {
  const { id } = req.params;
  const reqUser = users.find(user => user.id === id)
  if (reqUser) {
    res.status(200).json(reqUser);
  } else if (!reqUser) {
    res.status(404).json({errorMessage: `No user found with id ${id}`});
  } else {
    res.status(500).json({errorMessage: `Unknown error occurred. ${req} request was received.`})
  }
})

server.delete("/api/users/:id", (req, res) => {
  const { id } = req.params;
  const index = users.findIndex(user => user.id === id)
  if (index !== -1) {
    users.splice(index, 1);
    res.status(200).json(users);
  } else if (index === -1) {
    res.status(404).json({errorMessage: `No user found with id ${req.params}`});
  } else {
    res.status(500).json({errorMessage: `Unknown error occurred. ${req} request was received.`});
  };
});

server.put("/api/users/:id", (req, res) => {
  const { id } = req.params;
  const index = users.findIndex(user => user.id === id)
  if (index !== -1) {
    users[index] = {...req.body, id: id};
    res.status(200).json(users);
  } else if (index === -1) {
    res.status(404).json({errorMessage: `No user found with id ${req.params}`});
  } else {
    res.status(500).json({errorMessage: `Unknown error occurred. ${req} request was received.`});
  };
})

server.listen(5000, () => {
  console.log("server running");
});