const express = require('express')
const shortid = require('shortid')

const server = express()

server.use(express.json())

let users = [
    {
        id: shortid.generate(),
        name: "Jane Doe",
        bio: "Not Tarzan's Wife, another Jane"
    }
]

const Users = {
    createNew(user) {
      const newUser = { id: shortid.generate(), ...user }
      users.push(newUser)
      return newUser
    },
    getAll() {
      return users
    },
    getById(id) {
      return users.find(user => user.id === id)
    },
    delete(id) {
      const user = users.find(user => user.id === id)
      if (user) {
        users = users.filter(u => u.id !== id)
      }
      return user
    },
    update(id, changes) {
      const user = users.find(user => user.id === id)
      if (!user) {
        return null
      }
      const updatedUser = { id, ...changes }
      users = users.map(u => {
        if (u.id === id) {
            return updatedUser
        }
        return u
      })
      return updatedUser
    }
  }















  server.use('*', (req, res) => {
    res.status(404).json({ message: 'not found' })
  })
  
  // start the server
  server.listen(5001, () => {
    console.log('listening on port 5001')
  })
