const express = require("express")
const db = require("./database.js")

//creates isntance of express server
const server = express()

//this allows us to parse rew to JSON bodies
server.use(express.json())


//ShortId creates url-friendly unique ids
const shortid = require('shortid');
 


server.get("/", (req, res)=>{
    res.json({message: "Users Api Project"})
})

// When the client makes a GET request to /api/users:

// If there's an error in retrieving the users from the database:
// respond with HTTP status code 500.
// return the following JSON object: { errorMessage: "The users information could not be retrieved." }.

//get users
server.get("/api/users", (req, res) => {
    const users = db.getUsers()
    if (users) {
        res.json(users)
    }
    else {
        res.status(500).json({ 
            errorMessage: "The users information could not be retrieved." 
        })
    }
})

//post - create user

server.post("/api/users", (req, res) => {


    const newUser = db.createUser(
        {
            id: req.body.id,
            name: req.body.name,
            bio: req.body.bio
        }
    )
    if(!req.body.name ||!req.body.bio) {
    res.status(400).json({
        errorMessage: "Please provide name and bio for the user.",
    })
}
  if (newUser) {
      res.status(201).json(newUser)
  } else {
      res.status(500).json({
          errorMessage: "There was an error while saving the user"
      })
  }
})

//get user by id
server.get("/api/users/:id", async (req, res) => {
    const userId = await db.getUserById(req.params.id);
    console.log("userID", userId);
  
  
    if (!userId) {
      console.log("User ID error");
      return res.status(404).json({
        message: `The user with id ${req.params.id} does not exist.`
      });
    }
    try {
        res.status(200).json(userId);
      } catch (error) {
        res.status(500).json({
          err,
          errorMessage: "The user information could not be retrieved."
        });
      }
    });


    // put - update user by ID
server.put("/api/users/:id", async (req, res) => {
    const { id } = req.params;
    const { name, bio } = req.body;
    console.log("id:", id);
    console.log("name: ", name);
    console.log("bio: ", bio);
   
    if (!id) {
      return res
        .status(404)
        .json({ message: `The user with id ${req.params.id} does not exist.` });
    } else if (!name || !bio) {
      return res
        .status(400)
        .json({ errorMessage: "Please provide name and bio for the user." });
    }
  
    try {
      if (id) {
        await db.updateUser(id, { name, bio });
        const updatedUser = await db.getUserById(id);
        return res.status(200).json(updatedUser);
      }
    } catch (error) { 
         status(500)
        .json({ errorMessage: "The user information could not be modified." });
    }
  });

  server.delete('/api/users/:id', (req, res) => {
    const user = db.getUserById(req.params.id)

    if (user) {
        db.deleteUser(user);
    } if (!user) {
        res.status(404).json({
            message: "The user does not exist"
        })
    } else {
        res.status(500).json({
            message: "There was an error deleting the user"
        })
    }
})


server.listen(8080, () => {
    console.log("server started")
})





