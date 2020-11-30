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
    }
}

//Server endpoints
server.get('/api/users', (req, res) => {
    const users = User.getAll()
    res.status(200).json(users)
})

//catch all endpoint
server.use("*", (req, res) => {
    res.status(404).json({ message: "not found" })
})

//starting the server
server.listen(5000, () => {
    console.log("listening on port 5000")
})