// implement your API here

const express = require('express')
let db = require('./data/db')

const app = express()

app.use(express.json())
app.use(cors())


//this is a request handler function. 
app.get('/api/', (req, res) => {
    console.log('ip: ', req.ip)
    res.status(200).json({ message: "Welcome to Node/Express!"})
})

//getting a list of all users.
app.get('/api/users', (req, res) => {
    db.find()
    .then(user => {
        res
            .status(200)
            .json(user)
    })
    .catch(() => {
        res
            .status(500)
            .json({errorMessage: "The users information could not be retrieved."})
    })
})

//getting a specific user by ID.
app.get('/api/users/:id', (req, res) => {
    db.findById(req.params.id)
    .then((user) => {
        user
        ? res
            .status(200)
            .json(user)
        : res
            .status(500)
            .json({ errorMessage: "The user information could not be retrieved." })
    })
    .catch((error) => {
        res
            .status(404)
            .json({ errorMessage: "The user with the specified ID does not exist" })
            console.log(error)
    })
})

//adding a new user to the database.
app.post('/api/users/', (req, res) => {
    if(!req.body.name || !req.body.bio) {
        return res
            .status(400)
            .json({ error: "Please provide name and bio for the user." })
    }

    const newUser = {
        name: req.body.name,
        bio: req.body.bio,
    }

    db.insert(newUser)
    ? res
        .status(201)
        .json(newUser)

    : res
        .status(500)
        .json({ errorMessage: "There was an error while saving the user to the database." })
})

app.put('/api/users/:id', (req, res) => {
    const userID = req.params.id
    const updatedUser = req.body

    !updatedUser.name && !updatedUser.bio
        //if there's no updated information in either the user's name or bio sections...
        ?  res
            .status(400)
            .json({ error: "Please provide name and bio for the user." })

            //if there IS updated information, we go ahead with the request.
        :  db.update(userID, updatedUser)
            .then((user) => {
                user
                ? res
                    .status(200)
                    .json(user)
                    
                    //if that user doesn't exist... 
                : res
                    .status(404)
                    .json({ errorMessage: "The user with the specified ID does not exist." })

            })

            //if the request fails for other reasons, we use a catch-all error.
            .catch(() => {
                res.status(500).json({ errorMessage: "The user information could not be modified."})
            })
    })

//deleting a user from the database.
app.delete('/api/users/:id', (req, res) => {
    //we're removing the user at this point.
   db.remove(req.params.id)
   .then((user) => {
    (user && user > 0)
        ? res
            .status(200)
            .json({ message: "The user has been deleted."})
        : res
            .status(404)
            .json({ error: "The user with the specified ID does not exist."})
   })
   .catch(() => {
       res
         .status(500)
         .json({ error: "The user could not be removed."})
   })
})

//updating a user's information on the database.

const port = 8080
const host = "127.0.0.1" //this is another way of saying localHost.

app.listen(port, host, () => {
    console.log(`server running at http://${host}:${port}`)
})
