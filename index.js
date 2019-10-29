// implement your API here
const express = require('express'); 
const db = require('./data/db');
const server = express(); 

server.use(express.json()); //teaches express how to read json, needed for POST and PUT to work



//----- .post('api/users) -----//
server.post('/api/users', (req,res) => {
    // one way of doing this
    // user = {
    //     ...req.body,
    // };

    // other way of doing this (saw this most often in help)
    const { name, bio } = req.body;
   
    db.insert(req.body)
    .then(users => {
        if (users === []) {
            res.status(500).json({ error: "There was an error while saving the user to the database" });
        } else {
        res.status(201).json(users);
    }})
    .catch(error => {
        res.status(400).json({errorMessage: "Please provide name and bio for the user."});
    });
});

//----- .get('api/users) -----//
server.get('/api/users', (req,res) => {
    db.find() 
    .then(users => {
        res.status(200).json(users);
    })
    .catch(error => {
        // res.send('An error, sorrrry.') --doing .json instead per today's lecture
        res.status(500).json({ error: "The users information could not be retrieved." });
    });
});


//----- .get('api/users/:id) -----//
server.get('api/users/:id', (req,res) => {
    const {id} = req.params
    db.findById(id)
        .then(user => {
            if (user === []) {
                res.status(404).json({ message: "The user with the specified ID does not exist." });
            } else {
            res.status(200).json(user)
        }})
        .catch(error => {
            res.status(500).json({ error: "The user information could not be retrieved." });
        });
});

//----- .delete('api/users/:id) -----//
server.delete('api/users/:id', (req,res) => {
    const {id} = req.params;

    db.remove(id)
    .then(user => {
        if (user === []) {
            res.status(404).json({message: 'The user with the specified ID does not exist!'})
        } else {
        res.status(204).json({message: 'Success, the user has been deleted!'})
    }})
    .catch(error => {
        res.status(500).json({ error: "The user could not be removed" });
    });
});

//----- .put('api/users/:id) -----//
server.put('/api/users/:id', (req, res) => {
    const { id } = req.params;
    const editedUser = {
        ...req.body,
    };

    db.update(id, editedUser)
    .then(edited => {
        if (id === []) {
            res.status(404).json({ message: "The user with the specified ID does not exist." });
        } else if (editedUser === []) {
            res.status(500).json({ error: "The user information could not be modified." });
        } else {
            res.status(203).json(edited);
    }})
    .catch(error => {
        res.status(400).json({ errorMessage: "Please provide name and bio for the user." });
    });
})





const port = 6000; 
server.listen(port, () => console.log('\n=== API on port 6000 ===\n'));



//misc note on using insomnia -- in insomnia the post error occurred from not setting a header on the "post" side before clicking "send". When you set up the post with JSON, the name and bio you entered post an id for the user