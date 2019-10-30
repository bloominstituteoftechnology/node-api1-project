const db = require('./data/db')

const express = require('express')

const server = express()

server.listen(4534, () => {
  console.log('=== server listening on port 4534 ===')
})

server.use(express.json())


