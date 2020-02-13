// implement your API here
const express = require("express")
let users = require("./data/db.js")

const server = express()
server.use(express.json())

server.get("/", (req, res) => {
	res.json({ message: "hello, world" })
})

server.get("/api/users", (req,res)=>{
  users.find()
    .then(response =>{
      console.log(response);
      res.status(200).json(response)
    })
    .catch(err =>{
      console.log(err);
      res.status(500).json(err.message)
            })
    
})

server.get("/api/users/:id", (req,res)=>{
  users.findById(req.params.id)
    .then(user =>{
      if(user){
        console.log(user);
        res.status(200).json(user)
      } else{
          res.status(404).json({ message: "The user with the specified ID does not exist." })
      }
    })
    .catch(err=>{
      console.log(err);
      res.status(500).json({ errorMessage: "The user information could not be retrieved." })
    })
})


server.post("/api/users", (req,res)=>{
    if(req.body.name && req.body.bio){
      const newUser ={
          name: req.body.name,
          bio: req.body.bio,
      }
      users.insert(newUser)
      res.status(201).json(newUser)
    }else if(!req.body.name || !req.body.bio) {
      res.status(400).json({ errorMessage: "Please provide name and bio for the user." })
    }else {
      res.status(500).json( { errorMessage: "There was an error while saving the user to the database" })
    }
  })

server.delete("/api/users/:id",(req,res)=>{
  users.remove(req.params.id)
    .then(users=>{
      console.log(users);
      if(users){
        res.status(200).json({message: "User deleted"})
      }else{
        res.status(404).json({ message: "The user with the specified ID does not exist." })
      }
    })
      .catch(err=>{
        console.log(err);
        res.status(500).json({ errorMessage: "The user could not be removed" })
      })
    })

server.put("/api/users/:id",(req,res)=>{
  const user=req.body
  users.update(req.params.id,user)
  .then(users=>{
    console.log(users);
    if(req.body.name && req.body.bio){
      res.status(200).json({message: "User updated"})
    }else if(!req.body.name || !req.body.bio){
      res.status(400).json({ errorMessage: "Please provide name and bio for the user." })
    }else{
      res.status(404).json({ message: "The user with the specified ID does not exist." })
  }
})
    .catch(err=>{
      console.log(err);
      res.status(500).json({ errorMessage: "The user information could not be modified." })
    })
  })

server.listen(8080, () => {
	console.log(`server started at http://localhost:8080`)
})