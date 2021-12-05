// BUILD YOUR SERVER HERE
// IMPORTS
const express = require("express")
const User = require("./users/model")

// INSTANCE OF EXPRESS
const server = express()

// GLOBAL MIDDLEWARE
server.use(express.json())

// ENDPOINTS
// POST
server.post('/api/users', (req, res)=>{
    const user = req.body;
    if (!user.name || !user.bio){
        res.status(400).json({
            message: "Please provide name and bio for the user"
        })
    }else{
        User.insert(user)
        .then(newUser => {
            res.status(201).json(newUser)
        })
        .catch(err => {
            res.status(500).json({
                message: 'There was an error while saving the user to the database',
                err: err.message,
                stack: err.stack,
            })
        })
    }
    
})


// GET USERS
server.get('/api/users', (req, res)=>{
    User.find()
    .then(users => {
        res.json(users)    
    })

    .catch(err => {
        res.status(500).json({
            message: "The users information could not be retrieved",
            err: err.message,
            stack: err.stack,
        })
    })
})


// GET USER ID
server.get('/api/users/:id', (req, res)=>{
    User.findById(req.params.id)
    .then(user => {
        if (!user) {
            res.status(404).json({
                message: "The user with the specified ID does not exist",
            })
        }
        res.json(user)
    })

    .catch(err => {
        res.status(500).json({
            message: "The user information could not be retrieved",
            err: err.message,
            stack: err.stack,
        })
    })
})


// ENDPOINTS
// Test 
server.use('*', (req,res)=>{
    res.status(404).json({
        message: 'not found'
    })
})




// EXPORT
module.exports = server; // EXPORT YOUR SERVER instead of {}
