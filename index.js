//Imports

const express = require("express")
const shortid = require("shortid")
const server = express()

//counfigure server to use json

server.use(express.json())

//DummyData of users
let userData = [
    {
        id: shortid.generate(),
        name: "Fernando Chavez",
        bio: "I really like coding backend",
    },
    {
        id: shortid.generate(),
        name: "Morgan Eccles",
        bio: "I really like playing animal crossing uwu ",
    },
]
//Helper functions
const User = {
    getAll(){
        return userData
    },
    createNew(user){
        const newUser = { id: shortid.generate(), ...user}
        userData.push(newUser)
        return(newUser)
    }
}

//Server endpoints
server.get('/api/users', (req, res) => {
    const users = User.getAll()
    res.status(200).json(users)
})

server.post('/api/users', (req, res) => {
    const newUser = req.body
    if (!newUser.name || !newUser.bio){
        res.status(400).json({ errorMessage: "Please provide name and bio for the user." })
    }else{
        const newlyCreatedUser = User.createNew(newUser)
        res.status(201).json(newlyCreatedUser)
    }
})

//catch all endpoint
server.use("*", (req, res) => {
    res.status(404).json({ message: "not found" })
})

//starting the server
server.listen(5000, () => {
    console.log("listening on port 5000")
})