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
