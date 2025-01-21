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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileAdapter = void 0;
var path = require("node:path");
var fs = require("node:fs");
var log_interface_1 = require("../interfaces/log.interface");
var FileAdapter = /** @class */ (function () {
    function FileAdapter(config) {
        var _a;
        this.queue = [];
        this.isWriting = false;
        this.config = {
            enable: true,
            level: log_interface_1.LogLevel.Info,
            destination: 'logs/logs.json',
        };
        this.config = __assign(__assign({}, this.config), config);
        if (!this.config.enable)
            return;
        this.stream = fs.createWriteStream((_a = this.config) === null || _a === void 0 ? void 0 : _a.destination, { flags: 'a' });
        this.ensureDirectoryExists(this.config.destination);
        process.on('exit', this.close.bind(null, { cleanup: true }));
        process.on('SIGINT', this.close.bind(null, { exit: true }));
        process.on('SIGUSR1', this.close.bind(null, { exit: true }));
        process.on('SIGUSR2', this.close.bind(null, { exit: true }));
        process.on('uncaughtException', this.close.bind(null, { exit: true }));
    }
    FileAdapter.prototype.Log = function (log) {
        if (!this.config.enable || !log.isEnabled(this.config.level) || !this.stream)
            return;
        this.queue.push(log);
        this.processQueue();
    };
    FileAdapter.prototype.Format = function (log) {
        var _a, _b, _c, _d, _e, _f;
        var level = log.level.toUpperCase() || 'UNSELECTED';
        var date = new Date().toISOString();
        var message = log.message;
        if (((_a = log.data) === null || _a === void 0 ? void 0 : _a.name) && ((_b = log.data) === null || _b === void 0 ? void 0 : _b.withName)) {
            message = "[".concat((_c = log.data) === null || _c === void 0 ? void 0 : _c.name, "]: ").concat(message);
        }
        var error = '';
        if ((_d = log.data) === null || _d === void 0 ? void 0 : _d.error)
            error = "err=".concat((_e = log.data) === null || _e === void 0 ? void 0 : _e.error.message);
        return {
            ts: date,
            level: level,
            msg: message,
            err: error,
            fields: (_f = log.data) === null || _f === void 0 ? void 0 : _f.fields,
        };
    };
    FileAdapter.prototype.processQueue = function () {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var log;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (this.isWriting || this.queue.length === 0)
                            return [2 /*return*/];
                        this.isWriting = true;
                        log = this.queue.shift();
                        if (!log) {
                            this.isWriting = false;
                            return [2 /*return*/];
                        }
                        if (!!((_a = this === null || this === void 0 ? void 0 : this.stream) === null || _a === void 0 ? void 0 : _a.write(JSON.stringify(this.Format(log)) + '\n'))) return [3 /*break*/, 2];
                        return [4 /*yield*/, new Promise(function (resolve) { var _a; return (_a = _this === null || _this === void 0 ? void 0 : _this.stream) === null || _a === void 0 ? void 0 : _a.once('drain', resolve); })];
                    case 1:
                        _b.sent();
                        _b.label = 2;
                    case 2:
                        this.isWriting = false;
                        this.processQueue();
                        return [2 /*return*/];
                }
            });
        });
    };
    FileAdapter.prototype.ensureDirectoryExists = function (filePath) {
        var dir = path.dirname(filePath);
        if (dir == '.')
            return;
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }
    };
    FileAdapter.prototype.close = function () {
        var _a;
        (_a = this === null || this === void 0 ? void 0 : this.stream) === null || _a === void 0 ? void 0 : _a.end();
    };
    return FileAdapter;
}());
exports.FileAdapter = FileAdapter;
