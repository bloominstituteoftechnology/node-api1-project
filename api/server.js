// BUILD YOUR SERVER HERE
const express = require("express");
const Users = require("./users/model");

const server = express();

server.use(express.json());

server.get("/api/users", async (req, res) => {
  try {
    const users = await Users.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

server.get("/api/users/:id", async (req, res) => {
  try {
    const user = await Users.findById(req.params.id);
    if (!user) {
      res
        .status(404)
        .json({ message: "The user with the specified ID does not exist" });
    } else {
      res.json(user);
    }
  } catch (err) {
    res
      .status(500)
      .json({ message: "The user information could not be retrieved" });
  }
});

server.post("/api/users", async (req, res) => {
  try {
    const newUser = await Users.insert(req.body);
    if (!newUser.name || !newUser.bio) {
      res
        .status(400)
        .json({ message: "Please provide name and bio for the user" });
    } else {
      res.status(201).json(newUser);
    }
  } catch (err) {
    res.status(500).json({
      message: "There was an error while saving the user to the database",
    });
  }
});

server.delete("/api/users/:id", async (req, res) => {
  try {
    const deleteUser = await Users.remove(req.params.id);
    if (!deleteUser) {
      res
        .status(404)
        .json({ message: "The user with the specified ID does not exist" });
    } else {
      res.json(deleteUser);
    }
  } catch (err) {
    res.status(500).json({ message: "The user could not be removed" });
  }
});

server.put("/api/users/:id", async (req, res) => {
  const updateUser = await Users.update(req.params.id, req.body);
  if (!updateUser) {
    res
      .status(404)
      .json({ message: "The user with the specified ID does not exist" });
  } else if (!updateUser.name || !updateUser.bio) {
    res
      .status(400)
      .json({ message: "Please provide name and bio for the user" });
  } else {
    res.json(updateUser);
  }
});

module.exports = server; // EXPORT YOUR SERVER instead of {}
