// implement your API here

const express = require('express')

const server = express()

server.get('/', (req, res) => {
    res.send('Hello World')
})

server.get('/hobbits', (req, res) => {
    const hobbits = {
         id: 1, 
         name: 'Samwise Gamgee',
    }
    // {
    //     id: 2,
    //     name: 'Frodo Baggins',
    // }

    res.status(200).json(hobbits)
})

server.get('/')


server.listen(5000, () => {
    console.log('API running on port 5000')
})