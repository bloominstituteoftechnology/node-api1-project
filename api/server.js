const express = require("express")
const db = require("./users/model")

const server = express()

server.use(express.json())

server.get("/api/users", async (req, res) => {
    const users = await db.find()

    if(users) {
        res.json(users)
    } else {
        res.status(500).json({
            message: "The users information could not be retrieved"
        })
    }
    res.json(users)
})

server.get("/api/users/:id", async (req, res) => {
    const user = await db.findById(req.params.id)

    if(user) {
        res.json(user)
    } else if(!user.id) {
        res.status(404).json({
            message: "The user with the specified ID does not exist"
        })
    } else {
        res.status(500).json({
            message: "The user information could not be retrieved"
        })
    }
})

server.post("/api/users", (req, res) => {
    const newUser = db.insert({
        id: req.body.id,
        name: req.body.name,
        bio: req.body.bio
    })
    
    if(newUser) {
        res.json(newUser)
        res.status(201).end()
    } else if(!newUser.name || !newUser.bio){
        res.status(400).json({
            message: "Please provide name and bio for the user"
        })
    } else if(!newUser.name || !newUser.bio){
        res.status(400).json({
            message: "Please provide name and bio for the user"
        })
    } else {
        res.status(500).json({
            message: "There was an error while saving the user to the database"
        })
    }
})

server.delete("/api/users/:id", async (req, res) => {
    const user = await db.findById(req.params.id)

	if (user) {
		db.remove(user.id)
		res.status(204).end()
    } else if(!user.id){
        res.status(404).json({
            message: "The user with the specified ID does not exist"
        })
    } else {
        res.status(500).json({
            message: "The user could not be removed"
        })
    }
})

server.put("/api/users/:id", async (req, res) => {
    const user = await db.findById(req.params.id)

	if (user) {
		const updatedUser = db.update(user.id, {
			// use a fallback value so we don't accidentally set it to empty
			name: req.body.name || user.name,
            bio: req.body.bio || user.bio
		})
		res.json(updatedUser)
        res.status(200).end()
    } else if(!user.id){
        res.status(404).json({
            message: "The user with the specified ID does not exist"
        })
    } else if(!user.name || !user.bio){
        res.status(400).json({
            message: "Please provide name and bio for the user"
        })
    } else {
        res.status(500).json({
            message: "The user information could not be modified"
        })
    }
})

module.exports = server
