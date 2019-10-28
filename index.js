// implement your API here
const db = require('./data/db.js');

server.post('/api/users', (req, res) => {
    const newUsers = req.body;
    users.add(newUsers)
        .then(users => res.status(201).json(users))
        .catch(err => {
            res.status(500).json({
                err: err,
                message: 'There was an error while saving the user to the database'
            })
        })
})


server.get('/api/users', (req, res) => {
    users.find()
        .then(users => {
            res.json(users);
        })
        .catch(err => {
            res.status(500).json({
                err: err,
                message: 'The users information could not be retrieved'
            })
        })
})

server.get('/api/users/:id', (req, res) => {
    const { id } = req.params;

    users.findById(id)
        .then(user => {
            if (user) {
                res.json(user)
            } else {
                res.status(404).json({
                    message: 'The user with the specified ID does not exist'
                })
            }
        })
        .catch(err => {
            res.status(500).json({
                err: err,
                message: 'The user information could not be retrieved.'
            })
        })
})

server.delete('/api/users/:id', (req, res) => {
    const { id } = req.params;

    db.remove(id)
        .then(deletedUser => {
            if (deletedUser) {
                res.json(deletedUser)
            } else {
                res.status(404).json({
                    message: 'The user with the specified ID does not exist'
                })
            }
        })
    res.json(deletedUser => {
        res.json(deletedUser);
    })
        .catch(err => {
            res.status(500).json({
                err: err,
                error: 'The user could not be removed'
            })
        })
})