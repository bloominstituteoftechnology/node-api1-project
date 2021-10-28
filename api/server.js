// BUILD YOUR SERVER HERE


// Imports at the top
const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const cors = require('cors');
const Users = require('./users/model');
const { restart } = require('nodemon');

// Instance of Express App
const server = express();

require('colors')

// Global Middleware
server.use(express.json());
server.use(helmet());
server.use(morgan('dev'));
server.use(cors());

const currentTime = new Date().toLocaleTimeString()

// Enpoints
// sanity check
server.get('/status', (req, res) => {
    // console.log('/status triggered');
    res.status(200).json({
        status: 200,
        message: `Server is up and running at ${currentTime}`,
        author: 'Github: @jthernandez999'
    })
})


server.post('/api/users', (req, res) => {
    const user = req.body;
    if (!user.name || !user.bio){
        res.status(400).json({
            message: 'Please provide name and bio for the user'
        })
    }else {
        Users.insert(user)
            .then(newUser => {
                res.status(201).json(newUser)
        })
        .catch (err =>  {
            res.status(500).json({
                message: 'The users information could not be retrieved',
                err: err.message, 
                stack: err.stack
            })
        })
    }
    
})

server.get('/api/users', (req, res) => {
    Users.find()
        .then(users => {
            // throw new Error('ahhhggg')
            res.json(users)
        })    
    .catch (err =>  {
        res.status(500).json({
            message: 'The users information could not be retrieved',
            err: err.message, 
            stack: err.stack
        })
    })
})

server.get('/api/users/:id', async (req, res) => {
    Users.findById(req.params.id)
        .then(user => {
            if(!user){
                res.status(404).json({
                    message: 'The user with the specified ID does not exist', 
                })
            }
            res.json(user)
    })
        .catch(err => {
            res.status(500).json({
                message: 'The user information could not be retrieved', 
                err: err.message,
                stack: err.stack
            })
        })
})


server.put('/api/users/:id', async (req, res) =>{
    try {
        const possibleUser = await Users.findById(req.params.id)
        if(!possibleUser) {
            res.status(404).json({
                message: 'The user with the specified ID does not exist', 
            })
        } else {
            if (!req.body.name || !req.body.bio) {
                res.status(400).json({
                    message: 'Please provide name and bio for the user'
                })
            } else {
                const updates = await Users.update(
                    req.params.id,
                    req.body)
                res.status(200).json(updates)
            }
        }
    }
    catch (err) {
        res.status(500).json(
            { 
            message: "The user information could not be modified", 
            err: err.message, 
            stack: err.stack 
        }
        )
    }
})


    server.delete('/api/users/:id', async (req, res) => {
        const { id } = req.params
        Users.remove(id)
            .then(deletedUser => {
                if(!deletedUser) {
                    res.status(404).json({
                        message: 'The user with the specified ID does not exist'
                    })
                } else {
                    res.json(deletedUser)
                }
            })
            .catch(err => {
                res.status(500).json({
                    message: 'The user could not be removed',
                    err: err.message, 
                    stack: err.stack
                })
            })
    })

// router.put('/:id', MIDDLEWARES, async (req, res, next) => {
//     try {
//       const account = await Account.updateById(req.params.id, req.body)
//       res.status(200).json(account)
//     } catch (err) { console.log(error) }
//   });










module.exports = server // EXPORT YOUR SERVER instead of {}