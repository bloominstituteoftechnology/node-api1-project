
const express = require('express')
const db = require('./data/db')
const server = express()

server.use(express.json())

// GET - root test
server.get('/', (req, res) => {
  res.send('hello world')
})

// GET - all users
server.get('/api/users', (req, res) => {
  db.find()
    .then((users) => {
      res.send(users)
    })
    .catch((error) => {
      res
        .status(500)
        .send({ error: 'The users information could not be retrieved.' })
    })
})

// GET - get a single user by id
server.get('/api/users/:id', (req, res) => {
  const id = req.params.id

  db.findById(id)
    .then((user) => {
      if (!user) {
        res
          .status(404)
          .send({ message: 'The user with the specified ID does not exist.' })
      } else {
        res.send(user)
      }
    })
    .catch((error) => {
      res
        .status(500)
        .send({ error: 'The user information could not be retrieved.' })
    })
})

// POST - insert new user to db
server.post('/api/users', (req, res) => {
  const newuser = req.body

  if (!newuser.name || !newuser.bio) {
    // if req body obj is incorrect
    res
      .status(400)
      .json({ errorMessage: 'Please provide name and bio for the user.' })
  } else {
    db.insert(newuser) // pass a user obj, returns json obj with id
      .then((user) => {
        res.status(201).json(user)
      })
      .catch((error) => {
        res.status(500).json({
          error: 'There was an error while saving the user to the database'
        })
      })
  }
})

// PUT - update a users info with an id
server.put('/api/users/:id', (req, res) => {
  const id = req.params.id
  const changes = req.body

  if (!changes.name || !changes.bio) {
    res
      .status(400)
      .json({ errorMessage: 'Please provide name and bio for the user.' })
  } else {
    db.update(id, changes)
      .then((user) => {
        if (user === 0) {
          res
            .status(404)
            .json({ message: 'The user with the specified ID does not exist.' })
        } else {
          res.status(200).json(changes)
        }
      })
      .catch((error) => {
        res.status(500).json({ error: 'The user information could not be modified.' })
      })
  }
})

// DELETE - delete a user by id
server.delete('/api/users/:id', (req, res) => {
  const id = req.params.id

  db.remove(id)
    .then((user) => {
      if (!user) {
        res
          .status(404)
          .json({ message: 'The user with the specified ID does not exist.' })
      } else {
        res.json(user)
      }
    })
    .catch((error) => {
      res.status(500).json({ error: 'The user could not be removed' })
    })
})

const port = 8000
server.listen(port, () => console.log(`\n** API on port ${port} ** \n`))
