const express = require('express')
const userRoutes = require('./users/userRoutes')

const server = express()
server.use(express.json())
server.use('/api/users', userRoutes)

const PORT = 6000

server.all("/", (req, res) => {
    res.status(404).json({ message: 'not found' })
})

server.listen(PORT, () => {
    console.log('server running on PORT 6000');
})