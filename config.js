
module.exports = {
  "gmail": {
    "user": "xxx@gmail.com",  // your gmail adress
    "password": "xxx",        // your gmail password
    "host": "imap.gmail.com", // gmail imap hostname
    "port": 993,              // gmail imap port
    "tls": true               // imap using tls
  },
  "pingDelay":   1000*60*5, // 5 minutes before runing a new ping
  "pongDelay":   1000*10,   // 10 secondes before checking the IMAP box after the ping is sent 
  "nbPongRetry": 3,         // number of pong retry before considering the mail is not received
}