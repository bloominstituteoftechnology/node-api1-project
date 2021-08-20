const router = require("express").Router();
const Users = require("./users-helper");
const { getById } = require("../middleware/global-middleware");

router.get("/", (req, res, next) => {
  Users.get()
    .then((user) => res.json(user))
    .catch((err) => next(err));
});

router.get("/:id", getById(), (req, res, next) => {
  res.json(req.user);
});

module.exports = router;
