// BUILD YOUR SERVER HERE
const express = require("express");
const db = require("./users/model");

const server = express();

server.use(express.json());
server.use(express.urlencoded());

server.get("/", (req,res) => {
  res.json({message: "Hello!"});
});

server.get("/api/users", (req,res) => {
  db.find()
  .then((response) => {
    res.json(response);
  })
})

server.post("/api/users", (req,res) => {
  if(!req.body.name || !req.body.bio)
    res.status(400).json({ message: "Please provide name and bio for the user" });
  else{
    db.insert({name: req.body.name, bio: req.body.bio})
    .then((response) => {
      res.status(201).json(response);
    })
    .catch(() => {
      res.status(500).json({ message: "There was an error while saving the user to the database" });
    })
  }
  
  /*
  const newUser = db.insert({
    name: req.body.name,
    bio: req.body.bio
  })
  res.status(201).json(newUser);
  */
})

module.exports = server; // EXPORT YOUR SERVER instead of {}
