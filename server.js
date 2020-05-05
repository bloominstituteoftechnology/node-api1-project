const express = require("express");
const shortid = require("shortid");

const server = express();

server.use(express.json());

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

server.get("/api/users", (req, res) => {
  try {
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({
      errorMessage: "The users information could not be retrieved",
    });
  }
});

server.get("/api/users/:id", (req, res) => {
  try {
    const id = Number(req.params.id);
    user = users.filter((user) => user.id === id);
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

server.post("/api/users", (req, res) => {
  try {
    let userInfo = {
      id: shortid.generate(),
      ...req.body,
    };
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

server.get("/", (req, res) => {
  res.json({ api: "Up and running!" });
});

server.listen(8000, () => console.log("\n== API is up ==\n"));
