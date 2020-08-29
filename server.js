const express = require("express"); // import the express package

const server = express(); // creates the server
server.use(express.json());
const db = require("./dbbase");
const { deleteUser } = require("./dbbase");

// handle requests to the root of the api, the / route
server.get("/", (req, res) => {
  res.send("Hello from Express");
});

server.get("/api/users", (req, res, next) => {
  const users = db.getUsers();
  if (users) {
    res.status(200).json(users);
  } else {
    res
      .status(500)
      .json({ errorMessage: "The users information could not be retrieved." });
  }
});

server.post("/api/users", (req, res, next) => {
  const user = db.createUsers({
    name: req.body.name,
    bio: req.body.bio,
  });
  if (user.body.name === '' || user.body.name === ''){
      res.status(400).json({ errorMessage: "Please provide name and bio for the user." })
  }
  if (user) {
    res.status(201).json(user);
  } else {
    res
      .status(500)
      .json({
        errorMessage:
          "There was an error while saving the user to the database",
      });
  }
});

server.get("/api/users/:id", (req, res, next) => {
  const user = db.getUsersById(req.params.id);
  if (user) {
    res.json(user);
  } else {
    res
      .status(404)
      .json({
        message: { message: "The user with the specified ID does not exist." },
      });
  }
});

server.put("api/users/:id", (req, res, next) => {
  const user = db.updateUser(req.params.id);
  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ message: "User not found" });
  }
});

server.delete("api/users/:id", (req, res, next) => {
  const user = db.getUsersById(req.params.id);
  if (user) {
    deleteUser(req.params.id);
    res.status(204).json({ message: "User successfully deleted" });
  } else {
    res.status(404).json({ message: "User not found" });
  }
});
// watch for connections on port 5000
server.listen(5000, () =>
  console.log("Server running on http://localhost:5000")
);
