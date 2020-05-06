const express = require("express");

const server = express();

server.use(express.json());

let hubs = []
let lessons = []

server.get('/', (req, res) => {
    res.json({
        message: "World hello!"
    })
})

server.post('/api/hubs', (req, res) => {
    hubs.push({...req.body, id: hubs.length })
    res.status(201).send({ hubs })
})

server.get('/api/hubs', (req, res) => {
    res.status(200).json(hubs);
})

server.delete('/api/hubs/:id', (req, res) => {
    hubs = hubs.filter(hub => hub.id !== parseInt(req.params.id))
    res.status(201).json(hubs);
})

server.patch('/api/hubs/:id', (req, res) => {
    let editedIndex = -1;

    hubs = hubs.map((hub, i) => {
        if (hub.id === parseInt(req.params.id)) {
            hub.hubName = req.body.hubName
            editedIndex = i
            return hub
        }
        return hub
    })
    if (editedIndex > -1) {
        res.status(201).json(hubs[editedIndex])
        return 
    }
    res.status(404).json(" not found")

})

const PORT = 5000;

server.listen(PORT, () => {
    console.log('Listening to port ' + PORT);
})