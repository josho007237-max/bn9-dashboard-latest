// src/lib/api.ts
/// <reference types="vite/client" />

import axios, {
  AxiosError,
  InternalAxiosRequestConfig,
  AxiosRequestHeaders,
} from "axios";

/* ============================ Local Types ============================ */

export type Health = { ok: boolean; time?: string; adminApi?: boolean };

export type BotItem = {
  id: string;
  name: string;
  platform: "line";
  active: boolean;
  tenant?: string | null;
  verifiedAt?: string | null;
  createdAt?: string;
  updatedAt?: string;
};

export type BotListResponse = { ok: boolean; items: BotItem[] };
export type BotGetResponse = { ok: boolean; bot: BotItem };

export type BotSecretsPayload = {
  openaiApiKey?: string | null;
  lineAccessToken?: string | null;
  lineChannelSecret?: string | null;
  // alias เก่า — เผื่อมีการใช้ชื่อเดิม
  openaiKey?: string | null;
  lineSecret?: string | null;
};

export type BotSecretsMasked = {
  openaiApiKey?: string;      // "********" ถ้ามีค่า
  lineAccessToken?: string;   // "********" ถ้ามีค่า
  lineChannelSecret?: string; // "********" ถ้ามีค่า
};

export type CaseItem = {
  id: string;
  botId: string;
  userId?: string | null;
  text?: string | null;
  kind?: string | null; // deposit/withdraw/kyc/register/other
  createdAt?: string;
};
export type RecentCasesResponse = { ok: boolean; items: CaseItem[] };

export type DailyStat = {
  botId: string;
  dateKey: string; // YYYY-MM-DD
  total: number;
  text: number;
  follow: number;
  unfollow: number;
};

export type DailyResp = {
  ok: boolean;
  dateKey: string;
  stats: DailyStat;
};

export type RangeItem = {
  dateKey: string;
  total: number;
  text: number;
  follow: number;
  unfollow: number;
};

export type RangeResp = {
  ok: boolean;
  items: RangeItem[];
  summary: { total: number; text: number; follow: number; unfollow: number };
};

/* ================================ Base ================================ */

// ถ้า VITE_API_BASE ว่าง จะใช้ path แบบ relative "/api/*"
const API_BASE = (import.meta.env.VITE_API_BASE || "").replace(/\/+$/, "");
const TENANT = import.meta.env.VITE_TENANT || "bn9";
const TOKEN_KEY = "BN9_TOKEN";

// dev only: x-admin-code (ปิดไว้)
const USE_ADMIN_CODE_DEV = false;
const ADMIN_CODE = "dev123";

/* ======================= Token helpers (local) ======================= */

function getToken(): string {
  try {
    return localStorage.getItem(TOKEN_KEY) || "";
  } catch {
    return "";
  }
}
export function setToken(t: string) {
  try {
    localStorage.setItem(TOKEN_KEY, t);
  } catch {}
}
export function clearToken() {
  try {
    localStorage.removeItem(TOKEN_KEY);
  } catch {}
}
let accessToken = getToken();

/* ================================ Axios ================================ */

export const API = axios.create({ baseURL: API_BASE || "" });

// แนบ Authorization + x-tenant (+ x-admin-code ถ้าเปิด)
API.interceptors.request.use((cfg: InternalAxiosRequestConfig) => {
  const headers = (cfg.headers ?? {}) as AxiosRequestHeaders;
  accessToken ||= getToken();
  if (accessToken) headers.Authorization = `Bearer ${accessToken}`;
  headers["x-tenant"] = TENANT;
  if (USE_ADMIN_CODE_DEV) headers["x-admin-code"] = ADMIN_CODE;
  cfg.headers = headers;
  return cfg;
});

// จัดการ 401: ล้าง token แล้วเด้งไป /login
API.interceptors.response.use(
  (r) => r,
  (err: AxiosError) => {
    if (err.response?.status === 401) {
      clearToken();
      accessToken = "";
      const loc = globalThis.location;
      if (loc && loc.pathname !== "/login") loc.href = "/login";
    }
    return Promise.reject(err);
  }
);

/* ================================= Auth ================================ */

export async function login(email: string, password: string) {
  const r = await API.post("/api/auth/login", { email, password });
  const data = r.data as { token: string };
  if (!data?.token) throw new Error("login failed: empty token");
  setToken(data.token);
  accessToken = data.token;
  return data;
}

