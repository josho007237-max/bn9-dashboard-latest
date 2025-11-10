"use strict";
// src/lib/live.ts
/**
 * Realtime (SSE) client for BN9 dashboard
 * Server endpoint (example):  GET  /api/live/:tenant
 */
exports.__esModule = true;
exports.connectEvents = void 0;
/**
 * เปิด SSE แล้วเรียก callback ทุกครั้งที่มี event ใหม่
 * @param tenant  เช่น "bn9"
 * @param onEvent (type) => void
 */
function connectEvents(tenant, onEvent) {
    var _a;
    // ถ้าไม่ได้ตั้งค่า VITE_API_BASE จะ fallback เป็น origin ปัจจุบัน
    var API_BASE = ((_a = import.meta.env) === null || _a === void 0 ? void 0 : _a.VITE_API_BASE) || "";
    // ตัวอย่าง backend: app.get("/api/live/:tenant", sseHandler)
    var url = API_BASE + "/api/live/" + encodeURIComponent(tenant);
    var es = new EventSource(url, { withCredentials: false });
    es.onmessage = function (ev) {
        // payload จาก server อาจเป็น { type: "stats:update" } หรือ string ล้วน
        try {
            var data = JSON.parse(ev.data);
            var t = ((data === null || data === void 0 ? void 0 : data.type) || "unknown");
            onEvent(t);
        }
        catch (_a) {
            var txt = (ev.data || "").toString();
            var t = txt === "stats:update" || txt === "case:new" || txt === "ping"
                ? txt
                : "unknown";
            onEvent(t);
        }
    };
    es.onerror = function () {
        // ปล่อยให้ fallback polling ทำงานต่อไป
        // ปิดท่อเพื่อเลิก reconnect อัตโนมัติของ EventSource
        try {
            es.close();
        }
        catch (_a) { }
    };
    // คืนฟังก์ชันสำหรับยกเลิก
    return function () {
        try {
            es.close();
        }
        catch (_a) { }
    };
}
exports.connectEvents = connectEvents;
