// this import is now pulling form node_modules instead of the Node standard library
const express = require("express")
const db = require("./database")

// create an express server instance
const server = express()

//this allows us to parse request JSON bodies
server.use(express.json)

server.get("/", (req, res) => {
    res.json({message: "Hello, World"})
})

server.get("/users", (req, res) => {

    // simulate a real call to a data base to fetch data
    const users = db.getUsers()

    //return data to the client
    res.json(users)
})

server.get("/users/:id", (req, res) => {
    const id = req.params.id
    const user = db.getUserById(id)
    
    //make sure user exists before we try to send it back
    if (user) {
        res.json(user)
    } else { 
        //user doesn't exist
        res.status(404).json({
            message: "User not found",
        })
    }
})


server.post("/users", (req, res) => {
    const newUser = db.createUser({
        name: req.body.name,
    })

    res.status(201).json(newUser)
})

server.put("/users/:id", (req, res) => {
    const id = req.params.id
    const user = db.getUserById(id)

    if (user) {
        const updatedUser = db.updateUser(id, {
            name: req.body.name,
        })
    } else {
        res.status(404).json({
            message: "User not found",
        })
    }
})

server.delete("/users/:id", (req, res) => {
    const id = req.params.id
    const user = db.getUserById(id)

    if (user) {
        const deleteUser = db.deleteUser(id)
        //204 means a successful empty response
        res.status(204).end()
    } else {
        res.status(404).json({
            message: "User not found",
        })
})

// web servers need to be continuously listening
server.listen(8080, () => {
    console.log('server started')
})