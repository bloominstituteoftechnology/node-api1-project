const express = require("express"); 
const shortid = require('shortid');
const server = express();
const port = 8000;
server.use(express.json())

server.get("/", (req, res) => {
    res.status(200).json({ hello: "Node 34" });
});
const idGenerator = shortid.generate()

const users = [
    
    {
        id: shortid.generate(),
        name: "Jane Doe", 
        bio: "Not Tarzan's Wife, another Jane",  
    },
    {
        id: shortid.generate(),
        name: "Mike Smith", 
        bio: "Not related to John Smith",  
    },
    {
        id: shortid.generate(),
        name: "Abdi Mohamud", 
        bio: "web 34 node js",  
    }
]

server.get('/users', async (req, res) => {
    try{const userlist = await users 
        return res.status(200).json(userlist)
    } catch (error) {
        console.log(error);
        res.status(500).json({error: 'this aint it chief!'})
    }
})
server.post("/users", (req, res) => {
    const data = req.body;
    users.push({id:shortid.generate(), ...data})
    res.status(201).json(users)

})
server.put("/users/:id", (req, res) => {
    const id = req.params.id
    const update = req.body;
    const match = users.find(user => user.id === id)
    if (match) {
        Object.assign(match, update)
        res.status(200).json(users)
    } else {
        res.status(404).json({message: "not found"})
    }
})
server.delete("/users/:id", (req, res) => {
    const id = req.params.id;

    const usersList = users.filter(user => user.id !== id);

    res.status(200).json( usersList );
});


server.listen(port, () => console.log("server running..."));














