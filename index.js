// implement your API here
const express = require("express");

const dataBase = require("./data/db");

const server = express();

server.use(express.json());
server.use(cors());

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

server.post("/api/users", (req, res) => {
  const userData = req.body;
  if (!userData.name || !userData.bio) {
    res
      .status(400)
      .json({ errorMessage: "Please provide name and bio for the user." });
  } else {
    dataBase
      .insert(userData)
      .then(user => {
        res.status(201).json(user);
      })
      .catch(error => {
        res.json({ message: "error saving the user" });
      });
  }
});

server.delete("/api/users/:id", (req, res) => {
  const id = req.params.id;
  dataBase.findById(id).then(user => {
    if (!user) {
      res
        .status(404)
        .json({ message: "The user with the specified ID does not exist." });
    } else {
      dataBase
        .remove(id)
        .then(hub => {
          res.status(201).json(hub);
        })
        .catch(error => {
          res.status(500).json({ message: "error deleting the hub" });
        });
    }
  });
});

server.put("/api/users/:id", (req, res) => {
  const id = req.params.id;
  const changes = req.body;
  dataBase.findById(id).then(user => {
    if (!user) {
      res
        .status(404)
        .json({ message: "The user with the specified ID does not exist." });
    } else if (!changes.name || !changes.bio) {
      res
        .status(400)
        .json({ errorMessage: "Please provide name and bio for the user." });
    } else {
      dataBase
        .update(id, changes)
        .then(hub => {
          res.status(200).json(hub);
        })
        .catch(error => {
          res.status(500).json({ message: "The target could not be modified" });
        });
    }
  });
});

const port = 8000;
server.listen(port, () => console.log("/nserver running/n"));
