const express = require('express')
const server = express()

server.use(express.json())

//database
let users = [
    {
        id:"1",
        name:"Ariel Rodriguez",
        bio:"Papa, Developer, Tinkerer"
    },
    {
        id:"2",
        name:"Lauren Chil",
        bio:"Mama, Boss_B, Leader"
    },
    {
        id:"3",
        name:"Ellie Arielle",
        bio:"Three-nager"
    }
]

// Functions for our CRUD App

//POST Request
server.post("/api/users", (req, res) => {
    const user = req.body
    (user.name || user.bio === false 
        ? res.status(400).json({
            errorMessage: "Please provide name and bio for the user."
        })
        :
          users.push(user)
        )
        res.status(201).json(users)
})

//GET REQUEST
server.get("/api/users", (req, res) => {
    res.status(200).json(users)
})

//listen to server traffic 
const port = 8000;
server.listen(port, () => console.log("\n === Sever 8000 === \n"))