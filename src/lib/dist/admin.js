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
        while (_) try {
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
exports.__esModule = true;
exports.health = exports.saveLineSecrets = exports.createBot = exports.listBots = exports.login = exports.auth = void 0;
// src/lib/admin.ts
var BASE = import.meta.env.VITE_API_BASE || "http://127.0.0.1:3000";
var TENANT = import.meta.env.VITE_TENANT || "bn9";
exports.auth = {
    get token() { return localStorage.getItem("BN9_ADMIN_JWT") || ""; },
    set token(v) { localStorage.setItem("BN9_ADMIN_JWT", v); },
    clear: function () { localStorage.removeItem("BN9_ADMIN_JWT"); }
};
function h() {
    var headers = { "x-tenant": TENANT };
    if (exports.auth.token)
        headers.Authorization = "Bearer " + exports.auth.token;
    return headers;
}
function j(path, init) {
    return __awaiter(this, void 0, Promise, function () {
        var r, _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0: return [4 /*yield*/, fetch("" + BASE + path, __assign(__assign({}, init), { headers: __assign(__assign({ "Content-Type": "application/json" }, h()), ((init === null || init === void 0 ? void 0 : init.headers) || {})) }))];
                case 1:
                    r = _c.sent();
                    if (!!r.ok) return [3 /*break*/, 3];
                    _a = Error.bind;
                    _b = r.status + " ";
                    return [4 /*yield*/, r.text()["catch"](function () { return ""; })];
                case 2: throw new (_a.apply(Error, [void 0, _b + (_c.sent())]))();
                case 3: return [2 /*return*/, r.json()];
            }
        });
    });
}
function login(email, password) {
    return __awaiter(this, void 0, void 0, function () {
        var res, data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetch(BASE + "/api/auth/login", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ email: email, password: password })
                    })];
                case 1:
                    res = _a.sent();
                    if (!res.ok)
                        throw new Error("login_failed: " + res.status);
                    return [4 /*yield*/, res.json()];
                case 2:
                    data = _a.sent();
                    exports.auth.token = data.token;
                    return [2 /*return*/, data];
            }
        });
    });
}
exports.login = login;
function listBots() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, j("/api/admin/bots")];
        });
    });
}
exports.listBots = listBots;
function createBot(name, provider) {
    if (provider === void 0) { provider = "line"; }
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, j("/api/admin/bots", {
                    method: "POST",
                    body: JSON.stringify({ name: name, provider: provider, isActive: true })
                })];
        });
    });
}
exports.createBot = createBot;
function saveLineSecrets(botId, channelSecret, channelAccessToken) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, j("/api/admin/bots/" + encodeURIComponent(botId) + "/secrets", {
                    method: "PUT",
                    body: JSON.stringify({ channelSecret: channelSecret, channelAccessToken: channelAccessToken })
                })];
        });
    });
}
exports.saveLineSecrets = saveLineSecrets;
function health() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, j("/api/health")];
        });
    });
}
exports.health = health;
