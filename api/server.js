// BUILD YOUR SERVER HERE
const express = require("express")

const db = require("./users/model")

const server = express()

server.use(express.json())

//enpoints below//


server.get("/", (req, res) => {
  res.send('<h1>Node API1 Project</h1>')
})


server.post("/api/users", (req, res) => {
  const {name, bio} = req.body

  if (!name || !bio) {
    res.status(400).json({ message: "Please provide name and bio for the user"})
  } else {
      db.insert({name: req.body.name, bio: req.body.bio})
        .then(success => {
          res.status(201).json(success)
        })
        .catch(() => {
          res.status(500).json({ message: "There was an error while saving the user to the database"})
      })
    }
})


server.get("/api/users", (req, res) => {
  db.find()
    .then(success => {
      res.json(success)
    })
    .catch(() => {
      res.status(500).json({ message: "The users information could not be retrieved"})
  })
})
  

server.get("/api/users/:id", (req, res) => {
  db.findById(req.params.id)
    .then(success => {
      if(!success) 
        res.status(404).json({ message: "The user with the specified ID does not exist"})
      else
        res.json(success)
    })
    .catch(() => {  
      res.status(500).json({ message: "The user information could not be retrieved"})
  })
})


server.delete("/api/users/:id", (req, res) => {
  db.remove(req.params.id)
    .then(success => {
      if(!success)
        res.status(404).json({ message: "The user with the specified ID does not exist"})
      else
        res.json(success)
    })
    .catch(() => {
      res.status(500).json({ message: "The user could not be removed"})
  })
})


server.put("/api/users/:id", (req, res) => {
  const {name, bio} = req.body
    if (!name || !bio) {
      res.status(400).json({ message: "Please provide name and bio for the user"})
    } else {
      db.update(req.params.id, req.body)
        .then(success => {
          if(!success)
            res.status(404).json({ message: "The user with the specified ID does not exist"})
          else
            res.status(200).json(success)
          })
          .catch(() => {
            res.status(500).json({ message: "The user information could not be modified"})
        })
      }
})



module.exports = server; // EXPORT YOUR SERVER instead of {}
