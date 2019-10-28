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