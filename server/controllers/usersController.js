const bcrypt = require("bcrypt");
const validator = require("validator");

exports.test = (req, res) => {
  const db = req.database;
  db.query("SELECT id, username, email FROM users").then(users => {
    return res.status(200).json(users.rows);
  }).catch(err => {
    return res.status(500).json({"error": err});
  });
};

exports.pass = (req, res) => {
  const db = req.database;
  const user = req.session.user;
  db.query("SELECT password FROM users WHERE id=$1 AND email=$2", [user.id, user.email]).then(pass => {
    return res.status(200).json(pass.rows[0]);
  }).catch(err => {
    console.log(err);
    return res.status(400).json({ message: err });
  });
}

exports.register = (req, res) => {
  // TODO: Form validation
  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;
  const password2 = req.body.password2;

  if (password !== password2) {
    return res.status(400).json({ message: "Passwords don't match" });
  }

  const db = req.database;

  db.query("SELECT username, email FROM users WHERE username=$1 OR email=$2 LIMIT 1", [username, email]).then(users => {
    if (users.rows && users.rows.length >= 1) {
      if (users.rows[0].email === email)
        return res.status(400).json({ message: "Email already exists" });
      else
        return res.status(400).json({ message: "Username already exists" });
    }
    else {
      // Hash password before saving in database
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(password, salt, (err, hash) => {
          if (err) throw err;
          db.query("INSERT INTO users(id, username, email, password) VALUES(DEFAULT, $1, $2, $3) RETURNING *", [username, email, hash]).then(user => {
            req.session.user = {
              id: user.rows[0].id,
              username: user.rows[0].username,
              email: user.rows[0].email
            };
            return res.status(200).json({ user: req.session.user });
          }).catch(err => {
            console.log(err);
            return res.status(400).json({ message: err });
          })
        });
      });
    }
  }).catch(err => {
    console.log(err);
    return res.status(400).json({ message: err });
  });
};

exports.login = (req, res) => {
  const account = req.body.account;
  const password_inc = req.body.password;

  if (typeof(account) !== "string" || validator.isEmpty(account) || (!validator.isEmail(account) && !validator.isAlphanumeric(account))) {
    return res.status(400).json({ slot: "account", message: "Invalid account" });
  }
  if (typeof(password_inc) !== "string" || validator.isEmpty(password_inc)) {
    return res.status(400).json({ slot: "password", message: "Invalid password" });
  }

  const password = password_inc.substring(0, 256);

  const db = req.database;
  // Find user by email
  db.query("SELECT id, username, email, password FROM users WHERE username=$1 OR email=$1 LIMIT 1", [account]).then(users => {
    // Check if user exists
    if (!users.rows || users.rows.length <= 0) {
      return res.status(404).json({ slot: "account", message: "Account not found" });
    }
    const user = users.rows[0];
    // Check password
    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (isMatch) {
        req.session.user = {
          id: user.id,
          username: user.username,
          email: user.email
        };
        return res.status(200).json({ user: req.session.user });
      } 
      else {
        return res.status(400).json({ slot: "password", message: "Password incorrect" });
      }
    });
  }).catch(err => {
    console.log(err);
    return res.status(400).json({ message: err });
  });
};

exports.logout = async (req, res) => {
  try {
    await req.session.destroy();
    return res.sendStatus(200);
  } catch (e) {
    console.error(e);
    return res.sendStatus(500);
  }
}

exports.fetchUser = (req, res) => {
  if (req.sessionID && req.session.user) {
    return res.status(200).json({ user: req.session.user })
  }
  return res.sendStatus(403)
};
