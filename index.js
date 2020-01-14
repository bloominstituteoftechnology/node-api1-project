// implement your API here
const express = require("express");

const Users = require("./data/db.js");

const server = express();

server.use(express.json());


server.get('/', function(request, response) {
    response.send({ hello: 'Node API project 1 is running'});
});

server.get('api/users', (req, res) => {
    Users.find()
        .then(users => {
            console.log('Users', users);
            res.status(200).json(users); 
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({
                errorMessage: 'Sorry there was an error fetching users',
            });
        });
});


const port = 8000;
server.listen(port, () => console.log(`\n ** api on port ${port} ** \n`));