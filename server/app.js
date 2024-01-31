require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const session = require('express-session')

const app = express();
const port = process.env.PORT || 5000;
const db = require('./configs/db.config');

app.use(cors());
app.set("trust proxy", true);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Attach our database to the requests
app.use((req, res, next) => { 
  req.database = db;
  next();
});

//Session store and session config
const pgSession = require('connect-pg-simple')(session);
app.use(
  session({
    store: new pgSession({
      pool: db,
      createTableIfMissing: true
    }),
    secret: process.env.SESSION_SECRET,
    saveUninitialized: false,
    resave: false,
    cookie: {
      secure: (process.env.NODE_ENV === "production" ? true : false),
      sameSite: "strict",
      //domain: (process.env.NODE_ENV === "production" ? ".hero.aspalvieri.com" : "192.168.0.15"),
      maxAge: 1000 * 60 * 60 * 24 * 3 // 3 days
    }
  })
);

// Our routes
const routes = require("./routes/index");
app.use("/api", routes);

// Serve the static files from the React app
const cacheAge = 1000 * 60 * 60 * 24 * 365; // 365 days
app.use("/static", express.static(path.join(__dirname, "client/static"), { maxAge: cacheAge }));
app.use(express.static(path.join(__dirname, "client"), { etag: false, lastModified: false }));

app.get("/_ah/warmup", (req, res) => {
  console.log("Warmup requested.");
  res.sendStatus(200);
});

app.get(/^(?!.*_ah).*$/, (req, res) => {
  res.sendFile(path.join(__dirname, "client", "index.html"));
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}.`);
});

module.exports = { app, db };
