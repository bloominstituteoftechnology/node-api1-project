const express = require("express"); // import the express package

const server = express(); // creates the server

const data = require("./database");
const { deleteUser } = require("./database");


// handle requests to the root of the api, the / route
server.get("/", (req, res) => {
  res.send("Hello from Express");
});

server.get("/api/users", (req, res, next) => {
const users = data.getUsers()
res.json(users)
});

server.post("/api/users", (req, res, next) => {
    const user = data.createUsers()
    res.json(user)
})

server.get("/api/users/:id", (req, res, next) => {
  const user = data.getUsersById(req.params.id)
  res.json(user)
});

server.put("api/users/:id", (req, res, next)=>{
    const user = data.updateUser(req.params.id)
    res.json(user)
})

server.delete("api/users/:id", (req, res, next)=>{
    deleteUser(req.params.id)
})
// watch for connections on port 5000
server.listen(5000, () =>
  console.log("Server running on http://localhost:5000")
);
