// implement your API here
//imports
const express = require("express");
const Users = require("./data/db.js");
const server = express();

server.use(express.json());

server.get("/", (req, response) => {
  response.json({ hello: "Success" });
});

const port = 5000;
server.listen(port, () => console.log(`\n** API on port ${port} /n`));

// POST request to /api/users
server.post("/api/users", (req, response) => {
  const userInfo = req.body;
  if (!userInfo.name || !userInfo.bio) {
    response
      .status(400)
      .json({ errorMessage: "Please provide name and bio for the user." });
  } else {
    Users.insert(userInfo)
      .then(user => {
        response.status(201).json(user);
      })
      .catch(error => {
        console.log(error);
        response.status(500).json({
          errorMessage:
            "There was an error while saving the user to the database"
        });
      });
  }
});

// GET request to /api/users
server.get("/api/users", (req, response) => {
  Users.find()
    .then(users => {
      response.status(200).json(users);
    })
    .catch(error => {
      console.log("Error: ", error);
      response.status(500).json({
        errorMessage: "The users information could not be retrieved."
      });
    });
});

// GET request to /api/users:id
server.get("/api/users/:id", (req, response) => {
  const { id } = req.params;
  Users.findById(id)
    .then(user => {
      if (!user) {
        response
          .status(404)
          .json({ message: "The user with the specified ID does not exist." });
      } else {
        response.status(200).json(user);
      }
    })
    .catch(err => {
      console.log(err);
      response
        .status(500)
        .json({ errorMessage: "The user information could not be retrieved." });
    });
});

// DELETE request to /api/users:id
server.delete("/api/users/:id", (req, response) => {
  const { id } = req.params;
  Users.remove(id)
    .then(user => {
      if (!user) {
        response
          .status(404)
          .json({ message: "The user with the specified ID does not exist." });
      } else {
        response.status(200).json(user);
      }
    })
    .catch(error => {
      console.log("Error: ", error);
      response
        .status(500)
        .json({ errorMessage: "The user could not be removed" });
    });
});

// PUT request to /api/users/:id
server.put("/api/users/:id", (req, response) => {
  const { id } = req.params;
  const updates = req.body;
  Users.update(id, updates)
    .then(user => {
      if (!user) {
        response
          .status(404)
          .json({
            errorMessage: "The user with the specified ID does not exist."
          });
      } else if (!updates.name || !updates.bio) {
        response
          .status(400)
          .json({ errorMessage: "Please provide name and bio for the user." });
      } else {
        response.status(200).json(user);
      }
    })
    .catch(error => {
      console.log("Error: ", error);
      response
        .status(500)
        .json({ errorMessage: "The user could not be updated" });
    });
});