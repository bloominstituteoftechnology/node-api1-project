const router = require("express").Router();
const Users = require("./users-helper");

router.get("/", (req, res, next) => {
  Users.get()
    .then((user) => res.json(user))
    .catch((err) => next(err));
});

module.exports = router;
