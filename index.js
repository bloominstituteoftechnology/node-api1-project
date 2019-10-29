// implement your API here
const express = require('express')
const cors = require('cors')

const db = require('./data/db')

const server = express()

server.use(express.json());
server.use(cors())

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
        if (!user){
            res.status(404).json({ message: "The user with the specified ID does not exist." })
        }else{
        res.status(201).json(user)}
    })
    .catch(err =>{
        res.status(500).json({ error: "The user information could not be retrieved." })
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
    .then(count=>{
        if(count){
        res.status(201).json({success:`the user with ID ${id} was deleted`})
        }else{
            res.status(404).json({ message: "The user with the specified ID does not exist." })
        }
    })
    .catch(err=>{
        console.log('error', err)
        res.status(500).json({ error: "The user could not be removed" })
    })
})

server.put('/api/users/:id', (req, res)=>{
    const id = req.params.id
    const updatedUser = req.body;
    console.log('hello',updatedUser.name&&updatedUser)
    if ('name' in updatedUser&& 'bio' in updatedUser)
    {db.update(id, updatedUser)
    .then((user)=>{
    console.log('user for update', user)
    if(user){
    res.status(201).json(updatedUser)
    
}else{
    res.status(404).json({ message: "The user with the specified ID does not exist." })
}
})
    .catch(err=>{
        res.status(500).json({ error: "The user information could not be modified." })
    })}else {res.status(404).json({ errorMessage: "Please provide name and bio for the user." })}
})



const port = 8000; // localhost:8000
server.listen(port, () => console.log('\n=== API on port 8000 ===\n'));