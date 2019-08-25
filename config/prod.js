module.exports = {
  google: {
    client_id: process.env.GOOGLE_CLIENT_ID,
    client_secret: process.env.GOOGLE_CLIENT_SECRET
  },
  mongoDB: {
    user: process.env.MONGO_USER,
    pass: process.env.MONGO_PASS,
    connectionString: process.env.MONGO_URI
  },
  cookie: {
    cookieKey: process.env.COOKIE_KEY
  }
};
