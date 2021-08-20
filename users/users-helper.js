const db = require("../database/dbConfig");

module.exports = {
  get,
  getById,
  registerUser,
  loginUser,
};

function get() {
  return db("users").orderBy("id");
}

function getById(id) {
  return db("users").where({ id }).first();
}

//---------------------AUTH-------------------//
function registerUser(data) {
  return db("users")
    .insert(data, "ids")
    .then((ids) => {
      return db("users").where({ id: ids }).first();
    });
}

function loginUser(filter) {
  return db("users").where(filter).first();
}
//---------------------AUTH-------------------//
