const express = require('express') //like an import statement
const db = require("./database")

const server = express()



server.use(express.json())


server.get('/api/users', (req, res) => {
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
		res.status(404).json({
			message: "The user with the specified ID does not exist.",
		})
	}
})

server.post('/api/users', (req, res) => {

    if (!req.body.name || !req.body.bio) {
        return res.status(400).json({
            errorMessage: "Please provide name and bio for the user." 
        })
    }

    const newUser = db.createUser({
        name: req.body.name,
        bio: req.body.bio
    })
    res.status(201).json(newUser)
})

server.delete("/api/users/:id", (req, res) => {
    const id = req.params.id
    const user = db.getUserById(id)

    if(user) {
        db.deleteUser(id)
        res.status(204).end()
    } else {
        res.status(404).json({
            message: "The user with the specified ID does not exist."
        })
    }
})

server.listen(5000, () => {
    console.log('server running on http://localhost:5000')
})