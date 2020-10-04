const express = require("express");
const db = require("./database");
const server = express();

server.use(express.json());

server.get("/api/users", (req, res) => {
  const users = db.getUsers();
  res.json(users);
});

server.post("/api/users", (req, res) => {
  const user = db.createUser({
    name: req.body.name,
    bio: req.body.bio,
  });

  res.status(201).json(user);
});

server.get("/api/users/:id", (req, res) => {
  const user = db.getUserById(req.params.id);

  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ message: "User does not exist" });
  }
});

server.delete("/api/users/:id", (req, res) => {
  res.status(200).json(users);
});

server.put("/api/users/:id", (req, res) => {
  res.status(200).json(users);
});

server.listen(8080, () => {
  console.log("server started");
});
