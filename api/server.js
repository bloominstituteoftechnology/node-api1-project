// BUILD YOUR SERVER HERE
//imports
const express = require('express');
const cors = require('cors');
const User = require('./users/model');

//instance of express app
const server = express();

//global middleware
server.use(express.json());
server.use(cors());

//Returns an array: users
server.get('/api/users', (req, res) => {
    User.find()
        .then(users => {
            console.log(users)
            res.status(200).json(users)
        })
        .catch(err => {
            res.status(500).json({
                message: err.message
            })
        })
})

//Returns the user object with the specified id
server.get('/api/users/:id', (req, res) => {
    const userId = req.params.id

    User.findById(userId)
        .then(user => {
            if(!user){
                console.log('user not found')
                res.status(404).json({
                    message: 'User not found'
                })
            }else {
                console.log(user)
                res.status(200).json(user)
            }
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                message: err.message
            })
        })
})

//Creates a user the information sent inside the request body
server.post('/api/users', (req, res) => {
    const newUser = req.body

    if(!newUser.name || !newUser.bio){
        console.log('Name and bio required')
        res.status(400).json('Name and bio required')
    }else {
        User.insert(newUser)
            .then(user => {
                console.log('New User has been created')
                res.status(201).json(user)
            })
            .catch(err => {
                console.log(err)
                res.status(500).json({
                    message: err.message
                })
            })
    }
})

//Updates the user with the specified id using data from the request body. Returns the modified user
server.put('/api/users/:id', async (req, res) => {
    const {id} = req.params
    const changes = req.body

    try{
        if(!changes.name || !changes.bio){
            console.log('name or bio are required')
            res.status(400).json('Name or bio are required')
        }else {
            const updatedUser = await User.update(id, changes)
            if(!updatedUser){
                console.log('user does not exist')
                res.status(404).json('User does not exist')
            }else {
                console.log(updatedUser)
                res.status(201).json(updatedUser)
            }
        }
    }catch(err) {
        res.status(500).json({
            message: err.message
        })
    }
})

//Removes the user with the specified `id` and returns the deleted user.
server.delete('/api/users/:id', async (req, res) => {
    try{
        const {id} = req.params
        const deletedUser = User.remove(id)
        if(!deletedUser){
            console.log('this user does not exist')
            res.status(404).json('user does not exist')
        }else {
            console.log(deletedUser)
            res.status(201).json(deletedUser)
        }
    }catch(err) {
        res.status(500).json({
            message: err.message
        })
    }
})

module.exports = server; // EXPORT YOUR SERVER instead of {}
