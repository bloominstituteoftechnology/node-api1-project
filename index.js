// implement your API here

const express = require('express')

const app = express()

// server.get('/', (req, res) => {
//     res.send('Hello World')
// })

// server.get('/hobbits', (req, res) => {
    
// })

// server.get('/')

const port = 5000
const host = '127.0.0.1'

app.listen(port, host, () => {
    console.log(`Server running at http://${host}:${port}`)
})