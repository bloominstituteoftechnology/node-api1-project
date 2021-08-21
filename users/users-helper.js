const db = require("../database/dbConfig");

module.exports = {
  get,
  getById,
  getUserPowers,
  postUserPowers,
  registerUser,
  loginUser,
};

function get() {
  return db("users").orderBy("id");
}

function getById(id) {
  return db("users").where({ id }).first();
}

// api/users/:id/powers
function getUserPowers(id) {
  return db("user_powers")
    .join("users", "users.id", "=", "user_powers.user_id")
    .join("powers", "powers.id", "=", "user_powers.power_id")
    .where({ user_id: id })
    .select("age", "location", "username", "power", "planet");
}

//POST /api/users/:id/powers
function postUserPowers(data, userID) {
  return db("powers")
    .insert(data, "ids")
    .then((ids) => {
      console.log("ids---postuserpower----->", ids);
      return db("user_powers").insert({
        user_id: userID,
        power_id: ids,
      });
    });
}

//---------------------AUTH-------------------//
function registerUser(data) {
  return db("users")
    .insert(data, "ids")
    .then((ids) => {
      return db("users").where({ id: ids });
    });
}

function loginUser(filter) {
  return db("users").where(filter).first();
}
//---------------------AUTH-------------------//
