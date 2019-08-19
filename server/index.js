const express = require('express');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const dotenv = require('dotenv');

const app = express();

dotenv.config({ path: `${__dirname}/config.env` });

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
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
