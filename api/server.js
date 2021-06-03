// BUILD YOUR SERVER HERE
const express = require('express')
const { find, update } = require('./users/model')
const User = require('./users/model.js')

const server = express()

server.use(express.json())

// get all users 
server.get('/api/users', (req, res) =>{
    User.find()
        .then(user => {
            console.log(user)
            res.status(200).json(user)
        })
        .catch(err => {
                res.status(500).json({message: err.message})        })
})

// get all users by id
server.get('/api/users/:id', (req, res) => {
    const id = req.params.id
    User.findById(id)
        .then(user => {
            if(!user){
                res.status(404).json('user doesnt exsit')
            } else {res.json(user)}
            res.json(user)
        })
        .catch(err => res.status(500).json({message:err.message}))

})



// [Post endpoint]
server.post('/api/users', (req, res) => {
    const newUser = req.body 
    if (!newUser.name || !newUser.bio){
        res.status(422).json('needs name and bio')
    }else {
        User.insert(newUser)
            .then(user => res.status(201).json(user))
            .catch(err => res.status(500).json({message:err.message}))
    }
    User.insert(newUser)
        .then(user => res.status(201).json(user))
        .catch(err => res.status(500).json({message:err.message}))
})

server.put('/api/users/:id', async (req, res) => {
    const {id} = req.params
    const changes = req.body

    try{
        if(!changes.name || !changes.bio){
            res.status(422).json('needs name and bio')
        } else {
            const newUser = await User.update(id, changes)
            if(!newUser){
                res.status(404).json('User dosent exsit')
                } else {
                    res.status(200).json(newUser)
                }
        }

        const newUser = await User.update(id, changes)
        res.status(200).json(newUser)
    }
    catch(err) {
        res.status(500).json({message:err.message})
    }
})

server.delete('/api/users/:id', async (req, res) => {
    try{
        const {id} = req.params
        const deleteUser = await User.remove(id)
        if(!deleteUser){
            res.status(404).json('user not found')
        }else {
            res.status(200).json(deleteUser)
        }
            res.status(200).json(deleteUser)
    }catch{res.status(500).json({message:err.message})}
})

server.use('*', (req, res) => {
    res.status(404).json({message:'404 not found!!!'})
})


module.exports = server; // EXPORT YOUR SERVER instead of {}
