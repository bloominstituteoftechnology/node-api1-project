const express = require('express')
const bodyParse = require('body-parser')
const cors = require('cors')
const shortId = require('shortid')
const port = 5000
const server = express()

server.use(bodyParse.json())

let users = [
    {
        name:'sam',
        bio:'thl',
        id:2
    }
]

server.get('/',(req,res)=>{
    res.status(200).json('getting it ')
})

server.post('/api/users' ,(req,res)=>{
    const {name,bio} = req.body
    if(name && bio){
        req.body.id = 1

        users.push(req.body)
        res.status(201).json(req.body)
    }else{
        res.status(400).json({errormessage:'Please provide name and Bio '})
    }

    if(users.includes(req.body) === false){
        res.status(500).json({errormessage:'there was a error saving to the database'})
    }

})

server.get('/api/users',(req,res)=>{
    if(users){
        res.status(200).json(users)

    }else{
        res.status(500).json({errormessage:'users cannot be found'})
    }
})

server.get('/api/users/:id',(req,res)=>{
    const find= users.find(f=>f.id == req.params.id)
    if(find){
        res.status(200).json(find)
    }else if(!users){
        res.status(500).json({errormessage:'The user info can not be recieved'})
    }
    else{
        res.status(400).json({errormessage:'cannot find that user'})
    }

})

server.delete('/api/users/:id',(req,res)=>{
    const filterOut = users.filter(f=>f.id !== req.params.id)
    const find= users.find(f=>f.id == req.params.id)
    if(find){
        users = filterOut
        res.status(200).json(users)
        console.log(filterOut)

    }else if(users.length === 0 ){
        res.status(500).json({errormessage:'user could not be removed'})
    }else{
        res.status(400).json({errormessage:'user with specified id can not be found '})
    }


})

server.put('/api/users/:id',(req,res)=>{
    const find= users.findIndex(f=>f.id == req.params.id)
    console.log(users)

    if(!req.body.name || !req.body.bio){
        res.status(400).json({errormessage:'please provide username and bio'})
    }else {
        if(find){
            users[find] = {...users[find],name:req.body.name,bio:req.body.bio}
                res.status(200).json(users[find])
        
            }else if (!users){
                res.status(500).json({errormessage:'user info can not be found'})
            }
            
            else{
                res.status(404).json({errormessage:'specific user can not be found'})
            }
    }


})


server.listen(port,()=>console.log('now listening on ' + port))