var assert = require('chai').assert,
    sinon  = require('sinon'),
    events = require('events'),
    Router = require('../script/Router');

suite('Router', function () {
    setup(function () {
        this.connection = new events.EventEmitter;
        sinon.spy(this.connection, 'on');

        sinon.spy(Router.prototype, 'route');
        this.router = new Router({ incoming: this.connection });
    });

    teardown(function () {
        this.connection.on.restore();
        this.router.route.restore();
    });

    test('recieves an incoming connection', function () {
        assert.equal(this.router.incoming, this.connection);
    });

    test('listens on incoming connection data', function () {
        assert.ok(this.connection.on.calledWith('data'));
    });

    test('attempts to route any incoming data', function () {
        this.connection.emit('data', 'mock');
        assert.ok(Router.prototype.route.calledWith('mock'));
    });
});
