// implement your API here
const express = require('express');
const cors = require('cors')
const server = express();
const Db = require("./data/db")
const helmet = require('helmet');

//

server.use(express.json());
server.use(cors());
server.use(helmet());

server.get("/", function(request, response) {
    response.send({test:'This is a test'})
})

server.post("/api/users", (req, res) => {
    const {name, bio} = req.body;
     if (!name || !bio)
     return res.status(400).json({errorMessage: "Please provide name and bio for the user." })
    Db.insert({name, bio})
    .then(user => {
        res.status(201).json(user);
    })
    .catch(error => {
        console.log(error)
        res.status(400).json({errorMessage: "Please provide name and bio for the user." })
    })
})

server.get("/api/users", (req, res) => {
    Db.find()
    .then(allUsers => {
        console.log('All Users', allUsers)
        res.status(200).json(allUsers)
    })
    .catch(error => {console.log(error);
    res.status(500).json({errorMessage: "The users information could not be retrieved."})}
    )
})

server.get("/api/users/:id", (req, res)=> {
    const id = req.params.id
    Db.findById(id)
    .then(user => {
        if(user) {
            res.status(200).json(user)
        } else {
            res.status(404).json({ message: "The user with the specified ID does not exist." })
        }
    })
    .catch(err => {console.log(error);
    res.status(404).json({ message: "The user with the specified ID does not exist." })})
})

server.put("/api/users/:id", (req, res) => {
    const id = req.params.id;
    const {name, bio} = req.body;
    if (!name || !bio){
        return res.status(400).json({ errorMessage: "Please provide name and bio for the user."})
    }
    Db.update(id, {name, bio})
    .then(updateUser => {
        if(updateUser){
            Db.findById(id)
            .then(user =>{
                res.status(201).json(user)
            })
        } else {
            res.status(404).json({message: "The user with the specifed id does not exist"})
        }
    })
    .catch(err => {
        res.status(500).json(err)
    })
    


    
})

server.delete('/api/users/:id', (req, res) => {
    const id = req.params.id;
    Db.remove(id)
    .then(deleted => {
        if (deleted){
            res.status(204).end()
        } else {
            res.status(404).json({message: "The user with the specified ID does not exist."})
        }
    })
    .catch(err => {
        res.status(505).json(err, "error finding the user")
    })
})


const port = process.env.PORT || 8000;

server.listen(port, () => console.log(`\n ** api on port: ${port} ** \n`))