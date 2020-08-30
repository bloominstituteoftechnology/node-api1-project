
//this is pulling the dependency from 'node_modules' now, instead of the stdlib
const express = require('express')
// using './' imports a local file rather than a third-party dependency 
const db = require('./database')
const { isString } = require('util')

//creates a new express server
const server = express()

// installing some middleware that helps us parse JSON request bodies.
// we'll talk about this later, just copu it over for now
server.use(express.json())

server.get('/', (req, res) => {
    res.json({ message: 'Hello, world' }) //? why JSON (javascript object notation) instead of html? Is more consitent than html. JSON is the standard format of send data back and fort 
})

server.get('/api/users', (req, res) => {
    //gets a list of usersfrom our 'fake' database
    const users = db.getUsers()
    const noUsers = users === []
    if (noUsers) res.status(500).json({
        errorMessage: "The users information could not be retrieved."
    })
    else res.json(users)
})

server.get('/api/users/:id', (req, res) => {
    //the param variable matches up to the name of our URL param above
    const id = req.params.id
    //get a specific user by their ID from the 'fake' database
    const user = db.getUserById(id)

    //make sure the system doesn't break if someone calls the endpoint with 
    //a user ID that doesn't exist in the database
    //*expect user to do crazy things
    if (user) res.json(user)
    else res.status(404).json({ message: "The user with the specified ID does not exist." })

    // ?If there's an error in retrieving the user from the database. How?
})

server.post('/api/users', (req, res) => {//*you can have the same url if they are different methods
    const newUserData = {
        name: String(req.body.name),
        bio: String(req.body.bio),
    }
    const newUser = db.createUser(newUserData)
    const isNameBioHere = (newUser.name === '' || newUser.bio === '') ? false : true

    if (isNameBioHere) {
        res.status(201).json({newUser}
        ) //* 201 means resource was succesfully created. Note browsers only make get request. You will need postman to make the post request

    } else {
        res.status(400).json({
            errorMessage: "Please provide name and bio for the user."
        })
    }
    // ?If there's an error while saving the user. What does this means?
})

server.delete('/api/users/:id', (req, res) => {
    const user = db.getUserById(req.params.id)

    if (user) {//dont forget to think of all the possible senerios that can go wrong
        db.deleteUser(req.params.id)
        //since we have nothing to return back to the client, send a 204 with an empty response.
        // 204 just means 'success but we have nothing to return'
        res.status(200).json({ message: 'succesfully delete user', user })
    } else {
        res.status(404).json({
            message: 'user not found',
        })
    }
    //? If there's an error in removing the user from the database?
})

server.put('/api/users/:id', (req, res) => {
    //check if the id is valid
    const currentUser = db.getUserById(req.params.id)
    if (currentUser) {
        //put the request data for update in it's on variable
        const newUserInformation = {
            name: String(req.body.name),
            bio: String(req.body.bio),
        }
        // check if it's data is valid string
        const missingNameOrBio = newUserInformation.name === '' || newUserInformation.bio === ''

        if (missingNameOrBio) {
            res.status(400).json({
                errorMessage: "Please provide name and bio for the user."
            })
        } else {
            const updatedUser = db.updateUser(currentUser.id, newUserInformation)
            res.status(200).json({currentUser, updatedUser})

            // ?If there's an error when updating the user: but how?
            // respond with HTTP status code 500.
            // return the following JSON object: { errorMessage: "The user information could not be modified." }.
        }
    } else {
        res.status(404).json({
            message: 'User not found',
        })
    }


})
server.listen(8080, () => {//8080 is a standard to write local services
    console.log('Server started on port 8080')
})