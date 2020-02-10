// implement your API here

const express = require("express");

const server = express();

server.use(express.json());

const Users = require("./data/db");

// get list of users
server.get("/api/users", (req, res) => {
  Users.find()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ errorMessage: "no hobbitses" });
    });
});

// get user by ID
server.get("/api/users/:id", (req, res) => {
  const { id } = req.params;
  Users.findById(id)
    .then(user => {
      res.status(200).json(user);
    })
    .catch(err => {
      console.log(err);
      res.status(404).json({ errorMessage: "gone on an adventure" });
    });
});

// add a user
server.post("/api/users", (req, res) => {
  const userInfo = req.body;

  Users.insert(userInfo)
    .then(user => {
      res.status(201).json(user);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ errorMessage: "you shall not add" });
    });
});

// update a user
server.put("/api/users/:id", (req, res) => {
  const { id } = req.params;
  const user = req.body;

  Users.update(id, user)
    .then(db => {
      res.status(200).json(db);
    })
    .catch(err => {
      console.log(err);
      res
        .status(500)
        .json({ errorMessage: "The user information could not be updated" });
    });
});

// delete a user
server.delete("/api/users/:id", (req, res) => {
  const { id } = req.params;

  Users.remove(id)
    .then(db => {
      res.status(200).json(db);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ errorMessage: "no more hobbit" });
    });
});

const port = 8000;
server.listen(port, () => console.log(`\n** API on port ${port} \n`));
