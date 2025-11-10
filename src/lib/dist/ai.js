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
exports.aiReply = void 0;
// src/lib/ai.ts
var openai_1 = require("openai");
var config_1 = require("../config");
var client = null;
function getClient() {
    if (!config_1.config.OPENAI_API_KEY)
        return null;
    if (!client)
        client = new openai_1["default"]({ apiKey: config_1.config.OPENAI_API_KEY });
    return client;
}
/**
 * ให้ “พี่พลอย BN9” ตอบสั้นๆ สุภาพ โฟกัสงานบริการลูกค้า
 * - ถ้าเป็นคำถามทั่วไป: ตอบเป็นข้อความเดียว (ไม่เกิน 3 บรรทัด)
 * - ถ้าเป็นเคสปัญหา (ฝากไม่เข้า/ถอนไม่ได้/สมัคร): ให้บอกข้อมูลที่ต้องการเก็บอย่างชัดเจน
 */
function aiReply(userText) {
    var _a, _b, _c, _d, _e, _f, _g;
    return __awaiter(this, void 0, Promise, function () {
        var cli, sys, res, out, err_1;
        return __generator(this, function (_h) {
            switch (_h.label) {
                case 0:
                    cli = getClient();
                    if (!cli)
                        return [2 /*return*/, null]; // ไม่มี API key → ปล่อยให้ระบบ fallback
                    sys = [
                        "คุณคือ 'พี่พลอย BN9' แอดมินแชท บริการลูกค้า สุภาพ กระชับ และเป็นมิตร",
                        "หลักการตอบ: 1) ทักทายสั้น 2) สรุปสิ่งที่ผู้ใช้ต้องการ 3) บอกขั้นตอน/ข้อมูลที่ต้องใช้ 4) ปิดด้วยกำลังช่วยเหลือ",
                        "ถ้าเป็นเคส 'ฝากไม่เข้า' ให้ขอ USER, เบอร์, ธนาคาร, เลขบัญชี, เวลา, สลิป",
                        "ถ้าเป็นเคส 'ถอนไม่ได้' ให้ขอ USER, เบอร์, ธนาคาร, เลขบัญชี, สลิป",
                        "ตอบภาษาไทย ไม่เกิน 3 บรรทัด",
                    ].join("\n");
                    _h.label = 1;
                case 1:
                    _h.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, cli.responses.create({
                            model: config_1.config.OPENAI_MODEL,
                            input: [
                                { role: "system", content: sys },
                                { role: "user", content: userText },
                            ]
                        })];
                case 2:
                    res = _h.sent();
                    out = ((_a = res.output_text) === null || _a === void 0 ? void 0 : _a.trim()) || ((_g = (_f = (_e = (_d = (_c = (_b = res.choices) === null || _b === void 0 ? void 0 : _b[0]) === null || _c === void 0 ? void 0 : _c.message) === null || _d === void 0 ? void 0 : _d.content) === null || _e === void 0 ? void 0 : _e[0]) === null || _f === void 0 ? void 0 : _f.text) === null || _g === void 0 ? void 0 : _g.trim()) ||
                        "";
                    return [2 /*return*/, out || null];
                case 3:
                    err_1 = _h.sent();
                    console.warn("[AI reply error]", err_1);
                    return [2 /*return*/, null];
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.aiReply = aiReply;
