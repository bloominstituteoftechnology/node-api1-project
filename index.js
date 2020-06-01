// import express
const express = require("express");
const shortid = require("shortid");
const idG = shortid.generate();

// create a server
const server = express();

// middleware

server.use(express.json());

let codeServer = [
  {
    id: 1,
    name: "cody",
    bio: "I am an aspiring full stack web dev, backend is awesome.",
  },
];
// a function to handle GET/ requests
server.get("/codeServer", (req, res) => {
  res.status(200).json(codeServer);
});

// a function to handle POST/ requests
server.post("/api/users", (req, res) => {
  const user = req.body;
  codeServer.push(user);
  if (codeServer) {
    res.status(200).json(codeServer);
  } else {
    res.status(400).json({ errorMessage: "this is an error" });
  }
  // res.status(200).json(codeServer);
  // res.status(400).json({ errorMessage: "this is an error" });
});

// listen to server port
const port = 9000;

server.listen(port, () => {
  console.log(`\n == API on port ${port} == \n`);
});
