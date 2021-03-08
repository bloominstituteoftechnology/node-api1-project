const express = require("express");
const Users = require("./model");
const mw = require("./mw");
const router = express.Router();

//Get all users from db
router.get("/", async (req, res, next) => {
  try {
    const rows = await Users.find();
    res.status(200).json(rows);
  } catch (e) {
    next();
  }
});

//Get a user by ID from db
router.get("/:id", mw.checkID, async (req, res, next) => {
  try {
    const rows = await Users.findById(req.params.id);
    res.status(200).json(rows);
  } catch (e) {
    next(e);
  }
});

//Post a user to the db
router.post("/", async (req, res, next) => {
  try {
    const { name, bio } = req.body;
    if (!name || !bio) {
      res
        .status(400)
        .json({ message: "Please provide name and bio for the user" });
    } else {
      const rows = await Users.insert(req.body);
      res.status(201).json(rows);
    }
  } catch (e) {
    next(e);
  }
});

//Delete a user from the db
router.delete("/:id", mw.checkID, async (req, res, next) => {
  try {
    const rows = await Users.remove(req.params.id);
    res.status(200).json(rows);
  } catch (e) {
    next(e);
  }
});

//edit a user from the db
router.put("/:id", mw.checkID, async (req, res, next) => {
  const { id } = req.params;
  const { name, bio } = req.body;
  try {
    if (!name || !bio) {
      res
        .status(400)
        .json({ message: "Please provide name and bio for the user" });
    } else {
      const chnages = req.body;
      const rows = await Users.update(id, chnages);
      res.status(200).json(rows);
    }
  } catch (e) {
    next(e);
  }
});

router.use((err, req, res) => {
  res.status(500).json({
    message: " Posts server error!!!",
    error: err.message,
  });
});

module.exports = router;
