const express = require("express")
const shortid = require("shortid")

const server = express()

let users = []

server.use(express.json())

const PORT = 5000
server.listen(PORT, () => 
console.log(`\n ** API running on http://localhost:${PORT} **\n`)
)

server.post("/api/users", (req, res) => {
    const usersInfo = req.body
    usersInfo.id = shortid.generate()

    if (!usersInfo.name  || !usersInfo.bio ){
    res.status(400).json({errorMessage: "Please provide name and bio for the user."})
    }

    else {
        users.push(usersInfo)
    res.status(201).json(usersInfo)
    }
})

server.get("/api/users", (req, res) => {
    
  
        res.status(201).json(users)
    
})

server.get('/api/users/:id', (req, res) => {
    res.status(200).json({users: "get user by id successful!"})

    res.status(404).json({message: "The user with the specified ID does not exist"})
   
    res.status(500).json({errorMessage: "The user information could not be retrieved."})
})

server.delete('/api/users/:id', (req, res) => {
    res.status(200).json({users: "delete user by id successful!"})

    res.status(404).json({message: "The user with the specified ID does not exist."})

    res.status(500).json({errorMessage: "The user could not be removed"})
})

server.patch('/api/users/:id', (req, res) => {
    res.status(200).json({users: "successful"})

    res.status(404).json({message: "The user with the specified ID foes not exist"})

    res.status(400).json({errorMessage: "Please provide name and bio for the user"})

    res.status(500).json({errorMessage: "The user information could not be modified."})
})