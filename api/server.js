// BUILD YOUR SERVER HERE

// http get :5000/api/users/model --verbose
// http get :5000/hello --verbose

const express = require('express')
const server = express() //invocation creates server


console.log('Server up, this is server.js')

//middleware before endpoints
server.use(express.json()) //middlewear, teaches express how to parse req bodies


//endpoints
server.get('/hello', (req, res) => {
    res.json({message: 'hello world'}
        )
})

const User = require('./users/model')
server.get('/api/users', (req, res) => { //R of CRUD, read
    User.find() // findAll works the same?
        .then(user => {res.json(user)})
        .catch( (err)=> res.status(500).json({
            message: 'unable to get user data',
            error: err.message
        })
        )
}) 

server.get('/api/users/:id', async (req, res) => { //R of CRUD, read
    const {id} = req.params
    //same as const id = req.params.id, cosmetic

    try {
        const user = await User.findById(id)
        if (!user){
            res.status(404).json({message: `id wrong ${id}`})
        }
        else {
        res.json(user)
        }
    } catch (err) {
        res.status(500).json({
            message: 'error getting user data by id',
            error: err.message
        })

    }
})

server.post('/api/users', async (req, res) => {
    try {
        //pull user info from rew.body
        //use Dog.insert with req.body
        //send back new user
        if (!req.body.name || !req.body.id) {
            req.status(400).json ({
                message: 'name and id are required'
            })
        } else {
        const newUser = await User.insert(req.body)
        res.status(201).json(newUser) //201 means created
        }
    } catch (err) {
        res.status(500).json({
            message: 'error posting new user',
            error: err.message
        })
        
    }
})

server.delete('/api/users/:id', async (req, res) => { //or server.remove? neither works
    const {id} = req. params //request has no body
    User.remove(id)
        .then(deletedUser => {
            if (!deletedUser){
                res.status(404).json({
                    message: `user by id ${id} does not exist`
                })
            } else{
                res.json(deletedUser)
            }
        })
        .catch(err => {
            res.status(500).json({
                message: 'error deleting user',
                error: err.message
            })
        })

})

server.put('/api/users/:id', async (req, res) => {
    const {id} = req.params//.id
    const {body} = req//.body
    try {
        const updated=await User.update(id, body)
        if(!updated) {
            res.status(404).json({
                message: `404, user by id ${id} does not exist `
            })
        }
        else {
            res.json(updated)//ensure res.json won't be invoked twice
        }
    } catch (err) {
        res.status(500).json({
            message: 'error updating existing user',
            error: err.message
        })
    }
})

//rs = restart

module.exports = server 