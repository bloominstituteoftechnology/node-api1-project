const shortid = require("shortid");

let users = [
  { id: shortid.generate(), name: "Ismail", bio: "intelligent coder" },
  { id: shortid.generate(), name: "Baslan", weight: "vigilant scrum master" },
];

module.exports = {
  findAll() {
    // SELECT * FROM users;
    return Promise.resolve(users);
  },

  findById(id) {
    // SELECT * FROM users WHERE id = 1;
    const user = users.find((d) => d.id === id);
    return Promise.resolve(user);
  },

  create({ name, bio }) {
    // INSERT INTO dogs SET name = 'Foo', bio = "Boo", WHERE id = 1;
    const newUser = { id: shortid.generate(), name, bio };
    users.push(newUser);
    return Promise.resolve(newUser);
  },

  update(id, changes) {
    // UPDATE dogs SET name = 'Foo', bio = "Boo", WHERE id = 1;
    const user = users.find((user) => user.id === id);
    if (!user) return Promise.resolve(null);

    const updatedUser = { ...changes, id };
    users = users.map((u) => (u.id === id ? updatedUser : d));
    return Promise.resolve(updatedUser);
  },

  delete(id) {
    // DELETE FROM users WHERE id = 1;
    const user = users.find((user) => user.id === id);
    if (!user) return Promise.resolve(null);

    users = user.filter((u) => u.id !== id);
    return Promise.resolve(user);
  },
};
