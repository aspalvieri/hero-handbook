const express = require("express");
const router = express.Router();

//Controller
const usersController = require("../controllers/usersController");

//Routes
router.get("/test", usersController.test);

module.exports = router;
