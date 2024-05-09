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
var terminalLogger_1 = require("./terminalLogger");
var fileLogger_1 = require("./fileLogger");
var ErisLogger = /** @class */ (function () {
    function ErisLogger(config, defaultParams) {
        var _a, _b, _c, _d, _e;
        this.levels = ['info', 'alert', 'debug', 'warning', 'error', 'fatal'];
        this.dateformat = {
            year: 'numeric',
            month: 'numeric',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric',
        };
        this.defaultParams = defaultParams || {};
        if ((_a = config.options) === null || _a === void 0 ? void 0 : _a.dateformat)
            this.dateformat = (_b = config === null || config === void 0 ? void 0 : config.options) === null || _b === void 0 ? void 0 : _b.dateformat;
        if ((_c = config.terminal) === null || _c === void 0 ? void 0 : _c.use)
            this.terminal = new terminalLogger_1.TerminalLogger(__assign(__assign({}, config === null || config === void 0 ? void 0 : config.terminal), { dateFormat: this.dateformat }));
        if ((_d = config.file) === null || _d === void 0 ? void 0 : _d.use)
            this.file = new fileLogger_1.FileLogger(config === null || config === void 0 ? void 0 : config.file);
        if ((_e = config.options) === null || _e === void 0 ? void 0 : _e.levels)
            this.levels = config.options.levels;
    }
    ErisLogger.prototype.setDefaultParams = function (params) {
        return (this.defaultParams = Object.assign(this.defaultParams, params));
    };
    ErisLogger.prototype.info = function (props) {
        var _a, _b;
        var logLevel = 'info';
        if (!this.levels.includes(logLevel))
            return;
        props.params = this.setDefaultParams(props.params);
        (_a = this.terminal) === null || _a === void 0 ? void 0 : _a.print(logLevel, props);
        (_b = this.file) === null || _b === void 0 ? void 0 : _b.print(logLevel, props);
    };
    ErisLogger.prototype.alert = function (props) {
        var _a, _b;
        var logLevel = 'alert';
        if (!this.levels.includes(logLevel))
            return;
        props.params = this.setDefaultParams(props.params);
        (_a = this.terminal) === null || _a === void 0 ? void 0 : _a.print(logLevel, props);
        (_b = this.file) === null || _b === void 0 ? void 0 : _b.print(logLevel, props);
    };
    ErisLogger.prototype.debug = function (props) {
        var _a, _b;
        var logLevel = 'debug';
        if (!this.levels.includes(logLevel))
            return;
        props.params = this.setDefaultParams(props.params);
        (_a = this.terminal) === null || _a === void 0 ? void 0 : _a.print(logLevel, props);
        (_b = this.file) === null || _b === void 0 ? void 0 : _b.print(logLevel, props);
    };
    ErisLogger.prototype.warning = function (props) {
        var _a, _b;
        var logLevel = 'warning';
        if (!this.levels.includes(logLevel))
            return;
        (_a = this.terminal) === null || _a === void 0 ? void 0 : _a.print(logLevel, props);
        (_b = this.file) === null || _b === void 0 ? void 0 : _b.print(logLevel, props);
    };
    ErisLogger.prototype.error = function (props) {
        var _a, _b;
        var logLevel = 'error';
        if (!this.levels.includes(logLevel))
            return;
        (_a = this.terminal) === null || _a === void 0 ? void 0 : _a.print(logLevel, props);
        (_b = this.file) === null || _b === void 0 ? void 0 : _b.print(logLevel, props);
    };
    ErisLogger.prototype.fatal = function (props) {
        var _a, _b;
        var logLevel = 'fatal';
        if (!this.levels.includes(logLevel))
            return;
        (_a = this.terminal) === null || _a === void 0 ? void 0 : _a.print(logLevel, props);
        (_b = this.file) === null || _b === void 0 ? void 0 : _b.print(logLevel, props);
    };
    return ErisLogger;
}());
exports.ErisLogger = ErisLogger;
