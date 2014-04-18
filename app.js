var config   = require('./lib/config.js');
var emailAck = require('./lib/emailack.js');
var express  = require('express');

var app = express();
app.enable('trust proxy');

app.get('/', function (req, res){
  res.send(emailAck.getLastAck());
});

// web server errors handling
app.use(function (err, req, res, next){
  console.error(err.stack);
  res.send(500, 'Something broke!');
});
var server = app.listen(3000, function () {
  console.log('Email will be sent to %s[%s] each %dms', config.gmail.user, config.gmail.mailbox, config.pingDelay);
  console.log('REST API listening on http://127.0.0.1:%d', server.address().port);
});

// start email ping pong
emailAck.start();