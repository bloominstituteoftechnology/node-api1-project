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
