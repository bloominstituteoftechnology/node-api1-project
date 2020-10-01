const express = require('express') //like an import statement

const server = express()

const db = require("./database")

server.use(express.json())

server.get("/", (req, res) => {
	res.json({ message: "Hello, World" })
})

server.get('/api/users', (req,res) => {
    const users = [ {
        id: 1,
        name: "Elizabeth Hagag",
        bio: "Creating This Site"
    }]
    if (users) {
        res.json(users)
    } else {
        res.status(500).json({ errorMessage: "The users information could not be retrieved." })
    }
})

server.listen(5000, () => {
    console.log('server running on http://localhost:5000')
})