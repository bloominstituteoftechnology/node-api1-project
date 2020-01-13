// implement your API here
const express = require("express");

const server = express();

server.get("/", (req, res) => {
    res.send("Hello world from Express!");
  });

const port = 7000;
server.listen(port, () => console.log(`server listening on port ${port}`));