var config     = require("./config.js");
var uuid       = require("node-uuid");
var nodemailer = require("nodemailer");

var pingId = uuid.v4();
var pingpongDelay = 1000*60*5;

pingMail(pingId, function (err) {
  if (err) return console.log(err);
  setTimeout(function () {
    pongMail(pingId, function (err) {
      if (err) return console.log(err);
      console.log('pong');
    });
  }, pingpongDelay);
  process.exit(0);
});



function pingMail(pingId, cb) {
  var email = {
    to: config.username,
    subject: 'ping: ' + pingId,
    text:    '',
    headers: {},
  };

  // create reusable transport method (opens pool of SMTP connections)
  var smtpTransport = nodemailer.createTransport("SMTP", {});

  smtpTransport.sendMail(email, function (err, response) {
    if (err) return cb(err);

    console.log(response);
    cb(null, response);
  });
}

function pongMail(pingId, cb) {
  cb();
}
