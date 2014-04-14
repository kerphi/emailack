var config   = require('./config.js');
var pingmail = require('./pingmail.js');
var pongmail = require('./pongmail.js');

/**
 * getLastAck returns the last email pingpong check status
 */
var ack = true;
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
        ack = false;
        setTimeout(pingPongMail, config.checkDelay);
      } else {      
        pongmail.pong(mailId, function (err) {
          ack = err ? false : true;
          setTimeout(pingPongMail, config.checkDelay);
        });
      }
    });
  }
  pingPongMail();
}