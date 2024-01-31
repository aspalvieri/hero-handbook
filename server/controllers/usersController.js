const bcrypt = require("bcrypt");
const validator = require("validator");
const userQueries = require("../db/queries/users");
const roleQueries = require("../db/queries/roles");

const defaultUserRole = "USER";

// TEST - DELETE LATER
exports.pass = (req, res) => {
  const db = req.database;
  const user = req.session.user;
  db.query("SELECT password FROM users WHERE id = $1 AND email ILIKE $2", [user.id, user.email]).then(pass => {
    return res.status(200).json(pass.rows[0]);
  }).catch(err => {
    console.log(err);
    return res.status(400).json({ message: err });
  });
};

exports.listUsers = (req, res) => {
  const db = req.database;
  userQueries.getAllUsers(db).then(users => {
    return res.status(200).json(users.rows);
  }).catch(err => {
    console.log(err);
    return res.status(500).json({"error": err});
  });
};

exports.getUser = (req, res) => {
  const db = req.database;
  userQueries.getUserById(db, req.params.id).then(user => {
    if (!user.rows || user.rows.length <= 0) {
      return res.status(500).json({"error": "User not found!"});
    }

    return res.status(200).json(user.rows[0]);
  }).catch(err => {
    console.log(err);
    return res.status(500).json({"error": err});
  });
};

exports.register = (req, res) => {
  const username = req.body.username;
  const email = req.body.email;
  const password_inc = req.body.password;
  const password2_inc = req.body.password2;

  if (typeof(username) !== "string" || validator.isEmpty(username) || !validator.isAlphanumeric(username)) {
    return res.status(400).json({ slot: "username", message: "Invalid username" });
  }
  else if (username.length < 4) {
    return res.status(400).json({ slot: "username", message: "Username too short" });
  }
  else if (username.length > 20) {
    return res.status(400).json({ slot: "username", message: "Username too long" });
  }
  if (typeof(email) !== "string" || validator.isEmpty(email) || !validator.isEmail(email) || email.length > 320) {
    return res.status(400).json({ slot: "email", message: "Invalid email" });
  }
  if ((typeof(password_inc) !== "string" || typeof(password2_inc) !== "string") || (validator.isEmpty(password_inc) || validator.isEmpty(password2_inc))) {
    return res.status(400).json({ slot: "password", message: "Invalid password" });
  }

  const password = password_inc.substring(0, 255);
  const password2 = password2_inc.substring(0, 255);

  if (password !== password2) {
    return res.status(400).json({ slot: "password", message: "Passwords do not match" });
  }
  else if (password.length < 4) {
    return res.status(400).json({ slot: "password", message: "Password too short" });
  }

  const db = req.database;

  userQueries.getUserByAccount(db, username, email).then(users => {
    if (users.rows && users.rows.length >= 1) {
      if (users.rows[0].username.toUpperCase() === username.toUpperCase()) {
        return res.status(400).json({ slot: "username", message: "Username already exists" });
      }
      
      return res.status(400).json({ slot: "email", message: "Email already exists" });
    }
    else {
      roleQueries.getRoleByName(db, defaultUserRole).then(role => {
        if (!role.rows || role.rows.length <= 0) {
          return res.status(400).json({ slot: "message", message: "Error getting info for role USER" });
        }

        const roleId = role.rows[0].id;

        // Hash password before saving in database
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(password, salt, (err, hash) => {
            if (err) throw err;
            userQueries.createNewUser(db, username, email, hash, roleId).then(user => {
              if (user.rows && user.rows.length > 0) {
                userQueries.getUserById(db, user.rows[0].id).then(regUser => {
                  const loggedUser = regUser.rows[0];
                  const permissions = loggedUser.permissions.map(permission => permission.name);

                  req.session.user = {
                    id: loggedUser.id,
                    username: loggedUser.username,
                    email: loggedUser.email,
                    role: loggedUser.role_name,
                    permissions: permissions
                  };

                  return res.status(200).json({ user: req.session.user });
                }).catch(err => {
                  console.log(err);
                  return res.status(400).json({ slot: "message", message: err.hint });
                });
              }
              else {
                return res.status(400).json({ error: "Failed to register user" });
              }
            }).catch(err => {
              console.log(err);
              return res.status(400).json({ slot: "username", message: err });
            })
          });
        });
      }).catch(err => {
        console.log(err);
        return res.status(400).json({ slot: "message", message: err.hint });
      });
    }
  }).catch(err => {
    console.log(err);
    return res.status(400).json({ slot: "message", message: err.hint });
  });
};

exports.login = (req, res) => {
  const account = req.body.account;
  const password_inc = req.body.password;

  if (typeof(account) !== "string" || validator.isEmpty(account) || (!validator.isEmail(account) && !validator.isAlphanumeric(account)) || account.length > 320) {
    return res.status(400).json({ slot: "account", message: "Invalid account" });
  }
  if (typeof(password_inc) !== "string" || validator.isEmpty(password_inc)) {
    return res.status(400).json({ slot: "password", message: "Invalid password" });
  }

  const password = password_inc.substring(0, 255);

  const db = req.database;
  // Find user by email
  userQueries.getUserByAccount(db, account, account).then(users => {
    // Check if user exists
    if (!users.rows || users.rows.length <= 0) {
      return res.status(404).json({ slot: "account", message: "Account not found" });
    }

    const user = users.rows[0];

    userQueries.getUserPasswordById(db, user.id).then(userPasswords => {
      const userPassword = userPasswords.rows[0].password;
      // Check password
      bcrypt.compare(password, userPassword, (err, isMatch) => {
        if (isMatch) {
          const permissions = user.permissions.map(permission => permission.name);

          req.session.user = {
            id: user.id,
            username: user.username,
            email: user.email,
            role: user.role_name,
            permissions: permissions
          };

          return res.status(200).json({ user: req.session.user });
        } 
        else {
          return res.status(400).json({ slot: "password", message: "Password incorrect" });
        }
      });
    }).catch(err => {
      console.log(err);
      return res.status(400).json({ slot: "account", message: err });
    });
  }).catch(err => {
    console.log(err);
    return res.status(400).json({ slot: "account", message: err });
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
};

exports.fetchUser = (req, res) => {
  if (req.sessionID && req.session.user) {
    return res.status(200).json({ user: req.session.user })
  }
  return res.sendStatus(403)
};
