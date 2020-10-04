const shortid = require("shortid");

let users = [
  {
    id: 1, // hint: use the shortid npm package to generate it
    name: "Mitchell Wright", // String, required
    bio: "Just a guy", // String, required
  },
  {
    id: 2, // hint: use the shortid npm package to generate it
    name: "Darrian Wright", // String, required
    bio: "Just a girl", // String, required
  },
];

function getUsers() {
  return users;
}

function getUserById(id) {
  return users.find((u) => u.id === id);
}

function createUser(data) {
  const payload = {
    id: shortid.generate(),
    ...data,
  };

  users.push(payload);
  return payload;
}

function updateUser(id, data) {
  //TODO update so that we find the user by ID
  const index = users.findIndex((u) => u.id === id);
  users[index] = {
    ...users[index],
    ...data,
  };

  return users[index];
}

function deleteUser(id) {
  users = users.filter((u) => u.id != id);
}

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
