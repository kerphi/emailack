var config  = require("./config.js");
var Imap    = require('imap');
var inspect = require('util').inspect;
var debug   = require('debug')('pongmail');

module.exports.pong = function (mailId, cb) {
  var imap = new Imap(config.gmail);

  imap.once('ready', function (err) {
    if (err) return cb(err);
    debug('imap ready')
    imap.openBox(config.gmail.mailbox, function (err, mailbox) {
      if (err) return cb(err);

      imap.search([['SUBJECT', mailId]], function (err, results) {
        if (err) return cb(err);

        debug('imap.search number of results: ' + results.length);

        // delete the message if found
        if (results.length == 1) {      
          imap.addFlags(results, 'Deleted', function (err) {
            imap.closeBox(true, function (err) {
              imap.end();
              cb(null, true); // return true because the message was found 
            });
          });
        } else {
          imap.end();
          cb(null, false); // return false because the message was not found 
        }

      });

    });
  });

  imap.once('error', function(err) {
    debug('imap error' + err);
    return cb(err);
  });

  imap.once('end', function() {
    debug('imap: connection ended');
  });

  imap.connect();
};

