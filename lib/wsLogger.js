"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WSLogger = void 0;
var WebSocket = require("ws");
var terminalLogger_1 = require("./terminalLogger");
var WSLogger = /** @class */ (function () {
    function WSLogger(config) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
        this.use = false;
        this.logger = new terminalLogger_1.TerminalLogger({ use: true, options: {} });
        this.wsOpen = false;
        this.buffer = [];
        this.hostname = 'localhost';
        this.port = 5000;
        this.protocol = 'ws';
        this.projectId = '';
        this.secret = '';
        this.levels = ['info', 'alert', 'debug', 'warning', 'error', 'fatal'];
        this.use = config === null || config === void 0 ? void 0 : config.use;
        if ((_a = config === null || config === void 0 ? void 0 : config.options) === null || _a === void 0 ? void 0 : _a.hostname)
            this.hostname = (_b = config === null || config === void 0 ? void 0 : config.options) === null || _b === void 0 ? void 0 : _b.hostname;
        if ((_c = config === null || config === void 0 ? void 0 : config.options) === null || _c === void 0 ? void 0 : _c.port)
            this.port = (_d = config === null || config === void 0 ? void 0 : config.options) === null || _d === void 0 ? void 0 : _d.port;
        if ((_e = config === null || config === void 0 ? void 0 : config.options) === null || _e === void 0 ? void 0 : _e.protocol)
            this.protocol = (_f = config === null || config === void 0 ? void 0 : config.options) === null || _f === void 0 ? void 0 : _f.protocol;
        if ((_g = config === null || config === void 0 ? void 0 : config.options) === null || _g === void 0 ? void 0 : _g.auth.projectId)
            this.projectId = (_h = config === null || config === void 0 ? void 0 : config.options) === null || _h === void 0 ? void 0 : _h.auth.projectId;
        if ((_j = config === null || config === void 0 ? void 0 : config.options) === null || _j === void 0 ? void 0 : _j.auth.secret)
            this.secret = (_k = config === null || config === void 0 ? void 0 : config.options) === null || _k === void 0 ? void 0 : _k.auth.secret;
        if ((_l = config === null || config === void 0 ? void 0 : config.options) === null || _l === void 0 ? void 0 : _l.levels)
            this.levels = (_m = config === null || config === void 0 ? void 0 : config.options) === null || _m === void 0 ? void 0 : _m.levels;
        if (this.use) {
            if (!this.projectId)
                return;
            if (!this.secret)
                return;
            this.connect();
        }
    }
    WSLogger.prototype.connect = function () {
        var _this = this;
        this.ws = new WebSocket("".concat(this.protocol, "://").concat(this.hostname, ":").concat(this.port, "/ws?project_id=").concat(this.projectId));
        this.ws.on('error', function (error) {
            var _a;
            _this.logger.print('error', { title: 'Socket encountered error: ', message: error.message });
            (_a = _this.ws) === null || _a === void 0 ? void 0 : _a.close();
        });
        this.ws.on('close', function (_, reason) {
            _this.logger.print('warning', { title: 'Socket is closed', message: "Socket is closed. Reconnect will be attempted in 1 second. ".concat(reason.toString()) });
            setTimeout(function () {
                _this.connect();
            }, 1000);
        });
        this.ws.on('open', function () {
            var _a, _b;
            _this.wsOpen = true;
            _this.logger.print('info', { title: 'ws connected', message: 'socket is connected' });
            (_a = _this.ws) === null || _a === void 0 ? void 0 : _a.send(JSON.stringify({
                type: 'sign_in',
                data: {
                    project_id: _this.projectId,
                    secret: _this.secret,
                },
            }));
            (_b = _this.ws) === null || _b === void 0 ? void 0 : _b.on('message', function (data) {
                var message = '';
                if (Buffer.isBuffer(data))
                    message = data.toString();
                var parseMessage = JSON.parse(message);
                if (parseMessage.type === 'authorized') {
                    _this.logger.print('info', { title: 'ws authorized', message: 'socket is authorized' });
                }
                else if (parseMessage.type === 'unverified') {
                    _this.logger.print('error', { title: 'ws auth error', message: JSON.stringify(parseMessage.data) });
                }
            });
        });
    };
    WSLogger.prototype.send = function (message) {
        var _this = this;
        if (!this.wsOpen || !this.ws)
            return false;
        if (this.buffer.length) {
            for (var _i = 0, _a = this.buffer; _i < _a.length; _i++) {
                var m = _a[_i];
                var messageObject_1 = JSON.stringify({
                    type: 'log_create',
                    data: m,
                });
                this.ws.send(messageObject_1, function (error) {
                    if (error)
                        _this.logger.print('error', { title: 'ws auth error', message: error.message });
                });
            }
        }
        var messageObject = JSON.stringify({
            type: 'log_create',
            data: message,
        });
        this.ws.send(messageObject, function (error) {
            if (error)
                _this.logger.print('error', { title: 'ws auth error', message: error.message });
        });
        return true;
    };
    WSLogger.prototype.newSendObject = function (logLevel, props) {
        return {
            level: logLevel,
            content: "".concat(props.title, ": ").concat(props.message),
            timestamp: props.timestamp,
        };
    };
    WSLogger.prototype.print = function (logLevel, props) {
        if (!logLevel)
            return;
        if (!this.use)
            return;
        if (!this.wsOpen || !this.ws) {
            this.buffer.push(this.newSendObject(logLevel, props));
            return false;
        }
        if (!this.levels.includes(logLevel))
            return;
        switch (logLevel) {
            case 'info':
                this.send(this.newSendObject('info', props));
                break;
            case 'alert':
                this.send(this.newSendObject('alert', props));
                break;
            case 'debug':
                this.send(this.newSendObject('debug', props));
                break;
            case 'warning':
                this.send(this.newSendObject('warning', props));
                break;
            case 'error':
                this.send(this.newSendObject('error', props));
                break;
            case 'fatal':
                this.send(this.newSendObject('fatal', props));
                break;
        }
    };
    return WSLogger;
}());
exports.WSLogger = WSLogger;
