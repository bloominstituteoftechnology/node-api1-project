// BUILD YOUR SERVER HERE
const express = require('express');
const { generate } = require('shortid');
const dbFunctions = require('./users/model')

const app = express();
app.use(express.json());

// get all users
app.get('/users', (req, res) =>{
    dbFunctions.find()
    .then((users) =>{
        res.status(200).json(users)
    })
    .catch(() =>{
        res.status(500).json({message: 'Could not retrieve users'})
    })
})

//get user by specific id
app.get('/users/:id', (req, res) =>{
    const { id } = req.params
    dbFunctions.findById(id)
    .then((user) =>{
        user ? res.status(200).json(user) : res.status(404).json({message: 'User doe not exist'})
        }
    )
})

app.post('/users', async (req, res) =>{
    const {name, bio} = req.body
    if(!name || !bio){
        res.status(400).json({message: 'Name and bio are required'})
    } else{
        const newUser = {id: generate(), name, bio}
        res.status(200).json(newUser)
    }
})




app.use('*', (req, res) =>{
    res.status(404).json({message: '404 not found'});
})

module.exports = app; // EXPORT YOUR SERVER instead of {}
