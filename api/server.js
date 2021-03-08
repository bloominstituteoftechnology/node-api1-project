// BUILD YOUR SERVER HERE
//Imports
const express = require('express')
const User = require('./users/model.js')

//Instance of Express App
const server = express()

//Global Middleware
server.use(express.json())

//Endpoints

// | GET    | /api/users/:id | Returns the user object with the specified `id`.               
server.get('/api/users/:id', (req, res) => {
    const id = req.params.id
    User.findById(id)
    .then(user => {
        console.log('we are getting -->', user)
        if(!user) {
            res.status(404).json({ message: `User with id ${id} not in database` })
        } else {
            res.json(user)
        }
    })
    .catch(err => {
        res.status(500).json({ message: err.message })
    })
})

// [GET] all users
server.get('/api/users', (req, res)=>{
    User.find()
    .then(users => {
        console.log(users)
        res.status(200).json(users)
    })
    .catch(err => {
        res.status(500).json({ message: err.message })
    })
})


//| POST   | /api/users     | Creates a user using the information sent inside the `request body`.                                   |
server.post('/api/users', (req, res) => {
    const newUser = req.body

    if (!newUser.name || !newUser.bio){
        res.status(400).json({ message: '/provide name and bio/' })
    } else {
        User.insert(newUser)
        .then(user => {
            res.status(201).json(user)
        })
        .catch(err => {
            res.status(500).json({ message: err.message })
        })
    }
})



//| PUT    | /api/users/:id | Updates the user with the specified `id` using data from the `request body`. Returns the modified user |
server.put('/api/users/:id', async (req, res)=>{
    const { id } = req.params
    const changes = req.body

    try{
        if(!changes.name || !changes.bio) {
            res.status(400).json({ message: '/provide name and bio/' })
        } else {
            const updatedUser = await User.update(id, changes)
            if(!updatedUser){
                res.status(404).json({ message: 'that user does not exist in database' })
            }else{
                res.json(updatedUser)
            }
        }
    }catch (err) {
        res.status(500).json({ message: err.message })
    }
})

// | DELETE | /api/users/:id | Removes the user with the specified `id` and returns the deleted user.
server.delete('/api/users/:id', async (req, res) => {
    try{
        const deleted = await User.remove(req.params.id)
        if(!deleted){
            res.status(404).json({ message: '/does not exist/'})
        } else {
            res.json(deleted)
        }
    } catch (err){
        res.status(500).json({ message: err.message })
    }
})




//catch all
server.use('*', (req, res) => {
    // here we do whatever with the request from the client
    res.status(404).json({ message: 'resource not found in this server' })
  })


//Exposing the server to other modules
module.exports = server; // EXPORT YOUR SERVER instead of {}
