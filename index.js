const express = require("express");
const app = express();
const shortid = require("shortid");

app.use(express.json());

var users = [{
    id: 1,
    fName: "John",
    lName: "Smith"
}];

app.get("/api/users", (req, res) => {
    res.json(users);
});

app.post("/api/users", (req, res) => {
    const userInfo = req.body;
    userInfo.id = shortid.generate();

    users.push(userInfo);

    res.status(201).json(userInfo);
});

app.get("/api/users/:id", (req, res) => {
    const {id} = req.params;

    let index = users.findIndex(user => user.id === id);

    if(index !== -1){
        res.status(200).json(users[index]);
    }
    else{
        res.status(404).json({message: "user not found"});
    }
});

app.put("/api/users/:id", (req, res) => {
    const {id} = req.params;
    const changes = req.body;

    let index = users.findIndex(user => user.id === id);

    if(index !== -1){
        users[index] = changes;
        res.status(200).json(users[index]);
    }else {
        res.status(404).json({message: "user id not found"});
    }
});

app.delete("/api/users/:id", (req, res) => {
    const {id} = req.params;

    const delUser = users.findIndex(user => user.id === id);

    if(delUser){
        users = users.filter(user => user.id !== id);
        res.status(200).json(delUser);
    }
    else {
        res.send(404).json({message: "user not found"});
    }
});

const port = 5000 || port.env.PORT
app.listen(port, () => {
    console.log("server listening on port : " + port);
});