// BUILD YOUR SERVER HERE
const express = require("express");
const User = require("./users/model.js");
const server = express();

server.use(express.json());

server.get("/", (req, res) => {
  res.status(200);
  res.send("hello, friend");
});

server.post("/api/users", async (req, res) => {
  const user = req.body;

  if (!user.name || !user.bio) {
    res
      .status(400)
      .json({ errorMessage: "Please provide name and bio for user" });
  } else {
    try {
      const newlyCreatedUser = await User.insert(user);
      res.status(201).json(newlyCreatedUser);
    } catch (err) {
      res.status(500).json({
        error: "There was an error while saving the user to the database",
      });
    }
  }
});

server.get("/api/users", async (req, res) => {
  User.find()
    .then((users) => {
      res.status(200).json(users);
    })
    .catch((error) => {
      res
        .status(500)
        .json({ error: "The user's information could not be retrieved" });
    });
  //   try {
  //     const users = await User.find();
  //     res.status(200).json(users);
  //     // res.send(users);
  //   } catch (err) {
  //     res
  //       .status(500)
  //       .json({ errorMessage: "The user's information could not be retrieved" });
  //   }
});

server.get("/api/users/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const users = await users.findById(id);
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({
        message: "The user's information with that specific ID does not exist",
      });
    }
  } catch (err) {
    res
      .status(500)
      .json({ errorMessage: "The user's information could not be retrieved" });
  }
});

server.delete("/api/users/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.remove(id);
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({
        message: "The user's information with that specific ID does not exist",
      });
    }
  } catch (err) {
    res.status(500).json({
      errorMessage:
        "The user's information with that specific ID could not be removed",
    });
  }
});

server.put("/api/users/:id", async (req, res) => {
  const { id } = req.params;
  const changes = req.body;

  if (!changes.name || !changes.bio) {
    res.status(400).json({ message: "must include name and bio" });
  } else {
    try {
      let updatedUser = await User.update(id, changes);
      if (updatedUser) {
        res.status(200).json(updatedUser);
      } else {
        res.status(404).json({ message: "please provide name and bio" });
      }
    } catch (err) {
      res.status(500).json({ error: "user info could not be modified" });
    }
  }
});

module.exports = server; // EXPORT YOUR SERVER instead of {}
