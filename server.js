const express = require("express");

const db = require("./database");
const { getUserById } = require("./database");

const server = express();

server.use(express.json());

//Test to see if server is running
server.get('/', (req, res) => {
  res.json({ message: 'API Welcomes You' });
});

// server.listen(8000, () => {
//     console.log("server start at 8000")
// })