// implement your API here

const express = require('express')
let db = require('./data/db')

const app = express()

app.use(express.json())

app.get('/', (req, res) => {
    console.log('ip:', req.ip)
    res.json({ message: 'Welcome!' })
})

app.get('api/users', (req, res) => {
    res.json(db)
})

app.get('api/users/:id', (req, res) => {
    const user = db.find(row => row.id === req.params.id)
        if (user) {
            res.json(user)
        } else {
            res.status(404).json({ error: 'User not found' })
        }
})

app.post('api/users', (req, res) => {
    if (!req.body.name) {
        return res.status(400).json({ error: 'Need a user name' })
    }
    const newUser = {
        id: String(db.length + 1),
        name: req.body.name,
    }
    db.push(newUser)
    res.status(201).json(newUser)
})

// app.put('/users/:id', (req, res) => {
//     .then( => {

// })
//     .catch( => {

//     })

app.delete('api/users/:id', (req,res) => {
    const user = db.find(row => row.id === req.params.id)
    if (user) {
        db = db.filter(row => row.id !== req.params.id)
        res.json(user)
    } else {
        res.status(404).json({ error: 'User not found' })
    }
})

const port = 5000
const host = '127.0.0.1'

app.listen(port, host, () => {
    console.log(`Server running at http://${host}:${port}`)
})

// .then(response => {
//             return res.status(200).json({
//                     url: `/api/users/${id}`,
//                     user: response
//                 })
//         })