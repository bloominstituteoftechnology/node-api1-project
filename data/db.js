const knex = require('knex');
const knexConfig = require('../knexfile.js');
const dbase = knex(knexConfig.development);

module.exports = {
  find,
  findById,
  insert,
  update,
  remove,
};

function find() {
  return dbase('users');
}

function findById(id) {
  return dbase('users')
    .where({ id: Number(id) })
    .first();
}

function insert(user) {
  return dbase('users')
    .insert(user)
    .then(ids => ({ id: ids[0] }));
}

function update(id, user) {
  return dbase('users')
    .where('id', Number(id))
    .update(user);
}

function remove(id) {
  return dbase('users')
    .where('id', Number(id))
    .del();
}
