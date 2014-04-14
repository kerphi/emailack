var config = require("./config.js");
var Imap   = require('imap');
var inspect = require('util').inspect;

module.exports.pong = function (mailId, cb) {
  cb(null);
};

// console.log(config.imap)
// var imap = new Imap(config.imap);

// imap.once('ready', function (err) {
//   if (err) throw err;
//   console.log('ready')
//   imap.openBox('INBOX', function (err, mailbox) {
//     if (err) throw err;

//     imap.search([['SUBJECT', '73132911-1db0-4392-b271-bd861b015b77']], function (err, results) {
//       if (err) throw err;

//       console.log('number of results: ', results.length);

//       // delete the message if found
//       if (results.length == 1) {      
//         imap.addFlags(results, 'Deleted', function (err) {
//           imap.closeBox(true, function (err) {
//             imap.end();
//           });
//         });
//       } else {        
//         imap.end();
//       }

//     });

//   });
// });

// imap.once('error', function(err) {
//   console.log('error', err);
// });

// imap.once('end', function() {
//   console.log('Connection ended');
// });

// imap.connect();
