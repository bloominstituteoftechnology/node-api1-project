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


server.post('/api/users', async (req, res) => {
    try {
        const newUser = req.body
        if (!newUser.name || !newUser.bio) {
            res.status(400).json({
                status: 400,
                message: 'Please provide name and bio for the user',
                error: err.message
            })
        } else {
            const newUser = await Users.insert(newUser)
            res.status(201).json(newUser)
        }
    } catch (err) {
        res.status(500).json({
            message: 'There was an error while saving the user to the database',
            error: err.message
        })
    }
})

server.get('/api/users', async (req, res) => {
    try {
        Users.find()
            .then(users => {
                res.json(users)
            })
    }
    catch (err) {
        res.status(500).json({
            message: 'The users information could not be retrieved',
            error: err.message
        })
    }
})

server.get('/api/users/:id', async (req, res) => {
    try {
        const user = await Users.findById(req.params.id)
        if (!user) {
            res.status(404).json({
                message: 'The user with the specified ID does not exist'
            })
        } else {
            res.json(user)
        }
    }
    catch {
        res.status(500).json({
            message: 'The user information could not be retrieved',
            error: err.message,
        })
    }
})


// server.put('/api/users/:id', async (req, res) => {
//     const { id } = req.params
//     const { body } = req

//     try {
//         if (!req.body.name || !req.body.bio) {
//             res.status(400).json({
//                 message: "Please provide name and bio for the user",
//             })
//         } else {
            
//             const updated = await Users.update(id, body)
//             if (!updated) {
//                 res.status(404).json({
//                     message: 'The user with the specified ID does not exits',
//                 })
//             } else {
//                 res.status(200).json(updated)
//             }
//         } 
//     } catch (err) {
//             res.status(500).json({
//                 message: 'The user information could not be modified',
//             })
//         }
//     })

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
                    message: 'The user could not be removed'
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