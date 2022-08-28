require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const session = require('express-session')

const app = express();
const port = process.env.PORT || 5000;
const db = require('./configs/db.config');

let allowedOrigins = [
  "http://192.168.0.15:3000",
  "https://aspalvieri.com",
  "https://www.aspalvieri.com",
  "https://hero.aspalvieri.com"
];
app.use(cors({
  credentials: true,
  origin: function(origin, callback){
    // allow requests with no origin (like mobile apps or curl requests)
    if(!origin) {
      return callback(null, true);
    }
    if (allowedOrigins.indexOf(origin) === -1) {
      let msg = "The CORS policy for this site does not allow access from the specified Origin.";
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  }
}));

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
      httpOnly: true,
      sameSite: "strict",
      domain: (process.env.NODE_ENV === "production" ? ".hero.aspalvieri.com" : "192.168.0.15"),
      maxAge: 1000 * 60 * 60 * 24 * 3 // 3 days
    }
  })
);

// Our routes
const routes = require("./routes/index");
app.use("/", routes);

app.use(express.static(path.join(__dirname, "client/build")));

app.get("/_ah/warmup", (req, res) => {
  console.log("Warmup requested.");
  res.sendStatus(200);
});

app.get(/^(?!.*_ah).*$/, (req, res) => {
  res.sendFile(path.join(__dirname, "client/build", "index.html"));
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}.`);
});

module.exports = { app, db };
