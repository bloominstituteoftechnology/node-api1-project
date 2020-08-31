let users = [
  {
    "id": "1", // hint: use the short"id" npm package to generate it
    "name": "Bob Doe", // String, required
    "bio": "Not Tarzan's Wife, another Jane", // String, required
  },
  {
    "id": "2", // hint: use the short"id" npm package to generate it
    "name": "Jane Gorilla", // String, required
    "bio": "Not Tarzan's Wife, another Jane", // String, required
  },
  {
    "id": "3", // hint: use the shortid npm package to generate it
    "name": "Jane Doe", // String, required
    "bio": "Tarzan's Wife, another Jane", // String, required
  },
];

function getUsers() {
  return users
}

function getUsersById(id) {
  return users.find((u) => u.id === id);
}

function createUsers(data) {
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
  return users[index];
}

function deleteUser(id) {
  users = users.filter((u) => u.id !== id);
  if(users.find(u=> u.id === id)){
    return res.status(500).json()
  }
}

module.exports = {getUsers, getUsersById, createUsers, updateUser, deleteUser}