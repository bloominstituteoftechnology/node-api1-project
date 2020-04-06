const express = require('express');
const shortid = require('shortid');
const cors = require("cors");

const server = express();
server.use(cors());
let users = [ ];

// middleware
server.use(express.json());

// endpoints
server.get('/', (req, res) => {
    res.json({ api: "running..." });
});

server.get("/api/users", (req, res) => {
  res.status(200).json(users);
});

server.post("/api/users", (req, res) => {
    const user = { id: shortid.generate(), ...req.body };
    users = [...users, user];

    res.send(users);
});

server.get("/api/users/:id", (req, res) => {
  const id = req.params.id;
  const user = users.find((u) => u.id == id);
  if (user) {
    res.status(200).json(user);
  } else {
    res.status(404).json({ message: "User not found." });
  }
});

server.delete("/api/users/:id", (req, res) => {
  const deleted = users.find((user) => user.id === req.params.id);
  users = users.filter((user) => user.id !== req.params.id);

  res.send(deleted);
});


const port = 5000;
server.listen(port, () => console.log(`api on port ${port}`));