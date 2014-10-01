var config  = require("./config.js");
var Imap    = require('imap');
var async   = require('async');
var inspect = require('util').inspect;
var debug   = require('debug')('pongmail');

module.exports.pong = function (mailId, cb) {
  var imap = new Imap(config.gmail);

  imap.once('ready', function (err) {
    if (err) return cb(err);
    debug('imap ready');

    // search message into each mailbox given in the config
    async.mapSeries(config.gmail.mailbox, searchMessageInBox, function (err, results) {
      imap.end(); // close the imap connection once every mailbox are browsed
      if (err)
        return cb(err);
      else
        return cb(null, results.indexOf(true) !== -1);
    });

    function searchMessageInBox(mailboxName, searchCb) {
      imap.openBox(mailboxName, function (err, mailbox) {
        if (err) throw err;

        imap.search([['SUBJECT', mailId]], function (err, results) {
          if (err) return searchCb(err);

          debug('imap.search into "' + mailboxName + '" -> number of results: ' + results.length);

          // delete the message if found
          if (results.length == 1) {      
            imap.addFlags(results, 'Deleted', function (err) {
              debug(mailId + ' marked deleted');
              imap.closeBox(true, function (err) {
                searchCb(null, true); // return true because the message was found 
              });
            });
          } else {
            searchCb(null, false); // return false because the message was not found 
          }

        });

      });
    }
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