export function logoutAndRedirect() {
  clearToken();
  accessToken = "";
  const loc = globalThis.location;
  if (loc) loc.href = "/login";
}

export function getApiBase() {
  return API_BASE || "/api";
}

/* ============================== Bots APIs ============================== */
/* Back-end ที่ใช้จริงตอนนี้:
   - GET    /api/bots                      (สาธารณะ: รายการ/อ่าน)
   - GET    /api/bots/:id
   - POST   /api/bots/init                 (สร้างตัวอย่าง dev)
   - GET    /api/admin/bots/:id/secrets    (masked)   ⚠️ Admin (ต้อง JWT)
   - POST   /api/admin/bots/:id/secrets    (upsert)   ⚠️ Admin (ต้อง JWT)
   - PATCH  /api/admin/bots/:id            (meta)     ⚠️ Admin (ต้อง JWT)
*/

export async function getBots() {
  const r = await API.get<BotListResponse>("/api/bots");
  return r.data;
}

export async function initBot() {
  const r = await API.post("/api/bots/init");
  return (r.data as any).bot as BotItem;
}

export async function getBot(botId: string) {
  const r = await API.get<BotGetResponse>(`/api/bots/${encodeURIComponent(botId)}`);
  return r.data;
}

export async function updateBotMeta(
  botId: string,
  payload: Partial<{ name: string | null; active: boolean; verifiedAt?: string | null }>
) {
  const r = await API.patch(`/api/admin/bots/${encodeURIComponent(botId)}`, payload);
  return r.data as { ok: true; bot?: BotItem };
}

export async function getBotSecrets(botId: string) {
  const r = await API.get<BotSecretsMasked>(
    `/api/admin/bots/${encodeURIComponent(botId)}/secrets`
  );
  return r.data;
}

export async function updateBotSecrets(botId: string, payload: BotSecretsPayload) {
  // Normalize alias → canonical
  const norm: BotSecretsPayload = {
    ...payload,
    openaiApiKey: payload.openaiApiKey ?? payload.openaiKey ?? undefined,
    lineChannelSecret: payload.lineChannelSecret ?? payload.lineSecret ?? undefined,
  };

  const r = await API.post<{ ok: true; botId: string }>(
    `/api/admin/bots/${encodeURIComponent(botId)}/secrets`,
    {
      openaiApiKey: norm.openaiApiKey,
      lineAccessToken: norm.lineAccessToken,
      lineChannelSecret: norm.lineChannelSecret,
    }
  );
  return r.data;
}

/* ============================ Stats / Cases ============================ */
/* Backend:
   - GET /api/stats/daily?botId=...
   - GET /api/stats/range?botId=...&from=YYYY-MM-DD&to=YYYY-MM-DD
   - GET /api/cases/recent?botId=...&limit=20
*/

export async function getDailyByBot(botId: string) {
  const r = await API.get<DailyResp>(`/api/stats/daily`, { params: { botId } });
  return r.data;
}

export async function getRangeByBot(botId: string, from: string, to: string) {
  const r = await API.get<RangeResp>(`/api/stats/range`, { params: { botId, from, to } });
  return r.data;
}

export async function getRecentByBot(botId: string, limit = 20) {
  const r = await API.get<RecentCasesResponse>(`/api/cases/recent`, {
    params: { botId, limit },
  });
  return r.data;
}

/* ============================== Dev tools ============================== */
/**
 * ทดสอบ LINE token ของ bot:
 * เรียก /api/line-ping/:botId ก่อน หากไม่มีให้ fallback ไป /api/dev/line-ping/:botId
 */
export async function devLinePing(botId: string) {
  try {
    const r1 = await API.get<{ ok: boolean; status: number }>(
      `/api/line-ping/${encodeURIComponent(botId)}`
    );
    return r1.data;
  } catch {
    const r2 = await API.get<{ ok: boolean; status: number }>(
      `/api/dev/line-ping/${encodeURIComponent(botId)}`
    );
    return r2.data;
  }
}

/* ============================= Helper bundle ============================ */

export const api = {
  base: getApiBase(),
  health: async () => (await API.get<Health>("/api/health")).data,
  daily: getDailyByBot,
  range: getRangeByBot,
  recent: getRecentByBot,
  bots: getBots,
  createBot: initBot,
  getBot,
  getBotSecrets,
  updateBotMeta,
  updateBotSecrets,
  devLinePing,
};
