
var emailAck = require('./lib/emailack.js');
var express = require('express');

var app = express();
app.enable('trust proxy');

app.get('/', function (req, res){
  var result = { emailAck: emailAck.getLastAck() };
  res.send(result);
});

// web server errors handling
app.use(function (err, req, res, next){
  console.error (err.stack);
  res.send(500, 'Something broke!');
});
var server = app.listen(3000, function () {
    console.log('Listening on port %d', server.address().port);
});

// start email ping pong
emailAck.start();