// implement your API here

const express = require('express');

const server = express();
const db = require('./data/db')

app.use(express.json())

server.get('/api/users', (res, req) => {
    db.find()
        .then(user => {
            res.status(200).json(user)
        })
        .catch(error => {
            res.status(500).json({ success: false, error })
        })
})

server.listen(process.env.PORT || 3000, () => {
    console.log('LIstening on' + process.env.PORT || 3000)
})

