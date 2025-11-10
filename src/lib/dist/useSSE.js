"use strict";
exports.__esModule = true;
exports.useSSE = void 0;
var react_1 = require("react");
function useSSE(tenant, onEvent) {
    react_1.useEffect(function () {
        var es = new EventSource("/api/live/" + encodeURIComponent(tenant));
        es.onmessage = function (ev) {
            try {
                onEvent(JSON.parse(ev.data));
            }
            catch (_a) { }
        };
        es.addEventListener("ping", function () { });
        es.onerror = function () { };
        return function () { return es.close(); };
    }, [tenant, onEvent]);
}
exports.useSSE = useSSE;
