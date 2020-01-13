// implement your API here

const express = require('express')
const cors = require('cors')

const { find, findById, insert, update, remove } = require('./data/db')

const server = express()

server.use(express.json())

server.use(cors())

server.get('/hubs', (req, res) => {
    find()
    .then(hubs => {
        console.log(res)
    })
    .catch(error => {
        console.log(error);
    })
})