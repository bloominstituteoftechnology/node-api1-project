// import express
const express = require("express");
const shortid = require("shortid");
const idG = shortid.generate();

// create a server
const server = express();

// middleware

server.use(express.json());

let users = [
  {
    id: 1,
    name: "cody",
    bio: "I am an aspiring full stack web dev, backend is awesome.",
  },
];
// a function to handle GET/ requests
server.get("/api/users/:id", (req, res) => {
  let user = req.params.id;
  if (user.id) {
    res.status(200).json(user);
  } else {
    res
      .status(404)
      .json({ message: "The user with the specified ID does not exist." });
  }
});

server.get("/api/users", (req, res) => {
  res
    .status(500)
    .json({ errorMessage: "The users information could not be retrieved." });
});

// a function to handle POST/ requests
server.post("/api/users", (req, res) => {
  const user = req.body;
  users.push(user);
  user.id && user.name && user.bio
    ? res.status(200).json(users)
    : res
        .status(400)
        .json({ errorMessage: "Please provide name and bio for the user." });
});

// listen to server port
const port = 9000;

server.listen(port, () => {
  console.log(`\n == API on port ${port} == \n`);
});
