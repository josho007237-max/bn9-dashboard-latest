"use strict";
exports.__esModule = true;
// src/main.tsx
var react_1 = require("react");
var client_1 = require("react-dom/client");
var react_router_dom_1 = require("react-router-dom");
var react_hot_toast_1 = require("react-hot-toast");
var App_1 = require("./App"); // <- ต้องเป็น Layout ที่มี <Outlet />
var Dashboard_1 = require("./pages/Dashboard");
var Bots_1 = require("./pages/Bots");
var BotDetail_1 = require("./pages/BotDetail");
var Login_1 = require("./pages/Login");
require("./index.css");
var TOKEN_KEY = "BN9_TOKEN";
/* ----------------------------- helpers ----------------------------- */
function hasToken() {
    try {
        return !!localStorage.getItem(TOKEN_KEY);
    }
    catch (_a) {
        return false;
    }
}
// เลื่อนขึ้นบนสุดเมื่อเปลี่ยนเส้นทาง
function ScrollTop() {
    var pathname = react_router_dom_1.useLocation().pathname;
    react_1["default"].useEffect(function () {
        try {
            window.scrollTo(0, 0);
        }
        catch (_a) { }
    }, [pathname]);
    return null;
}
// ป้องกันหน้า protected ถ้ายังไม่มี token
function AuthGate(_a) {
    var children = _a.children;
    if (!hasToken())
        return react_1["default"].createElement(react_router_dom_1.Navigate, { to: "/login", replace: true });
    return react_1["default"].createElement(react_1["default"].Fragment, null, children);
}
// หน้า error ของ router
function RouteError() {
    return (react_1["default"].createElement("div", { className: "p-6" },
        react_1["default"].createElement("h2", { className: "text-lg font-semibold" }, "\u0E40\u0E01\u0E34\u0E14\u0E02\u0E49\u0E2D\u0E1C\u0E34\u0E14\u0E1E\u0E25\u0E32\u0E14\u0E02\u0E2D\u0E07\u0E40\u0E2A\u0E49\u0E19\u0E17\u0E32\u0E07"),
        react_1["default"].createElement("p", { className: "text-sm text-neutral-500" }, "\u0E25\u0E2D\u0E07\u0E23\u0E35\u0E40\u0E1F\u0E23\u0E0A\u0E2B\u0E19\u0E49\u0E32 \u0E2B\u0E23\u0E37\u0E2D\u0E01\u0E25\u0E31\u0E1A\u0E44\u0E1B\u0E2B\u0E19\u0E49\u0E32\u0E41\u0E23\u0E01"),
        react_1["default"].createElement("a", { href: "/", className: "text-indigo-500 underline" }, "\u0E01\u0E25\u0E31\u0E1A\u0E2B\u0E19\u0E49\u0E32\u0E41\u0E23\u0E01")));
}
/* ------------------------------ router ------------------------------ */
var router = react_router_dom_1.createBrowserRouter([
    // public route
    { path: "/login", element: react_1["default"].createElement(Login_1["default"], null) },
    // shell + nested routes
    {
        path: "/",
        element: (react_1["default"].createElement(react_1["default"].Fragment, null,
            react_1["default"].createElement(ScrollTop, null),
            react_1["default"].createElement(App_1["default"], null))),
        errorElement: react_1["default"].createElement(RouteError, null),
        children: [
            {
                element: (react_1["default"].createElement(AuthGate, null,
                    react_1["default"].createElement(react_router_dom_1.Outlet, null))),
                children: [
                    { index: true, element: react_1["default"].createElement(Dashboard_1["default"], null) },
                    { path: "dashboard", element: react_1["default"].createElement(Dashboard_1["default"], null) },
                    { path: "bots", element: react_1["default"].createElement(Bots_1["default"], null) },
                    { path: "bots/:botId", element: react_1["default"].createElement(BotDetail_1["default"], null) },
                ]
            },
            { path: "*", element: react_1["default"].createElement(react_router_dom_1.Navigate, { to: "/", replace: true }) },
        ]
    },
]);
function Root() {
    return (react_1["default"].createElement(react_1["default"].Fragment, null,
        react_1["default"].createElement(react_router_dom_1.RouterProvider, { router: router }),
        react_1["default"].createElement(react_hot_toast_1.Toaster, { position: "top-right" })));
}
/* ------------------------------ mount ------------------------------ */
client_1["default"].createRoot(document.getElementById("root")).render(react_1["default"].createElement(react_1["default"].StrictMode, null,
    react_1["default"].createElement(Root, null)));
