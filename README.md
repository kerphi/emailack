# emailack

EmailAck is a tool which periorically check that mails can be sent through your system.
Why this tool ? because I did not find any monitoring tools able to really check that mails are correctly delivered.
How it works ? it just  periodicaly send from your server an email to your gmail account then it connect to gmail through imap and checks that the mails has been received. The result is available through a simple HTTP server.

The application is splitted in two parts:
- a Web server giving the current status
- a periodic task which send an email through local SMTP then connect to the GMail through IMAP to check the mail has been received. 

## Prerequisite

- a gmail account with imap enabled
- a recent [nodejs](http://nodejs.org/) installation

## Installation

Clone and install dependencies:
```bash
git clone https://github.com/kerphi/emailack.git
cd emailack
npm install
```

Run the application:
```bash
node app.js
```

## Configuration

Parameters are stored into ``config.js`` file. You can overload it by creating a similar ``config.local.js`` file:
```javascript
module.exports = {
  "gmail": {
    "user": "xxxx@gmail.com", // your gmail adress
    "password": "yyy"         // your gmail password
    "mailbox": "INBOX",       // mailbox name where the email should arrive
  },
  "pingDelay":   1000*1,  // miliseconds to wait before sending a new mail
  "pongDelay":   1000*10, // miliseconds to wait before connecting to gmail to check that the mail arrived
  "nbPongRetry": 3,       // number of pong retry before considering the mail is not received
}
``` 

## Usage

Then you can check you email status through the HTTP server: http://localhost:3000/

It should return a JSON similar to that:
```json
{
  "status": true,
  "date": "2014-04-15T11:37:54.248Z",
  "nbTry": 1,
  "receivedDelay": 25000,
  "error": null
}
```

- status is true if the last sent mail has been received
- date is when the last mail has been received
- nbTry is the number of try before the mail has been received on Gmail 
- receivedDelay is the number of elapsed milliseconds since the mail has been received on Gmail
- error is the prospective error message
