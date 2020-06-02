const express = require('express');

const server = express();

server.use(express.json())

let minions = [
    {
        id: 1,
  name: "Jane Doe", 
  bio: "Tarzan's Wife",  
    },
    {
        id:2,
        name:"Tarzan Doe",
        bio:"King of the Jungle"
    }
]

server.get('/api/', (req, res) => {
    res.send('This is ME!!!')
})

server.get('/api/minions', (req, res) => {
    if(!minions){
        res.status(500).json({errorMessage: "The minions information could not be retrieved."})
    } else{
         res.status(200).json(minions)
    }
   
})

server.get('/api/minions/:id', (req, res) => {
    const id = req.params.id;

    minions = minions.find(minos => minos.id === Number(id));

    if(!minions.id){
        res.status(404).json({ message: "The user with the specified ID does not exist."})
    } else {
         res.status(200).json(minions)
    }

   
})

server.post('/api/minions', (req, res) => {
    const minion = req.body;

    if(!minion.name || !minion.bio){
        res.status(400).json({errorMessage: "Please provide name and bio for the minion."})
    } else {
         minions.push(minion);
        res.status(201).json(minions)
    }

    res.status(500).json({errorMessage: "There was an error while saving the minion to the database"})
    
})

server.delete('/api/minions/:id', (req, res) => {
    const id = req.params.id;
    let idfound = false;
      
          for (i=0; i<users.length; i++){
              if (users[i].id == Number(id)){
                  idfound = true;
              }
          }

          if(idfound == true){

              try{
                   minions = minions.filter(minos => minos.id !== Number(id))
                   res.status(200).json(users);

              } catch {
                res.status(500).json({ errorMessage: "The minion could not be removed"})
              }           
          }

          else{
                      res.status(404).json({message: "The minion with the specified ID does not exist."})
                  }
})

server.put('/api/minions/:id', (req,res) => {
    if (req.body.name == undefined || req.body.bio == undefined){
        res.status(400).json({errorMessage: "Please provide name and bio for the minion."})
    }else{
    const id = req.params.id;
    let idfound = false;
    let idchange;
      for (i=0; i<minions.length; i++){
          if (minions[i].id == Number(id)){
              idfound = true;
              idchange = i;
              break;   
          }
      }

      if(idfound == true){
          try{
          minions[idchange].name = req.body.name;
          minions[idchange].bio= req.body.bio;
          res.status(200).json(minions);
          }catch{
              res.status(500).json({errorMessage: "The minion information could not be modified."})
          }
      }
      else{
          res.status(404).json({message: "The minion with the specified ID does not exist."})
      }
    }
  });



const port = 8000

server.listen(port, () => console.log(`\n == API on port ${port} == \n`))

  