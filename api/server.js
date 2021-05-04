// BUILD YOUR SERVER HERE
const express = require('express');
const User = require('./users/model')
const server = express();
server.use(express.json());

server.get('/users', (request, result) => {
    User.find()
    .then(users => {
        console.log(users)
        result.status(200).json(users)
    })
    .catch(error => {
        result.status(500).json({
            error: 'You screwed up!',
            message: error.message,
            stack: error.stack
        })
    })
})

server.get('/users/:id', async (request, result) => {
    try {
        const user = await User.findById(request.params.id)
        if (!user) {
            result.status(404).json({
                message: 'Please enter a valid user id'
            })
        } else {
        result.json(user)
        }
    } catch (error) {
        result.status(500).json({
            error: 'You screwed up!',
            message: error.message,
            stack: error.stack
        })
    }
})

server.post('/users', async (request, res) => {
    try {
        const userFromClient = request.body
        if (!userFromClient.name || !userFromClient.bio) {
            res.status(422).json({
                message: 'Name and bio are required',
            })
        } else {
            const newUser = await User.insert(userFromClient)
            res.status(201).json(newUser)
        }
    } catch (error) {
        res.status(500).json({
            error: 'You screwed up creating a new user!',
            message: error.message,
            stack: error.stack
        })
    }
})

server.put('/users/:id', async (request, response) => {
    try {
        const {id } = request.params
        const {name, bio} = request.body
        const updatedUser = await User.update(id, { name, bio })
        if (!updatedUser) {
            response.status(404).json({
                message: 'Name and bio are required'
            })
        } else {
            response.json(updatedUser)
        }}
    catch (error) {
        response.status(500).json({
            error: 'You screwed up creating editing a user!',
            message: error.message,
            stack: error.stack
        })
}})

server.delete('users/:id', (request, response) => {
    User.remove(request.params.id)
    .then(deletedUser => {
        if (!deletedUser) {
            response.status(404).json({
                message: "That user doesn't exist Genius"
            })
        } else {response.json(deletedUser)}
    })
    .catch(error => {
        response.status(500).json({
            
            error: 'You screwed up creating editing a user!',
            message: error.message,
            stack: error.stack
        })
    })
    }
)
module.exports = server; // EXPORT YOUR SERVER instead of {}