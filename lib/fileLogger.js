"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileLogger = void 0;
var pino_1 = require("pino");
var FileLogger = /** @class */ (function () {
    function FileLogger(config) {
        this.use = false;
        this.pinoInstance = null;
        this.dir = '/logs/logs.log';
        this.levels = ['info', 'alert', 'debug', 'warning', 'error', 'fatal'];
        this.colorize = true;
        this.use = config.use;
        if (config.options.dir)
            this.dir = config.options.dir;
        if (config.options.levels)
            this.levels = config.options.levels;
        if (config.options.colorize)
            this.colorize = config.options.colorize;
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
