"use strict";
exports.__esModule = true;
exports.BotSwitcher = void 0;
var react_1 = require("react");
function BotSwitcher(_a) {
    var onChange = _a.onChange;
    var _b = react_1.useState([]), bots = _b[0], setBots = _b[1];
    var _c = react_1.useState(localStorage.getItem("BOT_ID") || ""), botId = _c[0], setBotId = _c[1];
    react_1.useEffect(function () {
        var base = import.meta.env.VITE_API_BASE;
        fetch(base + "/api/bots")
            .then(function (r) { return r.json(); })
            .then(function (x) {
            var _a;
            if ((_a = x.items) === null || _a === void 0 ? void 0 : _a.length) {
                setBots(x.items);
                // ถ้ายังไม่เคยเลือก ให้เลือกอันแรกอัตโนมัติ
                if (!botId) {
                    var first = x.items[0].id;
                    setBotId(first);
                    localStorage.setItem("BOT_ID", first);
                    onChange === null || onChange === void 0 ? void 0 : onChange(first);
                }
            }
        });
    }, []);
    return (React.createElement("div", { className: "flex items-center gap-2" },
        React.createElement("label", { className: "text-sm text-gray-500" }, "\u0E40\u0E25\u0E37\u0E2D\u0E01\u0E1A\u0E2D\u0E17:"),
        React.createElement("select", { className: "border rounded-md p-1 text-sm", value: botId, onChange: function (e) {
                var id = e.target.value;
                setBotId(id);
                localStorage.setItem("BOT_ID", id);
                onChange === null || onChange === void 0 ? void 0 : onChange(id);
            } }, bots.map(function (b) { return (React.createElement("option", { key: b.id, value: b.id },
            b.name,
            " (",
            b.platform,
            ")")); }))));
}
exports.BotSwitcher = BotSwitcher;
