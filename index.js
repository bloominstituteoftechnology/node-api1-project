// implement your API here
const express = require('express');

const db = require('./data/db.js');

const cors = require('cors')

const server = express();
const port = process.env.SERVER_PORT || 4000;

server.use(express.json());
server.use(cors());

server.listen(port, () => {
console.log(`server listening on port ${port}`);
});

server.get('/', (req, res) => {
    res.send('Hello beautiful!')
});


//When the client makes a GET request to /api/users
//Return an array users.
server.get('/api/users', (req, res) => {
    db.find()
        .then(user => {
            res.status(200).json({user});
        })
        .catch(err => {
            res.status(500).json({success:false, err});
        });
});


//When the client makes a POST request to /api/users
//Rreurn the new created object
server.post('/api/users', (req,res) => {

    const userInfo = req.body;

    if (  typeof userInfo.name === 'undefined' || typeof userInfo.bio === 'undefined') {
		res.status(400).json({ errorMessage: 'Please provide name and bio for the user.' });
	} else {
    db.insert(userInfo)
        .then(user => {
            res.status(201).json({ success: true, user});
        })
        .catch(err => {
            res.status(500).json({ errorMessage: "There was an error while saving the user to the database", err});
        });
    }
});


//When the client makes a GET request to /api/users/:id
server.get('/api/users/:id' ,(req, res) => {
    db.findById(req.params.id)
        .then(user => {
            if(user){
                res.status(200).json({user});
            } else {
                res.status(404).json({message: "The user with the specified ID does not exist."});
            }
        })
        .catch(err => {
            res.status(500).json({errorMessage: "The user information could not be retrieved.", err});
        });
});


//When the client makes a DELETE request to /api/users/:id
server.delete('/api/users/:id', (req, res) => {

    db.remove(req.params.id)
        .then(user => {
            if(user){
                res.status(200).end();
            } else {
                res.status(404).json({ message: "The user with the specified ID does not exist."});
            }
        })
        .catch(err => {
            res.status(500).json({errorMessage: "The user could not be removed", err});
        });
});


//When the client makes a PUT request to /api/users/:id
server.put('/api/users/:id', (req, res) => {

   const userInfo = req.body;
   const {id} = req.params;

    if (typeof userInfo.name === 'undefined' ||  typeof userInfo.bio === 'undefined') {
		res.status(400).json({ errorMessage: 'Please provide name and bio for the user.' });
	} else {
        db.update(id, userInfo)
            .then(user => {
                if(user) {
                    res.status(200).json({ success: true, user});
                } else{
                    res.status(404).json({ message: "The user with the specified ID does not exist."});
                }
            })
            .catch(err => {
                res.status(500).json({ errorMessage: "The user information could not be modified." , err});
            });
        }
})