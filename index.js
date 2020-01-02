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
            if (!users){
                res.status(404).json({
                    error: 'The database does not exist.'
                })
            }else {
                res.json(users);
            }
        })
        .catch(err => {
            res.status(500).json({ error: 'The users information could not be retrieved.'})
        })
})

app.get('/api/users/:id', (req, res) =>{
    console.log('remote:', req.ip)
    db.findById(req.params.id)
        .then(user => {
            if (!user){
                res.status(404).json({
                    error: 'The specified ID does not exist.'
                })
            }else {
                res.json(user);
            }
        })
        .catch(() => {
            res.status(500).json({ error: 'The user information could not be retrieved.'})
        })
})

app.listen(port, hostname, ()=>{
    console.log(`Express Server running at http://${hostname}:${port}`);
})