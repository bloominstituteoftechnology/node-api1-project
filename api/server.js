// BUILD YOUR SERVER HERE

const express = require('express')

const User = require('./users/model') //***/ grab them from model **

const server = express()

server.use(express.json())// very critical to have this 

//update 
server.put('/api/users/:id', async (req, res) => {
    try {
        const possibleUser = await User.findById(req.params.id)
        // console.log('possible user', possibleUser)
        if(!possibleUser) {
            res.status(404).json({
                message: 'the use with the specificed ID does not exist'
            })
        } else {
            if(!req.body.name || !req.body.bio) {
                res.status(400).json({
                    message: 'Please provide name and bio for the user',
                })
            }else {
               const updatedUser = await User.update(req.params.id, req.body)
               res.status(200).json(updatedUser)
            }
        }
    } catch (err) {
        res.status(500).json({
            message: err.message, 
            stack: err.stack
        })
    }
}),

//delete users 
server.delete('/api/users/:id', async (req, res) => {
    try {
    const possibleUser = await User.findById(req.params.id)
    // console.log('possible user', possibleUser)
    if(!possibleUser) {
        res.status(404).json({
            message: 'not found'
        })
    } else {
        const deletedUser = await User.remove(possibleUser.id)
        // console.log(deletedUser)
        res.status(200).json(deletedUser)
    }
    } catch (err) {
        res.status(500).json({
            message: err.message, 
            stack: err.stack
        })
    }
}),

//create a new user 
server.post('/api/users', (req, res) => {
    const user = req.body;
    if(!user.name || !user.bio) {
        res.status(400).json({
            message: 'name and bio required'
        })
    } else {
        User.insert(user)
        .then(createdUser => {
            res.status(201).json(creadUser)
        })
        .catch(err => {
            res.status(500).json({
                message: 'err creating new user',
                err: err.message, 
                stack: err.stack,
            })
        })
    }
   
},

//grab users
server.get('/api/users', (req, res) => {
    User.find()
    .then(users => {
        // console.log(users)
        res.json(users)
    })
    .catch(err => {
        res.status(500).json({
            message: 'error getting users',
            err: err.message, 
        })
    })
}),

//grab by id 
server.get('api/users/id', (req, res) => {
    User.findById(req.params.id) //grabs them by id ****
    .then(user => {
        // console.log(user)
        if (!user) {
            res.status(404).json({
                message: 'The use with the ID does not exist',
            })
        } else {
            res.json(user)
        }
    })
    .catch(err => {
        res.status(500).json({
            message: 'error getting ids',
            err: err.message, 
            stack: err.stack,
        })
    })
}),

server.use('*', (req, res) => {
    res.status(404).json({
        message: 'not found'
    })
}),

module.exports = server;// EXPORT YOUR SERVER instead of {}
 