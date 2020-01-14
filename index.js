// implement your API here
const express = require('express');
const db = require('./data/db.js');
const server = express();

server.use(express.json());

server.get('/', (req, res)=>{
    res.send('LambdaSchool Project')
});

server.post('/api/users', (req, res)=>{
    const userInfo = req.body;

    console.log("user info", userInfo);
    if (!userInfo.name || !userInfo.bio) {
        res.status(400).json({ errorMessage: "Name and bio needed" })
        console.log("400 please provide name and bio for the user")
    } else {
        db.insert(userInfo)
        .then(user =>{
            res.status(201).json(user)
        })
        .catch(err=>{
            console.log(err)
            res.status(500).json({error: 'Error while saving the user to the database'})
        })
    }
});


server.get('/api/users', (req, res)=>{
    db.find()
    .then(users =>{
        res.status(200).json(users)
    })
    .catch(err=>{
        console.log(err)
        res.status(500).json({error: 'Could not retrieve user info'})
    })
})

server.delete('/api/users/:id', (req, res)=>{
    const id = req.params.id;

    db.remove(id)
    .then(count => {
        count === 1 && res.status(200).json({ message: `User Deleted` })
        count !== 1 && res.status(400).json({ message: 'The user with this ID doesnt exist' })
    })
    .catch(err =>{
        console.log(err)
        res.status(500).json({ error: 'The user couldnt be removed' })
    })
})

server.put('/api/users/:id', (req, res)=>{
    const id = req.params.id
    const newUser = req.body

    if (!newUser.name || !newUser.bio){
        res.status(400).json({ errorMessage: 'Please provide name and bio for the user' })
    }else{
        db.update(id, newUser)
        .then(user =>{
            if (user) {
                res.status(200).json(user)
            }else{
                res.status(404).json({ message: 'The user with the specified ID does not exist.' })
            }
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ message: 'The user info couldnt be modified' })
        })
    }
})


const port = 8000;
server.listen(port, ()=> console.log('/n=== API on Port 8000'));