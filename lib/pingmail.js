var config     = require("./config.js");
var uuid       = require("node-uuid");
var nodemailer = require("nodemailer");
var debug      = require("debug");


module.exports.ping = function pingMail(cb) {
  var mailId = uuid.v4();
  debug('new message', mailId);

  var email = {
    to: config.imap.user,
    subject: 'ping: ' + mailId,
  };

  // create SMTP transport method (connected on localhost)
  var smtpTransport = nodemailer.createTransport("SMTP");
  smtpTransport.sendMail(email, function (err, response) {
    if (err) return cb(err, mailId);

    console.log(mailId, response);
    cb(null, mailId, response);
  });
}
