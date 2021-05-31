//BUILD YOUR SERVER HERE
const express = require("express");
const User = require("./users/model");
const server = express();
server.use(express.json());

//Creates New User
server.post("/api/users", (req, res) => {
  const user = req.body;
  if (!user.name || !user.bio) {
    res.status(422).json({
      message: "name and bio required",
    });
  } else {
    User.insert(user).then((newCreatedUser) => {
      res.status(201).json(newCreatedUser);
    });
  }
});

server.get("/api/users", (req, res) => {
  User.find()
    .then((users) => {
      res.json(users);
    })
    .catch((err) => {
      res
        .status(500)
        .json({ message: "error getting users", err: err.message });
    });
});

server.get("/api/users/:id", (req, res) => {
  User.findById(req.params.id)
    .then((users) => {
      if (!users) {
        res.status(404).json({ message: "user does not exist" });
      } else {
        res.json(users);
      }
    })
    .catch((err) => {
      res
        .status(500)
        .json({ message: "error getting users", err: err.message });
    });
});

server.use("*", (req, res) => {
  res.status(404).json({ message: "not found" });
});

module.exports = server; // EXPORT YOUR SERVER instead of {}
