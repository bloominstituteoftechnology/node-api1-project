// POST	/api/users	
// DELETE	/api/users/:id	
// PUT	/api/users/:id	

// {
//     id: "a_unique_id", // hint: use the shortid npm package to generate it
//     name: "Jane Doe", // String, required
//     bio: "Not Tarzan's Wife, another Jane",  // String, required
//   }

// Step 1: import dependency from node_module (express) using require()
const express = require("express")

// Step 2: import local file for database
const db = require("./database")

// Step 4: create a new express server and add middleware to parse json reqs
const server = express()
server.use(express.json())

// Step 5: response for if someone hits this API, equiv. to home page
server.get("/", (req, res) => {
	res.json({ message: "Intro to Node.js" })
})

// Step 6: response for list of users from "fake" databse
server.get("/users", (req, res) => {
	// gets a list of users from he "fake" database
	const users = db.getUsers()
    res.json(users)
    res.status(200).json(users)
})

// Step 7: process and error response for getting a user by id
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

// Step 8: process and error response for posting to user api
server.post("/users", (req, res) => {
	// creates a new user in our "fake" database and returns the new user data
	const newUser = db.createUser({
		name: req.body.name,
	})

	res.status(201).json(newUser)
})





// Step 3: to start, use node server.js in terminal
server.listen(8080, () => {
    console.log("Server started on port 8080")
}) 
server.get("/")


