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
// src/components/CreateBotModal.tsx
var react_1 = require("react");
var api_1 = require("../lib/api");
var EMPTY = {
    name: "",
    openaiApiKey: "",
    lineAccessToken: "",
    lineChannelSecret: ""
};
function CreateBotModal(_a) {
    var onClose = _a.onClose, onDone = _a.onDone;
    var _b = react_1.useState(EMPTY), form = _b[0], setForm = _b[1];
    var _c = react_1.useState({}), errs = _c[0], setErrs = _c[1];
    var _d = react_1.useState(false), saving = _d[0], setSaving = _d[1];
    var _e = react_1.useState(null), banner = _e[0], setBanner = _e[1];
    // ids เพื่อผูก label ↔ input
    var idName = react_1.useId();
    var idOpenai = react_1.useId();
    var idAccTok = react_1.useId();
    var idSecret = react_1.useId();
    function update(k, v) {
        setForm(function (s) {
            var _a;
            return (__assign(__assign({}, s), (_a = {}, _a[k] = v, _a)));
        });
        setErrs(function (e) {
            var _a;
            return (__assign(__assign({}, e), (_a = {}, _a[k] = undefined, _a)));
        });
    }
    function validateAll(f) {
        var _a, _b, _c;
        var e = {};
        if (!f.name.trim())
            e.name = "กรุณาตั้งชื่อบอท";
        if (!((_a = f.openaiApiKey) === null || _a === void 0 ? void 0 : _a.trim()))
            e.openaiApiKey = "กรอก OpenAI API Key";
        else if (!/^sk-(proj-)?[A-Za-z0-9_]/.test(f.openaiApiKey.trim()))
            e.openaiApiKey = "ฟอร์แมตไม่ถูกต้อง (ควรขึ้นต้นด้วย sk- หรือ sk-proj-)";
        if (!((_b = f.lineAccessToken) === null || _b === void 0 ? void 0 : _b.trim()))
            e.lineAccessToken = "กรอก LINE Channel Access Token";
        else if (f.lineAccessToken.trim().length < 30)
            e.lineAccessToken = "สั้นเกินไป (≥ 30)";
        if (!((_c = f.lineChannelSecret) === null || _c === void 0 ? void 0 : _c.trim()))
            e.lineChannelSecret = "กรอก LINE Channel Secret";
        else if (!/^[A-Za-z0-9]{32}$/.test(f.lineChannelSecret.trim()))
            e.lineChannelSecret = "ควรเป็นตัวอักษร/ตัวเลข 32 ตัว";
        return e;
    }
    function onCreate() {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function () {
            var e, msg, bot, botId, err_1;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        setBanner(null);
                        e = validateAll(form);
                        setErrs(e);
                        if (Object.values(e).some(Boolean)) {
                            setBanner("กรุณาแก้ไขข้อมูลให้ถูกต้องครบทุกช่องก่อนบันทึก");
                            return [2 /*return*/];
                        }
                        msg = "ยืนยันสร้างบอทใหม่ พร้อมบันทึก Secrets?\n" +
                            ("\u2022 name: " + short(form.name) + "\n") +
                            ("\u2022 openaiApiKey: " + short(form.openaiApiKey) + "\n") +
                            ("\u2022 lineAccessToken: " + short(form.lineAccessToken) + "\n") +
                            ("\u2022 lineChannelSecret: " + short(form.lineChannelSecret));
                        if (!((_a = globalThis.confirm) === null || _a === void 0 ? void 0 : _a.call(globalThis, msg)))
                            return [2 /*return*/];
                        _c.label = 1;
                    case 1:
                        _c.trys.push([1, 5, 6, 7]);
                        setSaving(true);
                        return [4 /*yield*/, api_1.initBot()];
                    case 2:
                        bot = (_c.sent()).bot;
                        botId = (_b = bot) === null || _b === void 0 ? void 0 : _b.id;
                        // 2) ตั้งชื่อ (optional) — reuse API meta patch ผ่าน /bots/:id (รองรับในฝั่ง backend แล้ว)
                        // ใช้ fetch ตรงเพื่อเลี่ยงการดึง type เพิ่ม
                        return [4 /*yield*/, fetch("/api/bots/" + botId, {
                                method: "PATCH",
                                headers: { "Content-Type": "application/json" },
                                body: JSON.stringify({ name: form.name.trim() })
                            })["catch"](function () { })];
                    case 3:
                        // 2) ตั้งชื่อ (optional) — reuse API meta patch ผ่าน /bots/:id (รองรับในฝั่ง backend แล้ว)
                        // ใช้ fetch ตรงเพื่อเลี่ยงการดึง type เพิ่ม
                        _c.sent();
                        // 3) บันทึก secrets
                        return [4 /*yield*/, api_1.updateBotSecrets(botId, {
                                openaiApiKey: form.openaiApiKey.trim(),
                                lineAccessToken: form.lineAccessToken.trim(),
                                lineChannelSecret: form.lineChannelSecret.trim()
                            })];
                    case 4:
                        // 3) บันทึก secrets
                        _c.sent();
                        setBanner("สร้างบอทสำเร็จ ✅");
                        // clear แล้วปิด modal
                        setForm(EMPTY);
                        onDone();
                        onClose();
                        return [3 /*break*/, 7];
                    case 5:
                        err_1 = _c.sent();
                        setBanner((err_1 === null || err_1 === void 0 ? void 0 : err_1.message) || "สร้างบอทไม่สำเร็จ");
                        return [3 /*break*/, 7];
                    case 6:
                        setSaving(false);
                        return [7 /*endfinally*/];
                    case 7: return [2 /*return*/];
                }
            });
        });
    }
    return (React.createElement("div", { className: "fixed inset-0 bg-black/60 z-50 flex items-center justify-center" },
        React.createElement("dialog", { open: true, role: "dialog", "aria-modal": "true", className: "w-full max-w-xl rounded-2xl bg-[#1b1c20] border border-neutral-700 p-6" },
            React.createElement("h3", { className: "text-lg font-medium mb-4" }, "Create Bot"),
            banner && (React.createElement("div", { className: "mb-3 text-sm text-amber-300 bg-amber-900/30 border border-amber-700 rounded px-3 py-2" }, banner)),
            React.createElement("div", { className: "space-y-4" },
                React.createElement(Labeled, { id: idName, label: "Bot Name", error: errs.name },
                    React.createElement("input", { id: idName, value: form.name, onChange: function (e) { return update("name", e.target.value); }, maxLength: 30, className: inputCls(!!errs.name), autoComplete: "off", "aria-invalid": !!errs.name })),
                React.createElement(Labeled, { id: idOpenai, label: "OpenAI API Key", error: errs.openaiApiKey },
                    React.createElement("input", { id: idOpenai, value: form.openaiApiKey, onChange: function (e) { return update("openaiApiKey", e.target.value); }, className: inputCls(!!errs.openaiApiKey), autoComplete: "off", "aria-invalid": !!errs.openaiApiKey })),
                React.createElement(Labeled, { id: idAccTok, label: "LINE Channel Access Token", error: errs.lineAccessToken },
                    React.createElement("input", { id: idAccTok, value: form.lineAccessToken, onChange: function (e) { return update("lineAccessToken", e.target.value); }, className: inputCls(!!errs.lineAccessToken), autoComplete: "off", "aria-invalid": !!errs.lineAccessToken })),
                React.createElement(Labeled, { id: idSecret, label: "LINE Channel Secret", error: errs.lineChannelSecret },
                    React.createElement("input", { id: idSecret, value: form.lineChannelSecret, onChange: function (e) { return update("lineChannelSecret", e.target.value); }, className: inputCls(!!errs.lineChannelSecret), autoComplete: "off", "aria-invalid": !!errs.lineChannelSecret }))),
            React.createElement("div", { className: "mt-5 flex justify-end gap-2" },
                React.createElement("button", { onClick: onClose, className: "px-3 py-2 rounded-lg bg-neutral-700 hover:bg-neutral-600" }, "\u0E1B\u0E34\u0E14"),
                React.createElement("button", { onClick: onCreate, disabled: saving, className: "px-3 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 disabled:opacity-60" }, saving ? "กำลังบันทึก…" : "บันทึกและสร้างบอท")))));
}
exports["default"] = CreateBotModal;
function Labeled(_a) {
    var id = _a.id, label = _a.label, error = _a.error, children = _a.children;
    return (React.createElement("label", { htmlFor: id, className: "block" },
        React.createElement("div", { className: "text-sm text-neutral-300 mb-1" }, label),
        children,
        error && React.createElement("div", { className: "mt-1 text-xs text-rose-300" }, error)));
}
function inputCls(invalid) {
    return [
        "w-full rounded-md bg-neutral-800 border px-3 py-2 outline-none",
        invalid
            ? "border-rose-600 focus:ring-2 focus:ring-rose-500/30"
            : "border-neutral-700 focus:ring-2 focus:ring-white/10",
    ].join(" ");
}
function short(v) {
    if (!v)
        return "(empty)";
    return v.length <= 8 ? v : v.slice(0, 3) + "…" + v.slice(-3);
}
