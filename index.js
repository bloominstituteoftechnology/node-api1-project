// implement your API here
const express = require('express');
const db = require('./data/db.js')
// ^---could be called what ever i choose db


const server = express();
const port = 8000
server.use(express.json());



server.get('/', (req, res) => {
    res.send({ api: 'up and running today...' })
})

server.get('/api/users', (req, res) => {
    db.find()
    .then(hubs => {
        res.
            status(200).json(hubs)
    })
    .catch(error => {
        console.log('error on GET /hubs', error)
        res
            .status(500) ////(Server Error).
            .json({ errorMessage: `couldn't get the data`})
    })
})

server.post ('/api/users', (req, res) => {
    const { name, bio } = req.body
        if (!name || !bio) {
            res
                .status(400) //(Bad Request).
                .json({ errorMessage: "Please provide name and bio for the user." })
        } else {
            db.insert(req.body)
            .then(user => {
                res
                .status(201) //(Created).
                .json({message:`added ${name} with a id of ${user.id}`})
            })
            .catch(error => {
                console.log( 'POST not working', error)
                res
                    .status(500) //(Server Error).
                    .json({ error: "There was an error while saving the user to the database" })
            })
        }
})

server.get ('/api/users/:id', (req, res) => {
    db.findById(req.params.id)
        .then(user => {
            if (user) {
                res.status(200) //request was received
                .json(user)
            } else {
                res
                    .status(404) // (Not Found).
                    .json({ message: "The User with the specified ID doesn't exist." })
            }
        })
        .catch(error => {
            console.log('GET not working', error)
            res
                .status(500) ////(Server Error).
                .json({ errorMessage: "The User information couldn't be retrieved." })
        })
})

server.delete('/api/users/:id', (req, res) => {
    db.remove(req.params.id)
        .then(erase => {
            if(erase && erase > 0) {
            res
            .status(200) //request was received
            .json({deleteMessage: `id ${erase} was erased`})
        } else {
            res
                .status(404) // (Not Found).
                .json({ message: 'The user with the specified ID does not exist.' });
        }
    })
        .catch(error => {
            console.log('delete didnt work', error)
            res
                .status(500) //(Server Error).
                .json({ errorMessage: 'The user could not be removed' })
        })
})

server.put('/api/users/:id', (req, res) => {
    const { name, bio } = req.body
    if(!name || !bio) {
        res
            .status(400) //(Bad Request).
            .json({ errorMessage: 'Please provide name and bio for the user.' })
    } else {
        db.update(req.params.id, req.body)
            .then(user => {
                if (user) {
                    res.status(200) //request was received
                    .json({message:`edited ${name} new bio ${bio}`})
                } else {
                    res
                        .status(404) // (Not Found).
                        .json({ message: "The User with the specified ID does not exist." })
                }
            })
            .catch(error => {
                console.log(`PUT not working`, error)
                res
                    .status(500) //(Server Error).
                    .json({ errorMessage: "The User information couldn't be modified." })
            })
    }
})


server.listen(port, () => console.log(`\n server listening on port ${port}** \n`))