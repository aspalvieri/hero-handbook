const express = require("express");
const router = express.Router();
const auth = require("../middleware/authorize");

//Controller
const usersController = require("../controllers/usersController");

//Routes
router.get("/test", usersController.test);
router.get("/pass", auth, usersController.pass);
router.get("/fetchUser", usersController.fetchUser);
router.post("/register", usersController.register);
router.post("/login", usersController.login);
router.post("/logout", usersController.logout);

module.exports = router;
