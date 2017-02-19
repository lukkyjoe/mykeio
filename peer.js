var fs = require('fs');
var PeerServer = require('peer').PeerServer;

var server = PeerServer({
  port: 9000,
  ssl: {
    key: fs.readFileSync('/root/letsencrypt/etc/live/myke.io/privkey.pem'),
    cert: fs.readFileSync('/root/letsencrypt/etc/live/myke.io/cert.pem')
  }
});


