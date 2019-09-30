// implement your API here
const express = require("express");

const dataBase = require("./data/db");

const server = express();

server.use(express.json());

server.get("/", (req, res) => {
  res.send("hello world...its working");
});

server.get("/api/users", (req, res) => {
  dataBase
    .find()
    .then(users => {
      res.send(users);
    })
    .catch(error => {
      res.send(error);
    });
});

server.get("/api/users/:id", (req, res) => {
  const id = req.params.id;

  dataBase
    .findById(id)
    .then(user => {
      if (!user) {
        res
          .status(404)
          .json({ message: "The user with the specified ID does not exist." });
      } else {
        res.json(user);
      }
    })
    .catch(error => {
      res.status(400).json({ message: "Error finding the User" });
    });
});

const port = 8000;
server.listen(port, () => console.log("/nserver running/n"));
