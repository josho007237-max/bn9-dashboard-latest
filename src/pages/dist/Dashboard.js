"use strict";
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
var _a;
exports.__esModule = true;
// src/pages/Dashboard.tsx
var react_1 = require("react");
var recharts_1 = require("recharts");
var api_1 = require("../lib/api");
var events_1 = require("../lib/events");
var BotSwitcher_1 = require("@/components/BotSwitcher");
var TENANT = (_a = import.meta.env.VITE_TENANT) !== null && _a !== void 0 ? _a : "bn9";
var pick = function () {
    var _a;
    var vals = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        vals[_i] = arguments[_i];
    }
    return (_a = vals.find(function (v) { return typeof v === "string" && v.trim() !== ""; })) !== null && _a !== void 0 ? _a : "-";
};
// --- utils: อ่าน/เขียน BOT_ID ให้รองรับคีย์เก่า/ใหม่ ---
function getInitialBotId() {
    var legacy = localStorage.getItem("BN9_BOT_ID");
    if (legacy) {
        localStorage.setItem("BOT_ID", legacy);
        localStorage.removeItem("BN9_BOT_ID");
    }
    return (localStorage.getItem("BOT_ID") ||
        import.meta.env.VITE_DEFAULT_BOT_ID ||
        "");
}
function Kpi(_a) {
    var label = _a.label, value = _a.value;
    return (React.createElement("div", { className: "p-4 rounded-2xl bg-zinc-900 border border-zinc-800" },
        React.createElement("div", { className: "text-xs opacity-70" }, label),
        React.createElement("div", { className: "text-2xl font-bold mt-1.5" }, value)));
}
function Card(_a) {
    var title = _a.title, children = _a.children;
    return (React.createElement("div", { className: "p-4 rounded-2xl bg-zinc-950 border border-zinc-800" },
        React.createElement("div", { className: "mb-3 font-semibold" }, title),
        children));
}
function Dashboard() {
    var _this = this;
    var _a, _b, _c, _d, _e, _f, _g, _h;
    var _j = react_1.useState(getInitialBotId()), botId = _j[0], setBotId = _j[1];
    var _k = react_1.useState(null), health = _k[0], setHealth = _k[1];
    var _l = react_1.useState(null), daily = _l[0], setDaily = _l[1];
    var _m = react_1.useState([]), cases = _m[0], setCases = _m[1];
    var _o = react_1.useState(false), loading = _o[0], setLoading = _o[1];
    var loadAll = react_1.useCallback(function (id) { return __awaiter(_this, void 0, void 0, function () {
        var target, _a, h, d, r, e_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    target = id !== null && id !== void 0 ? id : botId;
                    if (!target)
                        return [2 /*return*/];
                    setLoading(true);
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 3, 4, 5]);
                    return [4 /*yield*/, Promise.all([
                            api_1.api.health(),
                            api_1.api.daily(target),
                            api_1.api.recent(target, 20),
                        ])];
                case 2:
                    _a = _b.sent(), h = _a[0], d = _a[1], r = _a[2];
                    setHealth(h);
                    setDaily(d);
                    setCases(Array.isArray(r === null || r === void 0 ? void 0 : r.items) ? r.items : []);
                    return [3 /*break*/, 5];
                case 3:
                    e_1 = _b.sent();
                    console.error(e_1);
                    alert("โหลดข้อมูลไม่สำเร็จ: ตรวจ VITE_API_BASE / BOT_ID / CORS");
                    return [3 /*break*/, 5];
                case 4:
                    setLoading(false);
                    return [7 /*endfinally*/];
                case 5: return [2 /*return*/];
            }
        });
    }); }, [botId]);
    // โหลดครั้งแรก + ทุกครั้งที่เปลี่ยนบอท
    react_1.useEffect(function () {
        if (botId)
            loadAll(botId);
        var t = setInterval(function () { return botId && loadAll(botId); }, 30000);
        return function () { return clearInterval(t); };
    }, [botId, loadAll]);
    // ต่อ SSE แล้วรีเฟรชเฉพาะบอทที่กำลังดู
    react_1.useEffect(function () {
        if (!botId)
            return;
        var disconnect = events_1.connectEvents({
            tenant: TENANT,
            onHello: function () {
                // พร้อมรับ event แล้ว
            },
            onPing: function () {
                // heartbeat
            },
            onCaseNew: function (e) {
                var _a, _b, _c;
                if ((e === null || e === void 0 ? void 0 : e.botId) === botId) {
                    loadAll(botId);
                    (_c = (_b = (_a = globalThis) === null || _a === void 0 ? void 0 : _a.toast) === null || _b === void 0 ? void 0 : _b.success) === null || _c === void 0 ? void 0 : _c.call(_b, "Live update");
                }
            },
            onStatsUpdate: function (e) {
                var _a, _b, _c;
                if ((e === null || e === void 0 ? void 0 : e.botId) === botId) {
                    loadAll(botId);
                    (_c = (_b = (_a = globalThis) === null || _a === void 0 ? void 0 : _a.toast) === null || _b === void 0 ? void 0 : _b.success) === null || _c === void 0 ? void 0 : _c.call(_b, "Live update");
                }
            }
        });
        return function () {
            try {
                disconnect && disconnect();
            }
            catch (_a) { }
        };
    }, [botId, loadAll]);
    var chartData = react_1.useMemo(function () {
        var _a, _b, _c, _d;
        if (!(daily === null || daily === void 0 ? void 0 : daily.stats))
            return [];
        var s = daily.stats;
        return [
            {
                date: daily.dateKey || new Date().toISOString().slice(0, 10),
                total: (_a = s.total) !== null && _a !== void 0 ? _a : 0,
                text: (_b = s.text) !== null && _b !== void 0 ? _b : 0,
                follow: (_c = s.follow) !== null && _c !== void 0 ? _c : 0,
                unfollow: (_d = s.unfollow) !== null && _d !== void 0 ? _d : 0
            },
        ];
    }, [daily]);
    var todayKey = react_1.useMemo(function () { return new Date().toISOString().slice(0, 10); }, []);
    return (React.createElement("div", { className: "min-h-screen bg-[#111214] text-zinc-100 p-6" },
        React.createElement("div", { className: "max-w-5xl mx-auto grid gap-4" },
            React.createElement("div", { className: "flex items-start justify-between" },
                React.createElement("div", null,
                    React.createElement("h1", { className: "text-2xl font-extrabold m-0" }, "BN9 \u2013 Dashboard"),
                    React.createElement("div", { className: "opacity-70 text-xs mt-1" },
                        "API: ",
                        api_1.api.base)),
                React.createElement("div", { className: "flex items-center gap-3" },
                    React.createElement(BotSwitcher_1.BotSwitcher, { onChange: function (id) {
                            localStorage.setItem("BOT_ID", id);
                            setBotId(id);
                            if (id)
                                loadAll(id);
                        } }),
                    React.createElement("button", { type: "button", onClick: function () { return botId && loadAll(botId); }, disabled: loading || !botId, className: "px-4 py-2 rounded-xl bg-zinc-800 border border-zinc-700" }, "\u0E23\u0E35\u0E40\u0E1F\u0E23\u0E0A"))),
            !botId && (React.createElement("div", { className: "p-3 rounded-xl bg-amber-900/30 border border-amber-700 text-sm" }, "\u0E42\u0E1B\u0E23\u0E14\u0E40\u0E25\u0E37\u0E2D\u0E01\u0E1A\u0E2D\u0E17\u0E17\u0E35\u0E48\u0E21\u0E38\u0E21\u0E02\u0E27\u0E32\u0E1A\u0E19\u0E01\u0E48\u0E2D\u0E19 \u0E23\u0E30\u0E1A\u0E1A\u0E08\u0E30\u0E42\u0E2B\u0E25\u0E14\u0E40\u0E04\u0E2A/\u0E2A\u0E16\u0E34\u0E15\u0E34\u0E02\u0E2D\u0E07\u0E1A\u0E2D\u0E17\u0E19\u0E31\u0E49\u0E19\u0E2D\u0E31\u0E15\u0E42\u0E19\u0E21\u0E31\u0E15\u0E34")),
            React.createElement("div", { className: "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3" },
                React.createElement(Kpi, { label: "\u0E27\u0E31\u0E19\u0E19\u0E35\u0E49", value: (daily === null || daily === void 0 ? void 0 : daily.dateKey) || todayKey }),
                React.createElement(Kpi, { label: "\u0E02\u0E49\u0E2D\u0E04\u0E27\u0E32\u0E21\u0E17\u0E31\u0E49\u0E07\u0E2B\u0E21\u0E14", value: (_b = (_a = daily === null || daily === void 0 ? void 0 : daily.stats) === null || _a === void 0 ? void 0 : _a.total) !== null && _b !== void 0 ? _b : 0 }),
                React.createElement(Kpi, { label: "\u0E02\u0E49\u0E2D\u0E04\u0E27\u0E32\u0E21 (text)", value: (_d = (_c = daily === null || daily === void 0 ? void 0 : daily.stats) === null || _c === void 0 ? void 0 : _c.text) !== null && _d !== void 0 ? _d : 0 }),
                React.createElement(Kpi, { label: "\u0E15\u0E34\u0E14\u0E15\u0E32\u0E21/\u0E40\u0E25\u0E34\u0E01\u0E15\u0E34\u0E14\u0E15\u0E32\u0E21", value: ((_f = (_e = daily === null || daily === void 0 ? void 0 : daily.stats) === null || _e === void 0 ? void 0 : _e.follow) !== null && _f !== void 0 ? _f : 0) + " / " + ((_h = (_g = daily === null || daily === void 0 ? void 0 : daily.stats) === null || _g === void 0 ? void 0 : _g.unfollow) !== null && _h !== void 0 ? _h : 0) })),
            React.createElement(Card, { title: "Daily Overview (today)" },
                React.createElement("div", { className: "h-72" },
                    React.createElement(recharts_1.ResponsiveContainer, { width: "100%", height: "100%" },
                        React.createElement(recharts_1.LineChart, { data: chartData },
                            React.createElement(recharts_1.CartesianGrid, { strokeDasharray: "4 4" }),
                            React.createElement(recharts_1.XAxis, { dataKey: "date" }),
                            React.createElement(recharts_1.YAxis, null),
                            React.createElement(recharts_1.Tooltip, null),
                            React.createElement(recharts_1.Line, { type: "monotone", dataKey: "total", dot: true }),
                            React.createElement(recharts_1.Line, { type: "monotone", dataKey: "text", dot: true }),
                            React.createElement(recharts_1.Line, { type: "monotone", dataKey: "follow", dot: true }),
                            React.createElement(recharts_1.Line, { type: "monotone", dataKey: "unfollow", dot: true })))),
                React.createElement("div", { className: "mt-2 text-center text-xs opacity-60" }, "\u2022 total \u2022 text \u2022 follow \u2022 unfollow")),
            React.createElement(Card, { title: "Recent Cases (\u0E25\u0E48\u0E32\u0E2A\u0E38\u0E14 20 \u0E23\u0E32\u0E22\u0E01\u0E32\u0E23)" },
                React.createElement("div", { className: "max-h-96 overflow-auto" },
                    React.createElement("table", { className: "w-full text-sm" },
                        React.createElement("thead", { className: "opacity-80" },
                            React.createElement("tr", null,
                                React.createElement("th", { className: "text-left p-2" }, "\u0E40\u0E27\u0E25\u0E32"),
                                React.createElement("th", { className: "text-left p-2" }, "\u0E1C\u0E39\u0E49\u0E43\u0E0A\u0E49"),
                                React.createElement("th", { className: "text-left p-2" }, "\u0E1B\u0E23\u0E30\u0E40\u0E20\u0E17"),
                                React.createElement("th", { className: "text-left p-2" }, "\u0E02\u0E49\u0E2D\u0E04\u0E27\u0E32\u0E21"))),
                        React.createElement("tbody", null, !cases || cases.length === 0 ? (React.createElement("tr", null,
                            React.createElement("td", { colSpan: 4, className: "p-3 opacity-60 text-center" }, "\u2014 \u0E22\u0E31\u0E07\u0E44\u0E21\u0E48\u0E21\u0E35\u0E23\u0E32\u0E22\u0E01\u0E32\u0E23 \u2014"))) : (cases.map(function (c) {
                            var when = c.createdAt ? new Date(c.createdAt) : null;
                            return (React.createElement("tr", { key: c.id, className: "border-t border-zinc-800" },
                                React.createElement("td", { className: "p-2 whitespace-nowrap" }, when ? when.toLocaleString() : "-"),
                                React.createElement("td", { className: "p-2" }, pick(c.userId)),
                                React.createElement("td", { className: "p-2" }, pick(c.kind, c.type)),
                                React.createElement("td", { className: "p-2" }, pick(c.text, c.message))));
                        })))))))));
}
exports["default"] = Dashboard;
