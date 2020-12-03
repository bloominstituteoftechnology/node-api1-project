const express = require('express')
const shortid = require('shortid')
const dotenv = require('dotenv').config()
const cors = require()
const server = express()
const port = process.env.PORT 
server.use(express.json())

let users = [
    { id: shortid.generate(), name: 'Andrew', bio: 'is a damn boss!' }
]

const User = {
    getUsers() {
        return users
    },
    getById(id) {
        return users.find(user => user.id === id)
    },
    delete(id) {
        const dUser = users.find(user => user.id === id)
        if (dUser) {
            users = users.filter(u => u.id !== id)
        }
        return dUser
    },
    update(id, changes) {
        const uUser = users.find(user => user.id === id)
        if (!uUser) {
            return null
        } else {
            const updatedUser = { id, ...changes }
            users = users.map(u => {
                if (u.id === id) return updatedUser
                return u
            })
            return updatedUser
        }
    },
    createUser(user) {
        const newUser = { id: shortid.generate(), ...user }
        users.push(newUser)
        return newUser
    }

}

//EndPoints


server.post('/api/users', (req, res) => {

    const userFromClient = req.body

    if (!userFromClient.name || !userFromClient.bio) {
        res.status(400).json({ errorMessage: "Please provide name and bio for the user." })
    } else {
        const brandNewUser = User.createUser(userFromClient)
        res.status(201).json(brandNewUser)
    }
})

server.get('/api/users', (req, res) => {
    const users = User.getUsers()
    res.status(200).json(users)
})

server.get('/api/users/:id', (req, res) => {

    const { id } = req.params
    const user = User.getById(id)

    if (user) {
        res.status(200).json(user)
    } else {
        res.status(404).json({ message: "The user with the specified ID does not exist." })
    }
})

server.delete('/api/users/:id', (req, res) => {

    const { id } = req.params
    const deleted = User.delete(id)
    const user = User.getById(id)

    if (!user) {
        res.status(404).json({ message: "user does not exist" })
    } else if (deleted) {
        res.status(200).json(deleted)
    } else {
        res.status(500).json({ message: "The user could not be removed" })
    }
})

server.put('/api/users/:id', (req, res) => {

    const changes = req.body
    const { id } = req.params
    const updatedUser = User.update(id, changes)

    if (updatedUser) {
        res.status(200).json(updatedUser)
    } else {
        res.status(404).json({ message: "user not updated" })
    }
})

server.use('*', (req, res) => {
    res.status(404).json({ message: 'not found' })
})

server.listen(port, () => {
    console.log('listening on port 5000')
})