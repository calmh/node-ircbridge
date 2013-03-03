"use strict";

var dgram = require('dgram');

module.exports = Client;

function Client(server, port) {
    var self = this;
    if (!self || self.constructor !== Client)
        self = new Client(server);

    self.server = server;
    self.port = port || 41234;
    self.client = dgram.createSocket('udp4');
    self.subscriptions = {}

    self.client.on('message', function (msg, rinfo) {
        try {
            var notif = JSON.parse(msg);
            if (notif.method === 'message') {
                var from = notif.params[0];
                var to = notif.params[1];
                var message = notif.params[2];
                var cbs = self.subscriptions[to];
                cbs.forEach(function (cb) {
                    process.nextTick(function () {
                        cb(from, to, message);
                    });
                });
            }
        } catch (e) {
            console.log(e);
        }
    });

    function updateSubs() {
        for (var channel in self.subscriptions) {
            self.jsonsend('subscribe', [channel]);
        }
        setTimeout(updateSubs, 60 * 1000);
    }
    updateSubs();

    return self;
}

Client.prototype.notice = function notice(to, msg) {
    var self = this;
    self.jsonsend('notice', [to, msg])
};

Client.prototype.say = function say(to, msg) {
    var self = this;
    self.jsonsend('message', [to, msg])
};

Client.prototype.subscribe = function subscribe(channel, cb) {
    var self = this;
    self.jsonsend('subscribe', [channel])

    var subs = self.subscriptions[channel] || [];
    subs.push(cb);
    self.subscriptions[channel] = subs;
}

Client.prototype.jsonsend = function jsonsend(method, params, cb) {
    var self = this;
    var o = {method: method, params: params};
    var b = Buffer(JSON.stringify(o));
    self.client.send(b, 0, b.length, self.port, self.server, cb);
}

// }}
