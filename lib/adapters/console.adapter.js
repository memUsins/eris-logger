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
exports.ConsoleAdapter = void 0;
var clc = require("chalk");
var interfaces_1 = require("../interfaces");
var ConsoleAdapter = /** @class */ (function () {
    function ConsoleAdapter(config) {
        this.config = {
            enable: true,
            level: interfaces_1.LogLevel.Info,
        };
        this.config = __assign(__assign(__assign({}, this.config), config), { colors: this.setDefaultColorsConfig(config === null || config === void 0 ? void 0 : config.colors) });
    }
    ConsoleAdapter.prototype.Log = function (log) {
        if (!this.config.enable || !log.isEnabled(this.config.level))
            return;
        console.info(this.Format(log));
    };
    ConsoleAdapter.prototype.Format = function (log) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o;
        if (!this.config.colors)
            return '';
        var levelColor = (_b = (_a = this.config) === null || _a === void 0 ? void 0 : _a.colors) === null || _b === void 0 ? void 0 : _b.levelColors[log.level];
        var level = clc[levelColor](log.level.toUpperCase() || 'UNSELECTED');
        var date = clc[(_c = this.config.colors) === null || _c === void 0 ? void 0 : _c.dateColor](new Date().toISOString());
        var message = clc[(_d = this.config.colors) === null || _d === void 0 ? void 0 : _d.messageColor](log.message);
        var name = '';
        if (((_e = log.data) === null || _e === void 0 ? void 0 : _e.name) && ((_f = log.data) === null || _f === void 0 ? void 0 : _f.withName)) {
            name = clc[levelColor]("[".concat((_g = log.data) === null || _g === void 0 ? void 0 : _g.name, "]:"));
        }
        var error = '';
        if ((_h = log.data) === null || _h === void 0 ? void 0 : _h.error)
            error = clc[levelColor]("err=".concat((_j = log.data) === null || _j === void 0 ? void 0 : _j.error.message));
        var fieldsArray = [];
        var fields = '';
        if ((_k = log.data) === null || _k === void 0 ? void 0 : _k.fields) {
            for (var _i = 0, _p = Object.keys((_l = log.data) === null || _l === void 0 ? void 0 : _l.fields); _i < _p.length; _i++) {
                var key = _p[_i];
                fieldsArray.push("".concat(key, "=").concat(JSON.stringify((_o = (_m = log.data) === null || _m === void 0 ? void 0 : _m.fields) === null || _o === void 0 ? void 0 : _o[key])));
            }
            fields = clc[levelColor](fieldsArray.join(' '));
        }
        return [date, level, name, message, error, fields].filter(Boolean).join(' ');
    };
    ConsoleAdapter.prototype.setDefaultColorsConfig = function (config) {
        var _a, _b;
        if (!config) {
            return {
                dateColor: 'blackBright',
                messageColor: 'white',
                levelColors: this.setDefaultLevelsColorConfig(),
            };
        }
        return {
            dateColor: (_a = config === null || config === void 0 ? void 0 : config.dateColor) !== null && _a !== void 0 ? _a : 'blackBright',
            messageColor: (_b = config === null || config === void 0 ? void 0 : config.messageColor) !== null && _b !== void 0 ? _b : 'white',
            levelColors: this.setDefaultLevelsColorConfig(config === null || config === void 0 ? void 0 : config.levelColors),
        };
    };
    ConsoleAdapter.prototype.setDefaultLevelsColorConfig = function (config) {
        var _a;
        var defaultColors = (_a = {},
            _a[interfaces_1.LogLevel.Debug] = 'gray',
            _a[interfaces_1.LogLevel.Info] = 'cyan',
            _a[interfaces_1.LogLevel.Alert] = 'cyanBright',
            _a[interfaces_1.LogLevel.Warn] = 'yellowBright',
            _a[interfaces_1.LogLevel.Error] = 'red',
            _a[interfaces_1.LogLevel.Fatal] = 'redBright',
            _a[interfaces_1.LogLevel.Unselected] = 'black',
            _a);
        return __assign(__assign({}, defaultColors), config);
    };
    return ConsoleAdapter;
}());
exports.ConsoleAdapter = ConsoleAdapter;
