// implement your API here
const express = require('express')
const database = require('./data/db')
const app = express();

app.post('/api/users', (req, res) => {
    const data = req.body
    if(data.name && data.bio) {
        database.insert(data)
            .then(user => {
                res.status(201).json(user)
            })
            .catch(err => {
                res.json({message: 'Error creating new user.'})
            })
    } else {
        res.status(400)
            .json({message: 'All information is needed to create a user.'})
    }
})

app.get('/api/users', (req, res) => {
    database.find()
        .then(users => {
            res.send(users);
        })
        .catch(err => {
            res.send(error);
        })
})

app.get('/api/users/:id', (req, res) => {
    const id = req.params.id;
    console.log(id);
    database.findById(id)
        .then(user => {
            if(user) {
                res.json(user)
            } else {
                console.log(user);
                res.status(404)
                    .json({message: `There is no user with the specified ID: ${id}`})
            }
        })
        .catch(err => {
            res.status(400).json({message: "Error finding the user"})
        })
})

app.delete('/api/users/:id', (req, res) => {
    const id = req.params.id
    database.findById(id).then(user => {
        if(user) {
            database.remove(id)
                .then(ans => {
                    res.status(201).json(ans)
                })
                .catch(err => {
                    res.status(500)
                        .json({message: "Error deleting the user"})
                })
        } else {
            res.status(404)
                .json({message: 'There is no user with the specified ID'})
        }
    })
})

app.put('/api/users/:id', (req, res) => {
    const id = req.params.id
    database.findById(id).then(user => {
        if(!req.body.name || !req.body.bio) {
            res.status(400)
                .json({message: "Name and bio required."})
        } else if(user) {
            database.update(id, req.body)
                .then(ans => {
                    res.status(200).json(ans);
                })
                .catch(err => {
                    res.status(400).json({message: 'The user could not be updated.'})
                })
        } else {
            res.status(404)
                .json({message: 'There is no user with the specified ID'})
        }
    })

})

const port = 8000;
app.listen(port, () => console.log("Server Running"))