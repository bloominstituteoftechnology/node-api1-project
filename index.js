const express = require('express')
const shortid = require('shortid')

const server = express()

const PORT = 5000;
server.listen(PORT, () => 
console.log(`\n ** API listening on http://localhost:${PORT} **\n`));

let users =[{
    id: '',
    name: '',
    bio: ''
}];
server.use(express.json());

server.post('api/users', (req, res) => {
    const userInfo = req.body
    userInfo.id = shortid.generate();
    const pushOut = () => userInfo.push(userInfo.id, userINfo.name);
    if (!userInfo.name == res.name || !userInfo.bio == res.bio){
        res.status(500).json({ errorMessage: ' The users information could not be retrieved '})
    } else {
        pushOut();
        res.status(201).json(users)
    }
})

server.get('/api/users', (req, res) => {
    if(!userInfo){
        res.status(500).json({ errorMessage: "The users information could not be retrieved." })
    }
    else {
        res.status(200).json({ errorMessage: "GET SUCCESS!"})
    }
})