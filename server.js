// brings in mdules. we use require instead of import
const express = require("express");
const shortid = require("shortid");

// brings in express
const server = express();

// shows express how to use JSON
server.use(express.json());

// trying a number instead of a string
let userId = 3;

// since we don't have a real db here is some starting data
let users = [
  {
    // id: shortid.generate(),
    id: 1,
    name: "Jane Doe",
    bio: "Not Tarzan's Wife, another Jane",
  },
  {
    id: 2,
    name: "Chad Simpson",
    bio: "One big dude",
  },
];

// gets all users from db. if db cannot be found returns an error in the catch.
server.get("/api/users", (req, res) => {
  try {
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({
      errorMessage: "The users information could not be retrieved",
    });
  }
});

// gets a user from db by their id. If no match for id is found then returns an error msg. If db is not found returns an error msg
server.get("/api/users/:id", (req, res) => {
  try {
    const id = Number(req.params.id);
    let user = users.filter((user) => user.id === id);
    if (user.length > 0) {
      res.status(200).json(user);
    } else {
      res
        .status(404)
        .json({ message: "The user with the specified ID does not exist." });
    }
  } catch (err) {
    res.status(500).json({
      errorMessage: "The user information could not be retrieved",
    });
  }
});

// creates a new user in the db. if not enough info is provided an error msg is returned. if db cannot be found an error is returned
server.post("/api/users", (req, res) => {
  try {
    let userInfo = {
      id: userId,
      ...req.body,
    };
    userId++;
    if (userInfo.name && userInfo.bio) {
      users.push(userInfo);
      res.status(201).json(userInfo);
    } else {
      res
        .status(400)
        .json({ errorMessage: "Please provide name and bio for the user." });
    }
  } catch (err) {
    res.status(500).json({
      errorMessage: "There was an error while saving the user to the database",
    });
  }
});

// deletes a user from the db. checks to see if the id sent matched any ids in the db. if it does then it deletes the user and responds. if not then is says user doesnt exist. If the db dousnt respond it returns a meassge that the user could not be returned.
server.delete("/api/users/:id", (req, res) => {
  try {
    const id = Number(req.params.id);
    let user = users.filter((user) => user.id !== id);
    if (user.length != users.length) {
      users = user;
      res.status(200).json(users);
    } else {
      res.status(404).json({
        message: "The user with the specified ID does not exist.",
      });
    }
  } catch {
    res.status(500).json({
      errorMessage: "The user could not be removed",
    });
  }
});

server.put("/api/users/:id", (req, res) => {
  try {
    const id = Number(req.params.id);
    let userToEdit = users.find((user) => user.id === id);
    if (userToEdit.id === id) {
      if (!req.body.name || !req.body.bio) {
        res.status(400).json({
          errorMessage: "Please provide name and bio for the user.",
        });
      } else {
        let user = users.filter((user) => user.id !== id);
        users = user;
        newUser = {
          id: userToEdit.id,
          name: req.body.name,
          bio: req.body.bio,
        };
        users.push(newUser);
        res.status(200).json(newUser);
      }
    } else {
      res.status(404).json({
        message: "The user with the specified ID does not exist.",
      });
    }
  } catch {
    res.status(500).json({
      errorMessage: "The user information could not be modified.",
    });
  }
});

// generic get request that returns the server is running
server.get("/", (req, res) => {
  res.json({ api: "Up and running!" });
});

server.listen(8000, () => console.log("\n== API is up ==\n"));
