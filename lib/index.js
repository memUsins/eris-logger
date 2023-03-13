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
exports.MyLogger = void 0;
var graylog2_1 = require("graylog2");
// @ts-ignore
var pino_1 = require("pino");
var cli_color_1 = require("cli-color");
var MyLogger = /** @class */ (function () {
    function MyLogger(config, defaultParams) {
        this.config = config;
        this.defaultParams = defaultParams || {};
        if (config.graylog)
            this.graylogInstance = new graylog2_1.graylog(config.graylog);
        if (config.file) {
            var pinoConfig = {
                transport: {
                    target: 'pino-pretty',
                    options: {
                        colorize: false,
                        destination: config.file.dir,
                        translateTime: true,
                        messageFormat: true,
                    },
                },
            };
            this.pinoInstance = (0, pino_1.default)(pinoConfig);
        }
    }
    MyLogger.prototype.formatDate = function (timestamp) {
        var date = new Date(timestamp || new Date().getTime());
        return date.toLocaleDateString('ru-RU', this.config.dateformat || {
            year: 'numeric',
            month: 'numeric',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric',
        });
    };
    MyLogger.prototype.formatString = function (_a) {
        var title = _a.title, message = _a.message, params = _a.params, error = _a.error, timestamp = _a.timestamp;
        var header = "[TIME   ]: ".concat(this.formatDate(timestamp));
        var bodyTitle = "[TITLE  ]: ".concat(title);
        var bodyMessage = "[MESSAGE]: ".concat(message);
        var bodyParams = "[PARAMS ]: ".concat(JSON.stringify(params || null));
        var bodyError = "[ERROR  ]: ".concat(error || null);
        return ['', header, bodyTitle, bodyMessage, bodyParams, bodyError].join('\n');
    };
    MyLogger.prototype.setDefaultParams = function (params) {
        this.defaultParams = params;
    };
    MyLogger.prototype.info = function (_a) {
        var title = _a.title, message = _a.message, params = _a.params, timestamp = _a.timestamp;
        params = __assign(__assign({}, this.defaultParams), params);
        if (this.pinoInstance)
            this.pinoInstance.info({ title: title, message: message, params: params, timestamp: timestamp });
        if (this.graylogInstance)
            this.graylogInstance.info({ title: title, message: message, params: params, timestamp: timestamp });
        if (this.config.terminal)
            console.info((0, cli_color_1.white)(this.formatString({ title: title, message: message, params: params, timestamp: timestamp })));
    };
    MyLogger.prototype.alert = function (_a) {
        var title = _a.title, message = _a.message, params = _a.params, timestamp = _a.timestamp;
        params = __assign(__assign({}, this.defaultParams), params);
        if (this.pinoInstance)
            this.pinoInstance.info({ title: title, message: message, params: params, timestamp: timestamp });
        if (this.graylogInstance)
            this.graylogInstance.alert({ title: title, message: message, params: params, timestamp: timestamp });
        if (this.config.terminal)
            console.log((0, cli_color_1.white)(this.formatString({ title: title, message: message, params: params, timestamp: timestamp })));
    };
    MyLogger.prototype.debug = function (_a) {
        var title = _a.title, message = _a.message, params = _a.params, timestamp = _a.timestamp;
        params = __assign(__assign({}, this.defaultParams), params);
        if (this.pinoInstance)
            this.pinoInstance.debug({ title: title, message: message, params: params, timestamp: timestamp });
        if (this.graylogInstance)
            this.graylogInstance.debug({ title: title, message: message, params: params, timestamp: timestamp });
        if (this.config.terminal)
            console.debug((0, cli_color_1.blackBright)(this.formatString({ title: title, message: message, params: params, timestamp: timestamp })));
    };
    MyLogger.prototype.warning = function (_a) {
        var title = _a.title, message = _a.message, error = _a.error, timestamp = _a.timestamp;
        if (this.pinoInstance)
            this.pinoInstance.warn({ title: title, message: message, error: error, timestamp: timestamp });
        if (this.graylogInstance)
            this.graylogInstance.warning({ title: title, message: message, error: error, timestamp: timestamp });
        if (this.config.terminal)
            console.warn((0, cli_color_1.yellowBright)(this.formatString({ title: title, message: message, error: error, timestamp: timestamp })));
    };
    MyLogger.prototype.error = function (_a) {
        var title = _a.title, message = _a.message, error = _a.error, timestamp = _a.timestamp;
        if (this.pinoInstance)
            this.pinoInstance.error({ title: title, message: message, error: error, timestamp: timestamp });
        if (this.graylogInstance)
            this.graylogInstance.error({ title: title, message: message, error: error, timestamp: timestamp });
        if (this.config.terminal)
            console.error((0, cli_color_1.red)(this.formatString({ title: title, message: message, error: error, timestamp: timestamp })));
    };
    MyLogger.prototype.critical = function (_a) {
        var title = _a.title, message = _a.message, error = _a.error, timestamp = _a.timestamp;
        if (this.pinoInstance)
            this.pinoInstance.fatal({ title: title, message: message, error: error, timestamp: timestamp });
        if (this.graylogInstance)
            this.graylogInstance.critical({ title: title, message: message, error: error, timestamp: timestamp });
        if (this.config.terminal)
            console.error((0, cli_color_1.bgRed)(this.formatString({ title: title, message: message, error: error, timestamp: timestamp })));
    };
    return MyLogger;
}());
exports.MyLogger = MyLogger;
