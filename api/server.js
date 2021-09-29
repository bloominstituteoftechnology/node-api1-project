// BUILD YOUR SERVER HERE
const express = require("express");
const server = express();
const User = require("./users/model");

server.use(express.json());

server.post("/api/users", (req, res) => {
  const newUser = req.body;
  if (!newUser.name || !newUser.bio) {
    res
      .status(400)
      .json({ message: "Please provide name and bio for the user" });
  } else {
    User.insert(newUser)
      .then((user) => {
        res.json(user);
      })
      .catch((err) => {
        res.status(500).json({ message: err.message });
      });
  }
});

server.get("/api/users", (req, res) => {
  User.find()
    .then((users) => {
      console.log(users);
      res.status(200).json(users);
    })
    .catch((err) => {
      res
        .status(500)
        .json({ message: "The users information could not be retrieved" });
    });
});

server.get("/api/users/:id", (req, res) => {
  const idVar = req.params.idVar;
  User.findById(idVar)
    .then((user) => {
      if (!user) {
        res
          .status(404)
          .json({ message: "The user with the specified ID does not exist" });
      } else {
        res.json(user);
      }
    })
    .catch((err) => {
      res
        .status(500)
        .json({ message: "The user information could not be retrieved" });
    });
});

server.delete("/api/users/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleteUser = await User.remove(id);
    if (!deleteUser) {
      res
        .status(404)
        .json({ message: "The user with the specified ID does not exist" });
    } else {
      res.status(200).json(deleteUser);
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

server.put("/api/users/:id", async (req, res) => {
  const { id } = req.params;
  const changes = req.body;
  try {
    if (!changes.name || !changes.bio) {
      res.status(422).json("Name and bio required");
    } else {
      const updateUser = await User.update(id, changes);
      if (!updateUser) {
        res.status(500).json("User doesn't exist");
      } else {
        res.status(200).json(updateUser);
      }
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = server; // EXPORT YOUR SERVER instead of {}
