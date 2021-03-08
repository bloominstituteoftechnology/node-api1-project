const express = require("express");
const User = require("./users/model");
const server = express();
server.use(express.json());

/////// get user by id//////
server.get("/api/users/:id", (req, res) => {
  const id = req.params.id;
  User.findById(id)
    .then((user) => {
      console.log("getting --->", user);
      if (!user) {
        res.status(404).json({
          message: `user with id ${id} does not exist`,
        });
      } else {
        res.json(user);
      }
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
});

/////post new user///////
server.post("/api/users", (req, res) => {
  const newUser = req.body;

  if (!newUser.name || !newUser.bio) {
    res
      .status(400)
      .json({ message: "Please provide name and bio for the user" });
  } else {
    User.insert(newUser)
      .then((user) => {
        res.status(201).json(user);
      })
      .catch((err) => {
        res.status(500).json({
          message: "There was an error while saving the user to the database",
        });
      });
  }
});

////// put user ///////
server.put("/api/users/:id", async (req, res) => {
  const { id } = req.params;
  const changes = req.body;

  try {
    if (!changes.name || !changes.bio) {
      res
        .status(400)
        .json({ message: "Please provide name and bio for the user" });
    } else {
      const updatedUser = await User.update(id, changes);
      res.json(updatedUser);
    }
  } catch (err) {
    res
      .status(500)
      .json({ message: " The user information could not be modified" });
  }
});

//////// delete user /////
server.delete("/api/users/:id", async (req, res) => {
  try {
    const deleted = await User.remove(req.params.id);
    if (!deleted) {
      res
        .status(404)
        .json({ message: "The user with the specified ID does not exist" });
    } else {
      res.json(deleted);
    }
  } catch (err) {
    res.status(500).json("The user could not be removed");
  }
});

/////// get all users///////
server.get("/api/users", (req, res) => {
  //   User.find();
  //   res.status(200).json("its worked");
  User.find()
    .then((users) => {
      console.log(users);
      res.status(200).json(users);
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
});

module.exports = server; // EXPORT YOUR SERVER instead of {}
