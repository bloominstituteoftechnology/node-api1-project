const express = require("express");
const db = require('./data/seeds/users.js');

const server = express();

server.listen(4000, () => {
   console.log("server listening on port 4000")
});

server.use(express.json());

server.get("/", (req, res) => {
   res.send("The server is running properly...")
});

