
const express = require('express')
const shortid = require('shortid')

const server = express()
server.use(express.json())


let users = [
    {   id: shortid.generate(),
        name: 'Paul',
        bio: 'Hello Earthlings'
    },
]

const User = {
    getAll(){
        return users
    },

    getbyId(id){
        return users.find(u => u.id === id)
    },

    createNew(user){
        const newUser = { id: shortid.generate(), ...user}
        users.push(newUser)
        return newUser
    },

    delete(id){
        const user = users.find(u => u.id === id)
        if(user){
            users = users.filter(u => u.id !== id)
        }
    },

    update(id, changes){
        const user = users.find(u => u.id === id)
        if(!user) {
            return null
        }

        else {
            users = users.map(u => {
                if(u.id === id) return { id, ...changes }
                return u
            })
            return { id, ...changes }
        }
    }
}

// endpoints for users
server.get('/api/users', (req, res) => {
    const users = User.getAll()
    res.status(200).json(users)
    if (!users){
        return res.status(500).json({ errorMessage: "There was an error" })
    }
})

server.get('/api/users/:id', (req, res) => {
    const { id } = req.params
    const user = User.getbyId(id)
    if (user){
        res.status(200).json(user)
    }
    else{
        res.status(404).json({ errorMessage: "user not found with id " + id})
    }
})

server.post('/api/users', (req, res) => {
    const userFromClient = req.body
    if (!userFromClient.name || !userFromClient.bio){
        res.status(400).json({ errorMessage: 'name and bio are required!' })
    }
    else{
        const newlyCreatedUser = User.createNew(userFromClient)
        res.status(201).json(newlyCreatedUser)
    }
})

server.delete('/api/users/:id', (req, res) => {
    const { id } = req.params
    const deleted = User.delete(id)
    if (deleted){
        res.status(200).json(deleted)
    }
    else{
        res.status(404).json( { errorMessage: 'user not found with id ' + id})
    }
})

server.put('/api/users/:id', (req, res) => {
    const { id } = req.params
    const changes = req.body
    const updatedUser = User.update(id, changes)
    if (updatedUser) {
        res.status(200).json(updatedUser)
    }
    else{
        res.status(404).json({ errorMessage: "error :( " })
    }
})


// catch-all endpoint
server.use('*', (req, res) => {
    res.status(400).json({ message: 'not found'})
})

// start the server
server.listen(5000, () => {
    console.log('server working on port 5000 :)')
})



