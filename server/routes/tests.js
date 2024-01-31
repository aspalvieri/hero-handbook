const express = require("express");
const router = express.Router();
const { authorize } = require("../middleware/authorize");

//Controller
const testsController = require("../controllers/testsController");

// /tests/...
router.get("/rolepermissions", testsController.rolePermissions);
router.get("/roles", testsController.roles);
router.get("/permissions", testsController.permissions);

module.exports = router;
