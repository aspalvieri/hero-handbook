// Our Express app module
const express = require('express');
const app = express();

// Importing the pageRoutes
const userRoutes = require("./users");

// Registering our routes
app.use("/users", userRoutes);

// Exporting the changes
module.exports = app;
