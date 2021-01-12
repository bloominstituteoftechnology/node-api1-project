const shortid = require("shortid");

let users = [
  {
    id: shortid.generate(), // hint: use the shortid npm package to generate it
    name: "Jane Doe", // String, required
    bio: "Not Tarzan's Wife, another Jane", // String, required
  },
  {
    id: shortid.generate(), // hint: use the shortid npm package to generate it
    name: "John Doe", // String, required
    bio: "Not related to Jane", // String, required
  },
];

module.exports = {
  findAll() {
    // SELECT * FROM users;
    return Promise.resolve(users);
  },

  findById(id) {
    // SELECT * FROM users WHERE id = 1;
    const user = users.find((u) => u.id === id);
    return Promise.resolve(user);
  },

  create({ name, bio }) {
    // INSERT INTO dogs (id, name, bio) VALUES ('auto_generated', 'Foo','bio etc etc etc');
    const newUser = { id: shortid.generate(), name, bio };
    users.push(newUser);
    return Promise.resolve(newUser);
  },

  update(id, changes) {
    // UPDATE users SET name = 'string', bio = 'string';
    const user = users.find((user) => user.id === id);
    if (!user) return Promise.resolve(null);

    const updatedUser = { ...changes, id };
    users = users.map((u) => (u.id === id ? updatedUser : u));
    return Promise.resolve(updatedUser);
  },

  remove(id) {
    // DELETE FROM users WHERE id = 1;
    const user = users.find((user) => user.id === id);
    if (!user) return Promise.resolve(null);

    users = users.filter((u) => u.id !== id);
    return Promise.resolve(user);
  },
};
