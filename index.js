// implement your API here

//imports
const express = require('express');
const cors = require('cors');
const PORT = 5025;
const hostname ='127.0.0.1';

const { find, findById, insert, update, remove} = require ('./data/db');

// express app

const app = express()

// extra functionality we need to be able to read req.body
app.use(express.json())

//enable cors

app.use(cors())


app.get('/', (req, res) => {
    res.status(200).json( "App runs");
});

app.get('/api/users', (req, res) => {
    find()
        .then(users => {
            
            res.status(200).json(users)
        })
        .catch(error => {
            res.status(500).json({
                message: error.message,
                stack: error.stack,
            })
        })
});

app.delete('/api/users/:id', (req, res) => {
    const {id} = req.params;
    remove(id)
        .then(data => {
            if(data) {
                res.status(202).json(`user with id ${id} got deleted`)
            } else {
                res.status(404).json( `The user with the specified id ${id} does not exist.`)
            }
        })
        .catch(error => {
            console.log(error.message)
        })

});

app.post('/api/users', (req, res) => {
    
    const {name, bio} = req.body;
    console.log(req.body);

    if(!name || !bio) {
        res
            .status(400)
            .json( "Please provide name and bio for the user.");
    } else {
    insert(req.body)
        .then( users => {
            res.status(201).json(users)
    })
        .catch(error => {
            res.status(500).json("There was an error while saving the user to the database", error);
        })
}
});

app.listen(PORT, hostname, () => {
    console.log(`App running http://${hostname}:${PORT}`)
})

