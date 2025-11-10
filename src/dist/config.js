"use strict";
var _a, _b, _c, _d;
exports.__esModule = true;
exports.config = void 0;
require("dotenv/config");
var zod_1 = require("zod");
var envSchema = zod_1.z.object({
    PORT: zod_1.z.coerce.number()["default"](3000),
    JWT_SECRET: zod_1.z.string().min(1)["default"]("bn9_dev_secret"),
    JWT_EXPIRE: zod_1.z.string().min(1)["default"]("7d"),
    SECRET_ENC_KEY_BN9: zod_1.z.string().length(32, "SECRET_ENC_KEY_BN9 must be 32 characters long"),
    ALLOWED_ORIGINS: zod_1.z.string().min(1)["default"]("http://localhost:5173"),
    ENABLE_ADMIN_API: zod_1.z["enum"](["1", "0"])["default"]("0"),
    OPENAI_API_KEY: zod_1.z.string().min(1).optional(),
    OPENAI_MODEL: zod_1.z.string()["default"]("gpt-4o-mini")
});
var parsed = envSchema.safeParse(process.env);
if (!parsed.success) {
    console.error("[INVALID ENV]", parsed.error.flatten().fieldErrors);
    process.exit(1);
}
exports.config = {
    PORT: Number((_a = process.env.PORT) !== null && _a !== void 0 ? _a : 3000),
    ENABLE_ADMIN_API: (_b = process.env.ENABLE_ADMIN_API) !== null && _b !== void 0 ? _b : "0",
    ALLOWED_ORIGINS: (_c = process.env.ALLOWED_ORIGINS) !== null && _c !== void 0 ? _c : "http://localhost:5173",
    OPENAI_API_KEY: process.env.OPENAI_API_KEY,
    OPENAI_MODEL: (_d = process.env.OPENAI_MODEL) !== null && _d !== void 0 ? _d : "gpt-4o-mini"
};
