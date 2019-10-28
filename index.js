// implement your API here
console.log('its alive')
//get express to run api like data
const express = require('express')
// set up server to depend on express
const server = express()


// define port to run on 
const port = 5000
server.listen(port, () => console.log('\n RUNNING ON 5000 SERVER \n'))

// run server listen upon npm run server
server.use(express.json())

server.get('/', (req, res) => {
    res.send('User DB is Open')
})

// import db to run commands
const db = require('./data/db')

//get to api users
server.get('/api/users', (req, res) => {
    db.find() //woeks like axios in fe
    .then(users => {
        res.status(200).json(users)
    })
    .catch(err => {
        console.log('error', err);
        res.status(500).json({ error: 'failed to get users from db' });
      });
})
//get specific user by id
server.get('/api/users/:id', (req, res) => {
    // define single user id from db
    const id = req.params.id
    (`!users/${id}`)
    ? res 
    .status(404)
    .json({ message: "The user with the specified ID does not exist." })
    :db.
    findById(id)
    .then(() => {
        res.status(200).json(users)
    })
    .catch(() => {
        res.status(500).json({ error: 'The user information could not be retrieved.' });
      });
})
//post new user
server.post('/api/users', (req, res) => {
    // define data to post
    const {name, bio} = req.body
  
    (! name || !bio)
    ? res
    .status(400)
    .json({ errorMessage: "Please provide name and bio for the user." })
    : db
    .insert(req.body)
    .then(user => {
        res.status(201).json(user)
    })
    .catch(() => {
        res
        .status(500)
        .json({ error: "There was an error while saving the user to the database" })
    })
})

//delete req
server.delete('/api/users/:id', (req, res) => {
    const id = req.params.id
    (`!users/${id}`)
    ? res
    .status(404)
    .json({ message: "The user with the specified ID does not exist." })
    :db.
    remove(id)
    .then(users => {
        res.status(200).json(users)
    })
    .catch(() => {
        res.status(500).json({ error: 'The user information could not be removed.' });
      });
})