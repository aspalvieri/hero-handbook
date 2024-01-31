// Our Express app module
const express = require('express');
const app = express();

// Importing the pageRoutes
const userRoutes = require("./users");
const roleRoutes = require("./roles");
const testRoutes = require("./tests");

// /...
app.use("/users", userRoutes);
app.use("/roles", roleRoutes);
app.use("/tests", testRoutes);

// Exporting the changes
module.exports = app;
