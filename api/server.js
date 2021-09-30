const express = require('express')
const User = require('./users/model.js')

const server = express()

server.use(express.json())

// Endpoints

server.get('/api/users', (req, res) => {
    User.find()
        .then(users => {
            res.status(200).json(users)
        })
        .catch(err => {
            res.status(500).json({message:err.message})
        })
})

server.get('/api/users/:id', (req, res) => {
    const idVar = req.params.id
    User.findById(idVar)
        .then(user => {
            if(!user){
                res.status(400).json(`User ${idVar} does not exist!`)
            } else {
                res.json(user)
            }
        })
        .catch (err => {
            res.status(500).json({message:err.message})
        })
})

server.post('/api/users', (req, res) => {
    const newUser = req.body
    if (!newUser.name || !newUser.bio) {
        res.status(422).json('Needs a name and bio')
    } else {
        User.insert(newUser)
            .then(user => {
                res.json(user)
            })
            .catch(err => {
                res.status(500).json({message:err.message})
            })
    }
})

server.put("/api/users/:id",async (req,res)=>{
    const {id} = req.params
    const changes = req.body
    try{
        if(!changes.name || !changes.weight){
            res.status(422).json("Name and weight required")
        }else{
            const updatedUser = await User.update(id,changes)
            if(!updatedUser){
                res.status(500).json("User doesn't exist")
            }else{
                res.status(200).json(updatedUser)
            }
        }        
    }
    catch(err){
        res.status(500).json({message:err.message})
    }
})

server.delete("/api/users/:id", async (req,res)=>{
    try{
        const {id} = req.params
        const deletedUser = await User.remove(id)
        if(!deletedUser){
            res.status(500).json("User doesn't exist")
        }else{
            res.status(201).json(deletedUser)
        }        
    }catch(err){
        res.status(500).json({message:err.message})
    }
})

module.exports = server 
