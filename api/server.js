// BUILD YOUR SERVER HERE
//IMPORTS
const express = require('express');
const Users = require('./users/model');

const server = express()
//Global Middleware
server.use(express.json())

 
//[GET] all users
server.get('api/users', (req, res) =>{
    Users.findAll()
    .then(users => {
        console.log(users);
        res.json(users)
    })
    .catch(err => {
        res.status(500).json(
            { message: "The users information could not be retrieved" }
        )
    })
});


//[get] users by ID
server.get('api/users/:id', async (req, res) =>{
    try{
        const user = await Users.findById(req.params.id)
        if(!user){
            res.status(404).json(
                { message: "The user with the specified ID does not exist" }
            )
        }
        else{
            res.json(user)
        }
    }
    catch{
        res.status(500).json(
            { message: "The user information could not be retrieved" }
        )
    }
})
//[POST] Create New Users
server.post('api/users', async (req, res) => {
    try {
        const maybeUser = req.body
        if(!maybeUser.name || !maybeUser.bio){
            res.status(400).json(
                { message: "Please provide name and bio for the user" }
            )
        }
        else{
            const newUser = await Users.create(maybeUser);
            res.status(201).json(newUser)
        }
    }
    catch (err){
        res.status(500).json(
            { message: "There was an error while saving the user to the database" }
        )
    }
})
//[PUT] update user by id
server.put('api/users/:id', async (req, res) =>{
    try {
        if(!req.body.name || !req.body.bio){
            res.status(400).json(
                { message: "Please provide name and bio for the user" }
            )
        }
        else{
            const updatedUser = await Users.update(req.params.id, req.body)
            if(!updatedUser){
                res.status(404).json(
                    { message: "The user with the specified ID does not exist" }
                )
            }
            else{
                res.json(updatedUser)
            }
        }
    }
    catch (err) {
        res.status(500).json(
            { message: "The user information could not be modified" }
        )
    }
})
//[DELETE] delete user by ID
server.delete('api/user/:id', (req, res) => {
    Users.delete(req.params.id)
    .then(deletedUser => {
        if(!deletedUser){
            req.status(404).json(
                { message: "The user with the specified ID does not exist" }
            )
        }
        else{
            res.json(deletedUser)
        }
    })
    .catch(err =>{
        res.status(500).json(
            { message: "The user could not be removed" }
        )
    })
})
module.exports = server; // EXPORT YOUR SERVER instead of {}
