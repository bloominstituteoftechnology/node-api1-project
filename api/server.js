// BUILD YOUR SERVER HERE
// IMPORTS AT THE TOP
const express = require("express");
const User = require("./users/model");

// INSTANCE OF EXPRESS APP
const server = express();

// Global Middleware
server.use(express.json())

// ENDPOINTS

// GET	/api/users	Returns an array users.
server.get("/api/users", (req, res) => {
  User.find()
    .then(users => {
      console.log(users)
      res.status(200).json(users)
    })
    .catch(err => {
      res.status(500).json({message:err.message})
    })
})

// POST	/api/users	Creates a user using the information sent inside the request body.
server.post("/api/users", (req, res) => {
  const newUser = req.body;


})


// [GET] / (Catch-All endpoint)
server.use("*", (req, res) => {
  res.status(404).json({ message: "404 not found" })
})

module.exports = server; // EXPORT YOUR SERVER instead of {}
