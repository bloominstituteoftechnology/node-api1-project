// implement your API here

const express = require('express');
let db = require('./data/db')

const server = express()
server.use(express.json())
 
//GET requests

server.get('/api/users', (req, res)=>{
    db.find()
        .then(data => res.status(200).json(data))
        .catch(err => res.status(400).json({error: err}))
})


server.get('/api/users/:id', (req, res)=>{
    db.findById(req.params.id)
        .then(data => res.status(200).json(data))
        .catch(err => res.status(400).json({message: "The user with the specified ID does not exist." }))
})



//POST requests

server.post('/api/users', (req, res)=>{
    if (!req.body.name || !req.body.bio){
        return res.status(400).json({error: 'Please provide name and bio for the user.'})
    }
    const newUser = {
        name: req.body.name,
        bio: req.body.bio
    }    
    db.insert(newUser)
        .then(data => res.status(201).json(data))

})


//PUT requests

server.put('/api/users/:id', (req, res)=>{

    const changes = {
        name: req.body.name,
        bio: req.body.bio
    }

    db.update(req.params.id, changes)
        .then(resp => res.status(201).json(resp))
})


//DELETE request

server.delete('/api/users/:id', (req, res)=>{
    db.findById(req.params.id)
    .then((data) => {
        db.remove(req.params.id)
            .then(resp => res.status(201).json(data))
    })
    .catch(err => res.status(400).json({message: "The user with the specified ID does not exist." }))
})


const port = 8080
const host = '127.0.0.1'

server.listen(port, host, () =>{
    console.log(`server running at http://${host}:${port}`)
})

