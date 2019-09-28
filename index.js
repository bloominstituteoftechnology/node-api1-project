// implement your API here
//require express
const express = require('express');

const db = require('./data/db.js')

//create the server
const server = express();


//middleware to parse the body to be avaliable on req
//needed for any request that uses req.body
server.use(express.json())


//Request Handlers


//GET
server.get('/api', (req, res) => {//res-outgoing    req-incoming
    res.send('Welcome to my server!!!!');
  });

//GET USERS
server.get('/api/users', (req, res) => {
    //take the find method inside of the db file and use it
    db.find()
//data acces helpers are asynchronus functions, work with promisees
    //then with the results
    .then(users => {
        //if successful send a status code of 200 and 
        //a json object containing users-express will turn it into json
        res.json(users);
    })

    
  });



  //GET BY ID
  server.get('/api/users/:id', (req, res) => {
    db.findById(req.params.id)
      .then(user => {
           //console.log to see what you are getting back
      //the console.log results will not be in the broswer it will be in the
      //terminal
      console.log(user)
        if (user) {res.json({success: true, user,});
                  } else {res.status(404).json({
                    success: false, message: 'TRY AGAIN THAT USER DOES NOT EXIST',});
                         }
    })
      //status method is a express method tht is built on to response
        //if the status is anything other than 200 we need to include a status method
    .catch(err => {
        res.status(500).json({
          success: false, err,});
    });
  });



  //ADD USER
  server.post('/api/users', (req, res) => {
    //before we can use the add function we need
    //to get the infomation that is being sent from the frontend
    //the front sends a new user and it can be found at req.body
    //req.body is not automatically defined we need to use a middleware
    //refer to server.use(json) at top of file
    //save the object in a variable
    const userData = req.body;
  
    //pass the variable into the add function
    db.insert(userData)
    
    //then take the user and send it back to the client
      .then(user => {
        if(user) {
        res.status(201).json({ success: true, user });
      
    }else if(userData != req.params.name || userData != req.params.bio) {
      res.status(400).json({
        success: false,
        errorMessage: "Please provide name and bio for the user."
    })
  }
})
      .catch(err => {
        res.status(500).json({
          success: false,
          err,
        });
      });
  });


//DELETE USER
  server.delete('/api/users/:id', (req, res) => {
    //pull the id off of req.params
    //destructering
    const { id } = req.params;
              //or
   // const id = req.pramas;
  //pass in the id to the remove function
    db.remove(id)
    //then take the deleted user 
      .then(deletedUser=> {
        if (deletedUser) {
//if the user is deleted
          res.json({
            message: 'USER HAS BEEN DELETED',
          });
//if id entered id not there then
        } else {
          res.status(404).json({
            success: false,
            message: 'TRY AGAIN THAT USER DOES NOT EXIST',
          });
        }
      })
      .catch(err => {
        res.status(500).json({
          success: false,
          message,
        });
      });
  });



//PUT/UPDATE
server.put('/api/users/:id', (req, res) => {
  const { id } = req.params;
  const changes = req.body;

  db.update(id, changes)
    .then(updatedUser => {
      if (updatedUser) {
        res.status(200).json({ success: true, updatedUser });
      } else {
        res.status(404).json({
          success: false,
          message: 'TRY AGAIN THAT USER DOES NOT EXIST',
        });
      }
    })
    .catch(err => {
      res.status(500).json({
        success: false,
        err,
      });
    });
});






//this should be your last step it tells the server to 
//listen on port 4000 and 
//console logs a message to tell us what port it is on
server.listen(4000, () => {
    console.log('\n*** Server Running on http://localhost:4000 ***\n');
  });