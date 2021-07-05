// BUILD YOUR SERVER HERE
const express = require("express");
const server = express();
const User = require("./users/model");

server.use(express.json());

//get all users
server.get("/api/users", (req, res) => {
  User.find()
    .then((users) => {
      res.status(201).json(users);
    })
    .catch((err) => {
      console.log(err);
      res
        .status(400)
        .json({ message: "The users information could not be retrieved" });
    });
});

//GET    | /api/users/:id
server.get("/api/users/:id", async (req, res) => {
  try {
    const person = await User.findById(req.params.id);
    if (!person) {
      res.status(404).json({
        message: "The user with the specified ID does not exist",
      });
    } else {
      res.status(200).json(person);
    }
  } catch (err) {
    res.status(500).json({
      message: `you fucked up gettting ${req.params.id}`,
    });
  }
});

//post a new user

server.post("/api/users", (req, res) => {
  const newUser = {
    name: req.body.name,
    bio: req.body.bio,
  };
  if (!req.body.name || !req.body.bio) {
    res
      .status(400)
      .json({ message: "Please provide name and bio for the user" });
  } else {
    User.insert(newUser)
      .then((added) => {
        res.status(201).json(added);
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json({
          message: "Please provide name and bio for the user",
        });
      });
  }
});

server.put("/api/users/:id", async (req, res) => {
  const { id } = req.params;
  const { body } = req;
  try {
    const updated = await User.update(id, body);
    if (!updated) {
      res.status(404).json({
        message: `user by id ${id} doesnt exist`,
      });
    } else {
      res.json(updated);
    }
  } catch (err) {
    res.status(500).json({ message: "error updating ", error: err.message });
  }
});

server.delete("/api/users/:id", (req, res) => {
  User.remove(req.params.id)
    .then((removed) => {
      if (!removed) {
        res.status(404).json({
          message: "The user could not be removed",
        });
      } else {
        res
          .status(200)
          .json({ message: `user with id ${req.params.id} had been deleted` });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        message: `an error occured when deleting id ${req.params.id}`,
      });
    });
});

module.exports = server; // EXPORT YOUR SERVER instead of {}
