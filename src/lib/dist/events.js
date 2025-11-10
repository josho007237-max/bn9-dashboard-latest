"use strict";
exports.__esModule = true;
exports.connectEvents = void 0;
function connectEvents(opts) {
    var _a;
    var url = new URL(((_a = import.meta.env.VITE_API_BASE) !== null && _a !== void 0 ? _a : "") + "/api/events");
    url.searchParams.set("tenant", opts.tenant);
    var es = new EventSource(url.toString(), { withCredentials: false });
    es.addEventListener("hello", function () { var _a; return (_a = opts.onHello) === null || _a === void 0 ? void 0 : _a.call(opts); });
    es.addEventListener("ping", function () { var _a; return (_a = opts.onPing) === null || _a === void 0 ? void 0 : _a.call(opts); });
    es.addEventListener("case:new", (function (e) {
        var _a;
        var data = JSON.parse(e.data);
        (_a = opts.onCaseNew) === null || _a === void 0 ? void 0 : _a.call(opts, data);
    }));
    es.addEventListener("stats:update", (function (e) {
        var _a;
        var data = JSON.parse(e.data);
        (_a = opts.onStatsUpdate) === null || _a === void 0 ? void 0 : _a.call(opts, data);
    }));
    return function () { return es.close(); };
}
exports.connectEvents = connectEvents;
