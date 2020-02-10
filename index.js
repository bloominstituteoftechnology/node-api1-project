// import express from 'express'; // ES2015 modules
const express = require("express"); //CommonJS Modules // <<<<<<<<npm i express

const server = express();

const Db = require("./data/db");

server.use(express.json()); // needed for POST & PUT/PATCH

server.get("/", (req, res) => {
  res.json({ hello: "Web 26" });
});
server.post("/api/hubs", (req, res) => {
  const { name, bio } = req.body;
  if (!name || !bio)
    return res
      .status(400)
      .json({ errorMessage: "Name and bio required for user" });
  Db.insert({ name, bio })
    .then(user => {
      res.status(201).json(user);
    })
    .catch(error => {
      console.log(error);
      res.status(400).json({ errorMessage: "Name and bio required for user" });
    });
});

server.get("/api/users", (req, res) => {
  Db.find()
    .then(allUsers => {
      console.log("All Users", allUsers);
      res.status(200).json(allUsers);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ errorMessage: "Could not retrieve user info." });
    });
});

server.get("/api/users/:id", (req, res) => {
  const id = req.params.id;
  Db.findById(id)
    .then(user => {
      if (user) {
        res.status(200).json(user);
      } else {
        res.status(404).json({ errorMessage: "No user exists with that ID" });
      }
    })
    .catch(error => {
      console.log(error);
      res.status(404).json({ errorMessage: "No user exists with that ID" });
    });
});

const port = 5001;
server.listen(port, () => console.log(`n** API on port ${port} \n`));
