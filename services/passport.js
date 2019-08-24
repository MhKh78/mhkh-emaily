const keys = require('./../config/keys');
const passport = require('passport');
const User = require('./../models/User');
const GoogleStrategy = require('passport-google-oauth20');

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then(user => done(null, user));
});

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.google.client_id,
      clientSecret: keys.google.client_secret,
      callbackURL: '/auth/google/callback'
    },
    (accessToken, refreshTolken, profile, done) => {
      User.findOne({ googleId: profile.id }).then(existingUser => {
        if (existingUser) {
          // we already have a record with the given profile ID
          done(null, existingUser);
        } else {
          // new User({ googleId: profile.id })
          //   .save()
          User.create({
            googleId: profile.id,
            name: profile.name.familyName
          }).then(user => done(null, user));
        }
      });
    }
  )
);
