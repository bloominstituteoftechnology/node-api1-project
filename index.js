
const express = require('express')
const shortid = require('shortid')

const server = express()
server.use(express.json())


let users = [
    {   id: shortid.generate(),
        name: 'Paul',
        bio: 'Hello Earthlings'
    }
]

const User = {
    getAll(){
        return users
    }
}

// endpoints for users
server.get('/api/users', (req,res) => {
    const users = User.getAll()
    res.status(200).json(users)
    if (!users){
        return res.status(500).json({ errorMessage: "There was an error" })
    }
})




// catch-all endpoint
server.use('*', (req, res) => {
    res.status(400).json({ message: 'not found'})
})

// start the server
server.listen(5000, () => {
    console.log('server working on port 5000 :)')
})



