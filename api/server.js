const express = require("express");
const server = express();

server.use(express.json());

const model = require("./users/model");

// server.use("*", (req, res) => {
//   res.status(200).json({ message: "sup bitch" });
// });

// server.use("/api", (req, res) => {
//   res.status(200).json({ message: "welcome to api" });
// });

//get all users
server.get("/api/users", (req, res) => {
  model
    .find()
    .then((users) => {
      res.status(200).json(users);
    })
    .catch(() => {
      res
        .status(500)
        .json({ message: "The users information could not be retrieved" });
    });
});

//get user by id
server.get("/api/users/:id", (req, res) => {
  const givenId = req.params.id;
  model
    .findById(givenId)
    .then((user) => {
      if (!user) {
        res
          .status(404)
          .json({ message: "The user with the specified ID does not exist" });
      } else {
        res.status(200).json(user);
      }
    })
    .catch(() => {
      res
        .status(500)
        .json({ message: "The user information could not be retrieved" });
    });
});

//post new user to api/users
server.post("/api/users", (req, res) => {
  const newUser = req.body;
  model
    .insert(newUser)
    .then((user) => {
      if (!newUser.name || !newUser.bio) {
        res
          .status(400)
          .json({ message: "Please provide name and bio for the user" });
      } else {
        res.status(201).json(user);
      }
    })
    .catch(() => {
      res
        .status(500)
        .json({ message: "The user information could not be retrieved" });
    });
});

//put user to update
server.put("/api/users/:id", async (req, res) => {
  const { id } = req.params;
  const userChanges = req.body;

  try {
    if (!userChanges.name || !userChanges.bio) {
      res
        .status(400)
        .json({ message: "Please provide name and bio for the user" });
    } else {
      const updated = await model.update(id, userChanges);
      if (!updated) {
        res
          .status(404)
          .json({ message: "The user with the specified ID does not exist" });
      } else {
        res.status(200).json(updated);
      }
    }
  } catch {
    res
      .status(500)
      .json({ message: "The user information could not be modified" });
  }
});

//delete user by id
server.delete("/api/users/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const deletedUser = await model.remove(id);
    if (!deletedUser) {
      res
        .status(404)
        .json({ message: "The user with the specified ID does not exist" });
    } else {
      res.status(201).json(deletedUser);
    }
  } catch {
    res.status(500).json({ message: "The user could not be removed" });
  }
});
module.exports = server;
