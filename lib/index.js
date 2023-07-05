"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErisLogger = void 0;
var pino_1 = require("pino");
var clc = require("chalk");
var ErisLogger = /** @class */ (function () {
    function ErisLogger(config, defaultParams) {
        var _a;
        this.config = {
            terminal: {
                use: true,
                colors: {
                    info: 'greenBright',
                    alert: 'blueBright',
                    debug: 'blackBright',
                    warning: 'yellow',
                    error: 'redBright',
                    critical: 'bgRed',
                },
                levels: ['info', 'alert', 'debug', 'warning', 'error', 'critical'],
            },
            file: {
                use: true,
                dir: '/logs/log.log',
                colorize: true,
                levels: ['info', 'alert', 'debug', 'warning', 'error', 'critical'],
            },
            options: {
                dateformat: {
                    year: 'numeric',
                    month: 'numeric',
                    day: 'numeric',
                    hour: 'numeric',
                    minute: 'numeric',
                    second: 'numeric',
                },
                levels: ['info', 'alert', 'debug', 'warning', 'error', 'critical'],
            },
        };
        this.defaultParams = defaultParams || {};
        if (config.options) {
            config.options.dateformat && this.config.options ? (this.config.options = { dateformat: config.options.dateformat }) : false;
            config.options.levels && this.config.options ? (this.config.options = { levels: config.options.levels }) : false;
        }
        if (config.terminal && config.terminal.use) {
            config.terminal.colors && this.config.terminal
                ? (this.config.terminal = __assign(__assign({}, this.config.terminal), { colors: config.terminal.colors }))
                : false;
            config.terminal.levels && this.config.terminal
                ? (this.config.terminal = __assign(__assign({}, this.config.terminal), { levels: config.terminal.levels }))
                : false;
        }
        if (config.file && config.file.use) {
            var pinoConfig = {
                transport: {
                    target: 'pino-pretty',
                    options: {
                        colorize: config.file.colorize === undefined ? (_a = this.config.file) === null || _a === void 0 ? void 0 : _a.colorize : config.file.colorize,
                        destination: config.file.dir,
                        translateTime: true,
                        messageFormat: true,
                    },
                },
            };
            this.config.file = config.file;
            this.pinoInstance = (0, pino_1.default)(pinoConfig);
        }
    }
    ErisLogger.prototype.formatDate = function (timestamp) {
        var date = new Date(timestamp || new Date().getTime());
        if (this.config.options && typeof this.config.options.dateformat !== 'boolean') {
            return date.toLocaleDateString('ru-RU', this.config.options.dateformat);
        }
        else
            return date.getTime().toString();
    };
    ErisLogger.prototype.formatString = function (_a) {
        var title = _a.title, message = _a.message, params = _a.params, error = _a.error, timestamp = _a.timestamp;
        var header = "[TIME]: ".concat(this.formatDate(timestamp));
        var bodyTitle = "[TITLE]: ".concat(title);
        var bodyMessage = "[MESSAGE]: ".concat(message);
        var bodyParams = "[PARAMS]: ".concat(JSON.stringify(params || null));
        var bodyError = "[ERROR]: ".concat(JSON.stringify(error) || null);
        return [' ', header, title ? bodyTitle : '', bodyMessage, bodyParams, bodyError].filter(function (item) { return !!item; }).join('\n');
    };
    ErisLogger.prototype.setDefaultParams = function (params) {
        return (this.defaultParams = Object.assign(this.defaultParams, params));
    };
    ErisLogger.prototype.isTerminalLogger = function (logLevel, callback) {
        var _a, _b;
        if (this.config.terminal && this.config.terminal.use && ((_b = (_a = this.config.terminal) === null || _a === void 0 ? void 0 : _a.levels) === null || _b === void 0 ? void 0 : _b.indexOf(logLevel)) !== -1) {
            var color = 'white';
            if (this.config.terminal.colors && this.config.terminal.colors[logLevel]) {
                color = this.config.terminal.colors[logLevel] || 'white';
            }
            callback(color);
        }
    };
    ErisLogger.prototype.isFileLogger = function (logLevel, callback) {
        var _a, _b;
        if (this.config.file && this.config.file.use && this.pinoInstance && ((_b = (_a = this.config.file) === null || _a === void 0 ? void 0 : _a.levels) === null || _b === void 0 ? void 0 : _b.indexOf(logLevel)) !== -1)
            return callback();
    };
    ErisLogger.prototype.info = function (props) {
        var _this = this;
        var _a, _b;
        var logLevel = 'info';
        if (((_b = (_a = this.config.options) === null || _a === void 0 ? void 0 : _a.levels) === null || _b === void 0 ? void 0 : _b.indexOf(logLevel)) === -1)
            return;
        props.params = props.params ? props.params : this.defaultParams;
        this.isTerminalLogger(logLevel, function (color) { return console.info(clc[color](_this.formatString(props))); });
        this.isFileLogger(logLevel, function () { var _a; return (_a = _this.pinoInstance) === null || _a === void 0 ? void 0 : _a.info(props); });
    };
    ErisLogger.prototype.alert = function (props) {
        var _this = this;
        var _a, _b;
        var logLevel = 'alert';
        if (((_b = (_a = this.config.options) === null || _a === void 0 ? void 0 : _a.levels) === null || _b === void 0 ? void 0 : _b.indexOf(logLevel)) === -1)
            return;
        props.params = props.params ? props.params : this.defaultParams;
        this.isTerminalLogger(logLevel, function (color) { return console.log(clc[color](_this.formatString(props))); });
        this.isFileLogger(logLevel, function () { var _a; return (_a = _this.pinoInstance) === null || _a === void 0 ? void 0 : _a.info(props); });
    };
    ErisLogger.prototype.debug = function (props) {
        var _this = this;
        var _a, _b;
        var logLevel = 'debug';
        if (((_b = (_a = this.config.options) === null || _a === void 0 ? void 0 : _a.levels) === null || _b === void 0 ? void 0 : _b.indexOf(logLevel)) === -1)
            return;
        props.params = props.params ? props.params : this.defaultParams;
        this.isTerminalLogger(logLevel, function (color) { return console.debug(clc[color](_this.formatString(props))); });
        this.isFileLogger(logLevel, function () { var _a; return (_a = _this.pinoInstance) === null || _a === void 0 ? void 0 : _a.debug(props); });
    };
    ErisLogger.prototype.warning = function (props) {
        var _this = this;
        var _a, _b;
        var logLevel = 'warning';
        if (((_b = (_a = this.config.options) === null || _a === void 0 ? void 0 : _a.levels) === null || _b === void 0 ? void 0 : _b.indexOf(logLevel)) === -1)
            return;
        props.params = props.params ? props.params : this.defaultParams;
        this.isTerminalLogger(logLevel, function (color) { return console.warn(clc[color](_this.formatString(__assign({}, props)))); });
        this.isFileLogger(logLevel, function () { var _a; return (_a = _this.pinoInstance) === null || _a === void 0 ? void 0 : _a.warn(__assign(__assign({}, props), { params: _this.defaultParams })); });
    };
    ErisLogger.prototype.error = function (props) {
        var _this = this;
        var _a, _b;
        var logLevel = 'error';
        if (((_b = (_a = this.config.options) === null || _a === void 0 ? void 0 : _a.levels) === null || _b === void 0 ? void 0 : _b.indexOf(logLevel)) === -1)
            return;
        props.params = props.params ? props.params : this.defaultParams;
        this.isTerminalLogger(logLevel, function (color) { return console.error(clc[color](_this.formatString(__assign({}, props)))); });
        this.isFileLogger(logLevel, function () { var _a; return (_a = _this.pinoInstance) === null || _a === void 0 ? void 0 : _a.error(__assign(__assign({}, props), { params: _this.defaultParams })); });
    };
    ErisLogger.prototype.critical = function (props) {
        var _this = this;
        var _a, _b;
        var logLevel = 'critical';
        if (((_b = (_a = this.config.options) === null || _a === void 0 ? void 0 : _a.levels) === null || _b === void 0 ? void 0 : _b.indexOf(logLevel)) === -1)
            return;
        this.isTerminalLogger(logLevel, function (color) { return console.error(clc[color](_this.formatString(__assign({}, props)))); });
        this.isFileLogger(logLevel, function () { var _a; return (_a = _this.pinoInstance) === null || _a === void 0 ? void 0 : _a.fatal(__assign(__assign({}, props), { params: _this.defaultParams })); });
    };
    return ErisLogger;
}());
exports.ErisLogger = ErisLogger;
