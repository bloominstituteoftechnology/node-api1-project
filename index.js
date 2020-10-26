
const express = require('express')
const generate = require('shortid').generate

const app = express() 
app.use(express.json())

const PORT = 5000

let users = [
  { id: generate(), name: 'Cora', bio: 'Full-Sack Web developer in the making.' },
]


app.get('/users', (req, res) => {
  res.status(200).json(users)
})

app.get('api/users', (req, res) => {
  const { id } = req.params
  const user = users.find(user => user.id === id)
  if (!user) {
    res.status(500).json({
        errorMessage: "The users information could not be retrieved." 
    })
  } else {
    res.status(201).json(user)
  }
})

app.get('api/users/id', (req, res) => {
    const { id } = req.params
    const user = users.find(user => user.id === id)
    if (!user) {
      res.status(404).json({
        message: "The user with the specified ID does not exist." 
      })
    } else {
      res.status(201).json(user)
    }
  })

app.post('/users', (req, res) => {
  const { name, bio } = req.body
  if (!name || !bio) {
    res.status(401).json({
        errorMessage: "Please provide name and bio for the user."
    })
  } else {
    const newUser = { id: generate(), name, bio }
    users.push(newUser)
    res.status(201).json(newUser)
  }
})

app.put('api/users/:id', (req, res) => {
  const { id } = req.params
  const { name, bio } = req.body
  const indexOfUser = users.findIndex(user => user.id === id)
  if (indexOfUser !== -1) {
    users[indexOfUser] = { id, name, bio }
    res.status(200).json({ id, name, bio })
  } else {
    res.status(404).json({
        message: "The user with the specified ID does not exist.",
    })
  }
})

app.delete('api/users/:id', (req, res) => {
  const { id } = req.params
  try {
    if (!users.find(user => user.id === id)) {
      res.status(404).json({ 
        message: "The user with the specified ID does not exist."
      })
    } else {
      users = users.filter(user => user.id !== id)
      res.status(200).json({ message: `user with id ${id} got deleted!`})
    }
  } catch (error) {
    res.status(500).json({
        errorMessage: "The user could not be removed"
    })
  }
})

app.all('*', (req, res) => {
  res.status(500).json({ 
      errorMessage: "There was an error while saving the user to the database"
    })
})

app.listen(PORT, () => {
  console.log(`LISTENING ON PORT ${PORT}`)
})