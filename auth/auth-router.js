const router = require("express").Router();
const bcrypt = require("bcryptjs");
const Users = require("../users/users-helper");

//REGISTER
router.post("/register", (req, res, next) => {
  const credentials = req.body;
  const hashedPassword = bcrypt.hashSync(credentials.password, 10);

  Users.registerUser({
    age: credentials.age,
    location: credentials.location,
    email: credentials.email,
    username: credentials.username,
    password: hashedPassword,
  })
    .then((user) => {
      user ? res.json(user) : res.json({ message: `can't post user` });
    })
    .catch((err) => next(err));
});
//LOGIN
router.post("/login", (req, res, next) => {
  const credentials = req.body;
});

//LOGOUT

module.exports = router;
