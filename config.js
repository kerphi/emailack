
module.exports = {
  "imap": {
    "user": "xxx@gmail.com",
    "password": "xxx",
    "host": "imap.gmail.com",
    "port": 993,
    "tls": true
  },
  "pingDelay": 1000*60*5, // 5 minutes before runing a new ping
  "pongDelay": 1000*10,   // 10 secondes before checking the IMAP box after the ping is sent 
}