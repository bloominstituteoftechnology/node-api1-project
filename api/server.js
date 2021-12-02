const express = require('express')
const User = require ('./users/model')

<<<<<<< HEAD
const { json } = require('express')
const express = require('express')
const User = require('./users/model')

const server = express()
server.use(express.json())
 

server.put('/api/users/:id', async (req, res) => {
    try {
        const possibleUser = await User.findById(req.params.id)
        if (!possibleUser) {
            res.status(404).json({
                message: "The user with the specified ID does not exist"
            })
        } else {
            if (!req.body.name || !req.body.bio) {
                res.status(400).json({
                    message: "Please provide name and bio for the user"
                })
            } else {
              const updatedUser = await User.update(req.params.id, req.body)
              res.status(200).json(updatedUser)
            }
        }
    } catch (err) {
        res.status(500).json({
            message: "The user information could not be modified",
            err: err.message,
            stack: err.stack
        })
    }
})


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
=======
const server = express()
server.use(express.json())


server.put('/api/users/:id', async (req,res)=>{
 try {
    const possibleUser = await User.findById(req.params.id)
    if (!possibleUser) {
        res.status(404).json({
            message: 'The user with the specified ID does not exist'
        })
    } else {
        if (!req.body.name || !req.body.bio) {
            res.status(400).json({
                message: "Please provide name and bio for the user",
            })
        } else {
            const updatedUser = await User.update(req.params.id, req.body)
            res.status(200).json(updatedUser)
        }
    }
 } catch (err) {
    res.status(500).json({
        message: `error updating user`,
        err: err.message,
        stack: err.stack,
    })
 }
})

server.delete('/api/users/:id', async (req,res) => {
    try {
        const possibleUser = await User.findById(req.params.id)
        if (!possibleUser) {
            res.status(404).json({
                message: 'The user with the specified ID does not exist'
            })
        } else {
            const deletedUser = await User.remove(possibleUser.id)
            res.status(200).json(deletedUser)
        }
    } catch (err) {
        res.status(500).json({
            message: `error deleting user`,
            err: err.message,
            stack: err.stack,
        })
    }
})

server.post('/api/users', (req, res) =>{
    const user = req.body;
    if (!user.name || !user.bio) {
        res.status(400).json({
            message: 'Please provide name and bio for the user',
            // error: err.message
        })
    } else {
        User.insert(user)
            .then(createdUser => {
                res.status(201).json(createdUser)
            })
            .catch(err => {
                res.status(500).json({
                    message: `error creating user`,
                    err: err.message,
                    stack: err.stack,
                })
            })
        }
})

server.get('/api/users', (req, res)=>{
    User.find()
        .then(users=>{
>>>>>>> dbd93d9e9025b3a6fbe7f4c10c432fd7de691440
            res.json(users)
        })
        .catch(err => {
            res.status(500).json({
<<<<<<< HEAD
                message: "The users information could not be retrieved",
                err: err.message,
                stack: err.stack
=======
                message: `error getting users`,
                err: err.message,
                stack: err.stack,
>>>>>>> dbd93d9e9025b3a6fbe7f4c10c432fd7de691440
            })
        })
})

<<<<<<< HEAD

server.get('/api/users/:id', (req, res) => {
    //console.log('getting all users')
    //res.json('users')
=======
server.get('/api/users/:id', (req, res)=>{
>>>>>>> dbd93d9e9025b3a6fbe7f4c10c432fd7de691440
    User.findById(req.params.id)
        .then(user => {
            if (!user) {
                res.status(404).json({
<<<<<<< HEAD
                    message: "The user with the specified ID does not exist"
                })
            } else 
            console.log('user ->', user)
=======
                    message: "The user with the specified ID does not exist",
                })
            }
>>>>>>> dbd93d9e9025b3a6fbe7f4c10c432fd7de691440
            res.json(user)
        })
        .catch(err => {
            res.status(500).json({
<<<<<<< HEAD
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
=======
                message: `error getting users`,
                err: err.message,
                stack: err.stack,
            })
        })
})

server.use('*', (req, res) => {
    res.status(404).json({
        message:'not found'
    })
})

module.exports = server 
>>>>>>> dbd93d9e9025b3a6fbe7f4c10c432fd7de691440

