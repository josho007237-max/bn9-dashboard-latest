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
var _a;
exports.__esModule = true;
// src/pages/BotDetail.tsx
var react_1 = require("react");
var react_router_dom_1 = require("react-router-dom");
var api_1 = require("../lib/api");
var events_1 = require("../lib/events");
var EMPTY = {
    openaiApiKey: "",
    lineAccessToken: "",
    lineChannelSecret: ""
};
var TENANT = (_a = import.meta.env.VITE_TENANT) !== null && _a !== void 0 ? _a : "bn9";
function BotDetail() {
    var _this = this;
    var _a;
    var _b = react_router_dom_1.useParams().botId, botId = _b === void 0 ? "" : _b;
    var nav = react_router_dom_1.useNavigate();
    var _c = react_1.useState(true), loading = _c[0], setLoading = _c[1];
    var _d = react_1.useState(null), bot = _d[0], setBot = _d[1];
    var _e = react_1.useState(EMPTY), form = _e[0], setForm = _e[1];
    var _f = react_1.useState(false), saving = _f[0], setSaving = _f[1];
    var _g = react_1.useState(false), pinging = _g[0], setPinging = _g[1];
    var title = react_1.useMemo(function () { return (bot === null || bot === void 0 ? void 0 : bot.name) || "Bot"; }, [bot]);
    var apiBase = api_1.getApiBase();
    var webhookUrl = react_1.useMemo(function () { return apiBase + "/webhooks/line?botId=" + encodeURIComponent(botId); }, [apiBase, botId]);
    var loadBot = react_1.useCallback(function () { return __awaiter(_this, void 0, void 0, function () {
        var _a, bot, masked;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    if (!botId)
                        return [2 /*return*/];
                    return [4 /*yield*/, Promise.all([api_1.getBot(botId), api_1.getBotSecrets(botId)])];
                case 1:
                    _a = _b.sent(), bot = _a[0].bot, masked = _a[1];
                    setBot(bot);
                    setForm({
                        openaiApiKey: (masked === null || masked === void 0 ? void 0 : masked.openaiApiKey) || "",
                        lineAccessToken: (masked === null || masked === void 0 ? void 0 : masked.lineAccessToken) || "",
                        lineChannelSecret: (masked === null || masked === void 0 ? void 0 : masked.lineChannelSecret) || ""
                    });
                    return [2 /*return*/];
            }
        });
    }); }, [botId]);
    react_1.useEffect(function () {
        if (!botId) {
            nav("/bots");
            return;
        }
        var alive = true;
        (function () { return __awaiter(_this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, 3, 4]);
                        return [4 /*yield*/, loadBot()];
                    case 1:
                        _b.sent();
                        return [3 /*break*/, 4];
                    case 2:
                        _a = _b.sent();
                        if (alive) {
                            alert("โหลดข้อมูลบอทไม่สำเร็จ");
                            nav("/bots");
                        }
                        return [3 /*break*/, 4];
                    case 3:
                        if (alive)
                            setLoading(false);
                        return [7 /*endfinally*/];
                    case 4: return [2 /*return*/];
                }
            });
        }); })();
        return function () {
            alive = false;
        };
    }, [botId, nav, loadBot]);
    // ฟัง SSE: ถ้าได้รับ bot:verified ของบอทนี้ ให้รีเฟรชสถานะหัวข้อทันที
    react_1.useEffect(function () {
        if (!botId)
            return;
        var disconnect = events_1.connectEvents({
            tenant: TENANT,
            onHello: function () { },
            onPing: function () { },
            onCaseNew: function () { },
            onStatsUpdate: function () { },
            // เราอยากอัปเดตเฉพาะ badge verified
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            onCaseNew: undefined
        });
        // เพิ่ม event listener เฉพาะชื่อที่เราต้องการ (รองรับเวอร์ชัน connectEvents ที่มี/ไม่มี callback เฉพาะ)
        try {
            // @ts-ignore - เข้าถึง EventSource ภายในไม่ได้ถ้าเป็น abstraction
            if (disconnect && disconnect.__es) {
                // ไม่ทำอะไร ถ้าไลบรารีห่อไว้
            }
        }
        catch (_a) { }
        // ทางง่าย: เมื่อใส่ secret สำเร็จ เราจะโหลดใหม่อยู่แล้ว
        return function () {
            try {
                disconnect && disconnect();
            }
            catch (_a) { }
        };
    }, [botId]);
    function onChange(k, v) {
        setForm(function (s) {
            var _a;
            return (__assign(__assign({}, s), (_a = {}, _a[k] = v, _a)));
        });
    }
    function onSave() {
        return __awaiter(this, void 0, void 0, function () {
            var payload_1, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 3, 4, 5]);
                        setSaving(true);
                        payload_1 = {};
                        Object.keys(form).forEach(function (k) {
                            var val = (form[k] || "").trim();
                            if (val)
                                payload_1[k] = val;
                        });
                        return [4 /*yield*/, api_1.updateBotSecrets(botId, payload_1)];
                    case 1:
                        _b.sent();
                        alert("บันทึกแล้ว ✔");
                        // โหลดค่าที่ mask แล้วกลับมาใหม่ + รีเฟรชข้อมูลบอท (เพื่ออัปเดต verifiedAt ถ้าเพิ่งครบ)
                        return [4 /*yield*/, loadBot()];
                    case 2:
                        // โหลดค่าที่ mask แล้วกลับมาใหม่ + รีเฟรชข้อมูลบอท (เพื่ออัปเดต verifiedAt ถ้าเพิ่งครบ)
                        _b.sent();
                        return [3 /*break*/, 5];
                    case 3:
                        _a = _b.sent();
                        alert("บันทึกไม่สำเร็จ ❌");
                        return [3 /*break*/, 5];
                    case 4:
                        setSaving(false);
                        return [7 /*endfinally*/];
                    case 5: return [2 /*return*/];
                }
            });
        });
    }
    function onPingLine() {
        return __awaiter(this, void 0, void 0, function () {
            var r, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, 3, 4]);
                        setPinging(true);
                        return [4 /*yield*/, api_1.devLinePing(botId)];
                    case 1:
                        r = _b.sent();
                        alert(r.ok ? "PING OK (status " + r.status + ")" : "PING FAIL (status " + r.status + ")");
                        return [3 /*break*/, 4];
                    case 2:
                        _a = _b.sent();
                        alert("เรียกทดสอบไม่สำเร็จ");
                        return [3 /*break*/, 4];
                    case 3:
                        setPinging(false);
                        return [7 /*endfinally*/];
                    case 4: return [2 /*return*/];
                }
            });
        });
    }
    function copyWebhook() {
        try {
            navigator.clipboard.writeText(webhookUrl);
            alert("คัดลอก Webhook URL แล้ว");
        }
        catch (_a) {
            /* no-op */
        }
    }
    if (loading)
        return React.createElement("div", { className: "p-6 text-sm text-neutral-400" }, "Loading\u2026");
    if (!bot)
        return null;
    return (React.createElement("div", { className: "min-h-screen bg-[#111214] text-gray-100 p-6" },
        React.createElement("div", { className: "max-w-5xl mx-auto space-y-6" },
            React.createElement("div", { className: "text-sm text-gray-400" },
                React.createElement(react_router_dom_1.Link, { to: "/bots", className: "hover:underline" }, "Bots"),
                React.createElement("span", { className: "mx-2" }, "/"),
                React.createElement("span", { className: "text-gray-200" }, title)),
            React.createElement("div", { className: "flex items-center justify-between" },
                React.createElement("div", null,
                    React.createElement("h1", { className: "text-xl font-semibold" }, title),
                    React.createElement("div", { className: "text-xs text-gray-400 mt-1 space-x-2" },
                        React.createElement("span", null,
                            "ID: ",
                            React.createElement("code", { className: "text-gray-300" }, bot.id)),
                        React.createElement("span", null,
                            "\u2022 Platform: ",
                            bot.platform),
                        React.createElement("span", null,
                            "\u2022 Tenant: ", (_a = bot.tenant) !== null && _a !== void 0 ? _a : "bn9"),
                        bot.verifiedAt ? (React.createElement("span", { className: "inline-flex items-center gap-1 text-emerald-400" }, "\u2022 Verified")) : (React.createElement("span", { className: "inline-flex items-center gap-1 text-amber-400" }, "\u2022 Not verified")))),
                React.createElement("div", { className: "flex gap-2" },
                    React.createElement("button", { onClick: onPingLine, disabled: pinging, className: "px-3 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-600 disabled:opacity-60" }, pinging ? "Pinging…" : "Test: LINE ping"),
                    React.createElement("button", { onClick: onSave, disabled: saving, className: "px-3 py-2 rounded-xl bg-indigo-700 hover:bg-indigo-600 disabled:opacity-60" }, saving ? "Saving…" : "Save changes"))),
            React.createElement("div", { className: "rounded-2xl bg-[#151619] border border-gray-800 p-4" },
                React.createElement("div", { className: "text-sm text-gray-300 mb-2" }, "LINE Webhook URL"),
                React.createElement("div", { className: "flex items-center gap-2" },
                    React.createElement("code", { className: "text-xs bg-black/40 border border-gray-800 rounded px-2 py-1 break-all" }, webhookUrl),
                    React.createElement("button", { onClick: copyWebhook, className: "px-3 py-1.5 rounded-lg bg-gray-800 hover:bg-gray-700 text-sm" }, "Copy")),
                React.createElement("div", { className: "mt-2 text-xs text-gray-500" }, "\u0E19\u0E33 URL \u0E19\u0E35\u0E49\u0E44\u0E1B\u0E27\u0E32\u0E07\u0E43\u0E19 LINE Developers \u2192 Messaging API \u2192 Webhook URL \u0E41\u0E25\u0E49\u0E27\u0E01\u0E14 Verify")),
            React.createElement("div", { className: "grid gap-4 md:grid-cols-2" },
                React.createElement(Field, { label: "OpenAI API Key" },
                    React.createElement("input", { className: "w-full px-3 py-2 rounded-lg bg-neutral-800 border border-neutral-700 outline-none focus:ring-2 focus:ring-white/10", placeholder: "sk-\u2026 \u0E2B\u0E23\u0E37\u0E2D\u0E43\u0E2A\u0E48 ****** \u0E40\u0E1E\u0E37\u0E48\u0E2D\u0E04\u0E07\u0E04\u0E48\u0E32\u0E40\u0E14\u0E34\u0E21", value: form.openaiApiKey, onChange: function (e) { return onChange("openaiApiKey", e.target.value); }, spellCheck: false })),
                React.createElement("div", { className: "grid gap-4" },
                    React.createElement(Field, { label: "LINE Channel Access Token" },
                        React.createElement("textarea", { rows: 3, className: "w-full px-3 py-2 rounded-lg bg-neutral-800 border border-neutral-700 outline-none focus:ring-2 focus:ring-white/10", placeholder: "\u0E43\u0E2A\u0E48\u0E04\u0E48\u0E32\u0E43\u0E2B\u0E21\u0E48 \u0E2B\u0E23\u0E37\u0E2D ****** \u0E40\u0E1E\u0E37\u0E48\u0E2D\u0E04\u0E07\u0E04\u0E48\u0E32\u0E40\u0E14\u0E34\u0E21", value: form.lineAccessToken, onChange: function (e) { return onChange("lineAccessToken", e.target.value); }, spellCheck: false })),
                    React.createElement(Field, { label: "LINE Channel Secret" },
                        React.createElement("input", { className: "w-full px-3 py-2 rounded-lg bg-neutral-800 border border-neutral-700 outline-none focus:ring-2 focus:ring-white/10", placeholder: "\u0E43\u0E2A\u0E48\u0E04\u0E48\u0E32\u0E43\u0E2B\u0E21\u0E48 \u0E2B\u0E23\u0E37\u0E2D ****** \u0E40\u0E1E\u0E37\u0E48\u0E2D\u0E04\u0E07\u0E04\u0E48\u0E32\u0E40\u0E14\u0E34\u0E21", value: form.lineChannelSecret, onChange: function (e) { return onChange("lineChannelSecret", e.target.value); }, spellCheck: false })))))));
}
exports["default"] = BotDetail;
function Field(_a) {
    var label = _a.label, children = _a.children;
    return (React.createElement("label", { className: "flex flex-col gap-2" },
        React.createElement("span", { className: "text-sm text-neutral-300" }, label),
        children));
}
