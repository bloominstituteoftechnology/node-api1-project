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

server.post('/api/users', (res, req) => {
    const { name, bio } = req.body

    db.insert(name, bio)
        .then(user => {
            res.status(201).json({ success: true, user })
        })

        .catch(error => {
            res.status(500).json({ success: false, error })
        })
})

server.get('/api/users/:id', (res, req) => {
    db.findById(req.params.id)
        .then(user => {
            if (user) {
                res.status(200).json({ success: true, user })

            }
            else {
                res.status(404).json({ success: false, message: 'User not found' })
            }
        })
        .catch(error => {
            res.status(500).json({ success: false, error })
        })

})

server.put('/api/users', (res, req) => {
    const { id } = req.params.id
    const changes = req.body
    db.update(id, changes)
        .then(updated => {
           if(updated) {
               res.status(200).json({ success: true, updated})
           }
           else{
               res.status(404).json({success:false, message:'Cannot find user'})
           }
        })
        .catch(error => {
            res.status(500).json({ success:false, error })
        })
})

server.listen(process.env.PORT || 3000, () => {
    console.log('LIstening on' + process.env.PORT || 3000)
})

