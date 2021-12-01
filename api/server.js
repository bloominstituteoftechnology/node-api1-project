// BUILD YOUR SERVER HERE
const express = require('express')
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
    }
})





module.exports = server; // EXPORT YOUR SERVER instead of {}
