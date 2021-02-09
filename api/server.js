const express = require("express");
const model = require("./users/model");
const app = express();
app.use(express.json());
module.exports = app; // EXPORT YOUR SERVER instead of {}

// BUILD YOUR SERVER HERE
app.get("/api/users", (req, res) => {
  model
    .find()
    .then((users) => {
        console.log(users);
      res.status(200).json(users);
    })
    .catch((err) => {
        console.log(err);
      res.status(500).json({
        message: `${err}`,
      });
    });
});

app.post("/api/users", (req, res) => {
  const { name, bio } = req.body;
  if (!name || !bio) {
    res
      .status(400)
      .json({ message: "Please provide name and bio for the user" });
  } else {
    model.insert({name, bio}).then((newUser) => {
        console.log(newUser)
      res.status(201).json(newUser);
    })
    .catch(err => {
        res.status(500).json({message: "There was an error while saving the user to the database"})
    });
  }
});

//findById
app.get('/api/users/:id', (req, res) => {
    const idVar = req.params.id; 
        model.findById(idVar)
        .then((user)=> {
            if(!user){
                res.status(404).json({message:'the user with the specified ID does not exist'})
            } else {
            res.status(200).json(user)
        }
        })
        .catch(err => {
            res.status(500).json({message: "The user information could not be retrieved"})
        })
})

//remove
app.delete('/api/users/:id', (req, res) => {
    const idVar = req.params.id; 

    model.remove(idVar)
    .then(user => {
        if(!user){
            res.status(404).json({message: "The user with the specified ID does not exist"})
        } else{
            res.status(200).json(user)
        }
    })
    .catch( err => {
        res.status(500).json({message: 'User could not be removed'})
    })
})

//update
app.put('/api/users/:id', (req, res) => {
    const idVar = req.params.id;
    const { name, bio } = req.body;
    if (!name || !bio){
        res.status(400).json({message: "Please provide name and bio for the user"})
    } else {
        model.update(idVar)
        .then(user => {
           if (!user){
               res.status(404).json({message:'The user with the specified ID does not exist'})
           } else{
               res.status(200).json(user)
           }
        })
        .catch(err => {
            res.status(500).json({message: `${err}. The user information could not be modified`})
        })
    }
    })


app.use("*", (req, res) => {
  res.status(404).json({ message: "404 not found :'(" });
});
