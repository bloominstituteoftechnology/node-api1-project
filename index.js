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
app.listen(PORT,hostname, () => {
   console.log(`app running at http://${hostname}:${PORT}`);
})
