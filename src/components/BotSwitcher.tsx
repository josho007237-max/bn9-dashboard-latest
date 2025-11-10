import { useEffect, useState } from "react";

export function BotSwitcher({ onChange }: { onChange?: (id: string) => void }) {
  const [bots, setBots] = useState<{ id: string; name: string; platform: string }[]>([]);
  const [botId, setBotId] = useState(localStorage.getItem("BOT_ID") || "");

  useEffect(() => {
    const base = import.meta.env.VITE_API_BASE;
    fetch(`${base}/api/bots`)
      .then(r => r.json())
      .then(x => {
        if (x.items?.length) {
          setBots(x.items);
          // ถ้ายังไม่เคยเลือก ให้เลือกอันแรกอัตโนมัติ
          if (!botId) {
            const first = x.items[0].id;
            setBotId(first);
            localStorage.setItem("BOT_ID", first);
            onChange?.(first);
          }
        }
      });
  }, []);

  return (
    <div className="flex items-center gap-2">
      <label className="text-sm text-gray-500">เลือกบอท:</label>
      <select
        className="border rounded-md p-1 text-sm"
        value={botId}
        onChange={(e) => {
          const id = e.target.value;
          setBotId(id);
          localStorage.setItem("BOT_ID", id);
          onChange?.(id);
        }}
      >
        {bots.map(b => (
          <option key={b.id} value={b.id}>
            {b.name} ({b.platform})
          </option>
        ))}
      </select>
    </div>
  );
}
