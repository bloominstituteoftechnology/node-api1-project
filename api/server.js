// BUILD YOUR SERVER HERE
const express = require ("express")
const shortid = require("shortid")
const User = require ("./users/model")
const server = express()


server.use(express.json())

// Create new User

server.post('/api/users', async (req, res) => {
    const user = req.body
    if (!user.name || !user.bio) {
        res.status(400).json({ message: "Please provide name and bio for the user" })
    } else {
       try {
        const newUser = await User.insert(user)
        res.status(201).json(newUser)
       } catch (err) {
           res.status(500).json({message: "There was an error while saving the user to the database" })
       }
    }
})



// Getting All Users

server.get("/api/users",(req,res)=>{
    const users = User.find()
    .then((users) => {
    res.status(200).json(users)
    })
    .catch(error => {
    res.status(500).json({message: "The users information could not be retrieved"})
    })
})

// Getting Specified User based on provided ID

server.get('/api/users/:id', (req, res) => {
    const { id } = req.params
    User.findById(id)
    .then((user) => {
        if (!user) {
            res.status(404).json({ message: "The user with the specified ID does not exist" })
        } else {
            res.status(200).json(user)
        }
    })
    .catch(error => {
        res.status(500).json({ message: "The user information could not be retrieved" })
      })
})
// Deleting the User based on provided ID

server.delete('/api/users/:id', (req, res) => {
    const { id } = req.params
    users.delete(id)
    .then((user) => {
        if (!user) {
            res.status(404).json({  message: "The user with the specified ID does not exist" })
        } else {
            res.status(200).json(user)
        }
    })
    .catch(error => {
        res.status(500).json({message: "The user could not be removed" })
      })
})

// Updating the User based on User ID

server.put('/api/users/:id', async (req,res) => {
    const id = req.params.id
    const changes = req.body
    if(!changes.name || !changes.bio) {
        res.status(400).json({ message: "Please provide name and bio for the user"  })
    } else{
        try {
            const updated = await users.update(id, changes)
            if(!updated) {
                res.status(404).json({ message: "The user with the specified ID does not exist"  })
            } else {
                res.status(200).json(updated)
            } 
        }
            catch (err) {
                res.status(500).json({message: "The user information could not be modified"})
            
        }
    }
})

module.exports = server 

// EXPORT YOUR SERVER instead of {}
