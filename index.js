const express = require('express');

const server = express();

server.get('/', (req, res) => {
  res.status(200).json({ hello: "My first API"})
})

const users = [
  {
    id: "1", // hint: use the shortid npm package to generate it
    name: "Jane Doe", // String, required
    bio: "Not Tarzan's Wife, another Jane",  // String, required
  },
]

//GET /users
server.get("/users", (req, res) => {
  res.status(200).json({data: users });
});

const port = 5000;
server.listen(port, () => console.log("server running ..."));