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
exports.Entry = void 0;
var log_interface_1 = require("./interfaces/log.interface");
var Entry = /** @class */ (function () {
    function Entry(logger, data) {
        this.logger = logger;
        this.data = data;
    }
    Entry.prototype.log = function (log) {
        log.data = this.data;
        this.logger.log(log);
        this.data.error = undefined;
        this.data.fields = undefined;
    };
    Entry.prototype.withFields = function (fields) {
        this.data.fields = fields;
        return this;
    };
    Entry.prototype.withName = function (name) {
        this.data.name = name;
        this.data.withName = true;
        return this;
    };
    Entry.prototype.withError = function (error) {
        this.data.error = error;
        return this;
    };
    Entry.prototype.debug = function () {
        var messages = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            messages[_i] = arguments[_i];
        }
        this.log(log_interface_1.newDefaultLog.apply(void 0, __spreadArray([log_interface_1.LogLevel.Debug], messages, false)));
    };
    Entry.prototype.info = function () {
        var messages = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            messages[_i] = arguments[_i];
        }
        this.log(log_interface_1.newDefaultLog.apply(void 0, __spreadArray([log_interface_1.LogLevel.Info], messages, false)));
    };
    Entry.prototype.alert = function () {
        var messages = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            messages[_i] = arguments[_i];
        }
        this.log(log_interface_1.newDefaultLog.apply(void 0, __spreadArray([log_interface_1.LogLevel.Alert], messages, false)));
    };
    Entry.prototype.warn = function () {
        var messages = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            messages[_i] = arguments[_i];
        }
        this.log(log_interface_1.newDefaultLog.apply(void 0, __spreadArray([log_interface_1.LogLevel.Warn], messages, false)));
    };
    Entry.prototype.error = function () {
        var messages = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            messages[_i] = arguments[_i];
        }
        this.log(log_interface_1.newDefaultLog.apply(void 0, __spreadArray([log_interface_1.LogLevel.Error], messages, false)));
    };
    Entry.prototype.fatal = function () {
        var messages = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            messages[_i] = arguments[_i];
        }
        this.log(log_interface_1.newDefaultLog.apply(void 0, __spreadArray([log_interface_1.LogLevel.Fatal], messages, false)));
    };
    return Entry;
}());
exports.Entry = Entry;
