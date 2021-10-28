const express = require("express");
const server = express();
const model = require("./users/model");
require("colors");

server.use(express.json());

server.post("/api/users", (req, res) => {
  if (!req.body.name || !req.body.bio) {
    res
      .status(400)
      .send({ message: "Please provide name and bio for the user" });
  } else {
    model
      .insert(req.body)
      .then((newUser) => {
        res.status(201).send(newUser);
      })
      .catch(() => {
        res.status(500);
        res.send({
          message: "There was an error while saving the user to the database",
        });
      });
  }
});

server.get("/api/users", (req, res) => {
  model
    .find()
    .then((data) => res.send(data))
    .catch(() => {
      res.status(500);
      res.send({ message: "The users information could not be retrieved" });
    });
});

server.get(`/api/users/:id`, (req, res) => {
  const id = req.params.id;
  model
    .findById(id)
    .then((user) => {
      return user === undefined
        ? res
            .status(404)
            .send({ message: "The user with the specified ID does not exist" })
        : res.send(user);
    })
    .catch(() => {
      res.status(500);
      res.send({ message: "The user information could not be retrieved" });
    });
});

server.delete(`/api/users/:id`, (req, res) => {
  const id = req.params.id;
  model
    .remove(id)
    .then((user) => {
      return user === undefined
        ? res
            .status(404)
            .send({ message: "The user with the specified ID does not exist" })
        : res.send(user);
    })
    .catch(() => {
      res.status(500);
      res.send({ message: "The user could not be removed" });
    });
});

server.put(`/api/users/:id`, (req, res) => {
  const id = req.params.id;
  console.log(`id: ${id}`);
  console.log("request body: ", req.body);
  model
    .update(id, req.body)
    .then((user) => res.send(user))
    .catch((err) => {
      res.status(500);
      res.render("error", { error: err });
    });
});

server.get("/reset", (req, res) => {
  model.resetDB();
  res.send("server reset");
});

module.exports = server;
