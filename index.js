// implement your API here
const express = require('express');
const Db = require('./data/db')
const server = express();

server.use(express.json());

//Post request to add user
server.post('/api/users', (req,res)=>{
    const userData = req.body
    if(!userData.name || !userData.bio){
        return res.status(400).json("please provide name and data for the user")
    }else{
    Db.insert(userData)
    .then(user=>{
        res.status(201).json(user)
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({
            errorMessage: "There was an error while saving the user to the database"
        })
    })}
}
    )
// get request for all users
server.get('/api/users', (req,res)=>{
    Db.find()
    .then(user=>{
        res.status(201).json(user)
    })
    .catch(err=>{
        console.log(err)
        res.status(500).json({errorMessage: "The users information could not be retrieved."})
    })
})

// get request for sepcific user by id 
server.get('/api/users/:id', (req,res)=>{
    const id = req.params.id
    Db.findById(id)
    .then(user=>{
        res.status(201).json(user)
    })
    .catch(err=>{
        console.log(err)
        res.status(404).json({errorMessage: "The user with the specified ID does not exist."})
    })
})

// Delete request for user by id 
server.delete('/api/users/:id', (req,res)=>{
    const id = req.params.id 
    
        
    
    Db.remove(id)
    .then(user=>{console.log(user)
        user ?
    res.status(202).json({message: "Delete sucsessful"}):
    res.status(404).json({message: "The specified user id was not found" })
    })
    .catch(err=>{
        console.log(err)
        res.status(500).json({errorMessage: "The user could not be removed" })
    })

})
//Put request for updating user by id 
server.put('/api/users/:id', (req, res) => {
    const id = req.params.id
    const changes = req.body
    const { name, bio } = changes
    if(!name || !bio) {
        res.status(400).json({ errorMessage: "Please provide name and bio for the user." })
    }
    Db.update(id, changes)
        .then(user => {
            user ?
            res.status(200).json(user) :
            res.status(404).json({ message: "The user with the specified ID does not exist." })
        })
        .catch(err => {
            res.status(500).json({ error: "The user information could not be modified.", error: err })
        })
})


const port = 8000;
server.listen(port, () => console.log(`\n ** api on port: ${port} ** \n`));