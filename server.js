const express = require("express")

const db = require("./database")
const { updateUser } = require("./database")
// database import

const server = express()
server.use(express.json())

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
    res.status(404).json({message: "User not found"})
}
})

server.post("/api/users", (req, res) => {
    const newUser = db.createUser({
        name:req.body.name,
        bio:req.body.bio,

    })

    res.status(201).json(newUser)
})

server.delete("/api/users/:id", (req,res) => {
 const user = db.getUserById(req.params.id)
    if(user) {
        db.deleteUser(req.params.id)
        res.status(204).end()
    } else {
        res.status(404).json({
            message:"User not found"
        })
    }
})
server.put("/api/users/:id"), (req,res) => {
    const id = req.params.id
const user = db.getUserById(id)
if (user) {
    const editedUser = db.updatedUser({
        name:req.body.name
    })
    res.status(200).json(updatedUser)
} else {
    res.status(404).json({ message: "The user with the specified ID does not exist." }})
}

}

server.listen(8080, () => {
    console.log("Server started on port 8080")
})

// app.put('/user', function (req, res) {
//     res.send('Got a PUT request at /user')
//   }) put request