const express = require("express");
const server = express();
const helmet = require("helmet");
const cors = require("cors");
const session = require("express-session");
const KnexSessionStore = require("connect-session-knex")(session);
const { restrictedUser } = require("../middleware/global-middleware");

//SERVER SESSIONS
const sessionConfig = {
  name: "sessionID",
  secret: process.env.SECRET[0],
  cookie: {
    maxAge: 3600 * 1000,
    secure: false,
    httpOnly: true, // this should always be false on a deployed site so that it's secure
  },
  resave: false, // don't save cookie unless user allows it
  saveUninitialized: false,
  //create a sessions table in database
  store: new KnexSessionStore({
    knex: require("../database/dbConfig"),
    tablename: "sessions_table",
    sidfieldname: "sessions_id",
    createTable: true,
    clearInterval: 3600 * 1000,
  }),
};

//GLOBAL MIDDLEWARE
server.use(express.json(), helmet(), cors(), session(sessionConfig));

//IMPORT ROUTERS
const userRouter = require("../users/users-router");
const authRouter = require("../auth/auth-router");

//Server endpoints ------->
server.use("/api/users", restrictedUser(), userRouter);
server.use("/api/auth", authRouter);

//middleware for CATCH ERROR on all endpoints of /api/messages
server.use((err, req, res, next) => {
  console.log(err);
  res.status(500).json({
    message: "500 error: Something went wrong",
  });
});

module.exports = server;
