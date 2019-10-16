const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const userRoute = require('./db/routes/User');
const loginRoute = require('./db/routes/Login');

const app = express();

// Middleware
app.use(cors())
app.use(bodyParser.json())
app.use(express.json({
  type: ['application/json', 'text/plain']
}));
app.use('/login', loginRoute);
app.use('/user', userRoute);
// NOTE: for postman
app.use(bodyParser.urlencoded({
  extended: true
}));

app.listen(5000)
