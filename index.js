const express = require("express");
const shortid = require("shortid");
const cors = require("cors");

const server = express();

server.use(express.json());
server.use(cors());

let users = [];

//Create - POST
server.post("/api/users", (req, res) => {
  if (req.body.name && req.body.bio) {
    const userInfo = req.body;

    userInfo.id = shortid.generate();

    users.push(userInfo);
    res.status(201).json({userInfo});
  } else if (!req.body.name && !req.body.bio) {
    res
      .status(400)
      .json({errorMessage: "Please provide name and bio for the user."});
  }
  res.status(500).json({
    errorMessage: "There was an error while saving the user to the database",
  });
});

//Read - GET
server.get("/api/users", (req, res) => {
  if (users) {
    res.status(200).json(users);
  }
  res
    .status(500)
    .json({errorMessage: "The users information could not be retrieved."});
});

server.get("/api/users/:id", (req, res) => {
  const {id} = req.params;

  const userById = users.find((user) => user.id === id);

  if (userById) {
    res.status(200).json(userById);
  } else if (!userById) {
    res
      .status(404)
      .json({message: "The user with the specified ID does not exist."});
  }
  res
    .status(500)
    .json({errorMessage: "The users information could not be retrieved."});
});

//Update - PUT
server.put("/api/users/:id", (req, res) => {
  const {id} = req.params;
  const changes = req.body;

  let index = users.findIndex((user) => user.id === id);

  if (index !== -1) {
    changes.id = id;
    users[index] = changes;
    res.status(200).json(users[index]);
  } else if (!index) {
    res
      .status(404)
      .json({message: "The user with the specified ID does not exist."});
  } else if (!req.body.name || !req.body.bio) {
    res
      .status(404)
      .json({errorMessage: "Please provide name and bio for the user."});
  }
  res
    .status(500)
    .json({errorMessage: "The user information could not be modified."});
});

//Delete - DELETE
server.delete("/api/users/:id", (req, res) => {
  const {id} = req.params;

  const userById = users.find((user) => user.id === id);

  if (userById) {
    users = users.filter((user) => user.id !== id);
    res.status(200).json(userById);
  } else if (!userById) {
    res
      .status(404)
      .json({message: "The user with the specified ID does not exist."});
  }
  res.status(500).json({errorMessage: "The user could not be removed"});
});

const port = 5000;

server.listen(port, () => {
  console.log(`listening on http://localhost:${port}...`);
});
