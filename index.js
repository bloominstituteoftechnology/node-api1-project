const db = require('./data/db')

const express = require('express')

const server = express()

server.listen(4534, () => {
  console.log('=== server listening on port 4534 ===')
})

server.use(express.json())


server.post('/api/users', (req, res) => {

  const { name , bio } = req.body

  if ( !name || !bio ) {

    res.status(400).json({ message: 'User object must contain a name and bio' })

  } else {

    db.insert(user)
      .then(() => {
        db.find()
          .then(users => {
            res.status(201).json(users)
          })
          .catch(err => {
            res.status(500).json({ success: false, err })
          })
      })
      .catch(err => {
        res.status(500).json({ success: false, err })
      })
  }
})


server.get('/api/users', (req, res) => {
  db.find()
    .then(users => {
      res.status(200).json(users)
    })
    .catch(err => {
      res.status(500).json({ success: false, err })
    })
})


server.get('/api/users/:id', (req, res) => {

  const { id } = req.params

  db.findById(id)
    .then(user => {
      if (user) {
        res.status(200).json(user)
      } else {
        res.status(404).json({ message: 'No such user with that id'})
      }
    })
    .catch(err => {
      res.status(500).json({ success: false, err })
    })
})


server.delete('/api/users/:id', (req, res) => {
  
  const { id } = req.params

  db.remove(id)
    .then(response => {

      if (response == 1) {
        db.find()
          .then(users => {
            res.status(200).json(users)
          })
          .catch(err => {
            res.status(500).json({ success: false, err })
          })
      } else {
        res.status(404).json({ message: "The user with the specified ID does not exist" })
      }

    })
    .catch(err => {
      res.status(500).json({ message: "The user could not be removed", err })
    })
})

server.put('/api/users/:id', (req, res) => {

  const user = req.body
  const { id } = req.params

  if (!user.name || !user.bio) {

    res.status(400).json({ errorMessage: "Please provide name and bio for the user " })
    
  } else {

    db.update(id, user)
      
      .then(response => {
        
        if (response == 0) {
          res.status(404).json({ message: "The user with the specified id could not be found" })
          
        } else {
          db.findById(id)
          
          .then(user => {
            res.status(200).json(user)            
          })

          .catch(err => {
            res.status(500).json({ error: "The user information could not be modified", err })            
          })
        }        
      })

      .catch(err => {
        res.status(500).json({ success: false, error: "The user information could not be modified", err })            
    })
      
  }
})