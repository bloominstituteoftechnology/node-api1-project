// BUILD YOUR SERVER HERE

const express = require('express')
const User = require('./users/model')

const server = express()
server.use(express.json())


server.put('/api/users/:id', )

server.delete('/api/users/:id', async (req, res) => {
    try {
        const possibleUser = await User.findById(req.params.id)
        console.log('possible user', possibleUser)
        if (!possibleUser) {
            res.status(404).json({
                message: "The user with the specified ID does not exist"
            })
        } else {
            const deletedUser = await User.remove(req.params.id)
            res.status(200).json(deletedUser)
        }
    } catch (err) {
            res.status(500).json({
                message: "The users information could not be retrieved",
                err: err.message,
                stack: err.stack
            })
    
    }
})


server.post('/api/users', (req, res) => {
    const user = req.body
    if (!user.name || !user.bio) {
        res.status(400).json({
            message: "Please provide name and bio for the user",
        })
    } else {
    User.insert(user)
        .then(createdUser => {
            console.log(createdUser)
            res.status(201).json(createdUser)
        })
        .catch(err => {
            res.status(500).json({
                message: "The users information could not be retrieved",
                err: err.message,
                stack: err.stack
            })
        })
    }

})


server.get('/api/users', (req,res) => {
    //console.log('getting all users')
    //res.json('users')
    User.find()
        .then(users => {
            res.json(users)
        })
        .catch(err => {
            res.status(500).json({
                message: "The users information could not be retrieved",
                err: err.message,
                stack: err.stack
            })
        })
})


server.get('/api/users/:id', (req, res) => {
    //console.log('getting all users')
    //res.json('users')
    User.findById(req.params.id)
        .then(user => {
            if (!user) {
                res.status(404).json({
                    message: "The user with the specified ID does not exist"
                })
            } else 
            console.log('user ->', user)
            res.json(user)
        })
        .catch(err => {
            res.status(500).json({
                message: "The users information could not be retrieved",
                err: err.message,
                stack: err.stack
            })
        })
} )


server.use('*', (req, res) => {
    res.status(404).json({
        message: 'Apologies, not found'
    })
})

module.exports = server // EXPORT YOUR SERVER instead of {}
