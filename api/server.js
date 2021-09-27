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
      customMessage: 'something bad happened while getting users'
    })
  }
})

module.exports = server; // EXPORT YOUR SERVER instead of {}
