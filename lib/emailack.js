var config   = require('./config.js');
var pingmail = require('./pingmail.js');
var pongmail = require('./pongmail.js');

/**
 * getLastAck returns the last email pingpong check status
 */
var ack = { status: true, date: new Date(), error: null };
module.exports.getLastAck = function () {
  return ack;
}

/**
 * start function is the entry point to start pingpong mail checking
 */
module.exports.start = function () {
  function pingPongMail() {
    pingmail.ping(function (err, mailId) {
      if (err) {
        ack.status = false;
        ack.date   = new Date();
        ack.error  = err;
        setTimeout(pingPongMail, config.pingDelay);
      } else {
        // wait 10 secondes before checking the mail is arrived into Gmail
        setTimeout(function () {
          pongmail.pong(mailId, function (err, checkStatus) {
            ack.status = err ? false : checkStatus;
            ack.date   = new Date();
            ack.error  = err;
            setTimeout(pingPongMail, config.pingDelay);
          });
        }, config.pongDelay);
      }
    });
  }
  pingPongMail();
}