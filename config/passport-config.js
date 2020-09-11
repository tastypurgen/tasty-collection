const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');

const User = require('../models/User');

function initialize(passport) {
  let user;
  const authenticateUser = async (email, password, done) => {
    console.log('done: ', done);
    console.log('password: ', password);
    console.log('email: ', email);
    try {
      user = await User.findOne({ email });
    } catch (error) {
      console.log(error);
    }

    if (!user) return done(null, false, { message: 'No user with this email' });

    try {
      if (await bcrypt.compare(password, user.password)) {
        return done(null, user);
      }
      return done(null, false, { message: 'Wrong password' });
    } catch (error) {
      return done(error);
    }
  };

  passport.use(new LocalStrategy({ usernameField: 'email' }, authenticateUser));
  passport.serializeUser((us, done) => done(user.id));
  passport.deserializeUser((id, done) => done(null, user.id));
}

module.exports = initialize;
