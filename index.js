const express = require('express')
const server = express()

server.use(express.json())

let users = [
    {
        id: new Date(),
        name: "John Frum",
        bio: "Destined to come through for you."
    },
    {
        id: new Date(),
        name: "Baba Yaga",
        bio: "Hails from Russia, takes her vodka cold."
    },
    {
        id: new Date(),
        name: "Prestor John",
        bio: "Wisest man in Ethiopia, and the competition is pretty stiff over there."
    },
]

server.get('/api/users', (req, res) => {
    res.status(200).json({data: users})
})

const port = 8000
server.listen(port, () => console.log("Server prime, online"))