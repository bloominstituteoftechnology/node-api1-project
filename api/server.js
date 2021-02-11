// BUILD YOUR SERVER HERE
const express = require("express");
const db = require("./users/model");

const server = express();

server.use(express.json());
server.use(express.urlencoded({extended: false}));

server.get("/", (req,res) => {
  res.json({message: "Hello!"});
});

server.get("/api/users", (req,res) => {
  db.find()
  .then((response) => {
    res.json(response);
  })
  .catch(() => {
    res.status(500).json({ message: "The users information could not be retrieved" });
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
})

server.get("/api/users/:id", (req,res) => {
  db.findById(req.params.id)
  .then((response) => {
    if(response)
      res.json(response);
    else
      res.status(404).json({ message: "The user with the specified ID does not exist" });
  })
  .catch(() => {
    res.status(500).json({ message: "The user information could not be retrieved" });
  })
})

server.delete("/api/users/:id", (req,res) => {
  db.remove(req.params.id)
  .then((response) => {
    if(response)
      res.json(response);
    else
      res.status(404).json({ message: "The user with the specified ID does not exist" });
  })
  .catch(() => {
    res.status(500).json({ message: "The user could not be removed" });
  })
})

server.put("/api/users/:id", (req,res) => {
  if(!req.body.name || !req.body.bio)
    res.status(400).json({ message: "Please provide name and bio for the user" });
  else{
    db.update(req.params.id, {...req.body})
    .then((response) => {
      if(response)
        res.status(200).json(response);
      else
        res.status(404).json({ message: "The user with the specified ID does not exist" });
    })
    .catch(() => {
      res.status(500).json({ message: "The user information could not be modified" });
    })
  }
  
})

module.exports = server; // EXPORT YOUR SERVER instead of {}
