// implement your API here
const express = require('express');
const userModel = require('./data/db')
const server = express();

server.use(express.json());

server.get('/', (req, res) => {
  res.send('Welcome To The Lord Of The Rings API!');
});

// `find()`: calling find returns a promise that resolves to an array of all the users contained in the database.
server.get ('/api/users', (req, res) => {
    userModel
        .find()
        .then(users => {
            res.json(users)
        })
        .catch(error => {
            res.status(500).json({
            message:'There was an error getting the user information.'
        })
    })        
});

// `findById()`: this method expects an `id` as it's only parameter and returns the user corresponding to the `id` provided or an empty array if no user with that `id` is found.
server.get ('/api/users/:id', (req, res) => {
    const id = req.params.id;
    userModel
    .findById(id)
    .then(users => {
        res.json(users => {
            if (users){
                res.json(user)
            } else {
                res.status(404).json(`{
                    message: "The user with the specified ID does not exist." 
                }`)
            }
        })
    })
    .catch(error => {
        res.status(500).json(`{
            error: "The user information could not be retrieved." 
        }`)
    })        
});

// `insert()`: calling insert passing it a user object will add it to the database and return an object with the `id` of the inserted user. The object looks like this: `{ id: 123 }`.
server.post('/api/users', (req, res) => {
const {name} = req.body;

    userModel
    .insert(req.body)
    .then(user => {
        if(user) {
            res.status(201).json(user);
        } else {
            res.status(400).json(`{
                errorMessage: "Please provide name and bio for the user."
            }`)
        }
    })
    .catch(err => {
        res.status(500).json(`{
            error: "There was an error while saving the user to the database"
        }`)
    })
});

// `update()`: accepts two arguments, the first is the `id` of the user to update and the second is an object with the `changes` to apply. It returns the count of updated records. If the count is 1 it means the record was updated correctly.
server.put('/api/users/:id', (req, res) => {
    const {id} = req.params;
    const {name} = req.body;
    if(name) {
        userModel
        .update(id, req.body)
        .then(updatedUser => {
            if(updatedUser) {
                res.status(200).json(updatedUser);
            } else {
                res.status(404).json(`{
                    message: "The user with the specified ID does not exist."
                }`)
            }
        })
        .catch(err => {
            res.status(500).json(`{
                error: "The user information could not be modified."
            }`)
        })
    } else {
        res.status(400).json(`{
            errorMessage: "Please provide name and bio for the user."
        }`)
    }
});

// `remove()`: the remove method accepts an `id` as it's first parameter and upon successfully deleting the user from the database it returns the number of records deleted.
server.delete('/api/users/:id', (req, res) => {
    const {id} = req.params;
    userModel
    .remove(id)
    .then(deletedUser => {
        if(deletedUser) {
            res.status(200).json(deletedUser);
        } else {
            res.status(404).json(`{
                message: "The user with the specified ID does not exist."
            }`)
        }
    })
    .catch(err => {
        res.status(500).json(`{
            error: "The user could not be removed"
        }`)
    })
});

server.listen(8000, () => { 
    console.log('API running on port 8000')
});