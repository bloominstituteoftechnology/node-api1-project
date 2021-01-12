const shortid = require('shortid')

let users = [
  { id: shortid.generate(), name: 'Benaiah', bio: '2007 328xi' },
  { id: shortid.generate(), name: 'Ashanty', bio: 'none yet' }
]

module.exports = {
  findAll() {
    // SELECT * FROM users;
    return Promise.resolve(users)
  }, // findAll().then().catch()

  findById(id) {
    // SELECT * FROM users WHERE id = 1;
    const user = users.find(u => u.id === id)
    return Promise.resolve(user)
  },

  create({ name, bio }) {
    // INSERT INTO users (id, name, weight, adopter_id) VALUES ('xyz', 'Foo', 10, NULL);
    const newUser = { id: shortid.generate(), name, bio }
    users.push(newUser)
    return Promise.resolve(newUser)
  },

  update(id, changes) {
    // UPDATE users SET name = 'Foo', weight = 9, adopter_id = 'abc' WHERE id = 1;
    const user = users.find(user => user.id === id)
    if (!user) return Promise.resolve(null)

    const updatedUser = { ...changes, id }
    users = users.map(u => (u.id === id) ? updatedUser : u)
    return Promise.resolve(updatedUser)
  },

  delete(id) {
    // DELETE FROM users WHERE id = 1;
    const user = users.find(user => user.id === id)
    if (!user) return Promise.resolve(null)

    users = users.filter(u => u.id !== id)
    return Promise.resolve(user)
  }
}
