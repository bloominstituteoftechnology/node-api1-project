const express = require('express');

// create the server
const server = express();

// handles request to the root of api.
server.get('/users', (req, res) => {
   users = [
    { 
        id: '1', 
        name: 'Eric Anderson', 
        bio: 'FullStack Dev in Training' },
    { 
        id: '2', 
        name: 'Quadir Anderson', 
        bio: "Computer Technician FortNite Gamer"},
    { 
        id: '3', 
        name: 'Joi Rodriquez',
         bio: "Marine"},
    { 
        id: '4', 
        name: 'Xavier Anderson', 
        bio: "Marine" },
    { 
        id: '5', 
        name: 'OwlSpec3086', 
        bio: "Bug Hunter and Programmer" },
    { 
        id: '6', 
        name: 'Anthony Anderson', 
        bio: "College Student" },
  ];

  function getUsers() {
    return users;
  }

  function getUsersById(id) {
    return users.find((u) => u.id === id);
  }

  function createUser(data) {
    const payload = {
      id: String(users.length + 1),
      ...data,
    };
    users.push(payload);
    return payload;
  }

  function updateUser(id, data) {
    const index = users.findIndex((u) => u.id === id);
    users[index] = {
      ...users[index],
      ...data,
    };
    return user[index];
  }

  function deleteUser(id) {
    users = user.filter((u) => u.id != id);
  }

  module.exports = {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
  };

});
