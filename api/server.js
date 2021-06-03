// BUILD YOUR SERVER HERE
const express = require("express")
const User = require("./users/model.js") //Here we're importing in all those methods and the users
//const { destructured methods } = require("./model");
//We're importing over the body (i.e. the initalizeUsers array) which is stored in the variable users in model.js. So we're extracting and using 'users' here in our API calls
//instance of server
const server = express();

//instance of global middleware
server.use(express.json());

//ENDPOINTS
//SCHEMA
// {
//     id: "a_unique_id", // String, required
//     name: "Jane Doe",  // String, required
//     bio: "Having fun", // String, required
//   }
//TESTING




// [POST] /api/users (Create of CRUD, create a user)

server.post("/api/model", (req,res)=>{
    const newUser = req.body
    if(!newUser.name || !newUser.bio){
        res.status(400).json("Please provide name and bio for the user")
    }else{
        User.insert(newUser) //saves the new user the the database.
        .then(user=>{
            res.status(201).json(user)
        })
        .catch(err=>{
            res.status(500).json({message: "There was an error while saving the user to the database"})
        })
    }
});

//| GET    | /api/users     | Recieve of CRUD - Returns an array users.

server.get("/api/users", (req,res)=>{
    User.find()
        .then(user =>{
            console.log(user)
            res.status(200).json(user)
        })
        .catch(err=>{
            res.status(500).json({message: "The users information could not be retrieved"})
        })
});
//| GET    | /api/users/:id | Returns the user object with the specified `id`.  

server.get("/api/users/:id", (req,res)=>{
    const {idVar} = req.params
    User.findById(idVar)
        .then(user=>{
            if(!user){
                res.status(404).json({message:"Error, User Not Found"})
            }else{
                res.status(200).json(user)
            }  
        })
        .catch(err=>{
            res.status(500).json({message:"Error"})
        })
})

//| DELETE | /api/users/:id | Removes the user with the specified `id` and returns the deleted user.  
server.delete("/api/users/:id", async (req,res)=>{
    try{
        const {id} = req.params
        const deletedId = await User.remove(id)

        if(!deletedId){
            res.status(404).json({message:"User Not Found"})
        }else{
            res.status(200).json(deletedId)
        }
       
        
    }catch(err){
        res.status(500).json({message:"Error"})
    }
})

//| PUT    | /api/users/:id | Updates the user with the specified `id` using data from the `request body`. Returns the modified user |

server.put("/api/users/:id", async(req,res)=>{
    const {id} = req.params;
    const changes = req.body;
    try{
        if(!changes.name || !changes.bio){
            res.status(422).json({message: "Requires name and bio info"})
        }else{
            const updatedUser = await User.update(id, changes)
            if(!updatedUser){
                res.status(404).json({message:"User not found"})
            }else{
                res.status(200).json(updatedUser)
            }
        }
    }catch(err){
        res.status(500).json({message:"Error"})
    }
})

//CATCH ALL 
server.use("*",(req,res)=>{
    res.status(404).json({message: "Not Found"})
})


module.exports = server; // EXPORT YOUR SERVER instead of {}
