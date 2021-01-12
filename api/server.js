const express = require('express')
const users = require('./user-model')

const server = express()

server.use(express.json())

// [GET]
// get all
server.get('/', (req, res) => {
    
    users.findAll()
    .then((user) => {
        res.status(200).json(user)
    })
    .catch(error => {
        res.status(500).json({ message: error.message })
      })
})

// get by id

server.get('/api/users/:id', (req, res) => {
    const { id } = req.params
    users.findById(id)
    .then((user) => {
        if (!user) {
            res.status(404).json({ message: `dog with id ${id} not found` })
        } else {
            res.status(200).json(user)
        }
    })
    .catch(error => {
        res.status(500).json({ message: error.message })
      })
})

// post
server.post('/api/users', async (req, res) => {
    const user = req.body
    if (!user.name || !user.bio) {
        res.status(404).json({ message: `name and bio are required` })
    } else {
       try {
        const newUser = await users.create(user)
        res.status(201).json(newUser)
       } catch (err) {
           res.status(500).json({ message: `name and bio are required`  })
       }
    }
})

// put

server.put('/api/users/:id', async (req,res) => {
    const id = req.params.id
    const changes = req.body
    if(!changes.name || !changes.bio) {
        res.status(400).json({ message: 'you must change name and bio' })
    } else{
        try {
            const updated = await users.update(id, changes)
            if(!updated) {
                res.status(404).json({ message: `dog with id ${id} not found` })
            } else {
                res.status(200).json(updated)
            } 
        }
            catch (err) {
                res.status(500).json({ message: `name and bio are required`})
            
        }
    }
})

// delete 

server.delete('/api/users/:id', (req, res) => {
    const { id } = req.params
    users.delete(id)
    .then((user) => {
        if (!user) {
            res.status(404).json({ message: `dog with id ${id} not found` })
        } else {
            res.status(200).json(user)
        }
    })
    .catch(error => {
        res.status(500).json({ message: error.message })
      })
})

module.exports = server