"use strict";
exports.__esModule = true;
exports.connectEvents = void 0;
function connectEvents(tenant) {
    if (tenant === void 0) { tenant = import.meta.env.VITE_TENANT; }
    var url = import.meta.env.VITE_API_BASE + "/api/events?tenant=" + tenant;
    var es = new EventSource(url, { withCredentials: false });
    es.addEventListener('hello', function (e) { return console.log('hello', e.data); });
    es.addEventListener('ping', function (e) { });
    es.addEventListener('message', function (e) {
        var msg = JSON.parse(e.data || '{}');
        if (msg.type === 'case:new' || msg.type === 'stats:update') {
            // เรียกโหลดข้อมูลใหม่
            loadAll(msg.botId);
        }
    });
    return es;
}
exports.connectEvents = connectEvents;
