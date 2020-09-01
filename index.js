const express = require('express')
const server = express()
const shortid = require('shortid')

server.use(express.json())

const id = shortid.generate()

const users = [{
    id: 1,
    name: "Andy",
    bio: "Man of intrigue."
},
{
    id: 2,
    name: "Frank",
    bio: "Trustafarian"
}]

server.post('/api/users', (req, res) => {
    const user = req.body
    if (!req.body.name || !req.body.bio) {
        res.status(400).json( {errorMessage: "Please provide name and bio for the user."})
    } else {
        try{
    users.push(user)
    res.status(201).json({data: users })
} catch {
    res.status(500).json({ errorMessage: "There was an error while saving the user to the database" })
}}})

server.get('/api/users', (req, res) => {
    try {
        res.status(200).json({users})
    } catch (error) {
        res.status(500).json({errorMessage: "The users information could not be retrieved."})
    }

})

server.get('/api/users/:id', (req, res) => {
    const id = req.params.id
    const reqUser = users.filter((item) => {item.id === id})
   if (!reqUser) {
       res.status(404).json({ message: "The user with the specified ID does not exist." })
   } else {
       
       res.status(200).json({reqUser})
   }
})

server.delete('/api/users/:id', (req, res) => {
    const id = req.params.id

    const newUser = users.filter((user) => {
        user.id !== id
    })
    res.status(200).json(newUser)
})

server.put('/api/users/:id', (req, res) => {
    const id = req.params.id
})

const port = 8000
server.listen(port, () => console.log('Server running'))