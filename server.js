const myExpress = require('express')
const Info = require('./data/db.js')

const myServer = myExpress();
myServer.listen(5000, () => console.log('listening on port 5000'))

myServer.use(myExpress.json())

//Create/Insert

myServer.post(`/users`, (req, res) => {
    const usersInfo = req.body

    Info.insert(usersInfo)
    .then(info => {
        res.status(201).json({success: true, info})
    })
    .catch(error => {
        res.status(500).json({success: false, error})
    })
})




//Read/Get

myServer.get(`/users`, (req, res) => {
    Info.find().then(info => {
        if(info) {
            res.status(200).json({success: true, info})
        } else {
            res.status(500).json({success: false, message:'user info not found'})
        }
    })
    .catch(error => {
        console.log(error)
        res.status(500).json({success: false, error})
    })

})


//Read/Get by ID


myServer.get(`/users/:id`, (req, res) => {
    const {id} = req.params;

    Info.findById(id)
    .then(info => {
        if (info) {
            res.status(200).json({success: true, info})
        } else {
            res.status(500).json({success: false, message: "id not found"})
        }
    })
})

//Put/Edit/Update

myServer.put(`/users/:id`, (req, res) => {
    const info = req.body;
    const {id} = req.params;

    Info.update(id, info)
    .then(edited => {
        if (edited) {
            res.status(201).json({success: true, edited})
        } else {
            res.status(404).json({success: false, message: 'id not found'})
        }
    })
    .catch(error => {
        res.status(500).json({success: false, error})
    })
})


//Delete/Remove

myServer.delete(`/users/:id`, (req, res) => {
    console.log(res)
    const {id} = req.params;

    Info.remove(id)
    .then(deleted => {
        if (deleted) {
        res.status(204).json();
        } else {
            res.status(404).json({success: false, message: 'id not found'})
        }
    })
    .catch(error => {
        console.log(error, 'Delete Error')
        res.status(500).json({success: false,  error})
    })
})