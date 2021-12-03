// BUILD YOUR SERVER HERE
const express = require('express')
const User = require('./users/model')

const server = express()
server.use(express.json())

server.post('/api/users', async (req, res) => {
    try{
        const {name, bio} = req.body
        if(!name || !bio){
            res.status(400).json({message: 'Please provide name and bio for the user'})
        }else{
            const newUser = await User.insert({name, bio})
            res.status(201).json(newUser)
        }
    }catch(err){
        res.status(500).json({message: err.message, customMessage: 'There was an error while saving the user to the database'})
    }
})

server.get('/api/users', async (req, res) => {
    try{
        const user = await User.find()
        res.status(404).json(user)
    }catch(err){
        res.status(500).json({message: err.message, customMessage: "The users information could not be retrieved"})
    }
})

server.get('/api/users/:id', async (req, res) => {
    try{
        const {id} = req.params
        const user = await User.findById(id)
        if(!user){
            res.status(404).json({message: 'The user with the specified ID does not exist'})
        }else{
            res.json(user)
        }
    }catch(err){
        res.status(500).json({message: err.message, customMessage: 'The user information coulnd not be retrieved'})
    }
})

server.delete('/api/users/:id', async (req, res) => {
    try{
        const deletedUser = await User.remove(req.params.id)
        if(!deletedUser){
            res.status(404).json({message: 'The user with the specified ID does not exist'})
        }else{
            res.json(deletedUser)
        }
    }catch(err){
        res.status(404).json({message: err.message, customMessage: 'The user could not be removed'})
    }
})

server.put('/api/users/:id', async (req, res) => {
    try{
        const {name, bio} = req.body
        const {id} = req.params
        if(!name || !bio){
            res.status(400).json({message: 'Please provide name and bio for the user'})
        }else{
            const updatedUser = await User.update(id, {name, bio})
            if(!updatedUser){
                res.status(404).json({message: 'The user with the specified ID does not exist'})
            }else{
                res.json(updatedUser)
            }
        }
    }catch(err){
        res.status(500).json({message: err.message, customMessage: 'The user information could not be modified'})
    }
})

module.exports = server // EXPORT YOUR SERVER instead of {}
