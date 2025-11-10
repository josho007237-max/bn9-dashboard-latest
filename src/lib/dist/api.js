"use strict";
// src/lib/api.ts
/// <reference types="vite/client" />
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
exports.api = exports.devLinePing = exports.getRecentByBot = exports.getRangeByBot = exports.getDailyByBot = exports.updateBotSecrets = exports.getBotSecrets = exports.updateBotMeta = exports.getBot = exports.initBot = exports.getBots = exports.getApiBase = exports.logoutAndRedirect = exports.login = exports.API = exports.clearToken = exports.setToken = void 0;
var axios_1 = require("axios");
/* ================================ Base ================================ */
// ถ้า VITE_API_BASE ว่าง จะใช้ path แบบ relative "/api/*"
var API_BASE = (import.meta.env.VITE_API_BASE || "").replace(/\/+$/, "");
var TENANT = import.meta.env.VITE_TENANT || "bn9";
var TOKEN_KEY = "BN9_TOKEN";
// dev only: x-admin-code (ปิดไว้)
var USE_ADMIN_CODE_DEV = false;
var ADMIN_CODE = "dev123";
/* ======================= Token helpers (local) ======================= */
function getToken() {
    try {
        return localStorage.getItem(TOKEN_KEY) || "";
    }
    catch (_a) {
        return "";
    }
}
function setToken(t) {
    try {
        localStorage.setItem(TOKEN_KEY, t);
    }
    catch (_a) { }
}
exports.setToken = setToken;
function clearToken() {
    try {
        localStorage.removeItem(TOKEN_KEY);
    }
    catch (_a) { }
}
exports.clearToken = clearToken;
var accessToken = getToken();
/* ================================ Axios ================================ */
exports.API = axios_1["default"].create({ baseURL: API_BASE || "" });
// แนบ Authorization + x-tenant (+ x-admin-code ถ้าเปิด)
exports.API.interceptors.request.use(function (cfg) {
    var _a;
    var headers = ((_a = cfg.headers) !== null && _a !== void 0 ? _a : {});
    accessToken || ;
    getToken();
    if (accessToken)
        headers.Authorization = "Bearer " + accessToken;
    headers["x-tenant"] = TENANT;
    if (USE_ADMIN_CODE_DEV)
        headers["x-admin-code"] = ADMIN_CODE;
    cfg.headers = headers;
    return cfg;
});
// จัดการ 401: ล้าง token แล้วเด้งไป /login
exports.API.interceptors.response.use(function (r) { return r; }, function (err) {
    var _a;
    if (((_a = err.response) === null || _a === void 0 ? void 0 : _a.status) === 401) {
        clearToken();
        accessToken = "";
        var loc = globalThis.location;
        if (loc && loc.pathname !== "/login")
            loc.href = "/login";
    }
    return Promise.reject(err);
});
/* ================================= Auth ================================ */
function login(email, password) {
    return __awaiter(this, void 0, void 0, function () {
        var r, data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, exports.API.post("/api/auth/login", { email: email, password: password })];
                case 1:
                    r = _a.sent();
                    data = r.data;
                    if (!(data === null || data === void 0 ? void 0 : data.token))
                        throw new Error("login failed: empty token");
                    setToken(data.token);
                    accessToken = data.token;
                    return [2 /*return*/, data];
            }
        });
    });
}
exports.login = login;
function logoutAndRedirect() {
    clearToken();
    accessToken = "";
    var loc = globalThis.location;
    if (loc)
        loc.href = "/login";
}
exports.logoutAndRedirect = logoutAndRedirect;
function getApiBase() {
    return API_BASE || "/api";
}
exports.getApiBase = getApiBase;
/* ============================== Bots APIs ============================== */
/* Back-end ที่ใช้จริงตอนนี้:
   - GET    /api/bots                      (สาธารณะ: รายการ/อ่าน)
   - GET    /api/bots/:id
   - POST   /api/bots/init                 (สร้างตัวอย่าง dev)
   - GET    /api/admin/bots/:id/secrets    (masked)   ⚠️ Admin (ต้อง JWT)
   - POST   /api/admin/bots/:id/secrets    (upsert)   ⚠️ Admin (ต้อง JWT)
   - PATCH  /api/admin/bots/:id            (meta)     ⚠️ Admin (ต้อง JWT)
*/
function getBots() {
    return __awaiter(this, void 0, void 0, function () {
        var r;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, exports.API.get("/api/bots")];
                case 1:
                    r = _a.sent();
                    return [2 /*return*/, r.data];
            }
        });
    });
}
exports.getBots = getBots;
function initBot() {
    return __awaiter(this, void 0, void 0, function () {
        var r;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, exports.API.post("/api/bots/init")];
                case 1:
                    r = _a.sent();
                    return [2 /*return*/, r.data.bot];
            }
        });
    });
}
exports.initBot = initBot;
function getBot(botId) {
    return __awaiter(this, void 0, void 0, function () {
        var r;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, exports.API.get("/api/bots/" + encodeURIComponent(botId))];
                case 1:
                    r = _a.sent();
                    return [2 /*return*/, r.data];
            }
        });
    });
}
exports.getBot = getBot;
function updateBotMeta(botId, payload) {
    return __awaiter(this, void 0, void 0, function () {
        var r;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, exports.API.patch("/api/admin/bots/" + encodeURIComponent(botId), payload)];
                case 1:
                    r = _a.sent();
                    return [2 /*return*/, r.data];
            }
        });
    });
}
exports.updateBotMeta = updateBotMeta;
function getBotSecrets(botId) {
    return __awaiter(this, void 0, void 0, function () {
        var r;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, exports.API.get("/api/admin/bots/" + encodeURIComponent(botId) + "/secrets")];
                case 1:
                    r = _a.sent();
                    return [2 /*return*/, r.data];
            }
        });
    });
}
exports.getBotSecrets = getBotSecrets;
function updateBotSecrets(botId, payload) {
    var _a, _b, _c, _d;
    return __awaiter(this, void 0, void 0, function () {
        var norm, r;
        return __generator(this, function (_e) {
            switch (_e.label) {
                case 0:
                    norm = __assign(__assign({}, payload), { openaiApiKey: (_b = (_a = payload.openaiApiKey) !== null && _a !== void 0 ? _a : payload.openaiKey) !== null && _b !== void 0 ? _b : undefined, lineChannelSecret: (_d = (_c = payload.lineChannelSecret) !== null && _c !== void 0 ? _c : payload.lineSecret) !== null && _d !== void 0 ? _d : undefined });
                    return [4 /*yield*/, exports.API.post("/api/admin/bots/" + encodeURIComponent(botId) + "/secrets", {
                            openaiApiKey: norm.openaiApiKey,
                            lineAccessToken: norm.lineAccessToken,
                            lineChannelSecret: norm.lineChannelSecret
                        })];
                case 1:
                    r = _e.sent();
                    return [2 /*return*/, r.data];
            }
        });
    });
}
exports.updateBotSecrets = updateBotSecrets;
/* ============================ Stats / Cases ============================ */
/* Backend:
   - GET /api/stats/daily?botId=...
   - GET /api/stats/range?botId=...&from=YYYY-MM-DD&to=YYYY-MM-DD
   - GET /api/cases/recent?botId=...&limit=20
*/
function getDailyByBot(botId) {
    return __awaiter(this, void 0, void 0, function () {
        var r;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, exports.API.get("/api/stats/daily", { params: { botId: botId } })];
                case 1:
                    r = _a.sent();
                    return [2 /*return*/, r.data];
            }
        });
    });
}
exports.getDailyByBot = getDailyByBot;
function getRangeByBot(botId, from, to) {
    return __awaiter(this, void 0, void 0, function () {
        var r;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, exports.API.get("/api/stats/range", { params: { botId: botId, from: from, to: to } })];
                case 1:
                    r = _a.sent();
                    return [2 /*return*/, r.data];
            }
        });
    });
}
exports.getRangeByBot = getRangeByBot;
function getRecentByBot(botId, limit) {
    if (limit === void 0) { limit = 20; }
    return __awaiter(this, void 0, void 0, function () {
        var r;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, exports.API.get("/api/cases/recent", {
                        params: { botId: botId, limit: limit }
                    })];
                case 1:
                    r = _a.sent();
                    return [2 /*return*/, r.data];
            }
        });
    });
}
exports.getRecentByBot = getRecentByBot;
/* ============================== Dev tools ============================== */
/**
 * ทดสอบ LINE token ของ bot:
 * เรียก /api/line-ping/:botId ก่อน หากไม่มีให้ fallback ไป /api/dev/line-ping/:botId
 */
function devLinePing(botId) {
    return __awaiter(this, void 0, void 0, function () {
        var r1, _a, r2;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 2, , 4]);
                    return [4 /*yield*/, exports.API.get("/api/line-ping/" + encodeURIComponent(botId))];
                case 1:
                    r1 = _b.sent();
                    return [2 /*return*/, r1.data];
                case 2:
                    _a = _b.sent();
                    return [4 /*yield*/, exports.API.get("/api/dev/line-ping/" + encodeURIComponent(botId))];
                case 3:
                    r2 = _b.sent();
                    return [2 /*return*/, r2.data];
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.devLinePing = devLinePing;
/* ============================= Helper bundle ============================ */
exports.api = {
    base: getApiBase(),
    health: function () { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, exports.API.get("/api/health")];
            case 1: return [2 /*return*/, (_a.sent()).data];
        }
    }); }); },
    daily: getDailyByBot,
    range: getRangeByBot,
    recent: getRecentByBot,
    bots: getBots,
    createBot: initBot,
    getBot: getBot,
    getBotSecrets: getBotSecrets,
    updateBotMeta: updateBotMeta,
    updateBotSecrets: updateBotSecrets,
    devLinePing: devLinePing
};
