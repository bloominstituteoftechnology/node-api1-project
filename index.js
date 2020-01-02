const express = require('express');
const cors = require('cors');
let db = require('./data/db');

const app = express();
app.use(express.json());
app.use(cors());

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

app.post('/api/users', (req, res) => {
    // console.log(req.body.name)
    if(!req.body.name || !req.body.bio){
        return res.status(400).json({ error: "Please provide name and bio for the user." })
    }
    const newUser = {
        // id: String(db.length+1),
        name: req.body.name,
        bio: req.body.bio
    }
    db.insert(newUser)
        .then(user =>{
            console.log('finding user', user, user.id)
            db.findById(user.id)
            .then(user => {
                if (!user){
                    res.status(404).json({
                        error: 'The specified ID does not exist.'
                    })
                }else {
                    res.status(201).json(user);
                }
            })
            .catch(() => {
                res.status(500).json({ error: 'The user information could not be retrieved.'})
            })
        })
        .catch(() => {
            res.status(500).json({ error: 'There was an error while saving the user to the database.'})
        })
        
})

app.delete('/api/users/:id', (req, res) =>{
    if(!req.params.id){
        return res.status(400).json({ error: 'User ID required'})
    }
    db.remove(req.params.id)
        .then(user => {
            if (!user){
                res.status(404).json({
                    error: 'The specified ID does not exist.'
                })
            }else {
                res.status(202).send(`User ${req.params.id} deleted successfully.`);
            }
        })
        .catch(() => {
            res.status(500).json({ error: 'The user information could not be removed.'})
        })
})

app.put('/api/users/:id', (req, res) =>{
    if(!req.body.name || !req.body.bio){
        return res.status(400).json({ error: "Please provide name and bio for the user." })
    }
    const updateUser = {
        name: req.body.name,
        bio: req.body.bio
    }
    console.log('updating', req.params.id, updateUser )
    db.update(req.params.id, updateUser)
        .then(user => {
            if (!user){
                res.status(404).json({
                    error: 'The specified ID does not exist.'
                })
            }else {
                res.status(200).send(`User ${req.params.id} updated successfully`);
            }
        })
        .catch(() => {
            res.status(500).json({ error: 'The user information could not be modified.'})
        })

})

app.listen(port, hostname, ()=>{
    console.log(`Express Server running at http://${hostname}:${port}`);
})