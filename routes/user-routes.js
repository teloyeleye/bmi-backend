const express = require("express");
const {
  createUser,
  getUsers,
  getAdmins,
  viewUser,
  loginUser,
  updateUserBMI,
  deleteUser,
  truncateAllUser,
} = require("../controllers/user-controller");
const router = express.Router();

router.get("/all", getUsers);
router.get("/admin", getAdmins);
router.post("/create", createUser);
router.get("/view/:id", viewUser);
router.post("/login", loginUser);
router.put("/updatebmi/:id", updateUserBMI);
router.delete("/delete/:id", deleteUser);
router.delete("/truncate-all", truncateAllUser);

module.exports = {
  routes: router,
};
