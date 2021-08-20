const Users = require("../users/users-helper");

module.exports = {
  getById,
  restrictedUser,
};

function getById() {
  return (req, res, next) => {
    Users.getById(req.params.id).then((user) => {
      if (user) {
        req.user = user;
        next();
      } else {
        res.json({ message: `cant find user by ID # ${req.params.id}` });
      }
    });
  };
}

function restrictedUser() {
  return (req, res, next) => {
    if (req.session && req.session.user) {
      next();
    } else {
      res.json({ message: "please validate login and try again" });
    }
  };
}
