// implement your API here
// implement your API here
//Import express
const express = require("express");
//Import cors
const cors = require("cors");

//Import database
const db = require("./data/db");

//Set up express instance as a server
const server = express();
//Set up middleware to parse request body
server.use(express.json()); // for parsing application/json
server.use(cors()); //for using cors in all requests, and thus enable different origins
//Root route GET
server.get("/", (req, res) => {
  res.send("I'm a dummy server");
});

//users route GET
//Returns an array of user objects
server.get("/users", async (req, res) => {
  try {
    const users = await db.find();
    res.status(200).json(users);
  } catch (error) {
      console.log(error);
    res
      .status(500)
      .json({ error: "The users information could not be retrieved." });
  }
});

//user by id route GET
server.get("/users/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const hub = await db.findById(req.params.id);
    if (hub) {
      res.status(200).json(hub);
    } else {
      res
        .status(404)
        .json({ message: "The user with the specified ID does not exist." });
    }
  } catch (error) {
    res
      .status(500)
      .json({ error: "The users information could not be retrieved." });
  }
});

//POST /users route
server.post("/users", async (req, res) => {
  //If the request body is missing the name or bio property:
  const { name, bio } = req.body;
  if (name && bio) {
    try {
      const newUser = await db.insert(req.body);
      res.status(201).json(newUser);
    } catch (error) {
      const { message, stack } = error;
      res.status(500).json({ message, stack });
    }
  } else {
    res
      .status(400)
      .json({ errorMessage: "Please provide name and bio for the user." });
  }
});

//DELETE /users/:id
//Expects user id in the url
//Returns deleted user object
server.delete("/users/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const deletedUser = await db.remove(id);
    if (deletedUser) {
      res.status(200).json({ message: "User succesfully deleted!" });
    } else {
      res.status(404).json({ error: "Couldn't find user" });
    }
  } catch (error) {
    console.error(error);
    const { message, stack } = error;
    res.status(500).json({ message, stack });
  }
});

server.put("/users/:id", async (req, res) => {
  const { id } = req.params;
  const changes = req.body;
  if (changes.bio && changes.name) {
    try {
      const updatedUser = await db.update(id, changes);
      if (updatedUser) {
        res.status(200).json({ message: "User data succesfully updated" });
      } else {
        res.status(404).json({ error: "Couldn't find user" });
      }
    } catch (error) {
      console.log(error);
      const { message, stack } = error;
      res.status(500).json({ message, stack });
    }
  } else {
    res
      .status(400)
      .json({ errorMessage: "Please provide name and bio for the user." });
  }
});

server.listen(8000, () => {
  console.log(`Server listening on port 8000`);
});
