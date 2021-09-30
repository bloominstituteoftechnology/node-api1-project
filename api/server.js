// BUILD YOUR SERVER HERE
const express = require('express')
let User = require('./users/model')
const server = express()

server.use(express.json())

//| POST   | /api/users     | Creates a user using the information sent inside the `request body`.  
server.post(".api/users", async(req, res) =>{
    try{
        const {name, bio} = req.body
        if(!name || !bio){
            res.status(400).json({
                message:'new user needs a name and bio'
            })
        }else{
            const newUser = await User.create({name, bio})
            res.status(200).json(newUser)
        }
    }catch(err){
        res.status(500).json({
            message: err.message,
            customMessage: 'something horrible happened while creating user'
          })
    }
})

// | GET    | /api/users     | Returns an array users.                 
    server.get('/api/users', (req, res) => {
try{
    const array = [];
    array.push(User)
    
    
}catch(err){
    res.status(500).json({message:err.message})
}
    })
// | GET    | /api/users/:id | Returns the user object with the specified `id`.                            
server.get("/api/users/:id",async(req, res)=> {
    try{
const {id} = await User.findById()
.then(user => {

    if(!user.id){
        res.status(404).json({
            message:`dog with id ${id} does not exist`
    })
    }else{
        res.status(200).json(user)

    }
})
    }catch(err){
        res.status(500).json({message:err.message})
    }
})                           

// | DELETE | /api/users/:id | Removes the user with the specified `id` and returns the deleted user.                                 
server.delete("/api/users/:id", async(req, res)=> {
    try{
        const deleteUser = await User.delete(req.params.id)
        if(!deleteUser){
            res.status(404).json({
                message:`dig with id ${req.params.id} does not exist`
            })
        }else{
            res.json(deleteUser)
        }
    }catch(err){
        res.status(500).json({
            message: err.message,
            customMessage: 'something horrible happened while deleting dog'
          })
    }
})

// | PUT    | /api/users/:id | Updates the user with the specified `id` using data from the `request body`. Returns the modified user 
server.put("/api/users/:id", async(req, res) => {
    try{
        const {name, bio} = req.body
        const {id}= req.params

        if(!name || !bio) {
            res.status(400).json({
                message:'give name and bio to the body'
            })
        }else{
            const updated = await User.update(id,{name, bio})
            if(!updated){
                res.status(404).json({
                    message:`no dog with id ${id}`
                })
            }else{
                return updated
            }
        }
    }catch(err){
        res.status(500).json({
            message: err.message,
            customMessage: 'something horrible happened while updating user'
          })
    }
})


module.exports = server; // EXPORT YOUR SERVER instead of {}
