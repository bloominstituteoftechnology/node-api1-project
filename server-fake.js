const express = require("express")
const server = express()

const express = require("express")
const db = require("./database")

// creates a new express server
const server = express()

// installing some middleware that helps us parse JSON request bodies.
// we'll talk about this later, just copy it over for now
server.use(express.json())

server.get("/", (req, res) => {
	res.json({ message: "Hello, World" })
})

server.get("/users", (req, res) => {
	// gets a list of users from our "fake" database
	const users = db.getUsers()
	res.json(users)
})

server.get("/users/:id", (req, res) => {
	// the param variable matches up to the name of our URL param above
	const id = req.params.id
	// get a specific user by their ID from the "fake" database
	const user = db.getUserById(id)

	// make sure the system doesn't break if someone calls the endpoint with
	// a user ID that doesn't exist in the database
	if (user) {
		res.json(user)
	} else {
		res.status(404).json({ message: "User not found" })
	}
})

server.post("/users", (req, res) => {
	// creates a new user in our "fake" database and returns the new user data
	const newUser = db.createUser({
		name: req.body.name,
	})

	res.status(201).json(newUser)
})

server.delete("/users/:id", (req, res) => {
	const user = db.getUserById(req.params.id)

	// make sure the user exists before we try to delete it
	if (user) {
		db.deleteUser(req.params.id)

		// since we have nothing to return back to the client, send a 204 with an empty response.
		// 204 just means "success but we have nothing to return".
		res.status(204).end()
	} else {
		res.status(404).json({
			message: "User not found",
		})
	}
})

server.listen(8080, () => {
	console.log("Server started on port 8080")
})