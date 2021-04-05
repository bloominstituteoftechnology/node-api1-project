// BUILD YOUR SERVER HERE

const express = require('express')
const server = express()
const Users = require('./users/model')

server.use(express.json())


server.get('/api/users', async (req,res)=>{

    try{
        const users = await Users.find()
        res.status(200).json(users)
    }
    catch(err){
        res.status(500).json({message:err.message})
    }
})

server.get('/api/users/:id', async (req,res)=>{

    try{
        const {id} = req.params
        const user = await Users.findById(id)
        if(!user){
            res.status(404).json('user does not exist')
        }
        else{
            res.status(200).json(user)
        }
    }
    catch(err){
        res.status(500).json({message:err.message})
    }

})

server.post('/api/users',(req,res)=>{

    const newUser = req.body
    if(!newUser.name || !newUser.bio){
        res.status(422).json("Name and bio are required")
    }else{
        Users.insert(newUser)
        .then(user=>{
            res.status(201).json(user)
        })
        .catch(err=>{
            res.status(500).json({message: err.message})
        })
    }    
    
})

server.put('/api/users/:id', async (req,res)=>{
    try{
        const{id} = req.params
        const incoming = req.body
       

        if(!incoming.name || !incoming.bio){
            res.status(422).json('Name and bio are required')
        }

        else{
            const upUser = await Users.update(id, incoming)
            if(!upUser){
                res.status(404).json('User does not exist')
            }
            else{
                res.status(202).json(upUser)
            }
        }

    }
    catch(err){
        res.status(500).json({message:err.message})
    }
})

server.delete('/api/users/:id', async (req,res)=>{
    try{
        const {id} = req.params
    
        const deleteUser = await Users.remove(id)

        if(!deleteUser){
            res.status(404).json('User does not exist')
        }
        else{
            res.status(200).json(deleteUser)
        }
    }
    catch(err){
        res.status(500).json({message:err.message})
    }
})



module.exports = server; // EXPORT YOUR SERVER instead of {}
