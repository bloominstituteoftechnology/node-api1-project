// implement your API here
const express = require("express");

const Users = require("./data/db.js");

const server = express();

const PORT= process.env.PORT || 5000;

//post
server.post("/api/users", (req, res) => {
  const userInfo = req.body;
  if (userInfo.name && userInfo.bio) {
    Users.insert(userInfo)
      .then(result => {
        res.status(201).json(result);
      })
      .catch(error => {
        res.send(500).json({
          error: "There was an error while saving the user to the database"
        });
      });
  } else
    res
      .status(400)
      .json({ errorMessage: "Please provide name and bio for the user." });
});

// get requests

server.get("/api/users", (req, res) => {
  Users.find()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(() => {
      res.status(500).json({
        errorMessage: "The users information could not be retrieved."
      });
    });
});

server.get("/api/users/:id", (req, res) => {
  Users.findById(req.params.id)
    .then(user => {
      if (user) {
        res.status(200).json(user);
      } else {
        res
          .status(404)
          .json({ message: "The user with the specified ID does not exist." });
      }
    })
    .catch(() => {
      res
        .status(500)
        .json({ errorMessage: "The user information could not be retrieved." });
    });
});

// Delete request

server.delete("/api/users/:id", (req, res) => {
  const userId = req.params.id;
  Users.remove(userId)
    .then(user => {
      if (user && user > 0) {
        res.status(200).json({
          message: "the user was deleted."
        });
      } else {
        res
          .status(404)
          .json({ message: "The user with the specified ID does not exist." });
      }
    })
    .catch(() => {
      res.status(500).json({ errorMessage: "The user could not be removed" });
    });
});

// Put request

server.put("/api/users/:id", (req, res) => {
  const { name, bio } = req.body;

  if (!name || !bio) {
    res
      .status(400)
      .json({ errorMessage: "Please provide name and bio for the user." });
  } else {
    Users.update(req.params.id, req.body)
      .then(user => {
        if (user) {
          res.status(200).json(user);
        } else {
          res.status(404).json({
            message: "The user with the specified ID does not exist."
          });
        }
      })
      .catch(() => {
        res.status(500).json({
          errorMessage: "The user information could not be modified."
        });
      });
  }
});

server.listen(PORT, () => console.log(`Server started on port ${PORT}`));
