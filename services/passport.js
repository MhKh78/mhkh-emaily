const keys = require('./../config/keys');
const passport = require('passport');
const User = require('./../models/User');
const GoogleStrategy = require('passport-google-oauth20');

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.google.client_id,
      clientSecret: keys.google.client_secret,
      callbackURL: '/auth/google/callback'
    },
    (accessToken, refreshTolken, profile, done) => {
      new User({ googleId: profile.id }).save();
    }
  )
);
