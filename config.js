module.exports = {
  "gmail": {
    "user": "xxx@gmail.com",  // your gmail email address
    "password": "xxx",        // your gmail password
    "mailbox": [ "INBOX" ],   // list of mailbox name where the email should arrive
    "host": "imap.gmail.com", // gmail imap hostname
    "port": 993,              // gmail imap port
    "tls": true               // imap using tls
  },
  "pingDelay":   1000*60*5, // 5 minutes before runing a new ping
  "pongDelay":   1000*30,   // 30 secondes before checking the IMAP box after the ping is sent 
  "nbPongRetry": 3,         // number of pong retry before considering the mail is not received
}
