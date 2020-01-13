// implement your API here
const express = require("express");

const Users = require("./data/db.js");

const server = express();

//post
server.post("/api/users", (req, res) => {
  const userInfo = req.body;
  if (userInfo.name && userInfo.bio) {
    Users.insert(userInfo)
      .then(result => {
        res.status(201).json(result);
      })
      .catch(error => {
        res.send(500).json({
          error: "There was an error while saving the user to the database"
        });
      });
  } else
    res
      .status(400)
      .json({ errorMessage: "Please provide name and bio for the user." });
});

// get request