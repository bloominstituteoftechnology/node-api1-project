const express=require('express');
const dB=require('./dataBase')
const port=8000;
const server=express();
server.use(express.json());

server.get('/',(req,res)=>{
    res.send('im working')
})

server.get('/api/users',(req,res)=>{
    const users = dB.getUsers()
    if (users){return res.status(200).json(users)}
    else{return res.status(500).json({
        errorMessage: "The users information could not be retrieved."
    })}
})

server.get('/api/users/:id',(req,res)=>{
    const id=req.params.id;
    const user=dB.getUserById(id)
    if(user){
    res.status(200).json(user);}
    if(!user){ res.status(404).json({
        message: "The user with the specified ID does not exist."})}
    else{res.status(500).json({
        errorMessage: "The user information could not be retrieved."
    })}
})

server.post('/api/users',(req,res)=>{    
    const newUser=dB.createUser({name: req.body.name});
    
    if (!req.body.name || !req.body.bio){
        res.status(400).json({
            errorMessage:"Please provide name and bio for the user.",
        })
    }
    else if(newUser){res.status(201).json(newUser)}
    else{
        res.status(500).json({
            errorMessage:"There was an error while saving the user to the database"
        })
    }

    
})

server.put('/api/users/:id',(req,res)=>{
    // const id=req.params.id;    
    const user=dB.getUserById(req.params.id);
    
    if(!req.body.name || !req.body.bio){
        res.status(400).json({
            errorMessage:"Please provide name and bio for the user.",
        })
    }
    else if (user){
        const updatedUser=dB.updateUser(user.id,{
            name:req.body.name || user.name  
        });
        res.status(200).json(updatedUser);
    }
    else if (!user){
        res.status(404).json({
            message: "The user with the specified ID does not exist."
        })
    }
    else{res.status(500).json({
        errorMessage: "The user information could not be modified."
    })}
  
})

server.delete('/api/users/:id',(req,res)=>{
    const user=dB.getUserById(req.params.id);
    if(!user){
        res.status(404).json({
            message: "The user with the specified ID does not exist."
        })
    }
    else if (user){    
        dB.deleteUser(user.id);
        res.sendStatus(204).end();
        }
    else{res.sendStatus(500).json(
        {errorMessage: "The user could not be removed"})
    }


})

server.listen(port,()=>{
    console.log(`server running on http://localhost:${port}`)
})