// BUILD YOUR SERVER HERE
const express = require('express') // import express
const User = require('./users/model.js') // import model

const server = express() // instance of express

server.use(express.json()) // express parses body of req as JSON

// | Method | URL            | Description                                                                                            |
// | ------ | -------------- | ------------------------------------------------------------------------------------------------------ |
// | POST   | /api/users     | Creates a user using the information sent inside the `request body`.                                   |
// | GET    | /api/users     | Returns an array users.                                                                                |
// | GET    | /api/users/:id | Returns the user object with the specified `id`.                                                       |
// | DELETE | /api/users/:id | Removes the user with the specified `id` and returns the deleted user.                                 |
// | PUT    | /api/users/:id | Updates the user with the specified `id` using data from the `request body`. Returns the modified user |

// Schema
// {
//   id: "a_unique_id", // String, hint: use the installed `shortid` npm package to generate it
//   name: "Jane Doe",  // String, required
//   bio: "Having fun", // String, required
// }

// Endpoints
server.post('/api/users', async (req, res) => {
  const newUser = req.body

  try {
    if (!newUser.name || !newUser.bio) {
      res.status(400).json({ message: "Please provide name and bio for the user" })
    } else {
      const createdUser = await User.insert(newUser)
      res.status(201).json(createdUser)
    }
  } catch (err) {
    res.status(500).json({ message: "There was an error while saving the user to the database" })
  }
})

server.get('/api/users', async (req, res) => {
  try {
    const users = await User.find()
    res.status(200).json(users)
  } catch(err) {
    res.status(500).json({ message: "The users information could not be retrieved" })
  }
})

server.get('/api/users/:id', async (req, res) => {
  const { id } = req.params

  try {
    const user = await User.findById(id)
    !user
      ? res.status(404).json({ message: "The user with the specified ID does not exist" })
      : res.status(200).json(user)
  } catch (err) {
    res.status(500).json({ message: "The user information could not be retrieved" })
  }
})

server.delete('/api/users/:id', async (req, res) => {
  const { id } = req.params

  try {
    const deleted = await User.remove(id)
    !deleted
      ? res.status(404).json({ message: "The user with the specified ID does not exist" })
      : res.status(200).json(deleted)
  } catch (err) {
    res.status(500).json({ message: "The user could not be removed" })
  }
})

server.put('/api/users/:id', async (req, res) => {
  const { id } = req.params
  const changes = req.body

  try {
    if (!changes.name || !changes.bio) {
      res.status(400).json({ message: "Please provide name and bio for the user" })
    } else {
      const updated = await User.update(id, changes)
      !updated
        ? res.status(404).json({ message: "The user with the specified ID does not exist" })
        : res.status(200).json(updated)
    }
  } catch (err) {
    res.status(500).json({ message: "The user information could not be modified" })
  }
})

module.exports = server // EXPORT YOUR SERVER instead of {}
