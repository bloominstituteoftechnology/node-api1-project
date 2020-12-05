//Import express
const express = require('express');

//Import shortid
const shortid = require('shortid');

//Connected server = express
const server = express();

//Created port
const PORT = 5000;

//Listening
server.listen(PORT, () => {
    console.log(`Server listening on PORT ${PORT}`);
})

//Testing server workds
server.get('/', (req, res) => {
    res.json('<h1>Hello, World</h1>');
})

//Users(array of onjects)
let users = [
    {
        "id": shortid.generate(),
        "name": "Tevvn Strong",
        "bio": "Coder for life MAN!"
    },
    {
        "id": shortid.generate(),
        "name": "Sean Phillips",
        "bio": "If your not first you're last!!!!"
    },
    {
        "id": shortid.generate(),
        "name": "David Matthew",
        "bio": "Coder or die!!!"
    },
    {
        "id": shortid.generate(),
        "name": "Conor Cameron",
        "bio": "Surf's up DUDE!!!"
    }
]

// CRUD operations
server.post('/api/users', (req, res) => {
    const newUser = req.body; //Reading from the body property(information about the user).

    newUser.id = shortid.generate(); //Adding id

    users.push(newUser); //Pushing new user to our array of objects(users).

    res.status(201).json(newUser); //If we add a user, return the new user.
})