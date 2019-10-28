// implement your API here
const express = require('express');
const cors = require('cors');
const db = require('./data/db');

const app = express();

app.use(cors());
app.use(express.json());


app.get('/api/users', getAllUsers)
app.get('/api/users/:id', getUser)
app.get('*', handleRequest)
app.post('*', handleRequest)
app.put('*', handleRequest)
app.delete('*', handleRequest)
app.patch('*', handleRequest)

function getAllUsers(req, res) {
    db.find()
        .then(data => {
            res.json(data)
        })
        .catch(error => {

            console.log(error)
        })
}

function getUser(req, res) {
    const id = req.params.id;
    db.findById(id)
        .then(data => {
            res.json(data)
        })
        .catch(error => {
            console.log(error)
        })
    console.log('id')
}

function handleRequest(req, res) {
    res.json('You have reached the end of the internet')    
}

app.listen(process.env.port || 7000, () => {
    console.log(`listening on port ${process.env.port || 7000}`);
})