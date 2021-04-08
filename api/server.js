const express = require("express")
const server = express()
const db = require("./users/model")
server.use(express.json()) //< --must include to parse from JSON


server.get("/", (req, res) => {
    res.json({ message: "Lambda 5000 webpt24. Yo, World!" })
})


server.post("/api/users", (req, res) => {
    const newUser = db.insert({
        id: req.body.id,
        name: req.body.name, 
        bio: req.body.bio,
    })
    if (newUser){ 
        res.status(201).json(newUser);
    } else if ( !newUser.name && !newUser.bio) {
        res.status(400).json({ message : "please provide name and bio for the user"})
    } else {
        res.status(500).json({ message: "There was an error while saving the user to the database"})
    }

})

// server.post("/api/users", (req, res) =>{
//     const newUser = db.insert({
//         name: req.body.name, 
//         bio: req.body.bio,
//     })

//     if (newUser) {
//         res.status(201).json(newUser)
//         } else if (!newUser) {
//                 res.status(400).json({
//                 message: "Please provide name and bio for the user",
//             })
//         } else {
//             res.status(500).json({
//             message: "There was an error while saving the user to the database",
//         })
// }}
// )




// server.get("/api/users", (req, res) => {
//     const users = db.getUsers()
//     res.json(users)
// })

server.get("/api/users/:id", (req, res) => {
    const user = db.getUserById(req.params.id)
    if(user) {
    res.json(user)
    } else {
        res.status(404).json({
            message: "ayyyeeeeeee",
        })
    }
})



server.get("/users", (req, res) => {

})

server.get("/users/:id", (req, res) => {
    
})




server.put("/api/users/:id", (req, res) =>{
    const user = db.findById(req.params.id)
    if (user) {
        //update the user
        const updateUser = db.update(user.id, {
        name: req.body.name || user.name,
        bio: req.body.bio || user.bio,
        })
    } else {
        res.status(404).json({
            message: "The user with the specified ID does not exist",
        })
    }
})

server.delete("/users/:id", (req, res) =>{
    const user = db.getUserById(req.params.id)
    if (user) {
        //update the user
        db.deleteUser(user.id)
        res.status(204).end
    } else {
        res.status(404).json({
            message: "not here, friend. user is not here.",
        })
    }
})
module.exports = server

