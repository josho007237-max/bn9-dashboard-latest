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
exports.__esModule = true;
// src/pages/Login.tsx
var react_1 = require("react");
var react_router_dom_1 = require("react-router-dom");
var api_1 = require("../lib/api"); // login(email, password) => { token: string }
var TOKEN_KEY = "BN9_TOKEN";
function Login() {
    var nav = react_router_dom_1.useNavigate();
    var _a = react_1.useState("admin@bn9.local"), email = _a[0], setEmail = _a[1];
    var _b = react_1.useState("admin123"), password = _b[0], setPassword = _b[1];
    var _c = react_1.useState(false), loading = _c[0], setLoading = _c[1];
    var _d = react_1.useState(null), err = _d[0], setErr = _d[1];
    var _e = react_1.useState(false), showPwd = _e[0], setShowPwd = _e[1];
    // ถ้ามี token แล้ว → เด้งเข้าหน้า /bots
    react_1.useEffect(function () {
        try {
            var tok = localStorage.getItem(TOKEN_KEY);
            if (tok && tok.trim())
                nav("/bots", { replace: true });
        }
        catch (_a) {
            /* ignore storage errors */
        }
    }, [nav]);
    function onSubmit(e) {
        return __awaiter(this, void 0, void 0, function () {
            var token, ex_1, msg;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        e.preventDefault();
                        if (loading)
                            return [2 /*return*/];
                        setErr(null);
                        setLoading(true);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, 4, 5]);
                        return [4 /*yield*/, api_1.login(email.trim(), password)];
                    case 2:
                        token = (_a.sent()).token;
                        // ซ้ำกับใน lib/api แต่ไม่เป็นไร—กันพลาด
                        try {
                            localStorage.setItem(TOKEN_KEY, token);
                        }
                        catch (_b) { }
                        nav("/bots", { replace: true });
                        return [3 /*break*/, 5];
                    case 3:
                        ex_1 = _a.sent();
                        msg = String((ex_1 === null || ex_1 === void 0 ? void 0 : ex_1.message) || "");
                        if (/401|unauthorized|invalid/i.test(msg)) {
                            setErr("อีเมลหรือรหัสผ่านไม่ถูกต้อง");
                        }
                        else if (/fetch|network|Failed to fetch|Network Error/i.test(msg)) {
                            setErr("ติดต่อเซิร์ฟเวอร์ไม่ได้ กรุณาตรวจสอบ API Base หรืออินเทอร์เน็ต");
                        }
                        else {
                            setErr(msg || "Login failed");
                        }
                        return [3 /*break*/, 5];
                    case 4:
                        setLoading(false);
                        return [7 /*endfinally*/];
                    case 5: return [2 /*return*/];
                }
            });
        });
    }
    return (React.createElement("div", { className: "min-h-screen grid place-items-center bg-gray-50 text-gray-900 p-6" },
        React.createElement("div", { className: "w-full max-w-md rounded-2xl bg-white shadow-lg border border-gray-200 p-6" },
            React.createElement("div", { className: "flex items-start justify-between" },
                React.createElement("div", null,
                    React.createElement("h1", { className: "text-2xl font-semibold tracking-tight" }, "BN9 Login"),
                    React.createElement("p", { className: "text-xs text-gray-500 mt-1" },
                        "API: ",
                        api_1.getApiBase())),
                React.createElement("button", { type: "button", onClick: function () {
                        setEmail("root@bn9.local");
                        setPassword("bn9@12345");
                    }, className: "text-xs text-indigo-600 hover:text-indigo-700", title: "\u0E01\u0E23\u0E2D\u0E01\u0E04\u0E48\u0E32\u0E40\u0E14\u0E42\u0E21\u0E48" }, "demo")),
            React.createElement("form", { onSubmit: onSubmit, className: "mt-6 space-y-4" },
                React.createElement("div", null,
                    React.createElement("label", { htmlFor: "email", className: "block text-sm font-medium text-gray-700" }, "Email"),
                    React.createElement("input", { id: "email", name: "email", type: "email", autoComplete: "username", className: "mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-500", value: email, onChange: function (e) { return setEmail(e.target.value); }, required: true })),
                React.createElement("div", null,
                    React.createElement("label", { htmlFor: "password", className: "block text-sm font-medium text-gray-700" }, "Password"),
                    React.createElement("div", { className: "mt-1 relative" },
                        React.createElement("input", { id: "password", name: "password", type: showPwd ? "text" : "password", autoComplete: "current-password", className: "w-full rounded-lg border border-gray-300 px-3 py-2 pr-10 outline-none focus:ring-2 focus:ring-indigo-500", value: password, onChange: function (e) { return setPassword(e.target.value); }, required: true }),
                        React.createElement("button", { type: "button", onClick: function () { return setShowPwd(function (v) { return !v; }); }, className: "absolute inset-y-0 right-0 px-3 text-gray-500 hover:text-gray-700 text-sm", title: showPwd ? "ซ่อนรหัสผ่าน" : "แสดงรหัสผ่าน" }, showPwd ? "Hide" : "Show"))),
                err && (React.createElement("div", { className: "text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg p-2" }, err)),
                React.createElement("button", { type: "submit", disabled: loading, className: "w-full rounded-lg bg-indigo-600 text-white font-medium py-2.5 hover:bg-indigo-700 active:scale-[.99] transition disabled:opacity-60" }, loading ? "Signing in..." : "Sign in"),
                React.createElement("div", { className: "flex items-center justify-between text-xs text-gray-500" },
                    React.createElement("span", null,
                        "Tenant: ",
                        import.meta.env.VITE_TENANT || "bn9"),
                    React.createElement("span", null,
                        "v",
                        import.meta.env.VITE_APP_VERSION || "dev"))))));
}
exports["default"] = Login;
