// implement your API here
const express = require('express');
const server = express();
const Db = require("./data/db")
server.use(express.json());


server.get("/", function(request, response) {
    response.send({test:'This is a test'})
})

server.post("/api/users", (req, res) => {
    const userData = req.body;
    Db.insert(userData)
    .then(user => {
        res.status(201).json(user);
    })
    .catch(error => {
        console.log(error)
        res.status(400).json({errorMessage: "Please provide name and bio for the user." })
    })
})


const port = 8000;

server.listen(port, () => console.log(`\n ** api on port: ${port} ** \n`))