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
    res.status(404).json({ success: false, message: "The user with the specified ID does not exist." });
  }
});

//Post new user
server.post("/api/users", (req, res) => {
  const userInfo = req.body;
  if(userInfo.name&&userInfo.bio){

  userInfo.id = shortid.generate();

  users.push(userInfo);

  res.status(201).json(userInfo);}
  else{
    res.status(400).json({message: "Please provide name and bio for this user." });
  }
});

//Delete by User ID
server.delete("/api/users/:id", (req, res) => {
  const { id } = req.params;

  const deleted = users.find(user => user.id === id);
  if (deleted) {
    users = users.filter(user => user.id !== id);

    res.status(200).json(deleted);
  } else {
    res.status(404).json({ success: false, message: "The user with the specified ID does not exist." });
  }
});

server.patch("/api/users/:id", (req, res) => {
  const { id } = req.params;
  const changes = req.body;
  let found = users.find(user => user.id === id);
  if (found) {
    if (changes.name && changes.bio) {
      Object.assign(found, changes);
      res.status(200).json(found);
    }
    else { res.status(400).json({ success: false, message: "Please provide a name and bio for this user." });}

  } else {
    res.status(404).json({ success: false, message: "The user with the specified ID does not exist." });
  }
});

