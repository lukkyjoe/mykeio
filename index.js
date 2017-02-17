const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const mongoose = require('mongoose');
const path = require('path');
const process = require('process');
const apiRoutes = require('./routes/api.js');

const app = express();

app.use(session({
  secret: 'keyboard super cat',
  resave: false,
  saveUninitialized: true,
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use('/api', apiRoutes);

app.use(express.static(path.join(__dirname, 'app/dist/')));
app.listen(process.env.port || 3030);

