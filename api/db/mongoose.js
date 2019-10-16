const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
require('dotenv/config');

mongoose.connect(
  process.env.DB_CONNECTION,
  { useNewUrlParser: true, useUnifiedTopology: true },
);

// prevent deprecationi warnings
mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', true);

module.exports = mongoose;