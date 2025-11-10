"use strict";
exports.__esModule = true;
// src/App.tsx
var react_router_dom_1 = require("react-router-dom");
var react_1 = require("react");
var TOKEN_KEY = "BN9_TOKEN";
function App() {
    var nav = react_router_dom_1.useNavigate();
    var onLogout = react_1.useCallback(function () {
        try {
            localStorage.removeItem(TOKEN_KEY);
        }
        catch (_a) { }
        nav("/login", { replace: true });
    }, [nav]);
    return (React.createElement("div", { className: "min-h-screen bg-[#0f1113] text-gray-100" },
        React.createElement("header", { className: "sticky top-0 z-10 bg-[#0f1113]/80 backdrop-blur border-b border-neutral-800" },
            React.createElement("div", { className: "max-w-6xl mx-auto px-4 py-3 flex items-center gap-3" },
                React.createElement(react_router_dom_1.Link, { to: "/dashboard", className: "text-lg font-semibold" }, "BN9"),
                React.createElement("nav", { className: "ml-auto flex items-center gap-2 text-sm" },
                    React.createElement(react_router_dom_1.Link, { to: "/dashboard", className: "px-3 py-1.5 rounded-lg hover:bg-white/5" }, "Dashboard"),
                    React.createElement(react_router_dom_1.Link, { to: "/bots", className: "px-3 py-1.5 rounded-lg hover:bg-white/5" }, "Bots"),
                    React.createElement("button", { onClick: onLogout, className: "ml-2 px-3 py-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 border border-neutral-700", title: "\u0E2D\u0E2D\u0E01\u0E08\u0E32\u0E01\u0E23\u0E30\u0E1A\u0E1A" }, "Logout")))),
        React.createElement("main", { className: "max-w-6xl mx-auto px-4 py-6" },
            React.createElement(react_router_dom_1.Outlet, null))));
}
exports["default"] = App;
