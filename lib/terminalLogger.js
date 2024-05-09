"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TerminalLogger = void 0;
var clc = require("chalk");
var TerminalLogger = /** @class */ (function () {
    function TerminalLogger(config) {
        var _a, _b, _c, _d;
        this.use = false;
        this.colors = {
            info: 'greenBright',
            alert: 'blueBright',
            debug: 'blackBright',
            warning: 'yellow',
            error: 'redBright',
            fatal: 'bgRed',
        };
        this.dateformat = false;
        this.levels = ['info', 'alert', 'debug', 'warning', 'error', 'fatal'];
        this.use = config === null || config === void 0 ? void 0 : config.use;
        if ((_a = config === null || config === void 0 ? void 0 : config.options) === null || _a === void 0 ? void 0 : _a.colors)
            this.colors = (_b = config === null || config === void 0 ? void 0 : config.options) === null || _b === void 0 ? void 0 : _b.colors;
        if ((_c = config === null || config === void 0 ? void 0 : config.options) === null || _c === void 0 ? void 0 : _c.levels)
            this.levels = (_d = config === null || config === void 0 ? void 0 : config.options) === null || _d === void 0 ? void 0 : _d.levels;
        if (config === null || config === void 0 ? void 0 : config.dateFormat)
            this.dateformat = config === null || config === void 0 ? void 0 : config.dateFormat;
    }
    TerminalLogger.prototype.formatDate = function (timestamp) {
        var date = new Date(timestamp || new Date().getTime());
        if (typeof this.dateformat !== 'boolean') {
            return date.toLocaleDateString('ru-RU', this.dateformat);
        }
        else
            return date.getTime().toString();
    };
    TerminalLogger.prototype.formatString = function (_a) {
        var title = _a.title, message = _a.message, params = _a.params, error = _a.error, timestamp = _a.timestamp;
        var header = "[TIME]: ".concat(this.formatDate(timestamp));
        var bodyTitle = "[TITLE]: ".concat(title);
        var bodyMessage = "[MESSAGE]: ".concat(message);
        var bodyParams = "[PARAMS]: ".concat(JSON.stringify(params || null));
        var bodyError = "[ERROR]: ".concat(error || null);
        return ['', header, bodyTitle, bodyMessage, bodyParams, bodyError].join('\n');
    };
    TerminalLogger.prototype.print = function (logLevel, props) {
        if (!logLevel)
            return;
        if (!this.use)
            return;
        if (!this.levels.includes(logLevel))
            return;
        var color = this.colors[logLevel];
        if (!color)
            return;
        switch (logLevel) {
            case 'info':
            case 'alert':
                console.info(clc[color](this.formatString(props)));
                break;
            case 'debug':
                console.debug(clc[color](this.formatString(props)));
                break;
            case 'warning':
                console.warn(clc[color](this.formatString(props)));
                break;
            case 'error':
            case 'fatal':
                console.error(clc[color](this.formatString(props)));
                break;
        }
    };
    return TerminalLogger;
}());
exports.TerminalLogger = TerminalLogger;
