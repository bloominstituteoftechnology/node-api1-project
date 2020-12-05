//Imported express
const express = require('express');
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

//Users
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