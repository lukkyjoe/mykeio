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

  server: 'https://acme-v01.api.letsencrypt.org/directory',

  email: 'sawyer.schumacher@gmail.com',

  agreeTos: true,

  approveDomains: [ 'myke.io','www.myke.io' ],

  app: app

}).listen(80,443);

let peerServer = ExpressPeerServer(server, {debug:true});

app.use('/peerjs', peerServer);

peerServer.on('connection', function(id) {
    console.log(id)
  console.log(server._clients)
});
app.use(express.static(path.join(__dirname, 'app/dist/')));
