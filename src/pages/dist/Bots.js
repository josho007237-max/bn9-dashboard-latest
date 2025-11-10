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
// src/pages/Bots.tsx
var react_1 = require("react");
var react_router_dom_1 = require("react-router-dom");
var api_1 = require("../lib/api");
var SecretsModal_1 = require("../components/SecretsModal");
function Bots() {
    var _a = react_1.useState([]), items = _a[0], setItems = _a[1];
    var _b = react_1.useState(true), loading = _b[0], setLoading = _b[1];
    var _c = react_1.useState(null), err = _c[0], setErr = _c[1];
    var _d = react_1.useState(null), openSecretsFor = _d[0], setOpenSecretsFor = _d[1];
    var _e = react_1.useState(null), confirmDel = _e[0], setConfirmDel = _e[1];
    var empty = react_1.useMemo(function () { return !loading && items.length === 0; }, [loading, items]);
    function load() {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var res, list, e_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        setLoading(true);
                        setErr(null);
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, 4, 5]);
                        return [4 /*yield*/, api_1.api.bots()];
                    case 2:
                        res = _b.sent();
                        list = Array.isArray((_a = res) === null || _a === void 0 ? void 0 : _a.items) ? res.items : [];
                        setItems(list);
                        return [3 /*break*/, 5];
                    case 3:
                        e_1 = _b.sent();
                        setErr((e_1 === null || e_1 === void 0 ? void 0 : e_1.message) || "โหลดรายการบอทไม่สำเร็จ");
                        setItems([]);
                        return [3 /*break*/, 5];
                    case 4:
                        setLoading(false);
                        return [7 /*endfinally*/];
                    case 5: return [2 /*return*/];
                }
            });
        });
    }
    function onInit() {
        return __awaiter(this, void 0, void 0, function () {
            var e_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, 3, 4]);
                        return [4 /*yield*/, api_1.api.createBot()];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 2:
                        e_2 = _a.sent();
                        setErr((e_2 === null || e_2 === void 0 ? void 0 : e_2.message) || "สร้างบอทไม่สำเร็จ");
                        return [3 /*break*/, 4];
                    case 3:
                        load();
                        return [7 /*endfinally*/];
                    case 4: return [2 /*return*/];
                }
            });
        });
    }
    react_1.useEffect(function () {
        load();
    }, []);
    function saveName(b, name) {
        return __awaiter(this, void 0, void 0, function () {
            var newName, prev, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        newName = name.trim().slice(0, 30);
                        if (!newName || newName === (b.name || ""))
                            return [2 /*return*/];
                        prev = items.slice();
                        setItems(function (arr) { return arr.map(function (x) { return (x.id === b.id ? __assign(__assign({}, x), { name: newName }) : x); }); });
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, api_1.api.updateBotMeta(b.id, { name: newName })];
                    case 2:
                        _b.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        _a = _b.sent();
                        setItems(prev);
                        alert("บันทึกชื่อไม่สำเร็จ");
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    }
    function toggleActive(b) {
        return __awaiter(this, void 0, void 0, function () {
            var next, prev, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        next = !b.active;
                        prev = items.slice();
                        setItems(function (arr) { return arr.map(function (x) { return (x.id === b.id ? __assign(__assign({}, x), { active: next }) : x); }); });
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, api_1.api.updateBotMeta(b.id, { active: next })];
                    case 2:
                        _b.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        _a = _b.sent();
                        setItems(prev);
                        alert("เปลี่ยนสถานะไม่สำเร็จ");
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    }
    function doDelete(id) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, , 3]);
                        // หมายเหตุ: ต้องมี api.deleteBot ใน lib/api (ถ้ายังไม่มี ให้เพิ่ม export ตามที่ผมให้ก่อนหน้า)
                        // ถ้า backend ยังไม่รองรับ DELETE จะ fallback กลับมาด้วย { ok: true, note: "DELETE not implemented" }
                        // @ts-ignore - เผื่อโปรเจกต์ยังไม่ได้ typing ให้เมธอดนี้
                        return [4 /*yield*/, ((_a = api_1.api.deleteBot) === null || _a === void 0 ? void 0 : _a.call(api_1.api, id))];
                    case 1:
                        // หมายเหตุ: ต้องมี api.deleteBot ใน lib/api (ถ้ายังไม่มี ให้เพิ่ม export ตามที่ผมให้ก่อนหน้า)
                        // ถ้า backend ยังไม่รองรับ DELETE จะ fallback กลับมาด้วย { ok: true, note: "DELETE not implemented" }
                        // @ts-ignore - เผื่อโปรเจกต์ยังไม่ได้ typing ให้เมธอดนี้
                        _c.sent();
                        setConfirmDel(null);
                        load();
                        return [3 /*break*/, 3];
                    case 2:
                        _b = _c.sent();
                        alert("ลบไม่สำเร็จ");
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    }
    var tableBody;
    if (loading) {
        tableBody = (React.createElement("tr", null,
            React.createElement("td", { className: "py-6 px-4 text-gray-400", colSpan: 5 }, "Loading\u2026")));
    }
    else if (empty) {
        tableBody = (React.createElement("tr", null,
            React.createElement("td", { className: "py-6 px-4 text-gray-500", colSpan: 5 }, "\u0E22\u0E31\u0E07\u0E44\u0E21\u0E48\u0E21\u0E35\u0E1A\u0E2D\u0E17 \u0E01\u0E14 \u201CInit / Create Bot\u201D \u0E40\u0E1E\u0E37\u0E48\u0E2D\u0E2A\u0E23\u0E49\u0E32\u0E07\u0E15\u0E31\u0E27\u0E41\u0E23\u0E01")));
    }
    else {
        tableBody = (React.createElement(React.Fragment, null, items.map(function (b) {
            var _a, _b, _c;
            return (React.createElement("tr", { key: b.id, className: "border-t border-gray-800" },
                React.createElement("td", { className: "py-3 px-4" },
                    React.createElement("div", { className: "flex items-center gap-3" },
                        React.createElement("input", { defaultValue: (_a = b.name) !== null && _a !== void 0 ? _a : "", maxLength: 30, placeholder: "\u0E15\u0E31\u0E49\u0E07\u0E0A\u0E37\u0E48\u0E2D\u0E42\u0E19\u0E49\u0E15\u0E02\u0E2D\u0E07\u0E1A\u0E2D\u0E17 (\u0E2A\u0E39\u0E07\u0E2A\u0E38\u0E14 30 \u0E15\u0E31\u0E27)", className: "w-[28ch] md:w-[32ch] rounded-md bg-neutral-800 border border-neutral-700 px-3 py-1.5 outline-none focus:ring-2 focus:ring-white/10", onBlur: function (e) { return saveName(b, e.target.value); } }),
                        React.createElement("div", { className: "text-xs text-gray-500 truncate max-w-[28ch]" }, b.id))),
                React.createElement("td", { className: "py-3 px-4" }, (_b = b.platform) !== null && _b !== void 0 ? _b : "—"),
                React.createElement("td", { className: "py-3 px-4" }, (_c = b.tenant) !== null && _c !== void 0 ? _c : "bn9"),
                React.createElement("td", { className: "py-3 px-4" }, b.createdAt ? new Date(b.createdAt).toLocaleString() : "—"),
                React.createElement("td", { className: "py-3 px-4" },
                    React.createElement("div", { className: "flex items-center justify-end gap-2" },
                        React.createElement("button", { onClick: function () { return toggleActive(b); }, className: "rounded-md px-3 py-1.5 border " + (b.active ? "bg-emerald-700 border-emerald-600" : "bg-neutral-800 border-neutral-700"), title: b.active ? "กำลังเปิดใช้งาน" : "ปิดอยู่" }, b.active ? "Active" : "Paused"),
                        React.createElement(react_router_dom_1.Link, { to: "/bots/" + b.id, className: "rounded-md bg-blue-600 px-3 py-1.5 hover:bg-blue-500" }, "Manage"),
                        React.createElement("button", { onClick: function () { return setOpenSecretsFor(b.id); }, className: "rounded-md bg-gray-800 px-3 py-1.5 hover:bg-gray-700" }, "Secrets"),
                        React.createElement("button", { onClick: function () { var _a; return setConfirmDel({ id: b.id, name: (_a = b.name) !== null && _a !== void 0 ? _a : undefined }); }, className: "rounded-md bg-rose-700 px-3 py-1.5 hover:bg-rose-600" }, "Delete")))));
        })));
    }
    return (React.createElement("div", { className: "min-h-screen bg-[#111214] text-gray-100 p-6" },
        React.createElement("div", { className: "max-w-6xl mx-auto space-y-6" },
            React.createElement("div", { className: "flex items-center justify-between" },
                React.createElement("h1", { className: "text-2xl font-semibold" }, "Bots"),
                React.createElement("div", { className: "flex gap-2" },
                    React.createElement("button", { onClick: load, className: "rounded-lg bg-gray-800 px-4 py-2 text-sm hover:bg-gray-700" }, "Refresh"),
                    React.createElement("button", { onClick: onInit, className: "rounded-lg bg-indigo-600 px-4 py-2 text-sm hover:bg-indigo-700" }, "Init / Create Bot"))),
            err && (React.createElement("div", { className: "text-sm text-rose-300 bg-rose-950/40 border border-rose-900 rounded-lg p-3" }, err)),
            React.createElement("div", { className: "rounded-2xl bg-[#151619] border border-gray-800 overflow-hidden" },
                React.createElement("table", { className: "w-full text-sm" },
                    React.createElement("thead", { className: "bg-[#131417] text-gray-400" },
                        React.createElement("tr", { className: "text-left" },
                            React.createElement("th", { className: "py-3 px-4" }, "Name / ID"),
                            React.createElement("th", { className: "py-3 px-4 w-28" }, "Platform"),
                            React.createElement("th", { className: "py-3 px-4 w-28" }, "Tenant"),
                            React.createElement("th", { className: "py-3 px-4 w-44" }, "Created"),
                            React.createElement("th", { className: "py-3 px-4 w-56 text-right" }, "Actions"))),
                    React.createElement("tbody", null, tableBody)))),
        openSecretsFor && (React.createElement(SecretsModal_1["default"], { botId: openSecretsFor, onClose: function () { return setOpenSecretsFor(null); }, onSaved: function () {
                setOpenSecretsFor(null);
                load();
            } })),
        confirmDel && (React.createElement(ConfirmInputModal, { title: "\u0E22\u0E37\u0E19\u0E22\u0E31\u0E19\u0E25\u0E1A\u0E1A\u0E2D\u0E17", message: "\u0E15\u0E49\u0E2D\u0E07\u0E01\u0E32\u0E23\u0E25\u0E1A \u201C" + (confirmDel.name || confirmDel.id) + "\u201D \u0E43\u0E0A\u0E48\u0E44\u0E2B\u0E21? \u0E01\u0E23\u0E38\u0E13\u0E32\u0E1E\u0E34\u0E21\u0E1E\u0E4C\u0E2D\u0E30\u0E44\u0E23\u0E01\u0E47\u0E44\u0E14\u0E49\u0E40\u0E1E\u0E37\u0E48\u0E2D\u0E22\u0E37\u0E19\u0E22\u0E31\u0E19", confirmText: "\u0E25\u0E1A\u0E40\u0E25\u0E22", onCancel: function () { return setConfirmDel(null); }, onConfirm: function (text) { return (text.trim() ? doDelete(confirmDel.id) : undefined); } }))));
}
exports["default"] = Bots;
function ConfirmInputModal(props) {
    var title = props.title, message = props.message, onCancel = props.onCancel, onConfirm = props.onConfirm, _a = props.confirmText, confirmText = _a === void 0 ? "ยืนยัน" : _a;
    var _b = react_1.useState(""), typed = _b[0], setTyped = _b[1];
    var canConfirm = typed.trim().length > 0;
    return (React.createElement("div", { className: "fixed inset-0 bg-black/60 flex items-center justify-center z-50" },
        React.createElement("dialog", { open: true, "aria-modal": "true", className: "w-full max-w-md rounded-2xl bg-[#1b1c20] border border-neutral-700 p-6" },
            React.createElement("h3", { className: "text-lg font-medium mb-2" }, title),
            React.createElement("p", { className: "text-sm text-neutral-300 mb-4" }, message),
            React.createElement("input", { autoFocus: true, value: typed, onChange: function (e) { return setTyped(e.target.value); }, className: "w-full rounded-md bg-neutral-800 border border-neutral-700 px-3 py-2 outline-none focus:ring-2 focus:ring-white/10", placeholder: "\u0E1E\u0E34\u0E21\u0E1E\u0E4C\u0E40\u0E1E\u0E37\u0E48\u0E2D\u0E22\u0E37\u0E19\u0E22\u0E31\u0E19\u2026", "aria-label": "\u0E22\u0E37\u0E19\u0E22\u0E31\u0E19\u0E01\u0E32\u0E23\u0E25\u0E1A" }),
            React.createElement("div", { className: "mt-5 flex justify-end gap-2" },
                React.createElement("button", { onClick: onCancel, className: "px-3 py-2 rounded-lg bg-neutral-700 hover:bg-neutral-600" }, "\u0E22\u0E01\u0E40\u0E25\u0E34\u0E01"),
                React.createElement("button", { onClick: function () { return canConfirm && onConfirm(typed); }, disabled: !canConfirm, className: "px-3 py-2 rounded-lg bg-rose-700 hover:bg-rose-600 disabled:opacity-60" }, confirmText)))));
}
