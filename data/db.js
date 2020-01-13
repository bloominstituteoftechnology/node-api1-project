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
//get
function find() {
  return db('users');
}
//get
function findById(id) {
  return db('users')
    .where({ id: Number(id) })
    .first();
}
//post
function insert(user) {
  return db('users')
    .insert(user)
    .then(ids => ({ id: ids[0] }));
}
//put
function update(id, user) {
  return db('users')
    .where('id', Number(id))
    .update(user);
}
//delete
function remove(id) {
  return db('users')
    .where('id', Number(id))
    .del();
}
