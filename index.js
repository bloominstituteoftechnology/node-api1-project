const express = require('express');
const shortid = require('shortid')
const generate = require('shortid').generate

const app = express()
app.use(express.json())

const PORT = 5000;

let users = [
    {
        id: generate(),
        name: 'Steven',
        bio: 'Current Lambda Student'
    }
]

//GET all users
app.get('/users', (req, res) => {
    res.status(200).json(users)
})

//GET user by ID
app.get('/users/:id', (req, res) => {
    const { id } = req.params
    const user = users.find(user => user.id === id)
try {
    if(!user) {
        res.status(404).json({
            message: `No user with the id: ${id} found!`
        })
    } else {
        res.status(200).json(user)
    }
} catch (error) {
    res.status(500).json({
        message: 'Something went wrong'
    })
}
})

//POST new user
app.post('/users', (req, res) => {
    const { name, bio } = req.body
try{
    if(!name || !bio) {
        res.status(400).json({
            message: 'Name or bio is required for updated'
        })
    } else {
        const newUser = { id: generate(), name, bio }
        users.push(newUser)
        res.status(201)
    }
} catch (error) {
    res.status(500).json({
        message: 'Something went wrong'
    
    })
}
})

//Edit a user
app.put('/users/:id', (req, res) => {
    const { id } = req.params
    const { name, bio } = req.body

    const indexOfUser = users.findIndex(user => user.id === id)

    try{
        if (indexOfUser != -1) {
            users[indexOfUser] = { id, name, bio }
            res.status(200).json({ id, name, bio })
        } else {
            res.status(404).json({
                message: `There is no user with the ID ${id}`
            })
        }
    } catch (error) {
        res.status(500).json({
            message:'Something went wrong PUT'
        })
    }
})

app.delete('/users/:id', (req, res) => {
    const { id } = req.params
    try {
        if(!users.find(user => user.id === id)) {
            res.status(404).json({
                message: 'User not found'
            })
        } else {
            users = users.filter(user => user.id !== id)
            res.status(200).json({ 
                message: `The user with id ${id} has been deleted`
            })
        }
    } catch (error) {
        res.status(500).json({
            message: 'Something went wrong DELETE'
        })
    }
})

//CATCH ALL [GET, POST, ...]
app.use('*', (req, res) => {
    res.status(404).json({  message: 'Not Found!' })
})

//Listen for incoming requests
app.listen(PORT, () => {
    console.log(`Listening on PORT ${PORT}`)
})