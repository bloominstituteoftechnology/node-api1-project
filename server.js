const express = require('express');
const shortid = require('shortid');
const server = express();

let users = [
  {
    id: "1",
    name: "Jeff Breig", // String, required
    bio: "Cool person" // String, required
  },
  {
    id: "2",
    name: "Kelly Breig", // String, required
    bio: "Cooler person" // String, required
  }
];

server.listen(5000, () =>{
    console.log("Server running on http://localhost:5000")
});

server.use(express.json());


//Get
server.get("/api/users", (req, res) => {
  res.status(200).json(users);
});

//Get by User ID
server.get("/api/users/:id", (req, res) => {
  const { id } = req.params;
  const found = users.find(user => user.id === id);

  if (found) {
    res.status(200).json(found);
  } else {
    res.status(404).json({ success: false, message: "user id not found" });
  }
});

//Post new user
server.post("/api/users", (req, res) => {
  const userInfo = req.body;
  userInfo.id = shortid.generate();

  users.push(userInfo);

  res.status(201).json(userInfo);
});

//Delete by User ID
server.delete("/api/users/:id", (req, res) => {
  const { id } = req.params;

  const deleted = users.find(user => user.id === id);
  if (deleted) {
    users = users.filter(user => user.id !== id);

    res.status(200).json(deleted);
  } else {
    res.status(404).json({ success: false, message: "user id not found" });
  }
});

server.patch("/api/users/:id", (req, res) => {
  const { id } = req.params;
  const changes = req.body;
  let found = users.find(user => user.id === id);
  if (found) {
    Object.assign(found, changes);
    res.status(200).json(found);
  } else {
    res.status(404).json({ success: false, message: "user id not found" });
  }
});

