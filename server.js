//this is pulling the dependency from the 'node_modules' instead of the standard library
const express = require("express")

const db = require("./database")

const shortid = require("shortid")
//we can use 'req to get information about the http request
//we can use 'res' to set information on the outgoing http response
const server = express() 

server.use(express.json())

server.get("/", (req, res) => {
    res.json({ message: "Hello, World" })
})

server.get("/api/users", (req, res) => {
    //gets a list of users from our "fake" database
    const users = db.getUsers()

    if(users) {
        res.json(users)
    } else {
        res.status(500).json({
            errorMessage: "The users information could not be retrieved.",
        })
    }
})

server.get("/api/users/:id", (req, res) => {
    //gets a list of users from our "fake" database
    const id = req.params.id
    const user = db.getUserById(id)

    if (user) {
        try{
            res.json(user)
        } catch (err) {
            res.status(500).json({ 
                errorMessage: "The user information could not be retrieved."
            })}
        } else {
            res.status(404).json({
                errorMessage: "The user with the specified ID does not exist",
            })}
})

server.post("/api/users", (req, res) => {
    if(req.body.name && req.body.bio) {
    const newUser = db.createUser({
        name: req.body.name,
        bio: req.body.bio
    })

    try {
        return res.status(201).json(newUser)
    } catch (err)  {
        return res.status(500).json({errorMessage: "There was an error while saving the user to the database."})}
    } else {
        res.status(404).json({errorMessage: "Please provide name and bio for the user"})}
    })

server.put("/api/users/:id", (req, res) => {
    try{
        const id = req.params.id
        const user = db.getUserById(id)
    if(!req.body.name || !req.body.bio) {
        res.status(400).json({
            errorMessage:"Please provide name and bio for the user."
        })}
        else if (!user){
            res.status(404).json({ errorMessage: "The user with the specified ID does not exist."})
        } else {
            db.updateUser(id, {
                name: req.body.name,
                bio: req.body.bio
            })
            res.status(200).json(user)
        }
    } catch(err) {
        res.status(500).json({
            errorMessage:"The user information could not be modified."
        })
    }
})

server.delete("/api/users/:id", (req, res) => {
    const user= db.getUserById(req.params.id)

    if (user) {
        try {
            db.deleteUser(user.id)
            res.status(204).end()
        } catch (err) {
            res.status(500).json({
                errorMessage:"The user could not be removed."
            })}
        } else {
        res.status(404).json({
            errorMessage:"The user with the speified ID does not exist."}
        )}
    })

server.listen(8080, () => {
    console.log("Server started on port 8080")
})
