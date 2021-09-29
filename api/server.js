// BUILD YOUR SERVER HERE
const express = require("express");
const server = express();
const User = require("./users/model");

server.use(express.json());

server.post;

server.get("/api/users", (req, res) => {
  User.find()
    .then((users) => {
      console.log(users);
      res.status(200).json(users);
    })
    .catch((err) => {
      res
        .status(500)
        .json({ message: "The users information could not be retrieved" });
    });
});

server.get("/api/users/:id", (req, res) => {
  const idVar = req.params.idVar;
  User.findById(idVar)
    .then((user) => {
      if (!user) {
        res
          .status(404)
          .json({ message: "The user with the specified ID does not exist" });
      } else {
        res.json(user);
      }
    })
    .catch((err) => {
      res
        .status(500)
        .json({ message: "The user information could not be retrieved" });
    });
});

// server.delete;

// server.put;

module.exports = server; // EXPORT YOUR SERVER instead of {}
