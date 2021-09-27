const express = require('express');
const User = require('./users/model.js')
const server = express();
server.use(express.json())

server.get('/', (req, res) => {
    console.log(`this is a ${req.method} request`);
    res.status(200).json({ message: 'Sanity Test. You Are Sane!!' })
})

server.get('/api/users', async (req, res) => {
    try{
        const users = await User.find()
        res.json(users)
    } catch (err) {
        res.status(500).json({ message: "The users information could not be retrieved" })
    }
})

server.get('/api/users/:id', (req, res) => {
    // res.status(200).json({ message: 'user/:id working!!' })
    console.log('this is the id', req.params.id)
    User.findById(req.params.id)
        .then(user => {
            console.log(user)
            if (user) {
                res.status(200).json(user)
            } else {
                console.log('index.js ln:27 ALERT')
                res.status(404).json({ message: 'not found' })
            }
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                message: err.message
            })
        })
})

server.post('/api/users', (req, res) => {
try{} catch (err) {}

})

server.put('/api/users/:id', (req, res) => {
    res.json({ message: 'PUT update to existing user working!' })
})

server.delete('/api/users/:id', (req, res) => {
    res.json({ message: `DELETE user with id ${req.params.id}` })
})

module.exports = server;
