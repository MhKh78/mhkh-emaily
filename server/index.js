const express = require('express');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const keys = require('./config/keys');

const app = express();

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.google.client_id,
      clientSecret: keys.google.client_secret,
      callbackURL: '/auth/google/callback'
    },
    (accessToken, refreshTolken, profile, done) => {
      console.log('accessToken', accessToken);
      console.log('refreshTolken', refreshTolken);
      console.log('profile', JSON.stringify(profile));
    }
  )
);

app.get(
  '/auth/google',
  passport.authenticate('google', {
    scope: ['profile', 'email']
  })
);

app.get('/auth/google/callback', passport.authenticate('google'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Listening on http://127.0.0.1:${PORT} ....!!!`);
});
