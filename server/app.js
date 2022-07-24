require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");

const app = express();
const port = process.env.PORT || 5000;
const db = require('./configs/db.config');

let allowedOrigins = [
  "http://localhost:3000",
  "https://aspalvieri.com",
  "https://www.aspalvieri.com",
  "https://hero.aspalvieri.com"
];
app.use(cors({
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

// Our routes
const routes = require("./routes/index");
app.use("/api", routes);

app.use(express.static(path.join(__dirname, "client/build")));

app.get(/^(?!.*_ah).*$/, (req, res) => {
  res.sendFile(path.join(__dirname, "client/build", "index.html"));
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}.`);
});

module.exports = { app };
