const express = require("express")
const db = require("./users/model")

const server = express()

server.use(express.json())

server.get("/api/users", (req, res) => {
    const users = db.find()
    res.json(users)
})

server.get("/api/users/:id", (req, res) => {
    const user = db.findById(req.params.id)
    if(user) {
        res.json(user)
    } else {
        res.status(404).json({
            message: "user not found"
        })
    }
})

server.post("/api/users", (req, res) => {
    const newUser = db.insert({
        id: req.body.id,
        name: req.body.name,
        bio: req.body.bio
    })
    // if(newUser) {
    //     res.json(user)
    // } else {
    //     res.status(404).json({
    //         message: "user not found"
    //     })
    // }
    res.json(newUser)
})

server.delete("/api/users/:id", (req, res) => {
    const user = db.findById(req.params.id)

	if (user) {
		db.remove(user.id)
		res.status(204).end()
	} else {
		res.status(404).json({
			message: "user not found",
		})
	}
})

server.put("/api/users/:id", (req, res) => {
    const user = db.findById(req.params.id)

	if (user) {
		const updatedUser = db.update(user.id, {
			// use a fallback value so we don't accidentally set it to empty
			name: req.body.name || user.name,
		})
		res.json(updatedUser)
	} else {
		res.status(404).json({
			message: "user not found",
		})
	}
})

module.exports = server
