const knex = require('knex');
const knexConfig = require('../knexfile.js');
const hubs = knex(knexConfig.development);

module.exports = {
  find,
  findById,
  insert,
  update,
  remove,
};

function find() {
  return hubs('users');
}

function findById(id) {
  return hubs('users')
    .where({ id: Number(id) })
    .first();
}

function insert(user) {
  return hubs('users')
    .insert(user)
    .then(ids => ({ id: ids[0] }));
}

function update(id, user) {
  return hubs('users')
    .where('id', Number(id))
    .update(user);
}

function remove(id) {
  return hubs('users')
    .where('id', Number(id))
    .del();
}
