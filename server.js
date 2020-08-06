const express = require("express")
const db = require("./database")
const server = express()
server.use(express.json())

server.get("/", (req, res) => {
	res.json({ message: "Getting server" })
})

server.get("/api/users", (req, res) => {
	const users = db.getUsers()
	res.json(users)
})

server.post("/api/users", (req, res) => {
    const {name, bio} = req.body;

    if (!name || !bio) {
         res.status(400).json({
            errorMessage: "Please provide name and bio for the user." 
        })
    } else if (name && bio) {
        const newUser = db.createUser({
            name: req.body.name,
            bio: req.body.bio
        })
        res.status(201).json(newUser)
    } else {
        res.status(500).json({ errorMessage: "There was an error while saving the user to the database"})
    }
})

//get
server.get("/api/users", (req, res) => {
    const users = db.getUsers()
    if (users) {
        res.json(users)
    } else {
        res.status(500).json({ errorMessage: "The users information could not be retrieved." })
    }
})

server.get("/api/users/:id", (req, res) => {
	const id = req.params.id
	const user = db.getUserById(id)
	if (user) {
		res.json(user)
	} else {
		res.status(404).json({ message: "The user with the specified ID does not exist."  })
	}
})

//delete
server.delete("/api/users/:id", (req, res) => {
    try {
        const user = db.getUserById(req.params.id)
	if (user) {
		db.deleteUser(req.params.id)
		res.status(204).end()
	} else {
		res.status(404).json({
			message: "The user with the specified ID does not exist.",
		})
    }
    } catch (err) {
        res.status(500).json({ errorMessage: "The user information could not be retrieved"})
    }
})

//put 
server.put("/api/users/:id", (req, res) => {
    const user = db.getUserById(req.params.id)
    const {name, bio} = req.body;

    if (user) {
         const updatedUser = db.updateUser(user.id , {
             name: name || user.name,
             bio: bio || user.bio
         })
         res.status(200).json(updatedUser)
        } else if (!name || !bio) {
            res.status(400).json({
                errorMessage: "Please provide name and bio for the user." 
            })
        } else if (!user) {
            res.status(404).json({
                message: "The user with the specified ID does not exist.",
            })
        } else {
            res.status(500).json({ errorMessage: "The user information could not be modified."})
        }
    
})

server.listen(8080, () => {
	console.log("Server started on port 8080")
})