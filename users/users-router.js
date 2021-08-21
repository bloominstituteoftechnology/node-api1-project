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

router.get("/:id/powers", (req, res, next) => {
  const { id } = req.params;
  Users.getUserPowers(id)
    .then((userPowers) => {
      userPowers.map((item) => {
        return (item.power = Boolean(item.power));
      });
      res.json(userPowers);
    })
    .catch((err) => next(err));
});

router.post("/:id/powers", async (req, res, next) => {
  const { id } = req.params;
  const powersBody = req.body;
  let userID = await Users.getById(id);
  Users.postUserPowers(powersBody, id)
    .then((power) => {
      console.log("power------>", power, powersBody, userID);
      res.json([
        { message: `powers post #${power} on user ${userID.username}` },
        { powersBody },
      ]);
    })
    .catch((err) => next(err));
});

module.exports = router;
