const express = require("express");
const User = require("./user-model");
const server = express();

server.use(express.json());

server.post("/api/users", async (req, res) => {
  const user = req.body;

  if (!user.name || !user.bio) {
    res
      .status(400)
      .json({ message: "Please provide name and bio for the user." });
  } else {
    //save user to the database
    try {
      const createdUser = await User.create(user);
      res.status(201).json(createdUser);
    } catch (err) {
      res.status(500).json({
        errorMessage:
          "There was an error while saving the user to the database",
      });
    }
  }
});

server.get("/api/users", (req, res) => {
    try {
        const users = await User.findAll();
        res.status(201).json(users);
      } catch (err) {
        res.status(500).json({
          errorMessage:
            "The users information could not be retrieved.",
        });
      }

});

server.get("/api/users/:id", (req, res) => {});

server.delete("/api/users:id", (req, res) => {});

server.put("/api/users:id", (req, res) => {});

module.exports = server;
