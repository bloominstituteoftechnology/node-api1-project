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
  Users.loginUser({ username: credentials.username })
    .then((user) => {
      req.session.user = user;
      if (user && bcrypt.compareSync(credentials.password, user.password)) {
        res.json({ message: `welcome ${credentials.username} have a cookie!` });
      } else {
        res.json({ message: "no access, invalid login credentials" });
      }
    })
    .catch((err) => next(err));
});

//LOGOUT
router.get("/logout", (req, res, next) => {
  console.log("loging out session.....");
  if (req.session) {
    req.session.destroy((err) => {
      err
        ? res.json({ message: "you cant logout yet" })
        : res.json({ message: "logged out" });
    });
  } else {
    res.json({ message: "this user doesn't even exist at all" });
  }
});

module.exports = router;
