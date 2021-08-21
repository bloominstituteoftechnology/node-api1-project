const router = require("express").Router();
const Powers = require("./powers.-helper");

router.get("/", (req, res, next) => {
  Powers.get()
    .then((user) => {
      user.map((item) => {
        return (item.power = Boolean(item.power));
      });
      res.json(user);
    })
    .catch((err) => next(err));
});

module.exports = router;
