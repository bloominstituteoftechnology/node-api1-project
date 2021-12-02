// BUILD YOUR SERVER HERE

const express = require("express")
const userServer = require("./users/model")

const server = express()

server.use(express.json())

//[POST] /api/users 
server.post("/api/users", (req, res) => {
	const newUser = req.body
	userServer.insert(newUser)
		.then(user => {
			res.status(201).json(user)
		})
		.catch(err => {
			res.status(500).json({message: err.message})
		})
})

//[GET] /api/users
server.get("/api/users", (req, res) => {
	userServer.find()
		.then(users => {
			res.status(200).json(users)
		})
		.catch(err => {
			res.status(500).json({message: err.message})
		})
})

//[GET] /api/users/:id
server.get("/api/users/:id", (req, res) => {
	const userId = req.params.id
	userServer.findById(userId)
		.then(user => {
			if (!user) {
				res.status(400).json(`user with id ${userId} does not exist`)
			} else {
				res.status(200).json(user)
			}
		})
		.catch(err => {
			res.status(500).json({message: err.message})
		})
})

//[DELETE] /api/users/:id
server.delete("/api/users/:id", async (req, res) => {
	try {
		const { id } = req.params
		const deletedUser = await userServer.remove(id)
		if (!deletedUser) {
			res.status(404).json("User does not exist")
		} else {
			res.status(201).json(deletedUser)
		}
	}
	catch (err) {
			res.status(500).json({message: err.message})
		}
})

//[GET] / makes sure server works
server.use("*", (req, res) => {
	res.status(404).json({message: "server is live"})
})
module.exports = server; // EXPORT YOUR SERVER instead of {}
