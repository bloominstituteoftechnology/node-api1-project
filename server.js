//this is pulling the dependency from 'node_modules' now, instead of the stdlib
const express = require('express')
// using './' imports a local file rather than a third-party dependency 
const db = require('./database')

//creates a new express server
const server = express()

// installing some middleware that helps us parse JSON request bodies.
// we'll talk about this later, just copu it over for now
server.use(express.json())

server.get('/', (req, res) => {
    res.json({ message: 'Hello, world' }) //? why JSON (javascript object notation) instead of html? Is more consitent than html. JSON is the standard format of send data back and fort 
})

server.get('/users', (req, res) => {
    //gets a list of usersfrom our 'fake' database
    const users = db.getUsers()
    res.json(users)
})

server.get('/users/:id', (req, res) => {
    //the param variable matches up to the name of our URL param above
    const id = req.params.id
    //get a specific user by their ID from the 'fake' database
    const user = db.getUserById(id)

    //make sure the system doesn't break if someone calls the endpoint with 
    //a user ID that doesn't exist in the database
    //*expect user to do crazy things
    if (user) res.json(user)
    else res.status(404).json({ message: 'User not found' })
})

server.post('/users', (req, res) => {//*you can have the same url if they are different methods
    const newUser = db.createUser({
        name: req.body.name
    })

    res.status(201).json(newUser) //* 201 means resource was succesfully created. Note browsers only make get request. You will need postman to make the post request
})

server.delete('/users/:id', (req, res) => {
    const user = db.getUserById(req.params.id)

    if(user){//dont forget to think of all the possible senerios that can go wrong
        db.deleteUser(req.params.id)
        //since we have nothing to return back to the client, send a 204 with an empty response.
        // 204 just means 'success but we have nothing to return'
        res.status(204).end()
    } else {
        res.status(404).json({
            message: 'user not found',
        })
    }
})
server.listen(8080, () => {//8080 is a standard to write local services
    console.log('Server started on port 8080')
})