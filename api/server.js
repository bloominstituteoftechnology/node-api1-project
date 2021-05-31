//BUILD YOUR SERVER HERE
const express = require("express");
const User = require("./users/model");
const server = express();
server.use(express.json());

//Updates User
server.put("/api/users/:id", async (req, res) => {
  try {
    const possibleUser = await User.findById(req.params.id);
    if (!possibleUser) {
      res.status(404).json({ message: "error" });
    } else {
      if (!req.body.name || !req.body.bio) {
        res.status(404).json({ message: "provide shit" });
      } else {
        const updatedUser = await User.update(req.params.id, req.body);
        res.status(200).json(updatedUser);
      }
    }
  } catch (err) {
    res.status(500).json({ message: "error updating users", err: err.message });
  }
});

//Deletes user
server.delete("/api/users/:id", async (req, res) => {
  const possibleUser = await User.findById(req.params.id);
  try {
    if (!possibleUser) {
      res.status(404).json({
        message: "not found",
      });
    } else {
      const deletedUser = await User.remove(possibleUser.id);
      res.status(200).json(deletedUser);
    }
  } catch (err) {
    res.status(500).json({ message: "error deleting users", err: err.message });
  }
});

//Creates New User
server.post("/api/users", (req, res) => {
  const user = req.body;
  if (!user.name || !user.bio) {
    res.status(400).json({
      message: "name and bio required",
    });
  } else {
    User.insert(user).then((newCreatedUser) => {
      res.status(201).json(newCreatedUser);
    });
  }
});
//Fetches all users
server.get("/api/users", (req, res) => {
  User.find()
    .then((users) => {
      res.json(users);
    })
    .catch((err) => {
      res
        .status(500)
        .json({ message: "error getting users", err: err.message });
    });
});
//Fetches user by id
server.get("/api/users/:id", (req, res) => {
  User.findById(req.params.id)
    .then((users) => {
      if (!users) {
        res.status(404).json({ message: "user does not exist" });
      } else {
        res.json(users);
      }
    })
    .catch((err) => {
      res
        .status(500)
        .json({ message: "error getting users", err: err.message });
    });
});

server.use("*", (req, res) => {
  res.status(404).json({ message: "not found" });
});

module.exports = server; // EXPORT YOUR SERVER instead of {}
