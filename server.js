const express = require("express"); // import the express package

const server = express(); // creates the server
server.use(express.json());
server.use(cors())
const db = require("./database");

// handle requests to the root of the api, the / route
server.get("/", (req, res) => {
  res.send("Hello from Express");
});

server.get("/api/users", (req, res) => {
  const users = db.getUsers();
  if (users) {
    res.status(200).json(users).end();
  } else {
    res
      .status(500)
      .json({ errorMessage: "The users information could not be retrieved." });
  }
});

server.get("/api/users/:id", (req, res) => {
  const user = db.getUsersById(req.params.id);
  if (user) {
    res.json(user);
  } else {
    res
      .status(404)
      .json({
        message: { message: "The user with the specified ID does not exist." },
      })
      .end();
  }
});

server.post("/api/users", (req, res) => {
  const user = req.body;

  if (user.name === "" || user.name === "") {
    res
      .status(400)
      .json({ errorMessage: "Please provide name and bio for the user." })
      .end();
  }
  if (user) {
    db.createUsers(user);
    res.status(201).json(user).end();
  } else {
    res
      .status(500)
      .json({
        errorMessage:
          "There was an error while saving the user to the database",
      })
      .end();
  }
});

server.put("/api/users/:id", (req, res) => {
  const id = String(req.params.id);
  const user = db.getUsersById(id);
  const newData = req.body;

  if (newData.bio === "" || newData.name === "") {
    res
      .status(400)
      .json({ message: "Bad request, please fill in all thingies" }).end;
  }
  if (user && newData.name && newData.bio) {
    db.updateUser(id, newData);
    res.status(200).json(newData).end();
  }
  if (!user) {
    res.status(404).json({ message: "User not found" }).end();
  } else {
    res.status(500).json({ message: "There was an error updating user" }).end();
  }
});

server.delete("/api/users/:id", (req, res) => {
  console.log(req);
  console.log(req.params);
  const id = req.params.id.toString();
  console.log(id);
  const user = db.getUsersById(id);
  if (user) {
    db.deleteUser(user);
    res.status(204).json({ message: "User successfully deleted" });
  }
  if (!user) {
    res.status(404).json({ message: "User not found" });
  } else {
    res.status(500).json({ message: "User unable to be deleted" });
  }
  res.json({ message: "Received delete request" });
});
// watch for connections on port 5000
server.listen(5000, () =>
  console.log("Server running on http://localhost:5000")
);
