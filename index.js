const express = require('express'); // import the express package
const shortid = require("shortid");
const uuid = require('uuid');

const app = express(); // creates the server
app.use(express.json()); // response in a json body ***


let Users = [
    {
        id: "a_unique_id", // hint: use the shortid npm package to generate it
        name: "Jane Doe", // String, required
        bio: "Not Tarzan's Wife, another Jane",  // String, required
    }
]

// handle requests to the root of the api, the / route
app.get('/', (req, res) => {
    res.send('Hello from Express');
  });
  
//Gets All Users
app.get('/api/Users',( req, res ) => res.json(Users) );

//Create a User
app.post('/api/Users',( req, res ) => {
    const userInfo = req.body   
    const newMember = {
        id: uuid.v4(),
        name: userInfo.name,
        bio: userInfo.bio
      }
      
      Users.push(newMember);

      if(!userInfo.name || !userInfo.bio){
        return res.status(400).json({ errorMessage: "Please provide name and bio for the user."})
      }else{
        res.status(201).json(userInfo)
      }
      
     
      
})

//Get Single User
//req.params.id ---> returns a string not a number.
// id = " string "
app.get('/api/Users/:id',( req, res ) => {
    const {id} = req.params 
    const found = Users.find(members => members.id === id);

     if(found){
         res.status(200).json(found)
        // res.json(Users.filter( user => user.id === parseInt(id)));
     }else{
         res.status(404).json({message:`No users with the id of ${id}`})
     }
    
});

//Update a Member
app.put('/api/Users/:id',( req, res ) => {
    const {id} = req.params 
    const found = Users.some(members => members.id === id);

     if(found){
        const upMember = req.body;
        Users.forEach( member => {
            if(member.id === id ) {
                member.name = upMember.name ? upMember.name: member.name;
                member.bio = upMember.bio ? upMember.bio: member.bio;

                res.status(200).json({ msg: 'Member updated', member})
            }
        });
     }else{
         res.status(404).json({message:`No members with the id of ${id}`})
     }
    
});
  

//Delete Member
app.delete('/api/Users/:id',( req, res ) => {
    const {id} = req.params 
    const found = Users.some(members => members.id === id);

     if(found){
        res.json({
          msg:'Member deleted',
          members: Users.filter( member => member.id === id)
        });
     }else{
         res.status(404).json({message:`No members with the id of ${id}`})
     }
    
});
  
  
  
  
  
  
  
  
  
  
  
  // watch for connections on port 5000
const PORT = 3000;

app.listen(PORT,() => {
    console.log(`listing on http://localhost:${PORT}`)
});