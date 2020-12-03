let users = [
  { id: '1', name: 'Eric Anderson', bio: 'FullStack Dev in Training' },
  {
    id: '2',
    name: 'Quadir Anderson',
    bio: 'Computer Technician FortNite Gamer',
  },
  { id: '3', name: 'SGT Rodriquez', bio: 'Marine' },
  { id: '4', name: 'SSGT ROD', bio: 'Marine' },
  { id: '5', name: 'OwlSpec3086', bio: 'FullStack Web Dev Forex Trader' },
  { id: '6', name: 'Anthony Anderson', bio: 'College Student' },
];

function getUsers() {
  return users;
}

function getUserById(id) {
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
