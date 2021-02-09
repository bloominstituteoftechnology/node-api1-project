// BUILD YOUR SERVER HERE
const express = require("express");
const model = require("./users/model");
const { json } = require("express");

const server = express();
server.use(express.json());

//get all users
server.get("/api/users", (req, res) => {
  model
    .find()
    .then((user) => {
      res.status(200).json(user);
    })
    .catch((err) => {
      res.status(500), json({ message: `${err.message}` });
    });
});
//get a single user by id
server.get("/api/users/:id", (req, res) => {
  const id = req.params.id;
  model
    .findById(id)
    .then((user) => {
      res.status(200).json(user);
      console.log(user);
    })
    .catch((err) => {
      res.status(500).json({ message: `${err.message}` });
    });
});
//post a new user
server.post("/api/users", (req, res) => {
  model
    .insert(req.body)
    .then((user) => {
      res.status(201).json(user);
    })
    .catch((err) => {
      res.status(500).json({ message: `${err.message}` });
    });
});

//delete a user

server.delete("/api/users/:id", (req, res) => {
  const id = req.params.id;
  model
    .remove(id)
    .then((user) => {
      res.status(200).json(user);
    })
    .catch((err) => {
      res.status(500).json({ message: `${err.message}` });
    });
});

//edit a user

server.put("/api/users/:id", (req, res) => {
  const id = req.params.id;
  model
    .update(id, req.body)
    .then((user) => {
      res.status(200).json(user);
    })
    .catch((err) => {
      res.status(500).json({ message: `${err.message}` });
    });
});

server.use("*", (req, res) => {
  res.status(404).json({ messsage: "404 not found" });
});

module.exports = server; // EXPORT YOUR SERVER instead of {}
