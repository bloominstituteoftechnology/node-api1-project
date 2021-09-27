// BUILD YOUR SERVER HERE
const express = require('express')
const { update } = require('./users/model')
const User = require('./users/model')

const server = express()

server.use(express.json())

server.get('/', (req, res) => {
    console.log(`this is a ${req.method} request`)
    res.json({ message: "rendered without errors" })
})

server.get('/api/users', async (req, res) => {
    try {
        const users = await User.find()
        res.status(200).json(users)
    } catch (err) {
        res.status(500).json({
            customMessage: 'somthing happened while getting user'
        })
    }
})

server.get('/api/users/:id', async (req, res) => {
    try {
        const {id} = req.params
        const user = await User.findById(id)
        if(!user){
            res.status(404).json({
                message: `user with id ${id} does not exist!`
            })
        } else {
            res.status(200).json(user)
        }
    }catch (err) {
        res.status(500).json({
            customMessage: `somthing happened while getting user of ${req.params.id} id`
        })
    }
})

server.post('/api/users', async (req, res) => {
    try {
        const {name, bio} = req.body
        if(!name || !bio) {
            res.status(400).json({
                message: `provide name and bio`
            })
        } else {
            const newUser = await User.insert({name, bio})
            res.status(201).json(newUser)
        }

    }catch (err) {
        res.status(500).json({
            customMessage: 'somthing happened while creating user'
        })
    }
})

server.put(`/api/users/:id`, async (req, res) => {
    try {
        const {name, bio} = req.body
        const {id} = req.params
        if(!name || !bio) {
            res.status(400).json({
                message: "Please provide name and bio for the user"
            })
        } else {
            console.log(id)
            const updatedUser = await User.update(id, {name, bio})
            res.status(200)
            if(!updatedUser) {
                res.status(404).json({
                    message: "The user with the specified ID does not exist"
                })
            } else {
                res.json(updatedUser)
            }
        }
    } catch (err) {
        res.status(500).json({
            customMessage: "The user information could not be modified"
        })
    }
})

server.delete('/api/users/:id', async (req, res) => {
    try {
        const deletedUser = await User.remove(req.params.id)
        
        if (!deletedUser) {
            res.status(404).json({
                message: "The user with the specified ID does not exist"
            })
        } else {
        res.json(deletedUser)
        }
    } catch (err) {
        res.status(500).json({
            message: err.message,
            customMessage: "The user could not be removed"
        })
    }
})


module.exports = server; // EXPORT YOUR SERVER instead of {}
