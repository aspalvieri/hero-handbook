const express = require("express");
const router = express.Router();
const { authorize } = require("../middleware/authorize");

//Controller
const usersController = require("../controllers/usersController");

// /users/...
router.get("/pass", authorize, usersController.pass);
router.get("/fetchUser", usersController.fetchUser);
router.post("/register", usersController.register);
router.post("/login", usersController.login);
router.post("/logout", usersController.logout);
router.get("/", authorize({ permission: "USERS_LIST" }), usersController.listUsers);
router.get("/:id", authorize({ permission: "USERS_DISPLAY" }), usersController.getUser);

module.exports = router;
