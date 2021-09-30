// BUILD YOUR SERVER HERE

const express = require("express");
const Model = require("./users/model");

const server = express();

server.use(express.json());


server.post("/api/users", async (req, res) => {
  try {
    if (!req.body.name || !req.body.bio) {
      res.status(400).json({
        message: "Please provide name and bio for the user",
      });
    } else {
      const { name, bio } = req.body;
      const newUser = await Model.insert({ name, bio });
      res.status(201).json(newUser);
    }
  } catch (err) {
    res.status(500).json({
      message: "There was an error while saving the user to the database",
      error: err.message,
    });
  }
});


server.get("/api/users", (req, res) => {
  Model.find()
    .then((users) => {
      res.status(200).json(users);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: err.message });
    });
});


server.get(`/api/users/:id`, async (req, res) => {
  try {
    const user = await Model.findById(req.params.id);
    if (!user) {
      res.status(404).json({
        message: "The user with the specified ID does not exist",
      });
    } else {
      res.status(200).json(user);
    }
  } catch (err) {
    res.status(500).json({
      message: "The user information could not be retrieved",
      error: err.message,
    });
  }
});


server.delete("/api/users/:id", async (req, res) => {
  try {
    const user = await Model.remove(req.params.id);
    if (!user) {
      res.status(404).json({
        message: "The user with the specified ID does not exist",
      });
    } else {
      res.json(user);
    }
  } catch (err) {
    res.status(500).json({
      message: "The user could not be removed",
    });
  }
});


server.put("/api/users/:id", (req, res) => {
  const id = req.params.id;
  const { name, bio } = req.body;
  if (!name || !bio) {
    res.status(400).json({
      message: "Please provide name and bio for the user",
    });
  } else {
    Model.update(id, { name, bio })
      .then((updated) => {
        if (!updated) {
          res.status(404).json({
            message: "The user with the specified ID does not exist",
          });
        } else {
          res.status(200).json(updated);
        }
      })
      .catch(() => {
        res.status(500).json({
          message: "The user information could not be modified",
        });
      });
  }
});

module.exports = server;
