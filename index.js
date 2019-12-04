// implement your API here
const express = require("express")
let db = require("./data/db.js")
const server = express()

//middleware
server.use(express.json())

server.get("/", (request, response) => {
    console.log("ip:", request.ip)

    response.json({ message: "we in here!" })
})

server.get("/api/users", (request, response) => {
    db.find().then(users => {
        response.status(200).json(users)
    }).catch(error => {
        response.status(500).json({ errorMessage: "The users information could not be retrieved." })
    })
})

server.listen(9000, () => console.log('the server is alive'))