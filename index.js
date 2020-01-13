// implement your API here

const express = require('express')
const cors = require('cors')

const { find, findById, insert, update, remove } = require('./data/db')

const server = express()

server.use(express.json())

server.use(cors())

server.listen(8000, () => {
    console.log("listening on 8000");
  });

server.get('/users', (req, res) => {
    find()
    .then(users => {
        res.status(200).json(users)
    })
    .catch(error => {
        res.status(500).json({ 
            errorMessage: "The users information could not be retrieved."
        })
    })
})

server.get('/users/:id', async (req, res) => {
    const { id } = req.params

    try {
        const getUser = await findById(id)
        if (getUser) {
          res.status(200).json(getUser)
        } else {
          res.status(404).json({ message: `user with id ${id} is not defined`})
        }
      } catch (error) {
        res.status(500).json(error.message)
      }
})

server.post("/users", (req, res) => {
    const newUser = req.body
    if (!newUser.name || !newUser.bio) {
      res
        .status(400)
        .json({ errorMessage: "Please provide name and bio for the user." });
    } else {
      insert(newUser)
        .then(user => {
          if (user) {
            res.status(201).json(user)
          } else {
          }
        })
        .catch(error => {
          res.status(500).json({
            errorMessage:
              "There was an error while saving the user to the database"
          })
        })
    }
  })

server.put('/users/:id', async (req, res) => {
    // PUT a hub by id using the request body
    const { id } = req.params
    const replacementUser = req.body
  
    try {
      const updatedUser = await update(id, replacementUser)
      if (updatedUser) {
        res.status(200).json(updatedUser)
      } else {
        res.status(404).json({ message: `user with id ${id} is not here`})
      }
    } catch (error) {
      res.status(500).json(error.message)
    }
  });

  server.delete('/users/:id', (req, res) => {
      const { id } = req.params

      remove(id)
        .then(user => {
            res.status(202).json(user)
        })
        .catch(error => {
            res.status(500).json({
                error: 'Something went wrong'
            })
        })
  })