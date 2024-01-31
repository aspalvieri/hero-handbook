const express = require("express");
const router = express.Router();
const { authorize } = require("../middleware/authorize");

//Controller
const rolesController = require("../controllers/rolesController");

// /roles/...
router.get("/", authorize({ permission: "ROLES_LIST" }), rolesController.listRoles);

module.exports = router;
