"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileLogger = void 0;
var pino_1 = require("pino");
var FileLogger = /** @class */ (function () {
    function FileLogger(config) {
        var _a, _b, _c, _d, _e, _f;
        this.use = false;
        this.pinoInstance = null;
        this.dir = '/logs/logs.log';
        this.levels = ['info', 'alert', 'debug', 'warning', 'error', 'fatal'];
        this.colorize = true;
        this.use = config === null || config === void 0 ? void 0 : config.use;
        if ((_a = config === null || config === void 0 ? void 0 : config.options) === null || _a === void 0 ? void 0 : _a.dir)
            this.dir = (_b = config === null || config === void 0 ? void 0 : config.options) === null || _b === void 0 ? void 0 : _b.dir;
        if ((_c = config === null || config === void 0 ? void 0 : config.options) === null || _c === void 0 ? void 0 : _c.levels)
            this.levels = (_d = config === null || config === void 0 ? void 0 : config.options) === null || _d === void 0 ? void 0 : _d.levels;
        if ((_e = config === null || config === void 0 ? void 0 : config.options) === null || _e === void 0 ? void 0 : _e.colorize)
            this.colorize = (_f = config === null || config === void 0 ? void 0 : config.options) === null || _f === void 0 ? void 0 : _f.colorize;
        var pinoConfig = {
            transport: {
                target: 'pino-pretty',
                options: {
                    colorize: this.colorize,
                    destination: this.dir,
                    translateTime: true,
                    messageFormat: true,
                },
            },
        };
        this.pinoInstance = (0, pino_1.default)(pinoConfig);
    }
    FileLogger.prototype.print = function (logLevel, props) {
        if (!logLevel)
            return;
        if (!this.use)
            return;
        if (!this.pinoInstance)
            return;
        if (!this.levels.includes(logLevel))
            return;
        switch (logLevel) {
            case 'info':
            case 'alert':
                this.pinoInstance.info(props);
                break;
            case 'debug':
                this.pinoInstance.debug(props);
                break;
            case 'warning':
                this.pinoInstance.warn(props);
                break;
            case 'error':
                this.pinoInstance.error(props);
                break;
            case 'fatal':
                this.pinoInstance.fatal(props);
                break;
        }
    };
    return FileLogger;
}());
exports.FileLogger = FileLogger;
