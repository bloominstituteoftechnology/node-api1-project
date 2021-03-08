const Users = require("./model");

const checkID = async (req, res, next) => {
  const { id } = req.params;
  try {
    const user = await Users.findById(id);
    if (!user) {
      res.status(404).json({ message: `ID ${id} found.` });
    } else {
      next();
    }
  } catch (e) {
    res.status(500).json({ message: `${e}` });
  }
};

module.exports = {
    checkID
}
