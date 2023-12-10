const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

const users = [{ id: 1, username: "user1", password: "password1" }];

passport.use(
  new LocalStrategy((username, password, done) => {
    const user = users.find(
      (u) => u.username === username && u.password === password
    );
    if (!user) {
      return done(null, false, { message: "Incorrect username or password" });
    }
    return done(null, user);
  })
);

module.exports = passport.authenticate("local");
