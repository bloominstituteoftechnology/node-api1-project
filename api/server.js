// BUILD YOUR SERVER HERE
const express = require("express");
const User = require("./users/model");

const server = express();

server.use(express.json());

// CRUD OP's POST
server.post("/api/users", (req, res) => {
  const user = req.body;
  if (!user.name || !user.bio) {
    res.status(400).json({
      message: "Please provide name and bio for the user",
    });
  } else {
    User.insert(user)
      .then((newUser) => {
        res.status(201).json(newUser);
      })
      .catch((err) => {
        res.status(500).json({
          message: "error creating user",
          err: err.message,
          stack: err.stack,
        });
      });
  }
});

// CRUD OP's GET All
server.get("/api/users", (req, res) => {
  User.find()
    .then((users) => {
      res.json(users);
    })
    .catch((err) => {
      res.status(500).json({
        message: "this is bad",
        err: err.message,
        stack: err.stack,
      });
    });
});

// CRUD OP's GET by ID:
server.get("/api/users/:id", (req, res) => {
  User.findById(req.params.id)
    .then((user) => {
      if (!user) {
        res.status(404).json({ message: `ID user does not exist` });
      }
      res.json(user);
    })
    .catch((err) => {
      res.status(500).json({
        message: "error getting user",
        err: err.message,
        stack: err.stack,
      });
    });
  if (!user) {
    res.status(404).json({ message: `user ID does not exist` });
  } else {
    res.status(200).json(user);
  }
});

server.use("*", (req, res) => {
  res.status(404).json({ message: "404 Not found )*:" });
});

module.exports = server;
