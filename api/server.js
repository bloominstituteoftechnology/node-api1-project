const express = require("express");
const server = express();
const helmet = require("helmet");
const cors = require("cors");

//SERVER SESSIONS

//GLOBAL MIDDLEWARE
server.use(express.json(), helmet(), cors());

//IMPORT ROUTERS
const userRouter = require("../users/users-router");

//Server endpoints ------->
server.use("/api/users", userRouter);

//middleware for CATCH ERROR on all endpoints of /api/messages
server.use((err, req, res, next) => {
  console.log(err);
  res.status(500).json({
    message: "500 error: Something went wrong",
  });
});

module.exports = server;
