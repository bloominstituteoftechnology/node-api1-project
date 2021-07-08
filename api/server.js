// BUILD YOUR SERVER HERE
const express = require('express');
const User = require ('./users/model');

const server = express();

//Global middleware
server.use(express.json());

//[GET] /api/users (fetch all users)
server.get('api/users', async (req, res) => {
    const users = await User.find();
    if (!users) {
        return res.status(500).json({
            message: "The users information could not be retrieved",
        });
    }
    res.json(users);
})

//[GET] /api/users/:id (fetch user by id)
server.get('api/users/:id', async (req, res) => {
    const { id } = req.params;
    const user = await User.findById(id);
    if(!user) {
        return res.status(404).json({
            message: "The user with the specified ID does not exist",
        })
    }
    res.json(user);

});

//[POST] /api/users (create new user)
server.post('api/users', async (req, res) => {
    if (!req.body.name || !req.body.bio) {
        return res.status(400).json({
          message: "Please provide name and bio for the user",
        });
      }

      const data = req.body;
      const newUser = await User.insert(data);

      if (!newUser) {
        return res.status(500).json({
          message: "There was an error while saving the user to the database",
        });
      }
      res.status(201).json(newUser);
});

//[DELETE] /api/users/:id (delete user)
server.delete('api/users/:id', async (req, res) => {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user) {
        return res.status(404).json({
            message: "The user with the specified ID does not exist"
        })
    }
    const deletedUser = await User.remove(id);
    if (!deletedUser) {
      return res.status(500).json({
        message: "The user could not be removed",
      });
    }
    res.status(200).json(deletedUser);
})

//[PUT] /api/users/:id (updates user)
server.put('api/users/:id', async (req, res) => {
    const { id } = req.params;
    const data = req.body;
    if (!data.name || !data.bio) {
        return res.status(400).json({
            message: "Please provide name and bio for the user",
    });
    }
    await User.update(id, data)
        .then((updatedUser) => {
         if (updatedUser) {
            res.status(200).json(updatedUser);
         } else {
         res.status(404).json({
            message: "The user with the specified ID does not exist",
        });
      }
    })
    .catch(() => {
      res.status(500).json({
        message: "The user information could not be modified",
      });
    });
})

module.exports = server; // EXPORT YOUR SERVER instead of {}
