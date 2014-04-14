var config = require("./config.js");
var Imap   = require('imap');
var inspect = require('util').inspect;

module.exports.pong = function (mailId, cb) {
  var imap = new Imap(config.imap);

  imap.once('ready', function (err) {
    if (err) return cb(err);
    console.log('ready')
    imap.openBox('INBOX', function (err, mailbox) {
      if (err) throw err;

      imap.search([['SUBJECT', mailId]], function (err, results) {
        if (err) return cb(err);

        console.log('number of results: ', results.length);

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
    console.log('error', err);
  });

  imap.once('end', function() {
    console.log('Connection ended');
  });

  imap.connect();
};

