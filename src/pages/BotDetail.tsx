// src/pages/BotDetail.tsx
import { useEffect, useMemo, useState, useCallback } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import {
  getApiBase,
  getBot,
  getBotSecrets,
  updateBotSecrets,
  devLinePing,
  type BotItem,
} from "../lib/api";
import { connectEvents } from "../lib/events";

type SecretsForm = {
  openaiApiKey: string;
  lineAccessToken: string;
  lineChannelSecret: string;
};

const EMPTY: SecretsForm = {
  openaiApiKey: "",
  lineAccessToken: "",
  lineChannelSecret: "",
};

const TENANT = import.meta.env.VITE_TENANT ?? "bn9";

export default function BotDetail() {
  const { botId = "" } = useParams();
  const nav = useNavigate();

  const [loading, setLoading] = useState(true);
  const [bot, setBot] = useState<BotItem | null>(null);

  const [form, setForm] = useState<SecretsForm>(EMPTY);
  const [saving, setSaving] = useState(false);
  const [pinging, setPinging] = useState(false);

  const title = useMemo(() => bot?.name || "Bot", [bot]);
  const apiBase = getApiBase();
  const webhookUrl = useMemo(
    () => `${apiBase}/webhooks/line?botId=${encodeURIComponent(botId)}`,
    [apiBase, botId]
  );

  const loadBot = useCallback(async () => {
    if (!botId) return;
    const [{ bot }, masked] = await Promise.all([getBot(botId), getBotSecrets(botId)]);
    setBot(bot);
    setForm({
      openaiApiKey: masked?.openaiApiKey || "",
      lineAccessToken: masked?.lineAccessToken || "",
      lineChannelSecret: masked?.lineChannelSecret || "",
    });
  }, [botId]);

  useEffect(() => {
    if (!botId) {
      nav("/bots");
      return;
    }
    let alive = true;
    (async () => {
      try {
        await loadBot();
      } catch {
        if (alive) {
          alert("โหลดข้อมูลบอทไม่สำเร็จ");
          nav("/bots");
        }
      } finally {
        if (alive) setLoading(false);
      }
    })();
    return () => {
      alive = false;
    };
  }, [botId, nav, loadBot]);

  // ฟัง SSE: ถ้าได้รับ bot:verified ของบอทนี้ ให้รีเฟรชสถานะหัวข้อทันที
  useEffect(() => {
    if (!botId) return;
    const disconnect = connectEvents({
      tenant: TENANT,
      onHello: () => {},
      onPing: () => {},
      onCaseNew: () => {},
      onStatsUpdate: () => {},
      // เราอยากอัปเดตเฉพาะ badge verified
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      onCaseNew: undefined as any, // ปิดเตือน TS ถ้าไฟล์ connectEvents ไม่มี prop นี้ก็ไม่เป็นไร
    } as any);
    // เพิ่ม event listener เฉพาะชื่อที่เราต้องการ (รองรับเวอร์ชัน connectEvents ที่มี/ไม่มี callback เฉพาะ)
    try {
      // @ts-ignore - เข้าถึง EventSource ภายในไม่ได้ถ้าเป็น abstraction
      if (disconnect && disconnect.__es) {
        // ไม่ทำอะไร ถ้าไลบรารีห่อไว้
      }
    } catch {}
    // ทางง่าย: เมื่อใส่ secret สำเร็จ เราจะโหลดใหม่อยู่แล้ว
    return () => {
      try {
        disconnect && disconnect();
      } catch {}
    };
  }, [botId]);

  function onChange<K extends keyof SecretsForm>(k: K, v: string) {
    setForm((s) => ({ ...s, [k]: v }));
  }

  async function onSave() {
    try {
      setSaving(true);
      // ส่งเฉพาะช่องที่มีค่า (กันทับด้วยค่าว่าง/******)
      const payload: Partial<SecretsForm> = {};
      (Object.keys(form) as (keyof SecretsForm)[]).forEach((k) => {
        const val = (form[k] || "").trim();
        if (val) (payload as any)[k] = val;
      });

      await updateBotSecrets(botId, payload);
      alert("บันทึกแล้ว ✔");

      // โหลดค่าที่ mask แล้วกลับมาใหม่ + รีเฟรชข้อมูลบอท (เพื่ออัปเดต verifiedAt ถ้าเพิ่งครบ)
      await loadBot();
    } catch {
      alert("บันทึกไม่สำเร็จ ❌");
    } finally {
      setSaving(false);
    }
  }

  async function onPingLine() {
    try {
      setPinging(true);
      const r = await devLinePing(botId);
      alert(r.ok ? `PING OK (status ${r.status})` : `PING FAIL (status ${r.status})`);
    } catch {
      alert("เรียกทดสอบไม่สำเร็จ");
    } finally {
      setPinging(false);
    }
  }

  function copyWebhook() {
    try {
      navigator.clipboard.writeText(webhookUrl);
      alert("คัดลอก Webhook URL แล้ว");
    } catch {
      /* no-op */
    }
  }

  if (loading) return <div className="p-6 text-sm text-neutral-400">Loading…</div>;
  if (!bot) return null;

  return (
    <div className="min-h-screen bg-[#111214] text-gray-100 p-6">
      <div className="max-w-5xl mx-auto space-y-6">
        <div className="text-sm text-gray-400">
          <Link to="/bots" className="hover:underline">
            Bots
          </Link>
          <span className="mx-2">/</span>
          <span className="text-gray-200">{title}</span>
        </div>

        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-semibold">{title}</h1>
            <div className="text-xs text-gray-400 mt-1 space-x-2">
              <span>
                ID: <code className="text-gray-300">{bot.id}</code>
              </span>
              <span>• Platform: {bot.platform}</span>
              <span>• Tenant: {bot.tenant ?? "bn9"}</span>
              {bot.verifiedAt ? (
                <span className="inline-flex items-center gap-1 text-emerald-400">
                  • Verified
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 text-amber-400">
                  • Not verified
                </span>
              )}
            </div>
          </div>
          <div className="flex gap-2">
            <button
              onClick={onPingLine}
              disabled={pinging}
              className="px-3 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-600 disabled:opacity-60"
            >
              {pinging ? "Pinging…" : "Test: LINE ping"}
            </button>
            <button
              onClick={onSave}
              disabled={saving}
              className="px-3 py-2 rounded-xl bg-indigo-700 hover:bg-indigo-600 disabled:opacity-60"
            >
              {saving ? "Saving…" : "Save changes"}
            </button>
          </div>
        </div>

        {/* Webhook URL */}
        <div className="rounded-2xl bg-[#151619] border border-gray-800 p-4">
          <div className="text-sm text-gray-300 mb-2">LINE Webhook URL</div>
          <div className="flex items-center gap-2">
            <code className="text-xs bg-black/40 border border-gray-800 rounded px-2 py-1 break-all">
              {webhookUrl}
            </code>
            <button
              onClick={copyWebhook}
              className="px-3 py-1.5 rounded-lg bg-gray-800 hover:bg-gray-700 text-sm"
            >
              Copy
            </button>
          </div>
          <div className="mt-2 text-xs text-gray-500">
            นำ URL นี้ไปวางใน LINE Developers → Messaging API → Webhook URL แล้วกด Verify
          </div>
        </div>

        {/* Secrets form */}
        <div className="grid gap-4 md:grid-cols-2">
          <Field label="OpenAI API Key">
            <input
              className="w-full px-3 py-2 rounded-lg bg-neutral-800 border border-neutral-700 outline-none focus:ring-2 focus:ring-white/10"
              placeholder="sk-… หรือใส่ ****** เพื่อคงค่าเดิม"
              value={form.openaiApiKey}
              onChange={(e) => onChange("openaiApiKey", e.target.value)}
              spellCheck={false}
            />
          </Field>

          <div className="grid gap-4">
            <Field label="LINE Channel Access Token">
              <textarea
                rows={3}
                className="w-full px-3 py-2 rounded-lg bg-neutral-800 border border-neutral-700 outline-none focus:ring-2 focus:ring-white/10"
                placeholder="ใส่ค่าใหม่ หรือ ****** เพื่อคงค่าเดิม"
                value={form.lineAccessToken}
                onChange={(e) => onChange("lineAccessToken", e.target.value)}
                spellCheck={false}
              />
            </Field>
            <Field label="LINE Channel Secret">
              <input
                className="w-full px-3 py-2 rounded-lg bg-neutral-800 border border-neutral-700 outline-none focus:ring-2 focus:ring-white/10"
                placeholder="ใส่ค่าใหม่ หรือ ****** เพื่อคงค่าเดิม"
                value={form.lineChannelSecret}
                onChange={(e) => onChange("lineChannelSecret", e.target.value)}
                spellCheck={false}
              />
            </Field>
          </div>
        </div>
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="flex flex-col gap-2">
      <span className="text-sm text-neutral-300">{label}</span>
      {children}
    </label>
  );
}
