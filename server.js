const express = require('express');
const shortid = require('shortid');
const server = express();


let users = [];


server.use(express.json());


//----------------------------------------------------------//
// GET

server.get('/api/users', (req, res) => {
    if (users.length) {
        res.status(200).json(users); 
    } else {
        res.status(500).json({ errorMessage: "The users information could not be retrieved." })
    }
})


server.get(`/api/users/:id`, (req, res) => {

    const { id } = req.params;

    const foundId = users.find(user => user.id === id);

    if(foundId) {
        users = users.filter(user => user.id !== id);
        if(foundId.name && foundId.bio) {
            res.status(200).json(foundId);  
        } else {
            res.status(500).json({errorMessage: "The user information could not be retrieved."})
        }
    } else {
        res.status(404).json({ message: "The user with the specified ID does not exist." });
    }
    

    
})


//----------------------------------------------------------//
// POST

server.post('/api/users', (req, res) => {
    const usersInfo = req.body;

    
    if (req.body.name && req.body.bio) {
        usersInfo.id = shortid.generate();
        users.push(usersInfo); // uncomment this line of code to test 500 error
        if(!users.find(user => user.id === usersInfo.id)) {
            res.status(500).json({ errorMessage: "There was an error while saving the user to the database" })
        }

        res.status(201).json(usersInfo);
    } else {
        res.status(400).json({errorMessage: "Please provide name and bio for the user."})
    }
    
    
})


//----------------------------------------------------------//
// DELETE

server.delete('/api/users/:id', (req, res) => {
    const { id } = req.params;

    const deleted = users.find(user => user.id === id);

    if (deleted) {
        users = users.filter(user => user.id !== id);
        const checkUser = users.find(user => user.id === id);
        if(checkUser === deleted) {
            res.status(500).json({errorMessage: "The user could not be removed" })
        } else {
            res.status(200).json(deleted);
        }
        
    } else {
        res.status(404).json({message: "The user with the specified ID does not exist."});
    }
})

//----------------------------------------------------------//
// UPDATE
// server.patch('/api/users/:id', (req, res) => {
//     const { id } = req.params;
//     const changes = req.body;

//     let found = users.find(user => user.id === id);
    
//     if (found) {
//         Object.assign(found, changes);
//         res.status(200).json(found);
//     } else {
//         res.status(404).json({message: "id not found"});
//     }
// });


server.put('/api/users/:id', (req, res) => {
    const { id } = req.params;

    const changes = req.body; // user inputs a change thru the body
    changes.id = id; // the body's id is being assigned to the id from the URL 
    let index = users.findIndex(user => user.id === id); 
    // finding the index of the user in the list of users with a specific id
    if(index !== -1) { // CASE 1 if the index variable returns with a user's index
        if(changes.name && changes.bio) {// CASE 2 if the user inputed a name and bio
            users[index] = changes;// setting the user with the found index to the changes which is the req.body
            const checkUser = users.find(user => user.id === id);
            if(checkUser === changes) { // CASE 3 if the user in the original array equals to the changes made
                res.status(200).json(users[index]); 
            } else { // CASE 3 if the user in the original array does not equal to the changes made
                res.status(500).json({errorMessage: "The user information could not be modified."});
            }
        } else {// CASE 2 if the user did not input a name or bio
            res.status(400).json({errorMessage: "Please provide name and bio for the user."});
        }
    } else { // CASE 1 if the variable index could not find the user's index by the id
        res.status(404).json({ message: "The user with the specified ID does not exist." });
    }
})


// server.put('/api/users/:id', (req, res) => {
//     const { id } = req.params;

//     const changes =  req.body;

//     changes.id = id;

//     let index = users.findIndex(users => users.id === id);

//     if (index !== -1) {
//         users[index] = changes;
//         res.status(200).json(changes)
//     } else {
//         res.status(404).json({message: 'id not found'})
//     }
// })


const PORT = 3000;

server.listen(PORT, () => {
    console.log(`listening on port ${PORT}...`);
});