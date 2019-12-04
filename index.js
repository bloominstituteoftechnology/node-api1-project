// implement your API here
const express = require('express');
const app = express();
app.use(express.json());
const PORT = 8080;
const hostname = '127.0.0.1';
const db = require("./data/db");


app.get("/", (req,res) => {
     console.log('woring',db)
    res.status(200).json({"msg": "App is working now"});
});

app.get("/api/users", (req,res) => {
    db.find()
      .then( response => {
         if(response) {
            res.status(200).json(response);
         } else {
            res.status(404).json({msg:"Users Not Found"})
         }
      })
      .catch( err => {
          res.status(500).json({ errorMessage: "The users information could not be retrieved." });
      })
});

app.get('/api/users/:id', (req,res) => {
      const {id} = req.params;
      db.findById(id)
        .then(response => {
             console.log('Line 33', response)
            if(response.name) {
              res.status(200).json(response);
            } else {
              res.status(400).json({ message: `The user with the specified ${id} does not exist.` });
            }
        })
        .catch(err => {
              res.status(500).json({ errorMessage: `The user with ${id} information could not be retrieved.` })
      })
})

app.post('/api/users', (req,res) => {
     const user = req.body; 
     console.log(user);
     if(!user.name || !user.bio) res.status(400).json({ errorMessage: "Please provide name and bio for the user." });     
     db.insert(user)
       .then( response => {
           if(response) {
              console.log(response);
              res.status(201).json(response);
           } else {
              res.status(403).json({msg:'You are not authorized to add user'});
           }
       })
       .catch( err => {
             res.status(500).json({ errorMessage: "There was an error while saving the user to the database" });
       })
})

app.listen(PORT,hostname, () => {
   console.log(`app running at http://${hostname}:${PORT}`);
})
