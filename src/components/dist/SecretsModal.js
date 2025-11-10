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
// src/components/SecretsModal.tsx
var react_1 = require("react");
var api_1 = require("../lib/api");
var EMPTY = { openaiApiKey: "", lineAccessToken: "", lineChannelSecret: "" };
function SecretsModal(props) {
    var _this = this;
    var botId = props.botId, onClose = props.onClose, onSaved = props.onSaved;
    var _a = react_1.useState({}), masked = _a[0], setMasked = _a[1];
    var _b = react_1.useState(EMPTY), form = _b[0], setForm = _b[1];
    var _c = react_1.useState({}), errs = _c[0], setErrs = _c[1];
    var _d = react_1.useState(false), saving = _d[0], setSaving = _d[1];
    var _e = react_1.useState(null), banner = _e[0], setBanner = _e[1];
    // ids สำหรับ label ↔ input
    var idOpenai = react_1.useId();
    var idAccTok = react_1.useId();
    var idSecret = react_1.useId();
    react_1.useEffect(function () {
        (function () { return __awaiter(_this, void 0, void 0, function () {
            var m, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, api_1.getBotSecrets(botId)];
                    case 1:
                        m = _a.sent();
                        setMasked(m !== null && m !== void 0 ? m : {});
                        setForm(EMPTY);
                        setErrs({});
                        setBanner(null);
                        return [3 /*break*/, 3];
                    case 2:
                        e_1 = _a.sent();
                        setBanner((e_1 === null || e_1 === void 0 ? void 0 : e_1.message) || "โหลด secrets ไม่สำเร็จ");
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); })();
    }, [botId]);
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
        // OpenAI Key: ขึ้นต้น sk- หรือ sk-proj-
        if (!((_a = f.openaiApiKey) === null || _a === void 0 ? void 0 : _a.trim()))
            e.openaiApiKey = "กรอก OpenAI API Key";
        else if (!/^sk-(proj-)?[A-Za-z0-9_-]/.test(f.openaiApiKey.trim()))
            e.openaiApiKey = "ฟอร์แมตไม่ถูกต้อง (ควรขึ้นต้นด้วย sk- หรือ sk-proj-)";
        // LINE Access Token: อย่างน้อย ~30 ตัว
        if (!((_b = f.lineAccessToken) === null || _b === void 0 ? void 0 : _b.trim()))
            e.lineAccessToken = "กรอก LINE Channel Access Token";
        else if (f.lineAccessToken.trim().length < 30)
            e.lineAccessToken = "สั้นเกินไป (ควรยาว ≥ 30 ตัวอักษร)";
        // LINE Channel Secret: 32 ตัวอักษร/ตัวเลข
        if (!((_c = f.lineChannelSecret) === null || _c === void 0 ? void 0 : _c.trim()))
            e.lineChannelSecret = "กรอก LINE Channel Secret";
        else if (!/^[A-Za-z0-9]{32}$/.test(f.lineChannelSecret.trim()))
            e.lineChannelSecret = "ควรเป็นตัวอักษร/ตัวเลข 32 ตัว";
        return e;
    }
    function onSave() {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function () {
            var e, ok, ref, e_2;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        setBanner(null);
                        e = validateAll(form);
                        setErrs(e);
                        if (Object.values(e).some(Boolean)) {
                            setBanner("กรุณาแก้ไขข้อมูลให้ถูกต้องครบทั้ง 3 ช่องก่อนบันทึก");
                            return [2 /*return*/];
                        }
                        ok = ((_b = (_a = globalThis.confirm) === null || _a === void 0 ? void 0 : _a.call(globalThis, "ยืนยันบันทึกค่าเหล่านี้?\n" +
                            ("\u2022 openaiApiKey: " + short(form.openaiApiKey) + "\n") +
                            ("\u2022 lineAccessToken: " + short(form.lineAccessToken) + "\n") +
                            ("\u2022 lineChannelSecret: " + short(form.lineChannelSecret)))) !== null && _b !== void 0 ? _b : true);
                        if (!ok)
                            return [2 /*return*/];
                        _c.label = 1;
                    case 1:
                        _c.trys.push([1, 4, 5, 6]);
                        setSaving(true);
                        return [4 /*yield*/, api_1.updateBotSecrets(botId, {
                                openaiApiKey: form.openaiApiKey.trim(),
                                lineAccessToken: form.lineAccessToken.trim(),
                                lineChannelSecret: form.lineChannelSecret.trim()
                            })];
                    case 2:
                        _c.sent();
                        setBanner("บันทึกสำเร็จ ✅");
                        return [4 /*yield*/, api_1.getBotSecrets(botId)];
                    case 3:
                        ref = _c.sent();
                        setMasked(ref !== null && ref !== void 0 ? ref : {});
                        setForm(EMPTY);
                        setErrs({});
                        onSaved();
                        return [3 /*break*/, 6];
                    case 4:
                        e_2 = _c.sent();
                        setBanner((e_2 === null || e_2 === void 0 ? void 0 : e_2.message) || "บันทึกไม่สำเร็จ");
                        return [3 /*break*/, 6];
                    case 5:
                        setSaving(false);
                        return [7 /*endfinally*/];
                    case 6: return [2 /*return*/];
                }
            });
        });
    }
    return (React.createElement("div", { className: "fixed inset-0 bg-black/60 flex items-center justify-center z-50" },
        React.createElement("dialog", { open: true, "aria-modal": "true", className: "w-full max-w-xl rounded-2xl bg-[#1b1c20] border border-neutral-700 p-6" },
            React.createElement("h3", { className: "text-lg font-medium mb-4" }, "Secrets"),
            banner && (React.createElement("div", { className: "mb-3 text-sm text-amber-300 bg-amber-900/30 border border-amber-700 rounded px-3 py-2" }, banner)),
            React.createElement("div", { className: "space-y-4" },
                React.createElement(Field, { id: idOpenai, label: "OpenAI API Key", error: errs.openaiApiKey },
                    React.createElement("input", { id: idOpenai, className: inputCls(!!errs.openaiApiKey), placeholder: masked.openaiApiKey ? "******** (พิมพ์ใหม่เพื่อแทนที่เดิม)" : "", value: form.openaiApiKey, onChange: function (e) { return update("openaiApiKey", e.target.value); }, autoComplete: "off", "aria-invalid": !!errs.openaiApiKey })),
                React.createElement(Field, { id: idAccTok, label: "LINE Channel Access Token", error: errs.lineAccessToken },
                    React.createElement("textarea", { id: idAccTok, rows: 3, className: inputCls(!!errs.lineAccessToken), placeholder: masked.lineAccessToken ? "******** (พิมพ์ใหม่เพื่อแทนที่เดิม)" : "", value: form.lineAccessToken, onChange: function (e) { return update("lineAccessToken", e.target.value); }, autoComplete: "off", "aria-invalid": !!errs.lineAccessToken })),
                React.createElement(Field, { id: idSecret, label: "LINE Channel Secret", error: errs.lineChannelSecret },
                    React.createElement("input", { id: idSecret, className: inputCls(!!errs.lineChannelSecret), placeholder: masked.lineChannelSecret ? "******** (พิมพ์ใหม่เพื่อแทนที่เดิม)" : "", value: form.lineChannelSecret, onChange: function (e) { return update("lineChannelSecret", e.target.value); }, autoComplete: "off", "aria-invalid": !!errs.lineChannelSecret }))),
            React.createElement("div", { className: "mt-5 flex justify-end gap-2" },
                React.createElement("button", { onClick: onClose, className: "px-3 py-2 rounded-lg bg-neutral-700 hover:bg-neutral-600" }, "\u0E1B\u0E34\u0E14"),
                React.createElement("button", { onClick: onSave, disabled: saving, className: "px-3 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 disabled:opacity-60" }, saving ? "กำลังบันทึก…" : "บันทึก")))));
}
exports["default"] = SecretsModal;
function Field(_a) {
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
