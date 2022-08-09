const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.SECRET;

function buildPassport(passport, db) {
  passport.use(
    new JwtStrategy(opts, (jwt_payload, done) => {
      db.query(`SELECT * FROM users WHERE id=${jwt_payload.id} LIMIT 1`).then(users => {
        if (!users.rows || users.rows.length <= 0) {
          return done(null, false);
        }
        return done(null, users.rows[0]);
      }).catch(err => console.log(err));
    })
  );
};

module.exports = buildPassport;
