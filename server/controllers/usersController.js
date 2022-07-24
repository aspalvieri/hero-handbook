exports.test = (req, res) => {
  const db = req.database;
  db.query("SELECT * FROM users").then(users => {
    res.status(200).json(users.rows);
  }).catch(err => {
    res.status(400).json({"error": err});
  });
};