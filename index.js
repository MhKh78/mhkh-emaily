const express = require('express');
const mongoose = require('mongoose');
const keys = require('./config/keys');
const dotenv = require('dotenv');
dotenv.config({ path: `${__dirname}/config.env` });
require('./services/passport');

const DB = keys.mongoDB.connectionString.replace(
  '<password>',
  keys.mongoDB.pass
);

// Important Config For MongoDB & Mongoose
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
  })
  .then(() => console.log('DB Connected'));

const app = express();

require('./routes/authRoutes')(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Listening on http://127.0.0.1:${PORT} ....!!!`);
});
