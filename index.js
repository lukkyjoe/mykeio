const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const mongoose = require('mongoose');
const path = require('path');
const process = require('process');
const apiRoutes = require('./routes/api.js');
const ExpressPeerServer = require('peer').ExpressPeerServer;
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



const server = require('greenlock-express').create({

  server: 'staging',

  email: 'sawyer.schumacher@gmail.com',

  agreeTos: true,

  approveDomains: [ 'myke.io' ],

  app: app

}).listen(80,443);

app.use('/peer', ExpressPeerServer(server, {debug:true}));
app.use(express.static(path.join(__dirname, 'app/dist/')));
