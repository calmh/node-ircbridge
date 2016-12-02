# This project is not actively maintained

Issues and pull requests on this repository may not be acted on in a timely
manner, or at all.  You are of course welcome to use it anyway. You are even
more welcome to fork it and maintain the results.

![Unmaintained](https://nym.se/img/unmaintained.jpg)

ircbridge
=========

Client for the daemon that bridges IRC to JSON-RPC over UDP. Server side
is available at https://github.com/calmh/node-ircbridged.

Installation
------------

```
npm install ircbridge
```

Usage
-----

```javascript
var IRCBridge = require('ircbridge');

var bridge = IRCBridge('127.0.0.1')
bridge.join('#channel');
bridge.say('#channel', 'Hello!')
```

License
-------

MIT
