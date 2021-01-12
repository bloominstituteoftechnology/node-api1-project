const express = require("express");
const usersRouter = require("../users/user-router.js");

const server = express();

server.use(express.json()); // configures the app to read the body of requests
server.use(cors());

server.use("/api/users", usersRouter);

server.get("/", (req, res) => {
  res.json({ message: "Welcome to the API" });
});

module.exports = server;
