const express = require("express");
const server = express();

server.use(express.json());

const model = require("./users/model");

// server.use("*", (req, res) => {
//   res.status(200).json({ message: "sup bitch" });
// });

// server.use("/api", (req, res) => {
//   res.status(200).json({ message: "welcome to api" });
// });

//get all users
server.get("/api/users", (req, res) => {
  model
    .find()
    .then((users) => {
      res.status(200).json(users);
    })
    .catch(() => {
      res
        .status(500)
        .json({ message: "The users information could not be retrieved" });
    });
});

//get user by id
server.get("/api/users/:id", (req, res) => {
  model.findById();
});

module.exports = server;
