const express = require('express');
let db = require('./data/db');

const app = express();
app.use(express.json());

const hostname = '127.0.0.1';
const port = 5001;

app.get('/api/users', (req, res) =>{
    console.log('remote:', req.ip)
    db.find()
        .then(users => {
            res.json(users);
        })
        .catch(err => {
            res.status(500).json({ error: 'No data found'})
        })
})

app.get('/api/users/:id', (req, res) =>{
    console.log('remote:', req.ip)
    db.findById(req.params.id)
        .then(users => {
            res.json(users);
        })
        .catch(err => {
            res.status(500).json({ error: 'No data found'})
        })
})

app.listen(port, hostname, ()=>{
    console.log(`Express Server running at http://${hostname}:${port}`);
})