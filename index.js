/** @format */

const express = require("express");
const cors = require('cors')
const server = express();
server.use(express.json());
server.use(cors());
const shortid = require("shortid");

let users = [
  {
    id: shortid(),
    name: "sami",
    bio: "Web Dev",
  },
];

server.post("/api/users", (req, res) => {
  const user = req.body;
  if (typeof user.name === "string" && typeof user.bio === "string") {
    user.id = shortid();
    users.push(user);
    res.status(201).json({ data: user });
  } else if (typeof user === "undefined") {
    res.status(500).json({
      errorMessage: "There Was an Error While Saving The User To the DataBase",
    });
  } else {
    res
      .status(400)
      .json({ rerrorMessage: "Please Provide the name and bio for the user" });
  }
});

server.get("/api/users", (req, res) => {
  if (typeof users === "undefined") {
    res
      .status(500)
      .json({ errorMessage: "The users information could not be retrieved." });
  } else {
    res.status(200).json(users);
  }
});

server.get("/api/users/:id", (req, res) => {
  const { id } = req.params;
  let found = users.find((user) => user.id === id);

  if (found) {
    res.status(200).json({ data: found });
  } else if (typeof users === "undefined") {
    res
      .status(500)
      .json({ errorMessage: "The users information could not be retrieved." });
  } else {
    res
      .status(404)
      .json({ message: "The user with the specified ID does not exist." });
  }
});

server.delete("/api/users/:id", (req, res) => {
  const { id } = req.params;
  let found = users.find((user) => user.id === id);

  if (found) {
    res.status(200).json(found);
    users = users.filter((hub) => hub.id !== id);
  } else if (users.find((user) => user.id === id)) {
    res.status(500).json({ errorMessage: "The user could not be removed" });
  } else {
    res
      .status(404)
      .json({ message: "The user with the specified ID does not exist." });
  }
});

server.put("/api/users/:id", (req, res) => {
  const { id } = req.params;
  let found = users.find((user) => user.id === id);
  const changes = req.body;

  if (
    found &&
    typeof changes.name === "string" &&
    typeof changes.bio === "string"
  ) {
    Object.assign(found, changes);
    res.status(200).json(users.find((user) => user.id === id));
  } else if (found) {
    res
      .status(400)
      .json({ errorMessage: "Please provide name and bio for the user." });
  } else {
    res
      .status(404)
      .json({ message: "The user with the specified ID does not exist." });
  }
});

const port = 8000;
server.listen(port, () => {
  console.log(`Server listening on port: ${port}`);
});
