// BUILD YOUR SERVER HERE
// imports 
const express = require('express')
const User = require('./users/model.js')
// const { find, findByID, users } = require('./users/model.js')

//instance of express app
const server = express()

// global middleware
server.use(express.json())

// ENDPOINTS 
// server.use("*", (req, res) => {
//     res.status(200).json({message: "Hello World!"})
// })

server.get("/api/users", (req, res) => {
    User.find()
    .then(users => {
        console.log(users)
        res.status(200).json(users)
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({message: err.message})
    })
})

server.get("/api/users/:id", (req, res) => {
    const idVar = req.params.id
    User.findById(idVar)
    .then(user => {
        if(!user){
            res.status(404).json("User does not exist")
        } else {
            res.json(user)
        }
        res.json(user)
    })
    .catch(err => {
        res.status(500).json({message: err})
    })
})

server.post('/api/users', (req, res) => {
    const newUser = req.body
    if(!newUser.name || !newUser.bio){
        res.status(422).json("needs name and bio")
    } else {
        User.insert(newUser)
        .then(user => {
            res.status(201).json(user)
        })
        .catch(err => {
            res.status(500).json({message: err.message})
        })
    }
})

server.put("/api/users/:id", async (req, res) => {
    const { id } = req.params
    const changes = req.body
    try {
        if(!changes.name || !changes.bio){
            res.status(422).json("Please add both name and bio")
        } else {
            const updatedUser = await User.update(id, changes)
            if(!updatedUser){
                res.status(404).json("User does not exist")
            } else {
                res.status(200).json(updatedUser)
            }
        }
    } catch(err){
        res.status(500).json({message: err.message})
    }

})

server.delete("/api/users/:id", async (req, res) =>{
    try{
        const { id } = req.params
        const deletedUser = await User.remove(id)
        if(!deletedUser){
            res.status(404).json("User not found")
        }else{
            res.status(200).json(deletedUser)
        }
    } catch(err){
        res.status(500).json({message: err.message})
    }
})


 // EXPORT YOUR SERVER instead of {}
 module.exports = server