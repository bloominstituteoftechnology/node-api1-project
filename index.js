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
    //working!
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
    if (userInfo.name!==null& userInfo.bio!==null){
    db.insert(userInfo)
    .then(user=>{
        res.status(201).json(userInfo)
    })
    .catch(err=>{
        res.status(500).json({ error: "There was an error while saving the user to the database" })
        
    })
}else{
    res.status(400).json({ errorMessage: "Please provide name and bio for the user." })
}

})

server.delete('/api/user/:id', (req, res)=>{
    const id = req.params.id
    db.remove(id)
    .then(user=>{
        console.log(user,id)
        res.status(201).json({success:`the user with ID ${id} was deleted`})
    })
    .catch(err=>{
        console.log('error', err)
        res.status(500).json({error: 'failed to delete'})
    })
})

server.put('/api/user/:id', (req, res)=>{
    const id = req.params.id
    const updatedUser = req.body;
    console.log('updated user',updatedUser)
    db.update(id, updatedUser)
    .then(()=>res.status(201).json({success: 'user updated'}))
    .catch(err=>{
        res.status(500).json({error: 'user update unsuccessful'})    })
})



const port = 8000; // localhost:8000
server.listen(port, () => console.log('\n=== API on port 8000 ===\n'));