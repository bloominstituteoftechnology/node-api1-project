// implement your API here
const express = require('express')

const db = require('./data/db')

const server = express()

server.use(express.json());

console.log('hello')

//object format 
// name
// bio
// created_at
// updated_at


server.get('/', (req, res)=>{
    res.send('testing 123')
})

server.get('/api/users', (req, res)=>{
    db.find()
    .then(user=>{
        res.status(201).json(user)
    })
    .catch(err =>{
        res.status(500).json({error: 'could not retrieve anyone from the database'})
    })
})

server.get('/api/users/:id', (req, res)=>{
    const id = req.params.id 
    db.findById(id)
    .then(user=>{
        res.status(201).json(user)
    })
    .catch(err =>{
        res.status(500).json({error: 'could not retrieve anyone from the database'})
    })
})


server.post('/api/users', (req, res)=>{
    const userInfo = req.body;
    console.log(userInfo)
    db.insert(userInfo)
    .then(user=>{
        res.status(201).json(user)
    })
    .catch(err=>{
        res.status(500).json({error:"Failed to add user to the database"})
        
    })

})

server.post('/api/user', (req, res)=>{

})


const port = 8000; // localhost:8000
server.listen(port, () => console.log('\n=== API on port 8000 ===\n'));