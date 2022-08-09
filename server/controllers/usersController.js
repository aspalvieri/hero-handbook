const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.test = (req, res) => {
  const db = req.database;
  db.query("SELECT * FROM users").then(users => {
    res.status(200).json(users.rows);
  }).catch(err => {
    res.status(500).json({"error": err});
  });
};

exports.register = (req, res) => {
  // TODO: Form validation
  const email = req.body.email;
  const password = req.body.password;
  const password2 = req.body.password2;

  if (password !== password2) {
    res.status(400).json({ message: "Passwords don't match" });
  }

  const db = req.database;

  db.query(`SELECT * FROM users WHERE email='${email}' LIMIT 1`).then(users => {
    if (users.rows && users.rows.length >= 1) {
      return res.status(400).json({ message: "Email already exists" });
    }
    else {
      // Hash password before saving in database
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(password, salt, (err, hash) => {
          if (err) throw err;
          db.query(`INSERT INTO users(id, email, password) VALUES(DEFAULT, '${email}', '${hash}') RETURNING *`).then(user => {
            res.status(200).json(user.rows[0]);
          }).catch(err => {
            console.log(err);
            res.status(400).json({ message: err });
          })
        });
      });
    }
  }).catch(err => {
    console.log(err);
    res.status(400).json({ message: err });
  });
};

exports.login = (req, res) => {
  // TODO: Form validation
  const email = req.body.email;
  const password = req.body.password;

  const db = req.database;
  // Find user by email
  db.query(`SELECT * FROM users WHERE email='${email}' LIMIT 1`).then(users => {
    // Check if user exists
    if (!users.rows || users.rows.length <= 0) {
      return res.status(404).json({ message: "Email not found" });
    }
    const user = users.rows[0];
    // Check password
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        // User matched
        // Create JWT Payload, this data is stored in the token
        const payload = {
          //Change values here to control what user object has on frontend
          id: user.id,
          email: user.email
        };
        // Sign token
        jwt.sign(payload, process.env.SECRET, {
            expiresIn: 31556926 // 1 year in seconds
          },
          (err, token) => {
            res.status(200).json({
              success: true,
              token: "Bearer " + token
            });
          }
        );
      } 
      else {
        return res.status(400).json({ message: "Password incorrect" });
      }
    });
  }).catch(err => {
    console.log(err);
    res.status(400).json({ message: err });
  });
};
