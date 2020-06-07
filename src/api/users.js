//  1:07:00 --- TIMESTAMP                    other timestamps:  // 1:11:00  ... 2:09:00

// imports -- require
const express = require ("express")
const db = require("./database")
const si = require('shortid');

// express to json
const server = express()
server.use(express.json())


// CRUD (create, read, update, delete) [.post, .get, .put/.patch, .delete]
server.post("/users", (req, res) => {
    if (!req.body.name) {
        return res.status(400)({
            message: "Need a name for the user",
        })
    }
    if (!req.body.bio) {
        return res.status(400)({
            message: "Need a bio for the user",
        })
    }
    const newUser = db.createUser({
        // id: db.getUsers().length + 1, //issues with possible duplicate IDs
        id: si.generate(),
        name: req.body.name,
        bio: req.body.bio,
    })

    res.status(201).json(newUser)
})

server.get("/users", (req, res) => {
    // res.json({ message: "Hello, WOW Players!" })
    const users = db.getUsers()
    res.json(users)
})

server.get("/users/:id", (req, res) => {
    const user = db.getUserById(req.params.id)

    if (user) {
        res.json(user)
    } else {
        res.status(404).json({
            message: "User could not be found within the database",
        })
    }
})

server.delete("/users/:id", (req, res) => {
    const removeUser = db.deleteUser(req.params.id)
    res.status(200).json(removeUser)
    return db.deleteUser(req.params.id)
})

server.put("/users/:id", (req, res) => {
    const changeUser = db.updateUser(req.params.id, {
        id: req.body.id,
        name: req.body.name,
        bio: req.body.bio,
    })
    res.json(changeUser)
})

// server must be listening somewhere on some port :
server.listen(8080, () => {
    console.log("WOW SERVER running on port 8080!")
})
// END OF STAMPS == & VIDEO




// OTHER STAMPS
/*  17:00 --- TIMESTAMP
const name = "Matthew"
console.log(`Hello, ${name}`)
*/



/*  50:50 --- TIMESTAMP
const http = require("http")

const server = http.createServer((req, res) => {
    res.statusCode = 200
    res.setHeader("Content-Type", "text/html")
    res.write("<h1>Hello, World of Warcraft!</h1>")
    res.end()
})
server.listen(8080, () => {
    console.log("server running on port 8080")
})
*/