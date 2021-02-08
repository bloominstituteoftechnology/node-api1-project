const express = require('express')
const generate = require('shortid').generate

//model function import
const dbFunctions = require('./users/model')

const server = express()
server.use(express.json())

const port = 5000;

// BUILD YOUR SERVER HERE

// const users = [
//   {id:generate(), name:"bob", job:'clown'},
//   {id:generate(), name:"tom", job:'mattress salesman'},
//   {id:generate(), name:"steve", job:'racecar driver'},
//   {id:generate(), name:"jake", job:'alcoholic'}
// ]

server.get('/api/users', (req,res) => {
  dbFunctions.find()
              .then(user => {
                res.status(200).json(user)
              })
              .catch(err => {
                res.status(500).json(err.message)
              })
})

server.get('/api/users/:id', (req,res) => {
  const id = req.params.id
  dbFunctions.findById(id)
            .then(user => {
              res.status(200).json(user)
            })
            .catch(err => {
              res.status(500).json(err.message)
            })
})

server.post('/api/users', (req,res) => {
  dbFunctions.insert(req.body)
              .then(user => {
                res.status(201).json(user)
              })
              .catch(err => {
                res.status(500).json(err.message)
              })
})

server.put('/api/users/:id', async (req, res) => {
  const id = req.params.id;
  const changes = req.body;
  if(!changes.name || !changes.bio ) {
    res.status(400).json({message:"All fields required!"})
  } else {
    try {
      const updated = await dbFunctions.update(id, changes)
      res.status(200).json(updated)
    } catch (error) {
      res.status(500).json({ message:error })
    }
  }
})

server.delete('/api/users/:id', (req, res) => {
  const id = req.params.id
  dbFunctions.remove(id)
              .then(user => {
                res.status(200).json(user)
              })
              .catch(err => {
                res.status(500).json(err.message)
              })
})

module.exports = server; // EXPORT YOUR SERVER instead of {}
