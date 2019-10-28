// implement your API here
//get express to run api like data
const express = require('express')
// set up server to depend on express
const server = express()
// import db to run commands
const db = './db.js'

// define port to run on 
const port = 5000
server.listen(port, () => console.log('\n RUNNING ON 5000 SERVER \n'))

// run server listen upon npm run server
server.get('/', (req, res) => {
    res.send('User DB is Open')
})