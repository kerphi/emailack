var config     = require("./config.js");
var uuid       = require("node-uuid");
var nodemailer = require("nodemailer");
var debug      = require("debug")('pingmail');


module.exports.ping = function pingMail(cb) {
  var mailId = uuid.v4();
  var email = {
    to: config.gmail.user,
    subject: 'emailack-ping: ' + mailId,
  };

  debug('Mail to send: ' + JSON.stringify(email));
  // create SMTP transport method (connected on localhost)
  var smtpTransport = nodemailer.createTransport("SMTP");
  smtpTransport.sendMail(email, function (err, response) {
    if (err) return cb(err, mailId);

    debug('Mail sent: ' + mailId + ' - ' + JSON.stringify(response));
    cb(null, mailId, response);
  });
}
