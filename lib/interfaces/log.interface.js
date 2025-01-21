"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.newDefaultLog = exports.Log = exports.logToInt = exports.LogLevel = void 0;
var LogLevel;
(function (LogLevel) {
    LogLevel["Debug"] = "Debug";
    LogLevel["Info"] = "Info";
    LogLevel["Alert"] = "Alert";
    LogLevel["Warn"] = "Warn";
    LogLevel["Error"] = "Error";
    LogLevel["Fatal"] = "Fatal";
    LogLevel["Unselected"] = "Unselected";
})(LogLevel = exports.LogLevel || (exports.LogLevel = {}));
var logToInt = function (level) {
    switch (level) {
        case LogLevel.Debug:
            return 0;
        case LogLevel.Info:
            return 1;
        case LogLevel.Alert:
            return 2;
        case LogLevel.Warn:
            return 3;
        case LogLevel.Error:
            return 4;
        case LogLevel.Fatal:
            return 5;
        default:
            return -1;
    }
};
exports.logToInt = logToInt;
var Log = /** @class */ (function () {
    function Log(level, message, data) {
        this.level = level;
        this.message = message;
        this.data = data;
    }
    Log.prototype.isEnabled = function (level) {
        return (0, exports.logToInt)(level) <= (0, exports.logToInt)(this.level);
    };
    return Log;
}());
exports.Log = Log;
var newDefaultLog = function (level) {
    var message = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        message[_i - 1] = arguments[_i];
    }
    return new Log(level, message.join(' '));
};
exports.newDefaultLog = newDefaultLog;
