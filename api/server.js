// BUILD YOUR SERVER HERE
const express = require("express");
const User = require("./users/model");

const server = express();

server.use(express.json());

server.get("/api/users", async (req, res) => {
  try {
    const users = await User.find()
    console.log(users)
    res.status(200).json(users)
  } catch (err) {
    res.status(500).json({
      message: err.message,
      customMessage: "something bad happened while getting users"
    })
  }
})

server.get("/api/users/:id", async (req, res) => {
  try {
    const { id } = req.params
    const user = await User.findById(id)
    if (!user) {
      res.status(404).json({
        message: "The user with the specified ID does not exist"
      })
    } else {
      res.status(200).json(user)
    }
  } catch (err) {
    res.status(500).json({
      message: err.message,
      customMessage: "something bad happened while getting user by id"
    })
  }
})

server.post("/api/users", async (req, res) => {
  try {
    const { name, bio } = req.body
    if (!name || !bio) {
      res.status(400).json({
        message: "Please provide name and bio for the user"
      })
    } else {
      const newUser = await User.insert({ name, bio })
      res.status(201).json(newUser)
    }
  }catch (err) {
    res.status(500).json({
      message: err.message,
      customMessage: "something bad happened while creating user"
    })
  }
})

module.exports = server; // EXPORT YOUR SERVER instead of {}
