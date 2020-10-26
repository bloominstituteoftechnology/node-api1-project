const express = require('express')

const generate = require('shortid').generate

const app = express()
app.use(express.json())

const PORT = 5000

let users = [
    { id: generate(), name: 'Skelator', bio: "child of perpetual wonder" },
]

//get all users
app.get('/users', (req, res) => {
    res.status(200).json(users)
})

//[GET] user with ID passed as param in URL
app.get('/users/:id', (req, res) => {
    const { id } = req.params
    const user = users.find(user => user.id === id)
    if(!user){
        res.status(404).json({
            message: `User with id ${id} not found`,
        })
    } else {
        res.status(200).json(user)
    }
})

//updats user with specified ID
app.put('/users/:id', (req, res) => {
    const { id } = req.params

    const { name, bio } = req.body

    const indexOfUser = users.findIndex(user => user.id === id)

    if (indexOfUser !== -1) {
        users[indexOfUser] = { id, name, bio }

        res.status(200).json({ id, name, bio})
    } else {
        res.status(404).json({
            message:`Please provide name and bio for the user.`,
        })
    }


})
//adds new User
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
  

//deleting user
app.delete('/users/:id', (req, res) => {
    const { id } = req.params
  
    try{
        if (!users.find(user => user.id === id)) {
        res.status(404).json({ message: 'not found'})
        } else {
            users = users.filter(user => user.id !== id)
            res.status(200).json({ message: `user ${id} got deleted!`})
        }
    } catch (error) {
        res.status(500).json({ message: 'Not happening'})
    }

})


app.use('*', (req, res) => {
    res.status(404).json({ message: 'Not found!' })
  })

  app.listen(PORT, () => {
    console.log(`LISTENING ON PORT ${PORT}`)
  })