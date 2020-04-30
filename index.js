const express = require ('express')
const db =require('./database')
const server = express()

server.post("/uses", (req, res) =>{
    const newUser = db.createUser({
        name: req.body.name,
        bio: req.body.bio,
    })


if (newUser){
    try{
        res.status(201).json(newUser)
    } catch {
        res.status(500).json({
            errorMessage: "An error occured saving user to database."
        })
    }
} else {
    res.status(400).json({
        errorMessage: "Name and bio required for user."
    })
}
})

server.get("/users", (req, res) => {
    const users = db.getUsers()


    if (users) {
        res.json(users)
    } else {
        return res.status(500).json({
            errorMessage: "The users information could not be retrieved."
        })
    }


})

server.get("/users/:id", (req, res) => {
    const userId = req.params.id
    const user = db.getUserById(userId)

    if (user) {
        try {
            res.json(user)
        } catch {
            res.status(500).json({
                errorMessage: "User data could not be retrieved."
            })
        }
    } else {
        res.status(404).json({
            message: "User with specified ID does not exist."
        })
    }
})

server.delete("/users/:id", (req, res) => {
    const user = db.getUserById(req.params.id)
    const err = new Error

    if (user) {
        try {
            db.deleteUser(user.id)
            res.status(204).end()
        } catch {
            res.status(500).json({
                errorMessage: "User cannot not be removed"
            })
        }
    } else {
        res.status(404).json({
            message: "User with the specified ID does not exist."
        })
    }
})

server.put("/users/:id", (req, res) => {
    const user = db.getUserById(req.params.id)

    if (user) {
        try {
            const updatedUser = db.updateUser(user.id, {
                name: req.body.name || user.name,
                bio: req.body.bio || user.bio,
            })
            res.status(200).json(updatedUser)
        } catch (err) {
            res.status(500).json({
                errorMessage: "User information could not be modified."
            });
        }
    } else {
        res.status(404).json({
            errorMessage: "User with specified ID does not exist."
        })
    }
})

server.listen(8080, () => {
    console.log("Server started at port 8000")
})  