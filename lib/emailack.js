var config   = require('./config.js');
var pingmail = require('./pingmail.js');
var pongmail = require('./pongmail.js');
var debug    = require('debug')('emailack');

/**
 * getLastAck returns the last email pingpong check status
 */
var ack = { status: true, date: new Date(), error: null };
module.exports.getLastAck = function () {
  debug('emailack: getLastAck', JSON.stringify(ack));
  return ack;
}

/**
 * start function is the entry point to start pingpong mail checking
 */
module.exports.start = function () {
  function pingPongMail() {
    debug('pingPongMail: send a new ping');
    pingmail.ping(function (err, mailId) {
      debug('pingPongMail: mail sent');
      if (err) {
        debug('pingPongMail: mail sent but error occurs');
        ack.status = false;
        ack.date   = new Date();
        ack.error  = err;
        setTimeout(pingPongMail, config.pingDelay);
      } else {
        var nbTry  = 1;
        var ackTmp = {};

        function pongMail() {
          debug('pongMail: doing the pong');
          pongmail.pong(mailId, function (err, checkStatus) {
            debug('pongMail: pong done');
            ackTmp.status = err ? true : checkStatus; // if error (ex: auth timeout) then status still true
            ackTmp.date   = new Date();
            ackTmp.error  = err;
            ackTmp.nbTry  = nbTry;
            debug('pongMail: ' + JSON.stringify(ackTmp));
            if (err || checkStatus) {
              // if pong got the mail of if it was a fatal error
              debug('pongMail: preparing the next pingPongMail in ' + config.pingDelay + 'ms');
              ack = ackTmp;
              setTimeout(pingPongMail, config.pingDelay);
            } else {
              // if it was not a fatal error and the pong did not get the mail, try again
              // but firstly, check the number of try is not expired 
              if (nbTry >= config.nbPongRetry) {
                // no more try allowed
                debug('pongMail: no more try allowed nbTry=' + nbTry);
                ackTmp.error = new Error('emailack: no more pong retry');
                ack = ackTmp;
                setTimeout(pingPongMail, config.pingDelay);
              } else {
                // try again
                debug('pongMail: try again nbTry=' + nbTry);
                nbTry++;
                setTimeout(pongMail, config.pongDelay);                
              }
            }
          });
        }

        // wait 10 secondes before checking the mail is arrived into Gmail
        debug('pingPongMail: set a timeout of ' + config.pongDelay + 'ms before doing the pong');
        setTimeout(pongMail, config.pongDelay);
      }
    });
  }
  pingPongMail();
}
