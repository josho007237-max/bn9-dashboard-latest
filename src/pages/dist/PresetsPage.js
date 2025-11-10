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
var react_1 = require("react");
/** ---------- CONFIG ---------- */
var API_BASE = (_a = import.meta.env.VITE_API_BASE) !== null && _a !== void 0 ? _a : "/api";
var getToken = function () { var _a; return (_a = localStorage.getItem("token")) !== null && _a !== void 0 ? _a : ""; };
var getTenant = function () { var _a; return (_a = localStorage.getItem("tenant")) !== null && _a !== void 0 ? _a : "bn9"; };
/** ---------- helpers ---------- */
function api(path, init) {
    var _a;
    return __awaiter(this, void 0, Promise, function () {
        var res, data, msg;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, fetch("" + API_BASE + path, __assign(__assign({}, init), { headers: __assign({ "Content-Type": "application/json", Authorization: "Bearer " + getToken(), "x-tenant": getTenant() }, ((init === null || init === void 0 ? void 0 : init.headers) || {})) }))];
                case 1:
                    res = _b.sent();
                    return [4 /*yield*/, res.json()];
                case 2:
                    data = _b.sent();
                    if (!res.ok || (data === null || data === void 0 ? void 0 : data.ok) === false) {
                        msg = (_a = data === null || data === void 0 ? void 0 : data.message) !== null && _a !== void 0 ? _a : "HTTP " + res.status;
                        throw new Error(msg);
                    }
                    return [2 /*return*/, data];
            }
        });
    });
}
/** ---------- component ---------- */
function PresetsPage() {
    var _this = this;
    // listing
    var _a = react_1.useState([]), items = _a[0], setItems = _a[1];
    var _b = react_1.useState(false), loading = _b[0], setLoading = _b[1];
    var _c = react_1.useState(null), err = _c[0], setErr = _c[1];
    // create
    var _d = react_1.useState("Ploy Friendly v1"), cName = _d[0], setCName = _d[1];
    var _e = react_1.useState("gpt-4o-mini"), cModel = _e[0], setCModel = _e[1];
    var _f = react_1.useState(0.6), cTemp = _f[0], setCTemp = _f[1];
    var _g = react_1.useState(1), cTopP = _g[0], setCTopP = _g[1];
    var _h = react_1.useState(800), cMax = _h[0], setCMax = _h[1];
    var _j = react_1.useState("You are P'Ploy, friendly and helpful assistant..."), cSys = _j[0], setCSys = _j[1];
    // apply-to-bot dialog
    var _k = react_1.useState([]), bots = _k[0], setBots = _k[1];
    var _l = react_1.useState(false), applyOpen = _l[0], setApplyOpen = _l[1];
    var _m = react_1.useState(null), applyPreset = _m[0], setApplyPreset = _m[1];
    var _o = react_1.useState(""), applyBotId = _o[0], setApplyBotId = _o[1];
    var _p = react_1.useState(""), ovTemp = _p[0], setOvTemp = _p[1]; // optional overrides
    var _q = react_1.useState(""), ovTopP = _q[0], setOvTopP = _q[1];
    var _r = react_1.useState(""), ovMax = _r[0], setOvMax = _r[1];
    var load = function () { return __awaiter(_this, void 0, void 0, function () {
        var res, e_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    setLoading(true);
                    setErr(null);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, 4, 5]);
                    return [4 /*yield*/, api("/api/admin/ai/presets")];
                case 2:
                    res = _a.sent();
                    setItems(res.items);
                    return [3 /*break*/, 5];
                case 3:
                    e_1 = _a.sent();
                    setErr(e_1.message || "load_error");
                    return [3 /*break*/, 5];
                case 4:
                    setLoading(false);
                    return [7 /*endfinally*/];
                case 5: return [2 /*return*/];
            }
        });
    }); };
    var loadBots = function () { return __awaiter(_this, void 0, void 0, function () {
        var res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, api("/api/admin/bots")];
                case 1:
                    res = _a.sent();
                    setBots(res.items);
                    return [2 /*return*/];
            }
        });
    }); };
    react_1.useEffect(function () {
        load();
    }, []);
    var applyDisabled = react_1.useMemo(function () { return !applyPreset || !applyBotId; }, [applyPreset, applyBotId]);
    var onCreate = function (e) { return __awaiter(_this, void 0, void 0, function () {
        var e_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    e.preventDefault();
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 4, , 5]);
                    return [4 /*yield*/, api("/api/admin/ai/presets", {
                            method: "POST",
                            body: JSON.stringify({
                                name: cName.trim(),
                                model: cModel.trim(),
                                temperature: Number(cTemp),
                                topP: Number(cTopP),
                                maxTokens: Number(cMax),
                                systemPrompt: cSys
                            })
                        })];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, load()];
                case 3:
                    _a.sent();
                    alert("Created preset ✓");
                    return [3 /*break*/, 5];
                case 4:
                    e_2 = _a.sent();
                    alert("Create failed: " + e_2.message);
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    }); };
    var onDelete = function (id) { return __awaiter(_this, void 0, void 0, function () {
        var e_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!confirm("Delete this preset?"))
                        return [2 /*return*/];
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, api("/api/admin/ai/presets/" + id, { method: "DELETE" })];
                case 2:
                    _a.sent();
                    setItems(items.filter(function (x) { return x.id !== id; }));
                    return [3 /*break*/, 4];
                case 3:
                    e_3 = _a.sent();
                    alert("Delete failed: " + e_3.message);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); };
    var openApply = function (p) { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    setApplyPreset(p);
                    setApplyBotId("");
                    setOvTemp("");
                    setOvTopP("");
                    setOvMax("");
                    setApplyOpen(true);
                    return [4 /*yield*/, loadBots()];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); };
    var doApply = function () { return __awaiter(_this, void 0, void 0, function () {
        var payload, e_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!applyPreset || !applyBotId)
                        return [2 /*return*/];
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    payload = { presetId: applyPreset.id };
                    if (ovTemp !== "")
                        payload.temperature = Number(ovTemp);
                    if (ovTopP !== "")
                        payload.topP = Number(ovTopP);
                    if (ovMax !== "")
                        payload.maxTokens = Number(ovMax);
                    return [4 /*yield*/, api("/api/admin/bots/" + applyBotId + "/config", {
                            method: "PUT",
                            body: JSON.stringify(payload)
                        })];
                case 2:
                    _a.sent();
                    alert("Applied preset to bot ✓");
                    setApplyOpen(false);
                    return [3 /*break*/, 4];
                case 3:
                    e_4 = _a.sent();
                    alert("Apply failed: " + e_4.message);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); };
    return (react_1["default"].createElement("div", { className: "p-6 max-w-6xl mx-auto" },
        react_1["default"].createElement("h1", { className: "text-2xl font-bold mb-4" }, "AI Presets"),
        react_1["default"].createElement("form", { onSubmit: onCreate, className: "grid gap-3 bg-neutral-900/40 border border-neutral-800 rounded-xl p-4 mb-6" },
            react_1["default"].createElement("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-3" },
                react_1["default"].createElement("label", { className: "grid gap-1" },
                    react_1["default"].createElement("span", { className: "text-sm text-neutral-300" }, "Name"),
                    react_1["default"].createElement("input", { className: "input", value: cName, onChange: function (e) { return setCName(e.target.value); }, required: true })),
                react_1["default"].createElement("label", { className: "grid gap-1" },
                    react_1["default"].createElement("span", { className: "text-sm text-neutral-300" }, "Model"),
                    react_1["default"].createElement("input", { className: "input", value: cModel, onChange: function (e) { return setCModel(e.target.value); }, required: true })),
                react_1["default"].createElement("label", { className: "grid gap-1" },
                    react_1["default"].createElement("span", { className: "text-sm text-neutral-300" }, "Max Tokens"),
                    react_1["default"].createElement("input", { className: "input", type: "number", min: 1, value: cMax, onChange: function (e) { return setCMax(Number(e.target.value)); } }))),
            react_1["default"].createElement("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-3" },
                react_1["default"].createElement("label", { className: "grid gap-1" },
                    react_1["default"].createElement("span", { className: "text-sm text-neutral-300" }, "Temperature"),
                    react_1["default"].createElement("input", { className: "input", type: "number", step: "0.1", min: "0", max: "2", value: cTemp, onChange: function (e) { return setCTemp(Number(e.target.value)); } })),
                react_1["default"].createElement("label", { className: "grid gap-1" },
                    react_1["default"].createElement("span", { className: "text-sm text-neutral-300" }, "TopP"),
                    react_1["default"].createElement("input", { className: "input", type: "number", step: "0.1", min: "0", max: "1", value: cTopP, onChange: function (e) { return setCTopP(Number(e.target.value)); } })),
                react_1["default"].createElement("div", null)),
            react_1["default"].createElement("label", { className: "grid gap-1" },
                react_1["default"].createElement("span", { className: "text-sm text-neutral-300" }, "System Prompt"),
                react_1["default"].createElement("textarea", { className: "input h-24", value: cSys, onChange: function (e) { return setCSys(e.target.value); } })),
            react_1["default"].createElement("div", null,
                react_1["default"].createElement("button", { type: "submit", className: "btn-primary" }, "Create Preset"))),
        react_1["default"].createElement("div", { className: "bg-neutral-900/40 border border-neutral-800 rounded-xl" },
            react_1["default"].createElement("div", { className: "p-3 border-b border-neutral-800 flex items-center justify-between" },
                react_1["default"].createElement("div", { className: "font-semibold" }, "Presets"),
                react_1["default"].createElement("button", { onClick: load, className: "btn-secondary text-sm" }, "Refresh")),
            loading ? (react_1["default"].createElement("div", { className: "p-6 text-neutral-400" }, "Loading\u2026")) : err ? (react_1["default"].createElement("div", { className: "p-6 text-red-400" },
                "Error: ",
                err)) : (react_1["default"].createElement("table", { className: "w-full text-sm" },
                react_1["default"].createElement("thead", { className: "text-left text-neutral-400" },
                    react_1["default"].createElement("tr", { className: "[&>th]:px-3 [&>th]:py-2 border-b border-neutral-800" },
                        react_1["default"].createElement("th", null, "Name"),
                        react_1["default"].createElement("th", null, "Model"),
                        react_1["default"].createElement("th", null, "Temp"),
                        react_1["default"].createElement("th", null, "TopP"),
                        react_1["default"].createElement("th", null, "Max"),
                        react_1["default"].createElement("th", null, "Updated"),
                        react_1["default"].createElement("th", null))),
                react_1["default"].createElement("tbody", null,
                    items.map(function (p) { return (react_1["default"].createElement("tr", { key: p.id, className: "[&>td]:px-3 [&>td]:py-2 border-b border-neutral-800" },
                        react_1["default"].createElement("td", { className: "font-medium" }, p.name),
                        react_1["default"].createElement("td", null, p.model),
                        react_1["default"].createElement("td", null, p.temperature),
                        react_1["default"].createElement("td", null, p.topP),
                        react_1["default"].createElement("td", null, p.maxTokens),
                        react_1["default"].createElement("td", null, new Date(p.updatedAt).toLocaleString()),
                        react_1["default"].createElement("td", { className: "flex gap-2 justify-end" },
                            react_1["default"].createElement("button", { onClick: function () { return openApply(p); }, className: "btn-primary" }, "Apply to bot"),
                            react_1["default"].createElement("button", { onClick: function () { return onDelete(p.id); }, className: "btn-danger" }, "Delete")))); }),
                    items.length === 0 && (react_1["default"].createElement("tr", null,
                        react_1["default"].createElement("td", { colSpan: 7, className: "px-3 py-6 text-neutral-400" }, "No presets."))))))),
        applyOpen && applyPreset && (react_1["default"].createElement("div", { className: "fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50" },
            react_1["default"].createElement("div", { className: "bg-neutral-900 border border-neutral-800 rounded-xl w-full max-w-xl p-4 grid gap-3" },
                react_1["default"].createElement("div", { className: "flex items-center justify-between" },
                    react_1["default"].createElement("div", { className: "font-semibold" },
                        "Apply preset: ",
                        applyPreset.name),
                    react_1["default"].createElement("button", { className: "btn-secondary", onClick: function () { return setApplyOpen(false); } }, "Close")),
                react_1["default"].createElement("label", { className: "grid gap-1" },
                    react_1["default"].createElement("span", { className: "text-sm text-neutral-300" }, "Bot"),
                    react_1["default"].createElement("select", { className: "input", value: applyBotId, onChange: function (e) { return setApplyBotId(e.target.value); } },
                        react_1["default"].createElement("option", { value: "" }, "-- select bot --"),
                        bots.map(function (b) { return (react_1["default"].createElement("option", { key: b.id, value: b.id },
                            b.name,
                            " (",
                            b.platform,
                            ")")); }))),
                react_1["default"].createElement("div", { className: "text-neutral-400 text-xs" }, "Optional overrides (\u0E40\u0E27\u0E49\u0E19\u0E27\u0E48\u0E32\u0E07 = \u0E43\u0E0A\u0E49\u0E04\u0E48\u0E32\u0E08\u0E32\u0E01 preset)"),
                react_1["default"].createElement("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-3" },
                    react_1["default"].createElement("label", { className: "grid gap-1" },
                        react_1["default"].createElement("span", { className: "text-sm text-neutral-300" }, "Temperature"),
                        react_1["default"].createElement("input", { className: "input", type: "number", step: "0.1", min: "0", max: "2", value: ovTemp, onChange: function (e) { return setOvTemp(e.target.value); }, placeholder: "" + applyPreset.temperature })),
                    react_1["default"].createElement("label", { className: "grid gap-1" },
                        react_1["default"].createElement("span", { className: "text-sm text-neutral-300" }, "TopP"),
                        react_1["default"].createElement("input", { className: "input", type: "number", step: "0.1", min: "0", max: "1", value: ovTopP, onChange: function (e) { return setOvTopP(e.target.value); }, placeholder: "" + applyPreset.topP })),
                    react_1["default"].createElement("label", { className: "grid gap-1" },
                        react_1["default"].createElement("span", { className: "text-sm text-neutral-300" }, "Max Tokens"),
                        react_1["default"].createElement("input", { className: "input", type: "number", min: 1, value: ovMax, onChange: function (e) { return setOvMax(e.target.value); }, placeholder: "" + applyPreset.maxTokens }))),
                react_1["default"].createElement("div", { className: "flex justify-end gap-2" },
                    react_1["default"].createElement("button", { className: "btn-secondary", onClick: function () { return setApplyOpen(false); } }, "Cancel"),
                    react_1["default"].createElement("button", { disabled: applyDisabled, className: "btn-primary disabled:opacity-50", onClick: doApply }, "Apply"))))),
        react_1["default"].createElement("style", null, "\n        .input{background:#0b0b0b;border:1px solid #2a2a2a;border-radius:.6rem;padding:.5rem .7rem;color:#eaeaea}\n        .btn-primary{background:#2563eb;border:1px solid #1d4ed8;color:white;padding:.45rem .75rem;border-radius:.6rem}\n        .btn-secondary{background:#111827;border:1px solid #374151;color:#e5e7eb;padding:.45rem .75rem;border-radius:.6rem}\n        .btn-danger{background:#8b0000;border:1px solid #a30808;color:#fff;padding:.45rem .75rem;border-radius:.6rem}\n      ")));
}
exports["default"] = PresetsPage;
