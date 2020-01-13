console.log("Running");

const express = require("express");

const Hubs = require("./data/hubs-model.js");

const server = express();
const port = 8000;
server.use(express.json());

//get users
server.get("/api/users", (req, res) => {
    Hubs.find()
        .then(hub => {
            res.status(201).json(hub);
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({
                errorMessage: "ERROR RETURNING USER LIST"
            });
        });
});
//post users
server.post("/api/users", (req, res) => {
    const hubData = req.body;
    Hubs.add(hubData)
        .then(hub => {
            res.status(201).json(hub);
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({
                errorMessage: "ERROR ADDING USER"
            });
        });
});

server.get("/", function(req, res) {
    res.send({ hello: "Web 25!" });
});

//delete user
server.delete("/api/users/:id", (req, res) => {
    const id = req.params.id;

    Hubs.remove(id)
        .then(deleted => {
            // res.status(204).end();
            res.status(200).json(deleted);
        })
        .catch(error => {
            console.log(error);
            // handle the error
            res.status(500).json({
                errorMessage: "ERROR DELETING USER"
            });
        });
});

server.listen(port, () => console.log(`\n ** api on port: ${port} **\n`));