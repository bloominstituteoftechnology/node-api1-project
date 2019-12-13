// implement your API here
const express = require('express');
const app = express();
app.use(express.json());
const PORT = process.env.PORT ||8080;
const hostname = process.env.HOST || '0.0.0.0';
const db = require("./data/db");
// const dotenv = require("dotenv");
// dotenv.config();


app.get("/", (req,res) => {    
    res.status(200).json({
       "msg": "App is working now",
       PROJECT_DETAILS: process.env.PROJECT_DETAILS,
       SECRET_KEY: process.env.SECRET_KEY      
   });
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
});

// app.delete('/api/users/:id', (req,res) => {
//    const {id} = req.params;
//    db.findById(id)
//      .then( response => {
//          if(response.name) {
//             db.remove(id)
//                 .then(count => {
//          if(!count) res.status(404).json({ message: "The post with the specified ID does not exist." })
//          res.status(200).json({msg:`The user with Id ${id} deleted successfully`});
//      }) 
//      .catch(err => {
//          res.status(500).json({ error: "The post could not be removed" })
//      })
//          } else {
//             res.status(404).json({ message: `The user with the specified ID# ${id} does not exist.`});
//          }
//      })
//      .catch(err => {
//              res.status(500).json({errorMessage: "Could not find the user with server error"});
//      });
    
// });
app.delete("/api/users/:id", async (req,res) => {
     try {
        const user = await db.findById(req.params.id);
        if(!user.name) res.status(400).json({ errorMessage: `Please provide ${user.name} for the user.` });
        if(!user.bio) res.status(400).json({ errorMessage: `Please provide ${user.bio} for the user.` });

        await db.remove(req.params.id);
        res.status(200).json(user);
     } catch {
       res.status(500).json({error:"The user could not be removed."})
     }
})



// app.put('/api/users/:id', (req,res) => {
//     const id = req.params.id;
//     const user = req.body;
//     if(!user.name) res.status(400).json({ errorMessage: `Please provide ${user.name} for the user.` });
//     if(!user.bio) res.status(400).json({ errorMessage: `Please provide ${user.bio} for the user.` });
//     if(!id) res.status(400).json({errorMessage:`${id} missing for the user`});
//     db.findById(id)
//       .then( response => {
//          if(response.name&& response.bio) {
//             db.update(id, user)
//               .then( response =>{
//                  res.status(200).json(response);
//               })
//               .catch(err => {
//                  res.status(500).json({ errorMessage: `The user with id ${id} information could not be modified.` })
//               })
//          }
//       })
//       .catch( err => {
//           res.status(404).json({message: `The user with the specified ${id} does not exist.`});
//       })
// })

// app.put('/api/users/:id',(req,res) => {
//    const {id} = req.params;
//    const {name, bio} = req.body;
//    if(!name) res.status(400).json({ errorMessage: `Please provide ${user.name} for the user.` });
//    if(!bio) res.status(400).json({ errorMessage: `Please provide ${user.bio} for the user.` });
//    if(!id) res.status(400).json({errorMessage:`${id} missing for the user`});
//    db.findById(id)
//      .then( user => {
//         if(!user.name && !user.bio) res.status(404).json({message: `The user with the specified ${id} does not exist.`});
//         return db.update(id, {name,bio});
//      })
//      .then(() => db.findById(id))
//      .then(data => res.status(201).json(data))
//      .catch( err => res.status(500).json({ errorMessage: `The user with id ${id} information could not be modified.` }))

// })

app.put('/api/users/:id', async (req,res) => {
    const {name, bio} = req.body;
    try {
      const user = await db.findById(req.params.id);
      if( !user.name || !user.bio) res.status(400).json({ errorMessage: `Please provide ${user} for the user.` });
      await db.update(req.params.id, {name,bio});
      const updatedUser = await db.findById(req.params.id);
      res.status(201).json(updatedUser);

    } catch {
      res.status(500).json({ errorMessage: `The user with id ${id} information could not be modified.` })
    }
})

app.listen(PORT,hostname, () => {
   console.log(`app running at http://${hostname}:${PORT}`);
})
