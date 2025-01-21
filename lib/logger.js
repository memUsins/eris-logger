"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErisLogger = void 0;
var log_interface_1 = require("./interfaces/log.interface");
var console_adapter_1 = require("./adapters/console.adapter");
var entry_1 = require("./entry");
var ErisLogger = /** @class */ (function () {
    function ErisLogger(adapters) {
        this.adapters = [];
        if (!Array.isArray(adapters))
            adapters = [];
        if (!adapters.length)
            adapters.push(new console_adapter_1.ConsoleAdapter());
        this.adapters = adapters;
    }
    ErisLogger.prototype.log = function (log) {
        this.adapters.forEach(function (adapter) { return adapter.Log(log); });
    };
    ErisLogger.prototype.debug = function () {
        var message = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            message[_i] = arguments[_i];
        }
        this.log(log_interface_1.newDefaultLog.apply(void 0, __spreadArray([log_interface_1.LogLevel.Debug], message, false)));
    };
    ErisLogger.prototype.info = function () {
        var message = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            message[_i] = arguments[_i];
        }
        this.log(log_interface_1.newDefaultLog.apply(void 0, __spreadArray([log_interface_1.LogLevel.Info], message, false)));
    };
    ErisLogger.prototype.alert = function () {
        var message = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            message[_i] = arguments[_i];
        }
        this.log(log_interface_1.newDefaultLog.apply(void 0, __spreadArray([log_interface_1.LogLevel.Alert], message, false)));
    };
    ErisLogger.prototype.warn = function () {
        var message = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            message[_i] = arguments[_i];
        }
        this.log(log_interface_1.newDefaultLog.apply(void 0, __spreadArray([log_interface_1.LogLevel.Warn], message, false)));
    };
    ErisLogger.prototype.error = function () {
        var message = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            message[_i] = arguments[_i];
        }
        this.log(log_interface_1.newDefaultLog.apply(void 0, __spreadArray([log_interface_1.LogLevel.Error], message, false)));
    };
    ErisLogger.prototype.fatal = function () {
        var message = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            message[_i] = arguments[_i];
        }
        this.log(log_interface_1.newDefaultLog.apply(void 0, __spreadArray([log_interface_1.LogLevel.Fatal], message, false)));
    };
    ErisLogger.prototype.withFields = function (fields) {
        return new entry_1.Entry(this, { fields: fields });
    };
    ErisLogger.prototype.withName = function (name) {
        return new entry_1.Entry(this, { name: name, withName: true });
    };
    ErisLogger.prototype.withError = function (error) {
        return new entry_1.Entry(this, { error: error });
    };
    return ErisLogger;
}());
exports.ErisLogger = ErisLogger;
