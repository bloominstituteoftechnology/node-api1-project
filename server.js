const express = require('express');
const server = express(); 
const db = require("./data")

server.use(express.json())

server.get('/', (req, res) => {
  res.send('Hello from Express');
});

server.post('/users', (req,res) => {
    
    if(req.body.name && req.body.bio){
        const newUser = db.createUser({
            name: req.body.name,
            bio: req.body.bio
        })
        const users = db.getUsers()
        if(users){
            res.json(users)
            res.status(201)
        }
        else{
            res.status(500).json({errorMessage: "There was an error while saving the user to the database"})
        }
        
    }
    else{
        res.status(400).json({errorMessage: "Please provide name and bio for the user."})
    }
    
})

server.get('/users', (req, res) => {
    const users = db.getUsers()
    if(users){
        res.json(users)

    }
    else{
        res.status(500).json({ errorMessage: "The users information could not be retrieved." })
    }
    
})

server.get('/users/:id', (req, res)=>{
    const id = req.params.id
    const user = db.getUserById(id)

    if(user){
        try{
            res.json(user)
        }
        catch(error){
            res.status(500).json({ errorMessage: "The user information could not be retrieved." })
        }        
    }
    else{
        res.status(404).json({ message: "The user with the specified ID does not exist." })
    }

})

server.delete('/users/:id', (req, res) => {
    const id = req.params.id
    const user = db.getUserById(id)


    if (!user){
        res.status(404).json({ message: "The user with the specified ID does not exist." })
    }
    else{
        try{
            db.deleteUser(id)
            const users = db.getUsers()
            res.json(users)
        }
        catch(err){
            res.status(500).json({ errorMessage: "The user could not be removed" })
        }
    }
})

server.put('/users/:id', (req, res) => {
    const id = req.params.id
    const user = db.getUserById(id)

    if(!user){
        res.status(404).json({ message: "The user with the specified ID does not exist." })
    }
    else{
        if(req.body.name && req.body.bio){
            try{
                const updatedUser = db.updateUser(id, {
                    name: req.body.name,
                    bio: req.body.bio
                })
                res.json(updatedUser)
            }
            catch{
                res.status(500).json({ errorMessage: "The user information could not be modified." })
            }
        }
        else{
            res.status(400).json({ errorMessage: "Please provide name and bio for the user." })
        }
    }

})

server.listen(8080, () => {
  console.log('Server running on http://localhost:8080')
});