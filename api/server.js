// BUILD YOUR SERVER HERE
const express = require('express');
const router = express.Router();
const { find,
  findById,
  insert,
  update,
  remove} = require('./users/model');

router.get('/', async (req, res) => {
  try {
    const users = await find();
    res.json(users);
  } catch (error) {
    console.log(error);
    res.status(500).json({message: "The users information could not be retrieved"})
  }
})

router.get('/:id', async (req, res)=> {
  try {
      const user = await findById(req.params.id);
      if(!user){
        res.status(404).json({message: "The user with the specified ID does not exist"});
      } else {
        res.json(user);
      }
  } catch (error) {
    console.log(error);
    res.status(500).json({message: "The user informatino could not be retrieved"})
  }
})

router.post('/', async (req, res) => {
  try {
      const user = req.body;
      const {name, bio} = user;
      if(name === undefined || bio === undefined){
        res.status(400).json({message: "Please provide name and bio for the user"})
      }
      if(user){
         await insert(user);
         res.status(201).send("New user added successfully");
      }
  } catch (error) {
    console.log(error);
    res.status(500).json({message: "There was an error while saving the user to the database"})
  }
})

router.put('/:id', async (req, res) => {
try {
    const user = await findById(req.params.id);
    const {name, bio} = req.body;
    console.log('Username: ', name);
    console.log('Bio: ', bio);
    if(name === undefined || bio === undefined){
      res.status(400).json({message: "Please provide name and bio for the user"})
    }
    if(user){
        const updatedUser = Object.assign(user, req.body)
        const updated = await update(req.params.id, updatedUser);
        res.json(updated);
    } else {
      res.status(404).json({"message":"The user with the specified ID does not exist"})
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({"message": "The user information could not be modified"})
  }
})

router.delete('/:id', async (req, res) => {
try {
    const {id} = req.params;
    const user = await findById(id);
    if(user){
        const deleted = await remove(id);
        res.json(deleted);
    } else {
      res.status(404).json({message: 'The user with the specified ID does not exist'});
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({message: 'The user could not be removed'})
  }
})

module.exports = router; // EXPORT YOUR SERVER instead of {}
