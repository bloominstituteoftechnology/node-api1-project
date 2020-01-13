const knex = require('knex');
const knexConfig = require('../knexfile.js');
const db = knex(knexConfig.development);

module.exports = {
  find,
  findById,
  insert,
  update,
  remove,
};
// GET /users
function find() {
  return db('users');
}
// GET /users/2
function findById(id) {
  return db('users')
    .where({ id: Number(id) })
    .first();
}
// POST /users {payload}
function insert(user) {
  return db('users')
    .insert(user)
    .then(ids => ({ id: ids[0] }));
}
// PUT /users/id/{payload}
function update(id, user) {
  return db('users')
    .where('id', Number(id))
    .update(user);
}
// DELETE /users/id
function remove(id) {
  return db('users')
    .where('id', Number(id))
    .del();
}
