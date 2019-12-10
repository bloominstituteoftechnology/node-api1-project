// implement your API here

const express = require('express')
let db = require('./data/db')

const app = express()

app.use(express.json())

// GET is read data
app.get('/api', (req, res) => {
    console.log('ip:', req.ip)
    res.json({ message: 'Welcome to Node Express!' })
})

app.get('/api/users', (req, res) => {
    db.find()
    .then(users => {
       res.json(users)
    })
        .catch( err => {
            res.status(500).json({ message: "The users information could not be retrieved." })
        })
})

app.get('/api/users/:id', (req, res) => {
    db.findById(req.params.id)
    .then(data => {
        if (data) {
         res.json(data)
    } else {
            res.status(404).json({ message: "The user with the specified ID does not exist." })
    }
})
    .catch(err => {
        res.status(500).json({ error: "The users information could not be retrieved."})
    })

// POST, create data/user
app.post('/api/users', (req, res) => {
    const { name, bio } = req.body
    if (!name || !bio) {
        return res.status(400).json({ errorMessage: "Please provide name and bio for the user." })
    }
    
    db.insert({ name, bio })
    .then(data => {
        res.status(201).json(data)
    })
    .catch(err => {
        res.status(500).json({ error: "There was an error while saving the user to the database" })
    })
})
    
// PUT update data/user
    app.put('/api/users/:id', (req, res) => {
     const{ name, bio } = req.body
        if (!name || !bio) {
            return res.status(400).json({ error: "Please provide name and bio for the user" })
        }
        // findById; make sure the resource exists before we look for it. 
        db.findById(req.params.id)
        .then(user => {
            if (user) {
                return db.update(req.params.id, { name, bio })
            }
            res.status(404).json({ error: "The user with the specified ID does not exist" })
        }) 
            .then(() => db.findById(req.params.id))
            .then(data => res.json(data))
            .catch(err => {
                res.status(500).json({ error: "The user information could not be modified" })
            })
    })
// DELETE data
app.delete('/api/users/:id', (req,res) => {
    db.findById(req.params.id)
    .then(user => {
        if(user) {
            return db.remove(req.params.id)
        }
        res.status(404).json({ error: "The user with the specified ID does not exist" })
    })
    //.then(data => res.json(data))
    .then(() => res.status(204).end())
    .catch(err => {
        res.status(500).json ({ error: "The user could not be removed" })
    })
})

const port = 5000
const host = '127.0.0.1'

app.listen(port, host, () => {
    console.log(`Server running at http://${host}:${port}`)
})

})

//##############Notes from Jason's Lecture########################

// for .put with ASYNC/AWAIT 
// try {
//     const user = await db.findById(req.params.id)
//     if (!user) {
//         return res.status(404).json({ error: "The user with specified ID does not exist."})
//     }

//     await db.update(req.params.id, { name, bio })
//     res.json(await db.findById(req.params.id))
// } catch(err) {
//     res.status(500).json({ error: "The user information could not be modified" })
// }


// for .delete ASYNC/AWAIT
//     try {
//         const user = await db.findById(req.params.id)
//         if (!user) {
//             return res.status(404).json({ error: "The user with the specified ID does not exist" })
//         }
//     }
//         await db.remove(req.params.id)
//         res.json(user)
// } catch (err) {
//     res.status(500.json({ error: "The user could not be removed" }))
// }

