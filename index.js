const express = require("express");
// const { v4: uuidv4 } = require('uuid')
const uuid = require("uuid").v4;

const server = express();
const port = 5000;

server.use(express.json());
server.use(cors());
server.listen(port, () => console.log("running"));

//test
server.get("/", (req, res) => {
  res.status(200).json({ hello: "node" });
});
//initial user
let users = [
  {
    id: uuid(), // hint: use the shortid npm package to generate it
    name: "Jane Doe", // String, required
    bio: "Not Tarzan's Wife, another Jane", // String, required
  },
];
//getting all the users
server.get("/users", (req, res) => {
  res.status(200).json({ data: users });
  res
    .status(500)
    .json({ errorMessage: "The users information could not be retrieved." });
});
// Sending a user to the server
server.post("/users", (req, res) => {
  const data = req.body;
  if (req.body.name && req.body.bio) {
    users.push({ id: uuid(), ...data });
    res.status(201).json({ data: users });
  } else {
    res
      .status(400)
      .json({ errorMessage: "Please provide name and bio for the user." });
  }
  res.status(500).json({
    errorMessage: "There was an error while saving the user to the database",
  });
});

//Getting each user by their ID
server.get("/users/:id", (req, res) => {
  const id = req.params.id;
  const found = users.find((u) => u.id === id);
  if (found) {
    res.status(200).json({ data: found });
  } else {
    res
      .status(404)
      .json({ message: "The user with the specified ID does not exist." });
  }
});

//Updating a certain user by id
server.put("/users/:id", (req, res) => {
  const id = req.params.id;
  const changes = req.body;
  const found = users.find((u) => u.id === id);
  if (found && req.body.name && req.body.bio) {
    Object.assign(found, changes);
    res.status(200).json({ data: users });
  } else {
    res
      .status(400)
      .json({ errorMessage: "Please provide name and bio for the user." });
  }
  res
    .status(500)
    .json({ errorMessage: "The user information could not be modified." });
});

// Deleteing a user

server.delete("/users/:id", (req, res) => {
  const id = req.params.id;
  users = users.filter((u) => u.id !== id);
  res.status(200).json({ data: users });
  res
    .status(404)
    .json({ message: "The user with the specified ID does not exist." });
});
