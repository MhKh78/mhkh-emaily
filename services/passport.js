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
      callbackURL:
        // This Way =>
        process.env.NODE_ENV === 'production'
          ? 'https://mhkh-emaily.herokuapp.com/auth/google/callback'
          : '/auth/google/callback'
      // OR =>  proxy: true
    },
    async (accessToken, refreshTolken, profile, done) => {
      const existingUser = await User.findOne({ googleId: profile.id });

      if (existingUser) {
        // we already have a record with the given profile ID
        return done(null, existingUser);
      }

      // new User({ googleId: profile.id })
      //   .save()
      const user = await User.create({
        googleId: profile.id,
        name: profile.name.familyName
      });
      done(null, user);
    }
  )
);
