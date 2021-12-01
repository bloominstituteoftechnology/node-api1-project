// BUILD YOUR SERVER HERE
const express = require('express')
<<<<<<< HEAD
const User = require('./users/model')

const server = express()

server.use(express.json())


server.get('/', (req, res) => {
    res.send('Hi snoopy')
})



//| GET    | /api/users     | Returns an array users.                                            
server.get('/api/users', (req, res) => {
User.find()
.then(users => {
    res.status(200).json(users)
})
.catch(err => {
    res.status(500).json({
        message:'The users information could not be retrieved',
        err:err.message
    })
})

})

//| GET    | /api/users/:id | Returns the user object with the specified `id`.                      
server.get('/api/users/:id', async(req, res) => {

    const {id} = req.params
    await User.findById(id)
    .then(users =>{
        if(!users){
            res.status(404).json({message:'The user with the specified ID does not exist'})
        }else{
            res.status(200).json(users)
        }
        
    })
    .catch(err => {
        res.status(500).json({message:'The user information could not be retrieved'})
    })

})

//| POST   | /api/users     | Creates a user using the information sent inside the `request body`.        
server.post('/api/users', (req, res) => {
    const newUser = req.body

    try{
        if(!newUser.name || !newUser.bio){
            res.status(400).json({message:'Please provide name and bio for the user'})
        }else{
           User.insert(newUser)
           .then(users => {
               res.status(201).json(users)
           })
           .catch(err => {
               res.status(500).json({message:'There was an error while saving the user to the database'})
           })
        }
    }catch(err){
        res.status(500).json({
            message:'There was an error while saving the user to the database',
            err:err.message,
            stack:err.stack 
        })
    }
})

//| PUT    | /api/users/:id | Updates the user with the specified `id` using data from the `request body`. Returns the modified user |
server.put('/api/users/:id', (req, res) => {

    const updatedUser = req.body

    try{
        if(!updatedUser.name || !updatedUser.bio){
            res.status(400).json({message:'Please provide name and bio for the user'})
        }else if(!updatedUser.id){
            res.status(404).json({message:'The user with the specified ID does not exist'})
        }
         else{
            User.update(id, changes)
            .then(updated => {
                res.status(200).json(updated)
            })
            .catch(err => {
                res.status(404).json({message:'The information is not here'})
            })
        }
    }catch(err){
        res.status(500).json({
            message:'The user information could not be modified',
            err:err.message,
            stack:err.stack 
        })
    }
})

//| DELETE | /api/users/:id | Removes the user with the specified `id` and returns the deleted user.         
server.delete('/api/users/:id', async(req, res) => {
    
    try{
            const {id} = req.params
            const deletedDog = await User.remove(id)
            if(!deletedDog){
                res.status(404).json({message:'The user with the specified ID does not exist'})
            }else{
                res.json(deletedDog)
            }
    }catch(err){
        res.status(500).json({
            message:'The user could not be removed',
            err:err.message,
            stack:err.stack 
        })
=======
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
>>>>>>> 89372f2ae7f2615e1ebc2befd554b7b149926f3f
    }
})


<<<<<<< HEAD



=======
>>>>>>> 89372f2ae7f2615e1ebc2befd554b7b149926f3f
module.exports = server; // EXPORT YOUR SERVER instead of {}
