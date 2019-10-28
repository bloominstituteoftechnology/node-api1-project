const express = require("express");
const server = express();
const db = require("./data/db");
const cors = require("cors");

server.use(express.json());
server.use(cors());

server.get("/", (req, res) => {
  res.send("Node API1");
});

server.post("/api/users", (req, res) => {
  console.log(req.body);
  if (!req.body.name || !req.body.bio) {
    res
      .status(400)
      .json({ errorMessage: "Please provide name and bio for the user." });
  } else {
    db.insert(req.body)
      .then(id => res.status(201).json(id))
      .catch(err => res.status(500).json(err.message));
  }
});

server.get("/api/users", (req, res) => {
  db.find()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(err =>
      res
        .status(500)
        .json({ error: "The users information could not be retrieved." })
    );
});

server.get("/api/users/:id", (req, res) => {
  const id = req.params.id;

  db.findById(id)
    .then(user => {
      user
        ? res.status(200).json(user)
        : res.status(404).json({
            message: "The user with the specified ID does not exist."
          });
    })
    .catch(err =>
      res
        .status(500)
        .json({ error: "The user information could not be retrieved." })
    );
});

server.delete("/api/users/:id", (req, res) => {
  const id = req.params.id;

  db.remove(id)
    .then(deleted =>
      deleted
        ? res.status(202).send({ message: "Resource deleted successfully" })
        : res
            .status(404)
            .json({ message: "The user with the specified ID does not exist." })
    )
    .catch(err =>
      res.status(500).json({ error: "The user could not be removed" })
    );
});

server.put("/api/users/:id", (req, res) => {
  const id = req.params.id;

  if (!req.body.name && !req.body.bio) {
    res
      .status(400)
      .json({ errorMessage: "Please provide name and bio for the user." });
  } else {
    db.update(id, req.body)
      .then(updated => {
        updated
          ? db.findById(id).then(user => res.status(200).json(user))
          : res.status(404).json({
              message: "The user with the specified ID does not exist."
            });
      })
      .catch(err => res.status(500).json(err.message));
  }
});

server.listen(8000, () => {
  console.log("Listening on port 8000");
});
